export const LATEST_AI_INSIGHTS = [
  {
    id: 1,
    title: {
      en: 'Fergana Valley e-commerce demand up 18% this quarter',
      uz: 'Bu chorakda Farg‘ona vodiysida elektron tijorat talabi 18% ga oshdi',
      ru: 'Спрос на e-commerce в Ферганской долине вырос на 18% за этот квартал',
    },
    time: { en: '2h ago', uz: '2 soat oldin', ru: '2 ч назад' },
    tag: 'Market Trend',
  },
  {
    id: 2,
    title: {
      en: 'New competitor cluster detected in Andijon retail sector',
      uz: 'Andijon chakana savdo sohasida yangi raqobatchilar klasteri aniqlandi',
      ru: 'В розничном секторе Андижана обнаружен новый кластер конкурентов',
    },
    time: { en: '6h ago', uz: '6 soat oldin', ru: '6 ч назад' },
    tag: 'Competitor Alert',
  },
  {
    id: 3,
    title: {
      en: 'Navoiy industrial zone opportunity score raised to 79',
      uz: 'Navoiy sanoat zonasi imkoniyat bahosi 79 ga oshirildi',
      ru: 'Оценка возможностей индустриальной зоны Навои повышена до 79',
    },
    time: { en: '1d ago', uz: '1 kun oldin', ru: '1 д назад' },
    tag: 'Opportunity',
  },
  {
    id: 4,
    title: {
      en: 'Currency volatility risk downgraded from Medium to Low',
      uz: 'Valyuta beqarorligi xavfi o‘rtachadan pastga tushirildi',
      ru: 'Риск валютной волатильности понижен со среднего до низкого',
    },
    time: { en: '2d ago', uz: '2 kun oldin', ru: '2 д назад' },
    tag: 'Risk Update',
  },
]

export const GOV_INCENTIVES = [
  {
    id: 1,
    title: { en: 'IT Park Tax Exemptions', uz: 'IT Park soliq imtiyozlari', ru: 'Налоговые льготы IT Park' },
    regionIds: ['toshkent_c'],
    benefit: {
      en: 'Up to 100% corporate tax exemption for registered tech companies',
      uz: 'Ro‘yxatdan o‘tgan texnologik kompaniyalar uchun korporativ soliqdan 100% gacha ozod etish',
      ru: 'До 100% освобождения от корпоративного налога для зарегистрированных технокомпаний',
    },
  },
  {
    id: 2,
    title: { en: 'Jizzakh Free Economic Zone', uz: 'Jizzax erkin iqtisodiy zonasi', ru: 'Свободная экономическая зона Джизак' },
    regionIds: ['jizzax'],
    benefit: {
      en: '7-year customs duty exemption on imported equipment',
      uz: 'Import qilinadigan uskunalar uchun 7 yillik bojxona to‘lovidan ozod etish',
      ru: '7-летнее освобождение от таможенных пошлин на импортное оборудование',
    },
  },
  {
    id: 3,
    title: { en: 'Youth Entrepreneurship Fund', uz: 'Yoshlar tadbirkorligi fondi', ru: 'Фонд молодёжного предпринимательства' },
    nationwide: true,
    benefit: {
      en: 'Subsidized loans up to $25,000 for founders under 30',
      uz: '30 yoshgacha bo‘lgan tadbirkorlar uchun $25,000 gacha imtiyozli kreditlar',
      ru: 'Льготные кредиты до $25,000 для предпринимателей младше 30 лет',
    },
  },
  {
    id: 4,
    title: { en: 'Agro-tech Modernization Grant', uz: 'Agrotexnologiyani modernizatsiya granti', ru: 'Грант на модернизацию агротехнологий' },
    regionIds: ['jizzax', 'samarqand'],
    benefit: {
      en: '30% co-financing on cold-chain & farming equipment',
      uz: 'Sovutgich zanjiri va qishloq xo‘jaligi uskunalari uchun 30% hamkorlikda moliyalashtirish',
      ru: 'Софинансирование 30% на холодильное и сельхозоборудование',
    },
  },
]
