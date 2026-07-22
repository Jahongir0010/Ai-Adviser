const { Router } = require('express');
const anketaController = require('../controllers/anketa.controller');

const router = Router();

router.get('/anketa/savollar', anketaController.listSavollar);
router.post('/anketa/javoblar', anketaController.submitJavoblar);

module.exports = router;
