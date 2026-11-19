import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const site = (process.env.SITE_URL || 'https://antiracketmantis.willowinworlds.com').replace(/\/+$/, '');
const home = path.join(root, 'dist/index.html');
const privacy = path.join(root, 'dist/privacy/index.html');
const css = path.join(root, 'dist/assets/styles.css');
const sitemap = path.join(root, 'dist/sitemap.xml');
const originals = new Map([home, privacy, css, sitemap].map(file => [file, fs.readFileSync(file, 'utf8')]));
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
  check('missing sitemap page', sitemap, xml => xml.replace(/<url><loc>[^<]*\/privacy\/<\/loc><\/url>/, ''), 1, 'Страница отсутствует в sitemap');
  check('root-relative CSS asset', css, text => text + '\nbody{background-image:url(/assets/mark.svg)}', 0);
  check('missing CSS asset', css, text => text + '\nbody{background-image:url(/assets/missing.svg)}', 1, 'Битая ссылка на ресурс в CSS');
  console.log(`PASS: ${count} checker regression cases; dist restored.`);
} finally {
  restore();
}
