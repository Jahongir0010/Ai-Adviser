const { Router } = require('express');
const regionsController = require('../controllers/regions.controller');
const { validateIdParam } = require('../middleware/validateIdParam');

const router = Router();

router.get('/regions', regionsController.listRegions);
router.get('/regions/:id', validateIdParam('id'), regionsController.getRegion);
router.get('/regions/:id/districts', validateIdParam('id'), regionsController.listRegionDistricts);
router.get('/regions/:id/kredit-statistika', validateIdParam('id'), regionsController.getRegionKreditStatistika);
router.get('/regions/:id/chegara', validateIdParam('id'), regionsController.getRegionChegara);

module.exports = router;
