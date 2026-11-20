import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const site = (process.env.SITE_URL || 'https://antiracketmantis.willowinworlds.com').replace(/\/+$/, '');
// Importing the build regenerates dist/ and scripts/sitemap-lastmod.json (a no-op when nothing changed).
const { minifyCss, pageHash, updateLastmod } = await import('./build.mjs');

const home = path.join(root, 'dist/index.html');
const enHome = path.join(root, 'dist/en/index.html');
const trHome = path.join(root, 'dist/tr/index.html');
const privacy = path.join(root, 'dist/privacy/index.html');
const pro = path.join(root, 'dist/pro/index.html');
const css = path.join(root, 'dist/assets/styles.css');
const sitemap = path.join(root, 'dist/sitemap.xml');
const robots = path.join(root, 'dist/robots.txt');
const llms = path.join(root, 'dist/llms.txt');
const langsJson = path.join(root, 'dist/languages.json');
const manifest = path.join(root, 'dist/manifest.webmanifest');
const securityTxt = path.join(root, 'dist/.well-known/security.txt');
const headers = path.join(root, 'dist/_headers');
const notFound = path.join(root, 'dist/404.html');
const enPro = path.join(root, 'dist/en/pro/index.html');

const tracked = [home, enHome, trHome, privacy, pro, css, sitemap, robots, llms, langsJson, manifest, securityTxt, headers, notFound, enPro];
const originals = new Map(tracked.map(file => [file, fs.readFileSync(file, 'utf8')]));
const restore = () => originals.forEach((content, file) => fs.writeFileSync(file, content));
let count = 0;

function check(name, file, transform, expected, message = '') {
  restore();
  const changed = transform(originals.get(file));
  assert.notEqual(changed, originals.get(file), `${name}: mutation did not change the fixture`);
  fs.writeFileSync(file, changed);
  const result = spawnSync(process.execPath, ['scripts/check.mjs'], { cwd: root, encoding: 'utf8' });
  assert.equal(result.status, expected, `${name}: ${result.stdout}${result.stderr}`);
  if (message) {
    assert.ok((result.stdout + result.stderr).includes(message), `${name}: missing diagnostic "${message}" in:\n${result.stdout}${result.stderr}`);
  }
  count++;
}

const link = target => html => html.replace('</main>', `<a href="${target}">Check link</a></main>`);

