import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {
  ALL_LANGS,
  FEATURE_ROUTES,
  HERO_MASCOT_BY_ROUTE,
  LANG_META,
  ROUTES,
  SCREENSHOT_ASSETS,
  SECURITY_CONTACT,
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
import { checkDist } from './check.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DEST = path.join(ROOT, 'dist');
const LANGS = (process.env.LANGS || ALL_LANGS.join(','))
  .split(',')
  .map(x => x.trim())
  .filter(x => ALL_LANGS.includes(x));
const GSC_VERIFICATION = (process.env.GSC_VERIFICATION || '').trim();
const BING_VERIFICATION = (process.env.BING_VERIFICATION || '').trim();

const CONTENT = { ru: ruContent, en: enContent, tr: trContent };

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(text) {
  return escapeHtml(text).replace(/"/g, '&quot;');
}

function icon(name) {
  const attrs = 'fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"';
  const paths = {
    ad: '<rect x="5" y="6" width="22" height="21" rx="4"/><path d="M5 12h22M11 9h1M16 9h1M11 20l4 3 6-7"/>',
    eye: '<path d="M3 17s5-8 13-8 13 8 13 8-5 8-13 8S3 17 3 17Z"/><circle cx="16" cy="17" r="4"/><path d="M6 5 26 29"/>',
    cookie: '<path d="M25 15a7 7 0 0 1-8-8 11 11 0 1 0 8 8Z"/><circle cx="12" cy="15" r="1.5" fill="currentColor" stroke="none"/><circle cx="20" cy="22" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="24" r="1.2" fill="currentColor" stroke="none"/>',
    popup: '<rect x="6" y="6" width="21" height="21" rx="3"/><path d="M6 12h21M12 18l9 0M16.5 13.5v9"/><path d="m10 17 5 5m0-5-5 5"/>',
    lock: '<rect x="8" y="14" width="17" height="14" rx="4"/><path d="M12 14v-4a5 5 0 0 1 10 0v4M16.5 20v3"/>',
    sliders: '<path d="M5 9h22M5 17h22M5 25h22"/><circle cx="12" cy="9" r="3" fill="white"/><circle cx="21" cy="17" r="3" fill="white"/><circle cx="10" cy="25" r="3" fill="white"/>',
    check: '<path d="m6 16 7 7 13-14"/>',
    sparkle: '<path d="M16 3 19 13 29 16 19 19 16 29 13 19 3 16 13 13Z"/>',
    shield: '<path d="M16 3 28 8v9c0 7-5 11-12 14C9 28 4 24 4 17V8Z"/><path d="m10 17 4 4 8-9"/>'
  };
  return `<svg viewBox="0 0 32 32" aria-hidden="true" ${attrs}>${paths[name] || paths.shield}</svg>`;
}

function linkHref(lang, target) {
  if (target.includes('#')) {
    const [route, hash] = target.split('#');
    return `${routeUrl(lang, route)}#${hash}`;
  }
  return routeUrl(lang, target);
}

const isProText = value => /(\bPRO\b|\$39|CAPTCHA|капч|автоматиз|automation|otomasyon)/i.test(JSON.stringify(value));
const devBadge = lang => `<span class="status-pill dev-pill">${escapeHtml(CONTENT[lang].ui.devBadge)}</span>`;

function langSwitcher(currentLang, route, extraClass = '') {
  if (LANGS.length <= 1) return '';
  const c = CONTENT[currentLang];
  const targetRoute = route === '404' ? 'home' : route;
  return `<nav class="lang-switch${extraClass ? ` ${extraClass}` : ''}" aria-label="${escapeAttr(c.ui.langSwitcherAria)}">
  ${LANGS.map(l => {
    const m = LANG_META[l];
    const href = routeUrl(l, targetRoute);
    const isCurrent = l === currentLang && route !== '404';
    return `<a href="${href}" lang="${m.code}" hreflang="${m.hreflang}" data-event="lang_switch" data-target-lang="${m.code}"${isCurrent ? ' aria-current="page"' : ''} title="${escapeAttr(m.name)}">${m.short}</a>`;
  }).join('')}
</nav>`;
}

function header(lang, route) {
  const c = CONTENT[lang];
  return `<a class="skip-link" href="#main">${escapeHtml(c.ui.skipToContent)}</a>
<header class="site-header" id="site-header">
  <div class="nav-shell">
    <a class="brand" href="${routeUrl(lang, 'home')}" aria-label="${escapeAttr(c.ui.brandHomeAria)}">
      <img src="/assets/mark.svg" alt="" aria-hidden="true" width="42" height="42">
      <span>AntiRacket<span class="brand-mantis">Mantis</span></span>
    </a>
    <nav class="main-nav" id="main-nav" aria-label="${escapeAttr(c.ui.mainNavAria)}">
      ${c.nav.map(item => {
        const active = route === item.route || (item.route === 'features' && route.startsWith('features/'));
        return `<a href="${routeUrl(lang, item.route)}"${active ? ' aria-current="page"' : ''}${item.route === 'pro' ? ' data-event="pro_interest" data-status="in-development"' : ''}>${escapeHtml(item.label)}${item.route === 'pro' ? devBadge(lang) : ''}</a>`;
      }).join('')}
      <div class="mobile-nav-tools">
        ${langSwitcher(lang, route, 'lang-switch-mobile')}
        <a class="nav-cta nav-cta-mobile" href="${routeUrl(lang, 'install')}" data-event="install_click"${route === 'install' ? ' aria-current="page"' : ''}>${escapeHtml(c.ui.installCta)}</a>
      </div>
    </nav>
    <div class="nav-actions">
      ${langSwitcher(lang, route, 'lang-switch-desktop')}
      <button class="motion-toggle" type="button" data-motion-toggle data-label-off="${escapeAttr(c.ui.motionOff)}" data-label-on="${escapeAttr(c.ui.motionOn)}" aria-label="${escapeAttr(c.ui.motionOff)}" aria-pressed="false" title="${escapeAttr(c.ui.motionOff)}">
        <svg class="motion-icon" viewBox="0 0 24 24" aria-hidden="true">
          <g class="mi-pause"><rect x="6.5" y="5" width="3.6" height="14" rx="1.6"/><rect x="13.9" y="5" width="3.6" height="14" rx="1.6"/></g>
          <path class="mi-play" d="M8 5.6v12.8a1 1 0 0 0 1.5.86l10.2-6.4a1 1 0 0 0 0-1.72L9.5 4.74A1 1 0 0 0 8 5.6z"/>
        </svg>
      </button>
      <a class="nav-cta" href="${routeUrl(lang, 'install')}" data-event="install_click"${route === 'install' ? ' aria-current="page"' : ''}>${escapeHtml(c.ui.installCta)}</a>
      <button class="menu-toggle" type="button" data-label-open="${escapeAttr(c.ui.openMenu)}" data-label-close="${escapeAttr(c.ui.closeMenu)}" aria-label="${escapeAttr(c.ui.openMenu)}" aria-expanded="false" aria-controls="main-nav"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>`;
}

function footer(lang, route) {
  const c = CONTENT[lang];
  const targetRoute = route === '404' ? 'home' : route;
  return `<footer class="footer">
  <div class="container footer-top">
    <div class="footer-brand-col">
      <a class="brand" href="${routeUrl(lang, 'home')}" aria-label="${escapeAttr(c.ui.brandHomeAria)}">
        <img src="/assets/mark.svg" alt="" aria-hidden="true" width="43" height="43">
        <span>AntiRacket<span class="brand-mantis">Mantis</span></span>
      </a>
      <p>${escapeHtml(c.home.heroText)}</p>
      <p class="footer-studio">${escapeHtml(c.ui.company)} <a href="${STUDIO}" rel="noopener">WillowinWorlds</a> · ${escapeHtml(c.ui.versionLine)} ${VERSION}, ${escapeHtml(c.ui.statusLine)}</p>
      <nav class="footer-langs" aria-label="${escapeAttr(c.ui.footerLangAria)}">
        <span class="footer-langs-label">${escapeHtml(c.ui.footerLangHeading)}:</span>
        ${LANGS.map(l => {
          const m = LANG_META[l];
          const isCurrent = l === lang && route !== '404';
          return `<a href="${routeUrl(l, targetRoute)}" lang="${m.code}" hreflang="${m.hreflang}" data-event="lang_switch" data-target-lang="${m.code}"${isCurrent ? ' aria-current="page"' : ''}>${m.short} · ${escapeHtml(m.name)}</a>`;
        }).join('')}
      </nav>
    </div>
    <nav aria-label="${escapeAttr(c.ui.footerAboutAria)}">
      <span class="footer-nav-heading">${escapeHtml(c.ui.footerAboutHeading)}</span>
      <div class="footer-nav-list">
        ${c.footerProductLinks.map(([r, label]) => `<a href="${routeUrl(lang, r)}"${r === 'pro' ? ' data-event="pro_interest" data-status="in-development"' : ''}>${escapeHtml(label)}${r === 'pro' ? devBadge(lang) : ''}</a>`).join('')}
      </div>
    </nav>
    <nav aria-label="${escapeAttr(c.ui.footerTrustAria)}">
      <span class="footer-nav-heading">${escapeHtml(c.ui.footerTrustHeading)}</span>
      <div class="footer-nav-list">
        ${c.footerTrustLinks.map(([r, label]) => `<a href="${routeUrl(lang, r)}">${escapeHtml(label)}</a>`).join('')}
      </div>
    </nav>
  </div>
  <div class="container footer-bottom">
    <span>© ${new Date().getUTCFullYear()} AntiRacketMantis · WillowinWorlds</span>
    <span>${escapeHtml(c.ui.madeFor)} ✦</span>
  </div>
</footer>`;
}

function breadcrumbs(lang, trail) {
  const c = CONTENT[lang];
  return `<nav class="breadcrumbs container" aria-label="${escapeAttr(c.ui.breadcrumbsAria)}"${isProText(trail) ? ' data-status="in-development"' : ''}>
  <ol>
    ${trail.map((item, idx) => {
      if (idx === trail.length - 1) return `<li aria-current="page">${escapeHtml(item.label)}${isProText(trail) ? devBadge(lang) : ''}</li>`;
      return `<li><a href="${item.href}">${escapeHtml(item.label)}</a></li>`;
    }).join('')}
  </ol>
</nav>`;
}

function storeButtons(lang) {
  const c = CONTENT[lang];
  const makeBtn = (storeKey, variant, iconHtml, label, soonText) => {
    const externalUrl = STORES[storeKey];
    if (externalUrl) {
      return `<a class="btn ${variant} store-btn" href="${escapeAttr(externalUrl)}" rel="noopener" data-event="store_click" data-store="${storeKey}">${iconHtml}<span>${escapeHtml(label)}</span></a>`;
    }
    return `<a class="btn ${variant} store-btn" href="${routeUrl(lang, 'install')}#${storeKey}" data-event="store_click" data-store="${storeKey}">${iconHtml}<span>${escapeHtml(label)}</span><span class="soon-badge">${escapeHtml(soonText)}</span></a>`;
  };
  return `<div class="store-actions">
    ${makeBtn('chrome', 'btn-primary', '<span class="chrome-icon" aria-hidden="true"></span>', c.ui.chromeBtnLabel, c.ui.chromeSoonText)}
    ${makeBtn('firefox', 'btn-secondary', '<span class="firefox-icon" aria-hidden="true">◉</span>', c.ui.firefoxBtnLabel, c.ui.firefoxSoonText)}
  </div>`;
}

function screenshotSet(lang) {
  return lang === 'ru' ? SCREENSHOT_ASSETS.ru : SCREENSHOT_ASSETS.en;
}

function shotCard(lang, key, extraClass = '', withReveal = true) {
  const asset = screenshotSet(lang)[key];
  const text = CONTENT[lang].screenshots[key];
  return `<figure class="shot-card${extraClass ? ` ${extraClass}` : ''}${withReveal ? ' reveal' : ''}">
    <div class="shot-frame">
      <picture>
        <source srcset="/assets/screenshots/${asset.base}.webp" type="image/webp">
        <img src="/assets/screenshots/${asset.base}.png" alt="${escapeAttr(text.alt)}" width="${asset.width}" height="${asset.height}" loading="lazy" decoding="async">
      </picture>
    </div>
    <div class="shot-body">
      <h3>${escapeHtml(text.title)}</h3>
      <p>${escapeHtml(text.desc)}</p>
    </div>
    <figcaption class="shot-caption">${escapeHtml(text.caption)}</figcaption>
  </figure>`;
}

function levelsStrip(lang, withReveal = true) {
  const c = CONTENT[lang];
  return `<div class="levels-grid">
  ${c.levels.map(lv => `<article class="level-card${lv.isDefault ? ' level-default' : ''}${withReveal ? ' reveal' : ''}">
    <span class="level-badge"><span>${escapeHtml(c.ui.levelPrefix)} ${lv.n}</span><span>${escapeHtml(lv.badge)}</span></span>
    <h3>${escapeHtml(lv.name)}</h3>
    <p>${escapeHtml(lv.summary)}</p>
  </article>`).join('')}
</div>`;
}

function faqAccordion(lang, items, openFirst = true) {
  return `<div class="faq-list">
  ${items.map(({ q, a }, i) => `<details class="faq-item"${isProText({q, a}) ? ' data-status="in-development"' : ''}${openFirst && i === 0 ? ' open' : ''}>
    <summary><span class="faq-question">${escapeHtml(q)}</span>${isProText({q, a}) ? devBadge(lang) : ''}<span class="faq-plus" aria-hidden="true"></span></summary>
    <p>${escapeHtml(a)}</p>
  </details>`).join('')}
</div>`;
}

function pageHero(eyebrow, title, lead, mascotSrc, mascotAlt, isLazy = false, statusBadge = '') {
  return `<section class="page-hero container page-hero-split"${statusBadge ? ' data-status="in-development"' : ''}>
  <div>
    <span class="eyebrow">${escapeHtml(eyebrow)}</span>
    ${statusBadge ? `<div class="hero-status-row"><span class="status-pill dev-pill">${escapeHtml(statusBadge)}</span></div>` : ''}
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(lead)}</p>
  </div>
  <img class="page-hero-mascot mascot-reactive" src="${mascotSrc}" alt="${escapeAttr(mascotAlt)}" width="220" height="265"${isLazy ? ' loading="lazy"' : ' fetchpriority="high"'}>
</section>`;
}

function pageNudge(lang, nudge) {
  const mentionsPro = nudge.actions.some(([target]) => target === 'pro' || target.includes('roadmap'));
  return `<section class="container">
  <div class="info-nudge"${mentionsPro ? ' data-status="in-development"' : ''}>
    <div class="info-nudge-copy">
      ${mentionsPro ? devBadge(lang) : ''}
      <h2>${escapeHtml(nudge.title)}</h2>
      <p>${escapeHtml(nudge.text)}</p>
    </div>
    <div class="info-nudge-actions">
      ${nudge.actions.map(([target, label, variant]) => {
        const eventAttr = target === 'install'
          ? ' data-event="install_click"'
          : target === 'pro' || target.includes('roadmap')
            ? ' data-event="pro_interest"'
            : '';
        return `<a class="btn ${variant || 'btn-primary'}" href="${linkHref(lang, target)}"${eventAttr}>${escapeHtml(label)}</a>`;
      }).join('')}
    </div>
  </div>
</section>`;
}

function homePage(lang) {
  const c = CONTENT[lang];
  const h = c.home;
  const popupAsset = screenshotSet(lang).popupShield;
  return `<main id="main">
  <section class="hero">
    <div class="hero-wash" aria-hidden="true"></div>
    <div class="container hero-grid">
      <div class="hero-copy reveal">
        <span class="pill badge"><span class="badge-spark" aria-hidden="true">✦</span>${escapeHtml(h.badge)}</span>
        <h1>${escapeHtml(h.heroA)} <br><span class="hero-highlight">${escapeHtml(h.heroB)}</span></h1>
        <p>${escapeHtml(h.heroText)}</p>
        ${storeButtons(lang)}
        <div class="hero-links" data-status="in-development">
          <a class="text-link" href="#features">${escapeHtml(c.ui.exploreFeatures)}<span class="text-link-dot" aria-hidden="true">✳</span></a>
          <a class="text-link" href="${routeUrl(lang, 'install')}" data-event="install_click">${escapeHtml(c.ui.installGuideLink)} →</a>
          <a class="text-link" href="${routeUrl(lang, 'pro')}" data-event="pro_interest">${escapeHtml(c.ui.proNavLabel)} ${devBadge(lang)} →</a>
        </div>
      </div>
      <div class="hero-art">
        <div class="orbit orbit-one" aria-hidden="true"></div>
        <div class="orbit orbit-two" aria-hidden="true"></div>
        <div class="hero-hill" aria-hidden="true"></div>
        <div class="floating-chip chip-top"><span class="chip-icon green">${icon('shield')}</span>${escapeHtml(h.adBlockChip)}</div>
        <div class="floating-chip chip-bottom"><span class="chip-icon purple">${icon('check')}</span>${escapeHtml(h.trackersChip)}</div>
        <figure class="hero-browser hero-popup">
          <div class="browser-dots" aria-hidden="true"><i></i><i></i><i></i><span>${escapeHtml(c.ui.browserWindowTitle)}</span></div>
          <picture>
            <source srcset="/assets/screenshots/${popupAsset.base}.webp" type="image/webp">
            <img src="/assets/screenshots/${popupAsset.base}.png" alt="${escapeAttr(h.heroPopupAlt)}" width="${popupAsset.width}" height="${popupAsset.height}" decoding="async">
          </picture>
        </figure>
        <img class="hero-mantis mascot-reactive" src="/assets/mascot.svg" alt="${escapeAttr(h.heroMascotAlt)}" width="440" height="530" fetchpriority="high">
        <span class="hero-star star-one" aria-hidden="true">✦</span>
        <span class="hero-star star-two" aria-hidden="true">✧</span>
        <span class="hero-star star-three" aria-hidden="true">✳</span>
      </div>
    </div>
    <div class="hero-bottom container">
      <span>${escapeHtml(h.online)}</span>
      <span class="demo-note">${escapeHtml(h.demoNote)}</span>
    </div>
  </section>

  <section class="section intro-section" id="demo">
    <div class="container split-section">
      <div class="section-title reveal">
        <span class="eyebrow">${escapeHtml(h.compare.tag)}</span>
        <h2>${escapeHtml(h.compare.title)}</h2>
        <p>${escapeHtml(h.compare.text)}</p>
        <div class="page-links-row">
          <a class="text-link" href="${routeUrl(lang, 'limits')}">${escapeHtml(h.compare.limitsLink)} →</a>
        </div>
      </div>
      <div class="comparison reveal" data-comparison>
        <div class="comparison-header"><span>${escapeHtml(h.compare.without)}</span><span>${escapeHtml(h.compare.with)}</span></div>
        <div class="comparison-frame">
          <div class="mock-web mock-messy">
            <div class="mock-top"><i></i><i></i><i></i><span>magazine.example</span></div>
            <div class="mock-content">
              <span class="mock-banner">${escapeHtml(h.compare.ad)}</span>
              <p class="mock-title">${escapeHtml(h.compare.sampleTitle)}</p>
              <p>${escapeHtml(h.compare.sampleCopy)}</p>
              <div class="mock-img"></div>
              <span class="mock-ad">${escapeHtml(h.compare.ad)}</span>
              <div class="mock-cookie">${escapeHtml(h.compare.cookie)}</div>
              <div class="mock-popup">${escapeHtml(h.compare.popup)}</div>
            </div>
          </div>
          <div class="mock-web mock-clean">
            <div class="mock-top"><i></i><i></i><i></i><span>magazine.example</span></div>
            <div class="mock-content">
              <span class="mock-banner clean-banner">✦ ${escapeHtml(h.compare.with)}</span>
              <p class="mock-title">${escapeHtml(h.compare.sampleTitle)}</p>
              <p>${escapeHtml(h.compare.sampleCopy)}</p>
              <div class="mock-img"></div>
              <div class="mock-article-lines"></div>
            </div>
          </div>
          <div class="comparison-line" aria-hidden="true"><span>◀ ▶</span></div>
        </div>
        <input class="comparison-range" type="range" min="0" max="100" value="50" aria-label="${escapeAttr(h.compare.title)}">
        <p class="compare-caption">${escapeHtml(h.compare.caption)}</p>
      </div>
    </div>
  </section>

  <section class="section features-section" id="features">
    <div class="container">
      <div class="section-title centered reveal">
        <span class="eyebrow">${escapeHtml(h.features.tag)}</span>
        <h2>${escapeHtml(h.features.title)}</h2>
        <p>${escapeHtml(h.features.intro)}</p>
      </div>
      <div class="features-grid">
        ${c.featuresHub.items.map((f, i) => {
          const href = f.route ? routeUrl(lang, f.route) : `${routeUrl(lang, 'features')}#${f.id}`;
          return `<a class="feature-card tone-${f.tone} feature-${f.id} reveal" href="${href}">
            <span class="feature-icon">${icon(f.icon)}</span>
            <span class="feature-ornament" aria-hidden="true">${['✦', '✧', '✿', '✳', '✦', '✳'][i]}</span>
            <strong>${escapeHtml(f.cardTitle)}</strong>
            <p>${escapeHtml(f.cardText)}</p>
            <span class="feature-more">${escapeHtml(c.ui.more)}<span aria-hidden="true"> →</span></span>
          </a>`;
        }).join('')}
      </div>
      <div class="center-action">
        <a class="text-link" href="${routeUrl(lang, 'features')}">${escapeHtml(c.ui.allFeatures)} <span aria-hidden="true">✳</span></a>
        <a class="text-link" href="${routeUrl(lang, 'how-it-works')}">${escapeHtml(h.features.howLink)} →</a>
      </div>
    </div>
  </section>

  <section class="section levels-section" id="levels">
    <div class="container">
      <div class="section-title centered reveal">
        <span class="eyebrow">${escapeHtml(h.levels.tag)}</span>
        <h2>${escapeHtml(h.levels.title)}</h2>
        <p>${escapeHtml(h.levels.intro)}</p>
      </div>
      ${levelsStrip(lang, true)}
      <div class="center-action">
        <a class="text-link" href="${routeUrl(lang, 'how-it-works')}#levels">${escapeHtml(h.levels.detailLink)} →</a>
      </div>
    </div>
  </section>

  <section class="section interface-section" id="interface">
    <div class="container">
      <div class="section-title centered reveal">
        <span class="eyebrow">${escapeHtml(h.interface.tag)}</span>
        <h2>${escapeHtml(h.interface.title)}</h2>
        <p>${escapeHtml(h.interface.text)}</p>
      </div>
      <div class="shots-grid shots-home">
        ${shotCard(lang, 'popupShield', 'shot-popup', true)}
        <div class="shots-home-stack">
          ${shotCard(lang, 'optionsLevels', '', true)}
          ${shotCard(lang, 'optionsExceptionsCookies', '', true)}
        </div>
      </div>
      <div class="center-action">
        <a class="text-link" href="${routeUrl(lang, 'how-it-works')}#interface">${escapeHtml(h.interface.allLink)} →</a>
      </div>
    </div>
  </section>

  <section class="section pro-teaser-section" id="pro-plans" data-status="in-development">
    <div class="container">
      ${devBadge(lang)}
      <div class="section-title centered reveal">
        <span class="eyebrow">${escapeHtml(h.proTeaser.tag)}</span>
        <h2>${escapeHtml(h.proTeaser.title)}</h2>
        <p>${escapeHtml(h.proTeaser.text)}</p>
      </div>
      <div class="pro-teaser-grid">
        <article class="plan-card plan-free reveal">
          <div class="plan-head">
            <h3>${escapeHtml(h.proTeaser.freeTitle)}</h3>
            <span class="plan-price">${escapeHtml(h.proTeaser.freePrice)}</span>
          </div>
          <ul class="plan-list">
            ${h.proTeaser.freePoints.map(pt => `<li>${icon('check')}<span>${escapeHtml(pt)}</span></li>`).join('')}
          </ul>
          <a class="btn btn-primary" href="${routeUrl(lang, 'install')}" data-event="install_click">${escapeHtml(c.ui.freeVersionCta)}</a>
        </article>
        <article class="plan-card plan-pro reveal" data-status="in-development">
          <div class="plan-head">
            <div>
              <span class="status-pill dev-pill">${escapeHtml(h.proTeaser.badge)}</span>
              <h3>${escapeHtml(h.proTeaser.proTitle)}</h3>
            </div>
            <div class="plan-price-block">
              <span class="plan-price">${escapeHtml(h.proTeaser.proPrice)}<small> ${escapeHtml(c.ui.perMonth)}</small></span>
              <span class="plan-price-note">${escapeHtml(h.proTeaser.proPriceLabel)}</span>
            </div>
          </div>
          <ul class="plan-list">
            ${h.proTeaser.proPoints.map(pt => `<li>${icon('sparkle')}<span>${escapeHtml(pt)}</span></li>`).join('')}
          </ul>
          <p class="plan-disclaimer">${escapeHtml(h.proTeaser.disclaimer)}</p>
          <div class="plan-actions">
            <a class="btn btn-secondary" href="${routeUrl(lang, 'pro')}" data-event="pro_interest">${escapeHtml(h.proTeaser.primaryCta)}</a>
            <a class="text-link" href="${routeUrl(lang, 'changelog')}#roadmap" data-event="pro_interest">${escapeHtml(h.proTeaser.secondaryCta)} →</a>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section class="section how-section" id="how">
    <div class="container">
      <div class="section-title centered reveal">
        <span class="eyebrow">${escapeHtml(h.steps.tag)}</span>
        <h2>${escapeHtml(h.steps.title)}</h2>
      </div>
      <div class="steps-grid">
        ${h.steps.items.map((s, i) => `<div class="step reveal">
          <div class="step-number step-${i + 1}" aria-hidden="true">${['✦', '✓', '✿'][i]}</div>
          <span class="step-kicker">0${i + 1}</span>
          <h3>${escapeHtml(s[0])}</h3>
          <p>${escapeHtml(s[1])}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="trust-section section" id="privacy">
    <div class="container trust-grid">
      <div class="trust-art reveal">
        <div class="trust-glow" aria-hidden="true"></div>
        <div class="trust-shield">${icon('shield')}</div>
        <div class="trust-leaf leaf-a" aria-hidden="true">✳</div>
        <div class="trust-leaf leaf-b" aria-hidden="true">✦</div>
        <div class="trust-panel">
          <span>AntiRacketMantis</span>
          <strong>✦ ${escapeHtml(h.online)}</strong>
          <i></i><i></i><i></i>
        </div>
      </div>
      <div class="trust-copy reveal">
        <span class="eyebrow">${escapeHtml(h.trust.tag)}</span>
        <h2>${escapeHtml(h.trust.title)}</h2>
        <p>${escapeHtml(h.trust.text)}</p>
        <ul>${h.trust.bullets.map(x => `<li>${icon('check')}<span>${escapeHtml(x)}</span></li>`).join('')}</ul>
        <div class="trust-actions">
          <a class="btn btn-cream" href="${routeUrl(lang, 'privacy')}">${escapeHtml(h.trust.privacyBtn)}</a>
          <a class="btn btn-secondary" href="${routeUrl(lang, 'limits')}">${escapeHtml(h.trust.limitsBtn)}</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section perm-section" id="permissions">
    <div class="container perm-grid">
      <div class="section-title reveal">
        <span class="eyebrow">${escapeHtml(h.permissions.tag)}</span>
        <h2>${escapeHtml(h.permissions.title)}</h2>
        <p>${escapeHtml(h.permissions.intro)}</p>
        <div class="perm-facts">
          <div class="perm-fact">
            <h3>${escapeHtml(h.permissions.devTitle)}</h3>
            <p>${escapeHtml(h.permissions.devText)} <a class="inline-link" href="${STUDIO}" rel="noopener">${escapeHtml(h.permissions.devLink)}</a></p>
          </div>
          <div class="perm-fact">
            <h3>${escapeHtml(h.permissions.helpTitle)}</h3>
            <p>${escapeHtml(h.permissions.helpText)}</p>
          </div>
        </div>
        <div class="page-links-row">
          <a class="text-link" href="${routeUrl(lang, 'privacy')}#permissions">${escapeHtml(h.permissions.detailsLink)} →</a>
          <a class="text-link" href="${routeUrl(lang, 'uninstall')}">${escapeHtml(h.permissions.uninstallLink)} →</a>
        </div>
      </div>
      <figure class="perm-dialog reveal">
        <figcaption class="perm-head">
          <img src="/assets/mark.svg" alt="" aria-hidden="true" width="40" height="40">
          <span><strong>AntiRacketMantis</strong><small>${escapeHtml(h.permissions.dialogSub)}</small></span>
        </figcaption>
        <ol class="perm-list">
          ${h.permissions.perms.map(([a, b], i) => `<li>
            <span class="perm-icon" aria-hidden="true">${icon(['popup', 'shield', 'eye', 'sliders'][i])}</span>
            <span><strong>${escapeHtml(a)}</strong><span>${escapeHtml(b)}</span></span>
          </li>`).join('')}
        </ol>
        <p class="perm-note">${escapeHtml(h.permissions.note)}</p>
      </figure>
    </div>
  </section>

  <section class="section faq-section" id="faq">
    <div class="container split-section">
      <div class="section-title reveal">
        <span class="eyebrow">${escapeHtml(h.faq.tag)}</span>
        <h2>${escapeHtml(h.faq.title)}</h2>
        <div class="page-links-row">
          <a class="text-link" href="${routeUrl(lang, 'faq')}">${escapeHtml(h.faq.allLink)} →</a>
          <a class="text-link" href="${routeUrl(lang, 'support')}">${escapeHtml(h.faq.supportLink)} →</a>
        </div>
        <img class="faq-mini-mantis mascot-reactive" src="/assets/mascot-thinking.svg" alt="${escapeAttr(h.faq.mascotAlt)}" width="140" height="168" loading="lazy">
      </div>
      ${faqAccordion(lang, c.faqPage.items.slice(0, 5), true)}
    </div>
  </section>

  <section class="final-section" id="download">
    <div class="container final-card">
      <div class="final-copy reveal">
        <span class="eyebrow">${escapeHtml(h.final.tag)}</span>
        <h2>${escapeHtml(h.final.title)}</h2>
        <p>${escapeHtml(h.final.text)}</p>
        ${storeButtons(lang)}
        <p class="compat-note">${escapeHtml(h.final.compatNote)} <a class="inline-link" href="${routeUrl(lang, 'compatibility')}">${escapeHtml(h.final.compatLink)}</a> · <a class="inline-link" href="${routeUrl(lang, 'install')}" data-event="install_click">${escapeHtml(h.final.installLink)}</a></p>
      </div>
      <img src="/assets/mascot-celebrate.svg" alt="${escapeAttr(h.final.mascotAlt)}" class="final-mantis mascot-reactive" loading="lazy" width="320" height="390">
      <span class="final-spark fsp-one" aria-hidden="true">✦</span>
      <span class="final-spark fsp-two" aria-hidden="true">✳</span>
    </div>
  </section>
</main>`;
}

function featureSubPage(lang, route) {
  const c = CONTENT[lang];
  const fp = c.featurePages[route];
  const otherFeatures = FEATURE_ROUTES.filter(r => r !== route).map(r => ({
    route: r,
    title: c.meta[r].breadcrumb,
    desc: c.featurePages[r].lead,
    icon: c.featurePages[r].icon,
    tone: c.featurePages[r].tone
  }));

  return `<main id="main" class="inner-page">
  ${breadcrumbs(lang, [
    { label: c.ui.homeLabel, href: routeUrl(lang, 'home') },
    { label: c.meta.features.breadcrumb, href: routeUrl(lang, 'features') },
    { label: c.meta[route].breadcrumb }
  ])}
  ${pageHero(fp.eyebrow, fp.title, fp.lead, HERO_MASCOT_BY_ROUTE[route], fp.mascotAlt)}

  <section class="container feature-cta-strip">
    ${storeButtons(lang)}
  </section>

  <section class="container doc-stack">
    <article class="doc-card">
      <h2>${escapeHtml(fp.whatTitle)}</h2>
      ${fp.whatParagraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('')}
    </article>

    <article class="doc-card">
      <h2>${escapeHtml(fp.howTitle)}</h2>
      ${fp.howParagraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('')}
    </article>

    <article class="doc-card">
      <h2>${escapeHtml(fp.benefitsTitle)}</h2>
      <div class="benefits-grid">
        ${fp.benefits.map(b => `<div class="benefit-item tone-${fp.tone}">
          <h3>${escapeHtml(b.title)}</h3>
          <p>${escapeHtml(b.text)}</p>
        </div>`).join('')}
      </div>
    </article>

    <figure class="doc-card scene-box">
      <div class="scene-head">
        <span class="status-pill">${escapeHtml(fp.scene.label)}</span>
        <h2>${escapeHtml(fp.scene.title)}</h2>
      </div>
      <div class="scene-grid">
        <div class="scene-col scene-before">
          <div class="scene-col-head">
            <span class="scene-icon" aria-hidden="true">${icon(fp.icon)}</span>
            <h3>${escapeHtml(fp.scene.beforeTitle)}</h3>
          </div>
          <ul>
            ${fp.scene.beforeItems.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
          </ul>
        </div>
        <div class="scene-col scene-after">
          <div class="scene-col-head">
            <span class="scene-icon" aria-hidden="true">${icon('shield')}</span>
            <h3>${escapeHtml(fp.scene.afterTitle)}</h3>
          </div>
          <ul>
            ${fp.scene.afterItems.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
          </ul>
        </div>
      </div>
      <figcaption class="scene-caption">${escapeHtml(fp.scene.caption)}</figcaption>
    </figure>

    <article class="doc-card">
      <h2>${escapeHtml(fp.exampleTitle)}</h2>
      <p>${escapeHtml(fp.exampleText)}</p>
    </article>

    <article class="doc-card">
      <h2>${escapeHtml(fp.settingsTitle)}</h2>
      <p>${escapeHtml(fp.settingsText)}</p>
      <p><a class="inline-link" href="${routeUrl(lang, 'how-it-works')}#levels">${escapeHtml(fp.settingsLinkText)} →</a></p>
    </article>

    <article class="doc-card doc-callout-card">
      <h2>${escapeHtml(fp.limitsTitle)}</h2>
      <p>${escapeHtml(fp.limitsText)}</p>
      <p><a class="inline-link" href="${routeUrl(lang, 'limits')}">${escapeHtml(fp.limitsLinkText)} →</a></p>
    </article>

    <article class="doc-card">
      <h2>${escapeHtml(fp.faqTitle)}</h2>
      ${faqAccordion(lang, fp.faqs, true)}
    </article>
  </section>

  <section class="container related-section">
    <h2>${escapeHtml(fp.relatedTitle)}</h2>
    <div class="related-features-grid">
      ${otherFeatures.map(f => `<a class="related-card tone-${f.tone}" href="${routeUrl(lang, f.route)}">
        <span class="info-icon">${icon(f.icon)}</span>
        <h3>${escapeHtml(f.title)}</h3>
        <p>${escapeHtml(f.desc)}</p>
        <span class="feature-more">${escapeHtml(c.ui.more)} →</span>
      </a>`).join('')}
    </div>
  </section>

  ${pageNudge(lang, fp.nudge)}
</main>`;
}

function detailPage(lang, route) {
  const c = CONTENT[lang];

  if (FEATURE_ROUTES.includes(route)) {
    return featureSubPage(lang, route);
  }

  if (route === 'features') {
    const f = c.featuresHub;
    return `<main id="main" class="inner-page">
  ${breadcrumbs(lang, [{ label: c.ui.homeLabel, href: routeUrl(lang, 'home') }, { label: c.meta.features.breadcrumb }])}
  ${pageHero(f.eyebrow, f.title, f.lead, HERO_MASCOT_BY_ROUTE.features, f.mascotAlt)}
  <section class="container detail-features">
    ${f.items.map((item, i) => `<article class="detail-feature tone-${item.tone}" id="${item.id}">
      <div class="detail-symbol">${icon(item.icon)}<span aria-hidden="true">✦</span></div>
      <div>
        <span class="detail-kicker">${String(i + 1).padStart(2, '0')}</span>
        <h2>${escapeHtml(item.title)}</h2>
        <p><strong>${escapeHtml(item.summary)}</strong></p>
        <p>${escapeHtml(item.details)}</p>
        <p>${escapeHtml(item.limit)}</p>
        <div class="detail-meta">${item.tags.map(tag => `<span class="detail-tag">${escapeHtml(tag)}</span>`).join('')}</div>
        <div class="page-links-row">
          <a class="text-link" href="${item.route ? routeUrl(lang, item.route) : `${routeUrl(lang, 'how-it-works')}#levels`}">${escapeHtml(item.ctaLabel)} →</a>
        </div>
      </div>
    </article>`).join('')}
  </section>
  ${pageNudge(lang, f.nudge)}
</main>`;
  }

  if (route === 'pro') {
    const p = c.proPage;
    return `<main id="main" class="inner-page" data-status="in-development">
  ${breadcrumbs(lang, [{ label: c.ui.homeLabel, href: routeUrl(lang, 'home') }, { label: c.meta.pro.breadcrumb }])}
  ${pageHero(p.eyebrow, p.title, p.lead, HERO_MASCOT_BY_ROUTE.pro, p.mascotAlt, false, p.statusBadge)}

  <section class="container" data-status="in-development">
    <div class="notice-box notice-draft">
      <h2><span class="status-pill dev-pill">${escapeHtml(p.statusBadge)}</span> ${escapeHtml(p.statusBoxTitle)}</h2>
      <p>${escapeHtml(p.statusBoxText)}</p>
    </div>
  </section>

  <section class="container pro-price-section" data-status="in-development">
    <div class="pro-price-card">
      <div class="pro-price-copy">
        <span class="status-pill dev-pill">${escapeHtml(p.priceCard.badge)}</span>
        <h2>${escapeHtml(p.priceCard.title)}</h2>
        <p>${escapeHtml(p.priceCard.summary)}</p>
        <div class="pro-cta-row">
          <a class="btn btn-primary" href="${routeUrl(lang, 'install')}" data-event="install_click">${escapeHtml(p.priceCard.primaryCta)}</a>
          <a class="btn btn-secondary" href="${routeUrl(lang, 'changelog')}#roadmap" data-event="pro_interest">${escapeHtml(p.priceCard.secondaryCta)}</a>
        </div>
      </div>
      <div class="pro-price-figure">
        <span class="pro-price-label">${escapeHtml(p.priceCard.priceLabel)}</span>
        <strong class="pro-price-amount">${escapeHtml(p.priceCard.price)}<span> ${escapeHtml(p.priceCard.period)}</span></strong>
      </div>
    </div>
  </section>

  <section class="container pro-planned-section" data-status="in-development">
    <div class="interface-doc-head">
      <h2>${escapeHtml(p.plannedTitle)}</h2>
      <p>${escapeHtml(p.plannedIntro)}</p>
    </div>
    <div class="info-grid two-col">
      ${p.plannedItems.map(item => `<article class="info-card tone-${item.tone}" data-status="${item.included ? 'included' : 'in-development'}">
        <div class="pro-card-top">
          <span class="info-icon">${icon(item.icon)}</span>
          <span class="status-pill${item.included ? '' : ' dev-pill'}">${escapeHtml(item.badge)}</span>
        </div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.text)}</p>
      </article>`).join('')}
    </div>
  </section>

  <section class="container doc-stack" data-status="in-development">
    <article class="doc-card" data-status="in-development">
      ${devBadge(lang)}
      <h2>${escapeHtml(p.captchaHonesty.title)}</h2>
      ${p.captchaHonesty.paragraphs.map(par => `<p>${escapeHtml(par)}</p>`).join('')}
    </article>

    <article class="doc-card" id="compare" data-status="in-development">
      ${devBadge(lang)}
      <h2>${escapeHtml(p.compareTitle)}</h2>
      <div class="data-table-wrap">
        <table class="data-table compare-table">
          <caption>${escapeHtml(p.compareCaption)}</caption>
          <thead>
            <tr>
              <th scope="col">${escapeHtml(p.compareHeaders[0])}</th>
              <th scope="col">${escapeHtml(p.compareHeaders[1])}</th>
              <th scope="col">${escapeHtml(p.compareHeaders[2])}</th>
            </tr>
          </thead>
          <tbody>
            ${p.compareRows.map(row => `<tr>
              <th scope="row">${escapeHtml(row[0])}</th>
              <td data-label="${escapeAttr(p.compareHeaders[1])}">${escapeHtml(row[1])}</td>
              <td data-label="${escapeAttr(p.compareHeaders[2])}">${escapeHtml(row[2])}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </article>

    <article class="doc-card" id="pro-faq" data-status="in-development">
      ${devBadge(lang)}
      <h2>${escapeHtml(p.faqTitle)}</h2>
      ${faqAccordion(lang, p.faqs, true)}
    </article>
  </section>

  ${pageNudge(lang, p.nudge)}
</main>`;
  }

  if (route === 'how-it-works') {
    const h = c.howItWorks;
    return `<main id="main" class="inner-page">
  ${breadcrumbs(lang, [{ label: c.ui.homeLabel, href: routeUrl(lang, 'home') }, { label: c.meta['how-it-works'].breadcrumb }])}
  ${pageHero(h.eyebrow, h.title, h.lead, HERO_MASCOT_BY_ROUTE['how-it-works'], h.mascotAlt)}
  <section class="container info-grid">
    ${h.cards.map(card => `<article class="info-card">
      <span class="info-icon">${icon(card.icon)}</span>
      <h2>${escapeHtml(card.title)}</h2>
      <p>${escapeHtml(card.p1)}</p>
      <p>${escapeHtml(card.p2)}</p>
    </article>`).join('')}
  </section>
  <section class="container doc-stack" id="levels">
    <article class="doc-card">
      <h2>${escapeHtml(h.levelsTitle)}</h2>
      <p>${escapeHtml(h.levelsIntro)}</p>
      ${levelsStrip(lang, false)}
    </article>
    <article class="doc-card">
      <h2>${escapeHtml(h.builtinsTitle)}</h2>
      <ul>
        ${h.builtinsItems.map(([strong, text]) => `<li><strong>${escapeHtml(strong)}</strong> ${escapeHtml(text)}</li>`).join('')}
      </ul>
    </article>
  </section>
  <section class="container interface-doc-section" id="interface">
    <div class="interface-doc-head">
      <h2>${escapeHtml(h.interfaceTitle)}</h2>
      <p>${escapeHtml(h.interfaceText)}</p>
    </div>
    <div class="shots-grid shots-all">
      ${shotCard(lang, 'popupShield', 'shot-popup', false)}
      ${shotCard(lang, 'optionsLists', '', false)}
      ${shotCard(lang, 'optionsLevels', '', false)}
      ${shotCard(lang, 'optionsExceptionsCookies', '', false)}
      ${shotCard(lang, 'welcomeProtections', 'shot-wide', false)}
      ${shotCard(lang, 'optionsTheme', 'shot-wide', false)}
    </div>
  </section>
  ${pageNudge(lang, h.nudge)}
</main>`;
  }

  if (route === 'install') {
    const ins = c.install;
    return `<main id="main" class="inner-page">
  ${breadcrumbs(lang, [{ label: c.ui.homeLabel, href: routeUrl(lang, 'home') }, { label: c.meta.install.breadcrumb }])}
  ${pageHero(ins.eyebrow, ins.title, ins.lead, HERO_MASCOT_BY_ROUTE.install, ins.mascotAlt)}
  <section class="container">
    <div class="notice-box notice-info">
      <h2><span class="status-pill">${escapeHtml(c.ui.soonBadge)}</span> ${escapeHtml(ins.statusTitle)}</h2>
      <p>${escapeHtml(ins.statusP1)}</p>
      <p>${escapeHtml(ins.statusP2)}</p>
    </div>
  </section>
  <section class="container info-grid two-col">
    <article class="info-card" id="chrome">
      <span class="info-icon">${icon('shield')}</span>
      <h2>${escapeHtml(ins.chromeTitle)}</h2>
      <p><span class="status-pill">${escapeHtml(ins.chromePill)}</span></p>
      <ol>
        ${ins.chromeSteps.map(step => `<li>${escapeHtml(step)}</li>`).join('')}
      </ol>
    </article>
    <article class="info-card" id="firefox">
      <span class="info-icon">${icon('lock')}</span>
      <h2>${escapeHtml(ins.firefoxTitle)}</h2>
      <p><span class="status-pill">${escapeHtml(ins.firefoxPill)}</span></p>
      <ol>
        ${ins.firefoxSteps.map(step => `<li>${escapeHtml(step)}</li>`).join('')}
      </ol>
    </article>
  </section>
  <section class="container doc-stack">
    <article class="doc-card">
      <h2>${escapeHtml(ins.checklistTitle)}</h2>
      <ul>
        ${ins.checklistItems.map(([strong, text]) => `<li><strong>${escapeHtml(strong)}</strong> ${escapeHtml(text)}</li>`).join('')}
        <li>${escapeHtml(ins.checklistFourthPrefix)}<a class="inline-link" href="${routeUrl(lang, 'privacy')}#permissions">${escapeHtml(ins.privacyLinkText)}</a>${escapeHtml(ins.checklistFourthMid)}<a class="inline-link" href="${routeUrl(lang, 'compatibility')}">${escapeHtml(ins.compatLinkText)}</a>.</li>
      </ul>
    </article>
  </section>
  ${pageNudge(lang, ins.nudge)}
</main>`;
  }

  if (route === 'uninstall') {
    const u = c.uninstall;
    return `<main id="main" class="inner-page">
  ${breadcrumbs(lang, [{ label: c.ui.homeLabel, href: routeUrl(lang, 'home') }, { label: c.meta.uninstall.breadcrumb }])}
  ${pageHero(u.eyebrow, u.title, u.lead, HERO_MASCOT_BY_ROUTE.uninstall, u.mascotAlt)}
  <section class="container info-grid two-col">
    <article class="info-card">
      <span class="info-icon">${icon('sliders')}</span>
      <h2>${escapeHtml(u.chromeTitle)}</h2>
      <ol>${u.chromeSteps.map(s => `<li>${escapeHtml(s)}</li>`).join('')}</ol>
    </article>
    <article class="info-card">
      <span class="info-icon">${icon('sliders')}</span>
      <h2>${escapeHtml(u.firefoxTitle)}</h2>
      <ol>${u.firefoxSteps.map(s => `<li>${escapeHtml(s)}</li>`).join('')}</ol>
    </article>
  </section>
  <section class="container doc-stack">
    <article class="doc-card">
      <h2>${escapeHtml(u.dataTitle)}</h2>
      <ul>
        ${u.dataItems.map(([strong, text]) => `<li><strong>${escapeHtml(strong)}</strong> ${escapeHtml(text)}</li>`).join('')}
      </ul>
    </article>
  </section>
  ${pageNudge(lang, u.nudge)}
</main>`;
  }

  if (route === 'limits') {
    const lim = c.limits;
    return `<main id="main" class="inner-page">
  ${breadcrumbs(lang, [{ label: c.ui.homeLabel, href: routeUrl(lang, 'home') }, { label: c.meta.limits.breadcrumb }])}
  ${pageHero(lim.eyebrow, lim.title, lim.lead, HERO_MASCOT_BY_ROUTE.limits, lim.mascotAlt)}
  <section class="container info-grid two-col">
    ${lim.cards.map(card => `<article class="info-card">
      <span class="info-icon">${icon(card.icon)}</span>
      <h2>${escapeHtml(card.title)}</h2>
      <p>${escapeHtml(card.p1)}</p>
      ${card.p2 ? `<p>${escapeHtml(card.p2)}</p>` : ''}
    </article>`).join('')}
  </section>
  ${pageNudge(lang, lim.nudge)}
</main>`;
  }

  if (route === 'compatibility') {
    const cmp = c.compatibility;
    return `<main id="main" class="inner-page">
  ${breadcrumbs(lang, [{ label: c.ui.homeLabel, href: routeUrl(lang, 'home') }, { label: c.meta.compatibility.breadcrumb }])}
  ${pageHero(cmp.eyebrow, cmp.title, cmp.lead, HERO_MASCOT_BY_ROUTE.compatibility, cmp.mascotAlt)}
  <section class="container doc-stack">
    <article class="doc-card">
      <h2>${escapeHtml(cmp.tableTitle)}</h2>
      <div class="data-table-wrap">
        <table class="data-table">
          <caption>${escapeHtml(cmp.tableCaption)}</caption>
          <thead>
            <tr>
              ${cmp.tableHeaders.map(th => `<th scope="col">${escapeHtml(th)}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${cmp.tableRows.map(row => `<tr>
              <th scope="row">${escapeHtml(row[0])}</th>
              <td>${escapeHtml(row[1])}</td>
              <td>${escapeHtml(row[2])}</td>
              <td>${escapeHtml(row[3])}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div class="doc-callout">
        <p><strong>${escapeHtml(cmp.calloutTitle)}</strong> ${escapeHtml(cmp.calloutText)}</p>
      </div>
    </article>
    <article class="doc-card">
      <h2>${escapeHtml(cmp.engineTitle)}</h2>
      <ul>
        ${cmp.engineItems.map(([strong, text]) => `<li><strong>${escapeHtml(strong)}</strong> ${escapeHtml(text)}</li>`).join('')}
      </ul>
    </article>
  </section>
  ${pageNudge(lang, cmp.nudge)}
</main>`;
  }

  if (route === 'privacy') {
    const pr = c.privacy;
    return `<main id="main" class="inner-page">
  ${breadcrumbs(lang, [{ label: c.ui.homeLabel, href: routeUrl(lang, 'home') }, { label: c.meta.privacy.breadcrumb }])}
  ${pageHero(pr.eyebrow, pr.title, pr.lead, HERO_MASCOT_BY_ROUTE.privacy, pr.mascotAlt)}
  <section class="container">
    <div class="notice-box notice-draft">
      <h2><span class="status-pill draft">${escapeHtml(pr.draftBadge)}</span> ${escapeHtml(pr.draftTitle)}</h2>
      <p>${escapeHtml(pr.draftText)}</p>
    </div>
  </section>
  <section class="container doc-stack">
    <article class="doc-card">
      <h2>${escapeHtml(pr.s1Title)}</h2>
      <p>${escapeHtml(pr.s1Lead)}</p>
      <ul>${pr.s1Items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
    </article>

    <article class="doc-card">
      <h2>${escapeHtml(pr.s2Title)}</h2>
      <p>${escapeHtml(pr.s2Lead)}</p>
      <ul>${pr.s2Items.map(([strong, text]) => `<li><strong>${escapeHtml(strong)}</strong> ${escapeHtml(text)}</li>`).join('')}</ul>
    </article>

    <article class="doc-card" id="permissions">
      <h2>${escapeHtml(pr.s3Title)}</h2>
      <div class="data-table-wrap">
        <table class="data-table">
          <caption>${escapeHtml(pr.s3Caption)}</caption>
          <thead>
            <tr>
              <th scope="col">${escapeHtml(pr.s3Headers[0])}</th>
              <th scope="col">${escapeHtml(pr.s3Headers[1])}</th>
            </tr>
          </thead>
          <tbody>
            ${pr.s3Rows.map(([k, v]) => `<tr><th scope="row"><code>${escapeHtml(k)}</code></th><td>${escapeHtml(v)}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div class="doc-callout">
        <p><strong>${escapeHtml(pr.s3CalloutTitle)}</strong> ${escapeHtml(pr.s3CalloutText)}</p>
      </div>
    </article>

    <article class="doc-card">
      <h2>${escapeHtml(pr.s4Title)}</h2>
      ${pr.s4Paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('')}
    </article>

    <article class="doc-card" id="pro-privacy" data-status="in-development">
      <span class="status-pill dev-pill">${escapeHtml(pr.s5ProBadge)}</span>
      <h2>${escapeHtml(pr.s5ProTitle)}</h2>
      <p>${escapeHtml(pr.s5ProText)}</p>
    </article>

    <article class="doc-card">
      <h2>${escapeHtml(pr.s6Title)}</h2>
      <p>${escapeHtml(pr.s6TextBefore)}<a class="inline-link" href="${routeUrl(lang, 'uninstall')}">${escapeHtml(pr.s6UninstallLinkText)}</a>${escapeHtml(pr.s6TextAfter)}</p>
    </article>
  </section>
  ${pageNudge(lang, pr.nudge)}
</main>`;
  }

  if (route === 'terms') {
    const tm = c.terms;
    return `<main id="main" class="inner-page" data-status="in-development">
  ${breadcrumbs(lang, [{ label: c.ui.homeLabel, href: routeUrl(lang, 'home') }, { label: c.meta.terms.breadcrumb }])}
  ${pageHero(tm.eyebrow, tm.title, tm.lead, HERO_MASCOT_BY_ROUTE.terms, tm.mascotAlt)}
  <section class="container">
    <div class="notice-box notice-draft">
      <h2><span class="status-pill draft">${escapeHtml(tm.draftBadge)}</span> ${escapeHtml(tm.draftTitle)}</h2>
      <p>${escapeHtml(tm.draftText)}</p>
    </div>
  </section>
  <section class="container doc-stack">
    ${tm.sections.map(sec => `<article class="doc-card"${isProText(sec) ? ' data-status="in-development"' : ''}>
      ${isProText(sec) ? devBadge(lang) : ''}
      <h2>${escapeHtml(sec.title)}</h2>
      ${sec.paragraphs ? sec.paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('') : ''}
      ${sec.items ? `<ul>${sec.items.map(it => `<li>${escapeHtml(it)}</li>`).join('')}</ul>` : ''}
    </article>`).join('')}
    <article class="notice-box" id="open-questions" data-status="in-development">
      ${devBadge(lang)}
      <h2>${escapeHtml(tm.openTitle)}</h2>
      <p>${escapeHtml(tm.openIntro)}</p>
      <ul>
        ${tm.openItems.map(([strong, text]) => `<li><strong>${escapeHtml(strong)}</strong> ${escapeHtml(text)}</li>`).join('')}
      </ul>
    </article>
  </section>
  ${pageNudge(lang, tm.nudge)}
</main>`;
  }

  if (route === 'faq') {
    const fq = c.faqPage;
    return `<main id="main" class="inner-page" data-status="in-development">
  ${breadcrumbs(lang, [{ label: c.ui.homeLabel, href: routeUrl(lang, 'home') }, { label: c.meta.faq.breadcrumb }])}
  ${pageHero(fq.eyebrow, fq.title, fq.lead, HERO_MASCOT_BY_ROUTE.faq, fq.mascotAlt, false, c.ui.devBadge)}
  <section class="container faq-standalone">
    ${faqAccordion(lang, fq.items, true)}
  </section>
  ${pageNudge(lang, fq.nudge)}
</main>`;
  }

  if (route === 'support') {
    const sp = c.support;
    return `<main id="main" class="inner-page">
  ${breadcrumbs(lang, [{ label: c.ui.homeLabel, href: routeUrl(lang, 'home') }, { label: c.meta.support.breadcrumb }])}
  ${pageHero(sp.eyebrow, sp.title, sp.lead, HERO_MASCOT_BY_ROUTE.support, sp.mascotAlt)}
  <section class="container info-grid">
    ${sp.cards.map(card => `<article class="info-card">
      <span class="info-icon">${icon(card.icon)}</span>
      <h2>${escapeHtml(card.title)}</h2>
      <p>${escapeHtml(card.p1)}</p>
      ${card.p2 ? `<p>${escapeHtml(card.p2)}</p>` : `<p>${escapeHtml(card.p2Prefix)}<a class="inline-link" href="${routeUrl(lang, 'limits')}">${escapeHtml(card.limitsLinkText)}</a>${escapeHtml(card.p2Suffix)}</p>`}
    </article>`).join('')}
  </section>
  <section class="container doc-stack">
    <article class="doc-card">
      <h2>${escapeHtml(sp.devTitle)}</h2>
      <p>${escapeHtml(sp.devP1Prefix)}<a class="inline-link" href="${STUDIO}" rel="noopener">${escapeHtml(sp.devP1Link)}</a>${escapeHtml(sp.devP1Suffix)}</p>
      <p>${escapeHtml(sp.devP2Prefix)}<a class="inline-link" href="${routeUrl(lang, 'terms')}#open-questions">${escapeHtml(sp.openQuestionsLinkText)}</a>${escapeHtml(sp.devP2Suffix)}</p>
    </article>
  </section>
  ${pageNudge(lang, sp.nudge)}
</main>`;
  }

  if (route === 'changelog') {
    const ch = c.changelog;
    return `<main id="main" class="inner-page">
  ${breadcrumbs(lang, [{ label: c.ui.homeLabel, href: routeUrl(lang, 'home') }, { label: c.meta.changelog.breadcrumb }])}
  ${pageHero(ch.eyebrow, ch.title, ch.lead, HERO_MASCOT_BY_ROUTE.changelog, ch.mascotAlt)}
  <section class="container doc-stack">
    <article class="doc-card">
      <span class="status-pill">${escapeHtml(ch.versionBadge)}</span>
      <h2>${escapeHtml(ch.releaseTitle)}</h2>
      <ul>
        ${ch.releaseItems.map(([strong, text]) => `<li><strong>${escapeHtml(strong)}</strong> ${escapeHtml(text)}</li>`).join('')}
      </ul>
    </article>

    <article class="doc-card" id="roadmap">
      <h2>${escapeHtml(ch.roadmapTitle)}</h2>
      <p>${escapeHtml(ch.roadmapIntro)}</p>
      <div class="roadmap-grid">
        ${ch.roadmapStages.map(stage => `<div class="roadmap-stage roadmap-${stage.status}"${stage.status === 'in-development' ? ' data-status="in-development"' : ''}>
          <span class="status-pill${stage.status === 'in-development' ? ' dev-pill' : stage.status === 'in-progress' ? ' draft' : ''}">${escapeHtml(stage.badge)}</span>
          <h3>${escapeHtml(stage.title)}</h3>
          <ul>
            ${stage.items.map(it => `<li>${escapeHtml(it)}</li>`).join('')}
          </ul>
        </div>`).join('')}
      </div>
    </article>
  </section>
  ${pageNudge(lang, ch.nudge)}
</main>`;
  }

  throw new Error(`Unknown route: ${route}`);
}

function buildJsonLd(lang, route, canonical, desc) {
  const c = CONTENT[lang];
  const studioOrg = {
    '@type': 'Organization',
    name: 'WillowinWorlds',
    url: STUDIO
  };

  if (route === 'home') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          name: 'AntiRacketMantis',
          applicationCategory: 'BrowserApplication',
          operatingSystem: 'Chrome 110+, Firefox 128+',
          softwareVersion: VERSION,
          inLanguage: lang,
          description: desc,
          url: canonical,
          publisher: studioOrg
        },
        studioOrg
      ]
    };
  }

  if (route === '404') return null;

  const isFeatureSub = FEATURE_ROUTES.includes(route);
  const breadcrumbItems = isFeatureSub
    ? [
        { '@type': 'ListItem', position: 1, name: c.ui.homeLabel, item: SITE + routeUrl(lang, 'home') },
        { '@type': 'ListItem', position: 2, name: c.meta.features.breadcrumb, item: SITE + routeUrl(lang, 'features') },
        { '@type': 'ListItem', position: 3, name: c.meta[route].breadcrumb, item: canonical }
      ]
    : [
        { '@type': 'ListItem', position: 1, name: c.ui.homeLabel, item: SITE + routeUrl(lang, 'home') },
        { '@type': 'ListItem', position: 2, name: c.meta[route].breadcrumb, item: canonical }
      ];

  const breadcrumb = { '@type': 'BreadcrumbList', itemListElement: breadcrumbItems };

  if (route === 'faq') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        breadcrumb,
        {
          '@type': 'FAQPage',
          mainEntity: c.faqPage.items.map(item => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a }
          }))
        }
      ]
    };
  }

  if (isFeatureSub) {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        breadcrumb,
        {
          '@type': 'FAQPage',
          mainEntity: c.featurePages[route].faqs.map(item => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a }
          }))
        }
      ]
    };
  }

  if (route === 'pro') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        breadcrumb,
        {
          '@type': 'FAQPage',
          mainEntity: c.proPage.faqs.map(item => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a }
          }))
        }
      ]
    };
  }

  return { '@context': 'https://schema.org', ...breadcrumb };
}

