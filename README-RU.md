# AntiRacketMantis — сайт (русская версия)

Сборка: `node scripts/build.mjs` → готовый сайт в `dist/` (статические файлы, без зависимостей; автоматически запускает проверку `node scripts/check.mjs` и формирует `dist/_headers`).

- Адрес сайта: `SITE_URL=https://antiracketmantis.willowinworlds.com` по умолчанию; при переезде на свой домен —
  `SITE_URL=https://antiracketmantis.com node scripts/build.mjs` (canonical, sitemap, robots, Open Graph пересоберутся).
- Языки: по умолчанию только русский. Английский и турецкий тексты сохранены в `scripts/build.mjs`; включить:
  `LANGS=ru,en,tr node scripts/build.mjs` (появятся переключатель языка и hreflang).
- Шрифт заголовков Nunito лежит локально (`src/fonts`, лицензия SIL OFL 1.1 — `src/fonts/OFL.txt`).

Что ещё нужно перед публикацией: ссылки на страницы в Chrome Web Store и Firefox Add-ons, настоящие скриншоты
окна расширения, контакты поддержки, окончательная политика конфиденциальности (после проверки реальных потоков данных).