try {
  // Links, assets, anchors, noopener
  for (const target of ['missing.html', '/missing/', `${site}/missing/`, '//' + new URL(site).host + '/missing/']) {
    check(`broken ${target}`, home, link(target), 1, 'Битая внутренняя ссылка');
  }
  check('relative asset', home, html => html.replace('/assets/mascot.svg', 'missing.svg'), 1, 'Битая внутренняя ссылка');
  check('relative parent link', privacy, link('../terms/#open-questions'), 0);
  check('absolute internal anchor', home, link(`${site}/privacy/#permissions`), 0);
  check('encoded anchor', home, link('/privacy/#%70ermissions'), 0);
  check('missing relative anchor', privacy, link('../terms/#missing'), 1, 'отсутствующий якорь');
  check('origin prefix is external', home, link(`${site}.example/path`), 1, 'noopener');
  check('placeholder href=#', home, link('#'), 1, 'href="#"');
  check('unconfigured store link', home, html => html.replace('</main>', '<a href="https://chromewebstore.google.com/detail/test" rel="noopener">Store</a></main>'), 1, 'не задана в STORES');

  // Titles, descriptions, alt, headings
  check('missing title', home, html => html.replace(/<title>.*?<\/title>/, ''), 1, 'Отсутствует или пустой тег <title>');
  check('missing description', home, html => html.replace(/<meta name="description"[^>]+>/, ''), 1, 'Отсутствует или пустой');
  check('duplicate title', privacy, html => html.replace(/<title>.*?<\/title>/, originals.get(home).match(/<title>.*?<\/title>/)[0]), 1, 'Дублирующийся <title>');
  check('missing alt', home, html => html.replace(/ alt="[^"]*"/, ''), 1, 'отсутствует атрибут alt');
  check('skipped heading level', privacy, html => html.replace('</main>', '<h4>Skipped</h4></main>'), 1, 'иерархия заголовков');

  // Language mixing checks
  check('cyrillic on EN page', enHome, html => html.replace('</main>', '<p>Случайный текст</p></main>'), 1, 'найдена кириллица');
  check('cyrillic on TR page', trHome, html => html.replace('</main>', '<p>Ошибка</p></main>'), 1, 'найдена кириллица');
  check('turkish letter on EN page', enHome, html => html.replace('</main>', '<p>Geliştiriliyor</p></main>'), 1, 'турецкие буквы');
  check('turkish letter on RU page', home, html => html.replace('</main>', '<p>Çalışıyor</p></main>'), 1, 'турецкие буквы');
  check('leftover english on TR page', trHome, html => html.replace('</main>', '<p>This browser extension will protect your privacy without trackers.</p></main>'), 1, 'английские слова на турецкой странице');

  // PRO, purchase, solver & CAPTCHA guarantee checks
  check('PRO without in-development status', privacy, html => html.replace(/data-status="in-development"/g, ''), 1, 'data-status="in-development"');
  check('forbidden purchase word', pro, html => html.replace('</main>', '<p>Buy now for $39</p></main>'), 1, 'запрещённое слово/ссылка покупки');
  check('forbidden payment url', pro, html => html.replace('</main>', '<a href="https://stripe.com/pay" rel="noopener">Pay</a></main>'), 1, 'запрещённое слово/ссылка покупки');
  check('forbidden solver name', pro, html => html.replace('</main>', '<p>Powered by NopeCHA</p></main>'), 1, 'стороннего сервиса решения CAPTCHA');
  check('CAPTCHA guarantee in same sentence', pro, html => html.replace('</main>', '<p>PRO гарантирует прохождение CAPTCHA на сайте.</p></main>'), 1, 'сочетание CAPTCHA и гарантии');
  check('JSON-LD Offer forbidden', pro, html => html.replace('</head>', '<script type="application/ld+json">{"@type":"Offer","price":"39"}</script></head>'), 1, 'неподтверждённые поля');

  // hreflang & canonical
  check('missing x-default', enHome, html => html.replace(/<link rel="alternate" hreflang="x-default"[^>]+>/, ''), 1, 'hreflang="x-default"');
  check('x-default points to RU instead of EN', enHome, html => html.replace(`hreflang="x-default" href="${site}/en/"`, `hreflang="x-default" href="${site}/"`), 1, 'должен указывать на EN-версию');
  check('non-reciprocal hreflang', trHome, html => html.replace(/<link rel="alternate" hreflang="en"[^>]+>/, ''), 1, 'Отсутствует hreflang="en"');
  check('canonical mismatch', privacy, html => html.replace(`${site}/privacy/`, `${site}/other/`), 1, 'canonical');

  // Sitemap checks
  check('missing sitemap page', sitemap, xml => xml.replace(/<url>\s*<loc>[^<]*\/privacy\/<\/loc>[\s\S]*?<\/url>/, ''), 1, 'Страница отсутствует в sitemap');
  check('noindex page in sitemap', sitemap, xml => xml.replace('</urlset>', `<url><loc>${site}/404.html</loc><lastmod>2026-01-01</lastmod></url></urlset>`), 1, 'noindex-страница');
  check('loc differs from canonical', sitemap, xml => xml.replace(`${site}/privacy/</loc>`, `${site}/privacy</loc>`), 1, 'не совпадает с canonical');
  check('invalid lastmod date', sitemap, xml => xml.replace(/<lastmod>[^<]*<\/lastmod>/, '<lastmod>2026-02-30</lastmod>'), 1, 'ГГГГ-ММ-ДД');
  check('missing lastmod', sitemap, xml => xml.replace(/<lastmod>[^<]*<\/lastmod>\n/, ''), 1, 'ГГГГ-ММ-ДД');
  check('missing sitemap image', sitemap, xml => xml.replace('/assets/mascot.svg</image:loc>', '/assets/missing.svg</image:loc>'), 1, 'не найдено в dist');
  check('image not on page', sitemap, xml => xml.replace('/assets/mascot.svg</image:loc>', '/assets/og.png</image:loc>'), 1, 'не используется на странице');
  check('malformed sitemap xml', sitemap, xml => xml.replace('</lastmod>', '</lastmo>'), 1, 'Некорректный XML');
  check('hreflang mismatch in sitemap', sitemap, xml => xml.replace('hreflang="x-default"', 'hreflang="de"'), 1, 'hreflang');

  // robots.txt, llms.txt, languages.json, manifest, security.txt, _headers
  check('robots without Sitemap line', robots, text => text.replace(/^Sitemap:.*\n?/m, ''), 1, 'Отсутствует строка «Sitemap');
  check('robots without llms comment', robots, text => text.replace(/#.*llms\.txt.*\n?/g, ''), 1, '/llms.txt');
  check('robots without training bot', robots, text => text.replace('User-agent: GPTBot\n', ''), 1, 'User-agent/Allow/Disallow');
  check('robots with extra bot', robots, text => `${text}\nUser-agent: ExtraBot\nDisallow: /\n`, 1, 'User-agent/Allow/Disallow');
  check('robots blocks a search bot', robots, text => text.replace('User-agent: Claude-SearchBot\nAllow: /', 'User-agent: Claude-SearchBot\nDisallow: /'), 1, 'User-agent/Allow/Disallow');
  check('llms broken site url', llms, text => `${text}\n- [Broken](${site}/nope/)\n`, 1, '[llms.txt] URL не найден в dist/');
  check('languages.json broken url', langsJson, text => text.replace('/tr/', '/missing-tr/'), 1, '[languages.json]');
  check('manifest broken icon', manifest, text => text.replace('icon-192.png', 'missing-192.png'), 1, '[manifest.webmanifest]');
  check('security.txt expired date', securityTxt, text => text.replace(/Expires: .*/, 'Expires: 2020-01-01T00:00:00.000Z'), 1, '[security.txt]');
  check('headers missing HSTS', headers, text => text.replace(/Strict-Transport-Security:.*\n/, ''), 1, 'Strict-Transport-Security');

  // Independently reproduced review escapes: each mutation must fail for its own rule.
  check('unmarked PRO next to marked PRO', enHome, html => html.replace('</main>', '<section><h2>PRO tools</h2><p>CAPTCHA recognition and automation.</p></section></main>'), 1, 'видимый бейдж');
  check('PRO badge missing in one block', enPro, html => html.replace('<span class="status-pill dev-pill">In development</span>\n      <h2>Straight talk', '<h2>Straight talk'), 1, 'видимый бейдж');
  check('PRO badge hidden', enPro, html => html.replace('<span class="status-pill dev-pill">In development</span>\n      <h2>Straight talk', '<span class="status-pill dev-pill" hidden>In development</span>\n      <h2>Straight talk'), 1, 'видимый бейдж');
  check('planned price label missing', enPro, html => html.replace('<span class="pro-price-label">planned price</span>', ''), 1, 'Цена PRO');
  check('wrong planned price', enPro, html => html.replace('$39', '$49'), 1, 'Цена PRO');
  check('wrong planned currency', enPro, html => html.replace('$39', '€39'), 1, 'Цена PRO');
  check('yearly rather than monthly price', enPro, html => html.replace('<span> / month</span>', '<span> / year</span>'), 1, 'Цена PRO');
  check('bypass forbidden', enPro, html => html.replace('</main>', '<p>CAPTCHA bypass.</p></main>'), 1, 'bypass/обхода');
  check('Russian automation inflection', home, html => html.replace('</main>', '<section><p>Автоматизированные действия.</p></section></main>'), 1, 'видимый бейдж');
  check('accessible label language mixing', enHome, html => html.replace('</main>', '<button aria-label="Русский текст">OK</button></main>'), 1, 'найдена кириллица');
  check('entity encoded language mixing', enHome, html => html.replace('</main>', '<p>&#x420;&#x443;&#x441;</p></main>'), 1, 'найдена кириллица');
  check('same language wrapper does not hide mixing', enHome, html => html.replace('</main>', '<section lang="en"><p>Русский</p></section></main>'), 1, 'найдена кириллица');
  check('explicit foreign lang supported', enHome, html => html.replace('</main>', '<section lang="en"><span lang="ru">Русский</span></section></main>'), 0);
  check('Cyrillic needs RU, not any foreign lang', enHome, html => html.replace('</main>', '<span lang="tr">Русский</span></main>'), 1, 'найдена кириллица');
  check('Turkish needs TR, not any foreign lang', enHome, html => html.replace('</main>', '<span lang="ru">Geliştiriliyor</span></main>'), 1, 'турецкие буквы');
  check('English needs EN, not any foreign lang', trHome, html => html.replace('</main>', '<span lang="ru">This browser</span></main>'), 1, 'английские слова');
  check('duplicate description across languages', enHome, html => html.replace(/<meta name="description"[^>]+>/, originals.get(home).match(/<meta name="description"[^>]+>/)[0]), 1, 'Дублирующийся meta description');
  check('title length is warning', enHome, html => html.replace(/<title>[^<]*<\/title>/, `<title>${'Long title '.repeat(7)}</title>`), 0, 'Длинный <title>');
  check('description length is warning', enHome, html => html.replace(/<meta name="description"[^>]+>/, '<meta name="description" content="Short">'), 0, 'Длина meta description');
  check('missing H1', home, html => html.replace(/<h1>[^]*?<\/h1>/, ''), 1, 'ровно один');
  check('duplicate H1', home, html => html.replace('</main>', '<h1>Second title</h1></main>'), 1, 'ровно один');
  check('image without dimensions', home, html => html.replace(' width="42"', ''), 1, 'width и height');
  check('wrong route language', enHome, html => html.replace('<html lang="en"', '<html lang="ru"'), 1, 'языком маршрута');
  check('404 must stay noindex', notFound, html => html.replace('<meta name="robots" content="noindex">', ''), 1, 'Только 404.html');
  check('404 needs every language block', notFound, html => html.replace('class="doc-card not-found-card" lang="tr"', 'class="doc-card not-found-card" lang="de"'), 1, 'отдельный блок lang="tr"');
  check('regular route must stay indexable', enHome, html => html.replace('</head>', '<meta name="robots" content="noindex"></head>'), 1, 'Только 404.html');
  check('hreflang wrong same-site route', enHome, html => html.replace(`hreflang="ru" href="${site}/"`, `hreflang="ru" href="${site}/features/"`), 1, 'тот же маршрут');
  check('hreflang must be absolute', enHome, html => html.replace(`hreflang="ru" href="${site}/"`, 'hreflang="ru" href="/"'), 1, 'абсолютным URL');
  check('duplicate hreflang', enHome, html => html.replace('</head>', `<link rel="alternate" hreflang="ru" href="${site}/"></head>`), 1, 'лишние или повторяющиеся');
  check('wrong og locale', enHome, html => html.replace('content="en_US"', 'content="de_DE"'), 1, 'og:locale');
  check('missing alternate og locale', enHome, html => html.replace(/<meta property="og:locale:alternate"[^>]+>/, ''), 1, 'og:locale:alternate');
  check('invisible FAQ structured answer', enPro, html => html.replace('"text":"One extension:', '"text":"INVENTED ANSWER. One extension:'), 1, 'FAQPage JSON-LD');
  check('invisible breadcrumb', enPro, html => html.replace('"name":"Home"', '"name":"Invented home"'), 1, 'BreadcrumbList JSON-LD');
  check('invalid JSON-LD', enPro, html => html.replace('"@context":', 'BROKEN:'), 1, 'Некорректный JSON-LD');
  check('missing meta CSP', enHome, html => html.replace(/<meta http-equiv="Content-Security-Policy"[^>]+>/, ''), 1, 'Отсутствует мета-тег Content-Security-Policy');
  for (const [directive, replacement] of [["script-src 'self'", "script-src 'self' 'unsafe-inline' https:"], ["connect-src 'self'", "connect-src 'self' https:"], ['upgrade-insecure-requests', '']]) {
    check(`strict meta CSP ${directive}`, enHome, html => html.replace(directive, replacement), 1, 'meta CSP');
    check(`strict header CSP ${directive}`, headers, text => text.replace(directive, replacement), 1, 'Content-Security-Policy');
  }
  check('missing referrer meta', enHome, html => html.replace('<meta name="referrer" content="no-referrer">', ''), 1, 'Referrer-Policy');
  check('inline script', enHome, html => html.replace('</main>', '<script>alert(1)</script></main>'), 1, 'inline <script>');
  check('inline style', enHome, html => html.replace('<main id="main"', '<main style="color:red" id="main"'), 1, 'inline-атрибут');
  check('inline handler', enHome, html => html.replace('<main id="main"', '<main onclick="alert(1)" id="main"'), 1, 'inline-обработчик');
  check('inline pointer handler', enHome, html => html.replace('<main id="main"', '<main onpointerdown="alert(1)" id="main"'), 1, 'inline-обработчик');
  check('third-party image', enHome, html => html.replace('src="/assets/mark.svg"', 'src="https://tracker.example/pixel.png"'), 1, 'Внешний загружаемый ресурс');
  check('third-party stylesheet', enHome, html => html.replace('href="/assets/styles.css"', 'href="https://tracker.example/style.css"'), 1, 'Внешний загружаемый ресурс');
  check('robots extra restriction', robots, text => text.replace('User-agent: OAI-SearchBot\nAllow: /', 'User-agent: OAI-SearchBot\nAllow: /\nDisallow: /en/'), 1, 'User-agent/Allow/Disallow');
  check('robots duplicate group', robots, text => `${text}\nUser-agent: GPTBot\nAllow: /\n`, 1, 'User-agent/Allow/Disallow');
  check('robots missing asset restriction', robots, text => text.replace('Disallow: /assets/', 'Allow: /assets/'), 1, 'User-agent/Allow/Disallow');
  check('llms missing distinct route', llms, text => text.replaceAll(`${site}/tr/pro/`, `${site}/tr/`), 1, 'Отсутствует ссылка на маршрут');
  check('llms missing heading', llms, text => text.replace('# AntiRacketMantis', '# Product'), 1, 'Отсутствует заголовок');
  check('llms broken anchor', llms, text => `${text}\n- [Link](${site}/en/#missing-anchor)\n`, 1, 'Отсутствующий якорь');
  check('languages default must be EN', langsJson, text => text.replace('"defaultLanguage": "en"', '"defaultLanguage": "ru"'), 1, 'defaultLanguage');
  check('languages wrong hreflang', langsJson, text => text.replace('"hreflang": "en"', '"hreflang": "de"'), 1, 'Неверные метаданные');
  check('languages wrong home', langsJson, text => text.replace(`${site}/tr/`, `${site}/en/`), 1, 'Неверные метаданные');
  check('languages duplicate', langsJson, text => { const data = JSON.parse(text); data.languages.push(data.languages[0]); return JSON.stringify(data); }, 1, 'повторяющиеся языки');
  check('manifest bad start', manifest, text => text.replace('"start_url": "/"', '"start_url": "/missing/"'), 1, 'start_url/scope');
  check('manifest no maskable', manifest, text => text.replace('"purpose": "maskable"', '"purpose": "any"'), 1, '192/512/maskable');
  check('manifest wrong PNG size', manifest, text => text.replace('"icon-192.png"', '"icon-512.png"').replace('/assets/icons/icon-192.png', '/assets/icons/icon-512.png'), 1, 'формат/размер PNG');
  check('security wrong canonical', securityTxt, text => text.replace(`${site}/.well-known/security.txt`, `${site}/missing/`), 1, 'Некорректное поле Canonical');
  check('security invalid contact', securityTxt, text => text.replace(/^Contact:.*$/m, 'Contact: not a URL'), 1, 'Некорректное поле Contact');
  check('security wrong languages', securityTxt, text => text.replace('ru, en', 'en'), 1, 'Preferred-Languages');
  check('security far future expiry', securityTxt, text => text.replace(/^Expires:.*$/m, 'Expires: 2999-01-01T00:00:00Z'), 1, 'Expires');
  check('security date must be timestamp', securityTxt, text => text.replace(/^Expires:.*$/m, 'Expires: 2027-01-01'), 1, 'Expires');
  for (const [file, diagnostic] of [[langsJson, '[languages.json]'], [manifest, '[manifest.webmanifest]']]) {
    check(`invalid JSON ${path.basename(file)}`, file, () => '{', 1, diagnostic);
  }
  for (const file of [home, notFound, headers, robots, sitemap, llms, langsJson, manifest, securityTxt]) {
    restore();
    fs.unlinkSync(file);
    const result = spawnSync(process.execPath, ['scripts/check.mjs'], { cwd: root, encoding: 'utf8' });
    assert.equal(result.status, 1, `missing file ${file}`);
    assert.match(result.stderr, /Отсутствует (?:обязательный файл|маршрут)/);
    count++;
  }
  restore();

  check('one leftover English word on TR', trHome, html => html.replace('</main>', '<p>HTTP-only site</p></main>'), 1, 'английские слова');
  check('unsupported structured type', enHome, html => html.replace('"@type":"SoftwareApplication"', '"@type":"Product"'), 1, 'Неподдерживаемый тип');
  check('invented software version', enHome, html => html.replace('"softwareVersion":"0.11.0"', '"softwareVersion":"999"'), 1, 'SoftwareApplication JSON-LD');
  check('invented developer', enHome, html => html.replaceAll('"name":"WillowinWorlds"', '"name":"Invented Studio"'), 1, 'Organization JSON-LD');
  check('missing WebP with valid PNG', enHome, html => html.replace('srcset="/assets/screenshots/popup-shield-en.webp"', 'srcset="/assets/missing.webp"'), 1, 'srcset');
  check('external WebP with valid PNG', enHome, html => html.replace('srcset="/assets/screenshots/popup-shield-en.webp"', 'srcset="https://tracker.example/pixel.webp"'), 1, 'Внешний загружаемый ресурс');
  check('external CSS resource', css, text => text + '\nbody{background-image:url(https://tracker.example/pixel.png)}', 1, 'Внешний загружаемый ресурс');
  check('CSS import', css, text => '@import "https://tracker.example/style.css";\n' + text, 1, 'CSS @import');
  check('duplicate security expiry', securityTxt, text => text + 'Expires: 2999-01-01T00:00:00Z\n', 1, 'ровно одно поле Expires');
  check('future lastmod', sitemap, xml => xml.replace(/<lastmod>[^<]*<\/lastmod>/, '<lastmod>2999-01-01</lastmod>'), 1, 'ГГГГ-ММ-ДД');
  for (const uri of ['http://www.sitemaps.org/schemas/sitemap/0.9', 'http://www.google.com/schemas/sitemap-image/1.1', 'http://www.w3.org/1999/xhtml']) {
    check(`wrong sitemap namespace ${uri}`, sitemap, xml => xml.replace(uri, 'https://example.org/wrong'), 1, 'пространство имён');
  }

  // Source key parity is checked in an isolated checker copy; real source files are never mutated.
  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'arm-checker-'));
  try {
    fs.mkdirSync(path.join(fixture, 'scripts'));
    fs.mkdirSync(path.join(fixture, 'src/content'), {recursive: true});
    for (const name of ['check.mjs', 'html-check.mjs']) fs.copyFileSync(path.join(root, 'scripts', name), path.join(fixture, 'scripts', name));
    for (const name of ['config', 'ru', 'en', 'tr']) fs.copyFileSync(path.join(root, `src/content/${name}.mjs`), path.join(fixture, `src/content/${name}.mjs`));
    fs.symlinkSync(path.join(root, 'dist'), path.join(fixture, 'dist'));
    const contentFile = path.join(fixture, 'src/content/en.mjs');
    fs.writeFileSync(contentFile, fs.readFileSync(contentFile, 'utf8').replace('ui: {', 'ui: { extraReviewKey: true,'));
    const result = spawnSync(process.execPath, ['scripts/check.mjs'], { cwd: fixture, encoding: 'utf8' });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Структура ключей отличается/);
    count++;
  } finally { fs.rmSync(fixture, {recursive: true, force: true}); }

  // CSS checks
  check('root-relative CSS asset', css, text => text + '\nbody{background-image:url(/assets/mark.svg)}', 0);
  check('missing CSS asset', css, text => text + '\nbody{background-image:url(/assets/missing.svg)}', 1, 'Битая ссылка на ресурс в CSS');

  // lastmod moves only for a page whose HTML really changed; the build year is not content.
  assert.match(minifyCss('.footer :focus-visible { outline-color: gold; }'), /\.footer :focus-visible\{/);
  count++;
  const page = (name, body) => `<link rel="canonical" href="${site}/${name}/"><footer>© 2026 ${body}</footer>`;
  assert.equal(pageHash(page('a', 'x')), pageHash(page('a', 'x').replace('© 2026', '© 2027')));
  let dates = updateLastmod({}, [page('a', 'x'), page('b', 'x')], '2026-01-01');
  dates = updateLastmod(dates, [page('a', 'y'), page('b', 'x').replace('2026', '2027')], '2026-02-02');
  assert.deepEqual([dates['/a/'].lastmod, dates['/b/'].lastmod], ['2026-02-02', '2026-01-01']);
  count++;

  console.log(`PASS: ${count} checker regression cases; dist restored.`);
} finally {
  restore();
}