// The site has no fetch, forms, workers, media or third-party resources. Keep meta and HTTP policies aligned.
// connect-src 'self' (not 'none'): Lighthouse fetches robots.txt from the page context; 'none' blocks it and drops the SEO score.
// Same-origin only on a static host cannot exfiltrate anything, so the practical risk is nil.
const META_CSP = "default-src 'self'; base-uri 'none'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; object-src 'none'; frame-src 'none'; connect-src 'self'; form-action 'none'; manifest-src 'self'; worker-src 'none'; media-src 'none'; upgrade-insecure-requests";
const HEADER_CSP = `${META_CSP}; frame-ancestors 'none'`;

function verificationMeta() {
  const tags = [];
  if (GSC_VERIFICATION) tags.push(`<meta name="google-site-verification" content="${escapeAttr(GSC_VERIFICATION)}">`);
  if (BING_VERIFICATION) tags.push(`<meta name="msvalidate.01" content="${escapeAttr(BING_VERIFICATION)}">`);
  return tags.join('\n  ');
}

function htmlPage(lang, route) {
  const c = CONTENT[lang];
  const lm = LANG_META[lang];
  const meta = c.meta[route];
  const canonical = SITE + routeUrl(lang, route);
  const ld = buildJsonLd(lang, route, canonical, meta.desc);
  const preloadMascot = HERO_MASCOT_BY_ROUTE[route] || '/assets/mascot.svg';
  const altLocales = LANGS.filter(l => l !== lang).map(l => LANG_META[l].ogLocale);
  const hreflangTags = LANGS.length > 1
    ? [
        ...LANGS.map(l => `<link rel="alternate" hreflang="${LANG_META[l].hreflang}" href="${SITE}${routeUrl(l, route)}">`),
        `<link rel="alternate" hreflang="x-default" href="${SITE}${routeUrl(X_DEFAULT_LANG, route)}">`
      ].join('\n  ')
    : '';
  const verify = verificationMeta();

  return `<!doctype html>
<html lang="${lm.code}" dir="${lm.direction}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="theme-color" content="#d9f3dc">
  <meta http-equiv="Content-Security-Policy" content="${META_CSP}">
  <meta name="referrer" content="no-referrer">
  ${verify ? `${verify}\n  ` : ''}<title>${escapeHtml(meta.title)}</title>
  <meta name="description" content="${escapeAttr(meta.desc)}">
  <link rel="canonical" href="${canonical}">
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="icon" href="/assets/mark.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png">
  <link rel="preload" href="${lm.fontPreload}" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="${preloadMascot}" as="image" type="image/svg+xml" fetchpriority="high">
  <link rel="stylesheet" href="/assets/styles.css">
  <link rel="stylesheet" href="/assets/${route === 'home' ? 'home.css' : 'inner.css'}">
  <noscript><link rel="stylesheet" href="/assets/nojs.css"></noscript>
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="AntiRacketMantis">
  <meta property="og:title" content="${escapeAttr(meta.title)}">
  <meta property="og:description" content="${escapeAttr(meta.desc)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:locale" content="${lm.ogLocale}">
  ${altLocales.map(loc => `<meta property="og:locale:alternate" content="${loc}">`).join('\n  ')}
  <meta property="og:image" content="${SITE}/assets/og.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${escapeAttr(c.ui.ogImageAlt)}">
  <meta name="twitter:card" content="summary_large_image">
  ${hreflangTags}
  ${ld ? `<script type="application/ld+json">${JSON.stringify(ld)}</script>` : ''}
  <script src="/assets/main.js" defer></script>
</head>
<body data-lang="${lm.code}" data-page="${route}">
${header(lang, route)}
${route === 'home' ? homePage(lang) : detailPage(lang, route)}
${footer(lang, route)}
</body>
</html>`;
}

