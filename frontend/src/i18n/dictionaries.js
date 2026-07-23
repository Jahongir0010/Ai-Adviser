// Shared vocabulary lookups. Keyed by the canonical English string already
// used in data/*.js (or by region id), so existing data files don't need to
// change shape. trMap()/trRegionName() resolve the current locale.

export function trMap(map, key, locale) {
  if (!key) return key
  if (locale === 'en') return key
  return map[key]?.[locale] ?? key
}

export const LEVELS = {
  Low: { uz: 'Past', ru: 'Низкий' },
  Medium: { uz: "O'rta", ru: 'Средний' },
  High: { uz: 'Yuqori', ru: 'Высокий' },
}

export const REGION_NAMES = {
  qoraqalpogiston: { en: 'Karakalpakstan', uz: "Qoraqalpog'iston", ru: 'Каракалпакстан' },
  xorazm: { en: 'Khorezm', uz: 'Xorazm', ru: 'Хорезм' },
  navoiy: { en: 'Navoiy', uz: 'Navoiy', ru: 'Навои' },
  buxoro: { en: 'Bukhara', uz: 'Buxoro', ru: 'Бухара' },
  qashqadaryo: { en: 'Kashkadarya', uz: 'Qashqadaryo', ru: 'Кашкадарья' },
  surxondaryo: { en: 'Surkhandarya', uz: 'Surxondaryo', ru: 'Сурхандарья' },
  samarqand: { en: 'Samarkand', uz: 'Samarqand', ru: 'Самарканд' },
  jizzax: { en: 'Jizzakh', uz: 'Jizzax', ru: 'Джизак' },
  sirdaryo: { en: 'Syrdarya', uz: 'Sirdaryo', ru: 'Сырдарья' },
  toshkent_v: { en: 'Tashkent Region', uz: 'Toshkent viloyati', ru: 'Ташкентская область' },
  toshkent_c: { en: 'Tashkent City', uz: 'Toshkent shahri', ru: 'город Ташкент' },
  namangan: { en: 'Namangan', uz: 'Namangan', ru: 'Наманган' },
  fargona: { en: 'Fergana', uz: "Farg'ona", ru: 'Фергана' },
  andijon: { en: 'Andijan', uz: 'Andijon', ru: 'Андижан' },
}

export function trRegionName(regionId, locale) {
  const entry = REGION_NAMES[regionId]
  if (!entry) return regionId
  return entry[locale] ?? entry.en
}

export const TRAITS = {
  'Digital Payments': { uz: "Raqamli to'lovlar", ru: 'Цифровые платежи' },
  'Online Shopping': { uz: 'Onlayn xarid', ru: 'Онлайн-покупки' },
  'Brand Loyalty': { uz: 'Brendga sodiqlik', ru: 'Лояльность к бренду' },
  'Price Sensitivity': { uz: 'Narxga sezgirlik', ru: 'Чувствительность к цене' },
  'Local Sourcing': { uz: "Mahalliy ta'minot", ru: 'Локальные закупки' },
  'Delivery Expectation': { uz: 'Yetkazib berishga talab', ru: 'Ожидания по доставке' },
}

export const TAGS = {
  'Market Trend': { uz: 'Bozor tendensiyasi', ru: 'Рыночный тренд' },
  'Competitor Alert': { uz: 'Raqobatchi ogohlantirishi', ru: 'Оповещение о конкурентах' },
  Opportunity: { uz: 'Imkoniyat', ru: 'Возможность' },
  'Risk Update': { uz: 'Xavf yangilanishi', ru: 'Обновление риска' },
}

export const MONTHS = {
  Jan: { uz: 'Yan', ru: 'Янв' },
  Feb: { uz: 'Fev', ru: 'Фев' },
  Mar: { uz: 'Mar', ru: 'Мар' },
  Apr: { uz: 'Apr', ru: 'Апр' },
  May: { uz: 'May', ru: 'Май' },
  Jun: { uz: 'Iyun', ru: 'Июн' },
  Jul: { uz: 'Iyul', ru: 'Июл' },
  Aug: { uz: 'Avg', ru: 'Авг' },
  Sep: { uz: 'Sen', ru: 'Сен' },
  Oct: { uz: 'Okt', ru: 'Окт' },
  Nov: { uz: 'Noy', ru: 'Ноя' },
  Dec: { uz: 'Dek', ru: 'Дек' },
}

