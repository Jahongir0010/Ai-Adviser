const anketaService = require('../services/anketa.service');

async function listSavollar(req, res, next) {
  try {
    const data = await anketaService.getQuestions();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

async function submitJavoblar(req, res, next) {
  try {
    const { answers } = req.body;

    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ success: false, message: '"answers" obyekti kerak' });
    }

    const result = await anketaService.validateAnswers(answers);

    if (!result.valid) {
      return res.status(400).json({ success: false, errors: result.errors });
    }

    res.json({ success: true, data: result.data });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listSavollar,
  submitJavoblar,
};