function notFoundPage() {
  const canonical = `${SITE}/404.html`;
  return `<!doctype html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="theme-color" content="#d9f3dc">
  <meta http-equiv="Content-Security-Policy" content="${META_CSP}">
  <meta name="referrer" content="no-referrer">
  <meta name="robots" content="noindex">
  <title>${escapeHtml(CONTENT.en.notFound.metaTitle)}</title>
  <meta name="description" content="${escapeAttr(CONTENT.en.notFound.metaDescription)}">
  <link rel="canonical" href="${canonical}">
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="icon" href="/assets/mark.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png">
  <link rel="preload" href="/assets/fonts/nunito-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/mascot-lost.svg" as="image" type="image/svg+xml" fetchpriority="high">
  <link rel="stylesheet" href="/assets/styles.css">
  <link rel="stylesheet" href="/assets/inner.css">
  <noscript><link rel="stylesheet" href="/assets/nojs.css"></noscript>
  <script src="/assets/main.js" defer></script>
</head>
<body data-lang="en" data-page="404">
${header('en', '404')}
<main id="main" class="inner-page not-found">
  <div class="container">
    <span class="eyebrow">404</span>
    <h1>${escapeHtml(CONTENT.en.notFound.heading)}</h1>
    <img src="/assets/mascot-lost.svg" class="mascot-reactive not-found-mascot" alt="${escapeAttr(CONTENT.en.notFound.mascotAlt)}" width="240" height="288" fetchpriority="high">
    <div class="not-found-langs">
      ${ALL_LANGS.map(l => {
        const nf = CONTENT[l].notFound;
        return `<section class="doc-card not-found-card" lang="${l}">
          <span class="status-pill">${LANG_META[l].short} · ${escapeHtml(LANG_META[l].name)}</span>
          <h2>${escapeHtml(nf.title)}</h2>
          <p>${escapeHtml(nf.text)}</p>
          <div class="not-found-links">
            <a href="${routeUrl(l, 'home')}" class="btn btn-primary" hreflang="${l}">${escapeHtml(nf.homeBtn)}</a>
            <a href="${routeUrl(l, 'install')}" class="btn btn-secondary" hreflang="${l}">${escapeHtml(nf.installBtn)}</a>
            <a href="${routeUrl(l, 'features')}" class="btn btn-secondary" hreflang="${l}">${escapeHtml(nf.featuresBtn)}</a>
            <a href="${routeUrl(l, 'faq')}" class="btn btn-secondary" hreflang="${l}">${escapeHtml(nf.faqBtn)}</a>
          </div>
        </section>`;
      }).join('')}
    </div>
  </div>
</main>
${footer('en', '404')}
</body>
</html>`;
}

