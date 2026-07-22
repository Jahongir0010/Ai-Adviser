const geoRepository = require('../repositories/geo.repository');

function getRegions() {
  return geoRepository.findAllRegions();
}

function getRegionById(id) {
  return geoRepository.findRegionById(id);
}

function getDistricts({ regionId } = {}) {
  return geoRepository.findAllDistricts({ regionId });
}

function getDistrictById(id) {
  return geoRepository.findDistrictById(id);
}

function getDistrictsByRegionId(regionId) {
  return geoRepository.findDistrictsByRegionId(regionId);
}

function getMahallas({ regionId, districtId, status, category, search, page = 1, limit = 50 } = {}) {
  const result = geoRepository.findAllMahallalar({ regionId, districtId, status, category, search });

  const pageNum = Math.max(1, Number(page) || 1);
  const limitNum = Math.min(200, Math.max(1, Number(limit) || 50));
  const start = (pageNum - 1) * limitNum;

  return {
    total: result.length,
    page: pageNum,
    limit: limitNum,
    items: result.slice(start, start + limitNum),
  };
}

function getMahallaById(id) {
  return geoRepository.findMahallaById(id);
}

function getMahallasByDistrictId(districtId) {
  return geoRepository.findMahallasByDistrictId(districtId);
}

function getCreditSummaries({ regionId, districtId } = {}) {
  return geoRepository.findCreditSummaries({ regionId, districtId });
}

function getRegionCreditSummary(regionId) {
  const rows = geoRepository.findCreditSummaries({ regionId });
  return {
    regionTotal: rows.find((r) => r.isRegionTotal) || null,
    districts: rows.filter((r) => !r.isRegionTotal),
  };
}

function getRegionBoundary(regionId) {
  return geoRepository.findRegionBoundary(regionId);
}

function getAllRegionBoundaries() {
  return geoRepository.findAllRegionBoundaries();
}

function getDistrictBoundary(districtId) {
  return geoRepository.findDistrictBoundary(districtId);
}

function getDistrictBoundariesByRegionId(regionId) {
  return geoRepository.findDistrictBoundariesByRegionId(regionId);
}

module.exports = {
  getRegions,
  getRegionById,
  getDistricts,
  getDistrictById,
  getDistrictsByRegionId,
  getMahallas,
  getMahallaById,
  getMahallasByDistrictId,
  getCreditSummaries,
  getRegionCreditSummary,
  getRegionBoundary,
  getAllRegionBoundaries,
  getDistrictBoundary,
  getDistrictBoundariesByRegionId,
};
