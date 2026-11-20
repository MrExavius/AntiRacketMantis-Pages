import fs from 'node:fs';
import path from 'node:path';
import { checkDist } from './check.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DEST = path.join(ROOT, 'dist');
const SITE = (process.env.SITE_URL || 'https://antiracketmantis.willowinworlds.com').replace(/\/+$/, '');
const ALL_LANGS = ['ru', 'en', 'tr'];
const LANGS = (process.env.LANGS || 'ru').split(',').map(x => x.trim()).filter(x => ALL_LANGS.includes(x));
const VERSION = '0.11.0';
const STUDIO = 'https://willowinworlds.com/';

const i18n = {
  ru: {
    lang: 'Русский',
    nav: ['Возможности', 'Как работает', 'Приватность', 'Вопросы', 'Поддержка'],
    install: 'Установить',
    soon: 'Скоро в магазине',
    browserToast: 'Страница в магазине браузера появится после публикации расширения. Подробная инструкция доступна в разделе «Установка».',
    badge: 'Знакомьтесь, ваш цифровой защитник',
    heroA: 'Интернет без',
    heroB: 'лишнего шума.',
    heroText: 'AntiRacketMantis помогает убрать назойливую рекламу, трекеры, cookie-баннеры и лишние всплывающие окна. А вам остаётся самое интересное.',
    chrome: 'Для Chrome · скоро',
    firefox: 'Для Firefox · скоро',
    explore: 'Узнать больше',
    installGuideLink: 'Инструкция по установке',
    illustration: 'Иллюстративная демонстрация',
    adBlock: 'Реклама скрыта',
    trackers: 'Трекеры под контролем',
    online: 'Чище. Спокойнее. Удобнее.',
    small: 'Маленький защитник. Большая разница.',
    sectionTag: 'Почувствуйте разницу',
    compareTitle: 'Посмотрите, как меняется страница',
    compareText: 'Передвигайте ползунок, чтобы сравнить условную страницу с раздражителями и более спокойный вариант.',
    without: 'Без защиты',
    with: 'С защитой',
    sampleTitle: 'Ваш любимый журнал',
    sampleCopy: 'Статья, которую приятно читать, когда ничто не отвлекает.',
    ad: 'РЕКЛАМА',
    cookie: 'Принять все cookies?',
    popup: 'Подпишитесь прямо сейчас!',
    featureTag: 'Всё нужное — в одном месте',
    featureTitle: 'Шесть инструментов спокойного просмотра',
    featureIntro: 'Фильтры рекламы, защита от трекеров, cookie-баннеры, контроль всплывающих окон, настройки приватности и гибкие исключения.',
    levelsTag: 'Пять уровней защиты',
    levelsTitle: 'От мягкой фильтрации до строгого режима',
    levelsIntro: 'Вы сами выбираете баланс между тишиной на страницах и совместимостью с привычными сайтами. По умолчанию включён уровень 2.',
    stepsTag: 'Просто начать',
    stepsTitle: 'Три шага к спокойному интернету',
    steps: [
      ['Откройте раздел «Установка»', 'Подготовьтесь к публикации: изучите совместимость и список разрешений для Chrome или Firefox.'],
      ['Добавьте в браузер', 'После выхода в официальных магазинах подтвердите установку и проверьте настройки по умолчанию.'],
      ['Выберите свой ритм', 'Настройте уровень защиты от 1 до 5 и при необходимости добавьте нужные сайты в исключения.']
    ],
    trustTag: 'Приватность — это важно',
    trustTitle: 'Доверие начинается с ясности',
    trustText: 'Никаких туманных обещаний. Мы честно объясняем, что работает локально, какие разрешения запрашивает расширение и где проходят границы защиты.',
    trustBullets: [
      'Переключатель «Защита на этом сайте» — выключите, если сайт сломался или не пускает',
      'Пять уровней защиты: от «Совместимости» до «Максимума»',
      'Настройки, исключения и диагностический журнал хранятся локально в вашем браузере'
    ],
    permTag: 'Открыто о разрешениях',
    permTitle: 'Какие разрешения нужны — и зачем',
    permIntro: 'Браузер покажет эти разрешения при установке. Вот простыми словами, для чего используется каждое из них.',
    perms: [
      ['Читать и изменять данные на сайтах (http/https + scripting)', 'Чтобы скрывать рекламные блоки, закрывать cookie-баннеры, блокировать нежелательные всплывающие окна и применять правила защиты отпечатков.'],
      ['Блокировать и изменять сетевые запросы (declarativeNetRequest)', 'Сам движок браузера отсекает запросы к рекламе и трекерам по встроенным спискам правил и убирает лишние метки из ссылок.'],
      ['Видеть активную вкладку и вкладки (tabs, activeTab)', 'Чтобы показать статус защиты для текущего адреса и позволить выключить защиту для конкретного сайта в один клик.'],
      ['Хранить настройки локально (storage)', 'Чтобы помнить выбранный уровень защиты, режим cookie-баннеров, список сайтов-исключений и локальный журнал событий.']
    ],
    permNote: 'Точный перечень потоков данных и финальная политика конфиденциальности будут закреплены после завершения аудита публичной сборки.',
    devTitle: 'Кто делает',
    devText: 'AntiRacketMantis разрабатывает WillowinWorlds — независимая студия игр и приложений.',
    devLink: 'Сайт WillowinWorlds',
    helpTitle: 'Если что-то пошло не так',
    helpText: 'Сайт сломался? Выключите защиту для него переключателем в окне расширения и перезагрузите страницу. Подробнее — в разделах «Ограничения» и «Поддержка».',
    compat: 'Готовятся версии для Chrome (от 110) и Firefox (от 128). Другие браузеры не обещаются до отдельного тестирования.',
    versionLine: 'Версия',
    statusLine: 'готовится к публикации',
    madeFor: 'Сделано для спокойного интернета',
    motionOff: 'Отключить анимации',
    motionOn: 'Включить анимации',
    trustLink: 'Политика конфиденциальности',
    limitsLink: 'Известные ограничения',
    faqTag: 'Ответы без сложностей',
    faqTitle: 'Частые вопросы',
    faqAllLink: 'Все вопросы и ответы',
    lastTag: 'Готовы к спокойному интернету?',
    lastTitle: 'Пусть важное остаётся на виду.',
    lastText: 'AntiRacketMantis создаётся с заботой о людях, их внимании и прозрачности работы браузера.',
    company: 'Продукт студии',
    footerLine: 'Расширение для спокойного просмотра сайтов без навязчивой рекламы, трекеров и лишних окон.',
    allFeatures: 'Все возможности',
    more: 'Подробнее',
    back: 'На главную',
    notFoundTitle: 'Кажется, мы немного заблудились.',
    notFoundText: 'Такой страницы на сайте нет — даже у внимательного защитника иногда теряется вкладка.',
    errorBack: 'Вернуться на главную'
  },
  en: {
    lang: 'English',
    nav: ['Features', 'How it works', 'Privacy', 'FAQ', 'Support'],
    install: 'Get it',
    soon: 'Coming soon',
    browserToast: 'Store links will appear when the extension is published.',
    badge: 'Meet your little digital guardian',
    heroA: 'Less noise.',
    heroB: 'More internet.',
    heroText: 'AntiRacketMantis helps tame intrusive ads, trackers, and pop-ups, so you can enjoy what matters.',
    chrome: 'For Chrome · soon',
    firefox: 'For Firefox · soon',
    explore: 'Explore features',
    illustration: 'Illustrative demonstration',
    adBlock: 'Ad tucked away',
    trackers: 'Trackers under control',
    online: 'Cleaner. Calmer. Yours.',
    small: 'Little guardian. Big difference.',
    sectionTag: 'SEE THE DIFFERENCE',
    compareTitle: 'A calmer page is just a slide away',
    compareText: 'Drag the slider to compare an illustrative busy page with a more peaceful one.',
    without: 'Without protection',
    with: 'With protection',
    sampleTitle: 'Your favorite magazine',
    sampleCopy: 'A story worth reading without all the distractions.',
    ad: 'AD',
    cookie: 'Accept all cookies?',
    popup: 'Subscribe now!',
    featureTag: 'EVERYTHING IN ONE PLACE',
    featureTitle: 'Six little superpowers',
    featureIntro: 'Helpful tools working together to give your attention back.',
    stepsTag: 'GETTING STARTED',
    stepsTitle: 'Three steps to calmer browsing',
    steps: [
      ['Find the extension', 'When published, open AntiRacketMantis in your browser’s official store.'],
      ['Add it to your browser', 'Confirm installation and review the requested permissions.'],
      ['Make it yours', 'Choose the protection settings that feel right to you.']
    ],
    trustTag: 'PRIVACY MATTERS',
    trustTitle: 'Trust begins with clarity',
    trustText: 'No vague promises. Clear explanations of what works, what can vary, and what data needs review.',
    trustBullets: ['Understandable per-site controls', 'Pause protection when needed', 'Honest information about data'],
    trustLink: 'Read about privacy',
    pricingTag: 'CHOOSE YOUR WAY',
    pricingTitle: 'One guardian. Two levels of power.',
    pricingText: 'Core protection stays free. PRO is being prepared for people who want advanced automation.',
    free: 'Core protection',
    freeDesc: 'All the essentials for more comfortable browsing.',
    freePrice: 'Free',
    freeItems: ['Ad blocking', 'Tracker protection', 'Cookie-banner handling', 'Pop-up controls', 'Filter settings'],
    pro: 'AntiRacketMantis PRO',
    proDesc: 'Intelligent tools for more advanced workflows.',
    proPrice: '$39',
    month: '/ month',
    proPlan: 'Planned price',
    proItems: ['Everything in core protection', 'AI-assisted CAPTCHA recognition', 'Local AI image models', 'Advanced browser automation', 'Extra processing controls'],
    proNote: 'PRO is in development. Features, compatibility and pricing may change; CAPTCHA handling is not guaranteed on every site.',
    planButton: 'Explore the plan',
    faqTag: 'STRAIGHT ANSWERS',
    faqTitle: 'Good questions, clear answers',
    lastTag: 'READY FOR A CALMER INTERNET?',
    lastTitle: 'Keep the good stuff in view.',
    lastText: 'AntiRacketMantis is being built with care for people and their time.',
    company: 'A product by',
    footerLine: 'Made with care for your peace of mind online.',
    links: ['Features', 'Privacy', 'Support', 'FAQ', 'Changelog'],
    allFeatures: 'Explore features',
    more: 'How it works',
    back: 'Home',
    legalDraft: 'Privacy information',
    privacyTitle: 'Your trust deserves honest answers.',
    privacyLead: 'This page is not yet the final Privacy Policy. Before public launch, we will verify actual data flows and publish a precise document.',
    privacyCards: [
      ['What the extension does', 'AntiRacketMantis helps control unwanted content and browsing protections.'],
      ['Why permissions matter', 'Filtering certain requests and page elements may require browser permissions. The exact list depends on the final release.'],
      ['What is still being checked', 'Local storage, network requests, and retention details need an application audit before publication.']
    ],
    supportTitle: 'Here when something goes wrong.',
    supportLead: 'While the first release is being prepared, find answers here and contact us via the official WillowinWorlds website.',
    supportCards: [
      ['A website is broken', 'Pause protection for the affected site and refresh. Report the issue if it persists.'],
      ['An unexpected window appeared', 'Review popup settings and exceptions. Some windows are necessary for login or payment.'],
      ['Some ads remain', 'Not all ad formats can be filtered in every browser. Results vary with the site and filter lists.']
    ],
    studio: 'Contact the studio',
    changelogTitle: 'Update history',
    changelogText: 'Verified versions and release notes will appear here after the first public launch.',
    notFoundTitle: 'Looks like we wandered off.',
    notFoundText: 'Even the most attentive guardian can lose a tab.',
    errorBack: 'Go home'
  },
  tr: {
    lang: 'Türkçe',
    nav: ['Özellikler', 'Nasıl çalışır', 'Gizlilik', 'Sorular', 'Destek'],
    install: 'Yükle',
    soon: 'Yakında',
    browserToast: 'Mağaza bağlantıları uzantı yayınlanınca eklenecek.',
    badge: 'Küçük dijital koruyucunuzla tanışın',
    heroA: 'Daha az gürültü.',
    heroB: 'Daha iyi internet.',
    heroText: 'AntiRacketMantis rahatsız edici reklamları, izleyicileri ve açılır pencereleri azaltmaya yardımcı olur. Size önemli olanlar kalır.',
    chrome: 'Chrome için · yakında',
    firefox: 'Firefox için · yakında',
    explore: 'Özellikleri keşfet',
    illustration: 'Temsili gösterim',
    adBlock: 'Reklam gizlendi',
    trackers: 'İzleyiciler kontrol altında',
    online: 'Daha temiz. Daha sakin.',
    small: 'Küçük koruyucu. Büyük fark.',
    sectionTag: 'FARKI GÖRÜN',
    compareTitle: 'Daha sakin bir sayfa',
    compareText: 'Örnek kalabalık bir sayfayla daha sade hâlini karşılaştırmak için kaydırın.',
    without: 'Korumasız',
    with: 'Korumalı',
    sampleTitle: 'Sevdiğiniz dergi',
    sampleCopy: 'Dikkat dağıtmadan okunabilen güzel bir yazı.',
    ad: 'REKLAM',
    cookie: 'Tüm çerezleri kabul et?',
    popup: 'Hemen abone olun!',
    featureTag: 'HER ŞEY BİR ARADA',
    featureTitle: 'Altı küçük süper güç',
    featureIntro: 'Dikkatinizi geri kazandırmak için birlikte çalışan araçlar.',
    stepsTag: 'BAŞLAMAK KOLAY',
    stepsTitle: 'Daha sakin internet için üç adım',
    steps: [
      ['Uzantıyı bulun', 'Yayınlandıktan sonra AntiRacketMantis sayfasını resmi tarayıcı mağazasında açın.'],
      ['Tarayıcınıza ekleyin', 'Kurulumu onaylayın ve izinleri inceleyin.'],
      ['Kendinize göre ayarlayın', 'Sizin için uygun koruma ayarlarını seçin.']
    ],
    trustTag: 'GİZLİLİK ÖNEMLİ',
    trustTitle: 'Güven açıklıkla başlar',
    trustText: 'Belirsiz vaatler yok. Nelerin çalıştığını, sınırlamaları ve veri incelemelerini açıkça anlatıyoruz.',
    trustBullets: ['Site bazında anlaşılır kontroller', 'Gerektiğinde korumayı duraklatın', 'Veriler hakkında dürüst bilgi'],
    trustLink: 'Gizliliği incele',
    pricingTag: 'YOLUNUZU SEÇİN',
    pricingTitle: 'Tek koruyucu. İki güç seviyesi.',
    pricingText: 'Temel koruma ücretsizdir. Gelişmiş otomasyon isteyenler için PRO hazırlanıyor.',
    free: 'Temel koruma',
    freeDesc: 'Daha rahat gezinmek için gerekli temel araçlar.',
    freePrice: 'Ücretsiz',
    freeItems: ['Reklam engelleme', 'İzleyici koruması', 'Çerez bildirimi yönetimi', 'Açılır pencere kontrolü', 'Filtre ayarları'],
    pro: 'AntiRacketMantis PRO',
    proDesc: 'Gelişmiş işlemler için akıllı araçlar.',
    proPrice: '$39',
    month: '/ ay',
    proPlan: 'Planlanan fiyat',
    proItems: ['Tüm temel özellikler', 'Yapay zekâ ile CAPTCHA tanıma', 'Yerel görüntü AI modelleri', 'Gelişmiş tarayıcı otomasyonu', 'Ek işlem ayarları'],
    proNote: 'PRO geliştirme aşamasındadır. Özellikler, uyumluluk ve fiyat değişebilir; CAPTCHA işlemleri her sitede garanti edilmez.',
    planButton: 'Planı keşfet',
    faqTag: 'NET YANITLAR',
    faqTitle: 'Merak edilenler',
    lastTag: 'DAHA SAKİN İNTERNETE HAZIR MISINIZ?',
    lastTitle: 'Önemli olan göz önünde kalsın.',
    lastText: 'AntiRacketMantis insanlara ve zamanlarına özen gösterilerek geliştiriliyor.',
    company: 'Geliştirici:',
    footerLine: 'İnternette daha huzurlu olmanız için özenle yapıldı.',
    links: ['Özellikler', 'Gizlilik', 'Destek', 'SSS', 'Sürüm notları'],
    allFeatures: 'Özellikleri incele',
    more: 'Nasıl çalışır',
    back: 'Ana sayfa',
    legalDraft: 'Gizlilik bilgisi',
    privacyTitle: 'Güveniniz açıklığı hak eder.',
    privacyLead: 'Bu sayfa henüz son Gizlilik Politikası değildir. Herkese açık lansmandan önce gerçek veri akışlarını doğrulayıp kesin metni yayınlayacağız.',
    privacyCards: [
      ['Uzantı ne yapar', 'AntiRacketMantis istenmeyen içerikleri ve gezinme korumalarını yönetmeye yardımcı olur.'],
      ['İzinler neden gerekir', 'Bazı istekleri ve sayfa öğelerini filtrelemek için tarayıcı izinleri gerekebilir. Son liste sürüme göre belirlenecek.'],
      ['Neler inceleniyor', 'Yerel veriler, ağ istekleri ve saklama süreleri yayın öncesi incelenecektir.']
    ],
    supportTitle: 'Bir şey ters giderse yanınızdayız.',
    supportLead: 'İlk sürüm hazırlanırken burada yanıtları bulabilir ve resmi WillowinWorlds sitesi üzerinden ulaşabilirsiniz.',
    supportCards: [
      ['Bir site bozulduysa', 'İlgili site için korumayı duraklatın ve yenileyin. Sorun sürerse bildirin.'],
      ['Beklenmedik pencere açıldıysa', 'Açılır pencere ayarlarını ve istisnaları kontrol edin. Bazı pencereler giriş veya ödeme için gereklidir.'],
      ['Bazı reklamlar kaldıysa', 'Her reklam türü her tarayıcıda filtrelenemez. Sonuçlar siteye ve listelere bağlıdır.']
    ],
    studio: 'Stüdyoya ulaş',
    changelogTitle: 'Sürüm geçmişi',
    changelogText: 'Doğrulanmış sürümler ve notlar ilk resmi yayından sonra burada görünecek.',
    notFoundTitle: 'Sanırım yolumuzu kaybettik.',
    notFoundText: 'En dikkatli koruyucular bile bazen sekmesini kaybeder.',
    errorBack: 'Ana sayfaya dön'
  }
};