export const INDUSTRIES = {
  'Textile & Cotton Processing': { uz: "To'qimachilik va paxta qayta ishlash", ru: 'Текстиль и переработка хлопка' },
  'Agro-Logistics': { uz: 'Agrologistika', ru: 'Агрологистика' },
  'Renewable Energy': { uz: 'Qayta tiklanuvchi energiya', ru: 'Возобновляемая энергетика' },
  'Tourism & Hospitality': { uz: "Turizm va mehmondo'stlik", ru: 'Туризм и гостеприимство' },
  'Handicrafts Export': { uz: 'Hunarmandchilik eksporti', ru: 'Экспорт ремесленных изделий' },
  'Food Processing': { uz: 'Oziq-ovqat qayta ishlash', ru: 'Пищевая переработка' },
  'Mining & Metallurgy': { uz: 'Kon-metallurgiya sanoati', ru: 'Горнодобыча и металлургия' },
  'Free Industrial Zone Manufacturing': {
    uz: 'Erkin industrial zona ishlab chiqarishi',
    ru: 'Производство в свободной индустриальной зоне',
  },
  'Logistics Hub Services': { uz: 'Logistika markazi xizmatlari', ru: 'Услуги логистического хаба' },
  'Heritage Tourism': { uz: 'Meros turizmi', ru: 'Историко-культурный туризм' },
  'Natural Gas Services': { uz: 'Tabiiy gaz xizmatlari', ru: 'Услуги в сфере природного газа' },
  'Carpet & Textile Manufacturing': { uz: "Gilam va to'qimachilik ishlab chiqarishi", ru: 'Производство ковров и текстиля' },
  'Chemical & Gas Processing': { uz: 'Kimyo va gaz qayta ishlash', ru: 'Химическая и газовая переработка' },
  'Construction Materials': { uz: 'Qurilish materiallari', ru: 'Строительные материалы' },
  Agribusiness: { uz: 'Agrobiznes', ru: 'Агробизнес' },
  'Cross-border Trade & Logistics': { uz: 'Chegararo savdo va logistika', ru: 'Трансграничная торговля и логистика' },
  'Fruit & Vegetable Export': { uz: 'Meva-sabzavot eksporti', ru: 'Экспорт фруктов и овощей' },
  Textiles: { uz: "To'qimachilik", ru: 'Текстиль' },
  'Food & Wine Production': { uz: 'Oziq-ovqat va vino ishlab chiqarish', ru: 'Производство продуктов питания и вина' },
  'Education Services': { uz: "Ta'lim xizmatlari", ru: 'Образовательные услуги' },
  'Special Economic Zone Manufacturing': {
    uz: 'Maxsus iqtisodiy zona ishlab chiqarishi',
    ru: 'Производство в специальной экономической зоне',
  },
  'Agro-processing': { uz: 'Agrosanoat qayta ishlash', ru: 'Агропереработка' },
  'Automotive Components': { uz: "Avtomobil ehtiyot qismlari", ru: 'Автокомпоненты' },
  'Grain & Agro-logistics': { uz: "G'alla va agrologistika", ru: 'Зерно и агрологистика' },
  'Energy Infrastructure': { uz: 'Energetika infratuzilmasi', ru: 'Энергетическая инфраструктура' },
  Warehousing: { uz: "Ombor xo'jaligi", ru: 'Складское хозяйство' },
  'Logistics & Warehousing': { uz: "Logistika va ombor xo'jaligi", ru: 'Логистика и складское хозяйство' },
  'Light Manufacturing': { uz: 'Yengil sanoat ishlab chiqarishi', ru: 'Лёгкая промышленность' },
  'Real Estate Development': { uz: "Ko'chmas mulk rivojlantirish", ru: 'Развитие недвижимости' },
  'FinTech & IT Services': { uz: 'FinTech va IT xizmatlari', ru: 'Финтех и IT-услуги' },
  'E-commerce': { uz: 'Elektron tijorat', ru: 'Электронная торговля' },
  'Professional Services': { uz: 'Professional xizmatlar', ru: 'Профессиональные услуги' },
  'Premium Retail': { uz: 'Premium chakana savdo', ru: 'Премиальная розница' },
  'Textile Manufacturing': { uz: "To'qimachilik ishlab chiqarishi", ru: 'Текстильное производство' },
  'Footwear Production': { uz: "Poyabzal ishlab chiqarish", ru: 'Производство обуви' },
  Petrochemicals: { uz: 'Neft-kimyo sanoati', ru: 'Нефтехимия' },
  'Textile & Apparel': { uz: "To'qimachilik va tayyor kiyim", ru: 'Текстиль и одежда' },
  'Consumer Electronics Assembly': { uz: "Maishiy elektronika yig'ish", ru: 'Сборка бытовой электроники' },
  'Automotive Manufacturing': { uz: 'Avtomobil ishlab chiqarish', ru: 'Автомобилестроение' },
  'Consumer Goods': { uz: "Iste'mol tovarlari", ru: 'Потребительские товары' },
  'FinTech & IT': { uz: 'FinTech va IT', ru: 'Финтех и IT' },
  Logistics: { uz: 'Logistika', ru: 'Логистика' },
  Tourism: { uz: 'Turizm', ru: 'Туризм' },
  Textile: { uz: "To'qimachilik", ru: 'Текстиль' },
  Construction: { uz: 'Qurilish', ru: 'Строительство' },
}

