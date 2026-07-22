// Minimal GeoJSON bbox helpers - deliberately dependency-free (no turf) since
// all we need is "min/max lng/lat over a Polygon/MultiPolygon coordinate tree".

function extendWithCoords(bbox, coords) {
  if (typeof coords[0] === 'number') {
    const [lng, lat] = coords
    if (lng < bbox[0]) bbox[0] = lng
    if (lat < bbox[1]) bbox[1] = lat
    if (lng > bbox[2]) bbox[2] = lng
    if (lat > bbox[3]) bbox[3] = lat
    return
  }
  for (const c of coords) extendWithCoords(bbox, c)
}

/** @returns {[number,number,number,number]} [westLng, southLat, eastLng, northLat] */
export function bboxOfGeometry(geometry) {
  const bbox = [Infinity, Infinity, -Infinity, -Infinity]
  extendWithCoords(bbox, geometry.coordinates)
  return bbox
}

export function bboxOfFeature(feature) {
  return bboxOfGeometry(feature.geometry)
}

export function bboxOfFeatureCollection(featureCollection) {
  const bbox = [Infinity, Infinity, -Infinity, -Infinity]
  for (const feature of featureCollection.features) {
    const [minX, minY, maxX, maxY] = bboxOfGeometry(feature.geometry)
    if (minX < bbox[0]) bbox[0] = minX
    if (minY < bbox[1]) bbox[1] = minY
    if (maxX > bbox[2]) bbox[2] = maxX
    if (maxY > bbox[3]) bbox[3] = maxY
  }
  return bbox
}

export function findFeatureByProperty(featureCollection, propertyKey, value) {
  return featureCollection?.features?.find((f) => String(f.properties[propertyKey]) === String(value)) ?? null
}
