export default function ChartTooltip({ active, payload, label, formatter }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-[12px] border border-ink-100 bg-white/95 backdrop-blur px-3.5 py-2.5 shadow-soft-lg min-w-[140px]">
      {label && <p className="text-[11.5px] font-semibold text-ink-500 mb-1.5">{label}</p>}
      <div className="space-y-1">
        {payload.map((entry) => (
          <div key={entry.dataKey ?? entry.name} className="flex items-center justify-between gap-4 text-[12.5px]">
            <span className="flex items-center gap-1.5 text-ink-600">
              <span className="size-2 rounded-full shrink-0" style={{ background: entry.color ?? entry.fill }} />
              {entry.name}
            </span>
            <span className="font-semibold text-ink-900">{formatter ? formatter(entry.value, entry) : entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
