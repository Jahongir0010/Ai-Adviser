const { Router } = require('express');
const districtsController = require('../controllers/districts.controller');
const { validateIdParam } = require('../middleware/validateIdParam');

const router = Router();

router.get('/districts', districtsController.listDistricts);
router.get('/districts/:id', validateIdParam('id'), districtsController.getDistrict);
router.get('/districts/:id/mahallas', validateIdParam('id'), districtsController.listDistrictMahallalar);
router.get('/districts/:id/chegara', validateIdParam('id'), districtsController.getDistrictChegara);

module.exports = router;
