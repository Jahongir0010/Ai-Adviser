export default function MetricTile({ icon: Icon, label, value, hint, tone = 'ink' }) {
  const toneClasses = {
    ink: 'bg-ink-50 text-ink-600',
    primary: 'bg-primary-50 text-primary-600',
    secondary: 'bg-secondary-50 text-secondary-600',
  }
  return (
    <div className="flex items-start gap-3 rounded-[14px] border border-ink-100 bg-white/70 p-3.5">
      <div className={`size-9 rounded-[10px] flex items-center justify-center shrink-0 ${toneClasses[tone]}`}>
        <Icon className="size-[17px]" strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <p className="text-[12px] text-ink-500 leading-tight">{label}</p>
        <p className="text-[15px] font-bold text-ink-900 leading-tight mt-0.5 truncate">{value}</p>
        {hint && <p className="text-[11px] text-ink-400 mt-0.5">{hint}</p>}
      </div>
    </div>
  )
}
