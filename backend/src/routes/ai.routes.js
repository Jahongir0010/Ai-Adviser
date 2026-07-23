const { Router } = require('express');
const aiController = require('../controllers/ai.controller');
const { validateBody } = require('../middleware/validateBody');

const router = Router();

router.post(
  '/ai/chat',
  validateBody({
    message: { required: true, type: 'string', maxLength: 8000 },
    history: { required: false, type: 'array' },
  }),
  aiController.chat
);

router.post(
  '/ai/generate',
  validateBody({ prompt: { required: true, type: 'string', maxLength: 8000 } }),
  aiController.generate
);

router.post(
  '/ai/summarize',
  validateBody({ text: { required: true, type: 'string', maxLength: 20000 } }),
  aiController.summarize
);

router.post(
  '/ai/title',
  validateBody({ text: { required: true, type: 'string', maxLength: 20000 } }),
  aiController.title
);

router.post(
  '/ai/improve',
  validateBody({
    text: { required: true, type: 'string', maxLength: 20000 },
    instructions: { required: false, type: 'string', maxLength: 1000 },
  }),
  aiController.improve
);

router.post(
  '/ai/ideas',
  validateBody({
    topic: { required: true, type: 'string', maxLength: 1000 },
    count: { required: false, type: 'number', min: 1, max: 10 },
  }),
  aiController.ideas
);

router.post(
  '/ai/biznes-goya',
  validateBody({ answers: { required: true, type: 'object' } }),
  aiController.biznesGoya
);

router.post(
  '/ai/biznes-goya/reja',
  validateBody({
    idea: { required: true, type: 'object' },
    answers: { required: false, type: 'object' },
  }),
  aiController.biznesGoyaReja
);

module.exports = router;
