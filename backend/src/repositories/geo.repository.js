const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', '..', 'data');

function loadJson(filename) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, filename), 'utf-8'));
}

const regions = loadJson('regions.json');
const districts = loadJson('districts.json');
const mahallalar = loadJson('mahallalar.json');
const districtCreditSummaries = loadJson('district-credit-summaries.json');
const regionBoundaries = loadJson('hudud-chegaralari.geojson');
const districtBoundaries = loadJson('tuman-chegaralari.geojson');

const regionById = new Map(regions.map((r) => [r.id, r]));
const districtById = new Map(districts.map((d) => [d.id, d]));
const mahallaById = new Map(mahallalar.map((m) => [m.id, m]));
const regionBoundaryByRegionId = new Map(
  regionBoundaries.features.map((f) => [f.properties.regionId, f])
);
const districtBoundaryByDistrictId = new Map(
  districtBoundaries.features.map((f) => [f.properties.districtId, f])
);

// Data currently comes from static JSON built from official spreadsheets (see backend/data).
// Swapping this for a Postgres/Supabase-backed implementation later should only require
// rewriting the functions below - callers (services/controllers) never touch the data files directly.

function findAllRegions() {
  return regions;
}

function findRegionById(id) {
  return regionById.get(Number(id)) || null;
}

function findAllDistricts({ regionId } = {}) {
  if (regionId === undefined) return districts;
  const id = Number(regionId);
  return districts.filter((d) => d.regionId === id);
}

function findDistrictById(id) {
  return districtById.get(Number(id)) || null;
}

function findDistrictsByRegionId(regionId) {
  const id = Number(regionId);
  return districts.filter((d) => d.regionId === id);
}

function findAllMahallalar({ regionId, districtId, status, category, search } = {}) {
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

  return result;
}

function findMahallaById(id) {
  return mahallaById.get(String(id)) || null;
}

function findMahallasByDistrictId(districtId) {
  const id = Number(districtId);
  return mahallalar.filter((m) => m.districtId === id);
}

function findCreditSummaries({ regionId, districtId } = {}) {
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

function findRegionBoundary(regionId) {
  return regionBoundaryByRegionId.get(Number(regionId)) || null;
}

function findAllRegionBoundaries() {
  return regionBoundaries;
}

function findDistrictBoundary(districtId) {
  return districtBoundaryByDistrictId.get(Number(districtId)) || null;
}

function findDistrictBoundariesByRegionId(regionId) {
  const id = Number(regionId);
  return {
    type: 'FeatureCollection',
    features: districtBoundaries.features.filter((f) => f.properties.regionId === id),
  };
}

module.exports = {
  findAllRegions,
  findRegionById,
  findAllDistricts,
  findDistrictById,
  findDistrictsByRegionId,
  findAllMahallalar,
  findMahallaById,
  findMahallasByDistrictId,
  findCreditSummaries,
  findRegionBoundary,
  findAllRegionBoundaries,
  findDistrictBoundary,
  findDistrictBoundariesByRegionId,
};
