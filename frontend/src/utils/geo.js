import { Delaunay } from 'd3-delaunay'

// Stylised silhouette of Uzbekistan in a 1000x620 viewBox.
// Not survey-grade cartography — a smoothed schematic outline used purely
// as a clip mask so the data-driven Voronoi cells read as "a map".
const OUTLINE_POINTS = [
  [120, 40], [300, 18], [420, 28], [500, 62], [545, 120],
  [610, 150], [680, 135], [750, 165], [830, 178], [910, 210],
  [975, 255], [985, 300], [940, 335], [875, 320], [815, 275],
  [770, 255], [735, 225], [695, 245], [672, 292], [615, 330],
  [568, 355], [598, 415], [615, 470], [585, 530], [520, 565],
  [468, 545], [452, 485], [400, 458], [355, 490], [292, 470],
  [258, 415], [205, 392], [150, 358], [104, 302], [58, 225],
  [42, 145], [72, 78],
]

function catmullRomPath(points, closed = true) {
  const p = points
  const n = p.length
  let d = `M ${p[0][0]},${p[0][1]} `
  const count = closed ? n : n - 1
  for (let i = 0; i < count; i++) {
    const p0 = p[(i - 1 + n) % n]
    const p1 = p[i]
    const p2 = p[(i + 1) % n]
    const p3 = p[(i + 2) % n]
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6
    d += `C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2[0]},${p2[1]} `
  }
  return d + 'Z'
}

export const MAP_VIEWBOX = { width: 1000, height: 620 }
export const UZ_OUTLINE_PATH = catmullRomPath(OUTLINE_POINTS, true)

// Approximate relative centroids for each region, tuned to sit inside the
// outline above in roughly their real geographic relation to one another.
export const REGION_CENTROIDS = {
  qoraqalpogiston: { x: 195, y: 150, name: "Qoraqalpog'iston" },
  xorazm: { x: 128, y: 300, name: 'Xorazm' },
  navoiy: { x: 375, y: 235, name: 'Navoiy' },
  buxoro: { x: 270, y: 390, name: 'Buxoro' },
  qashqadaryo: { x: 455, y: 440, name: 'Qashqadaryo' },
  surxondaryo: { x: 535, y: 525, name: 'Surxondaryo' },
  samarqand: { x: 478, y: 310, name: 'Samarqand' },
  jizzax: { x: 555, y: 235, name: 'Jizzax' },
  sirdaryo: { x: 648, y: 205, name: 'Sirdaryo' },
  toshkent_v: { x: 718, y: 165, name: 'Toshkent viloyati' },
  toshkent_c: { x: 748, y: 200, name: 'Toshkent shahri' },
  namangan: { x: 828, y: 218, name: 'Namangan' },
  fargona: { x: 878, y: 272, name: "Farg'ona" },
  andijon: { x: 930, y: 248, name: 'Andijon' },
}

export function computeRegionCells() {
  const ids = Object.keys(REGION_CENTROIDS)
  const points = ids.map((id) => [REGION_CENTROIDS[id].x, REGION_CENTROIDS[id].y])
  const delaunay = Delaunay.from(points)
  const voronoi = delaunay.voronoi([20, 5, MAP_VIEWBOX.width - 5, MAP_VIEWBOX.height - 15])

  const cells = {}
  ids.forEach((id, i) => {
    const polygon = voronoi.cellPolygon(i)
    if (!polygon) return
    const d = 'M ' + polygon.map((pt) => `${pt[0].toFixed(1)},${pt[1].toFixed(1)}`).join(' L ') + ' Z'
    cells[id] = { id, path: d, ...REGION_CENTROIDS[id] }
  })
  return cells
}
