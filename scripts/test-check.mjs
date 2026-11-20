import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const site = (process.env.SITE_URL || 'https://antiracketmantis.willowinworlds.com').replace(/\/+$/, '');
// Importing the build regenerates dist/ and scripts/sitemap-lastmod.json (a no-op when nothing changed).
const { pageHash, updateLastmod } = await import('./build.mjs');
const home = path.join(root, 'dist/index.html');
const privacy = path.join(root, 'dist/privacy/index.html');
const css = path.join(root, 'dist/assets/styles.css');
const sitemap = path.join(root, 'dist/sitemap.xml');
const robots = path.join(root, 'dist/robots.txt');
const originals = new Map([home, privacy, css, sitemap, robots].map(file => [file, fs.readFileSync(file, 'utf8')]));
const restore = () => originals.forEach((content, file) => fs.writeFileSync(file, content));
let count = 0;

function check(name, file, transform, expected, message = '') {
  restore();
  fs.writeFileSync(file, transform(originals.get(file)));
  const result = spawnSync(process.execPath, ['scripts/check.mjs'], { cwd: root, encoding: 'utf8' });
  assert.equal(result.status, expected, `${name}: ${result.stdout}${result.stderr}`);
  assert.ok((result.stdout + result.stderr).includes(message), `${name}: missing diagnostic ${message}`);
  count++;
}

const link = target => html => html.replace('</main>', `<a href="${target}">Проверка ссылки</a></main>`);
try {
  for (const target of ['missing.html', '/missing/', `${site}/missing/`, '//'+new URL(site).host+'/missing/']) {
    check(`broken ${target}`, home, link(target), 1, 'Битая внутренняя ссылка');
  }
  check('relative asset', home, html => html.replace('/assets/mascot.svg', 'missing.svg'), 1, 'Битая внутренняя ссылка');
  check('relative parent link', privacy, link('../terms/#open-questions'), 0);
  check('absolute internal anchor', home, link(`${site}/privacy/#permissions`), 0);
  check('encoded anchor', home, link('/privacy/#%70ermissions'), 0);
  check('missing relative anchor', privacy, link('../terms/#missing'), 1, 'отсутствующий якорь');
  check('origin prefix is external', home, link(`${site}.example/path`), 1, 'noopener');
  check('missing title', home, html => html.replace(/<title>.*?<\/title>/, ''), 1, 'Отсутствует или пустой тег <title>');
  check('missing description', home, html => html.replace(/<meta name="description"[^>]+>/, ''), 1, 'Отсутствует или пустой');
  check('duplicate title', privacy, html => html.replace(/<title>.*?<\/title>/, originals.get(home).match(/<title>.*?<\/title>/)[0]), 1, 'Дублирующийся <title>');
  check('missing alt', home, html => html.replace(/ alt="[^"]*"/, ''), 1, 'отсутствует атрибут alt');
  check('missing sitemap page', sitemap, xml => xml.replace(/<url>\s*<loc>[^<]*\/privacy\/<\/loc>[\s\S]*?<\/url>/, ''), 1, 'Страница отсутствует в sitemap');
  check('noindex page in sitemap', sitemap, xml => xml.replace('</urlset>', `<url><loc>${site}/404.html</loc><lastmod>2026-01-01</lastmod></url></urlset>`), 1, 'noindex-страница');
  check('loc differs from canonical', sitemap, xml => xml.replace(`${site}/privacy/</loc>`, `${site}/privacy</loc>`), 1, 'не совпадает с canonical');
  check('invalid lastmod date', sitemap, xml => xml.replace(/<lastmod>[^<]*<\/lastmod>/, '<lastmod>2026-02-30</lastmod>'), 1, 'ГГГГ-ММ-ДД');
  check('missing lastmod', sitemap, xml => xml.replace(/<lastmod>[^<]*<\/lastmod>\n/, ''), 1, 'ГГГГ-ММ-ДД');
  check('missing sitemap image', sitemap, xml => xml.replace('/assets/mascot.svg</image:loc>', '/assets/missing.svg</image:loc>'), 1, 'не найдено в dist');
  check('image not on page', sitemap, xml => xml.replace('/assets/mascot.svg</image:loc>', '/assets/og.png</image:loc>'), 1, 'не используется на странице');
  check('malformed sitemap xml', sitemap, xml => xml.replace('</lastmod>', '</lastmo>'), 1, 'Некорректный XML');
  check('hreflang only in sitemap', sitemap, xml => xml.replace('</lastmod>', `</lastmod><xhtml:link rel="alternate" hreflang="en" href="${site}/en/" />`), 1, 'hreflang');
  check('robots without Sitemap line', robots, text => text.replace(/^Sitemap:.*\n?/m, ''), 1, 'Отсутствует строка «Sitemap');
  check('robots without training bot', robots, text => text.replace('User-agent: GPTBot\n', ''), 1, 'Нет группы User-agent: GPTBot');
  check('robots with extra bot', robots, text => `${text}\nUser-agent: ExtraBot\nDisallow: /\n`, 1, 'Неожиданный User-agent');
  check('robots blocks a search bot', robots, text => text.replace('User-agent: Claude-SearchBot\nAllow: /', 'User-agent: Claude-SearchBot\nDisallow: /'), 1, 'Claude-SearchBot');
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
