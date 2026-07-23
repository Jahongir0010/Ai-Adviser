const { randomUUID } = require('crypto');
const { Type } = require('@google/genai');
const anketaService = require('./anketa.service');
const tahlilService = require('./tahlil.service');
const geminiService = require('./gemini.service');

const TRILINGUAL_TEXT = {
  type: Type.OBJECT,
  properties: {
    en: { type: Type.STRING },
    uz: { type: Type.STRING },
    ru: { type: Type.STRING },
  },
  required: ['en', 'uz', 'ru'],
};

const IDEA_ITEM_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    name: { ...TRILINGUAL_TEXT, description: "Biznes g'oyaning nomi" },
    matchScore: { type: Type.INTEGER, description: 'Foydalanuvchi profiliga mosligi, 0-100' },
    investment: { type: Type.NUMBER, description: "Taxminiy boshlang'ich sarmoya, so'mda (faqat son)" },
    monthlyProfit: { type: Type.NUMBER, description: "Taxminiy oylik foyda, so'mda (faqat son)" },
    roi: { type: Type.NUMBER, description: 'Taxminiy investitsiya qaytimi, foizda (faqat son, masalan 18)' },
    payback: { ...TRILINGUAL_TEXT, description: "Sarmoyaning qoplanish muddati, masalan '6 oy'/'6 months'/'6 месяцев'" },
    marketDemand: { ...TRILINGUAL_TEXT, description: "Bozor talabi darajasi: Past/O'rta/Yuqori tarjimasi" },
    competitionLevel: { ...TRILINGUAL_TEXT, description: "Raqobat darajasi: Past/O'rta/Yuqori tarjimasi" },
    riskScore: { type: Type.INTEGER, description: 'Xavf darajasi, 0 (past) - 100 (yuqori)' },
    growthPotential: { ...TRILINGUAL_TEXT, description: "O'sish salohiyati: Past/O'rta/Yuqori tarjimasi" },
    govSupportEligible: { type: Type.BOOLEAN, description: 'Davlat kredit dasturlariga mos kelishi' },
    summary: { ...TRILINGUAL_TEXT, description: '2-3 gapli qisqacha tavsif va asoslash' },
  },
  required: [
    'name', 'matchScore', 'investment', 'monthlyProfit', 'roi', 'payback',
    'marketDemand', 'competitionLevel', 'riskScore', 'growthPotential',
    'govSupportEligible', 'summary',
  ],
};

const IDEAS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    ideas: { type: Type.ARRAY, items: IDEA_ITEM_SCHEMA },
  },
  required: ['ideas'],
};

const IDEAS_SYSTEM_INSTRUCTION = `Siz O'zbekistondagi kichik tadbirkorlar uchun ishlaydigan AI biznes-maslahatchisiz.
Foydalanuvchining anketa javoblari va uning mahallasi haqidagi HAQIQIY statistik ma'lumotlar asosida,
shu aniq hududga va shu odamning sharoitiga real mos keladigan 3 ta biznes-g'oya taklif qiling.
Umumiy, hech kimga tegishli bo'lmagan maslahatlar bermang - berilgan raqamlarga (aholi soni, mavjud
ixtisoslashuvlar, kredit dasturlari, kambag'allik darajasi) tayaning.
Har bir matnli maydonni (name, payback, marketDemand, competitionLevel, growthPotential, summary)
UCHALA tilda ham to'ldiring: en (ingliz), uz (o'zbek), ru (rus) - bittasi ham bo'sh qolmasin,
har biri o'sha tilda tabiiy va to'g'ri tarjima bo'lsin, so'zma-so'z emas.`;

