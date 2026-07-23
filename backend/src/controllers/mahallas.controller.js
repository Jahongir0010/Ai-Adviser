const geoService = require('../services/geo.service');
const tahlilService = require('../services/tahlil.service');

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

function getMahallaChegara(req, res) {
  const mahalla = geoService.getMahallaById(req.params.id);
  if (!mahalla) {
    return res.status(404).json({ success: false, message: 'Mahalla topilmadi' });
  }
  const boundary = geoService.getMahallaBoundary(req.params.id);
  if (!boundary) {
    return res.status(404).json({ success: false, message: 'Bu mahalla uchun xarita chegarasi topilmadi' });
  }
  res.json({ success: true, data: boundary });
}

function getMahallaTahlil(req, res) {
  const tahlil = tahlilService.mahallaTahlili(req.params.id);
  if (!tahlil) {
    return res.status(404).json({ success: false, message: 'Mahalla topilmadi' });
  }
  res.json({ success: true, data: tahlil });
}

module.exports = {
  listMahallalar,
  getMahalla,
  getMahallaChegara,
  getMahallaTahlil,
};
