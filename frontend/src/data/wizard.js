export const WIZARD_QUESTIONS = [
  {
    id: 'budget',
    question: {
      en: 'What is your investment budget?',
      uz: 'Investitsiya byudjetingiz qancha?',
      ru: 'Какой у вас инвестиционный бюджет?',
    },
    subtext: {
      en: 'This helps AI calibrate realistic business scales for you.',
      uz: 'Bu sun’iy intellektga siz uchun realistik biznes ko‘lamini aniqlashga yordam beradi.',
      ru: 'Это поможет ИИ подобрать для вас реалистичный масштаб бизнеса.',
    },
    type: 'choice',
    options: [
      { en: 'Under $10,000', uz: "$10,000 dan kam", ru: 'До $10,000' },
      { en: '$10,000 – $50,000', uz: '$10,000 – $50,000', ru: '$10,000 – $50,000' },
      { en: '$50,000 – $200,000', uz: '$50,000 – $200,000', ru: '$50,000 – $200,000' },
      { en: '$200,000+', uz: "$200,000 dan ortiq", ru: 'Свыше $200,000' },
    ],
  },
  {
    id: 'region',
    question: {
      en: 'Which region do you want to invest in?',
      uz: 'Qaysi hududga investitsiya kiritmoqchisiz?',
      ru: 'В каком регионе вы хотите инвестировать?',
    },
    subtext: {
      en: 'AI will cross-reference this with regional demand and competition data.',
      uz: 'Sun’iy intellekt buni hududiy talab va raqobat ma’lumotlari bilan solishtiradi.',
      ru: 'ИИ сопоставит это с региональными данными о спросе и конкуренции.',
    },
    type: 'choice',
    options: [
      { en: 'Tashkent City', uz: 'Toshkent shahri', ru: 'город Ташкент' },
      { en: 'Samarkand', uz: 'Samarqand', ru: 'Самарканд' },
      { en: 'Fergana Valley', uz: "Farg'ona vodiysi", ru: 'Ферганская долина' },
      { en: 'Bukhara', uz: 'Buxoro', ru: 'Бухара' },
      { en: 'Not sure yet', uz: 'Hali aniq emas', ru: 'Пока не уверен' },
    ],
  },
  {
    id: 'land',
    question: {
      en: 'Do you own land or commercial property?',
      uz: 'Sizda yer yoki tijorat mulki bormi?',
      ru: 'У вас есть земля или коммерческая недвижимость?',
    },
    subtext: {
      en: 'Ownership changes which business models are feasible.',
      uz: 'Mulkchilik qaysi biznes modellari amalga oshirilishi mumkinligiga ta’sir qiladi.',
      ru: 'Наличие собственности влияет на то, какие бизнес-модели осуществимы.',
    },
    type: 'choice',
    options: [
      { en: 'Yes, I own land', uz: "Ha, yerim bor", ru: 'Да, у меня есть земля' },
      { en: 'I plan to lease', uz: 'Ijaraga olishni rejalashtiryapman', ru: 'Планирую арендовать' },
      { en: 'No, need guidance', uz: 'Yo‘q, maslahat kerak', ru: 'Нет, нужна консультация' },
    ],
  },
  {
    id: 'employees',
    question: {
      en: 'How many employees can you hire initially?',
      uz: 'Boshida nechta xodim yollay olasiz?',
      ru: 'Сколько сотрудников вы можете нанять изначально?',
    },
    subtext: {
      en: 'Used to estimate operating costs and management complexity.',
      uz: 'Bu operatsion xarajatlar va boshqaruv murakkabligini baholash uchun ishlatiladi.',
      ru: 'Используется для оценки операционных расходов и сложности управления.',
    },
    type: 'choice',
    options: [
      { en: 'Solo / 1 person', uz: 'Yolg‘iz / 1 kishi', ru: 'В одиночку / 1 человек' },
      { en: '2–5 employees', uz: '2–5 xodim', ru: '2–5 сотрудников' },
      { en: '6–20 employees', uz: '6–20 xodim', ru: '6–20 сотрудников' },
      { en: '20+ employees', uz: "20 dan ortiq xodim", ru: 'Свыше 20 сотрудников' },
    ],
  },
  {
    id: 'industries',
    question: {
      en: 'Which industries interest you most?',
      uz: 'Sizni qaysi sohalar ko‘proq qiziqtiradi?',
      ru: 'Какие отрасли вас больше всего интересуют?',
    },
    subtext: {
      en: 'Select the sectors AI should prioritize when generating ideas.',
      uz: 'Sun’iy intellekt g‘oyalar yaratishda ustuvorlik berishi kerak bo‘lgan sohalarni tanlang.',
      ru: 'Выберите секторы, которые ИИ должен учитывать в первую очередь при генерации идей.',
    },
    type: 'multi',
    options: [
      { en: 'Retail & E-commerce', uz: 'Chakana savdo va elektron tijorat', ru: 'Розница и e-commerce' },
      { en: 'Food & Beverage', uz: 'Oziq-ovqat va ichimliklar', ru: 'Еда и напитки' },
      { en: 'Tourism & Hospitality', uz: "Turizm va mehmondo'stlik", ru: 'Туризм и гостеприимство' },
      { en: 'Manufacturing', uz: 'Ishlab chiqarish', ru: 'Производство' },
      { en: 'Technology & IT', uz: 'Texnologiya va IT', ru: 'Технологии и IT' },
      { en: 'Agriculture', uz: "Qishloq xo'jaligi", ru: 'Сельское хозяйство' },
    ],
  },
  {
    id: 'risk',
    question: {
      en: 'How much risk can you accept?',
      uz: 'Qancha xavfni qabul qila olasiz?',
      ru: 'Какой уровень риска вы готовы принять?',
    },
    subtext: {
      en: 'AI will weight opportunity score against volatility accordingly.',
      uz: 'Sun’iy intellekt imkoniyat bahosini beqarorlikka nisbatan tegishlicha vazn beradi.',
      ru: 'ИИ соответственно взвесит оценку возможности относительно волатильности.',
    },
    type: 'choice',
    options: [
      { en: 'Low risk, stable returns', uz: 'Past xavf, barqaror daromad', ru: 'Низкий риск, стабильный доход' },
      { en: 'Moderate risk', uz: "O'rtacha xavf", ru: 'Умеренный риск' },
      { en: 'High risk, high reward', uz: 'Yuqori xavf, yuqori daromad', ru: 'Высокий риск, высокая доходность' },
    ],
  },
  {
    id: 'roi',
    question: {
      en: 'What is your expected ROI timeline?',
      uz: 'Kutilayotgan ROI muddati qancha?',
      ru: 'Каков ваш ожидаемый срок окупаемости (ROI)?',
    },
    subtext: {
      en: 'Helps prioritize fast-payback models vs. long-term growth plays.',
      uz: 'Bu tez qoplanadigan modellar va uzoq muddatli o‘sish strategiyalari orasida ustuvorlikni belgilashga yordam beradi.',
      ru: 'Помогает расставить приоритеты между быстроокупаемыми моделями и долгосрочным ростом.',
    },
    type: 'choice',
    options: [
      { en: 'Under 1 year', uz: '1 yildan kam', ru: 'Менее 1 года' },
      { en: '1–2 years', uz: '1–2 yil', ru: '1–2 года' },
      { en: '2–5 years', uz: '2–5 yil', ru: '2–5 лет' },
      { en: '5+ years', uz: "5 yildan ortiq", ru: 'Свыше 5 лет' },
    ],
  },
  {
    id: 'experience',
    question: {
      en: "What's your entrepreneurial experience level?",
      uz: 'Tadbirkorlik tajribangiz qanday darajada?',
      ru: 'Каков ваш уровень предпринимательского опыта?',
    },
    subtext: {
      en: 'AI adjusts plan complexity and support recommendations accordingly.',
      uz: 'Sun’iy intellekt reja murakkabligi va tavsiyalarni shunga qarab moslashtiradi.',
      ru: 'ИИ соответственно скорректирует сложность плана и рекомендации по поддержке.',
    },
    type: 'choice',
    options: [
      { en: 'First-time founder', uz: 'Birinchi marta tadbirkor', ru: 'Начинающий предприниматель' },
      { en: 'Some experience', uz: 'Ozgina tajribam bor', ru: 'Есть некоторый опыт' },
      { en: 'Serial entrepreneur', uz: 'Tajribali tadbirkor', ru: 'Серийный предприниматель' },
    ],
  },
]
