const geoDataService = require('../services/geoData.service');

function listRegions(req, res) {
  res.json({ success: true, data: geoDataService.getRegions() });
}

function listDistricts(req, res) {
  const { regionId } = req.query;
  res.json({ success: true, data: geoDataService.getDistricts({ regionId }) });
}

function listMahallalar(req, res) {
  const { regionId, districtId, status, category, search, page, limit } = req.query;
  const result = geoDataService.getMahallas({ regionId, districtId, status, category, search, page, limit });
  res.json({ success: true, ...result });
}

function getMahalla(req, res) {
  const mahalla = geoDataService.getMahallaById(req.params.id);
  if (!mahalla) {
    return res.status(404).json({ success: false, message: 'Mahalla topilmadi' });
  }
  res.json({ success: true, data: mahalla });
}

function listCreditSummaries(req, res) {
  const { regionId, districtId } = req.query;
  const data = geoDataService.getDistrictCreditSummaries({ regionId, districtId });
  res.json({ success: true, data });
}

module.exports = {
  listRegions,
  listDistricts,
  listMahallalar,
  getMahalla,
  listCreditSummaries,
};
