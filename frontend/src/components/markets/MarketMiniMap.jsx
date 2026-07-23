import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Navigation } from 'lucide-react'
import { MAP_STYLE_URL } from '../../features/map/constants.js'
import { getGoogleMapsDirectionsUrl } from '../../data/markets.js'
import { useLocale } from '../../i18n/LocaleContext.jsx'

/** Small non-interactive map preview centered on a market; click opens Google Maps directions. */
export default function MarketMiniMap({ market }) {
  const { t } = useLocale()
  const containerRef = useRef(null)

  useEffect(() => {
    const { lat, lng } = market.coordinates
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: MAP_STYLE_URL,
      center: [lng, lat],
      zoom: 13,
      attributionControl: false,
    })
    map.dragPan.disable()
    map.scrollZoom.disable()
    map.doubleClickZoom.disable()
    map.touchZoomRotate.disable()
    map.keyboard.disable()
    map.boxZoom.disable()
    new maplibregl.Marker({ color: '#005BAC' }).setLngLat([lng, lat]).addTo(map)

    // The modal is still animating (opacity/scale) when this mounts, so
    // MapLibre's own construction-time container measurement is unreliable -
    // a ResizeObserver reliably catches the settled size and resizes to match.
    const resizeObserver = new ResizeObserver(() => map.resize())
    resizeObserver.observe(containerRef.current)

    return () => {
      resizeObserver.disconnect()
      map.remove()
    }
  }, [market.id, market.coordinates])

  return (
    <a
      href={getGoogleMapsDirectionsUrl(market)}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block h-[140px] rounded-[14px] overflow-hidden border border-ink-100"
    >
      {/* maplibre-gl.css forces this element to position:relative, which would defeat an
          "absolute inset-0" sizing approach (inset only applies to absolute/fixed elements) -
          w-full/h-full works with any position scheme, so use that instead (see MapCanvas.jsx). */}
      <div ref={containerRef} className="w-full h-full pointer-events-none" />
      <div className="absolute inset-0 flex items-center justify-center bg-ink-900/0 group-hover:bg-ink-900/25 transition-colors">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-white bg-primary-600 rounded-full px-3.5 py-2 shadow-soft-lg">
          <Navigation className="size-3.5" strokeWidth={2} />
          {t('markets.detail.getDirections')}
        </span>
      </div>
    </a>
  )
}
