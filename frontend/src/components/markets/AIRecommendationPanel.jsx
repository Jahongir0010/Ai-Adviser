import { Sparkles, Lightbulb, FileText, Scale } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'
import Button from '../ui/Button.jsx'
import { useLocale, tr } from '../../i18n/LocaleContext.jsx'

export default function AIRecommendationPanel({ market, onGenerateIdea, onViewReport, onCompare }) {
  const { locale, t } = useLocale()

  return (
    <GlassCard className="p-5 flex items-start gap-3.5">
      <span className="size-9 rounded-[10px] bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
        <Sparkles className="size-4" strokeWidth={2} />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-ink-800">{t('markets.ai.panelTitle')}</p>
        <p className="text-[13px] text-ink-500 leading-snug mt-1">{tr(market.aiRecommendation, locale)}</p>

        <div className="flex flex-wrap items-center gap-2 mt-3.5">
          <Button size="sm" onClick={() => onGenerateIdea(market)}>
            <Lightbulb className="size-3.5" strokeWidth={2} /> {t('markets.ai.generateIdea')}
          </Button>
          <Button variant="secondary" size="sm" onClick={() => onViewReport(market)}>
            <FileText className="size-3.5" strokeWidth={2} /> {t('markets.ai.viewReport')}
          </Button>
          <Button variant="outline" size="sm" onClick={() => onCompare(market)}>
            <Scale className="size-3.5" strokeWidth={2} /> {t('markets.ai.compare')}
          </Button>
        </div>
      </div>
    </GlassCard>
  )
}
