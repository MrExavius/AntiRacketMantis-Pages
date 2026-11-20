# AI changelog — AntiRacketMantis site

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
