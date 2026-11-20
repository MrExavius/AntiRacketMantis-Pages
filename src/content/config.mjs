export const SITE = (process.env.SITE_URL || 'https://antiracketmantis.willowinworlds.com').replace(/\/+$/, '');
export const VERSION = '0.11.0';
export const STUDIO = 'https://willowinworlds.com/';
export const SECURITY_CONTACT = 'https://willowinworlds.com/#contact';

export const ALL_LANGS = ['ru', 'en', 'tr'];
export const DEFAULT_LANG = 'ru';
export const X_DEFAULT_LANG = 'en';

// Store URLs: keep null until official Chrome Web Store and Firefox Add-ons listings are published.
// When null, buttons link to the local install guide (#chrome / #firefox) with a "coming soon" badge.
// When set to an https:// URL, buttons become direct external store links with rel="noopener".
export const STORES = {
  chrome: null,
  firefox: null
};

export const LANG_META = {
  ru: {
    code: 'ru',
    hreflang: 'ru',
    ogLocale: 'ru_RU',
    name: 'Русский',
    short: 'RU',
    direction: 'ltr',
    fontPreload: '/assets/fonts/nunito-cyrillic.woff2'
  },
  en: {
    code: 'en',
    hreflang: 'en',
    ogLocale: 'en_US',
    name: 'English',
    short: 'EN',
    direction: 'ltr',
    fontPreload: '/assets/fonts/nunito-latin.woff2'
  },
  tr: {
    code: 'tr',
    hreflang: 'tr',
    ogLocale: 'tr_TR',
    name: 'Türkçe',
    short: 'TR',
    direction: 'ltr',
    fontPreload: '/assets/fonts/nunito-latin.woff2'
  }
};

export const ROUTES = [
  'home',
  'features',
  'features/ad-blocker',
  'features/tracker-blocker',
  'features/cookie-banners',
  'features/popup-blocker',
  'pro',
  'how-it-works',
  'install',
  'uninstall',
  'limits',
  'compatibility',
  'privacy',
  'terms',
  'faq',
  'support',
  'changelog'
];

export const FEATURE_ROUTES = [
  'features/ad-blocker',
  'features/tracker-blocker',
  'features/cookie-banners',
  'features/popup-blocker'
];

export const HERO_MASCOT_BY_ROUTE = {
  home: '/assets/mascot.svg',
  install: '/assets/mascot.svg',
  compatibility: '/assets/mascot.svg',
  features: '/assets/mascot-block.svg',
  'features/ad-blocker': '/assets/mascot-block.svg',
  'features/tracker-blocker': '/assets/mascot-block.svg',
  'features/cookie-banners': '/assets/mascot-block.svg',
  'features/popup-blocker': '/assets/mascot-block.svg',
  limits: '/assets/mascot-block.svg',
  privacy: '/assets/mascot-block.svg',
  pro: '/assets/mascot-pro.svg',
  'how-it-works': '/assets/mascot-thinking.svg',
  uninstall: '/assets/mascot-thinking.svg',
  terms: '/assets/mascot-thinking.svg',
  faq: '/assets/mascot-thinking.svg',
  support: '/assets/mascot-thinking.svg',
  changelog: '/assets/mascot-celebrate.svg',
  404: '/assets/mascot-lost.svg'
};

export const SCREENSHOT_ASSETS = {
  ru: {
    popupShield: { base: 'popup-shield', width: 728, height: 750 },
    optionsLevels: { base: 'options-levels', width: 746, height: 215 },
    optionsExceptionsCookies: { base: 'options-exceptions-cookies', width: 774, height: 334 },
    optionsLists: { base: 'options-filter-lists', width: 746, height: 443 },
    welcomeProtections: { base: 'welcome-protections', width: 841, height: 263 },
    optionsTheme: { base: 'options-theme', width: 731, height: 69 }
  },
  en: {
    popupShield: { base: 'popup-shield-en', width: 728, height: 676 },
    optionsLevels: { base: 'options-levels-en', width: 779, height: 215 },
    optionsExceptionsCookies: { base: 'options-exceptions-cookies-en', width: 798, height: 292 },
    optionsLists: { base: 'options-filter-lists-en', width: 779, height: 443 },
    welcomeProtections: { base: 'welcome-protections-en', width: 841, height: 222 },
    optionsTheme: { base: 'options-theme-en', width: 779, height: 69 }
  }
};

export function routeUrl(lang, route = '') {
  const clean = route === 'home' ? '' : route;
  const prefix = lang === 'ru' ? '' : `/${lang}`;
  if (!clean) return prefix ? `${prefix}/` : '/';
  if (clean.endsWith('.html')) return `${prefix}/${clean}`.replace(/\/+/g, '/');
  return `${prefix}/${clean}/`.replace(/\/+/g, '/');
}
