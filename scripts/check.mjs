import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  ALL_LANGS,
  LANG_META,
  ROUTES,
  SITE,
  STORES,
  X_DEFAULT_LANG,
  routeUrl
} from '../src/content/config.mjs';
import ruContent from '../src/content/ru.mjs';
import enContent from '../src/content/en.mjs';
import trContent from '../src/content/tr.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DEST = path.join(ROOT, 'dist');
const SITE_ORIGIN = new URL(SITE).origin;
const LANGS = (process.env.LANGS || ALL_LANGS.join(','))
  .split(',')
  .map(x => x.trim())
  .filter(x => ALL_LANGS.includes(x));

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

function collectKeyShape(obj, prefix = '') {
  const keys = [];
  if (Array.isArray(obj)) {
    keys.push(`${prefix}[len=${obj.length}]`);
    obj.forEach((item, idx) => {
      if (item && typeof item === 'object') {
        keys.push(...collectKeyShape(item, `${prefix}[${idx}]`));
      }
    });
    return keys;
  }
  if (obj && typeof obj === 'object') {
    for (const k of Object.keys(obj).sort()) {
      const next = prefix ? `${prefix}.${k}` : k;
      const val = obj[k];
      if (val && typeof val === 'object') {
        keys.push(...collectKeyShape(val, next));
      } else {
        keys.push(next);
      }
    }
  }
  return keys;
}

// Strip <script>, <style>, and any element carrying a foreign lang="..." attribute (e.g. lang="ru" switcher link)
// so visible text can be checked cleanly for accidental language mixing.
function stripForeignLangText(html, pageLang) {
  const titleText = html.match(/<title>([^<]*)<\/title>/i)?.[1] || '';
  const descText = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] || '';
  let body = (html.match(/<body\b[^>]*>([\s\S]*)<\/body>/i)?.[1] || html)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ');
  // Remove elements carrying a foreign lang="..." attribute (e.g. language switcher links).
  body = body.replace(/<([a-z0-9]+)\b[^>]*\blang="([^"]+)"[^>]*>[\s\S]*?<\/\1>/gi, (match, _tag, attrLang) => {
    if (attrLang.toLowerCase() !== pageLang.toLowerCase()) return ' ';
    return match;
  });
  const alts = [...body.matchAll(/\balt="([^"]*)"/gi)].map(m => m[1]).join(' ');
  const visible = body.replace(/<[^>]+>/g, ' ');
  return `${titleText} ${descText} ${alts} ${visible}`.replace(/\s+/g, ' ').trim();
}

// Pragmatic heuristic for leftover English sentences on Turkish pages outside lang="en":
// flags unambiguous English function words (articles/pronouns/conjunctions/auxiliaries not used in Turkish or technical product names).
const TR_LEFTOVER_EN_RE = /\b(the|with|your|without|because|before|after|which|their|should|would|these|those|cannot|does|from|have|that|this|when|where|what|into|only|some|every|other|you|are|our|your|will|not|for)\b/gi;

// PRO / CAPTCHA compliance regexes
const PRO_TOPIC_RE = /(\bPRO\b|\$39|CAPTCHA|капч|автоматизац|automation|otomasyon)/i;
const FORBIDDEN_PURCHASE_RE = /(\bcheckout\b|купить|оформить подписку|\bbuy now\b|\bsubscribe now\b|satın al|abone ol|stripe\.com|paypal\.com|paddle\.com|lemonsqueezy\.com)/i;
const FORBIDDEN_SOLVERS_RE = /(nopecha|2captcha|rucaptcha|anti-captcha|capmonster)/i;
const CAPTCHA_TERM_RE = /(CAPTCHA|капч)/i;
const GUARANTEE_TERM_RE = /(гарантир|guarantee|garanti)/i;
const UNCONFIGURED_STORE_RE = /(chromewebstore\.google\.com|chrome\.google\.com\/webstore|addons\.mozilla\.org)/i;