function write(file, content) {
  const p = path.join(DEST, file);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content);
}

if (fs.existsSync(DEST)) {
  fs.rmSync(DEST, { recursive: true, force: true });
}

const pages = [];
for (const l of LANGS) {
  for (const r of ROUTES) {
    const out = `${l === 'ru' ? '' : `${l}/`}${r === 'home' ? 'index.html' : `${r}/index.html`}`;
    const html = htmlPage(l, r);
    write(out, html);
    pages.push(html);
  }
}

const notFoundHtml = notFoundPage();
write('404.html', notFoundHtml);
pages.push(notFoundHtml);

// robots.txt mirrors the crawler policy of the sister site willowinworlds.com (owner's policy: do not add or remove bots here).
const AI_SEARCH_BOTS = ['OAI-SearchBot', 'PerplexityBot', 'Claude-SearchBot'];
const AI_USER_BOTS = ['ChatGPT-User', 'Perplexity-User', 'Claude-User'];
const AI_TRAINING_BOTS = ['GPTBot', 'ClaudeBot', 'CCBot', 'Google-Extended', 'Applebot-Extended', 'Meta-ExternalAgent', 'Bytespider'];
const allowGroup = bot => `User-agent: ${bot}\nAllow: /\n`;
write('robots.txt', `# AI search indexing. These groups deliberately mirror the public-site rules below.
${AI_SEARCH_BOTS.map(allowGroup).join('\n')}
# User-requested retrieval by AI assistants.
${AI_USER_BOTS.map(allowGroup).join('\n')}
# AI/ML training crawlers: site assets must not be used for model training (see /terms/).
${AI_TRAINING_BOTS.map(bot => `User-agent: ${bot}`).join('\n')}
Disallow: /assets/

User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml

# Curated machine-readable product guide (an emerging LLM convention):
# ${SITE}/llms.txt
# Multilingual discovery map:
# ${SITE}/languages.json
`);

