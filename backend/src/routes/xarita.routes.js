const { Router } = require('express');
const xaritaController = require('../controllers/xarita.controller');

const router = Router();

router.get('/xarita/hududlar', xaritaController.getHududlarChegara);
router.get('/xarita/tumanlar', xaritaController.getTumanlarChegara);

module.exports = router;