export function checkDist() {
  const errors = [];
  const warnings = [];
  if (!fs.existsSync(DEST)) {
    throw new Error('Папка dist/ не найдена. Сначала запустите сборку: node scripts/build.mjs');
  }

  // 0. Content module key parity across ru, en, tr
  const ruShape = collectKeyShape(ruContent).join('\n');
  for (const [code, mod] of [['en', enContent], ['tr', trContent]]) {
    const shape = collectKeyShape(mod).join('\n');
    if (shape !== ruShape) {
      const ruSet = new Set(ruShape.split('\n'));
      const modSet = new Set(shape.split('\n'));
      const missing = [...ruSet].filter(k => !modSet.has(k)).slice(0, 5);
      const extra = [...modSet].filter(k => !ruSet.has(k)).slice(0, 5);
      errors.push(`[content/${code}.mjs] Структура ключей отличается от ru.mjs (нет: ${missing.join(', ') || '—'}; лишние: ${extra.join(', ') || '—'})`);
    }
  }

  // 1. Required root & discovery files
  for (const requiredFile of [
    'robots.txt',
    'sitemap.xml',
    '404.html',
    '_headers',
    'llms.txt',
    'languages.json',
    'manifest.webmanifest',
    '.well-known/security.txt'
  ]) {
    if (!fs.existsSync(path.join(DEST, requiredFile))) {
      errors.push(`Отсутствует обязательный файл: dist/${requiredFile}`);
    }
  }

  // 2. Every route exists in every active language
  for (const lang of LANGS) {
    for (const route of ROUTES) {
      const expected = resolveInternalPath(routeUrl(lang, route));
      if (!fs.existsSync(expected)) {
        errors.push(`Отсутствует маршрут ${routeUrl(lang, route)} (ожидался ${path.relative(DEST, expected)})`);
      }
    }
  }

  // 3. _headers check (tightened like WillowinWorld)
  const headersPath = path.join(DEST, '_headers');
  if (fs.existsSync(headersPath)) {
    const headersText = fs.readFileSync(headersPath, 'utf8');
    for (const requiredHeader of [
      'Content-Security-Policy',
      'Strict-Transport-Security',
      'X-Frame-Options',
      'X-Content-Type-Options',
      'Referrer-Policy',
      'Permissions-Policy',
      'Cross-Origin-Opener-Policy',
      'Cross-Origin-Resource-Policy',
      'X-Permitted-Cross-Domain-Policies',
      'Origin-Agent-Cluster'
    ]) {
      if (!new RegExp(`${requiredHeader}:`, 'i').test(headersText)) {
        errors.push(`[dist/_headers] Отсутствует заголовок ${requiredHeader}`);
      }
    }
    for (const cspPart of [
      "base-uri 'none'",
      "frame-src 'none'",
      "connect-src 'none'",
      "manifest-src 'self'",
      "worker-src 'none'",
      "media-src 'none'",
      'upgrade-insecure-requests'
    ]) {
      if (!headersText.includes(cspPart)) {
        errors.push(`[dist/_headers] В Content-Security-Policy отсутствует директива ${cspPart}`);
      }
    }
    if (!/Referrer-Policy:\s*no-referrer/i.test(headersText)) {
      errors.push('[dist/_headers] Referrer-Policy должен быть no-referrer');
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
  const hreflangsByCanonical = new Map();

  for (const file of htmlFiles) {
    const content = fs.readFileSync(file, 'utf8');
    htmlByFile.set(file, content);
    const ids = new Set([...content.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
    idsByFile.set(file, ids);
  }

  const titles = new Map();
  const descriptions = new Map();

  for (const file of htmlFiles) {
    const rel = path.relative(DEST, file).replace(/\\/g, '/');
    const html = htmlByFile.get(file);
    const expectedOwnUrl = `${SITE}/${rel.replace(/index\.html$/, '')}`;
    const pageUrl = new URL(expectedOwnUrl);
    const is404 = rel === '404.html';
    const pageLang = html.match(/<html\b[^>]*\blang="([^"]+)"/i)?.[1]?.toLowerCase() || '';

    // 4. PRO, purchase, solver & CAPTCHA guarantee checks
    const purchaseMatch = html.match(FORBIDDEN_PURCHASE_RE);
    if (purchaseMatch) {
      errors.push(`[${rel}] Найдено запрещённое слово/ссылка покупки: «${purchaseMatch[0]}»`);
    }
    const solverMatch = html.match(FORBIDDEN_SOLVERS_RE);
    if (solverMatch) {
      errors.push(`[${rel}] Найдено запрещённое название стороннего сервиса решения CAPTCHA: «${solverMatch[0]}»`);
    }
    const mainHtml = html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0] || html;
    if (PRO_TOPIC_RE.test(mainHtml) && !mainHtml.includes('data-status="in-development"')) {
      errors.push(`[${rel}] Страница упоминает PRO/$39/CAPTCHA/автоматизацию без атрибута data-status="in-development"`);
    }

    // Check same-sentence CAPTCHA + guarantee prohibition on visible text
    const visibleAll = html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ');
    for (const sentence of visibleAll.split(/[.!?\n]+/)) {
      if (CAPTCHA_TERM_RE.test(sentence) && GUARANTEE_TERM_RE.test(sentence)) {
        errors.push(`[${rel}] Запрещённое сочетание CAPTCHA и гарантии в одном предложении: «${sentence.trim().slice(0, 90)}»`);
      }
    }

    // 5. No-language-mixing check (skip intentionally trilingual 404.html)
    if (!is404) {
      if (!ALL_LANGS.includes(pageLang)) {
        errors.push(`[${rel}] Некорректный атрибут <html lang="${pageLang}">`);
      } else {
        const cleaned = stripForeignLangText(html, pageLang);
        if ((pageLang === 'en' || pageLang === 'tr') && /[А-Яа-яЁё]/.test(cleaned)) {
          const sample = cleaned.match(/[А-Яа-яЁё]+/)?.[0];
          errors.push(`[${rel}] Смешение языков: найдена кириллица «${sample}» на странице lang="${pageLang}"`);
        }
        if ((pageLang === 'ru' || pageLang === 'en') && /[ğĞşŞİı]/.test(cleaned)) {
          const sample = cleaned.match(/\S*[ğĞşŞİı]\S*/)?.[0];
          errors.push(`[${rel}] Смешение языков: найдены турецкие буквы «${sample}» на странице lang="${pageLang}"`);
        }
        if (pageLang === 'tr') {
          const matches = cleaned.match(TR_LEFTOVER_EN_RE) || [];
          if (matches.length >= 2) {
            errors.push(`[${rel}] Смешение языков: обнаружены английские слова на турецкой странице: ${[...new Set(matches.map(w => w.toLowerCase()))].slice(0, 8).join(', ')}`);
          }
        }
      }
    }

    // 6. Title check (non-empty, unique, length warning > 60 chars)
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';
    const decodedTitle = title.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    if (!title) {
      errors.push(`[${rel}] Отсутствует или пустой тег <title>`);
    } else if (titles.has(title)) {
      errors.push(`[${rel}] Дублирующийся <title> «${title}» (уже используется в ${titles.get(title)})`);
    } else {
      titles.set(title, rel);
      if (decodedTitle.length > 60) {
        warnings.push(`[${rel}] Длинный <title> (${decodedTitle.length} симв. > 60): «${decodedTitle}»`);
      }
    }

    // 7. Meta description check (non-empty, unique, length warning outside 70-160 chars)
    const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
    const desc = descMatch ? descMatch[1].trim() : '';
    if (!desc) {
      errors.push(`[${rel}] Отсутствует или пустой <meta name="description">`);
    } else if (descriptions.has(desc)) {
      errors.push(`[${rel}] Дублирующийся meta description (уже используется в ${descriptions.get(desc)})`);
    } else {
      descriptions.set(desc, rel);
      if (!is404 && (desc.length < 70 || desc.length > 160)) {
        warnings.push(`[${rel}] Длина meta description (${desc.length} симв.) вне диапазона 70–160`);
      }
    }

    // 8. Canonical = own URL, hreflang completeness & og:locale
    const canonMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
    const canonical = canonMatch ? canonMatch[1].trim() : '';
    if (!canonical) {
      errors.push(`[${rel}] Отсутствует <link rel="canonical">`);
    } else {
      if (canonical !== expectedOwnUrl) {
        errors.push(`[${rel}] canonical (${canonical}) не совпадает с собственным адресом (${expectedOwnUrl})`);
      }
      if (!isNoindex(html) && !sitemapLocs.has(canonical)) {
        errors.push(`[${rel}] Страница отсутствует в sitemap.xml (ожидался <loc>${canonical}</loc>)`);
      }
    }

    if (!isNoindex(html) && LANGS.length > 1) {
      const alts = new Map(
        [...html.matchAll(/<link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)"/gi)].map(m => [m[1], m[2]])
      );
      hreflangsByCanonical.set(canonical, alts);
      for (const l of LANGS) {
        if (!alts.has(l)) {
          errors.push(`[${rel}] Отсутствует hreflang="${l}"`);
        }
      }
      if (!alts.has('x-default')) {
        errors.push(`[${rel}] Отсутствует hreflang="x-default"`);
      } else if (alts.get('x-default') !== alts.get(X_DEFAULT_LANG)) {
        errors.push(`[${rel}] hreflang="x-default" (${alts.get('x-default')}) должен указывать на EN-версию (${alts.get(X_DEFAULT_LANG)})`);
      }
      for (const [code, href] of alts.entries()) {
        const u = parseUrl(href);
        if (!u || u.origin !== SITE_ORIGIN) {
          errors.push(`[${rel}] hreflang="${code}" должен быть абсолютным URL сайта: ${href}`);
        } else if (!fs.existsSync(resolveInternalPath(u.pathname))) {
          errors.push(`[${rel}] hreflang="${code}" ведёт на несуществующую страницу: ${href}`);
        }
      }
      // og:locale + og:locale:alternate
      const ogLoc = html.match(/<meta\s+property="og:locale"\s+content="([^"]+)"/i)?.[1];
      if (ogLoc !== LANG_META[pageLang]?.ogLocale) {
        errors.push(`[${rel}] Некорректный og:locale: «${ogLoc || 'нет'}» (ожидался ${LANG_META[pageLang]?.ogLocale})`);
      }
      const ogAlts = new Set([...html.matchAll(/<meta\s+property="og:locale:alternate"\s+content="([^"]+)"/gi)].map(m => m[1]));
      for (const other of LANGS.filter(l => l !== pageLang)) {
        if (!ogAlts.has(LANG_META[other].ogLocale)) {
          errors.push(`[${rel}] Отсутствует og:locale:alternate для ${LANG_META[other].ogLocale}`);
        }
      }
    }

    // 9. Security meta tags & strict CSP hygiene
    const metaCsp = html.match(/<meta\s+http-equiv="Content-Security-Policy"\s+content="([^"]+)"/i)?.[1] || '';
    if (!metaCsp) {
      errors.push(`[${rel}] Отсутствует мета-тег Content-Security-Policy`);
    } else {
      for (const reqDir of ["base-uri 'none'", "frame-src 'none'", "connect-src 'self'", "manifest-src 'self'", "worker-src 'none'", "media-src 'none'"]) {
        if (!metaCsp.includes(reqDir)) {
          errors.push(`[${rel}] В meta CSP отсутствует директива ${reqDir}`);
        }
      }
    }
    if (!/<meta\s+name="referrer"\s+content="no-referrer"/i.test(html)) {
      errors.push(`[${rel}] Отсутствует мета-тег Referrer-Policy (no-referrer)`);
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

    // 10. Heading hierarchy: exactly one H1 and no skipped levels
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

    // 11. Images: alt (non-empty unless decorative aria-hidden="true"), width, height
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

    // 12. JSON-LD validation (no Offer/price/ratings/dates)
    for (const ldMatch of html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
      try {
        const parsed = JSON.parse(ldMatch[1]);
        const raw = JSON.stringify(parsed);
        if (/"(aggregateRating|review|offers|Offer|price|interactionStatistic|downloadCount|datePublished|dateModified)"/.test(raw)) {
          errors.push(`[${rel}] В JSON-LD присутствуют неподтверждённые поля (рейтинги, отзывы, Offer/цены или даты)`);
        }
      } catch (err) {
        errors.push(`[${rel}] Некорректный JSON-LD: ${err.message}`);
      }
    }

    // 13. Links, href="#", unconfigured store URLs, internal anchors and external rel="noopener"
    for (const attrMatch of html.matchAll(/\b(href|src)="([^"]*)"/gi)) {
      const attr = attrMatch[1].toLowerCase();
      const target = attrMatch[2].trim();
      if (attr === 'href' && target === '#') {
        errors.push(`[${rel}] Обнаружена ссылка-заглушка href="#"`);
        continue;
      }
      if (!target) {
        errors.push(`[${rel}] Пустой атрибут ${attr}=""`);
        continue;
      }

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
          if (UNCONFIGURED_STORE_RE.test(target) && !Object.values(STORES).includes(target)) {
            errors.push(`[${rel}] Ссылка на магазин ${target} не задана в STORES`);
          }
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

  // 14. Reciprocal hreflang check across all indexable pages
  for (const [canon, alts] of hreflangsByCanonical.entries()) {
    for (const [code, targetHref] of alts.entries()) {
      if (code === 'x-default') continue;
      const targetAlts = hreflangsByCanonical.get(targetHref);
      if (!targetAlts) {
        errors.push(`[hreflang] Страница ${targetHref} (из ${canon}) не имеет собственного набора hreflang`);
        continue;
      }
      const hasBackLink = [...targetAlts.values()].includes(canon);
      if (!hasBackLink) {
        errors.push(`[hreflang] Нет обратной ссылки с ${targetHref} на ${canon}`);
      }
    }
  }

  // 15. Check every sitemap entry
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
    const resolved = resolveInternalPath(sitemapUrl.pathname);
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

  // 16. Check CSS font/asset urls across all stylesheets in dist/assets
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

  // 17. robots.txt: Sitemap line, WiW crawler groups and llms/languages comments
  const robotsPath = path.join(DEST, 'robots.txt');
  if (fs.existsSync(robotsPath)) {
    const robotsText = fs.readFileSync(robotsPath, 'utf8');
    if (!robotsText.split(/\r?\n/).includes(`Sitemap: ${SITE}/sitemap.xml`)) {
      errors.push(`[robots.txt] Отсутствует строка «Sitemap: ${SITE}/sitemap.xml»`);
    }
    if (!robotsText.includes(`${SITE}/llms.txt`) || !robotsText.includes(`${SITE}/languages.json`)) {
      errors.push('[robots.txt] Отсутствуют комментарии со ссылками на /llms.txt и /languages.json');
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

  // 18. llms.txt validation: every site URL mentioned must exist in dist/
  const llmsPath = path.join(DEST, 'llms.txt');
  if (fs.existsSync(llmsPath)) {
    const llmsText = fs.readFileSync(llmsPath, 'utf8');
    if (!llmsText.includes('# AntiRacketMantis')) errors.push('[llms.txt] Отсутствует заголовок # AntiRacketMantis');
    const urls = [...llmsText.matchAll(/https?:\/\/[^\s)>\]]+/g)].map(m => m[0]);
    let ownCount = 0;
    for (const rawUrl of urls) {
      const u = parseUrl(rawUrl);
      if (!u) {
        errors.push(`[llms.txt] Некорректный URL: ${rawUrl}`);
        continue;
      }
      if (u.origin === SITE_ORIGIN) {
        ownCount++;
        const resolved = resolveInternalPath(u.pathname);
        if (!fs.existsSync(resolved)) {
          errors.push(`[llms.txt] URL не найден в dist/: ${rawUrl}`);
        }
      }
    }
    if (ownCount < ROUTES.length * LANGS.length) {
      errors.push(`[llms.txt] Недостаточно ссылок на страницы сайта (${ownCount} < ${ROUTES.length * LANGS.length})`);
    }
  }

  // 19. languages.json validation
  const langsJsonPath = path.join(DEST, 'languages.json');
  if (fs.existsSync(langsJsonPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(langsJsonPath, 'utf8'));
      if (data.schemaVersion !== 1 || !Array.isArray(data.languages)) {
        errors.push('[languages.json] Некорректная схема (ожидались schemaVersion: 1 и массив languages)');
      } else {
        const codes = new Set(data.languages.map(x => x.code));
        for (const l of LANGS) {
          if (!codes.has(l)) errors.push(`[languages.json] Отсутствует язык ${l}`);
        }
        for (const item of data.languages) {
          for (const field of ['code', 'hreflang', 'name', 'direction', 'home', 'llms']) {
            if (!item[field]) errors.push(`[languages.json] У языка ${item.code || '?'} пустое поле ${field}`);
          }
          for (const urlField of ['home', 'llms']) {
            const u = parseUrl(item[urlField]);
            if (!u || u.origin !== SITE_ORIGIN || !fs.existsSync(resolveInternalPath(u.pathname))) {
              errors.push(`[languages.json] Поле ${urlField} (${item[urlField]}) не найдено в dist/`);
            }
          }
        }
      }
    } catch (err) {
      errors.push(`[languages.json] Некорректный JSON: ${err.message}`);
    }
  }

  // 20. manifest.webmanifest validation
  const manifestPath = path.join(DEST, 'manifest.webmanifest');
  if (fs.existsSync(manifestPath)) {
    try {
      const mf = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      for (const field of ['name', 'short_name', 'description', 'start_url', 'theme_color', 'background_color']) {
        if (!mf[field]) errors.push(`[manifest.webmanifest] Отсутствует поле ${field}`);
      }
      if (!Array.isArray(mf.icons) || mf.icons.length < 2) {
        errors.push('[manifest.webmanifest] Должны быть заданы PNG-иконки (192/512/maskable)');
      } else {
        for (const ic of mf.icons) {
          const resolved = resolveInternalPath(ic.src);
          if (!fs.existsSync(resolved)) {
            errors.push(`[manifest.webmanifest] Иконка ${ic.src} не найдена в dist/`);
          }
        }
      }
    } catch (err) {
      errors.push(`[manifest.webmanifest] Некорректный JSON: ${err.message}`);
    }
  }

  // 21. .well-known/security.txt validation
  const secPath = path.join(DEST, '.well-known', 'security.txt');
  if (fs.existsSync(secPath)) {
    const secText = fs.readFileSync(secPath, 'utf8');
    for (const prefix of ['Contact:', 'Expires:', 'Preferred-Languages:', 'Canonical:']) {
      if (!secText.includes(prefix)) errors.push(`[security.txt] Отсутствует поле ${prefix}`);
    }
    const expMatch = secText.match(/^Expires:\s*(.+)$/m);
    if (expMatch) {
      const expDate = new Date(expMatch[1].trim());
      if (Number.isNaN(expDate.getTime()) || expDate.getTime() <= Date.now()) {
        errors.push(`[security.txt] Некорректная или истёкшая дата Expires: ${expMatch[1].trim()}`);
      }
    }
  }

  if (warnings.length) {
    console.warn(`Предупреждения check.mjs (${warnings.length}):`);
    for (const warn of warnings) console.warn(`  ! ${warn}`);
  }

  if (errors.length) {
    console.error(`Проверка dist/ завершилась с ошибками (${errors.length}):`);
    for (const err of errors) console.error(`  ✗ ${err}`);
    process.exitCode = 1;
    throw new Error(`Найдено ошибок: ${errors.length}`);
  }

  console.log(`✓ Проверка check.mjs пройдена: ${htmlFiles.length} HTML-страниц, ${sitemapLocs.size} адресов в sitemap.xml, ${warnings.length} предупреждений, 0 ошибок.`);
  return { pages: htmlFiles.length, sitemapUrls: sitemapLocs.size, warnings: warnings.length };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    checkDist();
  } catch {
    process.exit(1);
  }
}