// sitemap.xml lists every indexable page (no noindex) and takes canonical, hreflang alternates and images from the page HTML itself.
const LASTMOD_FILE = path.join(ROOT, 'scripts', 'sitemap-lastmod.json');
const canonicalOf = html => html.match(/<link rel="canonical" href="([^"]+)"/)[1];
const lastmodKey = html => new URL(canonicalOf(html)).pathname;

// Content hash of a page; the build year and the site origin are volatile, so they are left out.
export function pageHash(html) {
  return crypto.createHash('sha256').update(html.replaceAll(SITE, '').replace(/©\s*\d{4}/g, '©')).digest('hex');
}

// prev: { "/path/": { hash, lastmod } }. A page gets `today` only when its hash is new or changed.
export function updateLastmod(prev, htmls, today) {
  const next = { ...prev };
  for (const html of htmls) {
    const key = lastmodKey(html);
    const hash = pageHash(html);
    if (next[key]?.hash !== hash) next[key] = { hash, lastmod: today };
  }
  return next;
}

function sitemapUrl(html, lastmod) {
  const alternates = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)]
    .map(m => `    <xhtml:link rel="alternate" hreflang="${m[1]}" href="${m[2]}" />`);
  const images = [...new Set([...html.matchAll(/<img\b(?![^>]*aria-hidden="true")[^>]*\bsrc="(\/[^"]+)"/g)].map(m => m[1]))]
    .map(src => `    <image:image>\n      <image:loc>${SITE}${src}</image:loc>\n    </image:image>`);
  return ['  <url>', `    <loc>${canonicalOf(html)}</loc>`, `    <lastmod>${lastmod}</lastmod>`, ...alternates, ...images, '  </url>'].join('\n');
}

const todayUtc = new Date().toISOString().slice(0, 10);
const indexable = pages.filter(html => !/<meta name="robots" content="[^"]*noindex/i.test(html));
const lastmods = updateLastmod(
  fs.existsSync(LASTMOD_FILE) ? JSON.parse(fs.readFileSync(LASTMOD_FILE, 'utf8')) : {},
  indexable,
  todayUtc
);
fs.writeFileSync(LASTMOD_FILE, `${JSON.stringify(lastmods, null, 2)}\n`);
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${indexable.map(html => sitemapUrl(html, lastmods[lastmodKey(html)].lastmod)).join('\n')}
</urlset>
`);

// Curated English llms.txt covering product scope, status, browsers, Free, planned PRO and every page in RU/EN/TR.
const llmsSections = LANGS.map(l => {
  const heading = l === 'ru' ? 'Russian pages (root /)' : l === 'en' ? 'English pages (/en/)' : 'Turkish pages (/tr/)';
  const lines = ROUTES.map(r => `- [${CONTENT.en.meta[r].title}](${SITE}${routeUrl(l, r)}): ${CONTENT.en.meta[r].desc}`);
  return `## ${heading}\n\n${lines.join('\n')}`;
}).join('\n\n');

