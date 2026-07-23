// Illustrative bozor (market) dataset for the Market Reports page demo.
// Figures are indicative mock values, not verified statistics. regionId values
// match the backend's canonical region ids (see backend/data/regions.json),
// so the map/chart aggregations line up with the real Uzbekistan boundaries
// used elsewhere in the app. Enum-like fields (products/marketType/coverage)
// use the same "canonical English string, translated via i18n/dictionaries.js"
// convention as data/regions.js's recommendedIndustries.

export const MARKET_TYPES = ["Farmers' market", 'Wholesale', 'Retail', 'Universal']
export const COVERAGE_LEVELS = ['Republic', 'Region', 'District']

// Numeric regionId -> trilingual name, matching backend/data/regions.json ids
// (see i18n/dictionaries.js REGION_NAMES, which uses the dashboard's string slugs instead).
export const REGION_NAMES_BY_ID = {
  1: { en: 'Andijan', uz: 'Andijon', ru: 'Андижан' },
  2: { en: 'Bukhara', uz: 'Buxoro', ru: 'Бухара' },
  3: { en: 'Jizzakh', uz: 'Jizzax', ru: 'Джизак' },
  4: { en: 'Navoiy', uz: 'Navoiy', ru: 'Навои' },
  5: { en: 'Namangan', uz: 'Namangan', ru: 'Наманган' },
  6: { en: 'Samarkand', uz: 'Samarqand', ru: 'Самарканд' },
  7: { en: 'Syrdarya', uz: 'Sirdaryo', ru: 'Сырдарья' },
  8: { en: 'Surkhandarya', uz: 'Surxondaryo', ru: 'Сурхандарья' },
  9: { en: 'Tashkent Region', uz: 'Toshkent viloyati', ru: 'Ташкентская область' },
  10: { en: 'Tashkent City', uz: 'Toshkent shahri', ru: 'город Ташкент' },
  11: { en: 'Fergana', uz: "Farg'ona", ru: 'Фергана' },
  12: { en: 'Khorezm', uz: 'Xorazm', ru: 'Хорезм' },
  13: { en: 'Kashkadarya', uz: 'Qashqadaryo', ru: 'Кашкадарья' },
  14: { en: 'Karakalpakstan', uz: "Qoraqalpog'iston", ru: 'Каракалпакстан' },
}

export function getRegionName(regionId, locale) {
  const entry = REGION_NAMES_BY_ID[regionId]
  if (!entry) return ''
  return entry[locale] ?? entry.en
}

/** Opens Google Maps turn-by-turn directions to the market's coordinates. */
export function getGoogleMapsDirectionsUrl(market) {
  const { lat, lng } = market.coordinates
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
}

/**
 * Matches backend `GET /api/bozorlar` entries to this file's MARKETS by
 * regionId (most regions only have one photographed market and one entry
 * here, so that alone is enough) - when a region has more than one of each
 * (currently just Tashkent: Chorsu + Oloy), disambiguate by comparing each
 * side's first name word ("Chorsu"/"Oloy").
 * @param {{regionId: number, bozorNomi: string, rasmUrl: string}[]} bozorRasmlari
 * @returns {Record<string, string>} market.id -> absolute-path rasmUrl
 */
export function matchMarketPhotos(bozorRasmlari) {
  const photosByRegion = {}
  for (const photo of bozorRasmlari) {
    ;(photosByRegion[photo.regionId] ??= []).push(photo)
  }

  const firstWord = (s) => s.trim().split(/\s+/)[0].toLowerCase()
  const result = {}

  for (const regionId of Object.keys(photosByRegion)) {
    const photos = photosByRegion[regionId]
    const candidates = MARKETS.filter((m) => String(m.regionId) === String(regionId))
    if (candidates.length === 0) continue

    if (photos.length === 1 && candidates.length === 1) {
      result[candidates[0].id] = photos[0].rasmUrl
      continue
    }

    for (const market of candidates) {
      const match = photos.find((p) => firstWord(p.bozorNomi) === firstWord(market.name.uz))
      if (match) result[market.id] = match.rasmUrl
    }
  }

  return result
}

