const anketaService = require('../services/anketa.service');

function listSavollar(req, res) {
  res.json({ success: true, data: anketaService.getQuestions() });
}

function submitJavoblar(req, res) {
  const { answers } = req.body;

  if (!answers || typeof answers !== 'object') {
    return res.status(400).json({ success: false, message: '"answers" obyekti kerak' });
  }

  const result = anketaService.validateAnswers(answers);

  if (!result.valid) {
    return res.status(400).json({ success: false, errors: result.errors });
  }

  res.json({ success: true, data: result.data });
}

module.exports = {
  listSavollar,
  submitJavoblar,
};
