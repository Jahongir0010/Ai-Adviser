import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { MAP_STYLE_URL, UZBEKISTAN_BOUNDS, FIT_BOUNDS_PADDING, FLY_TO_DURATION_MS } from '../constants.js'
import { MapInstanceContext } from './MapContext.js'

/**
 * Owns the MapLibre GL instance. Exposes an imperative handle so parent
 * orchestrators can drive the camera (flyToBounds) without needing to reach
 * into the DOM/instance themselves; provides the instance via context so
 * layer components can add/remove sources declaratively.
 */
const MapCanvas = forwardRef(function MapCanvas({ children, className = '' }, ref) {
  const containerRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const [readyMap, setReadyMap] = useState(null)

  useImperativeHandle(
    ref,
    () => ({
      getMap: () => mapInstanceRef.current,
      flyToBounds: (bbox, options = {}) => {
        const map = mapInstanceRef.current
        if (!map || !bbox) return
        map.fitBounds(bbox, {
          padding: FIT_BOUNDS_PADDING,
          duration: FLY_TO_DURATION_MS,
          ...options,
        })
      },
    }),
    []
  )

  useEffect(() => {
    const instance = new maplibregl.Map({
      container: containerRef.current,
      style: MAP_STYLE_URL,
      bounds: UZBEKISTAN_BOUNDS,
      fitBoundsOptions: { padding: FIT_BOUNDS_PADDING },
      attributionControl: false,
    })
    // The InfoPanel overlays the entire right edge of the map (top-3 to bottom-3),
    // so controls placed in either right-hand corner would be hidden behind it.
    instance.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-left')
    instance.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showUserLocation: true,
        showAccuracyCircle: true,
      }),
      'bottom-left'
    )
    instance.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right')
    mapInstanceRef.current = instance

    function handleLoad() {
      setReadyMap(instance)
    }
    instance.on('load', handleLoad)

    return () => {
      instance.off('load', handleLoad)
      instance.remove()
      mapInstanceRef.current = null
      setReadyMap(null)
    }
  }, [])

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* maplibre-gl.css forces this element to position:relative, which would defeat
          an "absolute inset-0" sizing approach (inset only applies to absolute/fixed
          elements) - w-full/h-full works with any position scheme, so use that instead. */}
      <div ref={containerRef} className="w-full h-full" />
      <MapInstanceContext.Provider value={readyMap}>{readyMap ? children : null}</MapInstanceContext.Provider>
    </div>
  )
})

export default MapCanvas
