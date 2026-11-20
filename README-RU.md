# AntiRacketMantis — сайт

Исходники и сборка мультиязычного сайта https://antiracketmantis.willowinworlds.com (RU / EN / TR) в одном репозитории.

## Публикация и сборка

- `main` — опубликованная версия. Сборка `dist/` в Git не хранится: её выполняет GitHub Actions (`.github/workflows/pages.yml`): проверки на каждом push/PR, деплой только при push в `main`.
- **Перед первым слиянием `dev` → `main`** переключите *Settings → Pages → Source* на **GitHub Actions** (если всё ещё выбран «Deploy from a branch»). Домен берётся из настроек Pages (`CNAME` оставлен для справки).
- Перед коммитом запускайте:
  - `node scripts/build.mjs` (собирает `dist/`, обновляет `scripts/sitemap-lastmod.json` и запускает `scripts/check.mjs`)
  - `node scripts/test-check.mjs` (регрессионные тесты чекера)

### Переменные окружения сборки

- `SITE_URL` — адрес сайта (по умолчанию `https://antiracketmantis.willowinworlds.com`). При переезде на свой домен: `SITE_URL=https://antiracketmantis.com node scripts/build.mjs`.
- `LANGS` — языки сборки (по умолчанию `ru,en,tr`: русский в корне `/`, английский `/en/` и `x-default`, турецкий `/tr/`). Нестандартный набор `LANGS` меняет `scripts/sitemap-lastmod.json` — такой файл не коммитьте.
- `GSC_VERIFICATION` и `BING_VERIFICATION` — необязательные коды подтверждения Google Search Console и Bing Webmaster Tools. Если переменная задана, в `<head>` добавляется соответствующий `<meta>`-тег; если пуста — мета-теги не выводятся. **Рекомендуемый способ подтверждения прав на домен — через DNS TXT-запись** (не требует правок HTML).

## Ссылки на магазины расширений (`STORES`)

Единая конфигурация ссылок находится в `src/content/config.mjs`:

```js
export const STORES = {
  chrome: null,
  firefox: null
};
```

- Пока значение `null`, кнопки на сайте ведут на локальную инструкцию `/install/#chrome` или `/install/#firefox` на том же языке с видимым бейджем «скоро» / «soon» / «yakında» (без неработающих кнопок и заглушек `href="#"`).
- После публикации в Chrome Web Store и/или Firefox Add-ons впишите реальный `https://`-адрес в `STORES.chrome` / `STORES.firefox` и пересоберите сайт: кнопки автоматически станут внешними ссылками с `rel="noopener"`.

## Контент, шрифты, иконки и скриншоты

- Все пользовательские тексты вынесены в модули `src/content/ru.mjs`, `src/content/en.mjs`, `src/content/tr.mjs` с идентичной структурой ключей (проверяется в `scripts/check.mjs`).
- Шрифт заголовков Nunito лежит локально в `src/fonts/` (`nunito-cyrillic.woff2`, `nunito-latin.woff2`, `nunito-latin-ext.woff2` для турецких `ğ ş İ Ğ Ş`, лицензия SIL OFL 1.1 в `src/fonts/OFL.txt`).
- PNG-иконки веб-манифеста и `apple-touch-icon` сгенерированы из `src/mark.svg` в `src/icons/`.
- Снимки интерфейса расширения лежат в `src/screenshots/` (RU и EN версии WebP + PNG только разделов защиты версии `0.11.0`, без разделов CAPTCHA/OCR/облака/API-ключей). На турецких страницах используются EN-снимки с явной подписью, что интерфейс показан на английском.

Проверка смешения языков учитывает вложенные `lang`, числовые HTML-сущности и доступные имена элементов. Для TR используется эвристика: отдельные английские служебные слова из `TR_LEFTOVER_EN_RE` в `scripts/check.mjs` вне `lang="en"` вызывают ошибку. Например, остаток `HTTP-only site` нужно перевести. Эвристика не заменяет редакторскую проверку смысла и естественности перевода.

## Индексация, `llms.txt`, `languages.json`, `security.txt` и `_headers`

- `dist/sitemap.xml`: канонические URL всех индексируемых страниц на всех языках, `lastmod` из `scripts/sitemap-lastmod.json`, взаимные `xhtml:link` (`ru`, `en`, `tr`, `x-default` → EN) и `image:image`.
- `dist/robots.txt`: повторяет политику сестринского сайта `willowinworlds.com` (ИИ-поисковые и пользовательские боты разрешены, ИИ-краулеры обучения закрыты от `/assets/`, остальным разрешено всё), содержит `Sitemap:` и комментарии со ссылками на `/llms.txt` и `/languages.json`.
- `dist/llms.txt`: кураторский обзор продукта на английском языке со ссылками на все страницы RU/EN/TR.
- `dist/languages.json`: машиночитаемая карта языков (`schemaVersion: 1`, `code`, `hreflang`, `name`, `direction`, `home`, `llms`).
- `dist/manifest.webmanifest` и `dist/.well-known/security.txt` (контакт студии `https://willowinworlds.com/#contact`).
- `dist/_headers`: заголовки безопасности и кеширования для **Cloudflare Pages / Netlify** (`CSP` с `base-uri 'none'`, `frame-src 'none'`, `connect-src 'self'`, `manifest-src 'self'`, `worker-src 'none'`, `media-src 'none'`, `frame-ancestors 'none'`, `upgrade-insecure-requests`; `Strict-Transport-Security`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer`, `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy`, `X-Permitted-Cross-Domain-Policies`, `Origin-Agent-Cluster`). **GitHub Pages игнорирует `_headers`**, поэтому строгий `<meta http-equiv="Content-Security-Policy">` и `<meta name="referrer" content="no-referrer">` сохраняются в HTML.

`connect-src 'self'` (а не `'none'`): сайт сам не делает сетевых запросов, но Lighthouse загружает `robots.txt` из контекста страницы, и `'none'` снижает его оценку SEO до 92. Запросы только к своему домену на статическом хостинге ничего не позволяют вынести, поэтому практический риск нулевой; любое ослабление (`https:`, внешние домены) `check.mjs` отклоняет. Политика ботов повторяет WiW без его `/private/`, `/admin/`, `/api/`: по handoff эти отсутствующие здесь пути не добавляются.

## Аналитика (только заготовки)

На сайте не подключены трекеры, счётчики и cookies. На целевых ссылках выставлены атрибуты `data-event="install_click|store_click|pro_interest|lang_switch"`, а в `src/main.js` есть инертная функция `track()`, которая ничего не отправляет до утверждения провайдера владельцем.
