const aiService = require('../services/ai.service');
const biznesGoyaService = require('../services/biznesGoya.service');

async function chat(req, res, next) {
  try {
    const { message, history } = req.body;
    const result = await aiService.chat({ message, history });
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

async function generate(req, res, next) {
  try {
    const { prompt } = req.body;
    const result = await aiService.generate({ prompt });
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

async function summarize(req, res, next) {
  try {
    const { text } = req.body;
    const result = await aiService.summarize({ text });
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

async function title(req, res, next) {
  try {
    const { text } = req.body;
    const result = await aiService.generateTitle({ text });
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

async function improve(req, res, next) {
  try {
    const { text, instructions } = req.body;
    const result = await aiService.improve({ text, instructions });
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

async function ideas(req, res, next) {
  try {
    const { topic, count } = req.body;
    const result = await aiService.brainstormIdeas({ topic, count: count ? Number(count) : 5 });
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

async function biznesGoya(req, res, next) {
  try {
    const { answers } = req.body;
    const result = await biznesGoyaService.generate({ answers });
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

async function biznesGoyaReja(req, res, next) {
  try {
    const { idea, answers } = req.body;
    const result = await biznesGoyaService.generatePlan({ idea, answers });
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  chat,
  generate,
  summarize,
  title,
  improve,
  ideas,
  biznesGoya,
  biznesGoyaReja,
};