const featureData = [
  {
    id: 'ads',
    tone: 'lime',
    icon: 'ad',
    ruDetail: {
      title: 'Блокировка рекламы на уровне сети и страницы',
      summary: 'Убирает рекламные баннеры, скрипты и пустые места под объявления, чтобы страницы читались спокойнее.',
      details: 'Сетевые правила (на базе встроенных списков uBlock filters, EasyList, RU AdList, Peter Lowe и AdGuard Turkish) отсекают обращения к рекламным доменам ещё до загрузки. Начиная с уровня 3 («Баланс») включаются и косметические фильтры, которые скрывают оставшиеся рекламные блоки прямо в разметке страницы.',
      limit: 'Ограничение: реклама, встроенная самим сайтом без сторонних доменов (first-party), или новые форматы разметки могут оставаться до обновления списков.',
      tags: ['Сетевые правила', 'Косметические фильтры', 'С уровня 2–3']
    },
    text: {
      ru: ['Меньше назойливой рекламы', 'Сосредоточьтесь на содержимом, а не на баннерах и отвлекающих блоках.', ''],
      en: ['Fewer intrusive ads', 'Focus on the content, not the banners and distractions.', 'Filtering lists help reduce unwanted advertising elements. Results depend on the site and browser capabilities.'],
      tr: ['Daha az rahatsız edici reklam', 'Bannerlara değil, içeriğe odaklanın.', 'Filtre listeleri istenmeyen reklam öğelerini azaltmaya yardımcı olur. Sonuçlar siteye ve tarayıcıya bağlıdır.']
    }
  },
  {
    id: 'tracking',
    tone: 'sky',
    icon: 'eye',
    ruDetail: {
      title: 'Защита от трекеров и меток отслеживания',
      summary: 'Ограничивает известные счётчики, рекламные пиксели и параметры слежки в адресах ссылок.',
      details: 'С уровня 2 работают списки EasyPrivacy, RU AdList: Counters и uBO Badware (предупреждения о мошеннических и вредоносных доменах). С уровня 3 добавляется очистка ссылок от меток вроде utm_* и fbclid, а также отправка сигналов Sec-GPC и DNT.',
      limit: 'Ограничение: ни одно браузерное расширение не даёт полной анонимности — провайдер связи и сам открытый сайт всё равно видят факт вашего визита.',
      tags: ['EasyPrivacy', 'Очистка ссылок', 'Sec-GPC и DNT']
    },
    text: {
      ru: ['Меньше слежки в сети', 'Помогает ограничивать известные трекеры, счётчики и метки в ссылках.', ''],
      en: ['Less tracking', 'Helps limit known forms of cross-site tracking.', 'Rules can block some known third-party trackers. No extension provides complete anonymity.'],
      tr: ['Daha az izlenme', 'Bilinen siteler arası izleme yöntemlerini sınırlandırmaya yardımcı olur.', 'Kurallar bazı üçüncü taraf izleyicileri engelleyebilir. Hiçbir uzantı tam anonimlik sağlamaz.']
    }
  },
  {
    id: 'cookies',
    tone: 'peach',
    icon: 'cookie',
    ruDetail: {
      title: 'Спокойная работа с cookie-баннерами',
      summary: 'Пытается автоматически отклонять необязательные cookies на поддерживаемых окнах согласия.',
      details: 'Настройка «Cookie-баннеры» работает отдельно от уровней фильтрации: по умолчанию выбран режим отклонения необязательных cookies через встроенный набор правил совместимых диалогов согласия. На уровне 4 и выше дополнительно блокируются сетевые запросы к скриптам cookie-уведомлений и сторонние cookies.',
      limit: 'Ограничение: если конкретный сайт не поддерживает быстрый отказ или не распознан правилами, простое скрытие уведомления не равно техническому отказу от cookies; защитные cookies сайта могут сохраняться.',
      tags: ['Отдельная настройка', 'Отказ от необязательных', 'Честные границы']
    },
    text: {
      ru: ['Cookie-баннеры под контролем', 'Меньше повторяющихся запросов согласия без лишних кликов.', ''],
      en: ['Calmer cookie dialogs', 'Spend less time on repetitive consent requests.', 'Assistance with known consent dialogs. Hiding a banner does not necessarily reject cookies.'],
      tr: ['Çerez pencereleri kontrol altında', 'Tekrarlanan izin talepleriyle daha az zaman kaybedin.', 'Bilinen izin pencerelerinde yardımcı olur. Bildirimi gizlemek çerezleri reddetmek anlamına gelmeyebilir.']
    }
  },
  {
    id: 'popups',
    tone: 'lilac',
    icon: 'popup',
    ruDetail: {
      title: 'Контроль всплывающих окон и новых вкладок',
      summary: 'Сдерживает неожиданные pop-up и фоновые окна (pop-under), открывающиеся без вашего клика.',
      details: 'С уровня 3 включается защита от всплывающих окон, которые скрипты страницы пытаются открыть самопроизвольно, без явного действия пользователя.',
      limit: 'Ограничение: окна, нужные для авторизации (OAuth), оплаты заказов и подтверждения действий, должны открываться нормально — при сбое достаточно отключить защиту для сайта.',
      tags: ['Анти-pop-up', 'Анти-pop-under', 'Сохраняет оплату и вход']
    },
    text: {
      ru: ['Без лишних окон', 'Сокращает число неожиданных всплывающих окон и вкладок без клика.', ''],
      en: ['Fewer unwanted windows', 'Reduce unexpected pop-ups and new tabs.', 'Control unwanted windows while preserving needed login, payment and user-triggered flows.'],
      tr: ['Daha az istenmeyen pencere', 'Beklenmedik açılır pencereleri ve sekmeleri azaltın.', 'Giriş, ödeme ve kullanıcı işlemleri için gereken pencereleri korumaya odaklanır.']
    }
  },
  {
    id: 'privacy',
    tone: 'mint',
    icon: 'lock',
    ruDetail: {
      title: 'Дополнительные инструменты приватности',
      summary: 'Маскировка отпечатков браузера, блокировка сторонних маячков и переход на HTTPS на строгих уровнях.',
      details: 'В окне расширения есть отдельный переключатель маскировки canvas (экспериментальный), а на уровне 5 («Максимум») включается комплексная защита отпечатков (canvas, WebGL, аудио, обобщённое число ядер), блокировка сторонних ping и отчётов CSP, а также перевод переходов на HTTPS с исключением для частных адресов домашней сети.',
      limit: 'Ограничение: защита отпечатков меняет читаемые параметры между загрузками страниц, поэтому отдельные сайты могут чаще просить дополнительную проверку или работать строже.',
      tags: ['Canvas / WebGL', 'Блок маячков', 'HTTPS на уровне 5']
    },
    text: {
      ru: ['Приватность без магии', 'Прозрачные инструменты: заголовки приватности, защита отпечатков и HTTPS.', ''],
      en: ['Privacy without mystery', 'Understandable protections and honest explanations.', 'Privacy tools do not replace online caution. We describe both capabilities and limits.'],
      tr: ['Gizem olmadan gizlilik', 'Anlaşılır koruma ve dürüst açıklamalar.', 'Gizlilik araçları internette dikkatli olmanın yerini tutmaz. Özellikleri ve sınırları anlatıyoruz.']
    }
  },
  {
    id: 'filters',
    tone: 'butter',
    icon: 'sliders',
    ruDetail: {
      title: 'Уровни защиты и исключения для сайтов',
      summary: 'Пять готовых режимов и быстрый выключатель для любого сайта прямо в окне расширения.',
      details: 'Вы можете в любой момент переключиться между пятью уровнями (от «Совместимости» до «Максимума»), настроить список сайтов-исключений (по домену, включая поддомены) и экспортировать или импортировать файл настроек в формате JSON.',
      limit: 'Ограничение: изменение уровня или исключения для сетевых правил и страничных скриптов вступает в силу после перезагрузки вкладки — расширение само напомнит об этом кнопкой.',
      tags: ['5 уровней', 'Исключения по домену', 'Экспорт JSON']
    },
    text: {
      ru: ['Ваши правила и исключения', 'Пять уровней защиты и кнопка паузы для любого сайта в один клик.', ''],
      en: ['Your rules', 'Tune filters and exceptions to suit your browsing.', 'Settings help adapt protections to your favorite sites and pause troublesome rules.'],
      tr: ['Sizin kurallarınız', 'Filtreleri ve istisnaları kendinize göre ayarlayın.', 'Ayarlar korumayı sevdiğiniz sitelere uyarlamanıza ve sorunlu kuralları duraklatmanıza yardımcı olur.']
    }
  }
];