// Keyed by the canonical English string used in data/markets.js, matching the
// REGION_NAMES/INDUSTRIES convention above (trMap returns the key as-is for 'en').
export const PRODUCT_NAMES = {
  Fruit: { uz: 'Meva', ru: 'Фрукты' },
  Vegetables: { uz: 'Sabzavot', ru: 'Овощи' },
  Meat: { uz: "Go'sht", ru: 'Мясо' },
  Dairy: { uz: 'Sut mahsulotlari', ru: 'Молочные продукты' },
  Spices: { uz: 'Ziravorlar', ru: 'Специи' },
  Bread: { uz: 'Non', ru: 'Хлеб' },
  Nuts: { uz: "Yong'oq", ru: 'Орехи' },
  Flowers: { uz: 'Gullar', ru: 'Цветы' },
  Textile: { uz: "To'qimachilik", ru: 'Текстиль' },
  Shoes: { uz: 'Poyabzal', ru: 'Обувь' },
}

export const MARKET_TYPE_NAMES = {
  "Farmers' market": { uz: 'Dehqon bozori', ru: 'Дехканский рынок' },
  Wholesale: { uz: 'Ulgurji', ru: 'Оптовый' },
  Retail: { uz: 'Chakana', ru: 'Розничный' },
  Universal: { uz: 'Universal', ru: 'Универсальный' },
}

export const COVERAGE_NAMES = {
  Republic: { uz: 'Respublika', ru: 'Республика' },
  Region: { uz: 'Viloyat', ru: 'Область' },
  District: { uz: 'Tuman', ru: 'Район' },
}

export const SALE_TYPES = {
  Retail: { uz: 'Chakana', ru: 'Розница' },
  Wholesale: { uz: 'Ulgurji', ru: 'Опт' },
  Export: { uz: 'Eksport', ru: 'Экспорт' },
}

