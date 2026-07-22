import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react'

const STYLES = {
  up: 'text-secondary-700 bg-secondary-50',
  down: 'text-rose-600 bg-rose-50',
  flat: 'text-ink-500 bg-ink-100',
}

const ICONS = { up: ArrowUpRight, down: ArrowDownRight, flat: Minus }

export default function TrendBadge({ trend = 'flat', value }) {
  const Icon = ICONS[trend] ?? Minus
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[12px] font-semibold ${STYLES[trend]}`}>
      <Icon className="size-3.5" strokeWidth={2.5} />
      {value}
    </span>
  )
}
