import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { cspErrors, decodeHtml, hasClass, textByLanguage, proBlock, readHtml, textOf } from './html-check.mjs';
import { SECURITY_CONTACT } from '../src/content/config.mjs';
import {
  ALL_LANGS,
  LANG_META,
  ROUTES,
  SITE,
  STORES,
  STUDIO,
  VERSION,
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

// Pragmatic heuristic for leftover English sentences on Turkish pages outside lang="en":
// flags unambiguous English function words (articles/pronouns/conjunctions/auxiliaries not used in Turkish or technical product names).
const TR_LEFTOVER_EN_RE = /\b(the|with|your|without|because|before|after|which|their|should|would|these|those|cannot|does|from|have|that|this|when|where|what|into|only|some|every|other|you|are|our|your|will|not|for)\b/gi;

// PRO / CAPTCHA compliance regexes
const PRO_TOPIC_RE = /(\bPRO\b|\$39|CAPTCHA|капч|автоматиз|automation|otomasyon)/i;
const FORBIDDEN_PURCHASE_RE = /(\bcheckout\b|купить|оформить подписку|\bbuy now\b|\bsubscribe now\b|satın al|abone ol|stripe\.com|paypal\.com|paddle\.com|lemonsqueezy\.com)/i;
const FORBIDDEN_BYPASS_RE = /(\bbypass\b|обход(?:а|ить)?\s+(?:защит|CAPTCHA)|CAPTCHA\s+(?:atlat|aşma))/i;
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
    const policy = headersText.match(/^\s*Content-Security-Policy:\s*(.+)$/mi)?.[1] || '';
    for (const cspPart of cspErrors(policy, true)) {
      errors.push(`[dist/_headers] В Content-Security-Policy отсутствует или ослаблена директива ${cspPart}`);
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
  for (const [prefix, uri] of [['xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9'], ['xmlns:image', 'http://www.google.com/schemas/sitemap-image/1.1'], ['xmlns:xhtml', 'http://www.w3.org/1999/xhtml']]) {
    if (!sitemapXml.includes(`${prefix}="${uri}"`)) errors.push(`[sitemap.xml] Неверное пространство имён ${prefix}`);
  }
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
    if (is404 !== isNoindex(html)) errors.push(`[${rel}] Только 404.html должна быть noindex`);
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
    const tree = readHtml(html);
    const body = tree.nodes.find(n => n.tag === 'body');
    if (is404) {
      for (const language of ALL_LANGS) {
        const blocks = tree.nodes.filter(n => n.tag === 'section' && n.attrs.lang === language);
        if (blocks.length !== 1 || !tree.nodes.some(n => n.tag === 'a' && n.attrs.href === routeUrl(language, 'home') && n.parent?.parent === blocks[0])) {
          errors.push(`[404.html] Нужен отдельный блок lang="${language}" со ссылкой на главную этого языка`);
        }
      }
    }
    const bypassMatch = decodeHtml(html).match(FORBIDDEN_BYPASS_RE);
    if (bypassMatch) errors.push(`[${rel}] Запрещённая формулировка bypass/обхода: ${bypassMatch[0]}`);
    const badge = { ru: ruContent, en: enContent, tr: trContent }[pageLang]?.ui.devBadge;
    const blocks = new Set();
    for (const node of tree.nodes) {
      if (node.tag === 'head' || !node.parent) continue;
      const ownText = node.children.filter(child => typeof child === 'string').join(' ');
      if (PRO_TOPIC_RE.test(ownText) && node !== body && node.tag !== 'title') blocks.add(proBlock(node));
      for (const match of ownText.matchAll(/\p{Sc}\s*\d+(?:[.,]\d+)?/gu)) {
        let scope = node;
        while (scope.parent && !hasClass(scope, 'plan-price-block') && !hasClass(scope, 'pro-price-figure') &&
               !['p', 'th', 'li', 'h3', 'article'].includes(scope.tag)) scope = scope.parent;
        const priceText = textOf(scope);
        if (match[0] !== '$39' || !/планируемая цена|planned price|planlanan fiyat/i.test(priceText) ||
            !/month|\/\s*mo\b|\/\s*мес|в месяц|\/\s*ay\b/i.test(priceText)) {
          errors.push(`[${rel}] Цена PRO должна быть $39/месяц с локальной подписью «planned price / планируемая цена / planlanan fiyat»`);
        }
      }
    }
    for (const block of blocks) {
      const descendants = tree.nodes.filter(n => {
        for (let p = n; p; p = p.parent) if (p === block) return true;
        return false;
      });
      if (block.attrs['data-status'] !== 'in-development' ||
          !descendants.some(n => hasClass(n, 'dev-pill') && textOf(n).startsWith(badge) && n.attrs['aria-hidden'] !== 'true' && !('hidden' in n.attrs))) {
        errors.push(`[${rel}] Блок «${textOf(block).slice(0, 65)}» должен иметь data-status="in-development" и видимый бейдж «${badge}»`);
      }
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
        const metadata = `${decodeHtml(html.match(/<title>([^<]*)<\/title>/i)?.[1] || '')} ${decodeHtml(html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] || '')}`;
        const outside = exempt => `${metadata} ${textByLanguage(body, lang => lang !== exempt, pageLang)}`;
        const routeLang = rel.startsWith('en/') ? 'en' : rel.startsWith('tr/') ? 'tr' : 'ru';
        if (pageLang !== routeLang) errors.push(`[${rel}] html lang должен совпадать с языком маршрута ${routeLang}`);
        if ((pageLang === 'en' || pageLang === 'tr') && /[А-Яа-яЁё]/.test(outside('ru'))) {
          const sample = outside('ru').match(/[А-Яа-яЁё]+/)?.[0];
          errors.push(`[${rel}] Смешение языков: найдена кириллица «${sample}» на странице lang="${pageLang}"`);
        }
        if ((pageLang === 'ru' || pageLang === 'en') && /[ğĞşŞİı]/.test(outside('tr'))) {
          const sample = outside('tr').match(/\S*[ğĞşŞİı]\S*/)?.[0];
          errors.push(`[${rel}] Смешение языков: найдены турецкие буквы «${sample}» на странице lang="${pageLang}"`);
        }
        if (pageLang === 'tr') {
          const matches = outside('en').match(TR_LEFTOVER_EN_RE) || [];
          if (matches.length >= 1) {
            errors.push(`[${rel}] Смешение языков: обнаружены английские слова на турецкой странице: ${[...new Set(matches.map(w => w.toLowerCase()))].slice(0, 8).join(', ')}`);
          }
        }
      }
    }

    // 6. Title check (non-empty, unique, length warning > 60 chars)
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';
    const decodedTitle = decodeHtml(title);
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
      const route = ROUTES.find(r => routeUrl(pageLang, r) === pageUrl.pathname);
      for (const code of [...LANGS, 'x-default']) {
        const expected = SITE + routeUrl(code === 'x-default' ? X_DEFAULT_LANG : code, route || 'home');
        if (alts.get(code) !== expected) errors.push(`[${rel}] hreflang="${code}" должен вести на тот же маршрут: ${expected}`);
      }
      if ([...html.matchAll(/<link\s+rel="alternate"\s+hreflang=/gi)].length !== LANGS.length + 1) {
        errors.push(`[${rel}] Набор hreflang содержит лишние или повторяющиеся языки`);
      }
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
      for (const reqDir of cspErrors(metaCsp)) {
        errors.push(`[${rel}] В meta CSP отсутствует или ослаблена директива ${reqDir}`);
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
    if (tree.nodes.some(node => Object.keys(node.attrs).some(attr => /^on[a-z]+$/i.test(attr)))) {
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
        const entities = parsed['@graph'] || [parsed];
        for (const entity of entities) {
          if (!['FAQPage', 'BreadcrumbList', 'SoftwareApplication', 'Organization'].includes(entity['@type'])) errors.push(`[${rel}] Неподдерживаемый тип JSON-LD`);
          if (entity['@type'] === 'SoftwareApplication' && (pageUrl.pathname !== routeUrl(pageLang, 'home') || entity.name !== 'AntiRacketMantis' || entity.softwareVersion !== VERSION || entity.url !== canonical || entity.inLanguage !== pageLang || entity.applicationCategory !== 'BrowserApplication' || entity.operatingSystem !== 'Chrome 110+, Firefox 128+')) errors.push(`[${rel}] SoftwareApplication JSON-LD содержит неподтверждённые данные`);
          if (entity['@type'] === 'Organization' && (entity.name !== 'WillowinWorlds' || entity.url !== STUDIO || !html.includes(`href="${STUDIO}"`))) errors.push(`[${rel}] Organization JSON-LD не совпадает с видимым разработчиком`);
          if (entity['@type'] === 'FAQPage') {
            const visibleFaqs = tree.nodes.filter(n => n.tag === 'details' && hasClass(n, 'faq-item')).map(n => ({
              q: textOf(tree.nodes.find(c => hasClass(c, 'faq-question') && c.parent?.parent === n)),
              a: textOf(n.children.find(c => typeof c !== 'string' && c.tag === 'p'))
            }));
            const structuredFaqs = (entity.mainEntity || []).map(q => ({ q: q.name, a: q.acceptedAnswer?.text }));
            if (JSON.stringify(visibleFaqs) !== JSON.stringify(structuredFaqs)) errors.push(`[${rel}] FAQPage JSON-LD не совпадает с видимыми вопросами и ответами`);
          }
          if (entity['@type'] === 'BreadcrumbList') {
            const crumbs = tree.nodes.filter(n => n.tag === 'nav' && hasClass(n, 'breadcrumbs'));
            const visible = crumbs.flatMap(n => tree.nodes.filter(c => c.tag === 'li' && c.parent?.parent === n)).map(n => ({
              name: textOf(n.children.find(c => typeof c !== 'string' && c.tag === 'a') || n).replace(/\s+(?:В разработке|In development|Geliştiriliyor)$/, ''),
              item: SITE + (n.children.find(c => typeof c !== 'string' && c.tag === 'a')?.attrs.href || pageUrl.pathname)
            }));
            const structured = (entity.itemListElement || []).map((item, idx) => ({ name: item.name, item: item.item, position: item.position, expected: idx + 1 }));
            if (structured.some(item => item.position !== item.expected) || JSON.stringify(visible) !== JSON.stringify(structured.map(({name, item}) => ({name, item})))) errors.push(`[${rel}] BreadcrumbList JSON-LD не совпадает с видимым путём`);
          }
        }
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
        const tagStart = html.lastIndexOf('<', attrMatch.index);
        const tag = html.slice(tagStart, html.indexOf('>', attrMatch.index) + 1);
        if (attr === 'src' || /^<link\b/i.test(tag) && /rel="(?:stylesheet|preload|manifest|icon)"/i.test(tag)) {
          errors.push(`[${rel}] Внешний загружаемый ресурс запрещён: ${target}`);
        }
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

  // Check picture sources too: a valid PNG fallback must not hide a broken/external WebP.
  for (const [file, html] of htmlByFile) {
    for (const match of html.matchAll(/\bsrcset="([^"]+)"/g)) {
      for (const candidate of match[1].split(',')) {
        const target = candidate.trim().split(/\s+/)[0];
        const url = new URL(target, SITE + '/' + path.relative(DEST, file));
        if (url.origin !== SITE_ORIGIN) errors.push(`[${path.relative(DEST, file)}] Внешний загружаемый ресурс запрещён: ${target}`);
        else if (!fs.existsSync(resolveInternalPath(url.pathname))) errors.push(`[${path.relative(DEST, file)}] Битая внутренняя ссылка в srcset: ${target}`);
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
    if (lastmods.length !== 1 || !isW3cDate(lastmods[0]) || lastmods[0] > new Date().toISOString().slice(0, 10)) {
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
    if (/@import\b/i.test(css)) errors.push(`[assets/${cssFile}] CSS @import запрещён: стили подключаются локально из HTML`);
    for (const m of css.matchAll(/url\((['"]?)([^)'"]+)\1\)/g)) {
      const ref = m[2].trim();
      const assetUrl = new URL(ref, `${SITE}/assets/${cssFile}`);
      if (assetUrl.origin !== SITE_ORIGIN) {
        errors.push(`[assets/${cssFile}] Внешний загружаемый ресурс запрещён: ${ref}`);
        continue;
      }
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
    // WiW bot policy, without its /private/, /admin/, /api/ restrictions: these routes do not exist here (handoff).
    const expectedGroups = [...ROBOTS_ALLOWED_AGENTS.map(agent => ({ agents: [agent], rules: ['allow: /'] })),
      { agents: ROBOTS_TRAINING_AGENTS, rules: ['disallow: /assets/'] }];
    const normalize = list => list.map(g => JSON.stringify({ agents: [...g.agents].map(a => a.toLowerCase()).sort(), rules: [...g.rules].sort() })).sort();
    if (JSON.stringify(normalize(groups)) !== JSON.stringify(normalize(expectedGroups))) {
      errors.push('[robots.txt] Группы и правила должны точно повторять политику ботов WiW: нет лишних, повторных или отсутствующих User-agent/Allow/Disallow');
    }
  }

  // 18. llms.txt validation: every site URL mentioned must exist in dist/
  const llmsPath = path.join(DEST, 'llms.txt');
  if (fs.existsSync(llmsPath)) {
    const llmsText = fs.readFileSync(llmsPath, 'utf8');
    if (!llmsText.includes('# AntiRacketMantis')) errors.push('[llms.txt] Отсутствует заголовок # AntiRacketMantis');
    const urls = [...llmsText.matchAll(/https?:\/\/[^\s)>\]]+/g)].map(m => m[0]);
    const ownUrls = new Set();
    for (const rawUrl of urls) {
      const u = parseUrl(rawUrl);
      if (!u) {
        errors.push(`[llms.txt] Некорректный URL: ${rawUrl}`);
        continue;
      }
      if (u.origin === SITE_ORIGIN) {
        ownUrls.add(u.href);
        const resolved = resolveInternalPath(u.pathname);
        if (!fs.existsSync(resolved)) {
          errors.push(`[llms.txt] URL не найден в dist/: ${rawUrl}`);
        } else if (u.hash && !idsByFile.get(resolved)?.has(decodeURIComponent(u.hash.slice(1)))) {
          errors.push(`[llms.txt] Отсутствующий якорь: ${rawUrl}`);
        }
      }
    }
    for (const l of LANGS) for (const route of ROUTES) {
      const expected = SITE + routeUrl(l, route);
      if (!ownUrls.has(expected)) errors.push(`[llms.txt] Отсутствует ссылка на маршрут: ${expected}`);
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
        if (data.defaultLanguage !== X_DEFAULT_LANG || !isW3cDate(data.lastModified)) errors.push('[languages.json] Некорректные defaultLanguage/lastModified');
        const codes = new Set(data.languages.map(x => x.code));
        if (data.languages.length !== LANGS.length || codes.size !== data.languages.length) errors.push('[languages.json] Лишние или повторяющиеся языки');
        for (const l of LANGS) {
          if (!codes.has(l)) errors.push(`[languages.json] Отсутствует язык ${l}`);
        }
        for (const item of data.languages) {
          const meta = LANG_META[item.code];
          if (!meta || item.hreflang !== meta.hreflang || item.name !== meta.name || item.direction !== meta.direction ||
              item.home !== SITE + routeUrl(item.code, 'home') || item.llms !== SITE + '/llms.txt') errors.push(`[languages.json] Неверные метаданные языка ${item.code}`);
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
      if (mf.start_url !== '/' || mf.scope !== '/' || !fs.existsSync(resolveInternalPath(mf.start_url || '/missing/')) ||
          !/^#[0-9a-f]{6}$/i.test(mf.theme_color || '') || !/^#[0-9a-f]{6}$/i.test(mf.background_color || '')) errors.push('[manifest.webmanifest] Некорректный start_url/scope или цвет');
      if (!Array.isArray(mf.icons) || mf.icons.length < 3 || !['192x192 any', '512x512 any', '512x512 maskable'].every(pair => mf.icons.some(ic => `${ic.sizes} ${ic.purpose}` === pair))) {
        errors.push('[manifest.webmanifest] Должны быть заданы PNG-иконки (192/512/maskable)');
      } else {
        for (const ic of mf.icons) {
          const resolved = resolveInternalPath(ic.src);
          if (!fs.existsSync(resolved)) {
            errors.push(`[manifest.webmanifest] Иконка ${ic.src} не найдена в dist/`);
          } else {
            const png = fs.readFileSync(resolved);
            const size = Number(ic.sizes?.split('x')[0]);
            if (ic.type !== 'image/png' || png.length < 24 || png.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a' ||
                png.readUInt32BE(16) !== size || png.readUInt32BE(20) !== size) errors.push(`[manifest.webmanifest] Неверный формат/размер PNG: ${ic.src}`);
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
    for (const [key, expected] of [['Contact', SECURITY_CONTACT], ['Canonical', `${SITE}/.well-known/security.txt`], ['Preferred-Languages', 'ru, en']]) {
      const lines = [...secText.matchAll(new RegExp(`^${key}:\\s*(.*)$`, 'gm'))].map(m => m[1].trim());
      if (lines.length !== 1 || lines[0] !== expected) errors.push(`[security.txt] Некорректное поле ${key}`);
    }
    const expMatch = secText.match(/^Expires:\s*(.+)$/m);
    if ([...secText.matchAll(/^Expires:/gm)].length !== 1) errors.push('[security.txt] Должно быть ровно одно поле Expires');
    if (expMatch) {
      const expDate = new Date(expMatch[1].trim());
      if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(expMatch[1].trim()) || Number.isNaN(expDate.getTime()) || expDate.getTime() <= Date.now() || expDate.getTime() > Date.now() + 366 * 86400000) {
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
