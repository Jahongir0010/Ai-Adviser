import { Bookmark, BadgeCheck, Scale, FileText, ArrowRight } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'
import Button from '../ui/Button.jsx'
import ScoreRing from '../ui/ScoreRing.jsx'
import { useLocale, tr } from '../../i18n/LocaleContext.jsx'
import { LEVELS, trMap } from '../../i18n/dictionaries.js'

const RISK_COLOR = (score) => (score <= 33 ? 'text-secondary-700 bg-secondary-50' : score <= 60 ? 'text-amber-700 bg-amber-50' : 'text-rose-700 bg-rose-50')

function Stat({ label, value }) {
  return (
    <div>
      <p className="text-[11px] text-ink-400">{label}</p>
      <p className="text-[14px] font-bold text-ink-900 mt-0.5">{value}</p>
    </div>
  )
}

export default function IdeaCard({ idea, isSaved, isCompareSelected, onToggleSave, onToggleCompare, onGeneratePlan }) {
  const { locale, t } = useLocale()

  return (
    <GlassCard className="p-5 flex flex-col hover:shadow-soft-lg transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display font-bold text-[17px] text-ink-900 leading-snug">{tr(idea.name, locale)}</h3>
          <div className="flex items-center gap-2 mt-1.5">
            {idea.govSupportEligible && (
              <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-secondary-700 bg-secondary-50 rounded-full px-2 py-0.5">
                <BadgeCheck className="size-3.5" strokeWidth={2} /> {t('idea.govSupportEligible')}
              </span>
            )}
          </div>
        </div>
        <ScoreRing value={idea.matchScore} label={t('idea.match')} size={58} color="#00A86B" />
      </div>

      <p className="text-[13px] text-ink-500 leading-snug mt-3">{tr(idea.summary, locale)}</p>

      <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-4 pt-4 border-t border-ink-100">
        <Stat label={t('idea.investmentRequired')} value={idea.investment} />
        <Stat label={t('idea.monthlyProfit')} value={idea.monthlyProfit} />
        <Stat label={t('idea.roi')} value={idea.roi} />
        <Stat label={t('idea.payback')} value={tr(idea.payback, locale)} />
        <Stat label={t('idea.marketDemand')} value={`${idea.marketDemand}/100`} />
        <Stat label={t('idea.growthPotential')} value={`${idea.growthPotential}/100`} />
        <Stat label={t('idea.competitionLevel')} value={trMap(LEVELS, idea.competitionLevel, locale)} />
        <div>
          <p className="text-[11px] text-ink-400">{t('idea.riskScore')}</p>
          <span className={`inline-block mt-0.5 text-[12.5px] font-bold px-2 py-0.5 rounded-full ${RISK_COLOR(idea.riskScore)}`}>
            {idea.riskScore}/100
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-5">
        <Button variant="primary" size="sm" className="flex-1" onClick={() => onGeneratePlan(idea.id)}>
          <FileText className="size-4" strokeWidth={2} /> {t('idea.generateFullPlan')}
        </Button>
        <button
          onClick={() => onToggleCompare(idea.id)}
          title={t('idea.addToComparison')}
          className={`size-9 rounded-[10px] flex items-center justify-center border transition-colors ${
            isCompareSelected ? 'bg-primary-50 border-primary-300 text-primary-600' : 'border-ink-200 text-ink-400 hover:text-primary-600 hover:border-primary-200'
          }`}
        >
          <Scale className="size-4" strokeWidth={2} />
        </button>
        <button
          onClick={() => onToggleSave(idea.id)}
          title={t('idea.saveIdea')}
          className={`size-9 rounded-[10px] flex items-center justify-center border transition-colors ${
            isSaved ? 'bg-secondary-50 border-secondary-300 text-secondary-600' : 'border-ink-200 text-ink-400 hover:text-secondary-600 hover:border-secondary-200'
          }`}
        >
          <Bookmark className="size-4" strokeWidth={2} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>
    </GlassCard>
  )
}
