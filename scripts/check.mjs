import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(import.meta.dirname, '..');
const DEST = path.join(ROOT, 'dist');
const SITE = (process.env.SITE_URL || 'https://antiracketmantis.willowinworlds.com').replace(/\/+$/, '');
const SITE_ORIGIN = new URL(SITE).origin;

function walkHtml(dir, list = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, list);
    else if (entry.isFile() && entry.name.endsWith('.html')) list.push(full);
  }
  return list;
}

function resolveInternalPath(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]);
  if (clean.endsWith('/')) return path.join(DEST, clean, 'index.html');
  const direct = path.join(DEST, clean);
  if (fs.existsSync(direct) && fs.statSync(direct).isFile()) return direct;
  return path.join(DEST, clean, 'index.html');
}

// Crawler policy of the sister site willowinworlds.com. Kept here as an independent tripwire: changing it is the owner's decision.
const ROBOTS_ALLOWED_AGENTS = ['OAI-SearchBot', 'PerplexityBot', 'Claude-SearchBot', 'ChatGPT-User', 'Perplexity-User', 'Claude-User', '*'];
const ROBOTS_TRAINING_AGENTS = ['GPTBot', 'ClaudeBot', 'CCBot', 'Google-Extended', 'Applebot-Extended', 'Meta-ExternalAgent', 'Bytespider'];

function robotsGroups(text) {
  const groups = [];
  let group = null;
  for (const raw of text.split(/\r?\n/)) {
    const m = raw.replace(/#.*/, '').trim().match(/^([A-Za-z-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    const directive = m[1].toLowerCase();
    if (directive === 'user-agent') {
      if (!group || group.rules.length) groups.push(group = { agents: [], rules: [] });
      group.agents.push(m[2]);
    } else if (group && (directive === 'allow' || directive === 'disallow')) {
      group.rules.push(`${directive}: ${m[2]}`);
    }
  }
  return groups;
}

// Minimal well-formedness check (balanced tags, quoted attributes, no bare "<" or "&"); not a full XML parser.
function xmlError(xml) {
  const body = xml.replace(/^<\?xml[^>]*\?>\s*/, '').trim();
  if (!body.startsWith('<urlset') || !body.endsWith('</urlset>')) return 'корневой элемент должен быть <urlset>';
  const stack = [];
  let pos = 0;
  for (const m of body.matchAll(/<(\/?)([A-Za-z_][\w.:-]*)((?:\s+[\w.:-]+="[^"<]*")*)\s*(\/?)>/g)) {
    const text = body.slice(pos, m.index);
    if (/<|&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-f]+);)/i.test(text)) return `недопустимый текст «${text.trim().slice(0, 40)}»`;
    pos = m.index + m[0].length;
    if (m[1]) {
      if (stack.pop() !== m[2]) return `неожиданный закрывающий тег </${m[2]}>`;
    } else if (!m[4]) {
      stack.push(m[2]);
    }
  }
  if (stack.length || pos !== body.length) return stack.length ? `не закрыт тег <${stack.at(-1)}>` : 'некорректная разметка после последнего тега';
  return null;
}

function isNoindex(html) {
  return /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html);
}

function isW3cDate(s) {
  const d = new Date(`${s}T00:00:00Z`);
  return /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(d.getTime()) && d.toISOString().startsWith(s);
}

function parseUrl(s) {
  try {
    return new URL(s);
  } catch {
    return null;
  }
}

