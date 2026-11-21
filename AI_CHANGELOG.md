# AI changelog — AntiRacketMantis site

## 2026-11-21 - Cartoon redesign: design tokens, dark theme, living meadow, new home, humanized copy

- Scope: owner asked for a full redesign that keeps the cartoon style and mascot, a studio link to WillowinWorlds, a
  "living" cartoon background like willowinworlds.com, and more human copy with a plain hyphen instead of long dashes.
  Work is in the `main` working tree, not committed, not pushed (push to `main` deploys the live site).
- Changed:
  - Design system (`src/styles.css`, `src/inner.css`, `src/nojs.css`): semantic colour/type/spacing/motion tokens,
    light + dark theme (`[data-theme]` and `prefers-color-scheme`), one outline colour and width, flat "sticker"
    shadows instead of glows, pill buttons, pill eyebrows, WiW motion tokens; decorative unicode sparkles removed.
  - Living background: new `scripts/scene.mjs` (`sceneMarkup('hero'|'page')`, inline SVG meadow: hills, swaying grass,
    drifting clouds and leaves, sun; moon and fireflies in dark) + `src/scene.css` (bundled into `styles.css`);
    transform/opacity only, off under reduced motion, the pause button, and when off screen.
  - Home (`scripts/build.mjs` `homePage()`, `src/home.css`): hero with the real popup screenshot in a browser frame,
    Minty on the meadow, two callouts, "Works in Chrome 110+ / Firefox 128+" + honest store status, studio sign;
    before/after slider with level-qualified points; features in two tiers; CSS-only level picker (works without JS);
    scroll-snap screenshot gallery; one dark privacy + permissions band; compact PRO strip; final card with steps and
    a "Who makes it" studio box. Store buttons are replaced by "Installation guide" until `STORES` URLs exist.
  - Shared markup: theme toggle in the header (`src/theme-init.js` sets the saved theme before paint, key
    `arm-theme`), "Made by WillowinWorlds" sign with `src/wiw-logo.webp` in the footer, meadow strip on inner-page heroes.
  - Copy (`src/content/{ru,en,tr}.mjs`): new/removed home keys, humanized headings/leads/cards in all three languages,
    no long dashes anywhere in `dist/`; feature facts, prices, limits and "in development" wording unchanged.
    `scripts/test-check.mjs` fixture updated to the new PRO-page heading. Manifest `theme_color` = `#fffaf1`.
- Compatibility/config: no new dependencies; CSP unchanged (`theme-init.js` is a same-origin blocking script);
  minified CSS +24.9% (scene included).
- Validation: `node scripts/build.mjs` - PASS (52 HTML, 0 errors, 0 warnings); `node scripts/test-check.mjs` - PASS (146);
  Brave screenshots at 360/390/768/1024/1440, light and dark - no horizontal overflow; all home images load; text
  contrast scan (solid backgrounds) on 4 pages × 2 themes - 0 failures; Lighthouse 13.6.0 single runs, local server,
  before -> after: mobile Performance RU home 94 -> 100, EN home 99 -> 100, EN features 100 -> 100, LCP 2.2 s -> 1.5 s
  (RU home), CLS <= 0.001, A11y/BP/SEO 100; home weight 203 -> 291 KiB. Real devices, screen readers, Firefox runtime,
  independent review - NOT RUN.
- Risks/follow-up: the current extension build already contains CAPTCHA tools with a cloud OCR fallback (NopeCHA)
  on by default; the privacy page discloses default-on network modules only in general terms, and the site presents
  CAPTCHA help as PRO-planned - owner decision needed before store release. TR/RU copy not native-speaker reviewed.
- Rollback: `git checkout -- .` and delete `scripts/scene.mjs`, `src/scene.css`, `src/theme-init.js`, `src/wiw-logo.webp`
  (nothing committed yet).

## 2026-11-20 — One repo for the site; RU/EN/TR, PRO «в разработке», SEO/discovery files (TASK-003)

- Scope: owner asked to move the former AntiRacketMantis-Website repo into this repo and delete it, then improve
  the site (SEO, UX/UI, performance, security, conversion, robots.txt at the willowinworlds.com level). Work is on
  branch `dev`; `main` (= live site) was not changed, nothing was pushed, Pages settings and domain untouched.
- Changed:
  - Repo: Website history merged into `dev` (all commits preserved); built files removed from the tree; the site is
    built by `node scripts/build.mjs` → `dist/` (not tracked). `.github/workflows/pages.yml`: quality gate on every
    push/PR, deploy to GitHub Pages only on push to `main`, smoke test of `/`, robots, sitemap, security.txt.
  - Content: all strings in `src/content/{ru,en,tr}.mjs` (+ `config.mjs` with `STORES`); 17 routes × 3 languages
    (RU at `/`, EN `/en/`, TR `/tr/`) + trilingual `404.html`. New: `/features/{ad-blocker,tracker-blocker,
    cookie-banners,popup-blocker}/`, `/pro/` (planned $39/month, in development, no purchase flow),
    `/changelog/#roadmap`. Link-based language switcher, hreflang + x-default → EN, sitemap alternates.
  - Discovery: robots.txt (WiW bot policy + llms/languages pointers), `llms.txt`, `languages.json`,
    `manifest.webmanifest` + icons, `.well-known/security.txt` (studio contact URL).
  - Quality/security: `scripts/check.mjs` + `scripts/html-check.mjs` (language mixing, hreflang, PRO honesty, CSP,
    discovery files, JSON-LD vs visible content), 146 regression cases in `scripts/test-check.mjs`; strict CSP
    (`connect-src 'self'` so Lighthouse can read robots.txt); Nunito latin-ext for Turkish; 44 px controls; focus
    contrast fix; EN extension screenshots; two new mascot poses.
- Compatibility/config: publishing now requires Settings → Pages → Source = "GitHub Actions" **before** `dev` is merged
  into `main`; otherwise the repo root (sources) would be served. Optional build env: `SITE_URL`, `LANGS`,
  `GSC_VERIFICATION`, `BING_VERIFICATION`. Store links go into `STORES` in `src/content/config.mjs`.
- Validation: `node scripts/build.mjs` — PASS (52 HTML, 51 sitemap URLs, 0 errors); `node scripts/test-check.mjs` —
  PASS (146); Brave+Playwright 936 page-width checks (Codex) — PASS; Lighthouse 13.6.0 mobile (RU home, EN /pro/,
  TR ad-blocker) — Perf 97–100, A11y/BP/SEO 100; real screen reader, devices, Firefox runtime, hosted headers,
  GitHub Actions run, Search Console — NOT RUN. Details: `.ai/tasks/TASK-003/` (local, not in Git).
- Risks/follow-up: privacy and terms are drafts (legal review, extension network-module audit — some optional
  modules are on by default in the current extension build); store URLs, support e-mail, PRO launch date, analytics
  provider are open owner decisions; TR/EN texts are not native-speaker certified.
- Rollback: `main` is unchanged; to undo the restructure reset `dev` to `7738aa8` (old built site) — the former
  Website history stays reachable through commit `9d56f4e`.