const levelsData = [
  {
    n: 1,
    name: 'Совместимость',
    summary: 'Сетевые и косметические фильтры выключены. Настройка cookie-баннеров действует отдельно.',
    badge: 'Минимум правок'
  },
  {
    n: 2,
    name: 'Мягкая защита',
    summary: 'Блокировка трекеров (EasyPrivacy, RU AdList Counters), мошеннических адресов и части рекламных серверов.',
    badge: 'По умолчанию',
    isDefault: true
  },
  {
    n: 3,
    name: 'Баланс',
    summary: 'Полные списки рекламы (uBlock filters, EasyList, RU AdList), очистка ссылок от меток, Sec-GPC/DNT, косметическое скрытие и анти-pop-up.',
    badge: 'Для тишины'
  },
  {
    n: 4,
    name: 'Строго',
    summary: 'Дополнительно удаляет сторонние cookies из запросов и блокирует сетевые скрипты cookie-уведомлений и виджетов соцсетей.',
    badge: 'Без лишних связей'
  },
  {
    n: 5,
    name: 'Максимум',
    summary: 'Дополнительно включает защиту отпечатков (canvas, WebGL, аудио), блокирует маячки (ping, CSP) и требует HTTPS.',
    badge: 'Максимум'
  }
];

const faqData = [
  {
    q: { ru: 'Расширение уже можно установить из магазина?', en: 'Can I install it now?', tr: 'Uzantı şu anda yüklenebilir mi?' },
    a: {
      ru: 'Сейчас версия 0.11.0 готовится к первой публичной публикации в Chrome Web Store и Firefox Add-ons. На странице «Установка» уже описан пошаговый порядок действий и то, какие разрешения покажет браузер; прямые ссылки появятся после публикации без заглушек.',
      en: 'The first public release is being prepared. Official store links will be added here when available.',
      tr: 'İlk herkese açık sürüm hazırlanıyor. Resmi mağaza bağlantıları hazır olduğunda eklenecek.'
    }
  },
  {
    q: { ru: 'Какие основные функции входят в расширение?', en: 'Will there be a free version?', tr: 'Ücretsiz sürüm olacak mı?' },
    a: {
      ru: 'AntiRacketMantis объединяет сетевую и косметическую блокировку рекламы, защиту от трекеров и вредоносных доменов, удаление меток слежки из ссылок, работу с cookie-баннерами, защиту от всплывающих окон, маскировку отпечатков и гибкие исключения для сайтов.',
      en: 'Yes. Core ad, tracker, cookie-banner and pop-up protections are planned to remain free.',
      tr: 'Evet. Temel reklam, izleyici, çerez ve açılır pencere korumalarının ücretsiz olması planlanıyor.'
    }
  },
  {
    q: { ru: 'Как быстро выключить защиту на одном сайте?', en: 'How do I turn protection off for one site?', tr: 'Tek bir sitede korumayı nasıl kapatırım?' },
    a: {
      ru: 'Откройте окно расширения на панели браузера, выключите переключатель «Защита на этом сайте» и нажмите кнопку перезагрузки вкладки. Остальные сайты продолжат работать под выбранным уровнем защиты.',
      en: 'Open the extension popup, switch off “Protection on this site” and reload the page. Other sites stay protected.',
      tr: 'Uzantı penceresini açın, “Bu sitede koruma” anahtarını kapatın ve sayfayı yenileyin. Diğer siteler korunmaya devam eder.'
    }
  },
  {
    q: { ru: 'Почему часть рекламы иногда остаётся на странице?', en: 'Why do some ads still show?', tr: 'Neden bazı reklamlar hâlâ görünüyor?' },
    a: {
      ru: 'Во-первых, по умолчанию стоит уровень 2 («Мягкая защита»), где косметическое скрытие ещё выключено — для полной блокировки рекламы переключитесь на уровень 3 («Баланс»). Во-вторых, сайты постоянно меняют разметку, а встроенная реклама с того же домена не всегда отличима от обычного контента.',
      en: 'Sites change, and some ads are part of the page itself. The extension works from rule lists that cannot follow every site instantly.',
      tr: 'Siteler değişir ve bazı reklamlar sayfanın bir parçasıdır. Uzantı kural listeleriyle çalışır ve her siteyi anında takip edemez.'
    }
  },
  {
    q: { ru: 'Означает ли скрытие cookie-баннера полный отказ от cookies?', en: 'Does hiding cookie banners reject all cookies?', tr: 'Çerez bildirimi gizlemek tüm çerezleri reddeder mi?' },
    a: {
      ru: 'Не всегда. Расширение пытается отправить отказ от необязательных cookies там, где баннер поддерживает такой сценарий. Если же на строгом уровне баннер просто не загрузился, сайт всё равно может устанавливать технические или защитные cookies.',
      en: 'Not always. Hiding a notice is not the same as rejecting cookies when a dialog does not support opt-out.',
      tr: 'Her zaman değil. Bildirimi gizlemek, çerezleri teknik olarak reddetmekle aynı şey değildir.'
    }
  },
  {
    q: { ru: 'Какие данные собирает сайт и само расширение?', en: 'What data does the extension use?', tr: 'Uzantı hangi verileri kullanır?' },
    a: {
      ru: 'На этом статическом сайте нет cookies, аналитики и форм ввода; настройка анимаций хранится в localStorage браузера. В расширении настройки и исключения хранятся локально, а базовая фильтрация работает по встроенным спискам без отправки истории посещений. Дополнительные сетевые модули могут передавать обрабатываемые данные внешним сервисам; некоторые сетевые настройки в текущей сборке включены по умолчанию. Подробности и предварительный статус аудита описаны в политике конфиденциальности.',
      en: 'The exact disclosure will follow a review of the release build. We do not want to make unverified data claims.',
      tr: 'Kesin açıklama son sürüm incelendikten sonra yayınlanacak. Doğrulanmamış veri iddialarında bulunmak istemiyoruz.'
    }
  },
  {
    q: { ru: 'Какие браузеры поддерживаются?', en: 'Does it work in Chrome and Firefox?', tr: 'Chrome ve Firefox’ta çalışır mı?' },
    a: {
      ru: 'Расширение готовится для Google Chrome / Chromium (версия от 110) и Mozilla Firefox (версия от 128). Другие браузеры (включая мобильные версии и Safari) пока не тестировались и не обещаются до проверки.',
      en: 'Chrome and Firefox builds are being prepared. Other browsers will only be listed after testing.',
      tr: 'Chrome ve Firefox sürümleri hazırlanıyor. Diğer tarayıcılar ancak test edildikten sonra eklenecek.'
    }
  },
  {
    q: { ru: 'Гарантирует ли расширение полную анонимность?', en: 'Does the extension make me anonymous?', tr: 'Uzantı tam anonimlik sağlar mı?' },
    a: {
      ru: 'Нет. AntiRacketMantis помогает уменьшить слежку, резать известные трекеры и усложнить сбор отпечатков на уровне 5, но не скрывает ваш IP-адрес и не заменяет аккуратное поведение в сети.',
      en: 'No. It can reduce some kinds of tracking but does not replace safe online habits or other protections.',
      tr: 'Hayır. Bazı takip türlerini azaltabilir ancak güvenli internet alışkanlıklarının yerini almaz.'
    }
  },
  {
    q: { ru: 'Что делать, если сайт перестал пускать или сломалась вёрстка?', en: 'What if a site stops working?', tr: 'Bir site çalışmayı durdurursa ne yapmalıyım?' },
    a: {
      ru: 'Сначала отключите защиту для этого сайта в окне расширения и перезагрузите вкладку. Если проблема проявляется только на уровнях 4–5 (например, не работает вход через сторонний аккаунт или HTTP-страница), попробуйте уровень 3 («Баланс») или добавьте домен в исключения.',
      en: 'Try pausing protection on the affected site and refreshing. If the problem persists, report it.',
      tr: 'İlgili sitede korumayı geçici durdurup sayfayı yenileyin. Sorun sürerse bildirin.'
    }
  },
  {
    q: { ru: 'Как удалить расширение и что станет с моими настройками?', en: 'How do I uninstall the extension?', tr: 'Uzantıyı nasıl kaldırırım?' },
    a: {
      ru: 'В Chrome откройте chrome://extensions, в Firefox — about:addons и нажмите «Удалить». Подробная инструкция есть на странице «Как удалить». После удаления браузер стирает локальное хранилище расширения вместе с настройками и журналом.',
      en: 'Remove it from your browser’s extensions page; the browser deletes local extension storage.',
      tr: 'Tarayıcının eklentiler sayfasından kaldırabilirsiniz; yerel veriler de silinir.'
    }
  },
  {
    q: { ru: 'Зачем расширение, если в браузере уже есть режим Инкогнито?', en: 'Why use an extension if I have Incognito mode?', tr: 'Gizli mod varken neden uzantıya ihtiyacım var?' },
    a: {
      ru: 'Режим Инкогнито (приватное окно) лишь не сохраняет историю посещений и cookies на вашем устройстве после закрытия окна, но не мешает рекламным сетям и счётчикам отслеживать вас во время самой сессии. AntiRacketMantis блокирует известные трекеры и счётчики при загрузке страниц — при этом ни Инкогнито, ни расширение не скрывают ваш IP-адрес.',
      en: 'Incognito only avoids saving local history after closing the window; it does not block third-party trackers while browsing.',
      tr: 'Gizli mod yalnızca yerel geçmişi kaydetmez; gezinirken izleyicileri engellemez.'
    }
  }
];

function url(lang, route = '') {
  const prefix = lang === 'ru' ? '' : `/${lang}`;
  return `${prefix}/${route}`.replace(/\/+/g, '/');
}

