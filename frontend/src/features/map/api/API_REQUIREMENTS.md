# Map feature — backend API requirements

This documents what the frontend interactive map (`src/features/map/`) needs
from the backend. Everything below except the last section already exists
and is being used as-is (read-only — this frontend change does not touch
`backend/`).

## Already implemented (in use)

| Endpoint | Used for |
|---|---|
| `GET /api/xarita/hududlar` | Level 1 — all region boundaries |
| `GET /api/xarita/tumanlar?regionId=` | Level 2 — district boundaries for a region |
| `GET /api/regions/:id/districts` | (available, not currently needed — district names come from the boundary FeatureCollection's `properties.name`) |
| `GET /api/districts/:id/mahallas` | Level 3 list — full mahalla records (population, business/credit stats, specializations) for a district |
| `GET /api/mahallas/:id` | Fallback single-mahalla fetch (the list endpoint above already returns full records, so this is only used defensively) |

## Missing — required for full Level 3 support

**There is currently no mahalla-level boundary geometry anywhere in the
backend** (no GeoJSON file, and no lat/lng centroid on the mahalla record
in `backend/data/mahallalar.json`). Without it, the map cannot draw a
mahalla shape or fly the camera to it — Level 3 today shows the mahalla's
full statistics in the info panel with an explicit "boundary not yet
available" state instead of a polygon.

### Requested endpoint

```
GET /api/mahallas/:id/chegara
```

Mirror the existing `GET /api/regions/:id/chegara` /
`GET /api/districts/:id/chegara` convention exactly:

```json
{
  "success": true,
  "data": {
    "type": "Feature",
    "properties": { "mahallaId": "203683077", "districtId": 1, "name": "Зангибобо" },
    "geometry": { "type": "Polygon", "coordinates": [...] }
  }
}
```

- 404 with `{ "success": false, "message": "..." }` when no boundary exists for that id (same pattern as the region/district controllers) — the frontend already handles this gracefully.
- A `Point` geometry (mahalla centroid) would be an acceptable **minimum viable** first step if full polygon boundaries aren't readily available — it would at least let the map place a marker and fly the camera to the mahalla, which is most of the value. Full `Polygon`/`MultiPolygon` is the ideal end state.
- Recommended data source: the same GIS export ("7. Харита") that produced `hudud-chegaralari.geojson` / `tuman-chegaralari.geojson` likely has a mahalla-level layer; if not, even a manually-sourced centroid per mahalla (8,961 rows) into a new `backend/data/mahalla-chegaralari.geojson`, matched by `mahallaId` the same way districts are matched by `districtId`, would unlock this.

### Also useful (optional, not blocking)

`GET /api/mahallas/:id/statistika` or similar for AI-recommendation inputs —
the UI already has a placeholder section for future AI-generated
recommendations per mahalla; no specific shape is assumed yet.
