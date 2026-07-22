const geoService = require('../services/geo.service');

function listMahallalar(req, res) {
  const { regionId, districtId, status, category, search, page, limit } = req.query;
  const result = geoService.getMahallas({ regionId, districtId, status, category, search, page, limit });
  res.json({ success: true, ...result });
}

function getMahalla(req, res) {
  const mahalla = geoService.getMahallaById(req.params.id);
  if (!mahalla) {
    return res.status(404).json({ success: false, message: 'Mahalla topilmadi' });
  }
  res.json({ success: true, data: mahalla });
}

module.exports = {
  listMahallalar,
  getMahalla,
};