write('llms.txt', `# AntiRacketMantis

> AntiRacketMantis is a browser extension by WillowinWorlds for calmer browsing: ad blocking, tracker protection, automatic opt-out for supported cookie banners, unsolicited pop-up control and five clear protection levels.

- Current status: Pre-release version ${VERSION}, preparing for first public store publication. Official Chrome Web Store and Firefox Add-ons listings are not live yet.
- Supported browsers: Google Chrome / Chromium (110+, Manifest V3) and Mozilla Firefox (128+, Manifest V3). Safari and mobile browsers are not supported.
- Core protection (Free): network and cosmetic ad blocking (bundled uBlock Origin Lite 2026.1116.1650 lists), tracker and badware filtering (EasyPrivacy, RU AdList: Counters, uBO Badware, Peter Lowe, EasyList, RU AdList, AdGuard Turkish), URL tracking-parameter cleanup, Sec-GPC/DNT headers, cookie-banner opt-out (DuckDuckGo autoconsent 18.6.0), level 3+ pop-up/pop-under control, level 5 fingerprint protection, up to 100 domain exceptions and JSON settings export/import.
- AntiRacketMantis PRO (In development): planned optional subscription inside the same extension at a planned price of $39/month. Planned capabilities: everything in Free, AI-assisted CAPTCHA recognition using models planned to run locally, local neural networks, image analysis, advanced browser automation for a user's own routine actions and extra controls. PRO is not available yet, no payment flow exists, no launch date is set, and passing any CAPTCHA on any site is never promised.
- Privacy & transparency: This static website sets no cookies, uses no trackers or analytics and has no personal-data collection forms. Extension permissions, local storage and network-module audit status are disclosed on the Privacy and Known Limits pages. No rating, review score or user numbers are claimed.
- Languages: Russian (root \`/\`), English (\`/en/\`, \`x-default\`) and Turkish (\`/tr/\`). Latest source update: ${todayUtc}.

${llmsSections}

## Discovery and policies

- [XML sitemap](${SITE}/sitemap.xml): Canonical indexable pages with hreflang alternates and lastmod dates.
- [Language index](${SITE}/languages.json): Machine-readable map of localized homes and this guide.
- [Security contact](${SITE}/.well-known/security.txt): Studio security reporting metadata.
- [Developer studio — WillowinWorlds](${STUDIO}): Independent game and application studio behind AntiRacketMantis.
`);

