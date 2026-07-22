const geoService = require('../services/geo.service');

function getHududlarChegara(req, res) {
  res.json({ success: true, data: geoService.getAllRegionBoundaries() });
}

function getTumanlarChegara(req, res) {
  const { regionId } = req.query;

  if (!regionId) {
    return res.status(400).json({
      success: false,
      message: '"regionId" majburiy (butun mamlakat tumanlarini bir yo\'la qaytarish hajmi katta bo\'lgani uchun)',
    });
  }

  const region = geoService.getRegionById(regionId);
  if (!region) {
    return res.status(404).json({ success: false, message: 'Hudud topilmadi' });
  }

  res.json({ success: true, data: geoService.getDistrictBoundariesByRegionId(regionId) });
}

module.exports = {
  getHududlarChegara,
  getTumanlarChegara,
};
