const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', '..', 'data');

function loadJson(filename) {
  const filePath = path.join(DATA_DIR, filename);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

const regions = loadJson('regions.json');
const districts = loadJson('districts.json');
const mahallalar = loadJson('mahallalar.json');
const districtCreditSummaries = loadJson('district-credit-summaries.json');

const mahallaById = new Map(mahallalar.map((m) => [m.id, m]));

function getRegions() {
  return regions;
}

function getDistricts({ regionId } = {}) {
  if (regionId === undefined) return districts;
  const id = Number(regionId);
  return districts.filter((d) => d.regionId === id);
}

function getMahallas({ regionId, districtId, status, category, search, page = 1, limit = 50 } = {}) {
  let result = mahallalar;

  if (districtId !== undefined) {
    const id = Number(districtId);
    result = result.filter((m) => m.districtId === id);
  } else if (regionId !== undefined) {
    const id = Number(regionId);
    const districtIds = new Set(districts.filter((d) => d.regionId === id).map((d) => d.id));
    result = result.filter((m) => districtIds.has(m.districtId));
  }

  if (status) {
    result = result.filter((m) => m.status === status);
  }

  if (category) {
    result = result.filter((m) => m.category === category);
  }

  if (search) {
    const term = search.trim().toLowerCase();
    result = result.filter((m) => m.name.toLowerCase().includes(term));
  }

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
  return mahallaById.get(String(id)) || null;
}

function getDistrictCreditSummaries({ regionId, districtId } = {}) {
  let result = districtCreditSummaries;

  if (districtId !== undefined) {
    const id = Number(districtId);
    result = result.filter((s) => s.districtId === id);
  } else if (regionId !== undefined) {
    const id = Number(regionId);
    result = result.filter((s) => s.regionId === id);
  }

  return result;
}

module.exports = {
  getRegions,
  getDistricts,
  getMahallas,
  getMahallaById,
  getDistrictCreditSummaries,
};
