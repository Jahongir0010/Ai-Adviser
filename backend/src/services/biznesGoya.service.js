const { Type } = require('@google/genai');
const anketaService = require('./anketa.service');
const tahlilService = require('./tahlil.service');
const geminiService = require('./gemini.service');

const IDEA_ITEM_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "Biznes g'oyaning nomi, o'zbek tilida" },
    matchScore: { type: Type.INTEGER, description: "Foydalanuvchi profiliga mosligi, 0-100" },
    investment: { type: Type.STRING, description: "Taxminiy boshlang'ich sarmoya, so'mda, masalan '15 000 000 so'm'" },
    monthlyProfit: { type: Type.STRING, description: "Taxminiy oylik foyda, so'mda" },
    roi: { type: Type.STRING, description: "Taxminiy investitsiya qaytimi foizda, masalan '18%'" },
    payback: { type: Type.STRING, description: "Sarmoyaning qoplanish muddati, masalan '14 oy'" },
    marketDemand: { type: Type.STRING, description: "Bozor talabi darajasi: Past, O'rta yoki Yuqori" },
    competitionLevel: { type: Type.STRING, description: "Raqobat darajasi: Past, O'rta yoki Yuqori" },
    riskScore: { type: Type.INTEGER, description: "Xavf darajasi, 0 (past) - 100 (yuqori)" },
    growthPotential: { type: Type.STRING, description: "O'sish salohiyati: Past, O'rta yoki Yuqori" },
    govSupportEligible: { type: Type.BOOLEAN, description: "Davlat kredit dasturlariga mos kelishi" },
    summary: { type: Type.STRING, description: "2-3 gapli qisqacha tavsif va asoslash" },
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

const SYSTEM_INSTRUCTION = `Siz O'zbekistondagi kichik tadbirkorlar uchun ishlaydigan AI biznes-maslahatchisiz.
Foydalanuvchining anketa javoblari va uning mahallasi haqidagi HAQIQIY statistik ma'lumotlar asosida,
shu aniq hududga va shu odamning sharoitiga real mos keladigan 3 ta biznes-g'oya taklif qiling.
Umumiy, hech kimga tegishli bo'lmagan maslahatlar bermang - berilgan raqamlarga (aholi soni, mavjud
ixtisoslashuvlar, kredit dasturlari, kambag'allik darajasi) tayaning. Javobni o'zbek tilida bering.`;

function buildPrompt(answers, tahlil) {
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
    prompt: buildPrompt(data, tahlil),
    systemInstruction: SYSTEM_INSTRUCTION,
    schema: IDEAS_SCHEMA,
    temperature: 0.8,
  });

  return { ideas: result.ideas, asosMalumot: tahlil };
}

module.exports = { generate };
