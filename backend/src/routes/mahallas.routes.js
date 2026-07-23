const { Router } = require('express');
const mahallasController = require('../controllers/mahallas.controller');

const router = Router();

// Flat, filterable listing (search/status/category/pagination) - kept for dashboard/search use cases.
router.get('/mahallalar', mahallasController.listMahallalar);
router.get('/mahallalar/:id', mahallasController.getMahalla);

// REST-style single-resource path, matching the nested /regions/:id/districts, /districts/:id/mahallas convention.
router.get('/mahallas/:id', mahallasController.getMahalla);
router.get('/mahallas/:id/chegara', mahallasController.getMahallaChegara);
router.get('/mahallas/:id/tahlil', mahallasController.getMahallaTahlil);

module.exports = router;
