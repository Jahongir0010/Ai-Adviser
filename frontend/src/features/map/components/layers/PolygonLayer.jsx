import { useEffect, useRef } from 'react'
import { useMapInstance } from '../MapContext.js'

/**
 * Reusable GeoJSON polygon layer: fill + outline + label, with hover
 * highlighting and click selection, plus a "filter down to one feature"
 * mode used to hide siblings once one is selected. Both RegionsLayer and
 * DistrictsLayer are thin configurations of this component.
 */
export default function PolygonLayer({
  id,
  data,
  idProperty,
  selectedId,
  interactive = true,
  showLabels = true,
  fillColor = '#005BAC',
  lineColor = '#005BAC',
  fillOpacity,
  lineWidth,
  labelExpression,
  onSelect,
  onHover,
}) {
  const map = useMapInstance()
  const hoveredIdRef = useRef(null)

  const sourceId = `${id}-source`
  const fillLayerId = `${id}-fill`
  const lineLayerId = `${id}-line`
  const labelLayerId = `${id}-label`

  // Add source + layers once; update in place on subsequent data changes.
  useEffect(() => {
    if (!map || !data) return

    const existingSource = map.getSource(sourceId)
    if (existingSource) {
      existingSource.setData(data)
      return
    }

    map.addSource(sourceId, { type: 'geojson', data, promoteId: idProperty })

    map.addLayer({
      id: fillLayerId,
      type: 'fill',
      source: sourceId,
      paint: {
        'fill-color': fillColor,
        'fill-opacity': fillOpacity ?? ['case', ['boolean', ['feature-state', 'hover'], false], 0.38, 0.16],
      },
    })
    map.addLayer({
      id: lineLayerId,
      type: 'line',
      source: sourceId,
      paint: { 'line-color': lineColor, 'line-width': lineWidth ?? 1.6 },
    })
    if (showLabels) {
      map.addLayer({
        id: labelLayerId,
        type: 'symbol',
        source: sourceId,
        layout: {
          'text-field': labelExpression ?? ['get', 'name'],
          'text-size': 11.5,
          'text-font': ['Noto Sans Regular'],
          'text-max-width': 8,
        },
        paint: { 'text-color': '#0b3255', 'text-halo-color': '#ffffff', 'text-halo-width': 1.4 },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, data])

  // Remove everything on unmount (or when this layer's identity changes).
  useEffect(() => {
    return () => {
      if (!map) return
      for (const layerId of [labelLayerId, lineLayerId, fillLayerId]) {
        if (map.getLayer(layerId)) map.removeLayer(layerId)
      }
      if (map.getSource(sourceId)) map.removeSource(sourceId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, id])

  // Filter to a single selected feature (hides its siblings) or show all.
  useEffect(() => {
    if (!map || !map.getLayer(fillLayerId)) return
    const filter = selectedId != null ? ['==', ['get', idProperty], selectedId] : null
    map.setFilter(fillLayerId, filter)
    map.setFilter(lineLayerId, filter)
    if (showLabels) map.setFilter(labelLayerId, selectedId != null ? null : filter)
  }, [map, selectedId, idProperty, showLabels, fillLayerId, lineLayerId, labelLayerId])

  // lineWidth may be a data-driven expression that changes as the caller's
  // own selection state changes (e.g. to emphasize one region's outline)
  // without hiding siblings via selectedId - keep it reactive post-mount.
  useEffect(() => {
    if (!map || !map.getLayer(lineLayerId)) return
    map.setPaintProperty(lineLayerId, 'line-width', lineWidth ?? 1.6)
  }, [map, lineWidth, lineLayerId])

  // Click + hover interaction, only while this level is the "active" one.
  useEffect(() => {
    if (!map || !interactive || !map.getLayer(fillLayerId)) return

    function handleClick(e) {
      const feature = e.features?.[0]
      if (feature) onSelect?.(feature)
    }
    function handleMouseMove(e) {
      const feature = e.features?.[0]
      map.getCanvas().style.cursor = feature ? 'pointer' : ''
      if (feature && feature.id !== hoveredIdRef.current) {
        if (hoveredIdRef.current != null) {
          map.setFeatureState({ source: sourceId, id: hoveredIdRef.current }, { hover: false })
        }
        hoveredIdRef.current = feature.id
        map.setFeatureState({ source: sourceId, id: feature.id }, { hover: true })
        onHover?.(feature)
      }
    }
    function handleMouseLeave() {
      if (hoveredIdRef.current != null) {
        map.setFeatureState({ source: sourceId, id: hoveredIdRef.current }, { hover: false })
        hoveredIdRef.current = null
      }
      map.getCanvas().style.cursor = ''
      onHover?.(null)
    }

    map.on('click', fillLayerId, handleClick)
    map.on('mousemove', fillLayerId, handleMouseMove)
    map.on('mouseleave', fillLayerId, handleMouseLeave)

    return () => {
      map.off('click', fillLayerId, handleClick)
      map.off('mousemove', fillLayerId, handleMouseMove)
      map.off('mouseleave', fillLayerId, handleMouseLeave)
      map.getCanvas().style.cursor = ''
    }
  }, [map, interactive, onSelect, onHover, fillLayerId, sourceId])

  return null
}
