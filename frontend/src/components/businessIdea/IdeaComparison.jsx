import { X } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'

const ROWS = [
  { key: 'matchScore', label: 'AI Match Score', suffix: '' },
  { key: 'investment', label: 'Investment Required' },
  { key: 'monthlyProfit', label: 'Expected Monthly Profit' },
  { key: 'roi', label: 'ROI' },
  { key: 'payback', label: 'Payback Period' },
  { key: 'marketDemand', label: 'Market Demand', suffix: '/100' },
  { key: 'competitionLevel', label: 'Competition Level' },
  { key: 'riskScore', label: 'Risk Score', suffix: '/100' },
  { key: 'growthPotential', label: 'Growth Potential', suffix: '/100' },
]

export default function IdeaComparison({ ideas, onClose, onRemove }) {
  if (ideas.length === 0) return null

  return (
    <GlassCard className="p-5 md:p-6 animate-fade-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-[16px] text-ink-900">Compare Ideas ({ideas.length})</h3>
        <button onClick={onClose} className="size-8 rounded-full flex items-center justify-center text-ink-400 hover:bg-ink-100">
          <X className="size-4" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[560px]">
          <thead>
            <tr>
              <th className="text-[12px] font-semibold text-ink-400 uppercase tracking-wider pb-3 pr-4 w-44">Metric</th>
              {ideas.map((idea) => (
                <th key={idea.id} className="text-[13.5px] font-bold text-ink-900 pb-3 pr-4 min-w-[160px]">
                  <div className="flex items-center justify-between gap-2">
                    {idea.name}
                    <button onClick={() => onRemove(idea.id)} className="text-ink-300 hover:text-rose-500">
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
                <td className="text-[12.5px] text-ink-500 py-2.5 pr-4">{row.label}</td>
                {ideas.map((idea) => (
                  <td key={idea.id} className="text-[13.5px] font-semibold text-ink-900 py-2.5 pr-4">
                    {idea[row.key]}
                    {row.suffix ?? ''}
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
