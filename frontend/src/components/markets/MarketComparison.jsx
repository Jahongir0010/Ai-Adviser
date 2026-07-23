import { X } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'
import { useLocale, tr } from '../../i18n/LocaleContext.jsx'

const ROWS = [
  { key: 'demand', labelKey: 'markets.analysis.demand', get: (m) => `${m.stats.demand}/100` },
  { key: 'competition', labelKey: 'markets.analysis.competition', get: (m) => `${m.stats.competition}/100` },
  { key: 'price', labelKey: 'markets.analysis.priceLevel', get: (m) => `${m.avgPriceIndex}/100` },
  { key: 'accessibility', labelKey: 'markets.compare.accessibility', get: (m) => `${m.stats.logistics}/100` },
  { key: 'businessScore', labelKey: 'markets.compare.businessScore', get: (m) => `${m.stats.opportunity}/100` },
  { key: 'investmentScore', labelKey: 'markets.compare.investmentScore', get: (m) => `${m.stats.investmentAttractiveness}/100` },
]

export default function MarketComparison({ markets, onClose, onRemove }) {
  const { locale, t } = useLocale()
  if (markets.length === 0) return null

  return (
    <GlassCard className="p-5 md:p-6 animate-fade-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-[16px] text-ink-900">{t('markets.compare.title').replace('{n}', markets.length)}</h3>
        <button onClick={onClose} className="size-8 rounded-full flex items-center justify-center text-ink-400 hover:bg-ink-100">
          <X className="size-4" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[560px]">
          <thead>
            <tr>
              <th className="text-[12px] font-semibold text-ink-400 uppercase tracking-wider pb-3 pr-4 w-44">{t('markets.compare.metric')}</th>
              {markets.map((m) => (
                <th key={m.id} className="text-[13.5px] font-bold text-ink-900 pb-3 pr-4 min-w-[160px]">
                  <div className="flex items-center justify-between gap-2">
                    {tr(m.name, locale)}
                    <button onClick={() => onRemove(m.id)} className="text-ink-300 hover:text-rose-500">
                      <X className="size-3.5" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.key} className="border-t border-ink-100">
                <td className="text-[12.5px] text-ink-500 py-2.5 pr-4">{t(row.labelKey)}</td>
                {markets.map((m) => (
                  <td key={m.id} className="text-[13.5px] font-semibold text-ink-900 py-2.5 pr-4">
                    {row.get(m)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  )
}
