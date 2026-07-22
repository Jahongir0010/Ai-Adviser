import {
  Users,
  Wallet,
  TrendingUp,
  Swords,
  Building2,
  Rocket,
  Landmark,
  Gauge,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'
import MetricTile from '../ui/MetricTile.jsx'
import ScoreRing from '../ui/ScoreRing.jsx'
import Button from '../ui/Button.jsx'
import { REGIONS } from '../../data/regions.js'
import { useLocale } from '../../i18n/LocaleContext.jsx'
import { LEVELS, INDUSTRIES, GOV_PROGRAMS, trMap, trRegionName } from '../../i18n/dictionaries.js'

const RISK_STYLES = {
  Low: 'text-secondary-700 bg-secondary-50',
  Medium: 'text-amber-700 bg-amber-50',
  High: 'text-rose-700 bg-rose-50',
}

export default function RegionDetailsPanel({ regionId }) {
  const { locale, t } = useLocale()
  const region = REGIONS[regionId]
  if (!region) return null
  const regionName = trRegionName(regionId, locale)

  return (
    <GlassCard className="p-5 md:p-6 h-full flex flex-col animate-fade-up" key={regionId}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[12px] font-semibold tracking-wider uppercase text-primary-600">{t('region.selected')}</p>
          <h3 className="font-display font-bold text-[22px] text-ink-900 mt-0.5">{regionName}</h3>
        </div>
        <ScoreRing value={region.aiOpportunityScore} label={t('region.aiScore')} color="#005BAC" size={64} />
      </div>

      <div className="grid grid-cols-2 gap-2.5 mt-5">
        <MetricTile icon={Users} label={t('region.population')} value={region.population} tone="primary" />
        <MetricTile icon={Wallet} label={t('region.purchasingPower')} value={`${region.purchasingPower}/100`} tone="secondary" />
        <MetricTile icon={TrendingUp} label={t('region.businessDemand')} value={`${region.businessDemand}/100`} tone="primary" />
        <MetricTile
          icon={Swords}
          label={t('region.competitionLevel')}
          value={trMap(LEVELS, region.competitionLevel, locale)}
          tone="secondary"
        />
        <MetricTile
          icon={Building2}
          label={t('region.existingBusinesses')}
          value={region.existingBusinesses.toLocaleString()}
          tone="primary"
        />
        <MetricTile icon={Rocket} label={t('region.growthPotential')} value={`${region.growthPotential}/100`} tone="secondary" />
        <MetricTile
          icon={Gauge}
          label={t('region.investmentAttractiveness')}
          value={`${region.investmentAttractiveness}/100`}
          tone="primary"
        />
        <div className="flex items-start gap-3 rounded-[14px] border border-ink-100 bg-white/70 p-3.5">
          <div className={`size-9 rounded-[10px] flex items-center justify-center shrink-0 ${RISK_STYLES[region.riskLevel]}`}>
            <ShieldCheck className="size-[17px]" strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <p className="text-[12px] text-ink-500 leading-tight">{t('region.riskLevel')}</p>
            <p className="text-[15px] font-bold text-ink-900 leading-tight mt-0.5">{trMap(LEVELS, region.riskLevel, locale)}</p>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-[12px] font-semibold text-ink-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Sparkles className="size-3.5 text-primary-500" /> {t('region.recommendedIndustries')}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {region.recommendedIndustries.map((ind) => (
            <span key={ind} className="text-[12.5px] font-medium px-2.5 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-100">
              {trMap(INDUSTRIES, ind, locale)}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-[12px] font-semibold text-ink-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Landmark className="size-3.5 text-secondary-600" /> {t('region.governmentPrograms')}
        </p>
        <ul className="space-y-1.5">
          {region.governmentPrograms.map((prog) => (
            <li key={prog} className="text-[13px] text-ink-600 flex items-start gap-2">
              <span className="mt-1.5 size-1 rounded-full bg-secondary-500 shrink-0" />
              {trMap(GOV_PROGRAMS, prog, locale)}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-5">
        <Button variant="primary" size="md" className="w-full">
          {t('region.generatePlanFor').replace('{region}', regionName)}
        </Button>
      </div>
    </GlassCard>
  )
}
