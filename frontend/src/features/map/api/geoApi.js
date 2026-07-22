import { apiGet } from './client.js'

// One function per real backend endpoint (backend/src/routes/{regions,districts,mahallas,xarita}.routes.js).
// Every function unwraps the `{ success, data }` envelope and returns just the payload.

/** All 14 region boundaries in one GeoJSON FeatureCollection. properties: {regionId, name} */
export function getAllRegionBoundaries(options) {
  return apiGet('/xarita/hududlar', options).then((r) => r.data)
}

/** Single region boundary Feature. */
export function getRegionBoundary(regionId, options) {
  return apiGet(`/regions/${regionId}/chegara`, options).then((r) => r.data)
}

/** District boundaries for one region, GeoJSON FeatureCollection. properties: {districtId, regionId, name} */
export function getDistrictBoundariesByRegion(regionId, options) {
  return apiGet('/xarita/tumanlar', { ...options, params: { regionId } }).then((r) => r.data)
}

/** Single district boundary Feature. */
export function getDistrictBoundary(districtId, options) {
  return apiGet(`/districts/${districtId}/chegara`, options).then((r) => r.data)
}

/** @returns {Promise<{id:number, name:string}[]>} */
export function getRegions(options) {
  return apiGet('/regions', options).then((r) => r.data)
}

export function getRegion(regionId, options) {
  return apiGet(`/regions/${regionId}`, options).then((r) => r.data)
}

/** @returns {Promise<{id:number, regionId:number, name:string}[]>} */
export function getRegionDistricts(regionId, options) {
  return apiGet(`/regions/${regionId}/districts`, options).then((r) => r.data)
}

export function getDistrict(districtId, options) {
  return apiGet(`/districts/${districtId}`, options).then((r) => r.data)
}

/** Full mahalla records (population, business/credit stats, specializations) for one district. */
export function getDistrictMahallas(districtId, options) {
  return apiGet(`/districts/${districtId}/mahallas`, options).then((r) => r.data)
}

/** Single mahalla's full record. */
export function getMahalla(mahallaId, options) {
  return apiGet(`/mahallas/${mahallaId}`, options).then((r) => r.data)
}

/**
 * NOT YET IMPLEMENTED ON THE BACKEND — see api/API_REQUIREMENTS.md.
 * Called defensively; callers must treat a rejected promise (404 or network
 * error) as "no boundary available yet" rather than a hard failure.
 */
export function getMahallaBoundary(mahallaId, options) {
  return apiGet(`/mahallas/${mahallaId}/chegara`, options).then((r) => r.data)
}