function buildIdeasPrompt(answers, tahlil) {
  const lines = [
    `FOYDALANUVCHI ANKETASI:`,
    `- Hudud: ${tahlil.hudud?.name}, Tuman: ${tahlil.tuman?.name}, Mahalla: ${tahlil.mahalla?.name}`,
    `- Qiziqqan soha: ${answers.ixtisoslashuv}`,
    `- Loyihaning maqsadi: ${answers.loyiha_maqsadi}`,
    `- Faoliyat joyi: ${answers.faoliyat_joyi}`,
    `- Garov bor-yo'qligi: ${answers.garov_bor}${answers.garov_turi ? ` (${answers.garov_turi}, taxminan ${answers.garov_qiymati} so'm)` : ''}`,
    `- Qiziqqan kredit mahsuloti: ${answers.kredit_mahsuloti}`,
    ``,
    `MAHALLANING HAQIQIY STATISTIKASI:`,
    `- Aholi soni: ${tahlil.aholiSoni}`,
    `- Holati: ${tahlil.holati}, Kambag'allik toifasi: ${tahlil.kambagallikToifasi}`,
    `- Tadbirkorlik zichligi (aholiga nisbatan): ${tahlil.tadbirkorlikZichligi}`,
    `- Ishsizlik darajasi: ${tahlil.ishsizlikDarajasi}`,
    `- Kambag'al oilalar darajasi: ${tahlil.kambagalOilalarDarajasi}`,
    `- Mahalladagi asosiy ixtisoslashuvlar: ${JSON.stringify(tahlil.asosiyIxtisoslashuvlar)}`,
    `- Jami ajratilgan kredit: ${tahlil.jamiAjratilganKredit} so'm, NPL nisbati: ${tahlil.nplNisbati}`,
    `- Infratuzilma: ${JSON.stringify(tahlil.infratuzilma)}`,
  ];

  if (tahlil.tumanKreditDasturlari) {
    lines.push(``, `TUMANDAGI MAVJUD KREDIT DASTURLARI (mlrd so'mda):`, JSON.stringify(tahlil.tumanKreditDasturlari));
  }

  return lines.join('\n');
}

async function generate({ answers }) {
  const validation = await anketaService.validateAnswers(answers);

  if (!validation.valid) {
    const err = new Error('Anketa javoblari noto\'g\'ri yoki to\'liq emas');
    err.status = 400;
    err.details = validation.errors;
    throw err;
  }

  const data = validation.data;
  const tahlil = tahlilService.mahallaTahlili(data.mahalla);

  if (!tahlil) {
    const err = new Error('Tanlangan mahalla topilmadi');
    err.status = 404;
    throw err;
  }

  const result = await geminiService.generateJson({
    prompt: buildIdeasPrompt(data, tahlil),
    systemInstruction: IDEAS_SYSTEM_INSTRUCTION,
    schema: IDEAS_SCHEMA,
    temperature: 0.8,
  });

  const ideas = result.ideas.map((idea) => ({ id: randomUUID(), ...idea }));

  return { ideas, asosMalumot: tahlil };
}

const PLAN_SECTION_IDS = [
  'executive-summary',
  'market-analysis',
  'competitor-analysis',
  'swot',
  'marketing-strategy',
  'financial-forecast',
  'risk-assessment',
  'implementation-roadmap',
  'investment-plan',
  'revenue-projection',
];

const PLAN_SECTION_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING, enum: PLAN_SECTION_IDS },
    title: { ...TRILINGUAL_TEXT, description: 'Bo\'lim sarlavhasi' },
    body: { ...TRILINGUAL_TEXT, description: 'Bo\'lim matni - kamida 3-4 paragraf, aniq va amaliy' },
  },
  required: ['id', 'title', 'body'],
};

const PLAN_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    title: { ...TRILINGUAL_TEXT, description: 'Biznes-rejaning umumiy sarlavhasi' },
    sections: { type: Type.ARRAY, items: PLAN_SECTION_SCHEMA },
  },
  required: ['title', 'sections'],
};

const PLAN_SYSTEM_INSTRUCTION = `Siz O'zbekistondagi kichik tadbirkorlar uchun batafsil biznes-reja tayyorlaydigan AI maslahatchisiz.
Berilgan biznes-g'oya va mahallaning haqiqiy statistikasi asosida, quyidagi 10 ta bo'limning
BARCHASINI, aynan shu tartibda va aynan shu id'lar bilan to'ldiring:
${PLAN_SECTION_IDS.join(', ')}.
Har bir bo'lim kamida 3-4 paragraf, aniq, amaliy va berilgan real ma'lumotlarga (aholi, ixtisoslashuv,
kredit dasturlari, raqobat) asoslangan bo'lsin - umumiy gaplar bilan cheklanmang.
Har bir matnli maydonni (title, body) UCHALA tilda ham to'ldiring: en, uz, ru - bittasi ham bo'sh qolmasin.`;

function buildPlanPrompt(idea, answers, tahlil) {
  const lines = [
    `TANLANGAN BIZNES-G'OYA:`,
    JSON.stringify(idea),
    ``,
    `FOYDALANUVCHI ANKETASI:`,
    JSON.stringify(answers),
  ];

  if (tahlil) {
    lines.push(``, `MAHALLANING HAQIQIY STATISTIKASI:`, JSON.stringify(tahlil));
  }

  return lines.join('\n');
}

async function generatePlan({ idea, answers }) {
  if (!idea || typeof idea !== 'object') {
    const err = new Error('"idea" obyekti kerak');
    err.status = 400;
    throw err;
  }

  const tahlil = answers && answers.mahalla ? tahlilService.mahallaTahlili(answers.mahalla) : null;

  const result = await geminiService.generateJson({
    prompt: buildPlanPrompt(idea, answers || {}, tahlil),
    systemInstruction: PLAN_SYSTEM_INSTRUCTION,
    schema: PLAN_SCHEMA,
    temperature: 0.7,
  });

  return {
    planId: randomUUID(),
    title: result.title,
    sections: result.sections,
  };
}

module.exports = { generate, generatePlan };