export function checkDist() {
  const errors = [];
  if (!fs.existsSync(DEST)) {
    throw new Error('Папка dist/ не найдена. Сначала запустите сборку: node scripts/build.mjs');
  }

  for (const requiredFile of ['robots.txt', 'sitemap.xml', '404.html', '_headers']) {
    if (!fs.existsSync(path.join(DEST, requiredFile))) {
      errors.push(`Отсутствует обязательный файл: dist/${requiredFile}`);
    }
  }

  const headersPath = path.join(DEST, '_headers');
  if (fs.existsSync(headersPath)) {
    const headersText = fs.readFileSync(headersPath, 'utf8');
    for (const requiredHeader of [
      'Content-Security-Policy',
      'X-Content-Type-Options',
      'Referrer-Policy',
      'Permissions-Policy',
      'Cross-Origin-Opener-Policy'
    ]) {
      if (!new RegExp(`${requiredHeader}:`, 'i').test(headersText)) {
        errors.push(`[dist/_headers] Отсутствует заголовок ${requiredHeader}`);
      }
    }
    if (!/\/assets\/\*/.test(headersText) || !/Cache-Control:/i.test(headersText)) {
      errors.push('[dist/_headers] Отсутствуют правила кеширования Cache-Control для /assets/*');
    }
  }

  const sitemapPath = path.join(DEST, 'sitemap.xml');
  const sitemapXml = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, 'utf8') : '';
  const sitemapLocs = new Set([...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim()));
  const sitemapEntries = [...sitemapXml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(m => ({
    loc: (m[1].match(/<loc>([^<]+)<\/loc>/)?.[1] ?? '').trim(),
    lastmods: [...m[1].matchAll(/<lastmod>([^<]*)<\/lastmod>/g)].map(x => x[1].trim()),
    images: [...m[1].matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map(x => x[1].trim()),
    alternates: [...m[1].matchAll(/<xhtml:link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(x => `${x[1]} ${x[2]}`)
  }));
  const sitemapProblem = sitemapXml ? xmlError(sitemapXml) : null;
  if (sitemapProblem) errors.push(`[sitemap.xml] Некорректный XML: ${sitemapProblem}`);
  if (/<image:/.test(sitemapXml) && !/xmlns:image="/.test(sitemapXml)) errors.push('[sitemap.xml] Не объявлено пространство имён xmlns:image');
  if (/<xhtml:/.test(sitemapXml) && !/xmlns:xhtml="/.test(sitemapXml)) errors.push('[sitemap.xml] Не объявлено пространство имён xmlns:xhtml');
  if (sitemapEntries.length !== sitemapLocs.size) errors.push('[sitemap.xml] Есть повторяющиеся или пустые <loc>');

  const htmlFiles = walkHtml(DEST).sort();
  if (!htmlFiles.length) errors.push('В папке dist/ не найдено ни одного HTML-файла.');

  const htmlByFile = new Map();
  const idsByFile = new Map();
  for (const file of htmlFiles) {
    const content = fs.readFileSync(file, 'utf8');
    htmlByFile.set(file, content);
    const ids = new Set([...content.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
    idsByFile.set(file, ids);
  }

  const titles = new Map();
  const descriptions = new Map();
  const forbiddenRe = /(\bPRO\b|\$39|CAPTCHA|капч|автоматизац|OCR|nopecha|2captcha|rucaptcha|anti-captcha|capmonster)/i;

  for (const file of htmlFiles) {
    const rel = path.relative(DEST, file).replace(/\\/g, '/');
    const html = htmlByFile.get(file);
    const pageUrl = new URL('/' + rel.replace(/index\.html$/, ''), SITE);

    // 1. Forbidden out-of-scope terms
    const forbiddenMatch = html.match(forbiddenRe);
    if (forbiddenMatch) {
      errors.push(`[${rel}] Найдено запрещённое слово вне скоупа: «${forbiddenMatch[0]}»`);
    }

    // 2. Title check (non-empty and unique)
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';
    if (!title) {
      errors.push(`[${rel}] Отсутствует или пустой тег <title>`);
    } else if (titles.has(title)) {
      errors.push(`[${rel}] Дублирующийся <title> «${title}» (уже используется в ${titles.get(title)})`);
    } else {
      titles.set(title, rel);
    }

    // 3. Meta description check (non-empty and unique)
    const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
    const desc = descMatch ? descMatch[1].trim() : '';
    if (!desc) {
      errors.push(`[${rel}] Отсутствует или пустой <meta name="description">`);
    } else if (descriptions.has(desc)) {
      errors.push(`[${rel}] Дублирующийся meta description (уже используется в ${descriptions.get(desc)})`);
    } else {
      descriptions.set(desc, rel);
    }

    // 4. Canonical & sitemap membership
    const canonMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
    const canonical = canonMatch ? canonMatch[1].trim() : '';
    if (!canonical) {
      errors.push(`[${rel}] Отсутствует <link rel="canonical">`);
    } else if (!isNoindex(html) && !sitemapLocs.has(canonical)) {
      errors.push(`[${rel}] Страница отсутствует в sitemap.xml (ожидался <loc>${canonical}</loc>)`);
    }

    // 5. Security meta tags & strict CSP hygiene (no inline scripts/styles/handlers)
    if (!/<meta\s+http-equiv="Content-Security-Policy"\s+content="[^"]+"/i.test(html)) {
      errors.push(`[${rel}] Отсутствует мета-тег Content-Security-Policy`);
    }
    if (!/<meta\s+name="referrer"\s+content="[^"]+"/i.test(html)) {
      errors.push(`[${rel}] Отсутствует мета-тег Referrer-Policy`);
    }
    for (const scriptMatch of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      const attrs = scriptMatch[1];
      const body = scriptMatch[2].trim();
      const isLd = /\btype="application\/ld\+json"/i.test(attrs);
      const hasSrc = /\bsrc="/i.test(attrs);
      if (!isLd && !hasSrc && body) {
        errors.push(`[${rel}] Обнаружен inline <script>, несовместимый со строгим CSP script-src 'self'`);
      }
    }
    if (/\sstyle="/i.test(html)) {
      errors.push(`[${rel}] Обнаружен inline-атрибут style="...", несовместимый со строгим CSP style-src 'self'`);
    }
    if (/\bon(click|load|error|mouseover|keydown|submit|change|input|focus|blur)\s*=/i.test(html)) {
      errors.push(`[${rel}] Обнаружен inline-обработчик событий в HTML`);
    }

    // 6. Heading hierarchy: exactly one H1 and no skipped levels
    const headings = [...html.matchAll(/<h([1-6])\b[^>]*>/gi)].map(m => Number(m[1]));
    const h1Count = headings.filter(level => level === 1).length;
    if (h1Count !== 1) {
      errors.push(`[${rel}] Должен быть ровно один заголовок <h1>, найдено: ${h1Count}`);
    }
    for (let i = 1; i < headings.length; i++) {
      if (headings[i] > headings[i - 1] + 1) {
        errors.push(`[${rel}] Нарушена иерархия заголовков: переход с <h${headings[i - 1]}> сразу на <h${headings[i]}>`);
      }
    }

    // 7. Images: alt (non-empty unless decorative aria-hidden="true"), width, height
    for (const imgMatch of html.matchAll(/<img\b([^>]+)>/gi)) {
      const attrs = imgMatch[1];
      const srcMatch = attrs.match(/\bsrc="([^"]+)"/i);
      const altMatch = attrs.match(/\balt="([^"]*)"/i);
      const isHidden = /\baria-hidden="true"/i.test(attrs);
      const widthMatch = attrs.match(/\bwidth="(\d+)"/i);
      const heightMatch = attrs.match(/\bheight="(\d+)"/i);
      const src = srcMatch ? srcMatch[1] : '(без src)';
      if (!altMatch) {
        errors.push(`[${rel}] У изображения ${src} отсутствует атрибут alt`);
      } else if (!altMatch[1].trim() && !isHidden) {
        errors.push(`[${rel}] У видимого изображения ${src} пустой атрибут alt`);
      }
      if (!widthMatch || !heightMatch) {
        errors.push(`[${rel}] У изображения ${src} не заданы атрибуты width и height`);
      }
    }

    // 8. JSON-LD validation
    for (const ldMatch of html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
      try {
        const parsed = JSON.parse(ldMatch[1]);
        const raw = JSON.stringify(parsed);
        if (/"(aggregateRating|review|offers|price|interactionStatistic|downloadCount|datePublished|dateModified)"/.test(raw)) {
          errors.push(`[${rel}] В JSON-LD присутствуют неподтверждённые поля (рейтинги, отзывы, цены или даты)`);
        }
      } catch (err) {
        errors.push(`[${rel}] Некорректный JSON-LD: ${err.message}`);
      }
    }

    // 9. Links and assets validation
    for (const attrMatch of html.matchAll(/\b(href|src)="([^"]+)"/gi)) {
      const attr = attrMatch[1].toLowerCase();
      const target = attrMatch[2].trim();

      let targetUrl;
      try {
        targetUrl = new URL(target, pageUrl);
      } catch {
        errors.push(`[${rel}] Некорректный URL: ${target}`);
        continue;
      }
      if (!['http:', 'https:'].includes(targetUrl.protocol)) continue;

      if (targetUrl.origin !== SITE_ORIGIN) {
        if (attr === 'href') {
          const pos = attrMatch.index;
          const tagStart = html.lastIndexOf('<', pos);
          const tagEnd = html.indexOf('>', pos);
          const tag = html.slice(tagStart, tagEnd + 1);
          if (/^<a\b/i.test(tag) && !/\brel="[^"]*noopener[^"]*"/i.test(tag)) {
            errors.push(`[${rel}] Внешняя ссылка ${target} не содержит rel="noopener"`);
          }
        }
        continue;
      }

      try {
        const resolved = resolveInternalPath(targetUrl.pathname);
        if (!fs.existsSync(resolved)) {
          errors.push(`[${rel}] Битая внутренняя ссылка или ассет: ${target} (не найден ${path.relative(DEST, resolved)})`);
          continue;
        }
        const hashPart = decodeURIComponent(targetUrl.hash.slice(1));
        if (hashPart && resolved.endsWith('.html')) {
          const targetIds = idsByFile.get(resolved);
          if (!targetIds || !targetIds.has(hashPart)) {
            errors.push(`[${rel}] Ссылка ${target} указывает на отсутствующий якорь #${hashPart} в ${path.relative(DEST, resolved)}`);
          }
        }
      } catch {
        errors.push(`[${rel}] Некорректный путь или якорь: ${target}`);
      }
    }
  }

  // 10. Check every sitemap entry: page exists, <loc> is its canonical, indexable, valid lastmod, real images, hreflang as in the page
  for (const { loc, lastmods, images, alternates } of sitemapEntries) {
    const sitemapUrl = parseUrl(loc);
    if (!sitemapUrl) {
      errors.push(`[sitemap.xml] Некорректный <loc>: ${loc}`);
      continue;
    }
    if (sitemapUrl.origin !== SITE_ORIGIN) {
      errors.push(`[sitemap.xml] URL ${loc} не начинается с базового адреса ${SITE}`);
      continue;
    }
    const route = sitemapUrl.pathname;
    const resolved = resolveInternalPath(route);
    if (!fs.existsSync(resolved)) {
      errors.push(`[sitemap.xml] URL ${loc} ведёт на несуществующий файл ${path.relative(DEST, resolved)}`);
      continue;
    }
    const html = htmlByFile.get(resolved);
    const canonical = html?.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1].trim();
    if (html && canonical !== loc) {
      errors.push(`[sitemap.xml] <loc>${loc}</loc> не совпадает с canonical страницы (${canonical ?? 'нет canonical'})`);
    }
    if (html && isNoindex(html)) {
      errors.push(`[sitemap.xml] В sitemap указана noindex-страница: ${loc}`);
    }
    if (lastmods.length !== 1 || !isW3cDate(lastmods[0])) {
      errors.push(`[sitemap.xml] У ${loc} должен быть ровно один <lastmod> в формате ГГГГ-ММ-ДД, найдено: ${lastmods.join(', ') || 'нет'}`);
    }
    for (const image of images) {
      const imageUrl = parseUrl(image);
      if (!imageUrl || imageUrl.origin !== SITE_ORIGIN) {
        errors.push(`[sitemap.xml] Адрес изображения ${image} (${loc}) не начинается с базового адреса ${SITE}`);
      } else if (!fs.existsSync(path.join(DEST, decodeURIComponent(imageUrl.pathname)))) {
        errors.push(`[sitemap.xml] Изображение ${image} (${loc}) не найдено в dist/`);
      } else if (html && !html.includes(`src="${imageUrl.pathname}"`)) {
        errors.push(`[sitemap.xml] Изображение ${image} не используется на странице ${loc}`);
      }
    }
    const pageAlternates = html ? [...html.matchAll(/<link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)"/gi)].map(m => `${m[1]} ${m[2]}`) : alternates;
    if (alternates.join('\n') !== pageAlternates.join('\n')) {
      errors.push(`[sitemap.xml] hreflang-альтернативы ${loc} не совпадают с теми, что указаны в самой странице`);
    }
  }

  // 11. Check CSS font/asset urls across all stylesheets in dist/assets
  const assetsDir = path.join(DEST, 'assets');
  const cssFiles = fs.existsSync(assetsDir)
    ? fs.readdirSync(assetsDir).filter(f => f.endsWith('.css')).sort()
    : [];
  if (!cssFiles.includes('styles.css')) {
    errors.push('Отсутствует файл dist/assets/styles.css');
  }
  for (const cssFile of cssFiles) {
    const css = fs.readFileSync(path.join(assetsDir, cssFile), 'utf8');
    for (const m of css.matchAll(/url\((['"]?)([^)'"]+)\1\)/g)) {
      const ref = m[2].trim();
      if (ref.startsWith('data:') || ref.startsWith('http')) continue;
      const assetUrl = new URL(ref, `${SITE}/assets/${cssFile}`);
      if (assetUrl.origin !== SITE_ORIGIN) continue;
      const assetPath = path.join(DEST, decodeURIComponent(assetUrl.pathname));
      if (!fs.existsSync(assetPath)) {
        errors.push(`[assets/${cssFile}] Битая ссылка на ресурс в CSS: ${ref}`);
      }
    }
  }

  // 12. robots.txt: Sitemap line and the crawler groups mirrored from willowinworlds.com
  const robotsPath = path.join(DEST, 'robots.txt');
  if (fs.existsSync(robotsPath)) {
    const robotsText = fs.readFileSync(robotsPath, 'utf8');
    if (!robotsText.split(/\r?\n/).includes(`Sitemap: ${SITE}/sitemap.xml`)) {
      errors.push(`[robots.txt] Отсутствует строка «Sitemap: ${SITE}/sitemap.xml»`);
    }
    const groups = robotsGroups(robotsText);
    const groupOf = agent => groups.find(g => g.agents.some(a => a.toLowerCase() === agent.toLowerCase()));
    for (const agent of ROBOTS_ALLOWED_AGENTS) {
      const group = groupOf(agent);
      if (!group) errors.push(`[robots.txt] Нет группы User-agent: ${agent}`);
      else if (!group.rules.includes('allow: /') || group.rules.includes('disallow: /')) errors.push(`[robots.txt] Группа ${agent} должна разрешать сайт (Allow: /) и не запрещать его целиком`);
    }
    for (const agent of ROBOTS_TRAINING_AGENTS) {
      const group = groupOf(agent);
      if (!group) errors.push(`[robots.txt] Нет группы User-agent: ${agent}`);
      else if (!group.rules.includes('disallow: /assets/')) errors.push(`[robots.txt] Группа ${agent} (обучение ИИ) должна запрещать /assets/`);
    }
    for (const agent of groups.flatMap(g => g.agents)) {
      if (![...ROBOTS_ALLOWED_AGENTS, ...ROBOTS_TRAINING_AGENTS].some(a => a.toLowerCase() === agent.toLowerCase())) {
        errors.push(`[robots.txt] Неожиданный User-agent: ${agent} (список ботов повторяет политику willowinworlds.com)`);
      }
    }
  }

  if (errors.length) {
    console.error(`Проверка dist/ завершилась с ошибками (${errors.length}):`);
    for (const err of errors) console.error(`  ✗ ${err}`);
    process.exitCode = 1;
    throw new Error(`Найдено ошибок: ${errors.length}`);
  }

  console.log(`✓ Проверка check.mjs пройдена: ${htmlFiles.length} HTML-страниц, ${sitemapLocs.size} адресов в sitemap.xml, 0 ошибок.`);
  return { pages: htmlFiles.length, sitemapUrls: sitemapLocs.size };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    checkDist();
  } catch {
    process.exit(1);
  }
}
