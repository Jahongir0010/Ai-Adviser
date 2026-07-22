const geoService = require('../services/geo.service');

function listDistricts(req, res) {
  const { regionId } = req.query;
  res.json({ success: true, data: geoService.getDistricts({ regionId }) });
}

function getDistrict(req, res) {
  const district = geoService.getDistrictById(req.params.id);
  if (!district) {
    return res.status(404).json({ success: false, message: 'Tuman topilmadi' });
  }
  res.json({ success: true, data: district });
}

function listDistrictMahallalar(req, res) {
  const district = geoService.getDistrictById(req.params.id);
  if (!district) {
    return res.status(404).json({ success: false, message: 'Tuman topilmadi' });
  }
  res.json({ success: true, data: geoService.getMahallasByDistrictId(req.params.id) });
}

function getDistrictChegara(req, res) {
  const district = geoService.getDistrictById(req.params.id);
  if (!district) {
    return res.status(404).json({ success: false, message: 'Tuman topilmadi' });
  }
  const boundary = geoService.getDistrictBoundary(req.params.id);
  if (!boundary) {
    return res.status(404).json({ success: false, message: 'Bu tuman uchun xarita chegarasi topilmadi' });
  }
  res.json({ success: true, data: boundary });
}

module.exports = {
  listDistricts,
  getDistrict,
  listDistrictMahallalar,
  getDistrictChegara,
};