// languages.json matching the WillowinWorld schema
write('languages.json', `${JSON.stringify({
  schemaVersion: 1,
  defaultLanguage: X_DEFAULT_LANG,
  lastModified: todayUtc,
  languages: LANGS.map(l => ({
    code: LANG_META[l].code,
    hreflang: LANG_META[l].hreflang,
    name: LANG_META[l].name,
    direction: LANG_META[l].direction,
    home: `${SITE}${routeUrl(l, 'home')}`,
    llms: `${SITE}/llms.txt`
  }))
}, null, 2)}\n`);

// manifest.webmanifest with generated PNG icons
write('manifest.webmanifest', `${JSON.stringify({
  name: 'AntiRacketMantis',
  short_name: 'AntiRacketMantis',
  description: CONTENT.en.meta.home.desc,
  start_url: '/',
  scope: '/',
  display: 'standalone',
  theme_color: '#d9f3dc',
  background_color: '#fffaf1',
  icons: [
    { src: '/assets/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: '/assets/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    { src: '/assets/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
  ]
}, null, 2)}\n`);

// .well-known/security.txt (Expires one year ahead of build date, fixed to UTC midnight)
const expiresYear = Number(todayUtc.slice(0, 4)) + 1;
const expiresIso = `${expiresYear}${todayUtc.slice(4)}T00:00:00.000Z`;
write('.well-known/security.txt', `Contact: ${SECURITY_CONTACT}
Expires: ${expiresIso}
Preferred-Languages: ru, en
Canonical: ${SITE}/.well-known/security.txt
`);