export const MARKETS = [
  {
    id: 'chorsu-tashkent',
    coordinates: { lat: 41.3264, lng: 69.2401 },
    name: { en: 'Chorsu Bazaar', uz: 'Chorsu bozori', ru: 'Базар Чорсу' },
    regionId: 10,
    address: { en: 'Chorsu Street 1, Tashkent', uz: 'Chorsu ko‘chasi 1, Toshkent', ru: 'ул. Чорсу 1, Ташкент' },
    coverage: 'Republic',
    marketType: 'Universal',
    workingHours: '06:00–20:00',
    products: ['Fruit', 'Vegetables', 'Meat', 'Dairy', 'Spices', 'Bread'],
    facilities: { parking: true, coldStorage: true, wholesaleSection: true, retailSection: true, loadingZone: true },
    stats: { demand: 92, competition: 88, priceLevel: 62, logistics: 85, seasonality: 58, opportunity: 74, risk: 34, investmentAttractiveness: 80 },
    govSupportEligible: true,
    trend: 'up',
    avgPriceIndex: 68,
    summary: {
      en: "Uzbekistan's most iconic domed bazaar, a high-footfall universal market in central Tashkent.",
      uz: "O'zbekistonning eng mashhur gumbazli bozori, Toshkent markazidagi yuqori tashrifli universal bozor.",
      ru: 'Самый узнаваемый купольный базар Узбекистана — универсальный рынок с высокой посещаемостью в центре Ташкента.',
    },
    aiRecommendation: {
      en: 'AI identified strong opportunity here for packaged dried fruit and greenhouse vegetable trade, thanks to steady year-round footfall.',
      uz: 'AI ushbu bozorda qadoqlangan quritilgan meva va issiqxona sabzavotlari savdosi uchun yuqori imkoniyat mavjudligini aniqladi.',
      ru: 'ИИ выявил высокий потенциал для торговли упакованными сухофруктами и тепличными овощами благодаря стабильному круглогодичному потоку покупателей.',
    },
  },
  {
    id: 'oloy-tashkent',
    coordinates: { lat: 41.3111, lng: 69.2797 },
    name: { en: 'Oloy Bazaar', uz: 'Oloy bozori', ru: 'Базар Олой' },
    regionId: 10,
    address: { en: 'Oybek Street, Tashkent', uz: 'Oybek ko‘chasi, Toshkent', ru: 'ул. Айбек, Ташкент' },
    coverage: 'Region',
    marketType: 'Retail',
    workingHours: '07:00–19:00',
    products: ['Fruit', 'Vegetables', 'Dairy', 'Nuts', 'Flowers'],
    facilities: { parking: true, coldStorage: true, wholesaleSection: false, retailSection: true, loadingZone: false },
    stats: { demand: 84, competition: 79, priceLevel: 71, logistics: 76, seasonality: 55, opportunity: 69, risk: 30, investmentAttractiveness: 73 },
    govSupportEligible: false,
    trend: 'up',
    avgPriceIndex: 74,
    summary: {
      en: 'A premium retail bazaar known for fresh produce quality and a strong dairy section.',
      uz: 'Yangi mahsulotlar sifati va kuchli sut mahsulotlari bo‘limi bilan mashhur premium chakana bozor.',
      ru: 'Премиальный розничный базар, известный качеством свежей продукции и сильным молочным отделом.',
    },
    aiRecommendation: {
      en: 'AI sees room for a specialty organic produce stall targeting higher-income shoppers in this district.',
      uz: 'AI ushbu tumanda yuqori daromadli xaridorlarga mo‘ljallangan organik mahsulotlar rastasi uchun joy borligini ko‘rmoqda.',
      ru: 'ИИ видит возможность для прилавка с органической продукцией, ориентированного на покупателей с высоким доходом в этом районе.',
    },
  },
  {
    id: 'siyob-samarqand',
    coordinates: { lat: 39.6547, lng: 66.9762 },
    name: { en: 'Siyob Bazaar', uz: 'Siyob bozori', ru: 'Базар Сиёб' },
    regionId: 6,
    address: { en: 'Registon Street, Samarkand', uz: 'Registon ko‘chasi, Samarqand', ru: 'ул. Регистан, Самарканд' },
    coverage: 'Region',
    marketType: 'Universal',
    workingHours: '07:00–19:00',
    products: ['Fruit', 'Bread', 'Spices', 'Dairy', 'Nuts'],
    facilities: { parking: true, coldStorage: false, wholesaleSection: true, retailSection: true, loadingZone: true },
    stats: { demand: 88, competition: 70, priceLevel: 58, logistics: 72, seasonality: 62, opportunity: 78, risk: 33, investmentAttractiveness: 76 },
    govSupportEligible: true,
    trend: 'up',
    avgPriceIndex: 60,
    summary: {
      en: 'A historic bazaar next to Registan Square, famous for Samarkand bread and dried fruit trade.',
      uz: 'Registon maydoni yonidagi tarixiy bozor, Samarqand noni va quritilgan meva savdosi bilan mashhur.',
      ru: 'Исторический базар у площади Регистан, известный самаркандским хлебом и торговлей сухофруктами.',
    },
    aiRecommendation: {
      en: 'AI flags strong tourist-driven demand for branded, export-ready packaging of local bread and dried fruit.',
      uz: 'AI mahalliy non va quritilgan mevalarni brendlangan, eksportga tayyor qadoqlashga turistik talab yuqoriligini aniqladi.',
      ru: 'ИИ отмечает высокий туристический спрос на брендированную, готовую к экспорту упаковку местного хлеба и сухофруктов.',
    },
  },
  {
    id: 'fargona-markaziy',
    coordinates: { lat: 40.3894, lng: 71.7844 },
    name: { en: 'Fergana Central Bazaar', uz: "Farg'ona Markaziy bozori", ru: 'Центральный базар Ферганы' },
    regionId: 11,
    address: { en: 'Al-Farg’oniy Street, Fergana', uz: "Al-Farg'oniy ko'chasi, Farg'ona", ru: 'ул. Аль-Фаргани, Фергана' },
    coverage: 'Region',
    marketType: 'Universal',
    workingHours: '07:00–19:00',
    products: ['Fruit', 'Vegetables', 'Textile', 'Nuts', 'Meat'],
    facilities: { parking: true, coldStorage: true, wholesaleSection: true, retailSection: true, loadingZone: true },
    stats: { demand: 81, competition: 74, priceLevel: 55, logistics: 68, seasonality: 66, opportunity: 75, risk: 36, investmentAttractiveness: 71 },
    govSupportEligible: true,
    trend: 'up',
    avgPriceIndex: 55,
    summary: {
      en: 'A dense valley-region market combining fresh produce with local textile trade.',
      uz: 'Yangi mahsulotlar va mahalliy to‘qimachilik savdosini birlashtiruvchi zich vodiy bozori.',
      ru: 'Плотный рынок в долине, объединяющий свежую продукцию и торговлю местным текстилем.',
    },
    aiRecommendation: {
      en: 'AI suggests a cold-chain fruit export stall could capture unmet demand from nearby processing plants.',
      uz: 'AI sovutgich zanjiri orqali meva eksporti rastasi yaqin atrofdagi qayta ishlash zavodlaridan talabni qondirishi mumkinligini taklif qiladi.',
      ru: 'ИИ предполагает, что прилавок экспорта фруктов с холодовой цепью может удовлетворить неохваченный спрос соседних перерабатывающих предприятий.',
    },
  },
  {
    id: 'buxoro-markaziy',
    coordinates: { lat: 39.7747, lng: 64.4286 },
    name: { en: 'Bukhara Central Bazaar', uz: 'Buxoro Markaziy bozori', ru: 'Центральный базар Бухары' },
    regionId: 2,
    address: { en: 'Bahovuddin Naqshband Street, Bukhara', uz: "Bahovuddin Naqshband ko'chasi, Buxoro", ru: 'ул. Баховуддин Накшбанд, Бухара' },
    coverage: 'Region',
    marketType: 'Retail',
    workingHours: '07:00–19:00',
    products: ['Fruit', 'Vegetables', 'Spices', 'Textile', 'Dairy'],
    facilities: { parking: true, coldStorage: false, wholesaleSection: false, retailSection: true, loadingZone: false },
    stats: { demand: 73, competition: 61, priceLevel: 52, logistics: 63, seasonality: 60, opportunity: 68, risk: 39, investmentAttractiveness: 66 },
    govSupportEligible: false,
    trend: 'flat',
    avgPriceIndex: 51,
    summary: {
      en: 'A retail-focused bazaar serving Bukhara city with a strong spice and textile presence.',
      uz: 'Buxoro shahriga xizmat qiluvchi, ziravorlar va to‘qimachilik bo‘yicha kuchli chakana bozor.',
      ru: 'Розничный базар, обслуживающий город Бухару, с сильным присутствием специй и текстиля.',
    },
    aiRecommendation: {
      en: 'AI sees moderate opportunity for a dedicated cold-storage section to reduce produce spoilage.',
      uz: 'AI mahsulot chirishini kamaytirish uchun maxsus sovutgich bo‘limi o‘rtacha imkoniyatga ega ekanligini ko‘rmoqda.',
      ru: 'ИИ видит умеренную возможность для выделенного холодильного отдела для снижения порчи продукции.',
    },
  },
  {
    id: 'jahon-andijon',
    coordinates: { lat: 40.7821, lng: 72.3442 },
    name: { en: 'Jahon Bazaar', uz: 'Jahon bozori', ru: 'Базар Джахон' },
    regionId: 1,
    address: { en: 'Bobur Shox Street, Andijan', uz: 'Bobur Shoh ko‘chasi, Andijon', ru: 'ул. Бабур Шах, Андижан' },
    coverage: 'Region',
    marketType: 'Wholesale',
    workingHours: '06:00–18:00',
    products: ['Vegetables', 'Fruit', 'Meat', 'Textile'],
    facilities: { parking: true, coldStorage: true, wholesaleSection: true, retailSection: false, loadingZone: true },
    stats: { demand: 79, competition: 66, priceLevel: 48, logistics: 70, seasonality: 64, opportunity: 72, risk: 35, investmentAttractiveness: 69 },
    govSupportEligible: true,
    trend: 'up',
    avgPriceIndex: 47,
    summary: {
      en: 'A wholesale hub serving the Fergana Valley with strong vegetable and textile throughput.',
      uz: "Farg'ona vodiysiga xizmat qiluvchi, sabzavot va to'qimachilik aylanmasi yuqori bo'lgan ulgurji markaz.",
      ru: 'Оптовый узел, обслуживающий Ферганскую долину, с высоким оборотом овощей и текстиля.',
    },
    aiRecommendation: {
      en: 'AI recommends a regional logistics partnership to shorten transport time to Tashkent retailers.',
      uz: 'AI Toshkentdagi chakana savdogarlarga yetkazib berish vaqtini qisqartirish uchun hududiy logistika hamkorligini tavsiya qiladi.',
      ru: 'ИИ рекомендует региональное логистическое партнёрство для сокращения времени доставки ташкентским ритейлерам.',
    },
  },
  {
    id: 'namangan-markaziy',
    coordinates: { lat: 40.9983, lng: 71.6726 },
    name: { en: 'Namangan Central Bazaar', uz: 'Namangan Markaziy bozori', ru: 'Центральный базар Намангана' },
    regionId: 5,
    address: { en: 'Uychi Street, Namangan', uz: "Uychi ko'chasi, Namangan", ru: 'ул. Уйчи, Наманган' },
    coverage: 'Region',
    marketType: 'Universal',
    workingHours: '07:00–19:00',
    products: ['Textile', 'Fruit', 'Vegetables', 'Shoes'],
    facilities: { parking: true, coldStorage: false, wholesaleSection: true, retailSection: true, loadingZone: true },
    stats: { demand: 76, competition: 69, priceLevel: 50, logistics: 65, seasonality: 57, opportunity: 70, risk: 37, investmentAttractiveness: 67 },
    govSupportEligible: true,
    trend: 'flat',
    avgPriceIndex: 49,
    summary: {
      en: 'A textile-and-footwear-heavy universal market at the heart of the Fergana Valley.',
      uz: "Farg'ona vodiysi markazidagi to'qimachilik va poyabzal savdosi kuchli universal bozor.",
      ru: 'Универсальный рынок в сердце Ферганской долины с сильной торговлей текстилем и обувью.',
    },
    aiRecommendation: {
      en: 'AI notes footwear resale demand is rising faster than local supply — a stocking opportunity.',
      uz: 'AI poyabzal qayta sotish talabi mahalliy taklifdan tezroq o‘sayotganini qayd etmoqda — zaxira imkoniyati.',
      ru: 'ИИ отмечает, что спрос на перепродажу обуви растёт быстрее местного предложения — возможность для запасов.',
    },
  },
  {
    id: 'urganch-markaziy',
    coordinates: { lat: 41.5506, lng: 60.6317 },
    name: { en: 'Urgench Central Bazaar', uz: 'Urganch Markaziy bozori', ru: 'Центральный базар Ургенча' },
    regionId: 12,
    address: { en: 'Al-Xorazmiy Street, Urgench', uz: "Al-Xorazmiy ko'chasi, Urganch", ru: 'ул. Аль-Хорезми, Ургенч' },
    coverage: 'Region',
    marketType: 'Retail',
    workingHours: '07:00–18:00',
    products: ['Fruit', 'Vegetables', 'Dairy', 'Bread'],
    facilities: { parking: true, coldStorage: false, wholesaleSection: false, retailSection: true, loadingZone: false },
    stats: { demand: 64, competition: 52, priceLevel: 46, logistics: 55, seasonality: 61, opportunity: 63, risk: 43, investmentAttractiveness: 59 },
    govSupportEligible: false,
    trend: 'flat',
    avgPriceIndex: 44,
    summary: {
      en: 'A regional retail bazaar serving Khorezm with low competition and steady local demand.',
      uz: 'Xorazmga xizmat qiluvchi, raqobat past va barqaror mahalliy talabga ega hududiy chakana bozor.',
      ru: 'Региональный розничный базар, обслуживающий Хорезм, с низкой конкуренцией и стабильным местным спросом.',
    },
    aiRecommendation: {
      en: 'AI flags this as a low-competition entry point for a new dairy products stall.',
      uz: 'AI buni yangi sut mahsulotlari rastasi uchun past raqobatli kirish nuqtasi sifatida belgilamoqda.',
      ru: 'ИИ отмечает это как точку входа с низкой конкуренцией для нового прилавка молочной продукции.',
    },
  },
  {
    id: 'qarshi-bozori',
    coordinates: { lat: 38.8606, lng: 65.7891 },
    name: { en: 'Qarshi Bazaar', uz: 'Qarshi bozori', ru: 'Базар Карши' },
    regionId: 13,
    address: { en: 'Mustaqillik Street, Qarshi', uz: "Mustaqillik ko'chasi, Qarshi", ru: 'ул. Мустакиллик, Карши' },
    coverage: 'Region',
    marketType: "Farmers' market",
    workingHours: '06:00–18:00',
    products: ['Fruit', 'Vegetables', 'Meat', 'Bread'],
    facilities: { parking: true, coldStorage: false, wholesaleSection: false, retailSection: true, loadingZone: true },
    stats: { demand: 68, competition: 55, priceLevel: 44, logistics: 58, seasonality: 68, opportunity: 65, risk: 41, investmentAttractiveness: 61 },
    govSupportEligible: true,
    trend: 'up',
    avgPriceIndex: 42,
    summary: {
      en: 'A farmers’ bazaar serving Qashqadaryo with direct-from-farm produce pricing.',
      uz: "Qashqadaryoga xizmat qiluvchi, to'g'ridan-to'g'ri dehqon fermadan mahsulot narxiga ega dehqon bozori.",
      ru: 'Фермерский базар, обслуживающий Кашкадарью, с ценами напрямую от фермерских хозяйств.',
    },
    aiRecommendation: {
      en: 'AI highlights seasonal melon and grape trade as this market’s strongest growth lever.',
      uz: 'AI mavsumiy qovun va uzum savdosini ushbu bozorning eng kuchli o‘sish omili sifatida ta‘kidlamoqda.',
      ru: 'ИИ выделяет сезонную торговлю дынями и виноградом как самый сильный рычаг роста этого рынка.',
    },
  },
  {
    id: 'termiz-bozori',
    coordinates: { lat: 37.2242, lng: 67.2783 },
    name: { en: 'Termez Bazaar', uz: 'Termiz bozori', ru: 'Базар Термез' },
    regionId: 8,
    address: { en: 'Alpomish Street, Termez', uz: "Alpomish ko'chasi, Termiz", ru: 'ул. Алпомиш, Термез' },
    coverage: 'Region',
    marketType: 'Retail',
    workingHours: '07:00–18:00',
    products: ['Fruit', 'Vegetables', 'Textile', 'Nuts'],
    facilities: { parking: false, coldStorage: false, wholesaleSection: false, retailSection: true, loadingZone: false },
    stats: { demand: 60, competition: 48, priceLevel: 41, logistics: 50, seasonality: 63, opportunity: 60, risk: 46, investmentAttractiveness: 55 },
    govSupportEligible: false,
    trend: 'flat',
    avgPriceIndex: 40,
    summary: {
      en: 'A cross-border trade bazaar in Surkhandarya with growing fruit and nut exports.',
      uz: 'Surxondaryodagi, meva va yong‘oq eksporti o‘sib borayotgan chegara savdo bozori.',
      ru: 'Приграничный торговый базар в Сурхандарье с растущим экспортом фруктов и орехов.',
    },
    aiRecommendation: {
      en: 'AI notes cross-border logistics investment could unlock significant export upside here.',
      uz: 'AI chegaraviy logistika investitsiyasi bu yerda katta eksport imkoniyatini ochishi mumkinligini qayd etmoqda.',
      ru: 'ИИ отмечает, что инвестиции в трансграничную логистику могут раскрыть значительный экспортный потенциал.',
    },
  },
  {
    id: 'jizzax-markaziy',
    coordinates: { lat: 40.1158, lng: 67.8422 },
    name: { en: 'Jizzakh Central Bazaar', uz: 'Jizzax Markaziy bozori', ru: 'Центральный базар Джизака' },
    regionId: 3,
    address: { en: 'Sharaf Rashidov Street, Jizzakh', uz: "Sharof Rashidov ko'chasi, Jizzax", ru: 'ул. Шараф Рашидов, Джизак' },
    coverage: 'Region',
    marketType: "Farmers' market",
    workingHours: '06:00–18:00',
    products: ['Vegetables', 'Fruit', 'Bread', 'Dairy'],
    facilities: { parking: true, coldStorage: false, wholesaleSection: false, retailSection: true, loadingZone: false },
    stats: { demand: 58, competition: 45, priceLevel: 40, logistics: 54, seasonality: 66, opportunity: 64, risk: 40, investmentAttractiveness: 62 },
    govSupportEligible: true,
    trend: 'up',
    avgPriceIndex: 39,
    summary: {
      en: 'A farmers’ bazaar in a fast-growing industrial region with low market saturation.',
      uz: 'Tez rivojlanayotgan sanoat hududidagi, bozor to‘yinganligi past bo‘lgan dehqon bozori.',
      ru: 'Фермерский базар в быстрорастущем промышленном регионе с низкой насыщенностью рынка.',
    },
    aiRecommendation: {
      en: 'AI flags this region’s new industrial park workforce as an emerging demand driver for daily produce.',
      uz: 'AI ushbu hududdagi yangi sanoat texnopark ishchi kuchini kundalik mahsulotlarga talab drayveri sifatida belgilamoqda.',
      ru: 'ИИ отмечает рабочую силу нового индустриального парка региона как формирующийся драйвер спроса на повседневную продукцию.',
    },
  },
  {
    id: 'navoiy-markaziy',
    coordinates: { lat: 40.0844, lng: 65.3792 },
    name: { en: 'Navoiy Central Bazaar', uz: 'Navoiy Markaziy bozori', ru: 'Центральный базар Навои' },
    regionId: 4,
    address: { en: 'Ibn Sino Street, Navoiy', uz: "Ibn Sino ko'chasi, Navoiy", ru: 'ул. Ибн Сино, Навои' },
    coverage: 'Region',
    marketType: 'Universal',
    workingHours: '07:00–19:00',
    products: ['Fruit', 'Vegetables', 'Meat', 'Dairy'],
    facilities: { parking: true, coldStorage: true, wholesaleSection: false, retailSection: true, loadingZone: false },
    stats: { demand: 62, competition: 47, priceLevel: 45, logistics: 60, seasonality: 59, opportunity: 66, risk: 38, investmentAttractiveness: 68 },
    govSupportEligible: true,
    trend: 'up',
    avgPriceIndex: 43,
    summary: {
      en: 'A well-connected market serving a high-purchasing-power mining and industrial workforce.',
      uz: 'Yuqori xarid qobiliyatiga ega kon-metallurgiya va sanoat ishchi kuchiga xizmat qiluvchi qulay bozor.',
      ru: 'Хорошо связанный рынок, обслуживающий горнодобывающую и промышленную рабочую силу с высокой покупательной способностью.',
    },
    aiRecommendation: {
      en: 'AI sees strong upside for a premium retail section given the region’s above-average purchasing power.',
      uz: 'AI hududning o‘rtachadan yuqori xarid qobiliyatini hisobga olib, premium chakana bo‘lim uchun kuchli imkoniyatni ko‘rmoqda.',
      ru: 'ИИ видит хороший потенциал для премиального розничного отдела с учётом покупательной способности региона выше среднего.',
    },
  },
  {
    id: 'sirdaryo-markaziy',
    coordinates: { lat: 40.4897, lng: 68.7842 },
    name: { en: 'Gulistan Central Bazaar', uz: 'Guliston Markaziy bozori', ru: 'Центральный базар Гулистана' },
    regionId: 7,
    address: { en: 'Mustaqillik Avenue, Gulistan', uz: "Mustaqillik shoh ko'chasi, Guliston", ru: 'пр. Мустакиллик, Гулистан' },
    coverage: 'Region',
    marketType: "Farmers' market",
    workingHours: '06:00–18:00',
    products: ['Vegetables', 'Fruit', 'Bread'],
    facilities: { parking: false, coldStorage: false, wholesaleSection: false, retailSection: true, loadingZone: false },
    stats: { demand: 52, competition: 38, priceLevel: 37, logistics: 48, seasonality: 64, opportunity: 58, risk: 44, investmentAttractiveness: 54 },
    govSupportEligible: false,
    trend: 'flat',
    avgPriceIndex: 36,
    summary: {
      en: "Sirdaryo's smallest-footprint regional market with room to grow around grain logistics.",
      uz: "Sirdaryoning eng kichik hajmdagi hududiy bozori, g'alla logistikasi atrofida o'sish imkoniyatiga ega.",
      ru: 'Региональный рынок Сырдарьи с наименьшей площадью, с потенциалом роста вокруг зерновой логистики.',
    },
    aiRecommendation: {
      en: 'AI suggests this low-density market has headroom for a new wholesale grain trading section.',
      uz: 'AI ushbu past zichlikdagi bozorda yangi ulgurji g‘alla savdosi bo‘limi uchun joy borligini taklif qiladi.',
      ru: 'ИИ предполагает, что этот рынок с низкой плотностью имеет потенциал для нового оптового зернового отдела.',
    },
  },
  {
    id: 'nukus-bozori',
    coordinates: { lat: 42.4531, lng: 59.6103 },
    name: { en: 'Nukus Bazaar', uz: 'Nukus bozori', ru: 'Базар Нукуса' },
    regionId: 14,
    address: { en: 'Dosnazarov Street, Nukus', uz: "Dosnazarov ko'chasi, Nukus", ru: 'ул. Досназаров, Нукус' },
    coverage: 'Region',
    marketType: 'Universal',
    workingHours: '07:00–19:00',
    products: ['Fruit', 'Vegetables', 'Textile', 'Meat'],
    facilities: { parking: true, coldStorage: false, wholesaleSection: true, retailSection: true, loadingZone: true },
    stats: { demand: 66, competition: 50, priceLevel: 42, logistics: 56, seasonality: 60, opportunity: 67, risk: 42, investmentAttractiveness: 63 },
    govSupportEligible: true,
    trend: 'up',
    avgPriceIndex: 41,
    summary: {
      en: 'Karakalpakstan’s main universal bazaar, anchoring trade across a wide, sparsely served territory.',
      uz: "Qoraqalpog'istonning asosiy universal bozori, keng va kam xizmat ko'rsatilgan hudud savdosini birlashtiradi.",
      ru: 'Главный универсальный базар Каракалпакстана, объединяющий торговлю на обширной, малообслуживаемой территории.',
    },
    aiRecommendation: {
      en: 'AI identifies an underserved cold-chain gap here as the top opportunity for new investment.',
      uz: 'AI bu yerda yetarli xizmat ko‘rsatilmagan sovutgich zanjiri bo‘shlig‘ini yangi investitsiya uchun eng katta imkoniyat sifatida aniqlamoqda.',
      ru: 'ИИ определяет неохваченный пробел в холодовой цепи здесь как главную возможность для новых инвестиций.',
    },
  },
]

/** @returns {Record<number, number>} regionId -> market count, for map density coloring. */
export function getMarketDensityByRegion() {
  const counts = {}
  for (const m of MARKETS) counts[m.regionId] = (counts[m.regionId] ?? 0) + 1
  return counts
}

// Illustrative national seasonality curve for fresh-produce bazaar demand (0-100).
export const MARKET_SEASONALITY = [
  { month: 'Jan', demandIndex: 48 },
  { month: 'Feb', demandIndex: 46 },
  { month: 'Mar', demandIndex: 55 },
  { month: 'Apr', demandIndex: 63 },
  { month: 'May', demandIndex: 72 },
  { month: 'Jun', demandIndex: 80 },
  { month: 'Jul', demandIndex: 88 },
  { month: 'Aug', demandIndex: 94 },
  { month: 'Sep', demandIndex: 90 },
  { month: 'Oct', demandIndex: 78 },
  { month: 'Nov', demandIndex: 60 },
  { month: 'Dec', demandIndex: 52 },
]
