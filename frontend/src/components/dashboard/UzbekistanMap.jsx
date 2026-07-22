import { useMemo, useState } from 'react'
import { computeRegionCells, MAP_VIEWBOX, UZ_OUTLINE_PATH } from '../../utils/geo.js'
import { REGIONS } from '../../data/regions.js'

const SCORES = Object.values(REGIONS).map((r) => r.aiOpportunityScore)
const SCORE_MIN = Math.min(...SCORES)
const SCORE_MAX = Math.max(...SCORES)

function scoreToColor(score) {
  // stretch across the actual score range so regions are visually distinguishable,
  // interpolating brand primary (lower relative opportunity) to secondary (higher)
  const t = Math.min(Math.max((score - SCORE_MIN) / (SCORE_MAX - SCORE_MIN || 1), 0), 1)
  const c1 = [0, 91, 172] // primary-600
  const c2 = [0, 168, 107] // secondary-500
  const mix = (a, b, t) => Math.round(a + (b - a) * t)
  const r = mix(c1[0], c2[0], t)
  const g = mix(c1[1], c2[1], t)
  const b = mix(c1[2], c2[2], t)
  return `rgb(${r},${g},${b})`
}

export default function UzbekistanMap({ selectedId, onSelect }) {
  const cells = useMemo(() => computeRegionCells(), [])
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
        className="w-full h-auto select-none"
        role="img"
        aria-label="Interactive map of Uzbekistan regions"
      >
        <defs>
          <clipPath id="uz-outline-clip">
            <path d={UZ_OUTLINE_PATH} />
          </clipPath>
          <filter id="map-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#0b3255" floodOpacity="0.16" />
          </filter>
        </defs>

        <path d={UZ_OUTLINE_PATH} fill="#eef3f9" />

        <g clipPath="url(#uz-outline-clip)">
          {Object.values(cells).map((cell) => {
            const data = REGIONS[cell.id]
            const isSelected = selectedId === cell.id
            const isHovered = hoveredId === cell.id
            return (
              <path
                key={cell.id}
                d={cell.path}
                fill={scoreToColor(data?.aiOpportunityScore ?? 50)}
                stroke="#f5f8fc"
                strokeWidth={isSelected ? 3 : 2}
                style={{
                  cursor: 'pointer',
                  opacity: isHovered || isSelected ? 1 : 0.88,
                  filter: isSelected ? 'url(#map-shadow)' : undefined,
                  transition: 'opacity 0.2s ease, stroke-width 0.2s ease',
                }}
                onMouseEnter={() => setHoveredId(cell.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onSelect(cell.id)}
              />
            )
          })}
          {Object.values(cells).map((cell) =>
            selectedId === cell.id ? (
              <path
                key={`ring-${cell.id}`}
                d={cell.path}
                fill="none"
                stroke="#005BAC"
                strokeWidth={2.5}
                pointerEvents="none"
              />
            ) : null
          )}
        </g>

        <path d={UZ_OUTLINE_PATH} fill="none" stroke="#0b3255" strokeOpacity={0.12} strokeWidth={2} />

        {Object.values(cells).map((cell) => (
          <text
            key={`label-${cell.id}`}
            x={cell.x}
            y={cell.y}
            textAnchor="middle"
            pointerEvents="none"
            fontSize={cell.id === 'toshkent_c' || cell.id === 'sirdaryo' ? 9 : 11}
            fontWeight={selectedId === cell.id ? 700 : 600}
            fill="#0b3255"
            paintOrder="stroke"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth={3}
          >
            {cell.name}
          </text>
        ))}
      </svg>

      <div className="absolute bottom-2 left-2 flex items-center gap-2 rounded-full bg-white/85 backdrop-blur px-3 py-1.5 border border-ink-100 shadow-soft">
        <span className="text-[11px] font-medium text-ink-500">AI Opportunity Score</span>
        <span className="h-2 w-20 rounded-full bg-gradient-to-r from-primary-600 to-secondary-500" />
        <span className="text-[11px] text-ink-400">Low → High</span>
      </div>
    </div>
  )
}
