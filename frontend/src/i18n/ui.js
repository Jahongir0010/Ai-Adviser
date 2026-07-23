// UI chrome strings — navigation, headings, labels, buttons. Keyed flat;
// each entry provides en (canonical/fallback), uz, ru.
export const UI = {
  // Sidebar
  'sidebar.platform': { en: 'Platform', uz: 'Platforma', ru: 'Платформа' },
  'sidebar.dashboard': { en: 'Dashboard', uz: 'Boshqaruv paneli', ru: 'Панель управления' },
  'sidebar.businessIdea': { en: 'Business Idea', uz: 'Biznes g‘oya', ru: 'Бизнес-идея' },
  'sidebar.map': { en: 'Interactive Map', uz: 'Interaktiv xarita', ru: 'Интерактивная карта' },
  'sidebar.comingSoon': { en: 'Coming soon', uz: 'Tez kunda', ru: 'Скоро' },
  'sidebar.marketReports': { en: 'Market Reports', uz: 'Bozor hisobotlari', ru: 'Рыночные отчёты' },
  'sidebar.portfolio': { en: 'Portfolio', uz: 'Portfel', ru: 'Портфель' },
  'sidebar.settings': { en: 'Settings', uz: 'Sozlamalar', ru: 'Настройки' },
  'sidebar.help': { en: 'Help & Support', uz: 'Yordam va qo‘llab-quvvatlash', ru: 'Помощь и поддержка' },
  'sidebar.collapse': { en: 'Collapse', uz: 'Yig‘ish', ru: 'Свернуть' },

  // Topbar
  'topbar.searchPlaceholder': {
    en: 'Search regions, industries, insights…',
    uz: 'Hududlar, sohalar, tahlillarni qidiring…',
    ru: 'Поиск по регионам, отраслям, аналитике…',
  },
  'topbar.investorAccount': { en: 'Investor account', uz: 'Investor hisobi', ru: 'Аккаунт инвестора' },
  'topbar.language': { en: 'Language', uz: 'Til', ru: 'Язык' },

  // Dashboard page
  'dashboard.eyebrow': { en: 'Regional Intelligence', uz: 'Hududiy tahlil', ru: 'Региональная аналитика' },
  'dashboard.title': {
    en: 'Uzbekistan Business Intelligence',
    uz: 'O‘zbekiston biznes tahlili',
    ru: 'Бизнес-аналитика Узбекистана',
  },
  'dashboard.description': {
    en: 'Select any region to explore AI-generated market, competition, and investment intelligence.',
    uz: 'Sun’iy intellekt yaratgan bozor, raqobat va investitsiya tahlilini ko‘rish uchun istalgan hududni tanlang.',
    ru: 'Выберите любой регион, чтобы изучить рыночную, конкурентную и инвестиционную аналитику, созданную ИИ.',
  },
  'dashboard.mapTitle': { en: 'Interactive Regional Map', uz: 'Interaktiv hududiy xarita', ru: 'Интерактивная карта регионов' },
  'dashboard.mapHint': {
    en: '14 regions · click to explore',
    uz: '14 ta hudud · ko‘rish uchun bosing',
    ru: '14 регионов · нажмите для просмотра',
  },
  'dashboard.aiEngineEyebrow': { en: 'AI Engine', uz: 'Sun’iy intellekt tizimi', ru: 'ИИ-движок' },
  'dashboard.insightModulesTitle': { en: 'AI Insight Modules', uz: 'Sun’iy intellekt modullari', ru: 'Модули ИИ-аналитики' },
  'dashboard.insightModulesDescription': {
    en: 'Five specialised models continuously monitor the national market on your behalf.',
    uz: 'Beshta ixtisoslashgan model sizning nomingizdan mamlakat bozorini uzluksiz kuzatib boradi.',
    ru: 'Пять специализированных моделей непрерывно отслеживают национальный рынок от вашего имени.',
  },
  'dashboard.updatedAgo': { en: 'Updated 12 min ago', uz: '12 daqiqa oldin yangilangan', ru: 'Обновлено 12 мин назад' },

  // Map legend
  'map.opportunityScore': { en: 'AI Opportunity Score', uz: 'SI imkoniyat bahosi', ru: 'ИИ-балл возможностей' },
  'map.lowToHigh': { en: 'Low → High', uz: 'Past → Yuqori', ru: 'Низкий → Высокий' },

  // Region details panel
  'region.selected': { en: 'Selected region', uz: 'Tanlangan hudud', ru: 'Выбранный регион' },
  'region.aiScore': { en: 'AI Score', uz: 'SI bahosi', ru: 'ИИ-балл' },
  'region.population': { en: 'Population', uz: 'Aholi soni', ru: 'Население' },
  'region.purchasingPower': { en: 'Purchasing Power', uz: 'Xarid qobiliyati', ru: 'Покупательная способность' },
  'region.businessDemand': { en: 'Business Demand', uz: 'Biznes talabi', ru: 'Спрос на бизнес' },
  'region.competitionLevel': { en: 'Competition Level', uz: 'Raqobat darajasi', ru: 'Уровень конкуренции' },
  'region.existingBusinesses': { en: 'Existing Businesses', uz: 'Mavjud bizneslar', ru: 'Действующие предприятия' },
  'region.growthPotential': { en: 'Growth Potential', uz: 'O‘sish salohiyati', ru: 'Потенциал роста' },
  'region.investmentAttractiveness': {
    en: 'Investment Attractiveness',
    uz: 'Investitsiyaviy jozibadorlik',
    ru: 'Инвестиционная привлекательность',
  },
  'region.riskLevel': { en: 'Risk Level', uz: 'Xavf darajasi', ru: 'Уровень риска' },
  'region.recommendedIndustries': { en: 'Recommended Industries', uz: 'Tavsiya etilgan sohalar', ru: 'Рекомендуемые отрасли' },
  'region.governmentPrograms': {
    en: 'Government Support Programs',
    uz: 'Davlat qo‘llab-quvvatlash dasturlari',
    ru: 'Программы государственной поддержки',
  },
  'region.nationwide': { en: 'Nationwide', uz: 'Butun mamlakat bo‘yicha', ru: 'По всей стране' },
  'region.generatePlanFor': {
    en: 'Generate Business Plan for {region}',
    uz: '{region} uchun biznes-reja yaratish',
    ru: 'Составить бизнес-план для региона {region}',
  },

  // Insight cards
  'insight.viewDetails': { en: 'View Details', uz: 'Batafsil', ru: 'Подробнее' },

  // Analytics section
  'analytics.eyebrow': { en: 'Analytics', uz: 'Tahlillar', ru: 'Аналитика' },
  'analytics.title': { en: 'National Market Intelligence', uz: 'Milliy bozor tahlili', ru: 'Национальная рыночная аналитика' },
  'analytics.description': {
    en: 'Live indicators aggregated across all 14 regions, refreshed daily by the AI analytics engine.',
    uz: 'Barcha 14 ta hudud bo‘yicha jamlangan jonli ko‘rsatkichlar, sun’iy intellekt tomonidan har kuni yangilanadi.',
    ru: 'Актуальные показатели по всем 14 регионам, ежедневно обновляемые ИИ-аналитикой.',
  },

  // Charts
  'chart.marketDemand.title': { en: 'Market Demand', uz: 'Bozor talabi', ru: 'Рыночный спрос' },
  'chart.marketDemand.subtitle': {
    en: 'Demand vs. supply index, trailing 12 months',
    uz: 'Talab va taklif indeksi, so‘nggi 12 oy',
    ru: 'Индекс спроса и предложения за последние 12 месяцев',
  },
  'chart.marketDemand.demand': { en: 'Demand index', uz: 'Talab indeksi', ru: 'Индекс спроса' },
  'chart.marketDemand.supply': { en: 'Supply index', uz: 'Taklif indeksi', ru: 'Индекс предложения' },

  'chart.industryGrowth.title': { en: 'Industry Growth', uz: 'Sohalar o‘sishi', ru: 'Рост отраслей' },
  'chart.industryGrowth.subtitle': {
    en: 'YoY growth rate by sector',
    uz: 'Sohalar bo‘yicha yillik o‘sish sur’ati',
    ru: 'Годовой рост по секторам',
  },

  'chart.seasonalTrends.title': { en: 'Seasonal Trends', uz: 'Mavsumiy tendensiyalar', ru: 'Сезонные тенденции' },
  'chart.seasonalTrends.subtitle': { en: 'Sector index by quarter', uz: 'Choraklar bo‘yicha soha indeksi', ru: 'Индекс по секторам за квартал' },
  'chart.seasonalTrends.retail': { en: 'Retail', uz: 'Chakana savdo', ru: 'Розница' },
  'chart.seasonalTrends.tourism': { en: 'Tourism', uz: 'Turizm', ru: 'Туризм' },
  'chart.seasonalTrends.agriculture': { en: 'Agriculture', uz: 'Qishloq xo‘jaligi', ru: 'Сельское хозяйство' },

  'chart.population.title': { en: 'Population Distribution', uz: 'Aholi taqsimoti', ru: 'Распределение населения' },
  'chart.population.subtitle': {
    en: 'By region, million people (total {total}M)',
    uz: 'Hududlar bo‘yicha, mln kishi (jami {total} mln)',
    ru: 'По регионам, млн человек (всего {total} млн)',
  },
  'chart.population.other': { en: 'Other regions', uz: 'Boshqa hududlar', ru: 'Остальные регионы' },

  'chart.consumerBehavior.title': { en: 'Consumer Behavior', uz: 'Iste’molchi xatti-harakati', ru: 'Потребительское поведение' },
  'chart.consumerBehavior.score': { en: 'Score', uz: 'Ball', ru: 'Балл' },
  'chart.consumerBehavior.subtitle': {
    en: 'National index across key traits (0–100)',
    uz: 'Asosiy ko‘rsatkichlar bo‘yicha milliy indeks (0–100)',
    ru: 'Национальный индекс по ключевым признакам (0–100)',
  },

  'chart.investmentForecast.title': { en: 'Investment Forecast', uz: 'Investitsiya prognozi', ru: 'Прогноз инвестиций' },
  'chart.investmentForecast.subtitle': {
    en: 'FDI vs. domestic investment, $ billion',
    uz: 'To‘g‘ridan-to‘g‘ri xorijiy va ichki investitsiyalar, mlrd $',
    ru: 'ПИИ и внутренние инвестиции, млрд $',
  },
  'chart.investmentForecast.fdi': { en: 'Foreign direct investment', uz: 'To‘g‘ridan-to‘g‘ri xorijiy investitsiya', ru: 'Прямые иностранные инвестиции' },
  'chart.investmentForecast.domestic': { en: 'Domestic investment', uz: 'Ichki investitsiya', ru: 'Внутренние инвестиции' },

  // Summary cards
  'summary.latestInsights': { en: 'Latest AI Insights', uz: 'So‘nggi SI tahlillari', ru: 'Последняя ИИ-аналитика' },
  'summary.viewAll': { en: 'View all', uz: 'Barchasini ko‘rish', ru: 'Смотреть всё' },
  'summary.govIncentives': {
    en: 'Government Incentives & Subsidies',
    uz: 'Davlat imtiyozlari va subsidiyalari',
    ru: 'Государственные льготы и субсидии',
  },

  // Business Idea page
  'businessIdea.eyebrow': { en: 'AI Business Discovery', uz: 'SI biznes qidiruvi', ru: 'ИИ-поиск бизнеса' },
  'businessIdea.title': { en: 'Find Your Next Business Idea', uz: 'Keyingi biznes g‘oyangizni toping', ru: 'Найдите свою следующую бизнес-идею' },
  'businessIdea.description': {
    en: 'Answer a few guided questions and let AI generate personalized, data-backed business opportunities.',
    uz: 'Bir nechta savollarga javob bering va sun’iy intellekt sizga moslashtirilgan, ma’lumotlarga asoslangan biznes imkoniyatlarini taklif etsin.',
    ru: 'Ответьте на несколько наводящих вопросов, и ИИ подберёт персональные бизнес-возможности на основе данных.',
  },
  'businessIdea.startOver': { en: 'Start over', uz: 'Qaytadan boshlash', ru: 'Начать заново' },
  'businessIdea.resultsEyebrow': { en: 'Results', uz: 'Natijalar', ru: 'Результаты' },
  'businessIdea.resultsTitle': {
    en: 'Your Personalized Business Ideas',
    uz: 'Sizga moslashtirilgan biznes g‘oyalar',
    ru: 'Ваши персональные бизнес-идеи',
  },
  'businessIdea.resultsDescription': {
    en: 'Ranked by AI match score based on your budget, region, risk tolerance, and industry preferences.',
    uz: 'Byudjet, hudud, xavf darajasi va soha afzalliklaringiz asosida SI moslik bahosi bo‘yicha tartiblangan.',
    ru: 'Отсортировано по ИИ-баллу соответствия с учётом бюджета, региона, готовности к риску и предпочтений по отраслям.',
  },
  'businessIdea.ideasGenerated': { en: '{n} ideas generated', uz: '{n} ta g‘oya yaratildi', ru: 'Сгенерировано идей: {n}' },

  // Wizard
  'wizard.advisorName': { en: 'AI Business Advisor', uz: 'SI biznes maslahatchisi', ru: 'ИИ-бизнес-консультант' },
  'wizard.stepOf': { en: 'Guided discovery · step {current} of {total}', uz: 'Bosqichma-bosqich so‘rov · {current}/{total}-qadam', ru: 'Пошаговый опрос · шаг {current} из {total}' },
  'wizard.continue': { en: 'Continue', uz: 'Davom etish', ru: 'Продолжить' },
  'wizard.loadingQuestions': { en: 'Loading questions…', uz: 'Savollar yuklanmoqda…', ru: 'Загрузка вопросов…' },
  'wizard.loadError': {
    en: 'Could not load questions. Check that the backend is running.',
    uz: 'Savollarni yuklab bo‘lmadi. Backend ishga tushirilganini tekshiring.',
    ru: 'Не удалось загрузить вопросы. Проверьте, запущен ли сервер.',
  },
  'wizard.retry': { en: 'Retry', uz: 'Qayta urinish', ru: 'Повторить' },
  'wizard.optionsLoading': { en: 'Loading options…', uz: 'Variantlar yuklanmoqda…', ru: 'Загрузка вариантов…' },
  'wizard.textPlaceholder': { en: 'Type your answer…', uz: 'Javobingizni yozing…', ru: 'Введите ответ…' },

  // Generating state
  'generating.title': { en: 'Generating your business ideas', uz: 'Biznes g‘oyalaringiz yaratilmoqda', ru: 'Генерируем ваши бизнес-идеи' },
  'generating.step1': { en: 'Analyzing your responses…', uz: 'Javoblaringiz tahlil qilinmoqda…', ru: 'Анализируем ваши ответы…' },
  'generating.step2': {
    en: 'Cross-referencing regional market data…',
    uz: 'Hududiy bozor ma’lumotlari bilan solishtirilmoqda…',
    ru: 'Сопоставляем с региональными рыночными данными…',
  },
  'generating.step3': {
    en: 'Scoring opportunities against risk tolerance…',
    uz: 'Imkoniyatlar xavf darajasiga nisbatan baholanmoqda…',
    ru: 'Оцениваем возможности с учётом риска…',
  },
  'generating.step4': {
    en: 'Ranking personalized business ideas…',
    uz: 'Moslashtirilgan biznes g‘oyalari saralanmoqda…',
    ru: 'Ранжируем персональные бизнес-идеи…',
  },

  // Idea card / comparison shared metric labels
  'idea.govSupportEligible': { en: 'Gov. support eligible', uz: 'Davlat yordamiga mos', ru: 'Есть право на господдержку' },
  'idea.investmentRequired': { en: 'Investment Required', uz: 'Talab qilinadigan investitsiya', ru: 'Требуемые инвестиции' },
  'idea.monthlyProfit': { en: 'Expected Monthly Profit', uz: 'Kutilayotgan oylik foyda', ru: 'Ожидаемая месячная прибыль' },
  'idea.roi': { en: 'ROI', uz: 'ROI (investitsiya qaytimi)', ru: 'ROI (окупаемость)' },
  'idea.payback': { en: 'Payback Period', uz: 'Qoplash muddati', ru: 'Срок окупаемости' },
  'idea.marketDemand': { en: 'Market Demand', uz: 'Bozor talabi', ru: 'Спрос на рынке' },
  'idea.growthPotential': { en: 'Growth Potential', uz: 'O‘sish salohiyati', ru: 'Потенциал роста' },
  'idea.competitionLevel': { en: 'Competition Level', uz: 'Raqobat darajasi', ru: 'Уровень конкуренции' },
  'idea.riskScore': { en: 'Risk Score', uz: 'Xavf ko‘rsatkichi', ru: 'Показатель риска' },
  'idea.aiMatchScore': { en: 'AI Match Score', uz: 'SI moslik bahosi', ru: 'ИИ-балл соответствия' },
  'idea.generateFullPlan': { en: 'Generate Full Plan', uz: 'To‘liq reja yaratish', ru: 'Составить полный план' },
  'idea.match': { en: 'Match', uz: 'Moslik', ru: 'Соответствие' },
  'idea.addToComparison': { en: 'Add to comparison', uz: 'Solishtirishga qo‘shish', ru: 'Добавить к сравнению' },
  'idea.saveIdea': { en: 'Save idea', uz: 'G‘oyani saqlash', ru: 'Сохранить идею' },

  // Comparison
  'compare.title': { en: 'Compare Ideas ({n})', uz: 'G‘oyalarni solishtirish ({n})', ru: 'Сравнение идей ({n})' },
  'compare.metric': { en: 'Metric', uz: 'Ko‘rsatkich', ru: 'Показатель' },

  // Business plan view
  'plan.backToIdeas': { en: 'Back to ideas', uz: 'G‘oyalarga qaytish', ru: 'Назад к идеям' },
  'plan.exportPdf': { en: 'Export PDF', uz: 'PDF holida yuklab olish', ru: 'Экспорт в PDF' },
  'plan.aiGenerated': { en: 'AI-Generated Business Plan', uz: 'SI tomonidan yaratilgan biznes-reja', ru: 'Бизнес-план, созданный ИИ' },
  'plan.investment': { en: 'Investment', uz: 'Investitsiya', ru: 'Инвестиции' },
  'plan.roi': { en: 'ROI', uz: 'ROI', ru: 'ROI' },
  'plan.payback': { en: 'Payback', uz: 'Qoplash', ru: 'Окупаемость' },
  'plan.aiMatch': { en: 'AI Match', uz: 'SI moslik', ru: 'ИИ-соответствие' },

  // Business plan section titles (shared/generic, id-keyed)
  'plan.section.executive-summary': { en: 'Executive Summary', uz: 'Ijrochi xulosa', ru: 'Резюме проекта' },
  'plan.section.market-analysis': { en: 'Market Analysis', uz: 'Bozor tahlili', ru: 'Анализ рынка' },
  'plan.section.competitor-analysis': { en: 'Competitor Analysis', uz: 'Raqobatchilar tahlili', ru: 'Анализ конкурентов' },
  'plan.section.swot': { en: 'SWOT Analysis', uz: 'SWOT tahlili', ru: 'SWOT-анализ' },
  'plan.section.marketing-strategy': { en: 'Marketing Strategy', uz: 'Marketing strategiyasi', ru: 'Маркетинговая стратегия' },
  'plan.section.financial-forecast': { en: 'Financial Forecast', uz: 'Moliyaviy prognoz', ru: 'Финансовый прогноз' },
  'plan.section.risk-assessment': { en: 'Risk Assessment', uz: 'Xavflarni baholash', ru: 'Оценка рисков' },
  'plan.section.implementation-roadmap': { en: 'Implementation Roadmap', uz: 'Amalga oshirish rejasi', ru: 'План реализации' },
  'plan.section.investment-plan': { en: 'Investment Plan', uz: 'Investitsiya rejasi', ru: 'Инвестиционный план' },
  'plan.section.revenue-projection': { en: 'Revenue Projection', uz: 'Daromad prognozi', ru: 'Прогноз доходов' },

  // Settings page
  'settings.title': { en: 'Settings', uz: 'Sozlamalar', ru: 'Настройки' },
  'settings.description': {
    en: 'Manage your platform preferences.',
    uz: 'Platforma sozlamalaringizni boshqaring.',
    ru: 'Управляйте настройками платформы.',
  },
  'settings.language.title': { en: 'Language', uz: 'Til', ru: 'Язык' },
  'settings.language.description': {
    en: 'Choose the language used across the platform.',
    uz: 'Platformada foydalaniladigan tilni tanlang.',
    ru: 'Выберите язык интерфейса платформы.',
  },

  // Interactive map page
  'map.eyebrow': { en: 'Geographic Intelligence', uz: 'Geografik tahlil', ru: 'Географическая аналитика' },
  'map.title': { en: 'Interactive Map of Uzbekistan', uz: 'O‘zbekistonning interaktiv xaritasi', ru: 'Интерактивная карта Узбекистана' },
  'map.description': {
    en: 'Click a region to drill down into its districts, then click a district to explore its mahallas.',
    uz: 'Tumanlarini ko‘rish uchun hududni bosing, so‘ng mahallalarini ko‘rish uchun tumanni bosing.',
    ru: 'Нажмите на регион, чтобы увидеть его районы, затем на район — чтобы увидеть махалли.',
  },
  'map.uzbekistan': { en: 'Uzbekistan', uz: 'O‘zbekiston', ru: 'Узбекистан' },
  'map.loading': { en: 'Loading…', uz: 'Yuklanmoqda…', ru: 'Загрузка…' },
  'map.error': { en: 'Something went wrong.', uz: 'Xatolik yuz berdi.', ru: 'Произошла ошибка.' },
  'map.districtsIn': { en: 'Districts in', uz: 'Tumanlari', ru: 'Районы региона' },
  'map.mahallasIn': { en: 'Mahallas in', uz: 'Mahallalari', ru: 'Махалли района' },
  'map.searchMahalla': { en: 'Search mahalla…', uz: 'Mahalla qidirish…', ru: 'Поиск махалли…' },
  'map.backToList': { en: 'Back to list', uz: 'Ro‘yxatga qaytish', ru: 'Назад к списку' },
  'map.boundaryPending': {
    en: 'Mahalla boundary data is not available yet — showing statistics only.',
    uz: 'Mahalla chegarasi ma’lumotlari hali mavjud emas — faqat statistika ko‘rsatilmoqda.',
    ru: 'Границы махалли пока недоступны — показана только статистика.',
  },
  'map.emptyState.country.title': {
    en: 'Select a region to begin',
    uz: 'Boshlash uchun hududni tanlang',
    ru: 'Выберите регион, чтобы начать',
  },
  'map.emptyState.country.description': {
    en: 'Click any region on the map to see its districts.',
    uz: 'Tumanlarini ko‘rish uchun xaritadagi istalgan hududni bosing.',
    ru: 'Нажмите на любой регион на карте, чтобы увидеть его районы.',
  },
  'map.emptyState.noDistricts': { en: 'No districts found.', uz: 'Tumanlar topilmadi.', ru: 'Районы не найдены.' },
  'map.emptyState.noMahallas': { en: 'No mahallas found.', uz: 'Mahallalar topilmadi.', ru: 'Махалли не найдены.' },
  'map.aiRecommendations.title': {
    en: 'AI Recommendations',
    uz: 'SI tavsiyalari',
    ru: 'Рекомендации ИИ',
  },
  'map.aiRecommendations.comingSoon': {
    en: 'AI-generated recommendations for this mahalla are coming soon.',
    uz: 'Ushbu mahalla uchun SI tavsiyalari tez orada qo‘shiladi.',
    ru: 'ИИ-рекомендации для этой махалли появятся в ближайшее время.',
  },
  'map.stat.population': { en: 'Population', uz: 'Aholi soni', ru: 'Население' },
  'map.stat.activeBusinesses': { en: 'Active Businesses', uz: 'Faoliyatdagi bizneslar', ru: 'Действующие предприятия' },
  'map.stat.unemployed': { en: 'Unemployed', uz: 'Ishsizlar soni', ru: 'Безработные' },
  'map.stat.problemLoans': { en: 'Problem Loans', uz: 'Muammoli kreditlar', ru: 'Проблемные кредиты' },
  'map.stat.poorFamilies': { en: 'Low-Income Families', uz: 'Kam ta’minlangan oilalar', ru: 'Малообеспеченные семьи' },
  'map.stat.internalRoads': { en: 'Internal Roads', uz: 'Ichki yo‘llar', ru: 'Внутренние дороги' },
  'map.stat.noWater': { en: 'Households Without Water', uz: 'Suvsiz xonadonlar', ru: 'Домохозяйства без воды' },
  'map.stat.powerOutages': { en: 'Power Outages', uz: 'Elektr uzilishlari', ru: 'Отключения электричества' },
  'map.stat.schools': { en: 'Schools', uz: 'Maktablar', ru: 'Школы' },
  'map.stat.kindergartens': { en: 'Kindergartens', uz: 'Bog‘chalar', ru: 'Детские сады' },
  'map.stat.sportsGrounds': { en: 'Sports Grounds', uz: 'Sport maydonchalari', ru: 'Спортивные площадки' },
  'map.stat.farmland': { en: 'Farmland Area', uz: 'Dehqonchilik maydoni', ru: 'Площадь сельхозугодий' },
  'map.stat.totalCredit': { en: 'Total Credit Allocated', uz: 'Ajratilgan kredit summasi', ru: 'Выделенный кредит' },
  'map.stat.specializations': { en: 'Economic Specializations', uz: 'Iqtisodiy yo‘nalishlar', ru: 'Экономическая специализация' },

  // Markets page
  'markets.eyebrow': { en: 'AI Market Intelligence', uz: 'AI bozor tahlili', ru: 'ИИ-анализ рынков' },
  'markets.title': { en: "Uzbekistan's Markets", uz: "O'zbekiston bozorlari", ru: 'Рынки Узбекистана' },
  'markets.description': {
    en: 'Analyze markets, products, and trade opportunities across Uzbekistan with AI.',
    uz: "O'zbekiston bo'ylab bozorlar, mahsulotlar va savdo imkoniyatlarini AI yordamida tahlil qiling.",
    ru: 'Анализируйте рынки, товары и торговые возможности по всему Узбекистану с помощью ИИ.',
  },

  'markets.stat.totalMarkets': { en: 'Total Markets', uz: 'Jami bozorlar', ru: 'Всего рынков' },
  'markets.stat.regions': { en: 'Regions', uz: 'Viloyatlar', ru: 'Регионы' },
  'markets.stat.categories': { en: 'Product Categories', uz: 'Mahsulot kategoriyalari', ru: 'Категории товаров' },
  'markets.stat.aiAnalyzed': { en: 'AI-Analyzed Markets', uz: 'AI tomonidan tahlil qilingan bozorlar', ru: 'Рынки, проанализированные ИИ' },
  'markets.stat.totalMarketsHint': { en: 'Active bazaars tracked nationwide', uz: 'Butun mamlakat bo‘yicha kuzatilayotgan faol bozorlar', ru: 'Активные базары по всей стране' },
  'markets.stat.regionsHint': { en: 'Covering every province', uz: 'Barcha viloyatlarni qamrab oladi', ru: 'Охватывает все области' },
  'markets.stat.categoriesHint': { en: 'From fresh produce to textiles', uz: 'Oziq-ovqatdan to‘qimachilikkacha', ru: 'От свежих продуктов до текстиля' },
  'markets.stat.aiAnalyzedHint': { en: '100% of listed markets scored', uz: 'Ro‘yxatdagi bozorlarning 100%i baholangan', ru: '100% рынков оценено' },

  'markets.filter.searchPlaceholder': { en: 'Search markets…', uz: 'Bozorlarni qidirish…', ru: 'Поиск рынков…' },
  'markets.filter.allRegions': { en: 'All regions', uz: 'Barcha viloyatlar', ru: 'Все регионы' },
  'markets.filter.allTypes': { en: 'All market types', uz: 'Barcha bozor turlari', ru: 'Все типы рынков' },
  'markets.filter.allCategories': { en: 'All categories', uz: 'Barcha kategoriyalar', ru: 'Все категории' },
  'markets.filter.allCoverage': { en: 'All coverage', uz: 'Barcha qamrov', ru: 'Весь охват' },
  'markets.filter.aiSmartFilter': { en: 'AI Smart Filter', uz: 'AI Smart Filter', ru: 'ИИ умный фильтр' },
  'markets.filter.aiSmartFilterActive': { en: 'AI ranking active', uz: 'AI reytingi faol', ru: 'ИИ-ранжирование активно' },
  'markets.filter.reset': { en: 'Reset filters', uz: 'Filtrlarni tozalash', ru: 'Сбросить фильтры' },

  'markets.map.title': { en: 'Market Density Map', uz: 'Bozorlar zichligi xaritasi', ru: 'Карта плотности рынков' },
  'markets.map.hint': { en: 'Click a region to filter', uz: 'Filtrlash uchun viloyatni bosing', ru: 'Нажмите на регион для фильтрации' },
  'markets.map.marketsCount': { en: '{n} markets', uz: '{n} ta bozor', ru: 'Рынков: {n}' },
  'markets.map.noMarkets': { en: 'No markets yet', uz: 'Hozircha bozorlar yo‘q', ru: 'Пока нет рынков' },
  'markets.map.densityLow': { en: 'Low', uz: 'Past', ru: 'Низкая' },
  'markets.map.densityHigh': { en: 'High', uz: 'Yuqori', ru: 'Высокая' },

  'markets.list.title': { en: 'Markets', uz: 'Bozorlar', ru: 'Рынки' },
  'markets.list.count': { en: '{n} markets found', uz: '{n} ta bozor topildi', ru: 'Найдено рынков: {n}' },
  'markets.list.empty.title': { en: 'No markets match your filters', uz: 'Filtrlarga mos bozor topilmadi', ru: 'Нет рынков, соответствующих фильтрам' },
  'markets.list.empty.description': { en: 'Try widening your search or resetting filters.', uz: 'Qidiruvni kengaytiring yoki filtrlarni tozalang.', ru: 'Попробуйте расширить поиск или сбросить фильтры.' },

  'markets.card.viewDetails': { en: 'View Details', uz: 'Batafsil', ru: 'Подробнее' },
  'markets.card.aiAnalysis': { en: 'AI Analysis', uz: 'AI tahlil', ru: 'ИИ-анализ' },
  'markets.card.govSupport': { en: 'Gov. support eligible', uz: 'Davlat qo‘llab-quvvatlashiga mos', ru: 'Господдержка доступна' },
  'markets.card.save': { en: 'Save market', uz: 'Bozorni saqlash', ru: 'Сохранить рынок' },
  'markets.card.addToCompare': { en: 'Add to comparison', uz: 'Solishtirishga qo‘shish', ru: 'Добавить к сравнению' },

  'markets.detail.workingHours': { en: 'Working hours', uz: 'Ish vaqti', ru: 'Часы работы' },
  'markets.detail.region': { en: 'Region', uz: 'Viloyat', ru: 'Регион' },
  'markets.detail.coverage': { en: 'Coverage', uz: 'Qamrov', ru: 'Охват' },
  'markets.detail.marketType': { en: 'Market type', uz: 'Bozor turi', ru: 'Тип рынка' },
  'markets.detail.address': { en: 'Address', uz: 'Manzil', ru: 'Адрес' },
  'markets.detail.getDirections': { en: 'Get directions', uz: "Yo'nalish olish", ru: 'Маршрут' },
  'markets.detail.mainProducts': { en: 'Main Products', uz: 'Asosiy mahsulotlar', ru: 'Основные товары' },
  'markets.detail.facilities': { en: 'Facilities', uz: 'Infratuzilma', ru: 'Инфраструктура' },
  'markets.detail.facility.parking': { en: 'Parking', uz: 'Avtoturargoh', ru: 'Парковка' },
  'markets.detail.facility.coldStorage': { en: 'Cold storage', uz: 'Sovutgich ombor', ru: 'Холодильный склад' },
  'markets.detail.facility.wholesaleSection': { en: 'Wholesale section', uz: 'Ulgurji bo‘lim', ru: 'Оптовый отдел' },
  'markets.detail.facility.retailSection': { en: 'Retail section', uz: 'Chakana bo‘lim', ru: 'Розничный отдел' },
  'markets.detail.facility.loadingZone': { en: 'Loading zone', uz: 'Yuklash zonasi', ru: 'Зона погрузки' },
  'markets.detail.close': { en: 'Close', uz: 'Yopish', ru: 'Закрыть' },

  'markets.analysis.title': { en: 'AI Market Analysis', uz: 'AI bozor tahlili', ru: 'ИИ-анализ рынка' },
  'markets.analysis.demand': { en: 'Demand Level', uz: 'Talab darajasi', ru: 'Уровень спроса' },
  'markets.analysis.competition': { en: 'Competition', uz: 'Raqobat', ru: 'Конкуренция' },
  'markets.analysis.priceLevel': { en: 'Price Level', uz: 'Narx darajasi', ru: 'Уровень цен' },
  'markets.analysis.logistics': { en: 'Logistics', uz: 'Logistika', ru: 'Логистика' },
  'markets.analysis.seasonality': { en: 'Seasonality', uz: 'Mavsumiylik', ru: 'Сезонность' },
  'markets.analysis.opportunity': { en: 'Business Opportunity', uz: 'Biznes imkoniyati', ru: 'Бизнес-возможность' },
  'markets.analysis.risk': { en: 'Risk Level', uz: 'Xavf darajasi', ru: 'Уровень риска' },
  'markets.analysis.investment': { en: 'Investment Attractiveness', uz: 'Investitsiya jozibadorligi', ru: 'Инвестиционная привлекательность' },

  'markets.ai.panelTitle': { en: 'AI Recommendation', uz: 'AI tavsiyasi', ru: 'Рекомендация ИИ' },
  'markets.ai.generateIdea': { en: 'Generate Business Idea', uz: 'Biznes g‘oya yaratish', ru: 'Создать бизнес-идею' },
  'markets.ai.viewReport': { en: 'View Market Report', uz: 'Bozor hisobotini ko‘rish', ru: 'Открыть отчёт по рынку' },
  'markets.ai.compare': { en: 'Compare Markets', uz: 'Bozorlarni solishtirish', ru: 'Сравнить рынки' },

  'markets.compare.title': { en: 'Comparing {n} markets', uz: '{n} ta bozor solishtirilmoqda', ru: 'Сравнение рынков: {n}' },
  'markets.compare.metric': { en: 'Metric', uz: 'Ko‘rsatkich', ru: 'Показатель' },
  'markets.compare.addHint': { en: 'Select up to 4 markets to compare', uz: 'Solishtirish uchun 4 tagacha bozor tanlang', ru: 'Выберите до 4 рынков для сравнения' },
  'markets.compare.accessibility': { en: 'Accessibility', uz: 'Yetib borish qulayligi', ru: 'Доступность' },
  'markets.compare.businessScore': { en: 'Business Score', uz: 'Biznes bahosi', ru: 'Бизнес-балл' },
  'markets.compare.investmentScore': { en: 'Investment Score', uz: 'Investitsiya bahosi', ru: 'Инвестиционный балл' },

  'markets.search.title': { en: 'AI Smart Search', uz: 'AI Smart qidiruv', ru: 'Умный ИИ-поиск' },
  'markets.search.description': {
    en: 'Describe what you want to sell and let AI find the best markets for it.',
    uz: 'Nima sotmoqchi ekaningizni tasvirlab bering, AI siz uchun eng yaxshi bozorlarni topadi.',
    ru: 'Опишите, что вы хотите продавать, и ИИ найдёт для этого лучшие рынки.',
  },
  'markets.search.product': { en: 'Product', uz: 'Mahsulot', ru: 'Товар' },
  'markets.search.productPlaceholder': { en: 'e.g. Fruit', uz: 'masalan, Meva', ru: 'напр. Фрукты' },
  'markets.search.volume': { en: 'Production volume (kg/month)', uz: 'Ishlab chiqarish hajmi (kg/oy)', ru: 'Объём производства (кг/мес)' },
  'markets.search.region': { en: 'Region', uz: 'Hudud', ru: 'Регион' },
  'markets.search.salesType': { en: 'Sales type', uz: 'Savdo turi', ru: 'Тип продаж' },
  'markets.search.submit': { en: 'Find Best Markets', uz: 'Eng yaxshi bozorlarni topish', ru: 'Найти лучшие рынки' },
  'markets.search.resultsTitle': { en: 'AI Recommendation', uz: 'AI tavsiyasi', ru: 'Рекомендация ИИ' },
  'markets.search.bestMarkets': { en: 'Best Markets', uz: 'Eng mos bozorlar', ru: 'Лучшие рынки' },
  'markets.search.estimatedDemand': { en: 'Estimated Demand', uz: 'Taxminiy talab', ru: 'Ожидаемый спрос' },
  'markets.search.competitionLevel': { en: 'Competition Level', uz: 'Raqobat darajasi', ru: 'Уровень конкуренции' },
  'markets.search.transportDifficulty': { en: 'Transportation Difficulty', uz: 'Transport qiyinchiligi', ru: 'Сложность транспортировки' },
  'markets.search.sellingPrice': { en: 'Estimated Selling Price', uz: 'Taxminiy sotish narxi', ru: 'Ожидаемая цена продажи' },
  'markets.search.monthlyRevenue': { en: 'Estimated Monthly Revenue', uz: 'Taxminiy oylik daromad', ru: 'Ожидаемая месячная выручка' },
  'markets.search.expectedProfit': { en: 'Expected Profit', uz: 'Kutilayotgan foyda', ru: 'Ожидаемая прибыль' },
  'markets.search.recommendation': { en: 'Business Recommendation', uz: 'Biznes tavsiyasi', ru: 'Бизнес-рекомендация' },
}