const serverHeaders = `# Security & cache headers for static hosting (Cloudflare Pages / Netlify compatible)
# Note: GitHub Pages ignores _headers; HTML pages also ship meta CSP and referrer tags.
/*
  Content-Security-Policy: ${HEADER_CSP}
  Strict-Transport-Security: max-age=31536000
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Resource-Policy: same-origin
  X-Permitted-Cross-Domain-Policies: none
  Origin-Agent-Cluster: ?1
  Cache-Control: public, max-age=300, must-revalidate

/assets/*
  Cache-Control: public, max-age=604800, stale-while-revalidate=86400

/assets/fonts/*
  Cache-Control: public, max-age=31536000, immutable

/manifest.webmanifest
  Cache-Control: public, max-age=3600

/sitemap.xml
  Cache-Control: public, max-age=3600

/robots.txt
  Cache-Control: public, max-age=3600

/languages.json
  Cache-Control: public, max-age=3600

/llms.txt
  Cache-Control: public, max-age=3600
`;
write('_headers', serverHeaders);

export function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .join('')
    .replace(/\s*([{};,])\s*/g, '$1')
    .replace(/;}/g, '}')
    .replace(/@media\s*\(/g, '@media(')
    .replace(/\band\(/g, 'and (');
}

function minifyJs(js) {
  return js
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('//'))
    .join('\n');
}

fs.mkdirSync(path.join(DEST, 'assets'), { recursive: true });
for (const cssFile of ['styles.css', 'home.css', 'inner.css', 'nojs.css']) {
  const srcPath = path.join(ROOT, 'src', cssFile);
  if (fs.existsSync(srcPath)) {
    fs.writeFileSync(path.join(DEST, 'assets', cssFile), minifyCss(fs.readFileSync(srcPath, 'utf8')));
  }
}
const jsSrc = path.join(ROOT, 'src', 'main.js');
if (fs.existsSync(jsSrc)) {
  fs.writeFileSync(path.join(DEST, 'assets', 'main.js'), minifyJs(fs.readFileSync(jsSrc, 'utf8')));
}
for (const file of ['mascot.svg', 'mascot-block.svg', 'mascot-celebrate.svg', 'mascot-thinking.svg', 'mascot-pro.svg', 'mascot-lost.svg', 'mark.svg', 'og.svg', 'og.png']) {
  const srcPath = path.join(ROOT, 'src', file);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, path.join(DEST, 'assets', file));
  }
}

for (const sub of ['fonts', 'screenshots', 'icons']) {
  const srcDir = path.join(ROOT, 'src', sub);
  if (fs.existsSync(srcDir)) {
    fs.mkdirSync(path.join(DEST, 'assets', sub), { recursive: true });
    for (const file of fs.readdirSync(srcDir)) {
      fs.copyFileSync(path.join(srcDir, file), path.join(DEST, 'assets', sub, file));
    }
  }
}

console.log(`Generated ${LANGS.length * ROUTES.length + 1} HTML pages (${LANGS.join(', ')}) for AntiRacketMantis`);
checkDist();