function escapeAttr(text) {
  return String(text).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
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

function header(lang, page) {
  const t = i18n[lang];
  const motionLabel = lang === 'ru' ? 'Отключить анимации' : lang === 'tr' ? 'Animasyonları durdur' : 'Pause animations';
  const navItems = [
    { href: url(lang, 'features/'), label: t.nav[0], active: page === 'features' },
    { href: url(lang, 'how-it-works/'), label: t.nav[1], active: page === 'how-it-works' },
    { href: url(lang, 'privacy/'), label: t.nav[2], active: page === 'privacy' },
    { href: url(lang, 'faq/'), label: t.nav[3], active: page === 'faq' },
    { href: url(lang, 'support/'), label: t.nav[4], active: page === 'support' }
  ];
  return `<a class="skip-link" href="#main">${lang === 'ru' ? 'К содержимому' : lang === 'tr' ? 'İçeriğe geç' : 'Skip to content'}</a>
<header class="site-header" id="site-header">
  <div class="nav-shell">
    <a class="brand" href="${url(lang)}" aria-label="AntiRacketMantis — на главную">
      <img src="/assets/mark.svg" alt="" aria-hidden="true" width="42" height="42">
      <span>AntiRacket<span class="brand-mantis">Mantis</span></span>
    </a>
    <nav class="main-nav" id="main-nav" aria-label="${lang === 'ru' ? 'Основное меню' : 'Main navigation'}">
      ${navItems.map(item => `<a href="${item.href}"${item.active ? ' aria-current="page"' : ''}>${item.label}</a>`).join('')}
    </nav>
    <div class="nav-actions">
      <button class="motion-toggle" type="button" data-motion-toggle data-motion-label="${motionLabel}" aria-label="${motionLabel}" aria-pressed="false" title="${motionLabel}">
        <svg class="motion-icon" viewBox="0 0 24 24" aria-hidden="true">
          <g class="mi-pause"><rect x="6.5" y="5" width="3.6" height="14" rx="1.6"/><rect x="13.9" y="5" width="3.6" height="14" rx="1.6"/></g>
          <path class="mi-play" d="M8 5.6v12.8a1 1 0 0 0 1.5.86l10.2-6.4a1 1 0 0 0 0-1.72L9.5 4.74A1 1 0 0 0 8 5.6z"/>
        </svg>
      </button>
      ${LANGS.length > 1 ? `<label class="lang-select-wrap"><span class="sr-only">Language</span><select class="lang-select" data-language data-page="${page}" aria-label="Language">${LANGS.map(l => `<option value="${l}" ${lang === l ? 'selected' : ''}>${l.toUpperCase()}</option>`).join('')}</select></label>` : ''}
      <a class="nav-cta" href="${url(lang, 'install/')}"${page === 'install' ? ' aria-current="page"' : ''}>${t.install}</a>
      <button class="menu-toggle" type="button" aria-label="Открыть меню" aria-expanded="false" aria-controls="main-nav"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>`;
}

function footer(lang) {
  const t = i18n[lang];
  const productLinks = [
    ['features/', 'Возможности'],
    ['how-it-works/', 'Как это работает'],
    ['install/', 'Установка'],
    ['uninstall/', 'Как удалить'],
    ['compatibility/', 'Совместимость'],
    ['limits/', 'Известные ограничения']
  ];
  const trustLinks = [
    ['privacy/', 'Политика конфиденциальности'],
    ['terms/', 'Пользовательское соглашение'],
    ['faq/', 'Частые вопросы'],
    ['support/', 'Поддержка'],
    ['changelog/', 'История обновлений']
  ];
  return `<footer class="footer">
  <div class="container footer-top">
    <div class="footer-brand-col">
      <a class="brand" href="${url(lang)}" aria-label="AntiRacketMantis — на главную">
        <img src="/assets/mark.svg" alt="" aria-hidden="true" width="43" height="43">
        <span>AntiRacket<span class="brand-mantis">Mantis</span></span>
      </a>
      <p>${t.footerLine}</p>
      <p class="footer-studio">${t.company} <a href="${STUDIO}" rel="noopener">WillowinWorlds</a> · ${t.versionLine} ${VERSION}, ${t.statusLine}</p>
    </div>
    <nav aria-label="О расширении">
      <span class="footer-nav-heading">О расширении</span>
      <div class="footer-nav-list">
        ${productLinks.map(([route, label]) => `<a href="${url(lang, route)}">${label}</a>`).join('')}
      </div>
    </nav>
    <nav aria-label="Доверие и помощь">
      <span class="footer-nav-heading">Документы и помощь</span>
      <div class="footer-nav-list">
        ${trustLinks.map(([route, label]) => `<a href="${url(lang, route)}">${label}</a>`).join('')}
      </div>
    </nav>
  </div>
  <div class="container footer-bottom">
    <span>© ${new Date().getUTCFullYear()} AntiRacketMantis · WillowinWorlds</span>
    <span>${t.madeFor || 'Сделано для спокойного интернета'} ✦</span>
  </div>
</footer>`;
}

function breadcrumbs(lang, title) {
  return `<nav class="breadcrumbs container" aria-label="Хлебные крошки">
  <ol>
    <li><a href="${url(lang)}">Главная</a></li>
    <li aria-current="page">${title}</li>
  </ol>
</nav>`;
}

function installButtons(lang) {
  const t = i18n[lang];
  return `<div class="store-actions">
    <button type="button" class="btn btn-primary store-btn" data-store="chrome"><span class="chrome-icon" aria-hidden="true"></span>${t.chrome}</button>
    <button type="button" class="btn btn-secondary store-btn" data-store="firefox"><span class="firefox-icon" aria-hidden="true">◉</span>${t.firefox}</button>
  </div>`;
}

function featuresGrid(lang) {
  const t = i18n[lang];
  return `<div class="features-grid">
  ${featureData.map((f, i) => {
    const a = f.text[lang];
    return `<a class="feature-card tone-${f.tone} feature-${f.id} reveal" href="${url(lang, 'features/')}#${f.id}">
      <span class="feature-icon">${icon(f.icon)}</span>
      <span class="feature-ornament" aria-hidden="true">${['✦', '✧', '✿', '✳', '✦', '✳'][i]}</span>
      <strong>${a[0]}</strong>
      <p>${a[1]}</p>
      <span class="feature-more">${t.more}<span aria-hidden="true"> →</span></span>
    </a>`;
  }).join('')}
</div>`;
}

const screenshotsData = {
  popupShield: {
    base: 'popup-shield',
    width: 728,
    height: 750,
    alt: 'Окно расширения AntiRacketMantis, вкладка «Защита» на тестовой странице example.org: статус «Защита включена», переключатель для сайта, счётчик активных списков 4, ползунок уровня 2 из 5 («Мягкая защита») и переключатель маскировки canvas',
    title: 'Вкладка «Защита» в окне расширения',
    desc: 'Главный экран показывает статус защиты на открытом сайте, число активных списков и даёт в один клик выключить фильтрацию для текущей страницы или сменить уровень от 1 до 5.',
    caption: 'Снимок версии 0.11.0 · вкладка «Защита» на странице example.org'
  },
  optionsLevels: {
    base: 'options-levels',
    width: 746,
    height: 215,
    alt: 'Раздел настроек «Уровень защиты: 2 из 5» с ползунком от «Совместимость» до «Максимум» и списком активных правил по умолчанию для уровня «Мягкая защита»',
    title: 'Выбор уровня защиты (1–5)',
    desc: 'Ползунок переключает режимы от мягкой фильтрации без косметических правок (уровень 2 по умолчанию) до строгих правил приватности.',
    caption: 'Снимок версии 0.11.0 · раздел «Защита и приватность»'
  },
  optionsExceptionsCookies: {
    base: 'options-exceptions-cookies',
    width: 774,
    height: 334,
    alt: 'Настройки исключений «Без защиты на сайтах» (до 100 доменов) и выпадающий список «Cookie-баннеры» со значением «Отклонять необязательные cookies»',
    title: 'Исключения по домену и cookie-баннеры',
    desc: 'Список доменов без фильтрации (включая поддомены) и отдельная настройка отказа от необязательных cookies на совместимых баннерах.',
    caption: 'Снимок версии 0.11.0 · исключения и режим cookie-баннеров'
  },
  optionsLists: {
    base: 'options-filter-lists',
    width: 746,
    height: 443,
    alt: 'Раскрытая таблица встроенных списков фильтров в настройках AntiRacketMantis: EasyPrivacy (9 162 правила), RU AdList: Counters (1 086), uBlock filters – Badware risks (435) и Peter Lowe в статусе «включён»',
    title: 'Прозрачная таблица встроенных списков',
    desc: 'В настройках видно каждый встроенный список правил (на базе uBlock Origin Lite 2026.1116.1650), число правил и его состояние; во время просмотра сайтов ничего не скачивается.',
    caption: 'Снимок версии 0.11.0 · встроенные списки фильтров'
  },
  welcomeProtections: {
    base: 'welcome-protections',
    width: 841,
    height: 263,
    alt: 'Три карточки защиты на экране приветствия AntiRacketMantis: «Реклама и трекеры», «Cookie-баннеры и всплывающие окна» и «Твой выбор, который легко отменить»',
    title: 'Краткая сводка при первом запуске',
    desc: 'Приветственная страница объясняет, как работают списки правил, отказ от cookie-баннеров, защита от всплывающих окон без клика (с уровня 3) и отключение защиты для одного сайта.',
    caption: 'Снимок версии 0.11.0 · карточки защиты на экране приветствия'
  },
  optionsTheme: {
    base: 'options-theme',
    width: 731,
    height: 69,
    alt: 'Выпадающий список «Тема» в настройках AntiRacketMantis с выбранным оформлением «Mantis — белая (основная)»',
    title: 'Светлые и тёмные темы интерфейса',
    desc: 'Оформление окна расширения и страницы настроек можно оставить системным или выбрать светлую и тёмную палитры Mantis вручную.',
    caption: 'Снимок версии 0.11.0 · выбор темы оформления'
  }
};

function shotCard(item, extraClass = '', withReveal = true) {
  return `<figure class="shot-card${extraClass ? ` ${extraClass}` : ''}${withReveal ? ' reveal' : ''}">
    <div class="shot-frame">
      <picture>
        <source srcset="/assets/screenshots/${item.base}.webp" type="image/webp">
        <img src="/assets/screenshots/${item.base}.png" alt="${escapeAttr(item.alt)}" width="${item.width}" height="${item.height}" loading="lazy" decoding="async">
      </picture>
    </div>
    <div class="shot-body">
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    </div>
    <figcaption class="shot-caption">${item.caption}</figcaption>
  </figure>`;
}

function interfaceSectionHome(lang) {
  return `<section class="section interface-section" id="interface">
  <div class="container">
    <div class="section-title centered reveal">
      <span class="eyebrow">Реальный интерфейс</span>
      <h2>Интерфейс расширения</h2>
      <p>Настоящие снимки окна AntiRacketMantis и настроек защиты — именно так выглядят переключатели, уровни и исключения в браузере.</p>
    </div>
    <div class="shots-grid shots-home">
      ${shotCard(screenshotsData.popupShield, 'shot-popup')}
      <div class="shots-home-stack">
        ${shotCard(screenshotsData.optionsLevels)}
        ${shotCard(screenshotsData.optionsExceptionsCookies)}
      </div>
    </div>
    <div class="center-action">
      <a class="text-link" href="${url(lang, 'how-it-works/')}#interface">Смотреть все снимки настроек и списков фильтров →</a>
    </div>
  </div>
</section>`;
}

function interfaceSectionDoc() {
  return `<section class="container interface-doc-section" id="interface">
  <div class="interface-doc-head">
    <h2>Интерфейс расширения</h2>
    <p>Ниже показаны реальные экраны защиты версии ${VERSION}: окно расширения для текущего сайта, настройка уровня 1–5, встроенные списки фильтров, исключения, cookie-баннеры, всплывающие окна и тема.</p>
  </div>
  <div class="shots-grid shots-all">
    ${shotCard(screenshotsData.popupShield, 'shot-popup', false)}
    ${shotCard(screenshotsData.optionsLists, '', false)}
    ${shotCard(screenshotsData.optionsLevels, '', false)}
    ${shotCard(screenshotsData.optionsExceptionsCookies, '', false)}
    ${shotCard(screenshotsData.welcomeProtections, 'shot-wide', false)}
    ${shotCard(screenshotsData.optionsTheme, 'shot-wide', false)}
  </div>
</section>`;
}

function levelsStrip(withReveal = true) {
  return `<div class="levels-grid">
  ${levelsData.map(lv => `<article class="level-card${lv.isDefault ? ' level-default' : ''}${withReveal ? ' reveal' : ''}">
    <span class="level-badge"><span>Уровень ${lv.n}</span><span>${lv.badge}</span></span>
    <h3>${lv.name}</h3>
    <p>${lv.summary}</p>
  </article>`).join('')}
</div>`;
}

function faqList(lang, all = false) {
  const list = faqData.slice(0, all ? 99 : 5);
  return `<div class="faq-list">
  ${list.map(({ q, a }, i) => `<details class="faq-item" ${i === 0 ? 'open' : ''}>
    <summary>${q[lang]}<span class="faq-plus" aria-hidden="true"></span></summary>
    <p>${a[lang]}</p>
  </details>`).join('')}
</div>`;
}

function permissionsSection(lang) {
  const t = i18n[lang];
  return `<section class="section perm-section" id="permissions">
  <div class="container perm-grid">
    <div class="section-title reveal">
      <span class="eyebrow">${t.permTag}</span>
      <h2>${t.permTitle}</h2>
      <p>${t.permIntro}</p>
      <div class="perm-facts">
        <div class="perm-fact">
          <h3>${t.devTitle}</h3>
          <p>${t.devText} <a class="inline-link" href="${STUDIO}" rel="noopener">${t.devLink}</a></p>
        </div>
        <div class="perm-fact">
          <h3>${t.helpTitle}</h3>
          <p>${t.helpText}</p>
        </div>
      </div>
      <div class="page-links-row">
        <a class="text-link" href="${url(lang, 'privacy/')}#permissions">Подробный разбор разрешений →</a>
        <a class="text-link" href="${url(lang, 'uninstall/')}">Как удалить и очистить данные →</a>
      </div>
    </div>
    <figure class="perm-dialog reveal">
      <figcaption class="perm-head">
        <img src="/assets/mark.svg" alt="" aria-hidden="true" width="40" height="40">
        <span><strong>AntiRacketMantis</strong><small>запрашивает доступ в браузере</small></span>
      </figcaption>
      <ol class="perm-list">
        ${t.perms.map(([a, b], i) => `<li>
          <span class="perm-icon" aria-hidden="true">${icon(['popup', 'shield', 'eye', 'sliders'][i])}</span>
          <span><strong>${a}</strong><span>${b}</span></span>
        </li>`).join('')}
      </ol>
      <p class="perm-note">${t.permNote}</p>
    </figure>
  </div>
</section>`;
}

function home(lang) {
  const t = i18n[lang];
  return `<main id="main">
  <section class="hero">
    <div class="hero-wash" aria-hidden="true"></div>
    <div class="container hero-grid">
      <div class="hero-copy reveal">
        <span class="pill badge"><span class="badge-spark" aria-hidden="true">✦</span>${t.badge}</span>
        <h1>${t.heroA}<br><span class="hero-highlight">${t.heroB}</span></h1>
        <p>${t.heroText}</p>
        ${installButtons(lang)}
        <div class="hero-links">
          <a class="text-link" href="#features">${t.explore}<span class="text-link-dot" aria-hidden="true">✳</span></a>
          <a class="text-link" href="${url(lang, 'install/')}">${t.installGuideLink} →</a>
        </div>
      </div>
      <div class="hero-art">
        <div class="orbit orbit-one" aria-hidden="true"></div>
        <div class="orbit orbit-two" aria-hidden="true"></div>
        <div class="hero-hill" aria-hidden="true"></div>
        <div class="floating-chip chip-top"><span class="chip-icon green">${icon('shield')}</span>${t.adBlock}</div>
        <div class="floating-chip chip-bottom"><span class="chip-icon purple">${icon('check')}</span>${t.trackers}</div>
        <div class="hero-browser" aria-hidden="true">
          <div class="browser-dots"><i></i><i></i><i></i><span>your-favorite-page.example</span></div>
          <div class="browser-contents">
            <div class="browser-sky"></div>
            <div class="browser-headline"></div>
            <div class="browser-para"></div>
            <div class="browser-para short"></div>
            <div class="browser-tiles"><b></b><b></b><b></b></div>
          </div>
        </div>
        <img class="hero-mantis mascot-reactive" src="/assets/mascot.svg" alt="Богомол Минти — талисман AntiRacketMantis, который приветственно машет лапкой" width="440" height="530" fetchpriority="high">
        <span class="hero-star star-one" aria-hidden="true">✦</span>
        <span class="hero-star star-two" aria-hidden="true">✧</span>
        <span class="hero-star star-three" aria-hidden="true">✳</span>
      </div>
    </div>
    <div class="hero-bottom container">
      <span>${t.online}</span>
      <span class="demo-note">✧ ${t.illustration}</span>
    </div>
  </section>

  <section class="section intro-section" id="demo">
    <div class="container split-section">
      <div class="section-title reveal">
        <span class="eyebrow">${t.sectionTag}</span>
        <h2>${t.compareTitle}</h2>
        <p>${t.compareText}</p>
        <div class="page-links-row">
          <a class="text-link" href="${url(lang, 'limits/')}">Что расширение не скрывает и почему →</a>
        </div>
      </div>
      <div class="comparison reveal" data-comparison>
        <div class="comparison-header"><span>${t.without}</span><span>${t.with}</span></div>
        <div class="comparison-frame">
          <div class="mock-web mock-messy">
            <div class="mock-top"><i></i><i></i><i></i><span>magazine.example</span></div>
            <div class="mock-content">
              <span class="mock-banner">${t.ad}</span>
              <h3>${t.sampleTitle}</h3>
              <p>${t.sampleCopy}</p>
              <div class="mock-img"></div>
              <span class="mock-ad">${t.ad}</span>
              <div class="mock-cookie">${t.cookie}</div>
              <div class="mock-popup">${t.popup}</div>
            </div>
          </div>
          <div class="mock-web mock-clean">
            <div class="mock-top"><i></i><i></i><i></i><span>magazine.example</span></div>
            <div class="mock-content">
              <span class="mock-banner clean-banner">✦ ${t.with}</span>
              <h3>${t.sampleTitle}</h3>
              <p>${t.sampleCopy}</p>
              <div class="mock-img"></div>
              <div class="mock-article-lines"></div>
            </div>
          </div>
          <div class="comparison-line" aria-hidden="true"><span>◀ ▶</span></div>
        </div>
        <input class="comparison-range" type="range" min="0" max="100" value="50" aria-label="${t.compareTitle}">
        <p class="compare-caption">${t.illustration}</p>
      </div>
    </div>
  </section>

  <section class="section features-section" id="features">
    <div class="container">
      <div class="section-title centered reveal">
        <span class="eyebrow">${t.featureTag}</span>
        <h2>${t.featureTitle}</h2>
        <p>${t.featureIntro}</p>
      </div>
      ${featuresGrid(lang)}
      <div class="center-action">
        <a class="text-link" href="${url(lang, 'features/')}">${t.allFeatures} <span aria-hidden="true">✳</span></a>
        <a class="text-link" href="${url(lang, 'how-it-works/')}">Как это устроено →</a>
      </div>
    </div>
  </section>

  <section class="section levels-section" id="levels">
    <div class="container">
      <div class="section-title centered reveal">
        <span class="eyebrow">${t.levelsTag}</span>
        <h2>${t.levelsTitle}</h2>
        <p>${t.levelsIntro}</p>
      </div>
      ${levelsStrip(false)}
      <div class="center-action">
        <a class="text-link" href="${url(lang, 'how-it-works/')}#levels">Подробно о каждом уровне →</a>
      </div>
    </div>
  </section>

  ${interfaceSectionHome(lang)}

  <section class="section how-section" id="how">
    <div class="container">
      <div class="section-title centered reveal">
        <span class="eyebrow">${t.stepsTag}</span>
        <h2>${t.stepsTitle}</h2>
      </div>
      <div class="steps-grid">
        ${t.steps.map((s, i) => `<div class="step reveal">
          <div class="step-number step-${i + 1}" aria-hidden="true">${['✦', '✓', '✿'][i]}</div>
          <span class="step-kicker">0${i + 1}</span>
          <h3>${s[0]}</h3>
          <p>${s[1]}</p>
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
          <strong>✦ ${t.online}</strong>
          <i></i><i></i><i></i>
        </div>
      </div>
      <div class="trust-copy reveal">
        <span class="eyebrow">${t.trustTag}</span>
        <h2>${t.trustTitle}</h2>
        <p>${t.trustText}</p>
        <ul>${t.trustBullets.map(x => `<li>${icon('check')}<span>${x}</span></li>`).join('')}</ul>
        <div class="trust-actions">
          <a class="btn btn-cream" href="${url(lang, 'privacy/')}">${t.trustLink}</a>
          <a class="btn btn-secondary" href="${url(lang, 'limits/')}">${t.limitsLink}</a>
        </div>
      </div>
    </div>
  </section>

  ${t.perms ? permissionsSection(lang) : ''}

  <section class="section faq-section" id="faq">
    <div class="container split-section">
      <div class="section-title reveal">
        <span class="eyebrow">${t.faqTag}</span>
        <h2>${t.faqTitle}</h2>
        <div class="page-links-row">
          <a class="text-link" href="${url(lang, 'faq/')}">${t.faqAllLink} →</a>
          <a class="text-link" href="${url(lang, 'support/')}">Страница поддержки →</a>
        </div>
        <img class="faq-mini-mantis mascot-reactive" src="/assets/mascot-thinking.svg" alt="Богомол Минти задумчиво ищет ответ на вопрос" width="140" height="168" loading="lazy">
      </div>
      ${faqList(lang)}
    </div>
  </section>

  <section class="final-section" id="download">
    <div class="container final-card">
      <div class="final-copy reveal">
        <span class="eyebrow">${t.lastTag}</span>
        <h2>${t.lastTitle}</h2>
        <p>${t.lastText}</p>
        ${installButtons(lang)}
        <p class="compat-note">${t.compat} <a class="inline-link" href="${url(lang, 'compatibility/')}">Совместимость</a> · <a class="inline-link" href="${url(lang, 'install/')}">Инструкция по установке</a></p>
      </div>
      <img src="/assets/mascot-celebrate.svg" alt="Богомол Минти радуется спокойному интернету" class="final-mantis mascot-reactive" loading="lazy" width="320" height="390">
      <span class="final-spark fsp-one" aria-hidden="true">✦</span>
      <span class="final-spark fsp-two" aria-hidden="true">✳</span>
    </div>
  </section>
</main>`;
}

function pageHero(eyebrow, title, lead, mascotSrc, mascotAlt, isLazy = false) {
  return `<section class="page-hero container page-hero-split">
  <div>
    <span class="eyebrow">${eyebrow}</span>
    <h1>${title}</h1>
    <p>${lead}</p>
  </div>
  <img class="page-hero-mascot mascot-reactive" src="${mascotSrc}" alt="${escapeAttr(mascotAlt)}" width="220" height="265"${isLazy ? ' loading="lazy"' : ' fetchpriority="high"'}>
</section>`;
}

function pageNudge(lang, title, text, actions) {
  return `<section class="container">
  <div class="info-nudge">
    <div class="info-nudge-copy">
      <h2>${title}</h2>
      <p>${text}</p>
    </div>
    <div class="info-nudge-actions">
      ${actions.map(([route, label, variant]) => `<a class="btn ${variant || 'btn-primary'}" href="${url(lang, route)}">${label}</a>`).join('')}
    </div>
  </div>
</section>`;
}

function detailPage(lang, kind) {
  const t = i18n[lang];

  if (kind === 'features') {
    return `<main id="main" class="inner-page">
  ${breadcrumbs(lang, 'Возможности')}
  ${pageHero('Возможности защиты', 'Что умеет AntiRacketMantis', 'Шесть взаимосвязанных инструментов для снижения рекламного шума, слежки и навязчивых окон — с честным описанием того, как они работают и где проходят границы.', '/assets/mascot-block.svg', 'Богомол Минти держит защитный щит')}
  <section class="container detail-features">
    ${featureData.map((f, i) => {
      const d = f.ruDetail;
      return `<article class="detail-feature tone-${f.tone}" id="${f.id}">
        <div class="detail-symbol">${icon(f.icon)}<span aria-hidden="true">✦</span></div>
        <div>
          <span class="detail-kicker">${String(i + 1).padStart(2, '0')}</span>
          <h2>${d.title}</h2>
          <p><strong>${d.summary}</strong></p>
          <p>${d.details}</p>
          <p>${d.limit}</p>
          <div class="detail-meta">${d.tags.map(tag => `<span class="detail-tag">${tag}</span>`).join('')}</div>
        </div>
      </article>`;
    }).join('')}
  </section>
  ${pageNudge(lang, 'Хотите разобраться глубже?', 'Посмотрите техническое устройство уровней или проверьте честные ограничения защиты.', [['how-it-works/', 'Как это работает', 'btn-primary'], ['limits/', 'Известные ограничения', 'btn-secondary']])}
</main>`;
  }

  if (kind === 'how-it-works') {
    return `<main id="main" class="inner-page">
  ${breadcrumbs(lang, 'Как это работает')}
  ${pageHero('Принцип работы', 'Как устроена защита в браузере', 'AntiRacketMantis опирается на стандартный движок правил Manifest V3, изолированные скрипты страницы и понятные уровни строгости — без отправки вашей истории посещений на сторонние серверы.', '/assets/mascot-thinking.svg', 'Богомол Минти изучает схему работы защиты')}
  <section class="container info-grid">
    <article class="info-card">
      <span class="info-icon">${icon('shield')}</span>
      <h2>1. Сетевые правила браузера</h2>
      <p>Для блокировки рекламы, счётчиков, опасных доменов и меток отслеживания используется встроенный API браузера <code>declarativeNetRequest</code>.</p>
      <p>Браузер сам сопоставляет запросы со встроенными списками правил (EasyList, EasyPrivacy, uBlock filters, RU AdList, Peter Lowe, AdGuard Turkish), не передавая адреса открытых страниц во внешнюю сеть.</p>
    </article>
    <article class="info-card">
      <span class="info-icon">${icon('ad')}</span>
      <h2>2. Косметика и анти-pop-up</h2>
      <p>Начиная с уровня 3 подключаются косметические фильтры для скрытия пустых контейнеров и рекламных блоков, которые остались в разметке страницы.</p>
      <p>Отдельный защитник всплывающих окон сдерживает попытки сайтов открыть лишнее окно или фоновую вкладку без явного клика пользователя.</p>
    </article>
    <article class="info-card">
      <span class="info-icon">${icon('cookie')}</span>
      <h2>3. Cookie-баннеры и исключения</h2>
      <p>Модуль cookie-баннеров работает в изолированном мире страницы и пытается отклонять необязательные cookies на совместимых окнах согласия, если эта настройка включена.</p>
      <p>Если сайт перестал открываться или требует полного допуска, переключатель в окне расширения добавляет домен в приоритетное исключение, которое стоит выше всех правил уровня.</p>
    </article>
  </section>
  <section class="container doc-stack" id="levels">
    <article class="doc-card">
      <h2>Пять уровней защиты (от 1 до 5)</h2>
      <p>Вы можете переключать уровень в окне расширения или на странице настроек. Сетевые и страничные изменения применяются к новым загрузкам после перезагрузки вкладки.</p>
      ${levelsStrip(false)}
    </article>
    <article class="doc-card">
      <h2>Встроенные списки и перенос без аккаунта</h2>
      <ul>
        <li><strong>Списки внутри пакета расширения:</strong> правила фильтрации (на базе uBlock Origin Lite 2026.1116.1650 и движок cookie-баннеров DuckDuckGo autoconsent 18.6.0) встроены в само расширение и обновляются вместе с его версией — при просмотре сайтов ничего не скачивается с удалённых серверов.</li>
        <li><strong>Перенос настроек без регистрации:</strong> вам не нужен аккаунт или облачная синхронизация — уровень защиты, режим cookie-баннеров и списки исключений можно перенести между компьютерами через экспорт и импорт файла JSON в настройках.</li>
        <li><strong>Нет проксирования сторонних библиотек через локальный CDN:</strong> устаревшие подходы вроде LocalCDN здесь не дублируются — трекинг через CDN режут сетевые правила EasyPrivacy.</li>
        <li><strong>Нет непредсказуемого «самообучения» блокировщика:</strong> фильтрация предсказуема и опирается на выбранный уровень и явные исключения пользователя.</li>
      </ul>
    </article>
  </section>
  ${interfaceSectionDoc()}
  ${pageNudge(lang, 'Следующий шаг', 'Проверьте совместимость браузера или прочитайте политику конфиденциальности.', [['install/', 'Установка', 'btn-primary'], ['privacy/', 'Приватность', 'btn-secondary']])}
</main>`;
  }

  if (kind === 'install') {
    return `<main id="main" class="inner-page">
  ${breadcrumbs(lang, 'Установка')}
  ${pageHero('Установка', 'Как установить AntiRacketMantis', 'Пошаговая инструкция для Chrome и Firefox. Расширение проходит подготовку к первому публичному выпуску, поэтому здесь нет вымышленных ссылок на магазины.', '/assets/mascot.svg', 'Богомол Минти машет лапкой и приглашает к установке')}
  <section class="container">
    <div class="notice-box notice-info">
      <h2><span class="status-pill">Скоро в магазине</span> Текущий статус публикации</h2>
      <p>Версия <strong>${VERSION}</strong> готовится к размещению в официальных каталогах Chrome Web Store и Firefox Add-ons. Прямые ссылки появятся сразу после прохождения проверки в магазинах.</p>
      <p>Не скачивайте неофициальные сборки со сторонних сайтов: после публикации устанавливайте расширение только со страниц, на которые ведут ссылки с официального сайта.</p>
    </div>
  </section>
  <section class="container info-grid two-col">
    <article class="info-card" id="chrome">
      <span class="info-icon">${icon('shield')}</span>
      <h2>Google Chrome и браузеры Chromium</h2>
      <p><span class="status-pill">Скоро в Chrome Web Store · Chrome 110+</span></p>
      <ol>
        <li>Откройте официальную страницу AntiRacketMantis в Chrome Web Store (ссылка появится здесь после публикации).</li>
        <li>Нажмите «Установить» и внимательно просмотрите запрос разрешений браузера.</li>
        <li>Закрепите значок AntiRacketMantis на панели инструментов через кнопку пазла («Расширения»), чтобы быстро видеть статус сайта и переключатель.</li>
        <li>Нажмите на значок: по умолчанию включён <strong>уровень 2 («Мягкая защита»)</strong> и отклонение необязательных cookie-баннеров. При желании выберите уровень 3 («Баланс»).</li>
      </ol>
    </article>
    <article class="info-card" id="firefox">
      <span class="info-icon">${icon('lock')}</span>
      <h2>Mozilla Firefox</h2>
      <p><span class="status-pill">Скоро в Firefox Add-ons · Firefox 128+</span></p>
      <ol>
        <li>Откройте официальную страницу AntiRacketMantis в каталоге Firefox Add-ons (ссылка появится после публикации).</li>
        <li>Нажмите «Добавить в Firefox» и подтвердите запрашиваемые разрешения во всплывающем окне.</li>
        <li>Если при первом запуске откроется приветственная страница настройки, выберите комфортный уровень защиты и режим работы с cookie-баннерами.</li>
        <li>При необходимости закрепите иконку расширения на панели адреса через меню расширений Firefox.</li>
      </ol>
    </article>
  </section>
  <section class="container doc-stack">
    <article class="doc-card">
      <h2>Что проверить сразу после установки</h2>
      <ul>
        <li><strong>Закрепите значок на панели:</strong> в Chrome нажмите на значок пазла «Расширения» и кликните булавку рядом с AntiRacketMantis; в Firefox значок доступен через меню расширений на панели адреса.</li>
        <li><strong>Откройте обычный сайт (<code>http://</code> или <code>https://</code>):</strong> на служебных вкладках браузера (<code>chrome://</code>, <code>about:</code> и страницах магазинов) переключатель сайта недоступен из-за ограничений безопасности самого браузера.</li>
        <li><strong>Проверьте поведение на уровне 2 и выше:</strong> если на привычном сайте перестали загружаться комментарии, видео или форма входа — снимите переключатель «Защита на этом сайте» во вкладке «Защита» и нажмите «Перезагрузить».</li>
        <li><strong>Изучите детали перед запуском:</strong> проверьте <a class="inline-link" href="${url(lang, 'privacy/')}#permissions">зачем нужны разрешения</a> и <a class="inline-link" href="${url(lang, 'compatibility/')}">требования к версиям браузера</a>.</li>
      </ul>
    </article>
  </section>
  ${pageNudge(lang, 'Нужно удалить или перенести настройки?', 'Узнайте, как корректно удалить расширение из браузера и что происходит с локальными данными.', [['uninstall/', 'Как удалить', 'btn-primary'], ['compatibility/', 'Совместимость', 'btn-secondary']])}
</main>`;
  }

  if (kind === 'uninstall') {
    return `<main id="main" class="inner-page">
  ${breadcrumbs(lang, 'Как удалить')}
  ${pageHero('Удаление', 'Как удалить AntiRacketMantis', 'Если расширение больше не нужно, его можно полностью удалить за полминуты — или просто отключить защиту на одном проблемном сайте без удаления.', '/assets/mascot-thinking.svg', 'Богомол Минти помогает разобраться с удалением')}
  <section class="container info-grid two-col">
    <article class="info-card">
      <span class="info-icon">${icon('sliders')}</span>
      <h2>Удаление в Google Chrome / Chromium</h2>
      <ol>
        <li>Нажмите правой кнопкой мыши по значку AntiRacketMantis на панели инструментов и выберите «Удалить из Chrome» — либо перейдите по адресу <code>chrome://extensions</code>.</li>
        <li>Найдите карточку <strong>AntiRacketMantis</strong> и нажмите кнопку <strong>«Удалить»</strong>.</li>
        <li>Подтвердите удаление во всплывающем окне браузера.</li>
      </ol>
    </article>
    <article class="info-card">
      <span class="info-icon">${icon('sliders')}</span>
      <h2>Удаление в Mozilla Firefox</h2>
      <ol>
        <li>Откройте меню Firefox и выберите «Дополнения и темы» (или введите <code>about:addons</code> в адресной строке).</li>
        <li>Перейдите в раздел «Расширения» и откройте меню «⋯» напротив <strong>AntiRacketMantis</strong>.</li>
        <li>Нажмите <strong>«Удалить»</strong> и подтвердите действие.</li>
      </ol>
    </article>
  </section>
  <section class="container doc-stack">
    <article class="doc-card">
      <h2>Что происходит с вашими данными после удаления</h2>
      <ul>
        <li><strong>Локальное хранилище стирается браузером:</strong> выбранный уровень защиты, список исключений, режим cookie-баннеров, тема и локальный диагностический журнал удаляются вместе с профилем расширения.</li>
        <li><strong>Если вы делали резервную копию вручную:</strong> экспортированный вами JSON-файл настроек остаётся там, куда вы его сохранили на диске, и при желании его нужно удалить вручную.</li>
        <li><strong>Альтернатива удалению:</strong> если мешает только один сайт, вместо удаления расширения достаточно снять переключатель «Защита на этом сайте» в окне расширения и перезагрузить вкладку.</li>
      </ul>
    </article>
  </section>
  ${pageNudge(lang, 'Что-то работало не так?', 'Проверьте известные ограничения или загляните в раздел поддержки перед удалением.', [['limits/', 'Известные ограничения', 'btn-primary'], ['support/', 'Поддержка', 'btn-secondary']])}
</main>`;
  }

  if (kind === 'limits') {
    return `<main id="main" class="inner-page">
  ${breadcrumbs(lang, 'Известные ограничения')}
  ${pageHero('Честные границы', 'Известные ограничения защиты', 'Ни одно браузерное расширение не способно идеально отфильтровать весь интернет без побочных эффектов. Здесь честно перечислены ситуации, где результат может отличаться.', '/assets/mascot-block.svg', 'Богомол Минти со щитом обозначает границы защиты')}
  <section class="container info-grid two-col">
    <article class="info-card">
      <span class="info-icon">${icon('ad')}</span>
      <h2>Сайты меняются и встраивают рекламу к себе</h2>
      <p>Реклама, которая отдаётся с того же домена, что и сама статья или видео (first-party), технически сложно отличается от основного контента.</p>
      <p>Кроме того, разметка сайтов меняется быстрее обновлений встроенных списков, поэтому отдельные блоки могут временно оставаться на экране.</p>
    </article>
    <article class="info-card">
      <span class="info-icon">${icon('cookie')}</span>
      <h2>Скрытие cookie-баннера ≠ отказ от cookies</h2>
      <p>Расширение пытается нажать отказ от необязательных cookies в поддерживаемых диалогах согласия. Однако если сайт не поддерживает такой сценарий, простое скрытие уведомления на уровне 4–5 не означает, что сайт отказался от установки cookies.</p>
      <p>Кроме того, сайты вправе сохранять технические и защитные cookies для безопасности сессии.</p>
    </article>
    <article class="info-card">
      <span class="info-icon">${icon('popup')}</span>
      <h2>Нужные окна для входа и оплаты должны оставаться</h2>
      <p>Защита всплывающих окон старается останавливать только те окна, которые открываются без вашего клика.</p>
      <p>Окна авторизации через сторонние аккаунты, банковских подтверждений и оплаты заказов должны открываться — если сайт всё-таки заблокировался, отключите защиту для него в окне расширения.</p>
    </article>
    <article class="info-card">
      <span class="info-icon">${icon('lock')}</span>
      <h2>Побочные эффекты строгих уровней (4 и 5)</h2>
      <p>На уровне 4 удаляются сторонние cookies, из-за чего могут не срабатывать кнопки «Войти через …» и встроенные виджеты соцсетей.</p>
      <p>На уровне 5 включается защита отпечатков и принудительный переход на HTTPS: сайты без HTTPS не откроются (исключение сделано только для локальных и частных адресов домашней сети), а частая смена параметров отпечатка может вызывать дополнительные проверки на сайтах.</p>
    </article>
    <article class="info-card">
      <span class="info-icon">${icon('eye')}</span>
      <h2>Ограничения приватности и анонимности</h2>
      <p>Блокировка трекеров и счётчиков снижает объём стороннего отслеживания, но не скрывает ваш IP-адрес от посещаемых сайтов и интернет-провайдера.</p>
    </article>
    <article class="info-card">
      <span class="info-icon">${icon('sliders')}</span>
      <h2>Различия возможностей браузеров и защищённые страницы</h2>
      <p>В Chrome расширение может показывать число сработавших сетевых правил для активной вкладки, а в Firefox браузер не передаёт этот счётчик расширению — в таком случае отображается прочерк с пояснением.</p>
      <p>Кроме того, ни одно расширение не работает на внутренних страницах браузера (<code>chrome://</code>, <code>about:</code>) и в официальных магазинах дополнений — это встроенное ограничение безопасности самих браузеров.</p>
    </article>
  </section>
  ${pageNudge(lang, 'Столкнулись со сбоем на конкретном сайте?', 'Посмотрите советы в поддержке или уточните совместимость браузера.', [['support/', 'Поддержка', 'btn-primary'], ['compatibility/', 'Совместимость', 'btn-secondary']])}
</main>`;
  }

  if (kind === 'compatibility') {
    return `<main id="main" class="inner-page">
  ${breadcrumbs(lang, 'Совместимость')}
  ${pageHero('Совместимость', 'Поддерживаемые браузеры и требования', 'Мы указываем только те браузеры и версии, под которые реально собраны манифесты и правила расширения.', '/assets/mascot.svg', 'Богомол Минти проверяет совместимость браузеров')}
  <section class="container doc-stack">
    <article class="doc-card">
      <h2>Текущая матрица совместимости</h2>
      <div class="data-table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Браузер / платформа</th>
              <th>Минимальная версия</th>
              <th>Статус</th>
              <th>Особенности</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Google Chrome / Chromium</strong></td>
              <td>Версия 110 и выше (Manifest V3)</td>
              <td>Готовится к публикации</td>
              <td>Поддерживает счётчик сработавших правил на активной вкладке в окне расширения (до 20 запросов за 10 минут по лимиту браузера).</td>
            </tr>
            <tr>
              <td><strong>Mozilla Firefox</strong></td>
              <td>Версия 128.0 и выше (Manifest V3)</td>
              <td>Готовится к публикации</td>
              <td>Работает через фоновые скрипты Gecko; счётчик срабатываний правил на вкладке браузером не отдаётся (остальная фильтрация работает).</td>
            </tr>
            <tr>
              <td><strong>Safari, мобильные браузеры и устаревшие версии</strong></td>
              <td>—</td>
              <td>Не поддерживаются</td>
              <td>Не тестировались и не обещаются до проведения отдельной проверки и адаптации.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="doc-callout">
        <p><strong>Техническая возможность и реальные действия:</strong> стандартное предупреждение браузера «Читать и изменять данные на всех сайтах» означает лишь технический допуск к разметке страниц для скрытия рекламных блоков и закрытия cookie-баннеров. Базовая фильтрация не читает ваши пароли, переписку и содержимое закрытых форм и не отправляет историю просмотров разработчику.</p>
      </div>
    </article>
    <article class="doc-card">
      <h2>Технические ограничения движка браузера</h2>
      <ul>
        <li><strong>Лимиты на число активных списков правил:</strong> в Chrome и Firefox действуют системные ограничения на суммарное количество одновременно включённых правил <code>declarativeNetRequest</code>. Если браузер не применит один из дополнительных наборов, расширение честно покажет статус «включено частично» в окне и настройках.</li>
        <li><strong>Локальные устройства в домашней сети:</strong> даже на уровне 5 («Максимум») перенаправление на HTTPS не затрагивает <code>localhost</code>, <code>127.0.0.1</code> и частные адреса домашней сети (роутеры, принтеры на <code>192.168.*</code>, <code>10.*</code>, <code>.local</code>).</li>
      </ul>
    </article>
  </section>
  ${pageNudge(lang, 'Готовы к установке?', 'Изучите порядок установки и разрешения, которые запросит браузер.', [['install/', 'Установка', 'btn-primary'], ['privacy/', 'Политика конфиденциальности', 'btn-secondary']])}
</main>`;
  }

  if (kind === 'privacy') {
    return `<main id="main" class="inner-page">
  ${breadcrumbs(lang, 'Политика конфиденциальности')}
  ${pageHero('Приватность и данные', 'Политика конфиденциальности AntiRacketMantis', 'Подробное и честное описание того, как ведёт себя этот сайт, какие данные расширение хранит на вашем устройстве, зачем ему разрешения и когда возможны сетевые обращения.', '/assets/mascot-block.svg', 'Богомол Минти со щитом защищает приватность данных')}
  <section class="container">
    <div class="notice-box notice-draft">
      <h2><span class="status-pill draft">Предварительная редакция</span> Статус документа перед запуском</h2>
      <p>Этот текст отражает текущее устройство сайта и кода расширения версии <strong>${VERSION}</strong>, но окончательная редакция Политики конфиденциальности будет утверждена после завершения финального аудита публичной сборки и закрепления официальных контактов.</p>
    </div>
  </section>
  <section class="container doc-stack">
    <article class="doc-card">
      <h2>1. Данные этого сайта</h2>
      <p>Сайт <code>${SITE}</code> состоит только из статических страниц:</p>
      <ul>
        <li>Сайт <strong>не устанавливает cookies</strong> и не использует локальные трекеры.</li>
        <li>На сайте <strong>нет</strong> систем веб-аналитики, рекламных пикселей, сторонних шрифтов и внешних скриптов.</li>
        <li>На сайте <strong>нет</strong> форм регистрации, комментариев или отправки персональных данных.</li>
        <li>Единственная настройка сайта («Отключить анимации») сохраняется только в <code>localStorage</code> вашего браузера под ключом <code>arm-motion-off</code> и никуда не передаётся.</li>
      </ul>
    </article>

    <article class="doc-card">
      <h2>2. Какие данные расширение хранит локально в браузере</h2>
      <p>Расширение использует <code>storage.local</code> в вашем профиле браузера и временную память сессии <code>storage.session</code>. Локальное хранение не исключает сетевых обращений дополнительных модулей, описанных ниже:</p>
      <ul>
        <li><strong>Параметры защиты:</strong> выбранный уровень (1–5), режим работы с cookie-баннерами, тема оформления.</li>
        <li><strong>Списки сайтов:</strong> ваши домены-исключения, где защита отключена, и сайты с маскировкой canvas (до 100 адресов в списке).</li>
        <li><strong>Диагностический журнал:</strong> локальные записи о событиях, времени, доменах сайтов и ошибках (до 200 записей со сроком хранения 14 дней). Журнал можно отключить или очистить в настройках.</li>
        <li><strong>Дополнительные модули:</strong> их настройки, согласия, ключи доступа к выбранным внешним сервисам и счётчики обращений сохраняются локально. При работе модуля во временной памяти могут находиться адрес исходной вкладки и обрабатываемое изображение.</li>
        <li><strong>Экспорт настроек:</strong> при ручном экспорте в JSON сохраняются только параметры и списки сайтов — журналы и секреты в файл экспорта не включаются.</li>
      </ul>
    </article>

    <article class="doc-card" id="permissions">
      <h2>3. Разрешения браузера и их назначение</h2>
      <div class="data-table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Разрешение</th>
              <th>Зачем оно нужно</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>storage</code></td>
              <td>Локальное сохранение уровня защиты, исключений, настроек cookie-баннеров и диагностического журнала.</td>
            </tr>
            <tr>
              <td><code>declarativeNetRequest</code></td>
              <td>Блокировка рекламы, трекеров, вредоносных доменов, сторонних маячков, удаление меток слежки и настройка заголовков силами самого браузера.</td>
            </tr>
            <tr>
              <td><code>scripting</code></td>
              <td>Подключение правил скрытия рекламных элементов, защиты от всплывающих окон, cookie-баннеров и защиты отпечатков в зависимости от выбранного уровня.</td>
            </tr>
            <tr>
              <td><code>tabs</code> и <code>activeTab</code></td>
              <td>Определение адреса текущей вкладки, чтобы показать статус защиты и позволить выключить её для данного сайта или перезагрузить вкладку.</td>
            </tr>
            <tr>
              <td>Доступ ко всем сайтам (<code>http://*/*</code>, <code>https://*/*</code>)</td>
              <td>Необходим для применения сетевых и страничных правил на любых посещаемых сайтах, кроме добавленных вами в исключения.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="doc-callout">
        <p><strong>Техническая возможность и реальные действия:</strong> стандартное предупреждение браузера «Читать и изменять данные на всех сайтах» означает лишь технический допуск к разметке страниц для скрытия рекламных блоков и закрытия cookie-баннеров. Базовая фильтрация не читает ваши пароли, переписку и содержимое закрытых форм и не отправляет историю просмотров разработчику.</p>
      </div>
    </article>

    <article class="doc-card">
      <h2>4. Сетевые обращения и внешние сервисы</h2>
      <p>Основная защита — блокировка рекламы, трекеров, меток в ссылках, всплывающих окон и работа с cookie-баннерами — выполняется <strong>локально в браузере</strong> по встроенным в пакет спискам правил и не отправляет историю посещений разработчику или третьим лицам.</p>
      <p>В кодовой базе также присутствуют <strong>дополнительные сетевые модули</strong>. В проверенной версии некоторые их настройки <strong>включены по умолчанию</strong>: обращение к внешнему сервису может происходить без отдельного включения пользователем. Поэтому всю текущую сборку нельзя считать работающей исключительно локально.</p>
      <p>Такие обращения могут передавать обрабатываемое изображение, а при использовании сервиса с ключом — ключ доступа и идентификатор задания. При любом внешнем запросе сервис видит IP-адрес подключения; отдельная проверка IP запускается пользователем из настроек. В исследованных запросах к этим сервисам cookies и адрес исходной страницы не передаются. Сетевые модули можно отключить в настройках, выбрав выключенный внешний сервис и отключив обращения к нему.</p>
      <p>Полный окончательный перечень обращений, условия их работы, настройки по умолчанию и итоговая Политика конфиденциальности требуют финального аудита публичной сборки до выхода расширения в магазинах браузеров.</p>
    </article>

    <article class="doc-card">
      <h2>5. Управление и удаление данных</h2>
      <p>Вы можете в любой момент сбросить или отключить журнал в настройках расширения, убрать отдельные сайты из списков или полностью стереть все локально хранимые данные, удалив расширение из браузера (<a class="inline-link" href="${url(lang, 'uninstall/')}">инструкция по удалению</a>).</p>
    </article>
  </section>
  ${pageNudge(lang, 'Связанные документы', 'Ознакомьтесь также с черновиком пользовательского соглашения и ограничениями защиты.', [['terms/', 'Пользовательское соглашение', 'btn-primary'], ['limits/', 'Известные ограничения', 'btn-secondary']])}
</main>`;
  }

  if (kind === 'terms') {
    return `<main id="main" class="inner-page">
  ${breadcrumbs(lang, 'Пользовательское соглашение')}
  ${pageHero('Правовая информация', 'Пользовательское соглашение (черновик)', 'Условия использования сайта и браузерного расширения AntiRacketMantis до официальной публикации.', '/assets/mascot-thinking.svg', 'Богомол Минти изучает черновик соглашения')}
  <section class="container">
    <div class="notice-box notice-draft">
      <h2><span class="status-pill draft">Черновик, требует проверки юристом</span> Важное уведомление</h2>
      <p>Данный документ подготовлен как предварительный черновик на этапе подготовки версии <strong>${VERSION}</strong>. Он не заменяет финальную юридическую редакцию и не содержит вымышленных реквизитов правообладателя. Все неуточнённые сведения вынесены в блок «Открытые вопросы» ниже.</p>
    </div>
  </section>
  <section class="container doc-stack">
    <article class="doc-card">
      <h2>1. Лицензия на использование</h2>
      <p>Проект предоставляется для обычного личного использования в поддерживаемых браузерах (Google Chrome / Chromium и Mozilla Firefox) после официальной публикации, а данный информационный сайт — для ознакомления с возможностями, ограничениями и документацией продукта.</p>
      <p>Все права на название AntiRacketMantis, маскота, оформление сайта и исходные материалы принадлежат их правообладателям в рамках проекта WillowinWorlds, если для отдельных встроенных списков фильтров и библиотек не указаны их собственные открытые лицензии.</p>
    </article>
    <article class="doc-card">
      <h2>2. Допустимое использование</h2>
      <ul>
        <li>Вы обязуетесь использовать расширение добросовестно, не нарушая применимое законодательство и права третьих лиц.</li>
        <li>Запрещается выдавать модифицированные или сторонние сборки за официальный релиз AntiRacketMantis, а также использовать материалы сайта способом, вводящим пользователей в заблуждение.</li>
      </ul>
    </article>
    <article class="doc-card">
      <h2>3. Отсутствие гарантий («как есть»)</h2>
      <p>Расширение и сайт предоставляются по принципу «как есть» (<em>as is</em>) без каких-либо явных или подразумеваемых гарантий безошибочной работы, непрерывной доступности или полной совместимости с каждым веб-сайтом.</p>
      <p>Эффективность фильтрации рекламы, трекеров, cookie-баннеров и всплывающих окон зависит от изменений на стороне сайтов, возможностей браузера и выбранного вами уровня защиты. Подробности приведены в разделе <a class="inline-link" href="${url(lang, 'limits/')}">«Известные ограничения»</a>.</p>
    </article>
    <article class="doc-card">
      <h2>4. Ограничение ответственности</h2>
      <p>В максимально допустимой применимым правом степени разработчик не несёт ответственности за косвенные убытки, упущенную выгоду, некорректное отображение сторонних сайтов, сбои авторизации или оплаты при использовании строгих правил фильтрации — для таких случаев предусмотрен быстрый переключатель исключений для каждого сайта.</p>
    </article>
    <article class="doc-card">
      <h2>5. Изменение условий и прекращение использования</h2>
      <p>Условия соглашения будут уточнены и при необходимости обновлены к моменту публичного запуска расширения в магазинах браузеров. Вы можете прекратить использование в любой момент, закрыв сайт и удалив расширение из браузера (<a class="inline-link" href="${url(lang, 'uninstall/')}">как удалить</a>).</p>
    </article>
    <article class="doc-card">
      <h2>6. Контакты и связь</h2>
      <p>Официальный сайт студии-разработчика: <a class="inline-link" href="${STUDIO}" rel="noopener">WillowinWorlds</a>. Отдельный адрес электронной почты для юридических и пользовательских обращений по AntiRacketMantis пока не назначен и указан в открытых вопросах.</p>
    </article>
    <div class="notice-box" id="open-questions">
      <h2>Открытые вопросы (требуют решения владельца и юриста)</h2>
      <p>Эти сведения намеренно не заполнены и не выдумывались до подтверждения владельцем:</p>
      <ul>
        <li><strong>Применимая юрисдикция и право:</strong> страна/правовая система, регулирующая пользовательское соглашение.</li>
        <li><strong>Правообладатель и реквизиты:</strong> полное наименование юридического лица или ИП / физического лица-разработчика от имени WillowinWorlds и юридический адрес.</li>
        <li><strong>Официальный контактный e-mail:</strong> адрес поддержки и юридических обращений (а также адрес для публикации файла <code>/.well-known/security.txt</code>).</li>
        <li><strong>Дата вступления в силу и лицензия распространения:</strong> точная дата публикации соглашения и итоговый тип лицензии для исходного кода/сборки.</li>
      </ul>
    </div>
  </section>
  ${pageNudge(lang, 'Вопросы по данным и приватности', 'Посмотрите также предварительную политику конфиденциальности.', [['privacy/', 'Политика конфиденциальности', 'btn-primary'], ['support/', 'Поддержка', 'btn-secondary']])}
</main>`;
  }

  if (kind === 'faq') {
    return `<main id="main" class="inner-page">
  ${breadcrumbs(lang, 'Частые вопросы')}
  ${pageHero('Ответы без сложностей', 'Частые вопросы об AntiRacketMantis', 'Собрали короткие и честные ответы про публикацию, пять уровней защиты, исключения, cookie-баннеры, совместимость и данные.', '/assets/mascot-thinking.svg', 'Богомол Минти отвечает на частые вопросы')}
  <section class="container faq-standalone">
    ${faqList(lang, true)}
  </section>
  ${pageNudge(lang, 'Не нашли ответ на свой вопрос?', 'Загляните в раздел поддержки или проверьте список известных ограничений.', [['support/', 'Поддержка', 'btn-primary'], ['limits/', 'Известные ограничения', 'btn-secondary']])}
</main>`;
  }

  if (kind === 'support') {
    return `<main id="main" class="inner-page">
  ${breadcrumbs(lang, 'Поддержка')}
  ${pageHero('Помощь и диагностика', 'Поддержка AntiRacketMantis', 'Что можно проверить самостоятельно за пару минут, если сайт отображается неправильно, и как связаться со студией.', '/assets/mascot-thinking.svg', 'Богомол Минти помогает разобраться со сбоем')}
  <section class="container info-grid">
    <article class="info-card">
      <span class="info-icon">${icon('sliders')}</span>
      <h2>Сайт перестал открываться или сломался</h2>
      <p>Откройте окно расширения, снимите переключатель «Защита на этом сайте» и нажмите кнопку перезагрузки вкладки.</p>
      <p>Если проблема возникает на уровне 4 или 5 (не работает вход через другой сервис или сайт без HTTPS), переключитесь на уровень 3 («Баланс»).</p>
    </article>
    <article class="info-card">
      <span class="info-icon">${icon('popup')}</span>
      <h2>Появилось лишнее всплывающее окно</h2>
      <p>Проверьте, включён ли уровень 3 («Баланс») или выше — защита от всплывающих окон без клика активируется с третьего уровня.</p>
      <p>Убедитесь также, что домен сайта не добавлен в список «Без защиты на сайтах».</p>
    </article>
    <article class="info-card">
      <span class="info-icon">${icon('ad')}</span>
      <h2>Реклама остаётся на странице</h2>
      <p>На уровне 2 («Мягкая защита») работает только сетевая фильтрация, а косметическое скрытие блоков выключено. Переключите уровень на 3 («Баланс»).</p>
      <p>Если реклама встроена в контент с того же домена, она может не поддаваться правилам — подробнее см. <a class="inline-link" href="${url(lang, 'limits/')}">ограничения</a>.</p>
    </article>
  </section>
  <section class="container doc-stack">
    <article class="doc-card">
      <h2>Как связаться с разработчиками</h2>
      <p>AntiRacketMantis развивается студией <a class="inline-link" href="${STUDIO}" rel="noopener">WillowinWorlds</a>. Пока первая версия готовится к публикации в магазинах браузеров, официальный сайт студии остаётся основной точкой связи.</p>
      <p>Выделенный адрес электронной почты поддержки, публичный трекер ошибок и контакты для сообщений об уязвимостях (<code>security.txt</code>) будут опубликованы здесь до официального запуска (сейчас отмечены в <a class="inline-link" href="${url(lang, 'terms/')}#open-questions">открытых вопросах</a>).</p>
    </article>
  </section>
  ${pageNudge(lang, 'Полезные разделы', 'Проверьте требования к браузерам или ответы на частые вопросы.', [['faq/', 'Частые вопросы', 'btn-primary'], ['compatibility/', 'Совместимость', 'btn-secondary'], ['uninstall/', 'Как удалить', 'btn-cream']])}
</main>`;
  }

  if (kind === 'changelog') {
    return `<main id="main" class="inner-page">
  ${breadcrumbs(lang, 'История обновлений')}
  ${pageHero('Обновления', 'История версий AntiRacketMantis', 'Здесь фиксируются только подтверждённые сборки и фактические изменения без вымышленных дат релиза.', '/assets/mascot-celebrate.svg', 'Богомол Минти радуется обновлению версии')}
  <section class="container doc-stack">
    <article class="doc-card">
      <span class="status-pill">Версия ${VERSION} · готовится к первой публикации</span>
      <h2>Подготовка первого публичного выпуска</h2>
      <ul>
        <li><strong>Пять уровней защиты:</strong> от «Совместимости» (уровень 1) и «Мягкой защиты» по умолчанию (уровень 2) до «Баланса» (3), «Строгого» (4) и «Максимума» (5).</li>
        <li><strong>Встроенные наборы правил (Manifest V3):</strong> EasyPrivacy, EasyList, uBlock filters, RU AdList, RU AdList: Counters, AdGuard Turkish, Peter Lowe, uBO Badware и удаление меток отслеживания из ссылок.</li>
        <li><strong>Cookie-баннеры и окна:</strong> отдельная настройка отклонения необязательных cookies на совместимых баннерах и защита от всплывающих окон без клика (с уровня 3).</li>
        <li><strong>Контроль для пользователя:</strong> быстрый переключатель для текущего сайта в окне расширения, списки исключений до 100 доменов, экспорт/импорт настроек JSON и локальный диагностический журнал с 14-дневным сроком хранения.</li>
        <li><strong>Целевые браузеры:</strong> подготовлены сборки для Chrome (110+) и Firefox (128+).</li>
      </ul>
    </article>
  </section>
  ${pageNudge(lang, 'Хотите узнать о возможностях подробнее?', 'Изучите каждый модуль защиты или откройте инструкцию по установке.', [['features/', 'Возможности', 'btn-primary'], ['install/', 'Установка', 'btn-secondary']])}
</main>`;
  }

  return `<main id="main" class="inner-page not-found">
  <div class="container">
    <span class="eyebrow">Ошибка 404</span>
    <h1>404 — ${t.notFoundTitle}</h1>
    <p>${t.notFoundText}</p>
    <img src="/assets/mascot-thinking.svg" class="mascot-reactive" alt="Богомол Минти задумчиво ищет потерянную страницу" width="240" height="288">
    <div class="not-found-links">
      <a href="${url(lang)}" class="btn btn-primary">${t.errorBack}</a>
      <a href="${url(lang, 'install/')}" class="btn btn-secondary">Установка</a>
      <a href="${url(lang, 'features/')}" class="btn btn-secondary">Возможности</a>
      <a href="${url(lang, 'faq/')}" class="btn btn-secondary">Частые вопросы</a>
      <a href="${url(lang, 'support/')}" class="btn btn-secondary">Поддержка</a>
    </div>
  </div>
</main>`;
}

const pageMeta = {
  home: {
    title: 'AntiRacketMantis — интернет без рекламы, трекеров и лишних окон',
    desc: 'AntiRacketMantis — браузерное расширение для Chrome и Firefox: фильтрация рекламы, защита от трекеров, работа с cookie-баннерами, контроль всплывающих окон и прозрачные настройки.'
  },
  features: {
    title: 'Возможности защиты — AntiRacketMantis',
    desc: 'Шесть инструментов AntiRacketMantis: блокировка рекламы, защита от трекеров, cookie-баннеры, защита от всплывающих окон, маскировка отпечатков и исключения для сайтов.'
  },
  'how-it-works': {
    title: 'Как работает защита и 5 уровней — AntiRacketMantis',
    desc: 'Техническое устройство AntiRacketMantis: сетевые правила declarativeNetRequest, косметическое скрытие, cookie-баннеры и подробный разбор 5 уровней защиты.'
  },
  install: {
    title: 'Установка для Chrome и Firefox — AntiRacketMantis',
    desc: 'Пошаговая инструкция по установке AntiRacketMantis в Google Chrome и Mozilla Firefox, статус публикации в магазинах и проверка первых настроек.'
  },
  uninstall: {
    title: 'Как удалить расширение — AntiRacketMantis',
    desc: 'Инструкция по удалению AntiRacketMantis в Chrome и Firefox, а также объяснение того, что происходит с локальными настройками и журналом.'
  },
  limits: {
    title: 'Известные ограничения защиты — AntiRacketMantis',
    desc: 'Честные границы фильтрации: встроенная реклама, cookie-баннеры, нужные окна для входа и оплаты, побочные эффекты строгих уровней и различия браузеров.'
  },
  compatibility: {
    title: 'Совместимость с браузерами — AntiRacketMantis',
    desc: 'Поддерживаемые версии Google Chrome / Chromium (от 110) и Mozilla Firefox (от 128), технические ограничения и особенности работы.'
  },
  privacy: {
    title: 'Политика конфиденциальности — AntiRacketMantis',
    desc: 'Данные сайта (не собираются), локальное хранение настроек расширения, назначение разрешений браузера и прозрачность сетевых обращений.'
  },
  terms: {
    title: 'Пользовательское соглашение (черновик) — AntiRacketMantis',
    desc: 'Предварительный черновик пользовательского соглашения AntiRacketMantis: лицензия, допустимое использование, отсутствие гарантий, ответственность и открытые вопросы.'
  },
  faq: {
    title: 'Частые вопросы (FAQ) — AntiRacketMantis',
    desc: 'Ответы на частые вопросы о публикации AntiRacketMantis, уровнях защиты, рекламе, cookie-баннерах, совместимости с браузерами и приватности.'
  },
  support: {
    title: 'Поддержка и решение проблем — AntiRacketMantis',
    desc: 'Что делать, если сайт перестал открываться, появилось всплывающее окно или осталась реклама, и как связаться со студией WillowinWorlds.'
  },
  changelog: {
    title: 'История обновлений — AntiRacketMantis',
    desc: 'Фактические изменения и состав текущей предрелизной версии 0.11.0 расширения AntiRacketMantis для Chrome и Firefox.'
  },
  404: {
    title: 'Страница не найдена (404) — AntiRacketMantis',
    desc: 'Запрошенная страница не найдена. Перейдите на главную страницу, в инструкцию по установке, раздел возможностей или поддержку AntiRacketMantis.'
  }
};

function buildJsonLd(lang, kind, canonical, desc) {
  const studioOrg = {
    '@type': 'Organization',
    name: 'WillowinWorlds',
    url: STUDIO
  };

  if (kind === 'home') {
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

  if (kind === '404') return null;

  const meta = pageMeta[kind];
  const shortLabel = meta.title.split(' — ')[0];
  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE + url(lang) },
      { '@type': 'ListItem', position: 2, name: shortLabel, item: canonical }
    ]
  };

  if (kind === 'faq') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        breadcrumb,
        {
          '@type': 'FAQPage',
          mainEntity: faqData.map(item => ({
            '@type': 'Question',
            name: item.q[lang],
            acceptedAnswer: { '@type': 'Answer', text: item.a[lang] }
          }))
        }
      ]
    };
  }

  return { '@context': 'https://schema.org', ...breadcrumb };
}

function htmlPage(lang, kind) {
  const meta = pageMeta[kind];
  const title = meta.title;
  const desc = meta.desc;
  const route = kind === 'home' ? '' : kind === '404' ? '404.html' : `${kind}/`;
  const canonical = SITE + url(lang, route);
  const ld = buildJsonLd(lang, kind, canonical, desc);

  const heroMascotByKind = {
    home: '/assets/mascot.svg',
    install: '/assets/mascot.svg',
    compatibility: '/assets/mascot.svg',
    features: '/assets/mascot-block.svg',
    limits: '/assets/mascot-block.svg',
    privacy: '/assets/mascot-block.svg',
    'how-it-works': '/assets/mascot-thinking.svg',
    uninstall: '/assets/mascot-thinking.svg',
    terms: '/assets/mascot-thinking.svg',
    faq: '/assets/mascot-thinking.svg',
    support: '/assets/mascot-thinking.svg',
    404: '/assets/mascot-thinking.svg',
    changelog: '/assets/mascot-celebrate.svg'
  };
  const preloadMascot = heroMascotByKind[kind] || '/assets/mascot.svg';

  const csp = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'";

  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="theme-color" content="#d9f3dc">
  <meta http-equiv="Content-Security-Policy" content="${csp}">
  <meta name="referrer" content="no-referrer">
  ${kind === '404' ? '<meta name="robots" content="noindex">' : ''}
  <title>${title}</title>
  <meta name="description" content="${escapeAttr(desc)}">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="/assets/mark.svg" type="image/svg+xml">
  <link rel="preload" href="/assets/fonts/nunito-cyrillic.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="${preloadMascot}" as="image" type="image/svg+xml" fetchpriority="high">
  <link rel="stylesheet" href="/assets/styles.css">
  <link rel="stylesheet" href="/assets/${kind === 'home' ? 'home.css' : 'inner.css'}">
  <noscript><link rel="stylesheet" href="/assets/nojs.css"></noscript>
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="AntiRacketMantis">
  <meta property="og:title" content="${escapeAttr(title)}">
  <meta property="og:description" content="${escapeAttr(desc)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:locale" content="${lang === 'ru' ? 'ru_RU' : lang === 'tr' ? 'tr_TR' : 'en_US'}">
  <meta property="og:image" content="${SITE}/assets/og.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="AntiRacketMantis — интернет без рекламы, трекеров и лишних окон">
  <meta name="twitter:card" content="summary_large_image">
  ${(LANGS.length > 1 ? LANGS : []).map(l => `<link rel="alternate" hreflang="${l}" href="${SITE}${url(l, route)}">`).join('')}
  ${ld ? `<script type="application/ld+json">${JSON.stringify(ld)}</script>` : ''}
  <script src="/assets/main.js" defer></script>
</head>
<body data-lang="${lang}" data-page="${kind}">
${header(lang, kind)}
${kind === 'home' ? home(lang) : detailPage(lang, kind)}
${footer(lang)}
<div class="toast" role="status" aria-live="polite"></div>
</body>
</html>`;
}

function write(file, content) {
  const p = path.join(DEST, file);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content);
}

const ROUTES = [
  'home',
  'features',
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

if (fs.existsSync(DEST)) {
  fs.rmSync(DEST, { recursive: true, force: true });
}

for (const l of LANGS) {
  for (const k of ROUTES) {
    const out = `${l === 'ru' ? '' : `${l}/`}${k === 'home' ? 'index.html' : `${k}/index.html`}`;
    write(out, htmlPage(l, k));
  }
}

write('404.html', htmlPage('ru', '404'));
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);

const sitemapEntries = LANGS.flatMap(l =>
  ROUTES.map(k => (k === 'home' ? '' : `${k}/`)).map(p => `<url><loc>${SITE}${url(l, p)}</loc></url>`)
);
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.join('\n')}\n</urlset>\n`);

const serverHeaders = `# Security & cache headers for static hosting (Cloudflare Pages / Netlify compatible)
/*
  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Cross-Origin-Opener-Policy: same-origin
  Cache-Control: public, max-age=300, must-revalidate

/assets/*
  Cache-Control: public, max-age=604800, stale-while-revalidate=86400

/assets/fonts/*
  Cache-Control: public, max-age=31536000, immutable
`;
write('_headers', serverHeaders);

function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .join('')
    .replace(/\s*([{}:;,])\s*/g, '$1')
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
for (const file of ['mascot.svg', 'mascot-block.svg', 'mascot-celebrate.svg', 'mascot-thinking.svg', 'mark.svg', 'og.svg', 'og.png']) {
  const srcPath = path.join(ROOT, 'src', file);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, path.join(DEST, 'assets', file));
  }
}

fs.mkdirSync(path.join(DEST, 'assets', 'fonts'), { recursive: true });
for (const file of fs.readdirSync(path.join(ROOT, 'src', 'fonts'))) {
  fs.copyFileSync(path.join(ROOT, 'src', 'fonts', file), path.join(DEST, 'assets', 'fonts', file));
}

const screenshotsSrc = path.join(ROOT, 'src', 'screenshots');
if (fs.existsSync(screenshotsSrc)) {
  fs.mkdirSync(path.join(DEST, 'assets', 'screenshots'), { recursive: true });
  for (const file of fs.readdirSync(screenshotsSrc)) {
    fs.copyFileSync(path.join(screenshotsSrc, file), path.join(DEST, 'assets', 'screenshots', file));
  }
}

console.log(`Generated ${LANGS.length * ROUTES.length + 1} HTML pages for AntiRacketMantis`);
checkDist();
