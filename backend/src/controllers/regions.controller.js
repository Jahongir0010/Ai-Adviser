const geoService = require('../services/geo.service');

function listRegions(req, res) {
  res.json({ success: true, data: geoService.getRegions() });
}

function getRegion(req, res) {
  const region = geoService.getRegionById(req.params.id);
  if (!region) {
    return res.status(404).json({ success: false, message: 'Hudud topilmadi' });
  }
  res.json({ success: true, data: region });
}

function listRegionDistricts(req, res) {
  const region = geoService.getRegionById(req.params.id);
  if (!region) {
    return res.status(404).json({ success: false, message: 'Hudud topilmadi' });
  }
  res.json({ success: true, data: geoService.getDistrictsByRegionId(req.params.id) });
}

function getRegionKreditStatistika(req, res) {
  const region = geoService.getRegionById(req.params.id);
  if (!region) {
    return res.status(404).json({ success: false, message: 'Hudud topilmadi' });
  }
  res.json({ success: true, data: geoService.getRegionCreditSummary(req.params.id) });
}

function getRegionChegara(req, res) {
  const region = geoService.getRegionById(req.params.id);
  if (!region) {
    return res.status(404).json({ success: false, message: 'Hudud topilmadi' });
  }
  const boundary = geoService.getRegionBoundary(req.params.id);
  if (!boundary) {
    return res.status(404).json({ success: false, message: 'Bu hudud uchun xarita chegarasi topilmadi' });
  }
  res.json({ success: true, data: boundary });
}

function listRegionBozorlari(req, res) {
  const region = geoService.getRegionById(req.params.id);
  if (!region) {
    return res.status(404).json({ success: false, message: 'Hudud topilmadi' });
  }
  res.json({ success: true, data: geoService.getBozorRasmlariByRegionId(req.params.id) });
}

function listBozorlar(req, res) {
  res.json({ success: true, data: geoService.getAllBozorRasmlari() });
}

module.exports = {
  listRegions,
  getRegion,
  listRegionDistricts,
  getRegionKreditStatistika,
  getRegionChegara,
  listRegionBozorlari,
  listBozorlar,
};
