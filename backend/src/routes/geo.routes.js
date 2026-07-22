const { Router } = require('express');
const geoController = require('../controllers/geo.controller');

const router = Router();

router.get('/regions', geoController.listRegions);
router.get('/districts', geoController.listDistricts);
router.get('/mahallalar', geoController.listMahallalar);
router.get('/mahallalar/:id', geoController.getMahalla);
router.get('/kredit-statistika', geoController.listCreditSummaries);

module.exports = router;
