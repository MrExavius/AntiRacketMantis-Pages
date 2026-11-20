# AntiRacketMantis — сайт (русская версия)

Сборка: `node scripts/build.mjs` → готовый сайт в `dist/` (статические файлы, без зависимостей; автоматически запускает проверку `node scripts/check.mjs` и формирует `dist/_headers`).

- Адрес сайта: `SITE_URL=https://antiracketmantis.willowinworlds.com` по умолчанию; при переезде на свой домен —
  `SITE_URL=https://antiracketmantis.com node scripts/build.mjs` (canonical, sitemap, robots, Open Graph пересоберутся).
- Языки: по умолчанию только русский. Английский и турецкий тексты сохранены в `scripts/build.mjs`; включить:
  `LANGS=ru,en,tr node scripts/build.mjs` (появятся переключатель языка и hreflang).
- Шрифт заголовков Nunito лежит локально (`src/fonts`, лицензия SIL OFL 1.1 — `src/fonts/OFL.txt`).
- Снимки интерфейса расширения лежат в `src/screenshots/` (WebP и запасной PNG для модулей защиты версии `0.11.0`, без сторонних/закрытых разделов и реальной истории просмотров) и копируются в `dist/assets/screenshots/`.

## Заголовки безопасности и кеширования (`dist/_headers`)

При сборке создаётся файл `dist/_headers` в формате Netlify / Cloudflare Pages:

- Для всех страниц (`/*`): `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, `Cross-Origin-Opener-Policy: same-origin` и короткий кэш HTML (`Cache-Control: public, max-age=300, must-revalidate`).
- Для статики (`/assets/*` и `/assets/fonts/*`): длинный кэш (`max-age=604800, stale-while-revalidate=86400` для изображений/скриптов/стилей и `max-age=31536000, immutable` для шрифтов).
- **Где работает:** **Cloudflare Pages** и **Netlify** (и другие статические хостинги, поддерживающие `_headers`).
- **Где игнорируется:** **GitHub Pages** полностью игнорирует файл `_headers`, поэтому в каждом HTML-документе сохраняются теги `<meta http-equiv="Content-Security-Policy">` и `<meta name="referrer" content="no-referrer">` как базовый уровень защиты.

Что ещё нужно перед публикацией: ссылки на страницы в Chrome Web Store и Firefox Add-ons, контакты поддержки, окончательная политика конфиденциальности (после проверки реальных потоков данных).
