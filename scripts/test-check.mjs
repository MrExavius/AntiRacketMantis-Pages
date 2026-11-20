import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const site = (process.env.SITE_URL || 'https://antiracketmantis.willowinworlds.com').replace(/\/+$/, '');
// Importing the build regenerates dist/ and scripts/sitemap-lastmod.json (a no-op when nothing changed).
const { pageHash, updateLastmod } = await import('./build.mjs');

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

const tracked = [home, enHome, trHome, privacy, pro, css, sitemap, robots, llms, langsJson, manifest, securityTxt, headers];
const originals = new Map(tracked.map(file => [file, fs.readFileSync(file, 'utf8')]));
const restore = () => originals.forEach((content, file) => fs.writeFileSync(file, content));
let count = 0;

function check(name, file, transform, expected, message = '') {
  restore();
  fs.writeFileSync(file, transform(originals.get(file)));
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
  check('robots without training bot', robots, text => text.replace('User-agent: GPTBot\n', ''), 1, 'Нет группы User-agent: GPTBot');
  check('robots with extra bot', robots, text => `${text}\nUser-agent: ExtraBot\nDisallow: /\n`, 1, 'Неожиданный User-agent');
  check('robots blocks a search bot', robots, text => text.replace('User-agent: Claude-SearchBot\nAllow: /', 'User-agent: Claude-SearchBot\nDisallow: /'), 1, 'Claude-SearchBot');
  check('llms broken site url', llms, text => `${text}\n- [Broken](${site}/nope/)\n`, 1, '[llms.txt] URL не найден в dist/');
  check('languages.json broken url', langsJson, text => text.replace('/tr/', '/missing-tr/'), 1, '[languages.json]');
  check('manifest broken icon', manifest, text => text.replace('icon-192.png', 'missing-192.png'), 1, '[manifest.webmanifest]');
  check('security.txt expired date', securityTxt, text => text.replace(/Expires: .*/, 'Expires: 2020-01-01T00:00:00.000Z'), 1, '[security.txt]');
  check('headers missing HSTS', headers, text => text.replace(/Strict-Transport-Security:.*\n/, ''), 1, 'Strict-Transport-Security');

  // CSS checks
  check('root-relative CSS asset', css, text => text + '\nbody{background-image:url(/assets/mark.svg)}', 0);
  check('missing CSS asset', css, text => text + '\nbody{background-image:url(/assets/missing.svg)}', 1, 'Битая ссылка на ресурс в CSS');

  // lastmod moves only for a page whose HTML really changed; the build year is not content.
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
