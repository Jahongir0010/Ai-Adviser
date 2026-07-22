export default function WizardProgress({ step, total }) {
  const pct = Math.round((step / total) * 100)
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 rounded-full bg-ink-100 overflow-hidden">
        <div
          className="h-full rounded-full btn-gradient-brand transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[12px] font-semibold text-ink-500 shrink-0 tabular-nums">
        {step} / {total}
      </span>
    </div>
  )
}