export const GOV_PROGRAMS = {
  'Aral Sea Region Investment Incentives': {
    uz: "Orolbo'yi mintaqasi investitsiya imtiyozlari",
    ru: 'Инвестиционные льготы региона Приаралья',
  },
  'Free Economic Zone "Nukus"': { uz: '"Nukus" erkin iqtisodiy zonasi', ru: 'Свободная экономическая зона «Нукус»' },
  'Khiva Tourism Cluster Grants': { uz: 'Xiva turizm klasteri grantlari', ru: 'Гранты туристического кластера Хивы' },
  'Rural Business Microloans': { uz: 'Qishloq biznesi uchun mikrokreditlar', ru: 'Микрокредиты для сельского бизнеса' },
  'Navoiy Free Industrial Zone Tax Holiday': {
    uz: 'Navoiy erkin sanoat zonasi soliq tatili',
    ru: 'Налоговые каникулы свободной индустриальной зоны Навои',
  },
  'Export Manufacturing Subsidy': {
    uz: "Eksportga yo'naltirilgan ishlab chiqarish subsidiyasi",
    ru: 'Субсидия для экспортного производства',
  },
  'Silk Road Tourism Development Fund': {
    uz: "Ipak yo'li turizmini rivojlantirish fondi",
    ru: 'Фонд развития туризма «Шёлковый путь»',
  },
  'SME Equipment Leasing Program': {
    uz: 'Kichik biznes uchun uskunalar lizingi dasturi',
    ru: 'Программа лизинга оборудования для МСБ',
  },
  'Shurtan Industrial Corridor Incentives': {
    uz: 'Shurtan sanoat koridori imtiyozlari',
    ru: 'Льготы индустриального коридора Шуртан',
  },
  'Termez International Trade Center Incentives': {
    uz: 'Termiz xalqaro savdo markazi imtiyozlari',
    ru: 'Льготы международного торгового центра Термез',
  },
  'Samarkand Tourism Master Plan Grants': {
    uz: 'Samarqand turizm bosh rejasi grantlari',
    ru: 'Гранты генплана туризма Самарканда',
  },
  'Youth Entrepreneurship Fund': { uz: 'Yoshlar tadbirkorligi fondi', ru: 'Фонд молодёжного предпринимательства' },
  'Jizzakh Free Economic Zone Incentives': {
    uz: 'Jizzax erkin iqtisodiy zonasi imtiyozlari',
    ru: 'Льготы свободной экономической зоны Джизак',
  },
  'China-Uzbekistan Industrial Park Program': {
    uz: "Xitoy-O'zbekiston sanoat texnoparki dasturi",
    ru: 'Программа индустриального парка Китай–Узбекистан',
  },
  'Rural Business Development Grants': {
    uz: 'Qishloq biznesini rivojlantirish grantlari',
    ru: 'Гранты на развитие сельского бизнеса',
  },
  'Tashkent Region Industrial Park Benefits': {
    uz: 'Toshkent viloyati sanoat texnopark imtiyozlari',
    ru: 'Льготы индустриального парка Ташкентской области',
  },
  'Green Energy Investment Program': {
    uz: 'Yashil energetika investitsiya dasturi',
    ru: 'Программа инвестиций в зелёную энергетику',
  },
  'IT Park Tax Exemptions': { uz: 'IT Park soliq imtiyozlari', ru: 'Налоговые льготы IT Park' },
  'Startup Ecosystem Grants': { uz: 'Startap ekotizimi grantlari', ru: 'Гранты стартап-экосистемы' },
  'Digital Uzbekistan 2030': { uz: "Raqamli O'zbekiston 2030", ru: 'Цифровой Узбекистан 2030' },
  'Fergana Valley SME Cluster Support': {
    uz: "Farg'ona vodiysi kichik biznes klasterini qo'llab-quvvatlash",
    ru: 'Поддержка кластера МСБ Ферганской долины',
  },
  'Fergana Industrial Zone Incentives': {
    uz: "Farg'ona sanoat zonasi imtiyozlari",
    ru: 'Льготы индустриальной зоны Ферганы',
  },
  'Andijan Automotive Cluster Support': {
    uz: "Andijon avtomobilsozlik klasterini qo'llab-quvvatlash",
    ru: 'Поддержка автомобильного кластера Андижана',
  },
  'Export Promotion Subsidy': { uz: "Eksportni rag'batlantirish subsidiyasi", ru: 'Субсидия для стимулирования экспорта' },
}
