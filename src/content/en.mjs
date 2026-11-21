import { SITE, STUDIO, VERSION } from './config.mjs';

export default {
  ui: {
    langName: 'English',
    skipToContent: 'Skip to content',
    brandHomeAria: 'AntiRacketMantis - home',
    mainNavAria: 'Main navigation',
    langSwitcherAria: 'Language selection',
    breadcrumbsAria: 'Breadcrumbs',
    homeLabel: 'Home',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    motionOff: 'Pause animations',
    motionOn: 'Play animations',
    footerAboutAria: 'About the extension',
    footerAboutHeading: 'Extension',
    footerTrustAria: 'Policies and help',
    footerTrustHeading: 'Policies & help',
    footerLangAria: 'Site languages',
    footerLangHeading: 'Language',
    madeFor: 'Made for everyday browsing',
    company: 'A product by',
    versionLine: 'Version',
    statusLine: 'preparing for public release',
    ogImageAlt: 'AntiRacketMantis - a browser extension for fewer ads, trackers and pop-ups',
    more: 'Learn more',
    allFeatures: 'All features',
    howItWorksLink: 'How it works',
    installCta: 'Install',
    soonBadge: 'soon',
    devBadge: 'In development',
    plannedPriceLabel: 'planned price',
    perMonth: '/ month',
    illustrationLabel: 'Illustration',
    screenshotBadgePrefix: `Screenshot of version ${VERSION}`,
    chromeBtnLabel: 'For Chrome',
    firefoxBtnLabel: 'For Firefox',
    levelPrefix: 'Level',
    exploreFeatures: 'Explore features',
    installGuideLink: 'Installation guide',
    studioSign: 'Made by WillowinWorlds',
    themeDark: 'Switch to dark theme',
    themeLight: 'Switch to light theme'
  },

  nav: [
    { route: 'features', label: 'Features' },
    { route: 'how-it-works', label: 'How it works' },
    { route: 'pro', label: 'PRO' },
    { route: 'privacy', label: 'Privacy' },
    { route: 'faq', label: 'FAQ' },
    { route: 'support', label: 'Support' }
  ],

  footerProductLinks: [
    ['features', 'Features'],
    ['features/ad-blocker', 'Ad blocker'],
    ['features/tracker-blocker', 'Tracker blocker'],
    ['features/cookie-banners', 'Cookie banners'],
    ['features/popup-blocker', 'Pop-up blocker'],
    ['pro', 'AntiRacketMantis PRO'],
    ['how-it-works', 'How it works'],
    ['install', 'Install'],
    ['uninstall', 'Uninstall'],
    ['compatibility', 'Compatibility'],
    ['limits', 'Known limits']
  ],

  footerTrustLinks: [
    ['privacy', 'Privacy Policy'],
    ['terms', 'Terms of Use'],
    ['faq', 'FAQ'],
    ['support', 'Support'],
    ['changelog', 'Changelog & Roadmap']
  ],

  meta: {
    home: {
      title: 'AntiRacketMantis - Ad & Tracker Blocker (Chrome, Firefox)',
      desc: 'AntiRacketMantis browser extension for Chrome and Firefox: block ads, limit trackers, reject non-essential cookies and stop unwanted pop-ups.',
      breadcrumb: 'Home'
    },
    features: {
      title: 'Browser Protection Features - AntiRacketMantis',
      desc: 'Six tools in AntiRacketMantis: ad blocking, tracker protection, cookie banners, pop-up control, fingerprint controls and per-site exceptions.',
      breadcrumb: 'Features'
    },
    'features/ad-blocker': {
      title: 'Ad Blocker for Chrome and Firefox - AntiRacketMantis',
      desc: 'Manifest V3 network rules and cosmetic filters for Chrome and Firefox. Fewer banners and empty ad boxes, plus a one-click switch for each site.',
      breadcrumb: 'Ad blocker'
    },
    'features/tracker-blocker': {
      title: 'Tracker Blocker & URL Cleaner - AntiRacketMantis',
      desc: 'Block known trackers, strip UTM tracking parameters and send Sec-GPC/DNT signals in Chrome and Firefox using built-in EasyPrivacy lists.',
      breadcrumb: 'Tracker blocker'
    },
    'features/cookie-banners': {
      title: 'Automatic Cookie Banner Control - AntiRacketMantis',
      desc: 'Rejects non-essential cookies automatically on supported consent dialogs in Chrome and Firefox. It has its own setting, and its limits are spelled out.',
      breadcrumb: 'Cookie banners'
    },
    'features/popup-blocker': {
      title: 'Pop-up and pop-under blocker - AntiRacketMantis',
      desc: 'Stop unsolicited pop-ups and background pop-under tabs in Chrome and Firefox while keeping sign-in, banking and payment windows working.',
      breadcrumb: 'Pop-up blocker'
    },
    pro: {
      title: 'AntiRacketMantis PRO (In Development) - $39/mo Planned',
      desc: 'AntiRacketMantis PRO is in development ($39/month planned price): local neural models, AI-assisted CAPTCHA help and automation inside the same extension.',
      breadcrumb: 'PRO'
    },
    'how-it-works': {
      title: 'How Protection & 5 Levels Work - AntiRacketMantis',
      desc: 'How AntiRacketMantis works: Manifest V3 declarativeNetRequest lists, cosmetic filters, cookie-banner opt-out, JSON settings transfer and 5 protection levels.',
      breadcrumb: 'How it works'
    },
    install: {
      title: 'Install for Chrome & Firefox - AntiRacketMantis',
      desc: 'Step-by-step guide to installing AntiRacketMantis in Google Chrome or Mozilla Firefox. It shows the store release status and a short checklist after install.',
      breadcrumb: 'Install'
    },
    uninstall: {
      title: 'How to Uninstall the Extension - AntiRacketMantis',
      desc: 'How to remove AntiRacketMantis from Chrome or Firefox in seconds, and what happens to your local settings, site exceptions and event log.',
      breadcrumb: 'Uninstall'
    },
    limits: {
      title: 'Known Protection Limits - AntiRacketMantis',
      desc: 'Known limits of browser filtering: first-party ads, cookie banners, sign-in windows, side effects of strict levels and browser-protected system pages.',
      breadcrumb: 'Known limits'
    },
    compatibility: {
      title: 'Browser Compatibility - AntiRacketMantis',
      desc: 'Supported versions of Google Chrome / Chromium (110+) and Mozilla Firefox (128+), Manifest V3 rule limits and local-network exclusions.',
      breadcrumb: 'Compatibility'
    },
    privacy: {
      title: 'Privacy Policy (Pre-release Draft) - AntiRacketMantis',
      desc: 'The website uses no trackers. The extension keeps data in local storage, explains each permission, lists network modules and shows the pre-launch audit status.',
      breadcrumb: 'Privacy Policy'
    },
    terms: {
      title: 'Terms of Use (Draft) - AntiRacketMantis',
      desc: 'Pre-release draft Terms of Use for AntiRacketMantis. Covers the personal license, acceptable use, as-is disclaimer, liability limits and open legal questions.',
      breadcrumb: 'Terms of Use'
    },
    faq: {
      title: 'Frequently Asked Questions (FAQ) - AntiRacketMantis',
      desc: 'Answers about the AntiRacketMantis store launch, permissions, data handling, performance, browser support, planned PRO features and removal.',
      breadcrumb: 'FAQ'
    },
    support: {
      title: 'Support & Troubleshooting - AntiRacketMantis',
      desc: 'Quick steps to fix a broken site, stop pop-ups or handle remaining ads, plus how to contact the independent WillowinWorlds studio.',
      breadcrumb: 'Support'
    },
    changelog: {
      title: 'Changelog & Roadmap - AntiRacketMantis',
      desc: 'Verified contents of pre-release version 0.11.0 for Chrome and Firefox, plus a roadmap of finished, active and planned work.',
      breadcrumb: 'Changelog'
    }
  },

  home: {
    badge: 'Browser extension for Chrome and Firefox',
    heroA: 'Fewer ads.',
    heroB: 'Less tracking.',
    heroText: 'A free browser extension for Chrome and Firefox. It reduces intrusive ads, trackers, cookie banners and unsolicited pop-ups, with 5 protection levels to choose from.',
    heroPopupAlt: 'Real AntiRacketMantis popup window: Protection is on for example.org, level 2 of 5',
    heroMascotAlt: 'Minty the mantis, the AntiRacketMantis mascot waving hello',
    heroNotes: ['Turn protection off for one site in a click', 'Five levels, level 2 is on by default'],
    heroSupport: { label: 'Works in', status: `Not in the stores yet. Version ${VERSION} is getting ready for release.` },
    demoNote: `Real popup screenshot, version ${VERSION}`,

    compare: {
      tag: 'Before and after',
      title: 'A busy page, with and without protection',
      text: 'Move the slider to compare an illustrative busy page with the same page under protection.',
      points: ['Ad banners and empty ad boxes are removed from level 3', 'Supported cookie dialogs are answered with "reject"', 'Pop-ups you did not click are held back from level 3'],
      limitsLink: 'What the extension does not hide and why',
      without: 'Without protection',
      with: 'With protection',
      sampleTitle: 'Your favorite magazine',
      sampleCopy: 'A short story you can read without the noise.',
      ad: 'AD',
      cookie: 'Accept all cookies?',
      popup: 'Subscribe right now!',
      caption: 'Illustration - not a benchmark or live-site capture'
    },

    features: {
      tag: 'What it includes',
      title: 'Six tools for everyday browsing',
      intro: 'Ad filtering, tracker protection, cookie-banner handling, pop-up control, privacy extras and site exceptions for Chrome and Firefox.',
      howLink: 'How the protection works'
    },

    levels: {
      tag: 'Five protection levels',
      title: 'Five levels, from Compatibility to Maximum',
      intro: 'Choose between less noise and sites that work as usual. Level 1 is the gentlest and level 5 the strictest. Level 2 is on by default.',
      detailLink: 'Compare all 5 levels',
      pickerLegend: 'Pick a level to see what it changes'
    },

    proTeaser: {
      badge: 'In development',
      title: 'Core protection is free. PRO is being built inside the same extension.',
      text: 'Ad blocking, tracker filtering, cookie-banner handling and pop-up protection stay free. PRO is an upcoming optional subscription inside the same extension for local neural networks and routine browser automation.',
      proTitle: 'AntiRacketMantis PRO',
      proPrice: '$39',
      proPriceLabel: 'planned price',
      disclaimer: 'PRO is in development and not available yet. No payment flow is open, no release date is set, and passing verification checks on any site is never promised.',
      primaryCta: 'Explore PRO plans',
      secondaryCta: 'Follow launch progress'
    },

    interface: {
      tag: 'Screenshots',
      title: 'Inside the extension',
      text: 'Screenshots of the AntiRacketMantis popup and settings: the switches, levels and site exceptions as they look in the browser.',
      allLink: 'See all settings and filter-list screenshots',
      prev: 'Previous screenshot',
      next: 'Next screenshot'
    },

    steps: {
      tag: 'Setup',
      title: 'Three steps to get started',
      items: [
        ['Review the install guide', 'Check Chrome (110+) or Firefox (128+) requirements and browser permissions before public store launch.'],
        ['Add to your browser', 'Once published in Chrome Web Store and Firefox Add-ons, confirm installation and pin the icon to your toolbar.'],
        ['Pick a protection level', 'Choose a level from 1 to 5. You can pause protection on any single site with one click.']
      ]
    },

    trust: {
      tag: 'Privacy',
      title: 'How your data is handled',
      text: 'We explain what runs locally, why each browser permission is requested and where filtering falls short.',
      bullets: [
        'One-click “Protection on this site” switch whenever a page breaks or blocks access',
        'Five protection levels, from Compatibility to Maximum',
        'Settings, site exceptions and the diagnostic log stay locally in your browser'
      ],
      privacyBtn: 'Privacy Policy',
      limitsBtn: 'Known limits'
    },

    permissions: {
      tag: 'About permissions',
      title: 'Which permissions are requested, and why',
      intro: 'Your browser shows these permissions during installation. Here is what each one is used for.',
      helpTitle: 'If a website stops working',
      helpText: 'Switch off protection for that site inside the popup and reload the tab. See Known Limits and Support for quick troubleshooting.',
      detailsLink: 'Full permission breakdown',
      uninstallLink: 'How to uninstall and clear data',
      dialogSub: 'requests browser access',
      perms: [
        ['Read and change site data (http/https + scripting)', 'Used to hide cosmetic ad containers, handle supported cookie banners, block unsolicited pop-ups and apply fingerprint protections.'],
        ['Block and modify network requests (declarativeNetRequest)', 'Your browser engine matches requests against built-in filter lists to block ad/tracker domains and strip tracking parameters from links.'],
        ['Read active tab and tabs (tabs, activeTab)', 'Used to show the protection state for the current website and let you toggle exceptions or reload the tab in one click.'],
        ['Store settings locally (storage)', 'Saves your protection level, cookie-banner mode, per-site exceptions and local diagnostic log inside your browser profile.']
      ],
      note: 'Final data-flow disclosures and the public Privacy Policy will be confirmed after completing the pre-release package audit.'
    },

    studio: {
      title: 'Who makes it',
      text: 'AntiRacketMantis is built by WillowinWorlds, a small independent studio that makes games and apps. We write down what the extension does and where it falls short.',
      link: 'Visit WillowinWorlds',
      changelogLink: 'Changelog',
      bugLink: 'Report a problem'
    },

    faq: {
      tag: 'Before you install',
      title: 'Common questions',
      allLink: 'All questions',
      supportLink: 'Support page',
      mascotAlt: 'Minty the mantis thinking thoughtfully about a question'
    },

    final: {
      tag: 'Before the store launch',
      title: 'Not in the stores yet',
      text: 'Core protection stays free. The install guide and browser versions can be checked now, and store links appear after review.',
      compatNote: 'Builds are being prepared for Chrome (110+) and Firefox (128+). Other browsers are not promised until tested.',
      compatLink: 'Compatibility',
      installLink: 'Install guide',
      mascotAlt: 'Minty the mantis celebrating a clean page'
    }
  },

  featuresHub: {
    eyebrow: 'Protection features',
    title: 'What AntiRacketMantis does',
    lead: 'Six tools for Chrome and Firefox: ad blocking, tracker protection, cookie-banner opt-out, pop-up control, privacy extras and site exceptions.',
    mascotAlt: 'Minty the mantis holding a protective shield',
    deepLinksIntro: 'Read more about each area:',
    items: [
      {
        id: 'ads',
        route: 'features/ad-blocker',
        tone: 'lime',
        icon: 'ad',
        cardTitle: 'Fewer intrusive ads',
        cardText: 'Fewer flashing banners and empty ad boxes around the article or tool you opened.',
        title: 'Network and page-level ad blocking',
        summary: 'Removes third-party ad banners, heavy ad scripts and leftover empty boxes so pages stay readable.',
        details: 'Network rules built from uBlock filters, EasyList, RU AdList, Peter Lowe and AdGuard Turkish stop requests to known ad servers before they load. Starting at level 3 (Balanced), cosmetic filters also hide remaining ad containers inside the page layout.',
        limit: 'Limit: first-party ads served from the same domain as the content or brand-new page layouts may remain visible until built-in lists update.',
        tags: ['Network rules', 'Cosmetic filters', 'From level 2-3'],
        ctaLabel: 'Read about ad blocking'
      },
      {
        id: 'tracking',
        route: 'features/tracker-blocker',
        tone: 'sky',
        icon: 'eye',
        cardTitle: 'Less cross-site tracking',
        cardText: 'Limits known analytics counters, tracking pixels and URL tracking parameters.',
        title: 'Tracker and link-parameter protection',
        summary: 'Blocks known third-party trackers, badware domains and noisy query parameters in links.',
        details: 'From level 2, built-in EasyPrivacy, RU AdList: Counters and uBO Badware lists run in the browser engine. From level 3, AntiRacketMantis strips tracking parameters such as utm_* and fbclid and sends Sec-GPC and DNT signals.',
        limit: 'Limit: no browser extension gives full anonymity - your internet provider and the site you open still see your IP address and visit.',
        tags: ['EasyPrivacy', 'URL cleaning', 'Sec-GPC & DNT'],
        ctaLabel: 'Read about tracker protection'
      },
      {
        id: 'cookies',
        route: 'features/cookie-banners',
        tone: 'peach',
        icon: 'cookie',
        cardTitle: 'Automatic cookie opt-out',
        cardText: 'Rejects non-essential cookies automatically on supported consent dialogs.',
        title: 'Automatic cookie-banner handling',
        summary: 'Attempts to opt out of non-essential cookies where the consent dialog supports that choice.',
        details: 'Cookie-banner handling has its own setting separate from levels 1-5: by default it rejects non-essential cookies using built-in rules for compatible consent dialogs. At level 4 and above, third-party cookie-notice scripts and third-party cookies are also blocked.',
        limit: 'Limit: hiding a banner when a site does not offer an opt-out flow is not a technical cookie rejection; websites may still set necessary security cookies.',
        tags: ['Separate setting', 'Opt-out first', 'Known limits'],
        ctaLabel: 'Read about cookie banners'
      },
      {
        id: 'popups',
        route: 'features/popup-blocker',
        tone: 'leaf',
        icon: 'popup',
        cardTitle: 'Fewer unwanted windows',
        cardText: 'Stops unsolicited pop-ups and background pop-under tabs without breaking logins.',
        title: 'Pop-up and new-tab control',
        summary: 'Holds back pop-up windows and background pop-under tabs opened without your click.',
        details: 'Starting at level 3 (Balanced), a lightweight window guard blocks scripts from spawning unsolicited pop-ups or hidden tabs while letting user-initiated sign-in and payment flows proceed.',
        limit: 'Limit: windows needed for OAuth sign-in, bank verification and payment should open normally - if one is blocked, pause protection for that site in one click.',
        tags: ['Anti-pop-up', 'Anti-pop-under', 'Keeps login & payment'],
        ctaLabel: 'Read about pop-up blocking'
      },
      {
        id: 'privacy',
        route: null,
        tone: 'mint',
        icon: 'lock',
        cardTitle: 'Extra privacy controls',
        cardText: 'Privacy headers, fingerprint controls and strict HTTPS, depending on your level.',
        title: 'Additional privacy tools',
        summary: 'Canvas masking toggle, strict fingerprint protection, ping blocking and HTTPS upgrades.',
        details: 'The popup includes an experimental Canvas masking switch, while level 5 (Maximum) enables broader fingerprint protection (canvas, WebGL, audio and generic CPU core count), blocks third-party ping and CSP reports and upgrades navigation to HTTPS (excluding private local-network hosts).',
        limit: 'Limit: fingerprint randomization varies across loads, which can cause some sites to ask for extra verification more often.',
        tags: ['Canvas / WebGL', 'Ping blocking', 'Level 5 HTTPS'],
        ctaLabel: 'See How It Works'
      },
      {
        id: 'filters',
        route: null,
        tone: 'butter',
        icon: 'sliders',
        cardTitle: 'Levels and site exceptions',
        cardText: 'Five levels and a per-site switch that pauses protection.',
        title: 'Protection levels and site exceptions',
        summary: 'Switch between five levels anytime, exclude up to 100 domains and export settings as JSON.',
        details: 'Move smoothly between Compatibility (1) and Maximum (5), add broken sites to your exception list (including subdomains) and move settings between browsers with plain JSON export/import - no account needed.',
        limit: 'Limit: level or exception changes apply to new page loads after reloading the tab - the extension displays a convenient Reload button.',
        tags: ['5 levels', 'Domain exceptions', 'JSON export'],
        ctaLabel: 'Explore the 5 levels'
      }
    ],
    nudge: {
      title: 'Go deeper',
      text: 'Read how the 5 levels work, look at the planned PRO tier or check the known limits.',
      actions: [
        ['how-it-works', 'How it works', 'btn-primary'],
        ['pro', 'Planned PRO tier', 'btn-secondary'],
        ['limits', 'Known limits', 'btn-cream']
      ]
    }
  },

  featurePages: {
    'features/ad-blocker': {
      id: 'ad-blocker',
      tone: 'lime',
      icon: 'ad',
      eyebrow: 'Ad blocker · Chrome & Firefox',
      title: 'Removing ads and empty ad boxes',
      lead: 'AntiRacketMantis removes third-party ad banners, heavy ad scripts and leftover empty boxes with Manifest V3 rules, so articles and web apps stay readable.',
      mascotAlt: 'Minty the mantis holding a shield to keep ad clutter away',
      whatTitle: 'What the ad blocker does',
      whatParagraphs: [
        'The extension stops requests to known ad networks before banners and heavy scripts load. From level 3 (Balanced) upward, cosmetic rules also hide leftover ad containers and empty placeholders inside the page.',
        'Filtering runs locally in Google Chrome (110+) and Mozilla Firefox (128+) from built-in rule lists, without sending your browsing history to any developer server.'
      ],
      howTitle: 'How it works in plain words',
      howParagraphs: [
        'At the network layer, your browser itself checks outgoing requests via the standard declarativeNetRequest API against bundled lists (Peter Lowe from level 2; uBlock filters, EasyList, RU AdList and AdGuard Turkish from level 3). Lists ship inside the extension (based on uBlock Origin Lite 2026.1116.1650) and are not downloaded while you browse.',
        'At the cosmetic layer (level 3+), content scripts hide ad frames and empty gaps so text stays clean and steady.'
      ],
      benefitsTitle: 'Why it fits everyday browsing',
      benefits: [
        { title: 'You control the strictness', text: 'Level 2 (default) keeps compatibility high with light network filtering; level 3 enables full ad lists and cosmetic hiding.' },
        { title: 'One-click pause per site', text: 'If a site asks you to pause ad blocking or its layout breaks, flip “Protection on this site” off in the popup and reload.' },
        { title: 'No background list downloads', text: 'All filter lists are bundled inside the extension package and update cleanly with new extension versions.' }
      ],
      scene: {
        label: 'Illustration',
        title: 'How an article page changes',
        caption: 'Illustrative scene showing network and cosmetic filtering (not a speed benchmark or live site screenshot).',
        beforeTitle: 'Without ad filtering',
        beforeItems: ['Top banner pushing the headline down', 'Sidebar ad cards and blinking promos', 'Empty frames and third-party ad scripts'],
        afterTitle: 'At level 3 (Balanced)',
        afterItems: ['Headline and article text immediately readable', 'Known third-party ad domains stopped by the browser', 'Cosmetic rules hide leftover empty containers']
      },
      exampleTitle: 'Everyday example',
      exampleText: 'You open a long guide or news article in Chrome or Firefox. At default level 2, common ad domains from Peter Lowe’s list are already blocked; switching to level 3 (Balanced) and reloading clears remaining cosmetic banners too. Want to support a favorite independent blog? Pause protection for that domain in one click.',
      settingsTitle: 'Related settings and levels',
      settingsText: 'Level 1 (Compatibility) turns ad filters off. Level 2 (Light, default) enables Peter Lowe without cosmetic filtering. Level 3 (Balanced) activates full uBlock filters, EasyList, RU AdList, AdGuard Turkish and cosmetic hiding.',
      settingsLinkText: 'Compare all 5 protection levels',
      limitsTitle: 'Limits',
      limitsText: 'First-party ads served from the website’s own domain, in-article sponsor paragraphs and rapidly changing site markup may still appear. Read every boundary on our Known Limits page.',
      limitsLinkText: 'Read all known limits',
      faqTitle: 'Ad blocker FAQ',
      faqs: [
        { q: 'Why do some banners still appear right after installation?', a: 'Level 2 (Light protection) is the default to keep compatibility high, so cosmetic hiding is off initially. Switch to level 3 (Balanced) and reload the tab for full ad blocking.' },
        { q: 'Does the ad blocker work the same in Chrome and Firefox?', a: 'Core network and cosmetic rules work in both Chrome 110+ and Firefox 128+. The only UI difference is that Chrome reports a matched-rule counter for the active tab, while Firefox does not expose that counter to extensions.' },
        { q: 'Can I allow ads on one specific site I want to support?', a: 'Yes. Open the AntiRacketMantis popup on that site, switch off “Protection on this site” and click Reload. You can manage up to 100 excluded domains (including subdomains).' },
        { q: 'Does it block every single ad on the web?', a: 'No. First-party ads served from the same host as the content and brand-new layouts can slip past static filter lists until lists are updated.' }
      ],
      relatedTitle: 'More protection tools',
      nudge: {
        title: 'Try it in your browser',
        text: 'Check the Chrome and Firefox install guide or explore tracker protection next.',
        actions: [
          ['install', 'Installation guide', 'btn-primary'],
          ['features/tracker-blocker', 'Tracker protection', 'btn-secondary']
        ]
      }
    },

    'features/tracker-blocker': {
      id: 'tracker-blocker',
      tone: 'sky',
      icon: 'eye',
      eyebrow: 'Tracker blocker · Chrome & Firefox',
      title: 'Limit trackers, counters and link tags',
      lead: 'Cuts down third-party tracking during everyday browsing by blocking known analytics domains, cleaning tracking parameters from links and sending browser privacy signals.',
      mascotAlt: 'Minty the mantis shielding pages from third-party trackers',
      whatTitle: 'What tracker protection does',
      whatParagraphs: [
        'Tracker protection stops requests to known cross-site analytics scripts, advertising pixels and malicious or scam domains right inside the browser’s network layer.',
        'Starting at level 3 (Balanced), AntiRacketMantis also removes tracking query parameters such as utm_* and fbclid from URLs and sends Sec-GPC and DNT headers.'
      ],
      howTitle: 'How it works in plain words',
      howParagraphs: [
        'Right from default level 2 (Light protection), the browser’s declarativeNetRequest engine applies built-in lists including EasyPrivacy (over 9,000 rules), RU AdList: Counters and uBlock filters - Badware risks.',
        'At level 4 (Strict), third-party cookies are stripped from requests and social media widgets are blocked. Level 5 (Maximum) adds fingerprint protection (canvas, WebGL, audio), blocks third-party ping/CSP beacons and requires HTTPS outside private local networks.'
      ],
      benefitsTitle: 'Practical benefits',
      benefits: [
        { title: 'Active out of the box', text: 'EasyPrivacy, RU AdList: Counters and uBO Badware are enabled from default level 2.' },
        { title: 'Cleaner shared links', text: 'At level 3+, common tracking tags are stripped from URLs automatically.' },
        { title: 'Full visibility of built-in lists', text: 'Settings show every bundled filter list, its rule count and whether it is active at your current level.' }
      ],
      scene: {
        label: 'Illustration',
        title: 'Opening a shared article link',
        caption: 'Illustrative diagram of tracker blocking and URL cleaning (not live telemetry).',
        beforeTitle: 'Without tracker protection',
        beforeItems: ['Link carries long ?utm_source=...&fbclid=... tags', 'Third-party analytics counters and pixels load with the page', 'Embedded social buttons observe your visit across sites'],
        afterTitle: 'With AntiRacketMantis (level 3-4)',
        afterItems: ['Known tracking query tags stripped from the link', 'Known EasyPrivacy tracker requests stopped locally', 'Sec-GPC signal sent; level 4 also blocks third-party widgets']
      },
      exampleTitle: 'Everyday example',
      exampleText: 'You click a newsletter link in Chrome or Firefox. At level 3, AntiRacketMantis cleans tracking parameters from the address and blocks known EasyPrivacy counters locally. If strict level 4 or 5 breaks a third-party sign-in button on a specific site, drop back to level 3 or exclude that domain.',
      settingsTitle: 'Related settings and levels',
      settingsText: 'Level 2 enables EasyPrivacy, RU AdList: Counters and uBO Badware. Level 3 adds URL cleaning and Sec-GPC/DNT. Level 4 strips third-party cookies and social widgets. Level 5 adds fingerprint controls, beacon blocking and HTTPS upgrades.',
      settingsLinkText: 'See all 5 protection levels',
      limitsTitle: 'Limits',
      limitsText: 'No browser extension provides complete anonymity: your internet provider and the site you visit still see your IP address and activity on that site. Incognito mode alone does not block trackers while you browse.',
      limitsLinkText: 'Read privacy limits',
      faqTitle: 'Tracker blocker FAQ',
      faqs: [
        { q: 'Does tracker blocking replace a VPN or make me anonymous?', a: 'No. It reduces third-party tracking scripts and link tags, but it does not hide your IP address from your ISP or the websites you open.' },
        { q: 'Why isn’t Incognito mode enough to block trackers?', a: 'Incognito prevents saving local history and cookies after you close the window, but ad networks and analytics scripts still load during the session. AntiRacketMantis blocks known trackers before they run.' },
        { q: 'Does tracker protection send my visited URLs to a remote server?', a: 'No. Matching happens locally inside the browser’s declarativeNetRequest engine against bundled filter lists.' },
        { q: 'What if level 4 or 5 breaks “Sign in with …” buttons?', a: 'Level 4 removes third-party cookies that some federated sign-in flows rely on. Switch to level 3 (Balanced) or disable protection for that site in the popup.' }
      ],
      relatedTitle: 'More protection tools',
      nudge: {
        title: 'Data handling details',
        text: 'Read our Privacy Policy or learn how AntiRacketMantis handles cookie banners.',
        actions: [
          ['privacy', 'Privacy Policy', 'btn-primary'],
          ['features/cookie-banners', 'Cookie banners', 'btn-secondary']
        ]
      }
    },

    'features/cookie-banners': {
      id: 'cookie-banners',
      tone: 'peach',
      icon: 'cookie',
      eyebrow: 'Cookie banners · Chrome & Firefox',
      title: 'Automatic cookie banner opt-out',
      lead: 'Tries to reject non-essential cookies automatically on supported consent dialogs, so you spend less time hunting for small opt-out buttons.',
      mascotAlt: 'Minty the mantis shielding you from repetitive cookie pop-ups',
      whatTitle: 'What cookie-banner handling does',
      whatParagraphs: [
        'On supported sites, AntiRacketMantis detects the consent dialog and triggers its built-in opt-out choice for non-essential advertising and analytics cookies - never clicking “Accept all”.',
        'This control is independent from protection levels 1-5: you can keep non-essential cookie opt-out active even at level 1 (Compatibility), or switch it to “Leave alone” whenever you prefer.'
      ],
      howTitle: 'How it works in plain words',
      howParagraphs: [
        'The module uses bundled consent-dialog rules (based on DuckDuckGo autoconsent 18.6.0) running via the scripting API in an isolated page world to select the site’s own reject option.',
        'At level 4 (Strict) and above, network rules also block third-party cookie-notice scripts and limit third-party cookies.'
      ],
      benefitsTitle: 'Why opt-out beats blindly hiding banners',
      benefits: [
        { title: 'Rejects instead of accepting', text: 'Where a banner supports declining optional cookies, the extension picks rejection rather than accepting everything.' },
        { title: 'Independent toggle', text: 'Switch between “Reject non-essential cookies” and “Leave alone” without changing your ad/tracker level.' },
        { title: 'Essential cookies keep working', text: 'Websites can still set strictly necessary login, cart and security cookies.' }
      ],
      scene: {
        label: 'Illustration',
        title: 'First visit to a site with a consent dialog',
        caption: 'Illustrative flow for a supported consent banner (unsupported custom banners may still appear).',
        beforeTitle: 'Clicking manually every time',
        beforeItems: ['Full-width “Accept all cookies?” banner blocks the screen', 'You open “Manage preferences” and untick sliders manually', 'Repeated across dozens of sites every week'],
        afterTitle: 'With “Reject non-essential cookies”',
        afterItems: ['Compatible consent dialog is recognized automatically', 'Non-essential cookies are declined without clicking “Accept all”', 'The page stays readable while login and security cookies work']
      },
      exampleTitle: 'Everyday example',
      exampleText: 'You open documentation or a news outlet in Chrome or Firefox. Instead of digging through three consent screens, AntiRacketMantis triggers the reject flow automatically. If you want to pick preferences manually on a site, exclude that domain or switch cookie banners to “Leave alone”.',
      settingsTitle: 'Related settings and levels',
      settingsText: 'In Settings → Privacy and protection, set Cookie banners to “Reject non-essential cookies” (default) or “Leave alone”. Levels 4 and 5 additionally block third-party cookie-notice scripts.',
      settingsLinkText: 'View the settings screenshot in How It Works',
      limitsTitle: 'Limits',
      limitsText: 'Hiding a banner does not equal technically rejecting cookies when a site offers no opt-out flow or uses an unrecognized custom widget. Websites may also keep setting security and session cookies.',
      limitsLinkText: 'Read all known limits',
      faqTitle: 'Cookie banner FAQ',
      faqs: [
        { q: 'Does the extension click “Accept all” just to close the banner?', a: 'No. It is configured to decline non-essential cookies where the consent dialog provides an opt-out path.' },
        { q: 'Why do cookie notices still show on some websites?', a: 'Some websites build custom dialogs that are not covered by bundled rules. Leaving them visible avoids breaking page scrolling or buttons.' },
        { q: 'Does blocking the notice script at level 4-5 reject all cookies?', a: 'Not necessarily. Blocking the banner script hides the prompt, while the site may still set first-party or security cookies.' },
        { q: 'Can I turn off cookie-banner handling while keeping ad blocking?', a: 'Yes. Choose “Leave alone” in the Cookie banners setting; your chosen protection level continues working normally.' }
      ],
      relatedTitle: 'More protection tools',
      nudge: {
        title: 'Also see pop-up blocking',
        text: 'See how AntiRacketMantis stops unsolicited pop-ups and background tabs.',
        actions: [
          ['features/popup-blocker', 'Pop-up blocker', 'btn-primary'],
          ['install', 'Installation guide', 'btn-secondary']
        ]
      }
    },

    'features/popup-blocker': {
      id: 'popup-blocker',
      tone: 'leaf',
      icon: 'popup',
      eyebrow: 'Pop-up blocker · Chrome & Firefox',
      title: 'Stop unsolicited pop-ups and background tabs',
      lead: 'Holds back unexpected pop-up windows and hidden pop-under tabs triggered without your click, while aiming to keep essential sign-in and payment windows working.',
      mascotAlt: 'Minty the mantis holding a shield against surprise pop-up windows',
      whatTitle: 'What the pop-up blocker does',
      whatParagraphs: [
        'Starting at level 3 (Balanced), AntiRacketMantis intercepts scripts that try to open promotional pop-ups, extra tabs or hidden pop-under windows without your explicit click.',
        'At the same time, it aims to stay out of the way of windows you intentionally trigger - such as OAuth logins, bank confirmations and payment screens.'
      ],
      howTitle: 'How it works in plain words',
      howParagraphs: [
        'Using the scripting permission from level 3 upward, a lightweight window-control module checks whether a new window call matches an intentional user action and suppresses unsolicited attempts.',
        'Whenever a legitimate site relies on an unusual popup flow, toggling off protection for that domain restores full behavior immediately after reload.'
      ],
      benefitsTitle: 'Why window control matters',
      benefits: [
        { title: 'Fewer hijack tabs', text: 'Stops surprise pop-up windows and background pop-under tabs that open behind your browser.' },
        { title: 'Login and payment friendly', text: 'Designed to let user-initiated sign-in, banking and print dialogs open normally.' },
        { title: 'Fast per-site recovery', text: 'If a needed window is ever blocked, switch protection off for that domain in one click and reload.' }
      ],
      scene: {
        label: 'Illustration',
        title: 'Clicking a link on a noisy website',
        caption: 'Illustrative scene showing pop-up and pop-under control (conceptual example).',
        beforeTitle: 'Without pop-up control',
        beforeItems: ['A sudden “Join our newsletter!” window covers the content', 'An unwanted ad tab opens quietly behind your window (pop-under)', 'You close multiple tabs just to finish reading'],
        afterTitle: 'At level 3 (Balanced) and above',
        afterItems: ['Unsolicited windows without a real click are stopped', 'Background pop-under tabs do not hijack focus', 'You stay on your page while sign-in and payment flows keep working']
      },
      exampleTitle: 'Everyday example',
      exampleText: 'You visit an unfamiliar file mirror or recipe blog in Chrome or Firefox. Level 3 (Balanced) limits windows opened without a user action and some attempts to move newly opened windows into the background. It cannot identify every ad window opened by your own click. If a web portal needs a custom popup report window, add that domain to your exceptions in seconds.',
      settingsTitle: 'Related settings and levels',
      settingsText: 'Pop-up and pop-under protection activates automatically at level 3 (Balanced) and stays on at levels 4 and 5. Levels 1 and 2 leave window scripts untouched for maximum compatibility.',
      settingsLinkText: 'Compare all 5 protection levels',
      limitsTitle: 'Limits',
      limitsText: 'In-page DOM overlays that are not real browser windows, or scripts masquerading as user clicks, can behave differently. If an OAuth or payment window fails to open, pause protection for that site.',
      limitsLinkText: 'Read all known limits',
      faqTitle: 'Pop-up blocker FAQ',
      faqs: [
        { q: 'Why aren’t pop-ups blocked at default level 2?', a: 'Level 2 (Light protection) intentionally avoids modifying page scripts. Pop-up and pop-under protection turns on starting at level 3 (Balanced).' },
        { q: 'Will it break card payment or Google/email sign-in windows?', a: 'It aims to allow windows opened by your own click. If a payment or login window is ever blocked on a specific site, turn off protection for that site in the popup and reload.' },
        { q: 'Does pop-under protection work in both Firefox and Chrome?', a: 'Yes - both Chrome (110+) and Firefox (128+) builds include the level 3+ pop-up guard.' },
        { q: 'How do I allow pop-ups on one trusted website?', a: 'Open that website, click the AntiRacketMantis toolbar icon, toggle “Protection on this site” off and reload the tab.' }
      ],
      relatedTitle: 'More protection tools',
      nudge: {
        title: 'Next steps',
        text: 'Check the installation guide or learn what is planned for AntiRacketMantis PRO.',
        actions: [
          ['install', 'Install guide', 'btn-primary'],
          ['pro', 'AntiRacketMantis PRO', 'btn-secondary']
        ]
      }
    }
  },

  proPage: {
    eyebrow: 'Roadmap',
    title: 'AntiRacketMantis PRO',
    lead: 'One browser extension. A planned, optional PRO subscription inside it would add local neural networks, AI-assisted CAPTCHA recognition and advanced browser automation.',
    mascotAlt: 'Minty the mantis wearing a translucent visor with a glowing local-AI chip emblem for planned PRO features',
    statusBadge: 'In development',
    statusBoxTitle: 'PRO is currently in development and not available yet',
    statusBoxText: 'No payment flow, preorder or email waitlist is active, and no release date has been announced. All core protection - ad blocking, trackers, cookie banners and pop-ups - remains free.',
    priceCard: {
      title: 'AntiRacketMantis PRO',
      badge: 'In development',
      price: '$39',
      period: '/ month',
      priceLabel: 'planned price',
      summary: 'One extension: core browsing protection stays free, and optional PRO tools will live inside the same extension once development and auditing are finished.',
      primaryCta: 'Install the free version',
      secondaryCta: 'Follow launch progress'
    },
    plannedTitle: 'What is planned for AntiRacketMantis PRO',
    plannedIntro: 'PRO will include everything in the free version. The new PRO tools are not released yet; here is what is being developed:',
    plannedItems: [
      {
        icon: 'shield',
        tone: 'lime',
        included: true,
        badge: 'Included in Free',
        title: 'Everything in the free version',
        text: 'Full core protection: 5 levels of ad and tracker filtering, cookie-banner opt-out, pop-up control, fingerprint controls and site exceptions.'
      },
      {
        icon: 'sparkle',
        tone: 'lilac',
        badge: 'In development',
        title: 'AI-assisted CAPTCHA recognition',
        text: 'Assistance for the person in their own browser with image and text challenges, using recognition models planned to run locally.'
      },
      {
        icon: 'lock',
        tone: 'sky',
        badge: 'In development',
        title: 'Local neural networks & image analysis',
        text: 'On-device image recognition and analysis workflows designed to keep processing local wherever technically feasible.'
      },
      {
        icon: 'sliders',
        tone: 'butter',
        badge: 'In development',
        title: 'Advanced browser automation & extra tools',
        text: 'Tools to assist with a user’s own repetitive routine actions on pages they open, plus deeper configuration options.'
      }
    ],
    captchaHonesty: {
      title: 'CAPTCHA help and website rules',
      paragraphs: [
        'Planned PRO recognition tools are designed to assist a person in their own browser with image and text challenges using models planned to run locally.',
        'Passing any challenge on any website is never promised: recognition can fail, and websites change verification checks frequently.',
        'Some websites prohibit automated handling of verification challenges in their terms. Every person is responsible for following the rules of each site they visit.',
        'Before PRO launches, its data handling and local models will undergo a separate audit and be documented clearly in the Privacy Policy.'
      ]
    },
    compareTitle: 'Free vs. planned PRO comparison',
    compareCaption: 'Comparison of free AntiRacketMantis core protection and the planned PRO subscription (in development)',
    compareHeaders: ['Capability', 'Free (core protection)', 'PRO · in development ($39/mo planned price)'],
    compareRows: [
      ['Extension package', 'Single extension for Chrome & Firefox', 'Same extension (subscription inside later)'],
      ['Ad & tracker blocking', 'Included (5 levels, bundled lists)', 'Included in full'],
      ['Cookie banners & pop-up control', 'Included (separate setting + level 3+)', 'Included in full'],
      ['Site exceptions, themes, JSON transfer', 'Included, no account required', 'Included in full'],
      ['AI-assisted CAPTCHA recognition', 'Not part of core protection', 'In development (local models planned; no passing promises)'],
      ['Local neural networks & image analysis', 'Not included', 'In development'],
      ['Advanced browser automation & extra tools', 'Not included', 'In development'],
      ['Current status', 'Version 0.11.0 preparing for store launch', 'In development · not yet available']
    ],
    faqTitle: 'PRO FAQ',
    faqs: [
      { q: 'Will PRO be a separate extension or the same one?', a: 'One extension: AntiRacketMantis. Core protection stays free, and PRO will be an optional subscription unlocked inside the same extension later.' },
      { q: 'When will AntiRacketMantis PRO launch?', a: 'No release date is set yet - PRO is in development. You can track actual milestones on the Changelog & Roadmap page.' },
      { q: 'Will the free version remain free after PRO launches?', a: 'Yes. Ad blocking, tracker protection, cookie-banner opt-out, pop-up control, 5 levels and site exceptions stay in the free version.' },
      { q: 'Does PRO promise to pass every CAPTCHA on any site?', a: 'No. Recognition can fail, checks evolve constantly, and some sites forbid automated handling - each user must follow every website’s own rules.' },
      { q: 'Where is image processing planned to happen in PRO?', a: 'Recognition and image-analysis models are planned to run locally on your device. Exact data flows will be audited and published in the Privacy Policy before launch.' }
    ],
    nudge: {
      title: 'Start with free core protection',
      text: 'Review the installation guide or follow development milestones on the roadmap.',
      actions: [
        ['install', 'Install the free version', 'btn-primary'],
        ['changelog#roadmap', 'Follow launch progress', 'btn-secondary']
      ]
    }
  },

  levels: [
    { n: 1, name: 'Compatibility', summary: 'Network and cosmetic filters are off. Cookie-banner handling remains controlled separately.', badge: 'Minimal changes', isDefault: false },
    { n: 2, name: 'Light protection', summary: 'Blocks trackers (EasyPrivacy, RU AdList Counters), malicious domains and selected ad servers.', badge: 'Default', isDefault: true },
    { n: 3, name: 'Balanced', summary: 'Full ad lists (uBlock filters, EasyList, RU AdList), URL tag cleaning, Sec-GPC/DNT, cosmetic hiding and anti-pop-up.', badge: 'Quiet reading', isDefault: false },
    { n: 4, name: 'Strict', summary: 'Also strips third-party cookies from requests and blocks third-party cookie-banner scripts and social widgets.', badge: 'Tighter links', isDefault: false },
    { n: 5, name: 'Maximum', summary: 'Adds fingerprint protection (canvas, WebGL, audio), blocks third-party pings/CSP reports and upgrades to HTTPS.', badge: 'Maximum', isDefault: false }
  ],

  screenshots: {
    popupShield: {
      alt: 'AntiRacketMantis popup window, Protection tab on example.org: status Protection is on, site switch, 4 active filter lists, level 2 of 5 (Light protection) slider and Canvas masking toggle',
      title: 'Protection tab in the popup',
      desc: 'Shows the protection status for the current site, active filter list count, a one-click site toggle and the 1-5 protection slider.',
      caption: `Screenshot of version ${VERSION} · Protection tab on example.org`
    },
    optionsLevels: {
      alt: 'Settings section Protection level: 2 of 5 with slider from Compatibility to Maximum and default Light protection rule summary',
      title: 'Choosing a protection level (1-5)',
      desc: 'Switch smoothly from gentle filtering without cosmetic changes (default level 2) to strict privacy controls.',
      caption: `Screenshot of version ${VERSION} · Privacy and protection settings`
    },
    optionsExceptionsCookies: {
      alt: 'Site exceptions box Turn off protection for these sites (0/100) and Cookie banners dropdown set to Reject non-essential cookies',
      title: 'Site exceptions & cookie banners',
      desc: 'Exclude up to 100 domains (including subdomains) and configure automatic rejection of non-essential cookies separately.',
      caption: `Screenshot of version ${VERSION} · exceptions and cookie-banner mode`
    },
    optionsLists: {
      alt: 'Expanded built-in filter lists table in AntiRacketMantis settings: EasyPrivacy (9,162 rules), RU AdList: Counters (1,086), uBlock filters - Badware risks (435) and Peter Lowe set to on',
      title: 'Transparent built-in filter lists',
      desc: 'Inspect every bundled rule list (from uBlock Origin Lite 2026.1116.1650), rule count and active status - filter lists need no downloads while you browse.',
      caption: `Screenshot of version ${VERSION} · built-in filter lists`
    },
    welcomeProtections: {
      alt: 'Three protection summary cards on the AntiRacketMantis welcome page: Ads and trackers, Cookie banners and pop-ups, and Your choice, easy to undo',
      title: 'Clear overview on first launch',
      desc: 'The welcome screen explains built-in filter lists, cookie opt-out, level 3+ pop-up control and one-switch site exceptions.',
      caption: `Screenshot of version ${VERSION} · welcome screen protection cards`
    },
    optionsTheme: {
      alt: 'Theme dropdown in AntiRacketMantis settings showing Follow system',
      title: 'Light, dark and system themes',
      desc: 'Follow your operating system appearance automatically or pick a light or dark Mantis palette manually.',
      caption: `Screenshot of version ${VERSION} · theme selector`
    }
  },

  howItWorks: {
    eyebrow: 'Technical overview',
    title: 'How browser protection works',
    lead: 'AntiRacketMantis relies on the standard Manifest V3 rule engine, isolated content scripts and clear protection levels - without sending your browsing history to external servers.',
    mascotAlt: 'Minty the mantis studying how protection rules work',
    cards: [
      {
        icon: 'shield',
        title: '1. Browser network rules',
        p1: 'Ad servers, analytics trackers, badware domains and URL tracking tags are filtered using the browser’s built-in declarativeNetRequest API.',
        p2: 'The browser matches requests directly against bundled lists (EasyList, EasyPrivacy, uBlock filters, RU AdList, Peter Lowe, AdGuard Turkish) without sending visited addresses over the network.'
      },
      {
        icon: 'ad',
        title: '2. Cosmetics and anti-pop-up',
        p1: 'Starting at level 3, cosmetic filters hide leftover ad boxes and empty slots inside the page markup.',
        p2: 'A separate pop-up guard blocks pages from spawning surprise pop-up windows or background tabs without your explicit click.'
      },
      {
        icon: 'cookie',
        title: '3. Cookie banners and exceptions',
        p1: 'The cookie-banner module runs in an isolated page world and attempts to decline non-essential cookies on supported consent dialogs when enabled.',
        p2: 'If a site breaks or requires full access, the popup switch adds its domain to a priority exception above all level rules.'
      }
    ],
    levelsTitle: 'Five protection levels (1 to 5)',
    levelsIntro: 'Change levels anytime from the popup or settings page. Network and page-script changes take effect on new loads after reloading the tab.',
    builtinsTitle: 'Bundled lists and account-free transfer',
    builtinsItems: [
      ['Lists live inside the extension package:', 'filter rules (from uBlock Origin Lite 2026.1116.1650) and the cookie-banner engine (DuckDuckGo autoconsent 18.6.0) ship inside the extension and update with new releases - filter lists are not downloaded while you browse.'],
      ['Move settings without an account:', 'no sign-in or cloud sync is required - export and import your protection level, cookie-banner mode and site exceptions as a plain JSON file.'],
      ['No local CDN library proxying:', 'legacy LocalCDN-style substitution is not duplicated; CDN tracking is filtered by EasyPrivacy network rules.'],
      ['No unpredictable heuristic learning:', 'filtering stays predictable and follows your chosen level plus explicit site exceptions.']
    ],
    interfaceTitle: 'Extension interface',
    interfaceText: `Below are real protection screens from version ${VERSION}: the site popup, protection level 1-5 slider, bundled filter lists, exceptions, cookie banners, welcome overview and theme setting.`,
    nudge: {
      title: 'Next step',
      text: 'Check browser installation steps or read our Privacy Policy.',
      actions: [
        ['install', 'Install guide', 'btn-primary'],
        ['privacy', 'Privacy Policy', 'btn-secondary']
      ]
    }
  },

  install: {
    eyebrow: 'Installation',
    title: 'How to install AntiRacketMantis',
    lead: 'Step-by-step guide for Chrome and Firefox. The extension is preparing for its first public store release, so we do not show fake download links.',
    mascotAlt: 'Minty the mantis waving hello for installation',
    statusTitle: 'Current publication status',
    statusP1: `Version ${VERSION} is being prepared for Chrome Web Store and Firefox Add-ons. Direct store links will appear here immediately after review completes.`,
    statusP2: 'Do not install unofficial builds from third-party sites: once published, install only from the official store links listed on this website.',
    chromeTitle: 'Google Chrome & Chromium browsers',
    chromePill: 'Coming soon to Chrome Web Store · Chrome 110+',
    chromeSteps: [
      'Open the official AntiRacketMantis listing in Chrome Web Store (link will appear here after launch).',
      'Click “Add to Chrome” and carefully review the browser permission prompt.',
      'Pin AntiRacketMantis to your toolbar via the puzzle-piece Extensions button so you can see site status and toggle exceptions quickly.',
      'Click the icon: level 2 (Light protection) and non-essential cookie opt-out are enabled by default. Switch to level 3 (Balanced) for full ad blocking.'
    ],
    firefoxTitle: 'Mozilla Firefox',
    firefoxPill: 'Coming soon to Firefox Add-ons · Firefox 128+',
    firefoxSteps: [
      'Open the official AntiRacketMantis page on Firefox Add-ons (link will appear here after launch).',
      'Click “Add to Firefox” and confirm the requested permissions in the browser dialog.',
      'On the welcome screen, pick your preferred protection level and cookie-banner setting.',
      'Pin the extension icon from Firefox’s toolbar extensions menu if you want one-click access.'
    ],
    checklistTitle: 'What to check right after installing',
    checklistItems: [
      ['Pin the toolbar icon:', 'in Chrome click the puzzle Extensions icon and pin AntiRacketMantis; in Firefox pin it from the toolbar extensions menu.'],
      ['Test on a regular web page (http:// or https://):', 'on browser system tabs (chrome://, about: and add-on stores), the site switch is unavailable due to browser security boundaries.'],
      ['Check level 2 and level 3 behavior:', 'if comments, video players or logins stop loading on a familiar site, turn off “Protection on this site” in the Protection tab and click Reload.']
    ],
    checklistFourthPrefix: 'Review details before launch: check ',
    privacyLinkText: 'why each permission is needed',
    checklistFourthMid: ' and ',
    compatLinkText: 'supported browser versions',
    nudge: {
      title: 'Uninstall or check compatibility',
      text: 'See how removal clears local browser data or review the compatibility matrix.',
      actions: [
        ['uninstall', 'How to uninstall', 'btn-primary'],
        ['compatibility', 'Compatibility', 'btn-secondary']
      ]
    }
  },

  uninstall: {
    eyebrow: 'Uninstall',
    title: 'How to remove AntiRacketMantis',
    lead: 'You can uninstall the extension in under a minute. To fix one troublesome site, pause protection there without removing the extension.',
    mascotAlt: 'Minty the mantis helping with uninstallation steps',
    chromeTitle: 'Uninstall in Google Chrome / Chromium',
    chromeSteps: [
      'Right-click the AntiRacketMantis toolbar icon and choose “Remove from Chrome” - or open chrome://extensions.',
      'Find the AntiRacketMantis card and click “Remove”.',
      'Confirm removal in the browser dialog.'
    ],
    firefoxTitle: 'Uninstall in Mozilla Firefox',
    firefoxSteps: [
      'Open Firefox’s menu and choose “Add-ons and themes” (or type about:addons in the address bar).',
      'Open the Extensions list and click the “⋯” menu next to AntiRacketMantis.',
      'Click “Remove” and confirm.'
    ],
    dataTitle: 'What happens to your data after removal',
    dataItems: [
      ['Browser deletes local extension storage:', 'your protection level, exception list, cookie-banner mode, theme and local diagnostic log are erased with the extension profile.'],
      ['Manual JSON backups stay where you saved them:', 'any JSON settings file you manually exported remains on your disk until you delete it yourself.'],
      ['Alternative to uninstalling:', 'if only one website misbehaves, turn off “Protection on this site” in the popup and reload instead of removing the whole extension.']
    ],
    nudge: {
      title: 'If a page breaks',
      text: 'Check known protection limits or quick troubleshooting tips in Support.',
      actions: [
        ['limits', 'Known limits', 'btn-primary'],
        ['support', 'Support', 'btn-secondary']
      ]
    }
  },

  limits: {
    eyebrow: 'Where it falls short',
    title: 'Known protection limits',
    lead: 'No browser extension can filter the entire web perfectly without trade-offs. Here is where results can vary.',
    mascotAlt: 'Minty the mantis holding a shield to show clear boundaries',
    cards: [
      {
        icon: 'ad',
        title: 'Websites change and serve first-party ads',
        p1: 'Ads served from the same domain as the article or video (first-party) are technically hard to separate from regular content.',
        p2: 'Page markup also changes faster than bundled list updates, so individual ad elements may occasionally remain visible.'
      },
      {
        icon: 'cookie',
        title: 'Hiding a cookie banner ≠ rejecting cookies',
        p1: 'The extension tries to opt out of non-essential cookies in supported consent dialogs. When a site does not offer an opt-out path, hiding the banner at level 4-5 does not mean the site stopped setting cookies.',
        p2: 'Websites may also continue setting essential security and session cookies.'
      },
      {
        icon: 'popup',
        title: 'Essential login and payment windows must work',
        p1: 'Pop-up protection aims to stop windows opened without your explicit click.',
        p2: 'OAuth logins, banking verifications and payment windows should open normally - if one is ever blocked, pause protection for that site in the popup.'
      },
      {
        icon: 'lock',
        title: 'Side effects of strict levels (4 and 5)',
        p1: 'Level 4 removes third-party cookies, which can break “Sign in with …” buttons and embedded social widgets.',
        p2: 'Level 5 enables fingerprint randomization and strict HTTPS upgrades: HTTP-only websites will not load (private local-network addresses are excluded), and changing fingerprint noise can trigger extra verification checks.'
      },
      {
        icon: 'eye',
        title: 'Privacy and anonymity boundaries',
        p1: 'Blocking trackers and counters cuts down third-party tracking, but does not hide your IP address from visited websites or your internet provider.',
        p2: ''
      },
      {
        icon: 'sliders',
        title: 'Browser differences and protected system pages',
        p1: 'Chrome exposes a matched-rule count for the active tab, whereas Firefox does not pass that counter to extensions (a dash with a note is shown instead).',
        p2: 'In addition, browsers prevent all extensions from running on internal pages (chrome://, about:) and official extension stores for security.'
      }
    ],
    nudge: {
      title: 'Problems on one website',
      text: 'Read quick fixes in Support or verify browser compatibility.',
      actions: [
        ['support', 'Support', 'btn-primary'],
        ['compatibility', 'Compatibility', 'btn-secondary']
      ]
    }
  },

  compatibility: {
    eyebrow: 'Compatibility',
    title: 'Supported browsers and requirements',
    lead: 'We list only the browsers and versions that the extension manifests and rules are actually built for.',
    mascotAlt: 'Minty the mantis checking browser compatibility',
    tableTitle: 'Current compatibility matrix',
    tableCaption: 'AntiRacketMantis browser and version support matrix',
    tableHeaders: ['Browser / platform', 'Minimum version', 'Status', 'Notes'],
    tableRows: [
      ['Google Chrome / Chromium', 'Version 110+ (Manifest V3)', 'Preparing for launch', 'Supports matched-rule count on the active tab inside the popup (subject to Chrome’s 20 calls / 10 min quota).'],
      ['Mozilla Firefox', 'Version 128.0+ (Manifest V3)', 'Preparing for launch', 'Runs via Gecko background scripts; Firefox does not expose the per-tab rule match counter (all filtering still works).'],
      ['Safari, mobile browsers & older builds', '-', 'Not supported', 'Not tested and not promised until dedicated engineering and verification happen.']
    ],
    calloutTitle: 'Technical capability vs. actual behavior:',
    calloutText: 'the browser’s standard “Read and change all your data on all websites” warning describes technical permission to modify page markup for hiding ad boxes and handling cookie banners. Core filtering does not read your passwords, messages or private forms and does not send browsing history to the developer.',
    engineTitle: 'Browser engine limits',
    engineItems: [
      ['Active filter-list quotas:', 'Chrome and Firefox enforce system limits on total simultaneous declarativeNetRequest rules. If a browser skips an extra ruleset, the extension transparently shows a “partially enabled” status.'],
      ['Local home-network devices:', 'even at level 5 (Maximum), HTTPS upgrades skip localhost, 127.0.0.1 and private LAN addresses (routers and printers on 192.168.*, 10.*, .local).']
    ],
    nudge: {
      title: 'Install steps and permissions',
      text: 'Review the install steps and browser permissions.',
      actions: [
        ['install', 'Install guide', 'btn-primary'],
        ['privacy', 'Privacy Policy', 'btn-secondary']
      ]
    }
  },

  privacy: {
    eyebrow: 'Privacy & data',
    title: 'AntiRacketMantis Privacy Policy',
    lead: 'This policy explains how the website behaves, what the extension stores locally, why each browser permission is needed and when network requests can occur.',
    mascotAlt: 'Minty the mantis guarding data privacy with a shield',
    draftBadge: 'Pre-release draft · requires legal review',
    draftTitle: 'Pre-launch document status',
    draftText: `This text reflects the current website and version ${VERSION} extension codebase, but requires additional pre-release package audit and legal review before official store publication.`,
    s1Title: '1. Data on this website',
    s1Lead: `The website ${SITE} consists solely of static pages:`,
    s1Items: [
      'This website sets no cookies and uses no trackers.',
      'There are no analytics scripts, advertising pixels, third-party fonts or external scripts.',
      'There are no sign-up forms, comments or personal-data collection forms.',
      'The only preference stored by this site (“Pause animations”) lives in your browser’s localStorage under the key arm-motion-off and is never transmitted.'
    ],
    s2Title: '2. What the extension stores locally in your browser',
    s2Lead: 'The extension uses storage.local in your browser profile and temporary session memory in storage.session. Local storage does not rule out network requests from optional modules described below:',
    s2Items: [
      ['Protection preferences:', 'selected level (1-5), cookie-banner mode and interface theme.'],
      ['Site lists:', 'your excluded domains where protection is paused, plus canvas-masking sites (up to 100 entries per list).'],
      ['Diagnostic log:', 'local entries containing timestamps, domains, event types and errors (up to 200 entries, retained for 14 days). You can disable or clear it in settings.'],
      ['Additional modules:', 'their preferences, consent flags, access keys for chosen external services and usage counters are stored locally. While a module runs, session memory may temporarily hold the source tab URL and the image being processed.'],
      ['Settings export:', 'manual JSON export includes only preferences and site lists - diagnostic logs and access keys are excluded.']
    ],
    s3Title: '3. Browser permissions and why they are needed',
    s3Caption: 'Browser permissions requested by AntiRacketMantis',
    s3Headers: ['Permission', 'Purpose'],
    s3Rows: [
      ['storage', 'Saves your protection level, site exceptions, cookie-banner mode and diagnostic log locally.'],
      ['declarativeNetRequest', 'Lets the browser engine block ads, trackers, badware domains, beacons and URL tracking tags using bundled rules.'],
      ['scripting', 'Applies cosmetic ad hiding, pop-up protection, cookie-banner opt-out and fingerprint rules according to your chosen level.'],
      ['tabs & activeTab', 'Reads the active tab hostname so the popup can show protection status, toggle site exceptions and reload the tab.'],
      ['All websites (http://*/*, https://*/*)', 'Required to apply network and page rules across sites you visit, except domains you add to exceptions.']
    ],
    s3CalloutTitle: 'Technical capability vs. actual behavior:',
    s3CalloutText: 'the browser warning “Read and change all your data on all websites” reflects technical access needed to hide ad containers and interact with cookie dialogs. Core filtering does not read your passwords, private messages or form contents and does not send browsing history to the developer.',
    s4Title: '4. Network requests and external services',
    s4Paragraphs: [
      'Core protection - blocking ads, trackers, URL tags, unsolicited pop-ups and handling cookie banners - runs locally in your browser from bundled lists and does not send browsing history to the developer or third parties.',
      'The inspected codebase also includes additional network modules. In the audited build, some of their network settings are enabled by default, meaning an external request can happen without a separate opt-in step. Therefore the current build cannot be described as strictly offline in every mode.',
      'Such requests may send the image being processed, and when using a keyed service, an access key and task identifier. Any external service sees the connection IP address; a separate IP check runs only when triggered in settings. Cookies and the source page Referer are omitted in inspected requests. Network modules can be disabled in settings.',
      'The final list of network requests, defaults and disclosures requires an additional audit of the release package prior to public store launch.'
    ],
    s5ProTitle: '5. Planned PRO features',
    s5ProBadge: 'In development',
    s5ProText: 'AntiRacketMantis PRO features (including local neural networks, image analysis and browser automation) have not been released. Their data handling will be documented separately and audited before PRO launches.',
    s6Title: '6. Controlling and deleting your data',
    s6TextBefore: 'You can disable or clear the diagnostic log anytime in settings, remove domains from your lists, or erase all locally stored data completely by uninstalling the extension (',
    s6UninstallLinkText: 'uninstall guide',
    s6TextAfter: ').',
    nudge: {
      title: 'Related documents',
      text: 'Review the draft Terms of Use and our Known Protection Limits.',
      actions: [
        ['terms', 'Terms of Use', 'btn-primary'],
        ['limits', 'Known limits', 'btn-secondary']
      ]
    }
  },

  terms: {
    eyebrow: 'Legal information',
    title: 'Terms of Use (Draft)',
    lead: 'Draft terms for the AntiRacketMantis website and browser extension, before public release.',
    mascotAlt: 'Minty the mantis reviewing draft terms',
    draftBadge: 'Draft · requires legal review',
    draftTitle: 'Important notice',
    draftText: `This document is a pre-release draft prepared alongside version ${VERSION}. It requires legal review and intentionally avoids invented entity details. All pending items are listed under Open Questions below.`,
    sections: [
      {
        title: '1. License to use',
        paragraphs: [
          'The extension is provided for ordinary personal use in supported browsers (Google Chrome / Chromium and Mozilla Firefox) once officially published, and this website is provided for product documentation and information.',
          'Rights to the AntiRacketMantis name, mascot, website design and original materials belong to their rights holders within WillowinWorlds, while bundled third-party filter lists and open libraries remain subject to their respective open licenses.'
        ]
      },
      {
        title: '2. Acceptable use',
        items: [
          'You agree to use the extension lawfully and in compliance with applicable laws, website rules and third-party rights.',
          'You may not present modified or unofficial builds as official AntiRacketMantis releases or use website materials in a misleading way.'
        ]
      },
      {
        title: '3. No warranties (“as is”)',
        paragraphs: [
          'The extension and website are provided “as is” without express or implied warranties of error-free operation, uninterrupted availability or compatibility with every website.',
          'Filtering effectiveness for ads, trackers, cookie banners and pop-ups depends on third-party site changes, browser capabilities and your chosen protection level.'
        ]
      },
      {
        title: '4. Limitation of liability',
        paragraphs: [
          'To the maximum extent permitted by applicable law, the developer is not liable for indirect damages, lost profits, layout issues on third-party websites or interrupted logins/payments caused by strict filtering rules - a one-click per-site exception switch is built in for such cases.'
        ]
      },
      {
        title: '5. Updates and ending use',
        paragraphs: [
          'These terms will be finalized before public store launch and updated with dedicated subscription terms prior to any PRO release. You may stop using the product anytime by closing this website and uninstalling the extension.'
        ]
      },
      {
        title: '6. Contact',
        paragraphs: [
          `Official developer studio website: WillowinWorlds (${STUDIO}). A dedicated support and legal email address for AntiRacketMantis has not been finalized yet and is tracked under Open Questions.`
        ]
      }
    ],
    openTitle: 'Open questions (pending owner & legal confirmation)',
    openIntro: 'These fields are intentionally left open rather than invented before confirmation:',
    openItems: [
      ['Governing law & jurisdiction:', 'country or legal system governing the Terms of Use and Privacy Policy.'],
      ['Legal entity & details:', 'full legal name and address of the entity or individual operating under WillowinWorlds.'],
      ['Official contact email:', 'dedicated support, legal and security.txt email address.'],
      ['Effective date, license & PRO terms:', 'publication effective date, final distribution license and subscription terms before PRO launches.']
    ],
    nudge: {
      title: 'Privacy and support',
      text: 'Read our pre-release Privacy Policy or visit Support.',
      actions: [
        ['privacy', 'Privacy Policy', 'btn-primary'],
        ['support', 'Support', 'btn-secondary']
      ]
    }
  },

  faqPage: {
    eyebrow: 'Answers',
    title: 'Frequently Asked Questions',
    lead: 'Answers about installation, permissions, data handling, performance, browser support, planned PRO features and removal.',
    mascotAlt: 'Minty the mantis answering common questions',
    items: [
      {
        q: 'Can I install AntiRacketMantis from a browser store right now?',
        a: `Version ${VERSION} is preparing for its first public release in Chrome Web Store and Firefox Add-ons. Our Install page already walks through setup steps and browser permissions; direct store links will be added as soon as publication is live.`
      },
      {
        q: 'What features are included in the free version?',
        a: 'Core protection stays free: network and cosmetic ad blocking, tracker and badware filtering, URL tracking-tag cleanup, non-essential cookie-banner opt-out, pop-up protection, fingerprint controls, 5 protection levels and site exceptions.'
      },
      {
        q: 'How do I pause protection on a single website?',
        a: 'Open the AntiRacketMantis popup from your toolbar, switch off “Protection on this site” and click Reload. All other websites remain protected at your chosen level.'
      },
      {
        q: 'Why does the extension ask for access to all websites (http/https)?',
        a: 'Browsers require this technical permission so an extension can apply network and cosmetic filtering rules and handle cookie banners on pages you open. Core filtering does not read your passwords or private messages and does not send browsing history to the developer.'
      },
      {
        q: 'What data do this website and the extension use?',
        a: 'This static website uses no cookies, no analytics and no forms; only your animation toggle is stored in localStorage. Inside the extension, settings and exceptions stay local and core filtering uses bundled lists. Additional network modules in the audited build have defaults that can send requests; full details and audit status are disclosed in our Privacy Policy.'
      },
      {
        q: 'Does AntiRacketMantis slow down my browser?',
        a: 'Network filtering runs inside the browser’s native declarativeNetRequest engine with bundled lists - filter lists are not fetched in the background while browsing. Cosmetic scripts and pop-up control activate from level 3 (Balanced). We do not claim invented speed percentages because real impact depends on the page and level.'
      },
      {
        q: 'Why do some ads still appear on certain sites?',
        a: 'First, default level 2 (Light protection) keeps cosmetic hiding off for maximum compatibility - switch to level 3 (Balanced) for full ad blocking. Second, websites regularly change layouts and serve first-party ads from their own domain.'
      },
      {
        q: 'Does hiding a cookie banner mean all cookies were rejected?',
        a: 'Not always. AntiRacketMantis attempts to opt out of non-essential cookies where the consent dialog supports it. When a strict level simply blocks the banner script, the website can still set essential or security cookies.'
      },
      {
        q: 'Which browsers are supported?',
        a: 'Builds are being prepared for Google Chrome / Chromium (version 110+) and Mozilla Firefox (version 128+). Safari and mobile browsers are not tested or promised yet.'
      },
      {
        q: 'What is AntiRacketMantis PRO and when will it launch?',
        a: 'PRO is a planned optional subscription ($39/month planned price) inside the same extension, currently in development. It is planned to add local neural networks, AI-assisted CAPTCHA recognition and advanced browser automation. No launch date is set, no payment flow is open, and passing checks on third-party sites is never promised.'
      },
      {
        q: 'Does the extension make me anonymous online?',
        a: 'No. It reduces known trackers, cleans tracking parameters and adds fingerprint controls at level 5, but it does not hide your IP address or replace safe browsing habits.'
      },
      {
        q: 'Why use a tracker blocker if my browser has Incognito mode?',
        a: 'Incognito only avoids saving history and cookies locally after you close the window - it does not stop third-party trackers from loading during your session. AntiRacketMantis blocks known trackers as pages load, though neither Incognito nor the extension hides your IP address.'
      },
      {
        q: 'What should I do if a website breaks or blocks sign-in?',
        a: 'First switch off “Protection on this site” in the popup and reload the tab. If an issue happens only at levels 4-5 (such as third-party login or an HTTP-only site), try level 3 (Balanced) or add the domain to exceptions.'
      },
      {
        q: 'How do I uninstall the extension and what happens to my settings?',
        a: 'Open chrome://extensions in Chrome or about:addons in Firefox and click Remove. The browser automatically deletes the extension’s local storage, settings and diagnostic log.'
      }
    ],
    nudge: {
      title: 'Need more help',
      text: 'Visit Support for troubleshooting tips or review Known Limits.',
      actions: [
        ['support', 'Support', 'btn-primary'],
        ['limits', 'Known limits', 'btn-secondary']
      ]
    }
  },

  support: {
    eyebrow: 'Help & troubleshooting',
    title: 'AntiRacketMantis Support',
    lead: 'Quick checks you can try in two minutes when a page looks wrong, plus how to reach the developer studio.',
    mascotAlt: 'Minty the mantis helping troubleshoot a website issue',
    cards: [
      {
        icon: 'sliders',
        title: 'A website broke or won’t load',
        p1: 'Open the extension popup, toggle off “Protection on this site” and click Reload.',
        p2: 'If the issue only appears at level 4 or 5 (such as third-party login or an HTTP-only site), switch to level 3 (Balanced).'
      },
      {
        icon: 'popup',
        title: 'An unexpected pop-up appeared',
        p1: 'Check that level 3 (Balanced) or higher is selected - unsolicited pop-up protection activates from level 3.',
        p2: 'Also make sure the site domain is not listed under “Turn off protection for these sites”.'
      },
      {
        icon: 'ad',
        title: 'Some ads are still visible',
        p1: 'At default level 2 (Light protection), only light network filtering runs and cosmetic hiding is off. Switch to level 3 (Balanced).',
        p2Prefix: 'First-party ads served from the same domain may not match generic rules - see ',
        limitsLinkText: 'known limits',
        p2Suffix: '.'
      }
    ],
    devTitle: 'About the developer & contact',
    devP1Prefix: 'AntiRacketMantis is developed by ',
    devP1Link: 'WillowinWorlds',
    devP1Suffix: ', an independent game and app studio. While the first public store release is being prepared, the official studio website serves as our primary contact point.',
    devP2Prefix: 'A dedicated support email and public issue tracker will be published here before launch (tracked in ',
    openQuestionsLinkText: 'open questions',
    devP2Suffix: '). Security reports can be submitted via the studio contact listed in /.well-known/security.txt.',
    nudge: {
      title: 'Helpful guides',
      text: 'Check browser requirements, common questions or clean removal steps.',
      actions: [
        ['faq', 'FAQ', 'btn-primary'],
        ['compatibility', 'Compatibility', 'btn-secondary'],
        ['uninstall', 'Uninstall', 'btn-cream']
      ]
    }
  },

  changelog: {
    eyebrow: 'Updates & roadmap',
    title: 'Changelog & Roadmap',
    lead: 'Verified pre-release contents and development stages, without made-up release dates.',
    mascotAlt: 'Minty the mantis celebrating a new build milestone',
    versionBadge: `Version ${VERSION} · preparing for first public launch`,
    releaseTitle: 'Preparing the first public release',
    releaseItems: [
      ['Five protection levels:', 'from Compatibility (1) and default Light protection (2) to Balanced (3), Strict (4) and Maximum (5).'],
      ['Bundled Manifest V3 filter lists:', 'EasyPrivacy, EasyList, uBlock filters, RU AdList, RU AdList: Counters, AdGuard Turkish, Peter Lowe, uBO Badware and URL tracking-tag cleanup.'],
      ['Cookie banners and pop-ups:', 'independent non-essential cookie opt-out for supported banners and unsolicited pop-up control from level 3.'],
      ['User controls:', 'one-click per-site popup switch, up to 100 domain exceptions, JSON settings export/import and a local 14-day diagnostic log.'],
      ['Target browsers:', 'Chrome (110+) and Firefox (128+) builds with Russian and English extension interfaces.']
    ],
    roadmapTitle: 'Roadmap',
    roadmapIntro: 'What is built, in progress and planned, with no guessed dates:',
    roadmapStages: [
      {
        status: 'done',
        badge: 'Built in 0.11.0',
        title: 'Core protection (free version)',
        items: [
          '5 levels of ad and tracker filtering powered by bundled Manifest V3 rule lists',
          'Non-essential cookie-banner opt-out and level 3+ pop-up/pop-under protection',
          'Per-site exceptions, JSON transfer, light/dark themes and RU/EN extension UI'
        ]
      },
      {
        status: 'in-progress',
        badge: 'In progress',
        title: 'Public browser store launch preparation',
        items: [
          'Final audit of release-package network defaults and data disclosures',
          'Legal review of the Privacy Policy and Terms of Use',
          'Publication to Chrome Web Store and Firefox Add-ons with live store links'
        ]
      },
      {
        status: 'in-development',
        badge: 'In development · PRO plans',
        title: 'AntiRacketMantis PRO ($39/month planned price)',
        items: [
          'Optional PRO subscription inside the same extension (core protection remains free)',
          'Local neural networks, image analysis and AI-assisted CAPTCHA help (no passing promises)',
          'Advanced routine browser automation, extra controls and dedicated pre-launch data audit'
        ]
      }
    ],
    nudge: {
      title: 'More to read',
      text: 'Look at the features, the PRO plans or the install guide.',
      actions: [
        ['features', 'Features', 'btn-primary'],
        ['pro', 'PRO plans', 'btn-secondary'],
        ['install', 'Install guide', 'btn-cream']
      ]
    }
  },

  notFound: {
    metaTitle: '404 - AntiRacketMantis',
    metaDescription: 'Page not found. Return to the AntiRacketMantis home page, features, installation guide or frequently asked questions.',
    heading: 'AntiRacketMantis - 404',
    eyebrow: 'Error 404',
    title: 'Page not found',
    text: 'That page does not exist here. Try one of the links below.',
    mascotAlt: 'Minty the mantis holding a magnifying glass looking for a missing page',
    homeBtn: 'Go home (EN)',
    installBtn: 'Install',
    featuresBtn: 'Features',
    faqBtn: 'FAQ',
    supportBtn: 'Support'
  }
};
