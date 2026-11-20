import { SITE, STUDIO, VERSION } from './config.mjs';

export default {
  ui: {
    langName: 'Türkçe',
    skipToContent: 'İçeriğe geç',
    brandHomeAria: 'AntiRacketMantis — ana sayfa',
    mainNavAria: 'Ana gezinme menüsü',
    langSwitcherAria: 'Dil seçimi',
    breadcrumbsAria: 'Sayfa yolu',
    homeLabel: 'Ana sayfa',
    openMenu: 'Menüyü aç',
    closeMenu: 'Menüyü kapat',
    motionOff: 'Animasyonları durdur',
    motionOn: 'Animasyonları oynat',
    footerAboutAria: 'Uzantı hakkında',
    footerAboutHeading: 'Uzantı',
    footerTrustAria: 'Belgeler ve yardım',
    footerTrustHeading: 'Güven ve Yardım',
    footerLangAria: 'Site dilleri',
    footerLangHeading: 'Site dili',
    madeFor: 'Daha sakin bir internet için tasarlandı',
    company: 'Geliştirici stüdyo:',
    versionLine: 'Sürüm',
    statusLine: 'ilk yayına hazırlanıyor',
    ogImageAlt: 'AntiRacketMantis — reklam, izleyici ve açılır pencere azaltıcı tarayıcı uzantısı',
    more: 'Ayrıntılar',
    allFeatures: 'Tüm özellikler',
    howItWorksLink: 'Nasıl çalışır',
    installCta: 'Kurulum',
    freeVersionCta: 'Ücretsiz sürümü yükle',
    proNavLabel: 'PRO',
    soonBadge: 'yakında',
    devBadge: 'Geliştiriliyor',
    plannedPriceLabel: 'planlanan fiyat',
    perMonth: '/ ay',
    illustrationLabel: 'Temsili görsel',
    screenshotBadgePrefix: `Sürüm ${VERSION} ekran görüntüsü (İngilizce arayüz)`,
    browserWindowTitle: 'AntiRacketMantis penceresi',
    chromeBtnLabel: 'Chrome için',
    firefoxBtnLabel: 'Firefox için',
    chromeSoonText: 'yakında',
    firefoxSoonText: 'yakında',
    levelPrefix: 'Seviye',
    exploreFeatures: 'Özellikleri incele',
    installGuideLink: 'Kurulum rehberi'
  },

  nav: [
    { route: 'features', label: 'Özellikler' },
    { route: 'how-it-works', label: 'Nasıl çalışır' },
    { route: 'pro', label: 'PRO' },
    { route: 'privacy', label: 'Gizlilik' },
    { route: 'faq', label: 'SSS' },
    { route: 'support', label: 'Destek' }
  ],

  footerProductLinks: [
    ['features', 'Özellikler'],
    ['features/ad-blocker', 'Reklam engelleyici'],
    ['features/tracker-blocker', 'İzleyici koruması'],
    ['features/cookie-banners', 'Çerez bildirimleri'],
    ['features/popup-blocker', 'Açılır pencereler'],
    ['pro', 'AntiRacketMantis PRO (geliştiriliyor)'],
    ['how-it-works', 'Nasıl çalışır'],
    ['install', 'Kurulum'],
    ['uninstall', 'Kaldırma'],
    ['compatibility', 'Uyumluluk'],
    ['limits', 'Bilinen sınırlar']
  ],

  footerTrustLinks: [
    ['privacy', 'Gizlilik Politikası'],
    ['terms', 'Kullanım Koşulları'],
    ['faq', 'Sıkça Sorulan Sorular'],
    ['support', 'Destek'],
    ['changelog', 'Sürüm geçmişi ve yol haritası']
  ],

  meta: {
    home: {
      title: 'AntiRacketMantis — Chrome ve Firefox Reklam Engelleyici',
      desc: 'Chrome ve Firefox için ücretsiz AntiRacketMantis uzantısı: reklam engelleme, izleyici koruması, çerez bildirimi reddi, açılır pencere kontrolü ve 5 seviye.',
      breadcrumb: 'Ana sayfa'
    },
    features: {
      title: 'Tarayıcı Koruma Özellikleri — AntiRacketMantis',
      desc: 'AntiRacketMantis’in altı koruma aracı: reklam engelleme, izleyici koruması, çerez bildirimleri, açılır pencere kontrolü, parmak izi ayarları ve istisnalar.',
      breadcrumb: 'Özellikler'
    },
    'features/ad-blocker': {
      title: 'Chrome ve Firefox Reklam Engelleyici — AntiRacketMantis',
      desc: 'Chrome ve Firefox için Manifest V3 ağ kuralları ve kozmetik filtreler: daha az banner ve boş reklam alanı, dürüst sınırlar ve tek tıkla site istisnası.',
      breadcrumb: 'Reklam engelleyici'
    },
    'features/tracker-blocker': {
      title: 'İzleyici Engelleyici ve URL Temizleme — AntiRacketMantis',
      desc: 'Chrome ve Firefox’ta yerleşik EasyPrivacy listeleriyle izleyicileri engelleyin, UTM takip etiketlerini temizleyin ve Sec-GPC/DNT sinyali gönderin.',
      breadcrumb: 'İzleyici koruması'
    },
    'features/cookie-banners': {
      title: 'Çerez Bildirimi Yönetimi — AntiRacketMantis',
      desc: 'Chrome ve Firefox’ta desteklenen onay pencerelerinde isteğe bağlı çerezleri otomatik reddedin. Bağımsız ayar, dürüst sınırlar ve çalışan oturum çerezleri.',
      breadcrumb: 'Çerez bildirimleri'
    },
    'features/popup-blocker': {
      title: 'Açılır Pencere (Pop-up) Engelleyici — AntiRacketMantis',
      desc: 'Chrome ve Firefox’ta tıklamanız olmadan açılan pop-up ve arka plan sekmelerini durdururken giriş ve ödeme pencerelerini koruyun.',
      breadcrumb: 'Açılır pencereler'
    },
    pro: {
      title: 'AntiRacketMantis PRO (Geliştiriliyor) — $39/ay Planlanan',
      desc: 'Geliştirilmekte olan AntiRacketMantis PRO ($39/ay planlanan fiyat): aynı uzantıda yerel yapay zekâ, CAPTCHA yardımı ve otomasyon. Temel koruma ücretsizdir.',
      breadcrumb: 'PRO (geliştiriliyor)'
    },
    'how-it-works': {
      title: 'Koruma ve 5 Seviye Nasıl Çalışır? — AntiRacketMantis',
      desc: 'AntiRacketMantis’in çalışma düzeni: Manifest V3 declarativeNetRequest listeleri, kozmetik gizleme, çerez reddi, JSON aktarımı ve 5 koruma seviyesi.',
      breadcrumb: 'Nasıl çalışır'
    },
    install: {
      title: 'Chrome ve Firefox Kurulum Rehberi — AntiRacketMantis',
      desc: 'Google Chrome ve Mozilla Firefox için adım adım AntiRacketMantis kurulum rehberi, mağaza yayın durumu ve kurulum sonrası kontrol listesi.',
      breadcrumb: 'Kurulum'
    },
    uninstall: {
      title: 'Uzantı Nasıl Kaldırılır? — AntiRacketMantis',
      desc: 'Chrome ve Firefox tarayıcılarından AntiRacketMantis’i saniyeler içinde kaldırma adımları ve yerel ayarlarınızla günlüğün nasıl silindiği.',
      breadcrumb: 'Kaldırma'
    },
    limits: {
      title: 'Bilinen Koruma Sınırları — AntiRacketMantis',
      desc: 'Tarayıcı filtrelemesinin dürüst sınırları: birinci taraf reklamlar, çerez pencereleri, giriş ekranları, sıkı seviye yan etkileri ve sistem sayfaları.',
      breadcrumb: 'Bilinen sınırlar'
    },
    compatibility: {
      title: 'Tarayıcı Uyumluluğu — AntiRacketMantis',
      desc: 'Desteklenen Google Chrome / Chromium (110+) ve Mozilla Firefox (128+) sürümleri, Manifest V3 kural sınırları ve yerel ağ istisnaları.',
      breadcrumb: 'Uyumluluk'
    },
    privacy: {
      title: 'Gizlilik Politikası (Taslak) — AntiRacketMantis',
      desc: 'İzleyici içermeyen web sitesi, yerel uzantı depolaması, tarayıcı izinlerinin açıklaması, ağ modülleri ve yayın öncesi denetim durumu.',
      breadcrumb: 'Gizlilik Politikası'
    },
    terms: {
      title: 'Kullanım Koşulları (Taslak) — AntiRacketMantis',
      desc: 'AntiRacketMantis taslak Kullanım Koşulları: kişisel kullanım lisansı, kabul edilebilir kullanım, sorumluluk sınırları ve açık hukuki sorular.',
      breadcrumb: 'Kullanım Koşulları'
    },
    faq: {
      title: 'Sıkça Sorulan Sorular (SSS) — AntiRacketMantis',
      desc: 'AntiRacketMantis kurulumu, izinler, veri kullanımı, performans, tarayıcı uyumluluğu, planlanan PRO sürümü ve kaldırma hakkında net yanıtlar.',
      breadcrumb: 'SSS'
    },
    support: {
      title: 'Destek ve Sorun Giderme — AntiRacketMantis',
      desc: 'Bir site bozulduğunda, açılır pencere çıktığında veya reklam kaldığında yapabileceğiniz hızlı kontroller ve WillowinWorlds stüdyo iletişimi.',
      breadcrumb: 'Destek'
    },
    changelog: {
      title: 'Sürüm Geçmişi ve Yol Haritası — AntiRacketMantis',
      desc: 'Chrome ve Firefox için yayın öncesi 0.11.0 sürümünün doğrulanmış içeriği ile tamamlanan, süren ve planlanan çalışmaların yol haritası.',
      breadcrumb: 'Sürüm geçmişi'
    }
  },

  home: {
    badge: 'Sakin dijital koruyucunuzla tanışın',
    heroA: 'Daha az gürültü.',
    heroB: 'Daha sakin internet.',
    heroText: 'Chrome ve Firefox için ücretsiz tarayıcı uzantısı: rahatsız edici reklamları, izleyicileri, çerez bildirimlerini ve istenmeyen açılır pencereleri 5 anlaşılır seviyeyle azaltır.',
    heroPopupAlt: 'Gerçek AntiRacketMantis penceresi (İngilizce arayüz): example.org üzerinde koruma açık, seviye 2/5',
    heroMascotAlt: 'AntiRacketMantis maskotu peygamberdevesi Minty el sallayarak karşılıyor',
    adBlockChip: 'Reklamlar azaltıldı',
    trackersChip: 'İzleyiciler sınırlandı',
    online: 'Daha temiz. Daha sakin. Sizin.',
    demoNote: `✧ Uzantı penceresi — ${VERSION} sürümünün gerçek ekran görüntüsü (İngilizce arayüz)`,

    compare: {
      tag: 'Farkı görün',
      title: 'Kalabalık bir sayfanın nasıl sakinleştiğini görün',
      text: 'Dikkat dağıtıcı öğelerle dolu örnek bir sayfayı daha düzenli okuma görünümüyle karşılaştırmak için kaydırıcıyı hareket ettirin.',
      limitsLink: 'Uzantının neleri gizlemediğini ve nedenini okuyun',
      without: 'Korumasız',
      with: 'Korumalı',
      sampleTitle: 'Sevdiğiniz dergi',
      sampleCopy: 'Hiçbir şey dikkatinizi dağıtmadığında keyifle okunan bir yazı.',
      ad: 'REKLAM',
      cookie: 'Tüm çerezler kabul edilsin mi?',
      popup: 'Bültene hemen katılın!',
      caption: 'Temsili görsel — gerçek bir site ölçümü değildir'
    },

    features: {
      tag: 'Her şey bir arada',
      title: 'Sakin gezinme için altı araç',
      intro: 'Chrome ve Firefox için reklam filtreleri, izleyici koruması, çerez bildirimi yönetimi, açılır pencere kontrolü, gizlilik ayarları ve esnek istisnalar.',
      howLink: 'Arka planda nasıl çalışır'
    },

    levels: {
      tag: 'Beş koruma seviyesi',
      title: 'Hafif filtrelemeden sıkı gizliliğe',
      intro: 'Sayfa sakinliği ile site uyumluluğu arasındaki dengeyi kendiniz seçersiniz. Varsayılan olarak Seviye 2 açıktır.',
      detailLink: 'Her seviyeyi ayrıntılı inceleyin'
    },

    proTeaser: {
      tag: 'Tek uzantı · geliştirme planı',
      badge: 'Geliştiriliyor',
      title: 'Temel koruma ücretsizdir. PRO aynı uzantı içinde hazırlanıyor.',
      text: 'Reklam, izleyici, çerez bildirimi ve açılır pencere koruması ücretsiz kalır. İleride yerel yapay zekâ modelleri ve rutin tarayıcı otomasyonu isteyenler için PRO aboneliği geliştirme aşamasındadır.',
      freeTitle: 'Temel koruma',
      freePrice: 'Ücretsiz',
      freePoints: [
        'Ağ ve sayfa düzeyinde reklam engelleme',
        'İzleyici, bağlantı etiketi ve zararlı alan adı koruması',
        'İsteğe bağlı çerez reddi ve açılır pencere kontrolü',
        '5 koruma seviyesi, site istisnaları ve JSON aktarımı'
      ],
      proTitle: 'AntiRacketMantis PRO',
      proPrice: '$39',
      proPriceLabel: 'planlanan fiyat',
      proPoints: [
        'Ücretsiz sürümdeki tüm koruma özellikleri',
        'Yapay zekâ destekli CAPTCHA tanıma yardımı (yerel çalışma planlanır)',
        'Yerel sinir ağları ve görüntü analizi',
        'Gelişmiş tarayıcı otomasyonu ve ek araçlar'
      ],
      disclaimer: 'PRO şu anda geliştiriliyor ve henüz kullanıma sunulmadı. Ödeme ekranı yoktur, çıkış tarihi belirlenmemiştir ve hiçbir sitede doğrulamanın geçileceği vadedilmez.',
      primaryCta: 'PRO planlarını incele',
      secondaryCta: 'Yayın durumunu takip et'
    },

    interface: {
      tag: 'Gerçek arayüz',
      title: 'Uzantı arayüzüne yakından bakın',
      text: 'AntiRacketMantis penceresi ve koruma ayarlarından gerçek ekran görüntüleri. Uzantının henüz Türkçe arayüzü olmadığı için görüntüler İngilizce arayüzden alınmıştır.',
      allLink: 'Tüm ayar ve filtre listesi görüntülerini görün'
    },

    steps: {
      tag: 'Başlamak kolay',
      title: 'Daha sakin internet için üç adım',
      items: [
        ['Kurulum rehberini inceleyin', 'Mağaza yayını öncesinde Chrome (110+) veya Firefox (128+) gereksinimlerini ve tarayıcı izinlerini görün.'],
        ['Tarayıcınıza ekleyin', 'Chrome Web Store ve Firefox Add-ons yayınının ardından kurulumu onaylayıp simgeyi araç çubuğuna sabitleyin.'],
        ['Kendi dengenizi seçin', '1 ile 5 arasında koruma seviyenizi belirleyin; gerektiğinde herhangi bir sitede korumayı tek tıkla duraklatın.']
      ]
    },

    trust: {
      tag: 'Gizlilik önceliğimiz',
      title: 'Güven, açık iletişimle başlar',
      text: 'Muallak vaatler yok. Nelerin tarayıcıda yerel çalıştığını, hangi izinlerin neden istendiğini ve filtrelemenin sınırlarını açıkça paylaşıyoruz.',
      bullets: [
        'Bir site bozulduğunda veya erişimi engellediğinde tek tıkla site bazlı duraklatma anahtarı',
        'Uyumluluktan Maksimuma kadar beş şeffaf koruma seviyesi',
        'Ayarlar, site istisnaları ve tanılama günlüğü tarayıcınızda yerel olarak saklanır'
      ],
      privacyBtn: 'Gizlilik Politikası',
      limitsBtn: 'Bilinen sınırlar'
    },

    permissions: {
      tag: 'İzinlerde şeffaflık',
      title: 'Hangi izinler neden istenir?',
      intro: 'Kurulum sırasında tarayıcınız bu izinleri gösterir. Her birinin gerçekte ne için kullanıldığını sade dille özetledik.',
      devTitle: 'Geliştirici hakkında',
      devText: 'AntiRacketMantis, bağımsız oyun ve uygulama stüdyosu WillowinWorlds tarafından geliştirilir. Amacımız, sınırları açıkça anlatılan sade ve güvenilir araçlar üretmektir.',
      devLink: 'WillowinWorlds web sitesi',
      helpTitle: 'Bir site düzgün çalışmazsa',
      helpText: 'Uzantı penceresinden o site için korumayı kapatıp sayfayı yenileyin. Ayrıntılar için Bilinen Sınırlar ve Destek sayfalarına göz atın.',
      detailsLink: 'İzinlerin ayrıntılı açıklaması',
      uninstallLink: 'Kaldırma ve veri temizleme',
      dialogSub: 'tarayıcı erişimi istiyor',
      perms: [
        ['Sitelerdeki verileri okuma ve değiştirme (http/https + scripting)', 'Reklam kutularını gizlemek, desteklenen çerez bildirimlerini reddetmek, istenmeyen açılır pencereleri durdurmak ve parmak izi kurallarını uygulamak için kullanılır.'],
        ['Ağ isteklerini engelleme ve düzenleme (declarativeNetRequest)', 'Tarayıcı motorunun kendisi, yerleşik kural listeleriyle reklam ve izleyici isteklerini keser ve bağlantılardaki takip etiketlerini temizler.'],
        ['Etkin sekmeyi ve sekmeleri görme (tabs, activeTab)', 'Açık sitenin koruma durumunu göstermek, o site için istisna eklemek ve sekmeyi yenilemek için kullanılır.'],
        ['Ayarları yerel depolama (storage)', 'Koruma seviyenizi, çerez bildirimi tercihinizi, istisna listesini ve yerel olay günlüğünü tarayıcı profilinizde saklar.']
      ],
      note: 'Kesin veri akışı açıklamaları ve nihai Gizlilik Politikası, yayın öncesi paket denetimi tamamlandığında kesinleşecektir.'
    },

    faq: {
      tag: 'Kurulum öncesi',
      title: 'En çok merak edilen sorular',
      allLink: 'Tüm sorular ve yanıtlar',
      supportLink: 'Destek sayfası',
      mascotAlt: 'Peygamberdevesi Minty soruları düşünerek yanıt arıyor'
    },

    final: {
      tag: 'Daha sakin bir internete hazır mısınız?',
      title: 'Önemli olan her zaman göz önünde kalsın.',
      text: 'AntiRacketMantis temel koruması ücretsiz kalır. Yayın öncesinde tarayıcı uyumluluğunu ve kurulum adımlarını inceleyebilirsiniz.',
      compatNote: 'Chrome (110+) ve Firefox (128+) sürümleri hazırlanıyor. Diğer tarayıcılar test edilmeden vadedilmez.',
      compatLink: 'Uyumluluk',
      installLink: 'Kurulum rehberi',
      mascotAlt: 'Peygamberdevesi Minty daha sakin bir interneti kutluyor'
    }
  },

  featuresHub: {
    eyebrow: 'Koruma özellikleri',
    title: 'AntiRacketMantis neler yapar?',
    lead: 'Chrome ve Firefox için birbiriyle uyumlu altı araç: reklam engelleme, izleyici koruması, çerez bildirimi reddi, açılır pencere kontrolü, gizlilik ayarları ve site istisnaları.',
    mascotAlt: 'Kalkanını tutan peygamberdevesi Minty',
    deepLinksIntro: 'Temel koruma alanlarını ayrıntılı inceleyin:',
    items: [
      {
        id: 'ads',
        route: 'features/ad-blocker',
        tone: 'lime',
        icon: 'ad',
        cardTitle: 'Daha az rahatsız edici reklam',
        cardText: 'Banner ve yanıp sönen kutular yerine okuduğunuz içeriğe odaklanın.',
        title: 'Ağ ve sayfa düzeyinde reklam engelleme',
        summary: 'Üçüncü taraf reklam bannerlarını, ağır reklam betiklerini ve boş kutuları azaltarak sayfaları daha okunaklı kılar.',
        details: 'Yerleşik uBlock filters, EasyList, RU AdList, Peter Lowe ve AdGuard Turkish listelerine dayanan ağ kuralları, bilinen reklam alan adlarına giden istekleri yüklenmeden durdurur. Seviye 3 (Dengeli) ve üzerinde kozmetik filtreler sayfa içinde kalan reklam bloklarını da gizler.',
        limit: 'Sınır: İçerikle aynı alan adından sunulan birinci taraf reklamlar veya yeni sayfa yapıları, yerleşik listeler güncellenene kadar görünebilir.',
        tags: ['Ağ kuralları', 'Kozmetik filtreler', 'Seviye 2–3’ten itibaren'],
        ctaLabel: 'Reklam engellemeyi incele'
      },
      {
        id: 'tracking',
        route: 'features/tracker-blocker',
        tone: 'sky',
        icon: 'eye',
        cardTitle: 'Daha az siteler arası takip',
        cardText: 'Bilinen analiz sayaçlarını, takip piksellerini ve bağlantı etiketlerini sınırlandırır.',
        title: 'İzleyici ve bağlantı etiketi koruması',
        summary: 'Bilinen üçüncü taraf izleyicileri, zararlı alan adlarını ve URL takip parametrelerini keser.',
        details: 'Seviye 2’den itibaren EasyPrivacy, RU AdList: Counters ve uBO Badware listeleri tarayıcı motorunda çalışır. Seviye 3’ten itibaren bağlantılardaki utm_* ve fbclid gibi takip parametreleri temizlenir, Sec-GPC ve DNT sinyalleri gönderilir.',
        limit: 'Sınır: Hiçbir tarayıcı uzantısı tam anonimlik sağlamaz; internet sağlayıcınız ve ziyaret ettiğiniz site IP adresinizi ve ziyaretinizi görmeye devam eder.',
        tags: ['EasyPrivacy', 'URL temizleme', 'Sec-GPC ve DNT'],
        ctaLabel: 'İzleyici korumasını incele'
      },
      {
        id: 'cookies',
        route: 'features/cookie-banners',
        tone: 'peach',
        icon: 'cookie',
        cardTitle: 'Çerez pencereleri kontrol altında',
        cardText: 'Desteklenen onay pencerelerinde isteğe bağlı çerezleri otomatik reddetmeye çalışır.',
        title: 'Sakin çerez bildirimi yönetimi',
        summary: 'Onay penceresi desteklediğinde “Tümünü kabul et” yerine isteğe bağlı çerezleri reddetmeyi seçer.',
        details: 'Çerez bildirimleri ayarı 1–5 koruma seviyelerinden bağımsızdır: varsayılan olarak uyumlu onay pencerelerinde isteğe bağlı çerezleri reddeder. Seviye 4 ve üzerinde üçüncü taraf çerez bildirimi betikleri ve üçüncü taraf çerezler de engellenir.',
        limit: 'Sınır: Bir site reddetme seçeneği sunmuyorsa yalnızca bildirimi gizlemek teknik reddetme anlamına gelmez; siteler gerekli güvenlik çerezlerini ayarlayabilir.',
        tags: ['Bağımsız ayar', 'Önce reddet', 'Dürüst sınırlar'],
        ctaLabel: 'Çerez bildirimlerini incele'
      },
      {
        id: 'popups',
        route: 'features/popup-blocker',
        tone: 'lilac',
        icon: 'popup',
        cardTitle: 'Daha az istenmeyen pencere',
        cardText: 'Tıklamanız olmadan açılan pop-up ve arka plan sekmelerini azaltır.',
        title: 'Açılır pencere ve yeni sekme kontrolü',
        summary: 'Siz tıklamadan açılmaya çalışan pop-up pencerelerini ve arka plan (pop-under) sekmelerini durdurur.',
        details: 'Seviye 3 (Dengeli) ile birlikte etkinleşen hafif koruma, sayfa betiklerinin kendiliğinden reklam penceresi açmasını sınırlar; giriş ve ödeme akışlarını korumaya çalışır.',
        limit: 'Sınır: OAuth giriş, banka onayı ve ödeme pencereleri normal çalışmalıdır; bir pencere engellenirse ilgili sitede korumayı tek tıkla kapatabilirsiniz.',
        tags: ['Pop-up koruması', 'Pop-under koruması', 'Giriş ve ödeme dostu'],
        ctaLabel: 'Açılır pencere kontrolünü incele'
      },
      {
        id: 'privacy',
        route: null,
        tone: 'mint',
        icon: 'lock',
        cardTitle: 'Abartısız, şeffaf gizlilik',
        cardText: 'Anlaşılır araçlar: gizlilik başlıkları, parmak izi koruması ve sıkı HTTPS.',
        title: 'Ek gizlilik araçları',
        summary: 'Canvas maskeleme anahtarı, Seviye 5 parmak izi koruması, ping engelleme ve HTTPS yönlendirmesi.',
        details: 'Uzantı penceresinde deneysel Canvas maskeleme anahtarı yer alır. Seviye 5 (Maksimum) ise kapsamlı parmak izi koruması (canvas, WebGL, ses ve genel işlemci çekirdek sayısı), üçüncü taraf ping/CSP rapor engelleme ve özel yerel ağlar hariç HTTPS geçişi ekler.',
        limit: 'Sınır: Parmak izi gürültüsü her sayfa yüklemesinde değiştiğinden bazı siteler daha sık doğrulama isteyebilir.',
        tags: ['Canvas / WebGL', 'Ping engelleme', 'Seviye 5 HTTPS'],
        ctaLabel: 'Nasıl çalışır bölümüne git'
      },
      {
        id: 'filters',
        route: null,
        tone: 'butter',
        icon: 'sliders',
        cardTitle: 'Sizin seviyeleriniz ve istisnalarınız',
        cardText: 'Beş hazır koruma seviyesi ve her site için tek tıkla duraklatma.',
        title: 'Koruma seviyeleri ve site istisnaları',
        summary: 'Beş seviye arasında istediğiniz an geçiş yapın, 100’e kadar alan adını istisna ekleyin ve ayarları JSON olarak aktarın.',
        details: 'Uyumluluk (1) ile Maksimum (5) arasında rahatça geçiş yapabilir, bozulan siteleri alt alan adlarıyla birlikte istisna listesine ekleyebilir ve hesap açmadan JSON dışa/içe aktarma yapabilirsiniz.',
        limit: 'Sınır: Seviye veya istisna değişiklikleri sekmeyi yeniledikten sonra yeni yüklemelerde geçerli olur; uzantı bunun için bir yenileme düğmesi gösterir.',
        tags: ['5 seviye', 'Alan adı istisnaları', 'JSON aktarımı'],
        ctaLabel: '5 seviyeyi incele'
      }
    ],
    nudge: {
      title: 'Daha yakından bakmak ister misiniz?',
      text: '5 seviyenin teknik yapısını, PRO planlarını veya bilinen sınırları inceleyin.',
      actions: [
        ['how-it-works', 'Nasıl çalışır', 'btn-primary'],
        ['pro', 'Planlanan PRO sürümü', 'btn-secondary'],
        ['limits', 'Bilinen sınırlar', 'btn-cream']
      ]
    }
  },

  featurePages: {
    'features/ad-blocker': {
      id: 'ad-blocker',
      tone: 'lime',
      icon: 'ad',
      eyebrow: 'Reklam engelleyici · Chrome ve Firefox',
      title: 'Gürültüsüz reklam engelleme',
      lead: 'AntiRacketMantis, Manifest V3 kurallarıyla üçüncü taraf reklam bannerlarını, ağır reklam betiklerini ve boş kutuları azaltarak yazıları ve web araçlarını daha rahat okumanızı sağlar.',
      mascotAlt: 'Kalkanıyla sayfayı reklam karmaşasından koruyan peygamberdevesi Minty',
      whatTitle: 'Reklam engelleyici ne yapar?',
      whatParagraphs: [
        'Uzantı, bilinen reklam ağlarına giden istekleri banner ve ağır betikler yüklenmeden önce keser. Seviye 3 (Dengeli) ve üzerinde kozmetik kurallar sayfa düzeninde kalan reklam kutularını ve boş alanları da gizler.',
        'Filtreleme, Google Chrome (110+) ve Mozilla Firefox (128+) tarayıcılarında yerleşik kural listeleriyle yerel olarak çalışır; gezinme geçmişiniz hiçbir geliştirici sunucusuna gönderilmez.'
      ],
      howTitle: 'Sade dille nasıl çalışır?',
      howParagraphs: [
        'Ağ katmanında tarayıcı motoru, standart declarativeNetRequest API üzerinden istekleri yerleşik listelerle eşleştirir (Seviye 2’de Peter Lowe; Seviye 3’te uBlock filters, EasyList, RU AdList ve AdGuard Turkish). Listeler uBlock Origin Lite 2026.1116.1650 tabanlı olarak uzantının içine gömülüdür; gezinirken uzaktan indirme yapılmaz.',
        'Kozmetik katmanda (Seviye 3+) içerik betikleri boş reklam çerçevelerini gizleyerek sayfa akışını sade tutar.'
      ],
      benefitsTitle: 'Günlük kullanımda sağladığı kolaylıklar',
      benefits: [
        { title: 'Sıkılık derecesi sizin elinizde', text: 'Varsayılan Seviye 2 yüksek uyumluluk için hafif ağ filtrelemesi sunar; Seviye 3 tam reklam listelerini ve kozmetik gizlemeyi açar.' },
        { title: 'Tek site için tek tıkla duraklatma', text: 'Bir site reklam engelleyiciyi kapatmanızı isterse veya düzeni bozulursa uzantı penceresinden o site için korumayı kapatıp sayfayı yenilemeniz yeterlidir.' },
        { title: 'Gezinirken arka plan indirmesi yok', text: 'Tüm filtre listeleri uzantı paketinin içindedir ve yalnızca uzantı güncellemeleriyle yenilenir.' }
      ],
      scene: {
        label: 'Temsili görsel',
        title: 'Bir haber veya makale sayfasındaki değişim',
        caption: 'Ağ ve kozmetik filtrelemenin çalışma mantığını gösteren temsili çizim (hız ölçümü veya gerçek site görüntüsü değildir).',
        beforeTitle: 'Filtreleme olmadan',
        beforeItems: ['Başlığı aşağı iten üst reklam bannerı', 'Kenar çubuğu reklamları ve dikkat dağıtan kutular', 'Boş çerçeveler ve üçüncü taraf reklam betikleri'],
        afterTitle: 'Seviye 3 (Dengeli) ile',
        afterItems: ['Başlık ve makale metni doğrudan odak noktasında', 'Bilinen reklam alan adları tarayıcı tarafından durdurulur', 'Kozmetik kurallar boş kalan reklam alanlarını gizler']
      },
      exampleTitle: 'Günlük kullanım örneği',
      exampleText: 'Chrome veya Firefox’ta uzun bir makale ya da rehber açtınız. Varsayılan Seviye 2’de Peter Lowe listesindeki reklam alan adları zaten durdurulur; Seviye 3 (Dengeli) seçeneğine geçip sekmeyi yenilediğinizde kozmetik bannerlar da temizlenir. Desteklemek istediğiniz bir siteyi ise tek tıkla istisnalara ekleyebilirsiniz.',
      settingsTitle: 'İlgili ayarlar ve seviyeler',
      settingsText: 'Seviye 1 (Uyumluluk) reklam filtrelerini kapatır. Seviye 2 (Hafif, varsayılan) kozmetik olmadan Peter Lowe listesini açar. Seviye 3 (Dengeli) tam uBlock filters, EasyList, RU AdList, AdGuard Turkish listelerini ve kozmetik gizlemeyi etkinleştirir.',
      settingsLinkText: 'Tüm 5 koruma seviyesini karşılaştırın',
      limitsTitle: 'Dürüst sınırlar',
      limitsText: 'Sitenin kendi alan adından sunduğu birinci taraf reklamlar, yazı içi sponsorlu bölümler ve hızla değişen sayfa yapıları görünmeye devam edebilir. Tüm sınırları Bilinen Sınırlar sayfasında bulabilirsiniz.',
      limitsLinkText: 'Tüm bilinen sınırları okuyun',
      faqTitle: 'Reklam engelleyici hakkında sık sorulanlar',
      faqs: [
        { q: 'Kurulumdan hemen sonra bazı reklamlar neden hâlâ görünüyor?', a: 'Sitelerin bozulmasını önlemek için varsayılan seviye 2 (Hafif koruma) olarak gelir ve bu seviyede kozmetik gizleme kapalıdır. Tam reklam engelleme için Seviye 3 (Dengeli) seçip sekmeyi yenileyin.' },
        { q: 'Reklam engelleyici Chrome ve Firefox’ta aynı mı çalışır?', a: 'Temel ağ ve kozmetik kuralları Chrome 110+ ve Firefox 128+ sürümlerinde birlikte çalışır. Tek arayüz farkı, Chrome’un etkin sekmedeki eşleşen kural sayacını gösterebilmesi, Firefox’un ise bu sayacı uzantılara vermemesidir.' },
        { q: 'Desteklemek istediğim tek bir sitede reklamlara izin verebilir miyim?', a: 'Evet. O sitedeyken AntiRacketMantis penceresini açın, site koruma anahtarını kapatın ve sayfayı yenileyin. Alt alan adları dâhil 100’e kadar alan adını istisna ekleyebilirsiniz.' },
        { q: 'İnternetteki her reklamı eksiksiz engeller mi?', a: 'Hayır. İçerikle aynı alan adından gelen birinci taraf reklamlar ve yeni sayfa düzenleri, yerleşik listeler güncellenene kadar görünmeye devam edebilir.' }
      ],
      relatedTitle: 'Diğer koruma araçları',
      nudge: {
        title: 'Daha sakin gezinmeye hazır mısınız?',
        text: 'Chrome ve Firefox kurulum rehberine göz atın veya izleyici korumasını inceleyin.',
        actions: [
          ['install', 'Kurulum rehberi', 'btn-primary'],
          ['features/tracker-blocker', 'İzleyici koruması', 'btn-secondary']
        ]
      }
    },

    'features/tracker-blocker': {
      id: 'tracker-blocker',
      tone: 'sky',
      icon: 'eye',
      eyebrow: 'İzleyici koruması · Chrome ve Firefox',
      title: 'İzleyicileri, sayaçları ve bağlantı etiketlerini sınırlandırın',
      lead: 'Bilinen analiz alan adlarını engelleyerek, bağlantılardaki takip etiketlerini temizleyerek ve gizlilik sinyalleri göndererek günlük gezinmede üçüncü taraf takibini azaltır.',
      mascotAlt: 'Üçüncü taraf izleyicilere karşı kalkan tutan peygamberdevesi Minty',
      whatTitle: 'İzleyici koruması ne yapar?',
      whatParagraphs: [
        'İzleyici koruması, bilinen siteler arası analiz betiklerine, reklam piksellerine ve zararlı alan adlarına giden istekleri daha ağ katmanında durdurur.',
        'Seviye 3 (Dengeli) ve üzerinde bağlantılardaki utm_* ile fbclid gibi takip parametrelerini temizler, Sec-GPC ve DNT gizlilik başlıklarını gönderir.'
      ],
      howTitle: 'Sade dille nasıl çalışır?',
      howParagraphs: [
        'Varsayılan Seviye 2 (Hafif koruma) ile birlikte tarayıcının declarativeNetRequest motoru, EasyPrivacy (9 binden fazla kural), RU AdList: Counters ve uBlock filters – Badware risks yerleşik listelerini uygular.',
        'Seviye 4 (Sıkı) üçüncü taraf çerezleri isteklerden çıkarır ve sosyal medya bileşenlerini engeller. Seviye 5 (Maksimum) ise parmak izi koruması (canvas, WebGL, ses), üçüncü taraf ping/CSP engelleme ve özel yerel ağlar hariç HTTPS geçişi ekler.'
      ],
      benefitsTitle: 'Kullanıcıya sağladığı faydalar',
      benefits: [
        { title: 'İlk andan itibaren etkin', text: 'EasyPrivacy, RU AdList: Counters ve uBO Badware listeleri varsayılan Seviye 2’de açıktır.' },
        { title: 'Daha temiz bağlantılar', text: 'Seviye 3+ ile adreslerdeki yaygın takip parametreleri otomatik olarak temizlenir.' },
        { title: 'Gizli kural yok, tam şeffaflık', text: 'Ayarlar sayfasında tüm yerleşik listeleri, kural sayılarını ve etkin durumlarını tek tabloda görebilirsiniz.' }
      ],
      scene: {
        label: 'Temsili görsel',
        title: 'Paylaşılan bir bağlantıyı açtığınızda',
        caption: 'İzleyici engelleme ve URL temizleme akışının temsili gösterimi (canlı telemetri değildir).',
        beforeTitle: 'İzleyici koruması olmadan',
        beforeItems: ['Bağlantı uzun ?utm_source=...&fbclid=... etiketleri taşır', 'Sayfayla birlikte üçüncü taraf sayaç ve pikseller yüklenir', 'Gömülü sosyal düğmeler ziyaretinizi farklı sitelerde görür'],
        afterTitle: 'AntiRacketMantis ile (Seviye 3–4)',
        afterItems: ['Bilinen takip parametreleri bağlantıdan temizlenir', 'Bilinen EasyPrivacy izleyici istekleri yerel olarak durdurulur', 'Sec-GPC sinyali gönderilir; Seviye 4 üçüncü taraf bileşenleri keser']
      },
      exampleTitle: 'Günlük kullanım örneği',
      exampleText: 'Chrome veya Firefox’ta bir bültenden gelen bağlantıya tıkladınız. Seviye 3’te AntiRacketMantis takip etiketlerini adresten temizler ve bilinen EasyPrivacy sayaçlarını yerel olarak durdurur. Sıkı Seviye 4–5’te üçüncü taraf hesapla giriş düğmesi çalışmazsa Seviye 3’e dönmeniz veya siteyi istisna eklemeniz yeterlidir.',
      settingsTitle: 'İlgili ayarlar ve seviyeler',
      settingsText: 'Seviye 2 EasyPrivacy, RU AdList: Counters ve uBO Badware listelerini açar. Seviye 3 bağlantı temizleme ve Sec-GPC/DNT ekler. Seviye 4 üçüncü taraf çerez ve sosyal bileşenleri sınırlar. Seviye 5 parmak izi koruması, ping engelleme ve HTTPS yönlendirmesi ekler.',
      settingsLinkText: 'Tüm 5 koruma seviyesini görün',
      limitsTitle: 'Dürüst sınırlar',
      limitsText: 'Hiçbir tarayıcı uzantısı tam anonimlik sağlamaz: internet sağlayıcınız ve açtığınız site IP adresinizi ve o sitedeki işlemlerinizi görmeye devam eder. Gizli mod tek başına oturum sırasındaki izleyicileri engellemez.',
      limitsLinkText: 'Gizlilik sınırlarını okuyun',
      faqTitle: 'İzleyici koruması hakkında sık sorulanlar',
      faqs: [
        { q: 'İzleyici koruması VPN yerine geçer mi veya tam anonimlik sağlar mı?', a: 'Hayır. Üçüncü taraf izleme betiklerini ve bağlantı etiketlerini azaltır ancak IP adresinizi internet sağlayıcınızdan veya ziyaret ettiğiniz sitelerden gizlemez.' },
        { q: 'Tarayıcıdaki Gizli Mod varken neden izleyici engelleyici gerekir?', a: 'Gizli Mod yalnızca pencereyi kapattıktan sonra cihazınızda geçmiş ve çerez saklamaz; gezinirken reklam ve analiz betiklerinin yüklenmesini engellemez. AntiRacketMantis bilinen izleyicileri yüklenmeden keser.' },
        { q: 'İzleyici koruması ziyaret ettiğim adresleri bir sunucuya gönderir mi?', a: 'Hayır. Eşleştirme, tarayıcının yerleşik declarativeNetRequest motoru içinde gömülü listelerle yerel olarak yapılır.' },
        { q: 'Seviye 4 veya 5’te “Şununla giriş yap” düğmeleri çalışmazsa ne yapmalıyım?', a: 'Seviye 4, bazı OAuth giriş akışlarının kullandığı üçüncü taraf çerezleri kaldırır. Seviye 3 (Dengeli) seçeneğine geçin veya ilgili site için korumayı duraklatın.' }
      ],
      relatedTitle: 'Diğer koruma araçları',
      nudge: {
        title: 'Veri akışı hakkında tam açıklık mı arıyorsunuz?',
        text: 'Gizlilik Politikamızı inceleyin veya çerez bildirimi yönetimine göz atın.',
        actions: [
          ['privacy', 'Gizlilik Politikası', 'btn-primary'],
          ['features/cookie-banners', 'Çerez bildirimleri', 'btn-secondary']
        ]
      }
    },

    'features/cookie-banners': {
      id: 'cookie-banners',
      tone: 'peach',
      icon: 'cookie',
      eyebrow: 'Çerez bildirimleri · Chrome ve Firefox',
      title: 'Çerez bildirimlerinde daha sakin deneyim',
      lead: 'Desteklenen onay pencerelerinde isteğe bağlı çerezleri otomatik olarak reddetmeye çalışır; her sitede küçük reddetme düğmesini aramanıza gerek kalmaz.',
      mascotAlt: 'Tekrarlayan çerez bildirimlerine karşı kalkan tutan peygamberdevesi Minty',
      whatTitle: 'Çerez bildirimi modülü ne yapar?',
      whatParagraphs: [
        'Desteklenen sitelerde AntiRacketMantis onay penceresini tanır ve “Tümünü kabul et” yerine reklam ve analiz amaçlı isteğe bağlı çerezleri reddetme seçeneğini uygular.',
        'Bu ayar 1–5 koruma seviyelerinden bağımsızdır: Seviye 1 (Uyumluluk) seçiliyken bile isteğe bağlı çerez reddini açık tutabilir veya dilediğinizde “Dokunma” seçeneğine alabilirsiniz.'
      ],
      howTitle: 'Sade dille nasıl çalışır?',
      howParagraphs: [
        'Modül, yerleşik onay penceresi kurallarını (DuckDuckGo autoconsent 18.6.0 tabanlı) scripting API aracılığıyla sayfanın izole ortamında çalıştırır ve sitenin kendi reddetme akışını seçer.',
        'Seviye 4 (Sıkı) ve üzerinde üçüncü taraf çerez bildirimi betikleri ile üçüncü taraf çerezler ayrıca ağ düzeyinde engellenir.'
      ],
      benefitsTitle: 'Neden yalnızca gizlemek yerine reddetmek daha iyidir?',
      benefits: [
        { title: 'Kabul etmek yerine reddeder', text: 'Onay penceresi isteğe bağlı çerezleri reddetmeyi desteklediğinde uzantı doğrudan reddetme yolunu seçer.' },
        { title: 'Bağımsız kontrol', text: 'Reklam ve izleyici seviyenizi değiştirmeden “İsteğe bağlı çerezleri reddet” veya “Dokunma” seçenekleri arasında geçiş yapabilirsiniz.' },
        { title: 'Gerekli çerezler korunur', text: 'Oturum açma, sepet ve güvenlik için zorunlu çerezler çalışmaya devam eder.' }
      ],
      scene: {
        label: 'Temsili görsel',
        title: 'Onay penceresi olan bir siteye ilk ziyaret',
        caption: 'Desteklenen bir onay penceresinin temsili akışı (desteklenmeyen özel pencereler görünmeye devam edebilir).',
        beforeTitle: 'Her sitede elle tıklamak',
        beforeItems: ['“Tüm çerezleri kabul et?” penceresi ekranı kaplar', '“Tercihleri yönet” ekranında tek tek anahtar kapatılır', 'Yeni alan adlarında aynı işlem tekrar eder'],
        afterTitle: '“İsteğe bağlı çerezleri reddet” ile',
        afterItems: ['Uyumlu onay penceresi otomatik olarak tanınır', '“Tümünü kabul et” tıklanmadan isteğe bağlı çerezler reddedilir', 'Sayfa hemen okunabilir olur; giriş ve güvenlik çerezleri çalışır']
      },
      exampleTitle: 'Günlük kullanım örneği',
      exampleText: 'Chrome veya Firefox’ta bir haber sitesi veya yazılım belgesi açtınız. Üç ayrı onay menüsüyle uğraşmak yerine AntiRacketMantis reddetme adımını otomatik uygular. Bir sitede tercihlerinizi elle seçmek isterseniz o siteyi istisna eklemeniz veya ayarı “Dokunma” yapmanız yeterlidir.',
      settingsTitle: 'İlgili ayarlar ve seviyeler',
      settingsText: 'Ayarlar → Gizlilik ve koruma bölümünde Çerez bildirimleri için “İsteğe bağlı çerezleri reddet” (varsayılan) veya “Dokunma” seçebilirsiniz. Seviye 4–5 üçüncü taraf bildirim betiklerini de engeller.',
      settingsLinkText: 'Nasıl Çalışır sayfasındaki ayar görüntüsünü görün',
      limitsTitle: 'Dürüst sınırlar',
      limitsText: 'Bir site reddetme akışı sunmuyorsa veya özel bir pencere kullanıyorsa yalnızca bildirimi gizlemek teknik olarak çerez reddi anlamına gelmez. Siteler güvenlik ve oturum çerezlerini saklamaya devam edebilir.',
      limitsLinkText: 'Tüm bilinen sınırları okuyun',
      faqTitle: 'Çerez bildirimleri hakkında sık sorulanlar',
      faqs: [
        { q: 'Uzantı pencereyi kapatmak için “Tümünü kabul et” düğmesine mi basar?', a: 'Hayır. Modül, onay penceresi desteklediğinde isteğe bağlı çerezleri reddetmek üzere yapılandırılmıştır.' },
        { q: 'Bazı sitelerde çerez penceresi neden hâlâ görünüyor?', a: 'Bazı siteler yerleşik kurallarda yer almayan özel pencereler kullanır. Sayfa kaydırmasının veya düğmelerin bozulmaması için bu pencereler görünür bırakılır.' },
        { q: 'Seviye 4–5’te bildirim betiği engellenince tüm çerezler reddedilmiş mi olur?', a: 'Her zaman değil. Bildirim betiğinin engellenmesi pencereyi gizler; ancak site zorunlu veya güvenlik amaçlı çerezleri yine ayarlayabilir.' },
        { q: 'Reklam engellemeyi koruyup çerez modülünü kapatabilir miyim?', a: 'Evet. Çerez bildirimleri bağımsız bir ayardır; “Dokunma” seçeneğini seçtiğinizde koruma seviyeniz normal çalışmaya devam eder.' }
      ],
      relatedTitle: 'Diğer koruma araçları',
      nudge: {
        title: 'Sürpriz açılır pencereleri de durdurmak ister misiniz?',
        text: 'AntiRacketMantis’in istenmeyen pop-up ve arka plan sekmelerini nasıl yönettiğini görün.',
        actions: [
          ['features/popup-blocker', 'Açılır pencere engelleyici', 'btn-primary'],
          ['install', 'Kurulum rehberi', 'btn-secondary']
        ]
      }
    },

    'features/popup-blocker': {
      id: 'popup-blocker',
      tone: 'lilac',
      icon: 'popup',
      eyebrow: 'Açılır pencere engelleyici · Chrome ve Firefox',
      title: 'İstenmeyen açılır pencere ve arka plan sekmelerini durdurun',
      lead: 'Tıklamanız olmadan açılmaya çalışan pop-up pencerelerini ve arka plan (pop-under) sekmelerini sınırlandırırken giriş ve ödeme pencerelerini korumayı hedefler.',
      mascotAlt: 'İstenmeyen açılır pencerelere karşı kalkan tutan peygamberdevesi Minty',
      whatTitle: 'Açılır pencere koruması ne yapar?',
      whatParagraphs: [
        'Seviye 3 (Dengeli) ile birlikte AntiRacketMantis, sayfa betiklerinin sizin açık tıklamanız olmadan reklam penceresi, fazladan sekme veya arka plan penceresi (pop-under) açma girişimlerini engeller.',
        'Aynı zamanda sizin bilerek açtığınız OAuth giriş, banka onayı ve ödeme pencerelerinin normal çalışmasını gözetir.'
      ],
      howTitle: 'Sade dille nasıl çalışır?',
      howParagraphs: [
        'Seviye 3 ve üzerinde scripting izniyle çalışan hafif pencere koruyucu, yeni pencere çağrısının gerçek bir kullanıcı eylemine bağlı olup olmadığını denetler ve kendiliğinden açılanları bastırır.',
        'Alışılmadık bir pencere akışı kullanan güvenilir bir sitede sorun yaşarsanız o alan adı için korumayı tek tıkla kapatıp sayfayı yenileyebilirsiniz.'
      ],
      benefitsTitle: 'Pencere kontrolü neden faydalıdır?',
      benefits: [
        { title: 'Daha az sürpriz sekme', text: 'Tıklamanız olmadan açılan reklam pencerelerini ve arka plana saklanan pop-under sekmelerini durdurur.' },
        { title: 'Giriş ve ödeme dostu', text: 'Kullanıcı tarafından başlatılan oturum açma, banka doğrulama ve yazdırma pencerelerini korumayı amaçlar.' },
        { title: 'Hızlı istisna desteği', text: 'Gerekli bir pencere engellenirse uzantı penceresinden o site için korumayı kapatıp sayfayı yenilemeniz yeterlidir.' }
      ],
      scene: {
        label: 'Temsili görsel',
        title: 'Yoğun bir sitede bağlantıya tıkladığınızda',
        caption: 'Pop-up ve pop-under korumasının temsili gösterimi (kavramsal örnek).',
        beforeTitle: 'Açılır pencere koruması olmadan',
        beforeItems: ['Ani bir “Bültene katılın!” penceresi içeriği kapatır', 'Arka planda istenmeyen bir reklam sekmesi (pop-under) açılır', 'Okumaya dönmek için birden fazla sekme kapatmanız gerekir'],
        afterTitle: 'Seviye 3 (Dengeli) ve üzerinde',
        afterItems: ['Gerçek tıklama olmadan açılan pencereler durdurulur', 'Arka plan reklam sekmeleri odak çalmaz', 'Kendi sayfanızda kalırsınız; giriş ve ödeme akışları çalışır']
      },
      exampleTitle: 'Günlük kullanım örneği',
      exampleText: 'Chrome veya Firefox’ta tanımadığınız bir dosya veya tarif sitesini açtınız. Seviye 3 (Dengeli) açıkken sayfa betikleri ilk tıklamanızda sessizce arka plan reklam sekmesi açamaz. Kurumsal bir portalda özel bir rapor penceresi açılmazsa o alan adını saniyeler içinde istisna listesine ekleyebilirsiniz.',
      settingsTitle: 'İlgili ayarlar ve seviyeler',
      settingsText: 'Pop-up ve pop-under koruması Seviye 3 (Dengeli) ile otomatik olarak açılır ve Seviye 4 ile 5’te de etkin kalır. Seviye 1 ve 2 maksimum uyumluluk için pencere betiklerine dokunmaz.',
      settingsLinkText: 'Tüm 5 koruma seviyesini karşılaştırın',
      limitsTitle: 'Dürüst sınırlar',
      limitsText: 'Ayrı tarayıcı penceresi olmayıp doğrudan sayfa DOM yapısında açılan katmanlar veya kullanıcı tıklamasını taklit eden betikler farklı davranabilir. Bir OAuth ya da ödeme penceresi açılmazsa o site için korumayı duraklatın.',
      limitsLinkText: 'Tüm bilinen sınırları okuyun',
      faqTitle: 'Açılır pencere engelleyici hakkında sık sorulanlar',
      faqs: [
        { q: 'Varsayılan Seviye 2’de açılır pencereler neden engellenmiyor?', a: 'Seviye 2 (Hafif koruma) sayfa betiklerine bilerek en az düzeyde dokunur. Pop-up ve pop-under koruması Seviye 3 (Dengeli) ile etkinleşir.' },
        { q: 'Kartla ödeme veya e-posta/Google ile giriş pencerelerini bozar mı?', a: 'Kendi tıklamanızla açılan pencerelere izin vermeyi amaçlar. Belirli bir sitede doğrulama penceresi açılmazsa uzantı penceresinden o site için korumayı kapatıp sayfayı yenileyin.' },
        { q: 'Pop-under koruması hem Firefox hem Chrome’da çalışır mı?', a: 'Evet; hem Chrome (110+) hem Firefox (128+) sürümlerinde Seviye 3+ açılır pencere koruması yer alır.' },
        { q: 'Yalnızca tek bir güvenilir sitede açılır pencerelere nasıl izin veririm?', a: 'O siteyi açın, araç çubuğundaki AntiRacketMantis simgesine tıklayın, site koruma anahtarını kapatın ve sekmeyi yenileyin.' }
      ],
      relatedTitle: 'Diğer koruma araçları',
      nudge: {
        title: 'Temel özellikleri incelediniz mi?',
        text: 'Kurulum rehberine göz atın veya AntiRacketMantis PRO için planlananlara bakın.',
        actions: [
          ['install', 'Kurulum rehberi', 'btn-primary'],
          ['pro', 'AntiRacketMantis PRO', 'btn-secondary']
        ]
      }
    }
  },

  proPage: {
    eyebrow: 'Yol haritası · Geliştiriliyor',
    title: 'AntiRacketMantis PRO',
    lead: 'Tek tarayıcı uzantısı: temel koruma ücretsiz kalırken, ileride yerel sinir ağları, yapay zekâ destekli CAPTCHA yardımı ve gelişmiş otomasyon isteyenler için isteğe bağlı PRO aboneliği geliştiriliyor.',
    mascotAlt: 'Planlanan PRO sürümünü simgeleyen vizörlü ve yerel yapay zekâ çipli peygamberdevesi Minty',
    statusBadge: 'Geliştiriliyor',
    statusBoxTitle: 'PRO şu anda geliştiriliyor ve henüz kullanıma sunulmadı',
    statusBoxText: 'Ödeme akışı, ön sipariş veya e-posta toplama formu yoktur; çıkış tarihi belirlenmemiştir. Reklam, izleyici, çerez bildirimi ve açılır pencere koruması ücretsiz kalmaya devam eder.',
    priceCard: {
      title: 'AntiRacketMantis PRO',
      badge: 'Geliştiriliyor',
      price: '$39',
      period: '/ ay',
      priceLabel: 'planlanan fiyat',
      summary: 'Tek uzantı: ücretsiz temel koruma abonelik olmadan çalışır; PRO araçları geliştirme ve denetim tamamlandığında aynı uzantı içinde açılacaktır.',
      primaryCta: 'Ücretsiz sürümü yükle',
      secondaryCta: 'Yayın durumunu takip et'
    },
    plannedTitle: 'AntiRacketMantis PRO için planlananlar',
    plannedIntro: 'Bu PRO özelliklerinin hiçbiri henüz yayınlanmadı; üzerinde çalışılan alanlar aşağıdadır:',
    plannedItems: [
      {
        icon: 'shield',
        tone: 'lime',
        badge: 'Geliştiriliyor',
        title: 'Ücretsiz sürümdeki her şey',
        text: 'Eksiksiz temel koruma: 5 seviyeli reklam ve izleyici filtreleme, çerez bildirimi reddi, açılır pencere kontrolü, parmak izi ayarları ve istisnalar.'
      },
      {
        icon: 'sparkle',
        tone: 'lilac',
        badge: 'Geliştiriliyor',
        title: 'Yapay zekâ destekli CAPTCHA tanıma yardımı',
        text: 'Kişinin kendi tarayıcısında karşılaştığı görsel ve metin doğrulamalarına, yerel çalışması planlanan modellerle yardımcı olma yaklaşımı.'
      },
      {
        icon: 'lock',
        tone: 'sky',
        badge: 'Geliştiriliyor',
        title: 'Yerel sinir ağları ve görüntü analizi',
        text: 'Teknik olarak mümkün olan her durumda görüntü analizini kullanıcının kendi cihazında yerel çalıştırmaya odaklanan yapı.'
      },
      {
        icon: 'sliders',
        tone: 'butter',
        badge: 'Geliştiriliyor',
        title: 'Gelişmiş tarayıcı otomasyonu ve ek ayarlar',
        text: 'Kullanıcının kendi açtığı sayfalardaki tekrarlayan rutin işlemlerini kolaylaştıran araçlar ve ayrıntılı yapılandırma seçenekleri.'
      }
    ],
    captchaHonesty: {
      title: 'CAPTCHA yardımı ve site kuralları hakkında açık bilgi',
      paragraphs: [
        'Planlanan PRO tanıma araçları, kişinin kendi tarayıcısında karşılaştığı görsel ve metin doğrulamalarına yerel çalışması planlanan modellerle destek olmak üzere tasarlanıyor.',
        'Herhangi bir sitede herhangi bir doğrulamanın geçileceği hiçbir zaman vadedilmez: tanıma başarısız olabilir ve sitelerin doğrulama yöntemleri sık sık değişir.',
        'Bazı web siteleri kullanım koşullarında doğrulamaların otomatik işlenmesini yasaklar. Ziyaret edilen her sitenin kurallarına uymak kullanıcının kendi sorumluluğundadır.',
        'PRO yayınlanmadan önce tüm veri akışları ve yerel modeller ayrıca denetlenecek ve Gizlilik Politikasında açıkça belgelenecektir.'
      ]
    },
    compareTitle: 'Ücretsiz ve planlanan PRO karşılaştırması',
    compareCaption: 'Ücretsiz AntiRacketMantis temel koruması ile geliştirilmekte olan planlanan PRO aboneliğinin karşılaştırması',
    compareHeaders: ['Özellik', 'Ücretsiz (temel koruma)', 'PRO · geliştiriliyor ($39/ay planlanan fiyat)'],
    compareRows: [
      ['Uzantı paketi', 'Chrome ve Firefox için tek uzantı', 'Aynı uzantı (abonelik ileride içinde)'],
      ['Reklam ve izleyici engelleme', 'Dâhil (5 seviye, yerleşik listeler)', 'Tamamı dâhil'],
      ['Çerez bildirimleri ve açılır pencereler', 'Dâhil (bağımsız ayar + Seviye 3+)', 'Tamamı dâhil'],
      ['İstisnalar, temalar, JSON aktarımı', 'Hesap gerekmeden dâhil', 'Tamamı dâhil'],
      ['Yapay zekâ destekli CAPTCHA tanıma', 'Temel korumada yer almaz', 'Geliştiriliyor (yerel modeller planlanır; geçme vaadi yoktur)'],
      ['Yerel sinir ağları ve görüntü analizi', 'Dâhil değil', 'Geliştiriliyor'],
      ['Gelişmiş tarayıcı otomasyonu ve ek araçlar', 'Dâhil değil', 'Geliştiriliyor'],
      ['Mevcut durum', 'Sürüm 0.11.0 mağaza yayınına hazırlanıyor', 'Geliştiriliyor · henüz kullanıma sunulmadı']
    ],
    faqTitle: 'PRO hakkında sık sorulanlar',
    faqs: [
      { q: 'PRO ayrı bir uzantı mı olacak yoksa aynı uzantı mı?', a: 'Tek uzantı: AntiRacketMantis. Temel koruma ücretsiz kalır, PRO ise ileride aynı uzantı içinde açılacak isteğe bağlı bir abonelik olarak planlanmaktadır.' },
      { q: 'AntiRacketMantis PRO ne zaman çıkacak?', a: 'Henüz belirlenmiş bir çıkış tarihi yoktur; PRO geliştirme aşamasındadır. Gerçek ilerleme aşamalarını Sürüm Geçmişi ve Yol Haritası sayfasından takip edebilirsiniz.' },
      { q: 'PRO çıktıktan sonra temel koruma ücretsiz kalacak mı?', a: 'Evet. Reklam engelleme, izleyici koruması, çerez bildirimi reddi, açılır pencere kontrolü, 5 seviye ve site istisnaları ücretsiz sürümde kalmaya devam eder.' },
      { q: 'PRO her sitede CAPTCHA geçileceğini vadediyor mu?', a: 'Hayır. Tanıma başarısız olabilir, doğrulamalar sürekli değişir ve bazı siteler otomatik işlemleri yasaklar; her sitenin kurallarına uymak kullanıcının sorumluluğundadır.' },
      { q: 'PRO’da görüntü işleme nerede çalışacak?', a: 'Tanıma ve görüntü analizi modellerinin kullanıcının cihazında yerel olarak çalışması planlanıyor. Kesin veri akışları yayından önce denetlenip Gizlilik Politikasında yayımlanacaktır.' }
    ],
    nudge: {
      title: 'Ücretsiz temel korumayla başlayın',
      text: 'Kurulum rehberini inceleyin veya yol haritasından geliştirme aşamalarını takip edin.',
      actions: [
        ['install', 'Ücretsiz sürümü yükle', 'btn-primary'],
        ['changelog#roadmap', 'Yayın durumunu takip et', 'btn-secondary']
      ]
    }
  },

  levels: [
    { n: 1, name: 'Uyumluluk', summary: 'Ağ ve kozmetik filtreler kapalıdır. Çerez bildirimi ayarı ayrıca yönetilir.', badge: 'En az müdahale', isDefault: false },
    { n: 2, name: 'Hafif koruma', summary: 'İzleyicileri (EasyPrivacy, RU AdList Counters), zararlı alan adlarını ve seçili reklam sunucularını engeller.', badge: 'Varsayılan', isDefault: true },
    { n: 3, name: 'Dengeli', summary: 'Tam reklam listeleri (uBlock filters, EasyList, RU AdList), URL etiket temizleme, Sec-GPC/DNT, kozmetik gizleme ve pop-up koruması.', badge: 'Sakin okuma', isDefault: false },
    { n: 4, name: 'Sıkı', summary: 'İsteklerdeki üçüncü taraf çerezleri de kaldırır; üçüncü taraf çerez bildirimi betiklerini ve sosyal bileşenleri engeller.', badge: 'Daha sıkı bağlar', isDefault: false },
    { n: 5, name: 'Maksimum', summary: 'Parmak izi koruması (canvas, WebGL, ses), üçüncü taraf ping/CSP engelleme ve HTTPS geçişi ekler.', badge: 'Maksimum', isDefault: false }
  ],

  screenshots: {
    popupShield: {
      alt: 'AntiRacketMantis açılır penceresi, example.org üzerindeki koruma sekmesi (İngilizce arayüz): koruma açık, site anahtarı, 4 etkin liste, seviye 2/5 ve Canvas maskeleme',
      title: 'Uzantı penceresindeki Koruma sekmesi',
      desc: 'Açık site için koruma durumunu, etkin filtre listesi sayısını, tek tıkla site anahtarını ve 1–5 seviye kaydırıcısını gösterir.',
      caption: `Sürüm ${VERSION} ekran görüntüsü · example.org (uzantının Türkçe arayüzü henüz yok; İngilizce arayüz gösteriliyor)`
    },
    optionsLevels: {
      alt: 'Ayarlar ekranında Seviye 2/5 seçimi ve Uyumluluktan Maksimuma uzanan kaydırıcı (İngilizce arayüz)',
      title: 'Koruma seviyesi seçimi (1–5)',
      desc: 'Kozmetik değişiklik yapmayan hafif filtrelemeden (varsayılan Seviye 2) sıkı gizlilik kurallarına kadar kolay geçiş sağlar.',
      caption: `Sürüm ${VERSION} ekran görüntüsü · koruma seviyeleri (İngilizce arayüz)`
    },
    optionsExceptionsCookies: {
      alt: 'Site istisnaları kutusu (0/100 alan adı) ve isteğe bağlı çerezleri reddetme seçili çerez bildirimi ayarı (İngilizce arayüz)',
      title: 'Site istisnaları ve çerez bildirimleri',
      desc: 'Alt alan adlarıyla birlikte 100’e kadar alan adını koruma dışı bırakabilir ve çerez reddetme modunu ayrı yönetebilirsiniz.',
      caption: `Sürüm ${VERSION} ekran görüntüsü · istisnalar ve çerez ayarı (İngilizce arayüz)`
    },
    optionsLists: {
      alt: 'AntiRacketMantis ayarlarında yerleşik filtre listeleri tablosu: EasyPrivacy (9.162 kural), RU AdList: Counters (1.086), uBlock filters – Badware risks (435) ve Peter Lowe açık (İngilizce arayüz)',
      title: 'Şeffaf yerleşik filtre listeleri tablosu',
      desc: 'uBlock Origin Lite 2026.1116.1650 tabanlı her yerleşik listeyi, kural sayısını ve etkin durumunu görebilirsiniz; gezinirken indirme yapılmaz.',
      caption: `Sürüm ${VERSION} ekran görüntüsü · yerleşik filtre listeleri (İngilizce arayüz)`
    },
    welcomeProtections: {
      alt: 'AntiRacketMantis karşılama ekranındaki üç koruma özet kartı: reklamlar ve izleyiciler, çerez bildirimleri ve açılır pencereler, kolay geri alma (İngilizce arayüz)',
      title: 'İlk açılışta sade özet',
      desc: 'Karşılama sayfası yerleşik listeleri, çerez reddini, Seviye 3+ açılır pencere kontrolünü ve tek tıkla istisnayı özetler.',
      caption: `Sürüm ${VERSION} ekran görüntüsü · karşılama ekranı kartları (İngilizce arayüz)`
    },
    optionsTheme: {
      alt: 'AntiRacketMantis ayarlarında sistem teması seçili görünüm menüsü (İngilizce arayüz)',
      title: 'Açık, koyu ve sistem temaları',
      desc: 'İşletim sisteminizin temasını otomatik takip edebilir veya açık/koyu Mantis paletini elle seçebilirsiniz.',
      caption: `Sürüm ${VERSION} ekran görüntüsü · tema seçici (İngilizce arayüz)`
    }
  },

  howItWorks: {
    eyebrow: 'Çalışma düzeni',
    title: 'Tarayıcı koruması nasıl çalışır?',
    lead: 'AntiRacketMantis standart Manifest V3 kural motoruna, izole sayfa betiklerine ve anlaşılır seviyelere dayanır; gezinme geçmişinizi uzak sunuculara göndermez.',
    mascotAlt: 'Koruma kurallarının işleyişini inceleyen peygamberdevesi Minty',
    cards: [
      {
        icon: 'shield',
        title: '1. Tarayıcı ağ kuralları',
        p1: 'Reklam sunucuları, analiz izleyicileri, zararlı alan adları ve URL takip etiketleri tarayıcının yerleşik declarativeNetRequest API’si ile filtrelenir.',
        p2: 'Tarayıcı, istekleri doğrudan yerleşik listelerle (EasyList, EasyPrivacy, uBlock filters, RU AdList, Peter Lowe, AdGuard Turkish) eşleştirir; ziyaret ettiğiniz adresler dış ağa gönderilmez.'
      },
      {
        icon: 'ad',
        title: '2. Kozmetik ve pop-up koruması',
        p1: 'Seviye 3’ten itibaren kozmetik filtreler sayfa içinde kalan reklam kutularını ve boş alanları gizler.',
        p2: 'Ayrı bir pencere koruyucu, sitelerin sizin tıklamanız olmadan beklenmedik açılır pencere veya arka plan sekmesi açmasını sınırlar.'
      },
      {
        icon: 'cookie',
        title: '3. Çerez bildirimleri ve istisnalar',
        p1: 'Çerez modülü sayfanın izole ortamında çalışır ve ayar açıkken desteklenen onay pencerelerinde isteğe bağlı çerezleri reddetmeye çalışır.',
        p2: 'Bir site bozulursa veya tam erişim gerektirirse uzantı penceresindeki anahtar o alan adını tüm kuralların üstünde yer alan istisnalara ekler.'
      }
    ],
    levelsTitle: 'Beş koruma seviyesi (1’den 5’e)',
    levelsIntro: 'Seviyeyi dilediğiniz zaman uzantı penceresinden veya ayarlardan değiştirebilirsiniz. Ağ ve sayfa betiği değişiklikleri sekmeyi yeniledikten sonra uygulanır.',
    builtinsTitle: 'Yerleşik listeler ve hesapsız aktarım',
    builtinsItems: [
      ['Listeler uzantı paketinin içindedir:', 'filtre kuralları (uBlock Origin Lite 2026.1116.1650 tabanlı) ve çerez bildirimi motoru (DuckDuckGo autoconsent 18.6.0) uzantıya gömülüdür; gezinirken uzak sunucudan hiçbir şey indirilmez.'],
      ['Hesap açmadan ayar aktarımı:', 'üyelik veya bulut eşitlemesi gerekmez; koruma seviyenizi, çerez modunuzu ve istisnalarınızı JSON dosyası olarak dışa ve içe aktarabilirsiniz.'],
      ['Yerel CDN vekillemesi yok:', 'eski LocalCDN benzeri yöntemler yinelenmez; CDN üzerinden izleme EasyPrivacy ağ kurallarıyla kesilir.'],
      ['Öngörülemez kendi kendine öğrenme yok:', 'filtreleme öngörülebilirdir; yalnızca seçtiğiniz seviyeye ve açık istisnalarınıza göre çalışır.']
    ],
    interfaceTitle: 'Uzantı arayüzü',
    interfaceText: `Aşağıda ${VERSION} sürümünün gerçek koruma ekranları yer alır (uzantının Türkçe arayüzü henüz hazır olmadığından İngilizce arayüz gösterilmiştir): site penceresi, 1–5 seviye ayarı, yerleşik filtre listeleri, istisnalar, çerez bildirimleri, karşılama özeti ve tema.`,
    nudge: {
      title: 'Sonraki adım',
      text: 'Tarayıcı kurulum adımlarını veya Gizlilik Politikamızı inceleyin.',
      actions: [
        ['install', 'Kurulum rehberi', 'btn-primary'],
        ['privacy', 'Gizlilik Politikası', 'btn-secondary']
      ]
    }
  },

  install: {
    eyebrow: 'Kurulum',
    title: 'AntiRacketMantis nasıl kurulur?',
    lead: 'Chrome ve Firefox için adım adım kurulum rehberi. Uzantı ilk herkese açık mağaza yayınına hazırlandığı için burada sahte indirme bağlantıları bulunmaz.',
    mascotAlt: 'Kurulum için el sallayan peygamberdevesi Minty',
    statusTitle: 'Güncel yayın durumu',
    statusP1: `Sürüm ${VERSION}, Chrome Web Store ve Firefox Add-ons resmi dizinleri için hazırlanıyor. Mağaza incelemeleri tamamlandığında doğrudan bağlantılar burada yayınlanacaktır.`,
    statusP2: 'Üçüncü taraf sitelerden resmi olmayan paketler indirmeyin: yayınlandıktan sonra yalnızca bu siteden verilen resmi mağaza sayfalarını kullanın.',
    chromeTitle: 'Google Chrome ve Chromium tarayıcılar',
    chromePill: 'Yakında Chrome Web Store’da · Chrome 110+',
    chromeSteps: [
      'Chrome Web Store’daki resmi AntiRacketMantis sayfasını açın (bağlantı yayın sonrasında eklenecektir).',
      '“Chrome’a ekle” düğmesine tıklayın ve tarayıcının gösterdiği izin listesini dikkatlice inceleyin.',
      'Site durumunu hızlıca görmek için araç çubuğundaki yapboz (“Uzantılar”) simgesinden AntiRacketMantis’i sabitleyin.',
      'Simgeye tıklayın: varsayılan olarak Seviye 2 (Hafif koruma) ve isteğe bağlı çerez reddi açıktır. Tam reklam engelleme için Seviye 3 (Dengeli) seçebilirsiniz.'
    ],
    firefoxTitle: 'Mozilla Firefox',
    firefoxPill: 'Yakında Firefox Add-ons’ta · Firefox 128+',
    firefoxSteps: [
      'Firefox Add-ons dizinindeki resmi AntiRacketMantis sayfasını açın (bağlantı yayın sonrasında eklenecektir).',
      '“Firefox’a ekle” düğmesine tıklayın ve açılan pencerede istenen izinleri onaylayın.',
      'İlk açılışta karşılama ekranı açılırsa size uygun koruma seviyesini ve çerez bildirimi ayarını seçin.',
      'Tek tıkla erişim için Firefox araç çubuğundaki uzantılar menüsünden simgeyi sabitleyebilirsiniz.'
    ],
    checklistTitle: 'Kurulumdan hemen sonra kontrol edilecekler',
    checklistItems: [
      ['Araç çubuğu simgesini sabitleyin:', 'Chrome’da yapboz simgesine tıklayıp AntiRacketMantis’i sabitleyin; Firefox’ta adres çubuğu yanındaki uzantılar menüsünden sabitleyebilirsiniz.'],
      ['Normal bir web sayfası açın (http:// veya https://):', 'tarayıcının dahili sayfalarında (chrome://, about: ve eklenti mağazaları) tarayıcı güvenliği gereği site anahtarı devre dışıdır.'],
      ['Seviye 2 ve 3 davranışını deneyin:', 'alıştığınız bir sitede yorumlar, video oynatıcı veya giriş formu yüklenmezse Koruma sekmesinden o site için korumayı kapatıp Yenile’ye tıklayın.']
    ],
    checklistFourthPrefix: 'Başlamadan önce ayrıntıları inceleyin: ',
    privacyLinkText: 'izinlerin neden gerektiğini',
    checklistFourthMid: ' ve ',
    compatLinkText: 'desteklenen tarayıcı sürümlerini',
    nudge: {
      title: 'Kaldırma veya uyumluluk bilgisi mi gerekiyor?',
      text: 'Kaldırma işleminin yerel verileri nasıl temizlediğini veya tarayıcı matrisini inceleyin.',
      actions: [
        ['uninstall', 'Nasıl kaldırılır?', 'btn-primary'],
        ['compatibility', 'Uyumluluk', 'btn-secondary']
      ]
    }
  },

  uninstall: {
    eyebrow: 'Kaldırma',
    title: 'AntiRacketMantis nasıl kaldırılır?',
    lead: 'Uzantıyı yarım dakikadan kısa sürede tamamen kaldırabilir veya kaldırmak yerine yalnızca sorunlu tek bir sitede korumayı duraklatabilirsiniz.',
    mascotAlt: 'Kaldırma adımlarında yardımcı olan peygamberdevesi Minty',
    chromeTitle: 'Google Chrome / Chromium’da kaldırma',
    chromeSteps: [
      'Araç çubuğundaki AntiRacketMantis simgesine sağ tıklayıp “Chrome’dan kaldır”ı seçin veya chrome://extensions adresine gidin.',
      'AntiRacketMantis kartını bulun ve “Kaldır” düğmesine tıklayın.',
      'Tarayıcının onay penceresinde kaldırma işlemini onaylayın.'
    ],
    firefoxTitle: 'Mozilla Firefox’ta kaldırma',
    firefoxSteps: [
      'Firefox menüsünü açıp “Eklentiler ve temalar”ı seçin (veya adres çubuğuna about:addons yazın).',
      'Uzantılar bölümünde AntiRacketMantis yanındaki “⋯” menüsünü açın.',
      '“Kaldır” seçeneğine tıklayıp onaylayın.'
    ],
    dataTitle: 'Kaldırdıktan sonra verilerinize ne olur?',
    dataItems: [
      ['Tarayıcı yerel uzantı depolamasını siler:', 'koruma seviyeniz, istisna listesi, çerez ayarı, tema ve yerel tanılama günlüğü uzantı profiliyle birlikte temizlenir.'],
      ['Elle alınan JSON yedekleri diskinizde kalır:', 'dışa aktardığınız ayar dosyası kaydettiğiniz klasörde durur; istemiyorsanız elle silebilirsiniz.'],
      ['Kaldırmaya alternatif:', 'yalnızca tek bir site sorun çıkarıyorsa uzantıyı silmek yerine açılır pencereden o site için korumayı kapatıp sayfayı yenileyin.']
    ],
    nudge: {
      title: 'Bir sitede sorun mu yaşadınız?',
      text: 'Kaldırmadan önce bilinen sınırları veya Destek sayfasındaki hızlı çözümleri kontrol edin.',
      actions: [
        ['limits', 'Bilinen sınırlar', 'btn-primary'],
        ['support', 'Destek', 'btn-secondary']
      ]
    }
  },

  limits: {
    eyebrow: 'Dürüst sınırlar',
    title: 'Bilinen koruma sınırları',
    lead: 'Hiçbir tarayıcı uzantısı tüm interneti yan etkisiz ve kusursuz biçimde filtreleyemez. Sonuçların değişebileceği durumları aşağıda açıkça listeledik.',
    mascotAlt: 'Koruma sınırlarını kalkanıyla gösteren peygamberdevesi Minty',
    cards: [
      {
        icon: 'ad',
        title: 'Siteler değişir ve birinci taraf reklam sunar',
        p1: 'Makale veya video ile aynı alan adından sunulan birinci taraf reklamları normal içerikten teknik olarak ayırmak zordur.',
        p2: 'Sayfa yapıları yerleşik liste güncellemelerinden hızlı değiştiği için bazı reklam kutuları geçici olarak görünebilir.'
      },
      {
        icon: 'cookie',
        title: 'Çerez bildirimini gizlemek ≠ çerezleri reddetmek',
        p1: 'Uzantı desteklenen onay pencerelerinde isteğe bağlı çerezleri reddetmeye çalışır. Ancak site reddetme seçeneği sunmuyorsa Seviye 4–5’te bildirimi gizlemek, çerezlerin teknik olarak reddedildiği anlamına gelmez.',
        p2: 'Ayrıca siteler oturum güvenliği için zorunlu çerezleri saklayabilir.'
      },
      {
        icon: 'popup',
        title: 'Giriş ve ödeme pencereleri çalışmaya devam etmelidir',
        p1: 'Açılır pencere koruması yalnızca sizin tıklamanız olmadan açılan pencereleri durdurmaya odaklanır.',
        p2: 'OAuth giriş, banka onayı ve ödeme pencereleri normal açılmalıdır; bir pencere engellenirse o site için korumayı uzantı penceresinden kapatın.'
      },
      {
        icon: 'lock',
        title: 'Sıkı seviyelerin (4 ve 5) yan etkileri',
        p1: 'Seviye 4 üçüncü taraf çerezleri kaldırdığından “Şununla giriş yap” düğmeleri ve gömülü sosyal bileşenler çalışmayabilir.',
        p2: 'Seviye 5 parmak izi korumasını ve zorunlu HTTPS geçişini açar: HTTPS desteği olmayan siteler açılmaz (yerel ev ağı adresleri hariçtir) ve değişen parmak izi değerleri bazı sitelerde ek doğrulama istemine yol açabilir.'
      },
      {
        icon: 'eye',
        title: 'Gizlilik ve anonimlik sınırları',
        p1: 'İzleyici ve sayaç engelleme üçüncü taraf takibi azaltır ancak IP adresinizi ziyaret ettiğiniz sitelerden ve internet sağlayıcınızdan gizlemez.',
        p2: ''
      },
      {
        icon: 'sliders',
        title: 'Tarayıcı farkları ve korumalı sistem sayfaları',
        p1: 'Chrome etkin sekmede eşleşen kural sayısını uzantıya verirken Firefox bu sayacı paylaşmaz (yerine açıklayıcı bir tire gösterilir).',
        p2: 'Ayrıca tarayıcıların kendi güvenliği gereği hiçbir uzantı dahili sayfalarda (chrome://, about:) ve resmi eklenti mağazalarında çalışamaz.'
      }
    ],
    nudge: {
      title: 'Belirli bir sitede sorun mu yaşıyorsunuz?',
      text: 'Destek sayfasındaki önerileri okuyun veya tarayıcı uyumluluğunu kontrol edin.',
      actions: [
        ['support', 'Destek', 'btn-primary'],
        ['compatibility', 'Uyumluluk', 'btn-secondary']
      ]
    }
  },

  compatibility: {
    eyebrow: 'Uyumluluk',
    title: 'Desteklenen tarayıcılar ve gereksinimler',
    lead: 'Yalnızca uzantı manifesti ve kuralları gerçekten hazırlanmış tarayıcıları ve sürümleri listeliyoruz.',
    mascotAlt: 'Tarayıcı uyumluluğunu kontrol eden peygamberdevesi Minty',
    tableTitle: 'Güncel uyumluluk matrisi',
    tableCaption: 'AntiRacketMantis tarayıcı ve sürüm uyumluluk tablosu',
    tableHeaders: ['Tarayıcı / platform', 'En düşük sürüm', 'Durum', 'Özellikler'],
    tableRows: [
      ['Google Chrome / Chromium', 'Sürüm 110 ve üzeri (Manifest V3)', 'Yayına hazırlanıyor', 'Uzantı penceresinde etkin sekme kural eşleşme sayacını destekler (tarayıcı kotası: 10 dakikada 20 sorgu).'],
      ['Mozilla Firefox', 'Sürüm 128.0 ve üzeri (Manifest V3)', 'Yayına hazırlanıyor', 'Gecko arka plan betikleriyle çalışır; Firefox sekme kural sayacını paylaşmaz (tüm filtreleme çalışır).'],
      ['Safari, mobil tarayıcılar ve eski sürümler', '—', 'Desteklenmiyor', 'Ayrı uyarlama ve test yapılmadan destek vadedilmez.']
    ],
    calloutTitle: 'Teknik izin kapsamı ve gerçek davranış:',
    calloutText: 'tarayıcının “Tüm web sitelerindeki verilerinizi okuyabilir ve değiştirebilir” standart uyarısı, reklam kutularını gizlemek ve çerez bildirimlerini yönetmek için gereken teknik sayfa erişimini ifade eder. Temel filtreleme parolalarınızı, yazışmalarınızı veya kapalı formları okumaz ve gezinme geçmişinizi geliştiriciye göndermez.',
    engineTitle: 'Tarayıcı motorunun teknik sınırları',
    engineItems: [
      ['Etkin filtre listesi kotaları:', 'Chrome ve Firefox aynı anda etkin olabilecek declarativeNetRequest kural sayısına sistem sınırı koyar. Tarayıcı ek bir kümeyi uygulamazsa uzantı bunu “kısmen etkin” durumuyla açıkça gösterir.'],
      ['Yerel ev ağı cihazları:', 'Seviye 5 (Maksimum) açıkken bile HTTPS yönlendirmesi localhost, 127.0.0.1 ve yerel ağ adreslerine (192.168.*, 10.*, .local yönlendirici ve yazıcılar) dokunmaz.']
    ],
    nudge: {
      title: 'Kuruluma hazır mısınız?',
      text: 'Kurulum adımlarını ve tarayıcı izinlerini inceleyin.',
      actions: [
        ['install', 'Kurulum rehberi', 'btn-primary'],
        ['privacy', 'Gizlilik Politikası', 'btn-secondary']
      ]
    }
  },

  privacy: {
    eyebrow: 'Gizlilik ve veriler',
    title: 'AntiRacketMantis Gizlilik Politikası',
    lead: 'Bu web sitesinin nasıl davrandığını, uzantının cihazınızda neleri sakladığını, izinlerin neden gerektiğini ve ağ isteklerinin ne zaman oluşabileceğini açıkça anlatır.',
    mascotAlt: 'Veri gizliliğini kalkanıyla koruyan peygamberdevesi Minty',
    draftBadge: 'Ön taslak · hukuk incelemesi gerektirir',
    draftTitle: 'Yayın öncesi belge durumu',
    draftText: `Bu metin mevcut web sitesini ve ${VERSION} sürüm kod tabanını yansıtır; ancak resmi mağaza yayını öncesinde ek paket denetimi ve hukuk incelemesi gerektirir.`,
    s1Title: '1. Bu web sitesinin verileri',
    s1Lead: `${SITE} yalnızca statik sayfalardan oluşur:`,
    s1Items: [
      'Site çerez yerleştirmez ve izleyici kullanmaz.',
      'Web analitiği, reklam pikseli, üçüncü taraf yazı tipi veya dış betik bulunmaz.',
      'Kayıt, yorum veya kişisel veri toplayan herhangi bir form yoktur.',
      'Sitenin tek tercihi (“Animasyonları durdur”) yalnızca tarayıcınızın localStorage alanında arm-motion-off anahtarıyla saklanır ve dışarı gönderilmez.'
    ],
    s2Title: '2. Uzantının tarayıcıda yerel sakladığı veriler',
    s2Lead: 'Uzantı, tarayıcı profilinizde storage.local alanını ve geçici oturum belleği olarak storage.session alanını kullanır. Yerel depolama, aşağıda belirtilen ek modüllerin ağ isteklerini dışlamaz:',
    s2Items: [
      ['Koruma tercihleri:', 'seçili seviye (1–5), çerez bildirimi modu ve arayüz teması.'],
      ['Site listeleri:', 'korumanın kapatıldığı istisna alan adlarınız ve canvas maskeleme siteleri (liste başına en fazla 100 alan adı).'],
      ['Tanılama günlüğü:', 'zaman, alan adı, olay türü ve hata kayıtları (en fazla 200 kayıt, 14 gün saklama). Ayarlardan kapatılabilir veya temizlenebilir.'],
      ['Ek modüller:', 'tercihleri, onay bayrakları, seçilen harici servis erişim anahtarları ve sayaçlar yerel saklanır. Modül çalışırken geçici bellekte kaynak sekme adresi ve işlenen görsel bulunabilir.'],
      ['Ayar dışa aktarımı:', 'elle JSON dışa aktarmada yalnızca tercihler ve site listeleri kaydedilir; günlükler ve gizli anahtarlar dâhil edilmez.']
    ],
    s3Title: '3. Tarayıcı izinleri ve amaçları',
    s3Caption: 'AntiRacketMantis tarafından istenen tarayıcı izinleri',
    s3Headers: ['İzin', 'Neden gerekir'],
    s3Rows: [
      ['storage', 'Koruma seviyesini, istisnaları, çerez ayarını ve tanılama günlüğünü yerel saklar.'],
      ['declarativeNetRequest', 'Tarayıcı motorunun yerleşik listelerle reklamları, izleyicileri, zararlı alan adlarını ve URL takip etiketlerini engellemesini sağlar.'],
      ['scripting', 'Seçtiğiniz seviyeye göre kozmetik gizleme, açılır pencere koruması, çerez reddi ve parmak izi kurallarını uygular.'],
      ['tabs ve activeTab', 'Açılır pencerede geçerli sitenin durumunu göstermek, istisna değiştirmek ve sekmeyi yenilemek için etkin sekme adresini okur.'],
      ['Tüm sitelere erişim (http://*/*, https://*/*)', 'İstisna listeniz dışındaki tüm ziyaret edilen sitelerde ağ ve sayfa kurallarını uygulamak için gereklidir.']
    ],
    s3CalloutTitle: 'Teknik izin kapsamı ve gerçek davranış:',
    s3CalloutText: 'tarayıcının “Tüm web sitelerindeki verilerinizi okuyabilir ve değiştirebilir” uyarısı yalnızca reklam kutularını gizlemek ve çerez bildirimleriyle etkileşmek için gereken teknik izni gösterir. Temel filtreleme parolalarınızı, özel mesajlarınızı veya kapalı form içeriklerini okumaz ve gezinme geçmişinizi geliştiriciye göndermez.',
    s4Title: '4. Ağ istekleri ve harici servisler',
    s4Paragraphs: [
      'Temel koruma — reklam, izleyici, bağlantı etiketi, açılır pencere engelleme ve çerez bildirimi yönetimi — yerleşik listelerle tarayıcınızda yerel çalışır ve gezinme geçmişinizi geliştiriciye veya üçüncü taraflara göndermez.',
      'İncelenen kod tabanında ek ağ modülleri de bulunur. Denetlenen sürümde bu modüllerin bazı ağ ayarları varsayılan olarak açıktır; yani kullanıcının ayrı bir açma adımı olmadan harici servise istek gidebilir. Bu nedenle mevcut derlemenin tüm kiplerde yalnızca yerel çalıştığı söylenemez.',
      'Bu tür istekler işlenen görseli, anahtarlı servis seçiliyse erişim anahtarını ve görev kimliğini iletebilir. Her harici istekte karşı servis bağlantı IP adresini görür; ayrı IP kontrolü yalnızca ayarlardan kullanıcı başlattığında çalışır. İncelenen isteklerde çerezler ve kaynak sayfa Referer bilgisi gönderilmez. Ağ modülleri ayarlardan kapatılabilir.',
      'Ağ isteklerinin nihai listesi, varsayılan ayarları ve açıklamaları resmi mağaza yayını öncesinde ek paket denetimi gerektirir.'
    ],
    s5ProTitle: '5. Planlanan PRO özellikleri',
    s5ProBadge: 'Geliştiriliyor',
    s5ProText: 'AntiRacketMantis PRO özellikleri (yerel sinir ağları, görüntü analizi ve otomasyon dâhil) henüz yayınlanmadı. PRO’nun veri işleme düzeni abonelik açılmadan önce ayrıca belgelenecek ve denetlenecektir.',
    s6Title: '6. Verilerinizi yönetme ve silme',
    s6TextBefore: 'Tanılama günlüğünü ayarlardan istediğiniz zaman kapatabilir veya temizleyebilir, listelerden alan adlarını çıkarabilir ya da uzantıyı tarayıcınızdan kaldırarak tüm yerel verileri silebilirsiniz (',
    s6UninstallLinkText: 'kaldırma rehberi',
    s6TextAfter: ').',
    nudge: {
      title: 'İlgili belgeler',
      text: 'Taslak Kullanım Koşullarını ve Bilinen Koruma Sınırlarını da inceleyin.',
      actions: [
        ['terms', 'Kullanım Koşulları', 'btn-primary'],
        ['limits', 'Bilinen sınırlar', 'btn-secondary']
      ]
    }
  },

  terms: {
    eyebrow: 'Hukuki bilgi',
    title: 'Kullanım Koşulları (Taslak)',
    lead: 'Resmi yayın öncesinde AntiRacketMantis web sitesi ve tarayıcı uzantısına ilişkin taslak kullanım koşulları.',
    mascotAlt: 'Taslak koşulları inceleyen peygamberdevesi Minty',
    draftBadge: 'Taslak · hukuk incelemesi gerektirir',
    draftTitle: 'Önemli bildirim',
    draftText: `Bu belge ${VERSION} sürümü hazırlık aşamasında ön taslak olarak düzenlenmiştir. Hukuk incelemesi gerektirir ve uydurma tüzel kişilik bilgileri içermez. Kesinleşmemiş tüm noktalar aşağıdaki Açık Sorular bölümünde belirtilmiştir.`,
    sections: [
      {
        title: '1. Kullanım lisansı',
        paragraphs: [
          'Uzantı, resmi yayın sonrasında desteklenen tarayıcılarda (Google Chrome / Chromium ve Mozilla Firefox) olağan kişisel kullanım için; bu web sitesi ise ürün özellikleri, sınırları ve belgeleri hakkında bilgi sunmak amacıyla sağlanır.',
          'AntiRacketMantis adı, maskot, site tasarımı ve özgün içerikler üzerindeki haklar WillowinWorlds kapsamındaki hak sahiplerine aittir; gömülü üçüncü taraf filtre listeleri ve açık kitaplıklar kendi açık lisanslarına tabidir.'
        ]
      },
      {
        title: '2. Kabul edilebilir kullanım',
        items: [
          'Uzantıyı yürürlükteki yasalara, ziyaret ettiğiniz sitelerin kurallarına ve üçüncü taraf haklarına uygun biçimde kullanmayı kabul edersiniz.',
          'Değiştirilmiş veya resmi olmayan derlemeleri resmi AntiRacketMantis sürümü gibi sunmak ya da site materyallerini yanıltıcı biçimde kullanmak yasaktır.'
        ]
      },
      {
        title: '3. Sorumluluk reddi (“olduğu gibi”)',
        paragraphs: [
          'Uzantı ve web sitesi, hatasız çalışma, kesintisiz erişim veya her web sitesiyle tam uyumluluk konusunda açık ya da zımni bir taahhüt olmaksızın “olduğu gibi” sunulur.',
          'Reklam, izleyici, çerez bildirimi ve açılır pencere filtrelemesinin etkinliği sitelerdeki değişikliklere, tarayıcı olanaklarına ve seçtiğiniz koruma seviyesine bağlıdır.'
        ]
      },
      {
        title: '4. Sorumluluğun sınırlandırılması',
        paragraphs: [
          'Yürürlükteki hukukun izin verdiği en geniş ölçüde geliştirici; dolaylı zararlardan, kazanç kaybından, üçüncü taraf sitelerdeki görünüm bozukluklarından veya sıkı filtre kuralları nedeniyle giriş/ödeme kesintilerinden sorumlu değildir — bu durumlar için her sitede tek tıkla istisna anahtarı bulunur.'
        ]
      },
      {
        title: '5. Koşulların güncellenmesi ve kullanımın sonlandırılması',
        paragraphs: [
          'Bu koşullar mağaza yayını öncesinde kesinleştirilecek ve planlanan PRO aboneliği açılmadan önce ayrı abonelik koşullarıyla güncellenecektir. Siteyi kapatarak ve uzantıyı tarayıcınızdan kaldırarak kullanımı istediğiniz zaman sonlandırabilirsiniz.'
        ]
      },
      {
        title: '6. İletişim',
        paragraphs: [
          `Geliştirici stüdyonun resmi web sitesi: WillowinWorlds (${STUDIO}). AntiRacketMantis için ayrı destek ve hukuk e-posta adresi henüz kesinleşmemiştir ve Açık Sorular bölümünde yer almaktadır.`
        ]
      }
    ],
    openTitle: 'Açık sorular (sahip ve hukuk onayı bekleniyor)',
    openIntro: 'Bu bilgiler onay alınmadan tahmin edilmemiş ve bilerek boş bırakılmıştır:',
    openItems: [
      ['Uygulanacak hukuk ve yetki:', 'Kullanım Koşulları ve Gizlilik Politikasını düzenleyecek ülke/hukuk sistemi.'],
      ['Hak sahibi ve künye bilgileri:', 'WillowinWorlds adına hareket eden tüzel veya gerçek kişinin tam unvanı ve yasal adresi.'],
      ['Resmi iletişim e-postası:', 'destek, hukuki başvurular ve security.txt için kesin e-posta adresi.'],
      ['Yürürlük tarihi, lisans ve PRO koşulları:', 'belgelerin yürürlük tarihi, nihai dağıtım lisansı ve PRO lansmanı öncesi abonelik koşulları.']
    ],
    nudge: {
      title: 'Gizlilik ve verilerle ilgili sorularınız mı var?',
      text: 'Ön Gizlilik Politikamızı inceleyin veya Destek sayfasına geçin.',
      actions: [
        ['privacy', 'Gizlilik Politikası', 'btn-primary'],
        ['support', 'Destek', 'btn-secondary']
      ]
    }
  },

  faqPage: {
    eyebrow: 'Net yanıtlar',
    title: 'Sıkça Sorulan Sorular',
    lead: 'Kurulum, izinler, veri kullanımı, performans, tarayıcı uyumluluğu, planlanan PRO sürümü ve kaldırma hakkında kısa ve dürüst yanıtlar.',
    mascotAlt: 'Sık sorulan soruları yanıtlayan peygamberdevesi Minty',
    items: [
      {
        q: 'AntiRacketMantis şu anda mağazadan yüklenebilir mi?',
        a: `Sürüm ${VERSION}, Chrome Web Store ve Firefox Add-ons’ta ilk herkese açık yayınına hazırlanıyor. Kurulum sayfasında adım adım rehber ve tarayıcı izinleri şimdiden yer alıyor; doğrudan bağlantılar yayınla birlikte eklenecektir.`
      },
      {
        q: 'Ücretsiz sürümde hangi temel özellikler yer alıyor?',
        a: 'Temel koruma ücretsizdir: ağ ve kozmetik reklam engelleme, izleyici ve zararlı alan adı koruması, bağlantı takip etiketi temizleme, isteğe bağlı çerez reddi, açılır pencere koruması, parmak izi ayarları, 5 seviye ve site istisnaları.'
      },
      {
        q: 'Tek bir sitede korumayı nasıl kapatırım?',
        a: 'Araç çubuğundan AntiRacketMantis penceresini açın, site koruma anahtarını kapatın ve Yenile’ye tıklayın. Diğer tüm siteler seçtiğiniz seviyede korunmaya devam eder.'
      },
      {
        q: 'Uzantı neden tüm sitelere (http/https) erişim izni istiyor?',
        a: 'Tarayıcıların ağ ve kozmetik kuralları uygulayıp çerez bildirimlerini yönetebilmesi için bu teknik izin şarttır. Temel filtreleme parolalarınızı veya özel mesajlarınızı okumaz ve gezinme geçmişinizi geliştiriciye göndermez.'
      },
      {
        q: 'Bu web sitesi ve uzantı hangi verileri kullanır?',
        a: 'Bu statik web sitesinde çerez, analitik ve form yoktur; yalnızca animasyon tercihi localStorage’da saklanır. Uzantıda ayarlar ve istisnalar yerel kalır, temel filtreleme yerleşik listelerle çalışır. Denetlenen derlemedeki ek ağ modüllerinin bazı varsayılan ayarları dış istek yapabilir; ayrıntılar ve ek denetim durumu Gizlilik Politikasında açıklanmıştır.'
      },
      {
        q: 'Uzantı tarayıcıyı yavaşlatır mı?',
        a: 'Ağ filtrelemesi yerleşik listelerle doğrudan tarayıcının declarativeNetRequest motorunda çalışır; gezinirken arka planda liste indirilmez. Kozmetik betikler ve pop-up koruması Seviye 3 (Dengeli) ile devreye girer. Gerçek etki siteye ve seviyeye bağlı olduğundan uydurma hız yüzdeleri paylaşmıyoruz.'
      },
      {
        q: 'Bazı sitelerde reklamlar neden hâlâ görünüyor?',
        a: 'Öncelikle varsayılan Seviye 2 (Hafif koruma) uyumluluk için kozmetik gizlemeyi kapalı tutar; tam reklam engelleme için Seviye 3 (Dengeli) seçin. Ayrıca siteler düzenlerini sık değiştirir ve aynı alan adından birinci taraf reklam sunabilir.'
      },
      {
        q: 'Çerez bildirimini gizlemek tüm çerezlerin reddedildiği anlamına gelir mi?',
        a: 'Her zaman değil. Uzantı desteklenen onay pencerelerinde isteğe bağlı çerezleri reddetmeye çalışır. Sıkı seviyede yalnızca bildirim betiği engellendiyse site yine de zorunlu veya güvenlik çerezleri yerleştirebilir.'
      },
      {
        q: 'Hangi tarayıcılar destekleniyor?',
        a: 'Google Chrome / Chromium (110+) ve Mozilla Firefox (128+) sürümleri hazırlanıyor. Safari ve mobil tarayıcılar henüz test edilmemiştir ve destek vadedilmez.'
      },
      {
        q: 'AntiRacketMantis PRO nedir ve ne zaman çıkacak?',
        a: 'PRO, aynı uzantı içinde sunulması planlanan ($39/ay planlanan fiyat) ve şu anda geliştirme aşamasında olan isteğe bağlı aboneliktir. Yerel sinir ağları, yapay zekâ destekli CAPTCHA yardımı ve gelişmiş otomasyon planlanmaktadır. Çıkış tarihi belirlenmemiştir, ödeme kapalıdır ve doğrulamaların geçileceği vadedilmez.'
      },
      {
        q: 'Uzantı internette tam anonimlik sağlar mı?',
        a: 'Hayır. Bilinen izleyicileri azaltır, bağlantı etiketlerini temizler ve Seviye 5’te parmak izi koruması ekler; ancak IP adresinizi gizlemez ve dikkatli internet kullanımının yerini tutmaz.'
      },
      {
        q: 'Tarayıcıda Gizli Mod varken neden izleyici engelleyici kullanmalıyım?',
        a: 'Gizli Mod yalnızca pencereyi kapattıktan sonra cihazda geçmiş ve çerez saklamaz; oturum sırasında üçüncü taraf izleyicilerin yüklenmesini engellemez. AntiRacketMantis bilinen izleyicileri sayfa yüklenirken durdurur; yine de ne Gizli Mod ne de uzantı IP adresinizi gizler.'
      },
      {
        q: 'Bir site bozulursa veya giriş yapamazsam ne yapmalıyım?',
        a: 'Önce uzantı penceresinden o site için korumayı kapatıp sekmeyi yenileyin. Sorun yalnızca Seviye 4–5’te (üçüncü taraf giriş veya HTTP-only site) yaşanıyorsa Seviye 3 (Dengeli) seçin ya da alan adını istisnalara ekleyin.'
      },
      {
        q: 'Uzantıyı nasıl kaldırırım ve ayarlarıma ne olur?',
        a: 'Chrome’da chrome://extensions, Firefox’ta about:addons sayfasından Kaldır’a tıklayın. Tarayıcı uzantının yerel depolamasını, ayarlarını ve günlüğünü otomatik siler.'
      }
    ],
    nudge: {
      title: 'Aradığınız yanıtı bulamadınız mı?',
      text: 'Sorun giderme adımları için Destek sayfasına veya Bilinen Sınırlara göz atın.',
      actions: [
        ['support', 'Destek', 'btn-primary'],
        ['limits', 'Bilinen sınırlar', 'btn-secondary']
      ]
    }
  },

  support: {
    eyebrow: 'Yardım ve tanılama',
    title: 'AntiRacketMantis Destek',
    lead: 'Bir sayfa düzgün görünmediğinde iki dakikada deneyebileceğiniz hızlı kontroller ve geliştirici stüdyoya ulaşma yolları.',
    mascotAlt: 'Sorun gidermeye yardımcı olan peygamberdevesi Minty',
    cards: [
      {
        icon: 'sliders',
        title: 'Bir site açılmıyor veya bozuldu',
        p1: 'Uzantı penceresini açın, o site için koruma anahtarını kapatın ve Yenile’ye tıklayın.',
        p2: 'Sorun yalnızca Seviye 4 veya 5’te (başka servisle giriş veya HTTPS olmayan site) oluşuyorsa Seviye 3 (Dengeli) seçeneğine geçin.'
      },
      {
        icon: 'popup',
        title: 'İstenmeyen bir açılır pencere çıktı',
        p1: 'Seviye 3 (Dengeli) veya daha yüksek bir seviyenin seçili olduğunu kontrol edin; tıklamasız açılır pencere koruması 3. seviyeden itibaren çalışır.',
        p2: 'Ayrıca site alan adının koruma dışı bırakılan istisna listesinde olmadığından emin olun.'
      },
      {
        icon: 'ad',
        title: 'Sayfada reklamlar kalıyor',
        p1: 'Varsayılan Seviye 2 (Hafif koruma) yalnızca hafif ağ filtrelemesi yapar ve kozmetik gizleme kapalıdır. Seviye 3 (Dengeli) seçin.',
        p2Prefix: 'Aynı alan adından sunulan birinci taraf reklamlar genel kurallarla eşleşmeyebilir — bkz. ',
        limitsLinkText: 'bilinen sınırlar',
        p2Suffix: '.'
      }
    ],
    devTitle: 'Geliştirici hakkında ve iletişim',
    devP1Prefix: 'AntiRacketMantis, bağımsız oyun ve uygulama stüdyosu ',
    devP1Link: 'WillowinWorlds',
    devP1Suffix: ' tarafından geliştirilir. İlk resmi mağaza sürümü hazırlanırken stüdyonun resmi web sitesi ana iletişim noktamızdır.',
    devP2Prefix: 'Ayrı destek e-postası ve herkese açık hata takip adresi resmi yayın öncesinde burada paylaşılacaktır (bkz. ',
    openQuestionsLinkText: 'açık sorular',
    devP2Suffix: '). Güvenlik bildirimleri /.well-known/security.txt dosyasında belirtilen stüdyo iletişim kanalından kabul edilir.',
    nudge: {
      title: 'Yararlı rehberler',
      text: 'Tarayıcı gereksinimlerini, sık sorulan soruları veya kaldırma adımlarını inceleyin.',
      actions: [
        ['faq', 'SSS', 'btn-primary'],
        ['compatibility', 'Uyumluluk', 'btn-secondary'],
        ['uninstall', 'Kaldırma', 'btn-cream']
      ]
    }
  },

  changelog: {
    eyebrow: 'Güncellemeler ve yol haritası',
    title: 'Sürüm Geçmişi ve Yol Haritası',
    lead: 'Yalnızca doğrulanmış ön sürüm içeriği ve uydurma çıkış tarihleri olmadan dürüst geliştirme aşamaları.',
    mascotAlt: 'Yeni sürüm aşamasını kutlayan peygamberdevesi Minty',
    versionBadge: `Sürüm ${VERSION} · ilk herkese açık yayına hazırlanıyor`,
    releaseTitle: 'İlk herkese açık sürüm hazırlığı',
    releaseItems: [
      ['Beş koruma seviyesi:', 'Uyumluluk (1) ve varsayılan Hafif koruma (2) düzeylerinden Dengeli (3), Sıkı (4) ve Maksimum (5) düzeylerine kadar.'],
      ['Yerleşik Manifest V3 kural listeleri:', 'EasyPrivacy, EasyList, uBlock filters, RU AdList, RU AdList: Counters, AdGuard Turkish, Peter Lowe, uBO Badware ve URL takip etiketi temizleme.'],
      ['Çerez bildirimleri ve pencereler:', 'desteklenen bildirimlerde bağımsız isteğe bağlı çerez reddi ve Seviye 3’ten itibaren tıklamasız açılır pencere koruması.'],
      ['Kullanıcı kontrolü:', 'uzantı penceresinde tek tıkla site anahtarı, 100’e kadar alan adı istisnası, JSON ayar aktarımı ve 14 günlük yerel tanılama günlüğü.'],
      ['Hedef tarayıcılar:', 'Chrome (110+) ve Firefox (128+) derlemeleri; uzantı arayüzünde şimdilik Rusça ve İngilizce dilleri bulunur.']
    ],
    roadmapTitle: 'Yol Haritası',
    roadmapIntro: 'Tamamlanan, süren ve planlanan aşamaların tarih tahmini olmadan dürüst özeti:',
    roadmapStages: [
      {
        status: 'done',
        badge: '0.11.0 sürümünde hazır',
        title: 'Temel koruma (ücretsiz sürüm)',
        items: [
          'Yerleşik Manifest V3 listeleriyle 5 seviyeli reklam ve izleyici filtreleme',
          'İsteğe bağlı çerez bildirimi reddi ve Seviye 3+ pop-up / pop-under koruması',
          'Site istisnaları, JSON aktarımı, açık/koyu temalar ve RU/EN uzantı arayüzü'
        ]
      },
      {
        status: 'in-progress',
        badge: 'Devam ediyor',
        title: 'Resmi tarayıcı mağazası yayın hazırlığı',
        items: [
          'Yayın paketindeki varsayılan ağ ayarlarının ve veri akışlarının son denetimi',
          'Gizlilik Politikası ve Kullanım Koşullarının hukuk incelemesi',
          'Chrome Web Store ve Firefox Add-ons yayını ile resmi mağaza bağlantılarının eklenmesi'
        ]
      },
      {
        status: 'in-development',
        badge: 'Geliştiriliyor · PRO planları',
        title: 'AntiRacketMantis PRO ($39/ay planlanan fiyat)',
        items: [
          'Aynı uzantı içinde isteğe bağlı PRO aboneliği (temel koruma ücretsiz kalır)',
          'Yerel sinir ağları, görüntü analizi ve yapay zekâ destekli CAPTCHA yardımı (geçme vaadi olmadan)',
          'Gelişmiş rutin tarayıcı otomasyonu, ek araçlar ve yayın öncesi ayrı veri denetimi'
        ]
      }
    ],
    nudge: {
      title: 'Daha fazlasını keşfetmek ister misiniz?',
      text: 'Tüm koruma araçlarını, PRO planlarını veya kurulum rehberini inceleyin.',
      actions: [
        ['features', 'Özellikler', 'btn-primary'],
        ['pro', 'PRO planları', 'btn-secondary'],
        ['install', 'Kurulum rehberi', 'btn-cream']
      ]
    }
  },

  notFound: {
    eyebrow: 'Hata 404',
    title: 'Sanırım yolumuzu biraz kaybettik.',
    text: 'Aradığınız sayfa burada yok — en dikkatli koruyucu bile bazen bir sekmesini kaybedebilir.',
    mascotAlt: 'Kayıp sayfayı büyüteçle arayan peygamberdevesi Minty',
    homeBtn: 'Ana sayfa (TR)',
    installBtn: 'Kurulum',
    featuresBtn: 'Özellikler',
    faqBtn: 'SSS',
    supportBtn: 'Destek'
  }
};
