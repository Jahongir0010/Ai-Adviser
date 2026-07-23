import GlassCard from '../../ui/GlassCard.jsx'

export default function ChartCard({ title, subtitle, legend, children, className = '' }) {
  return (
    <GlassCard className={`p-5 flex flex-col ${className}`}>
      <div className="flex items-start justify-between gap-3 mb-1">
        <div>
          <h4 className="font-semibold text-[14.5px] text-ink-900">{title}</h4>
          {subtitle && <p className="text-[12px] text-ink-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {legend && <div className="flex flex-wrap items-center gap-3 mt-1 mb-2">{legend}</div>}
      <div className="flex-1 min-h-[220px] mt-2">{children}</div>
    </GlassCard>
  )
}

export function LegendDot({ color, label }) {
  return (
    <span className="flex items-center gap-1.5 text-[12px] font-medium text-ink-500">
      <span className="size-2 rounded-full" style={{ background: color }} />
      {label}
    </span>
  )
}
