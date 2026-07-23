import { useMemo, useState } from 'react'
import {
  ChevronRight,
  Users,
  Building2,
  Landmark,
  Route,
  Droplets,
  Zap,
  HeartPulse,
  School,
  Trophy,
  Baby,
  Wheat,
  Wallet,
  AlertCircle,
  Sparkles,
  Search,
  ArrowLeft,
  MapPinOff,
} from 'lucide-react'
import GlassCard from '../../../components/ui/GlassCard.jsx'
import MetricTile from '../../../components/ui/MetricTile.jsx'
import { useLocale } from '../../../i18n/LocaleContext.jsx'
import { LEVELS } from '../hooks/useMapDrilldown.js'
import { useMahallaBoundary } from '../hooks/useMahallaBoundary.js'
import { useMahallaDetail } from '../hooks/useMahallaDetail.js'

function ListRow({ title, subtitle, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between gap-2 rounded-[12px] px-3 py-2.5 text-left hover:bg-primary-50 transition-colors group"
    >
      <span className="min-w-0">
        <span className="block text-[13.5px] font-medium text-ink-800 truncate">{title}</span>
        {subtitle && <span className="block text-[11.5px] text-ink-400 mt-0.5">{subtitle}</span>}
      </span>
      <ChevronRight className="size-4 text-ink-300 shrink-0 group-hover:text-primary-600 transition-colors" />
    </button>
  )
}

function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center px-4 py-10 text-ink-400">
      <Icon className="size-8 mb-3 text-ink-300" strokeWidth={1.5} />
      <p className="text-[13.5px] font-medium text-ink-600">{title}</p>
      {description && <p className="text-[12px] mt-1 max-w-[220px]">{description}</p>}
    </div>
  )
}

function MahallaDetailView({ mahalla, onBack }) {
  const { t } = useLocale()
  const { boundary, checked } = useMahallaBoundary(mahalla.id)

  const specializations = mahalla.specializations ?? []

  return (
    <div className="animate-fade-up">
      <button onClick={onBack} className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-ink-500 hover:text-primary-600 mb-3">
        <ArrowLeft className="size-3.5" /> {t('map.backToList')}
      </button>

      <h3 className="font-display font-bold text-[18px] text-ink-900 leading-snug">{mahalla.name}</h3>
      <div className="flex flex-wrap items-center gap-1.5 mt-2">
        {mahalla.status && (
          <span className="text-[11.5px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">{mahalla.status}</span>
        )}
        {mahalla.category && (
          <span className="text-[11.5px] font-semibold px-2 py-0.5 rounded-full bg-ink-100 text-ink-600">{mahalla.category}</span>
        )}
      </div>

      {checked && !boundary && (
        <div className="flex items-start gap-2 mt-3 rounded-[12px] bg-ink-50 border border-ink-100 px-3 py-2.5 text-[12px] text-ink-500">
          <MapPinOff className="size-4 shrink-0 mt-0.5" strokeWidth={2} />
          {t('map.boundaryPending')}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 mt-4">
        <MetricTile icon={Users} label={t('map.stat.population')} value={mahalla.population?.toLocaleString() ?? '—'} tone="primary" />
        <MetricTile icon={Building2} label={t('map.stat.activeBusinesses')} value={mahalla.activeBusinessCount?.toLocaleString() ?? '—'} tone="secondary" />
        <MetricTile icon={AlertCircle} label={t('map.stat.unemployed')} value={mahalla.unemployedCount?.toLocaleString() ?? '—'} tone="primary" />
        <MetricTile icon={Wallet} label={t('map.stat.problemLoans')} value={mahalla.problemLoansCount?.toLocaleString() ?? '—'} tone="secondary" />
        <MetricTile icon={HeartPulse} label={t('map.stat.poorFamilies')} value={mahalla.poorFamiliesCount?.toLocaleString() ?? '—'} tone="primary" />
        <MetricTile icon={Route} label={t('map.stat.internalRoads')} value={mahalla.internalRoadsKm != null ? `${mahalla.internalRoadsKm} km` : '—'} tone="secondary" />
        <MetricTile icon={Droplets} label={t('map.stat.noWater')} value={mahalla.householdsWithoutWaterCount?.toLocaleString() ?? '—'} tone="primary" />
        <MetricTile icon={Zap} label={t('map.stat.powerOutages')} value={mahalla.powerOutagesCount?.toLocaleString() ?? '—'} tone="secondary" />
        <MetricTile icon={School} label={t('map.stat.schools')} value={mahalla.schoolsCount?.toLocaleString() ?? '—'} tone="primary" />
        <MetricTile icon={Baby} label={t('map.stat.kindergartens')} value={mahalla.kindergartensCount?.toLocaleString() ?? '—'} tone="secondary" />
        <MetricTile icon={Trophy} label={t('map.stat.sportsGrounds')} value={mahalla.sportsGroundsCount?.toLocaleString() ?? '—'} tone="primary" />
        <MetricTile icon={Wheat} label={t('map.stat.farmland')} value={mahalla.farmlandAreaHectare != null ? `${mahalla.farmlandAreaHectare} ha` : '—'} tone="secondary" />
      </div>

      <div className="grid grid-cols-1 gap-2 mt-2">
        <MetricTile
          icon={Landmark}
          label={t('map.stat.totalCredit')}
          value={mahalla.totalCreditAllocated != null ? mahalla.totalCreditAllocated.toLocaleString() : '—'}
          tone="primary"
        />
      </div>

      {specializations.length > 0 && (
        <div className="mt-4">
          <p className="text-[12px] font-semibold text-ink-500 uppercase tracking-wider mb-2">{t('map.stat.specializations')}</p>
          <ul className="space-y-1.5">
            {specializations.map((s) => (
              <li key={`${s.rank}-${s.type}`} className="flex items-center justify-between gap-2 text-[12.5px] text-ink-600 rounded-[10px] bg-white/60 border border-ink-100 px-2.5 py-1.5">
                <span className="truncate">
                  <span className="font-semibold text-ink-800">{s.type}</span>
                  {s.direction && <span className="text-ink-400"> · {s.direction}</span>}
                </span>
                <span className="font-semibold text-secondary-700 shrink-0">{s.percentage}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <GlassCard className="mt-4 p-3.5 flex items-start gap-2.5">
        <span className="size-8 rounded-[10px] bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
          <Sparkles className="size-4" strokeWidth={2} />
        </span>
        <div>
          <p className="text-[13px] font-semibold text-ink-800">{t('map.aiRecommendations.title')}</p>
          <p className="text-[12px] text-ink-400 mt-0.5">{t('map.aiRecommendations.comingSoon')}</p>
        </div>
      </GlassCard>
    </div>
  )
}

export default function InfoPanel({
  level,
  region,
  district,
  districts,
  mahallaId,
  mahallaListQuery,
  onSelectDistrict,
  onSelectMahalla,
  onBackToDistrict,
}) {
  const { t } = useLocale()
  const [search, setSearch] = useState('')

  const mahallaFromList = useMemo(
    () => mahallaListQuery.data?.find((m) => String(m.id) === String(mahallaId)) ?? null,
    [mahallaListQuery.data, mahallaId]
  )
  const fallbackDetail = useMahallaDetail(mahallaFromList ? null : mahallaId)
  const mahalla = mahallaFromList ?? fallbackDetail.data

  const filteredMahallas = useMemo(() => {
    const list = mahallaListQuery.data ?? []
    if (!search.trim()) return list
    const term = search.trim().toLowerCase()
    return list.filter((m) => m.name.toLowerCase().includes(term))
  }, [mahallaListQuery.data, search])

  return (
    <GlassCard
      variant="frosted"
      className="absolute top-3 right-3 bottom-3 z-10 w-[320px] max-w-[calc(100%-24px)] p-4 overflow-y-auto"
    >
      {level === LEVELS.COUNTRY && (
        <EmptyState icon={Sparkles} title={t('map.emptyState.country.title')} description={t('map.emptyState.country.description')} />
      )}

      {level === LEVELS.REGION && (
        <div className="animate-fade-up">
          <p className="text-[12px] font-semibold tracking-wider uppercase text-primary-600">{t('map.districtsIn')}</p>
          <h3 className="font-display font-bold text-[17px] text-ink-900 mt-0.5 mb-3">{region?.name}</h3>
          {districts.length === 0 ? (
            <EmptyState icon={Building2} title={t('map.emptyState.noDistricts')} />
          ) : (
            <div className="divide-y divide-ink-100">
              {districts.map((d) => (
                <ListRow key={d.id} title={d.name} onClick={() => onSelectDistrict(d)} />
              ))}
            </div>
          )}
        </div>
      )}

      {level === LEVELS.DISTRICT && (
        <div className="animate-fade-up">
          <p className="text-[12px] font-semibold tracking-wider uppercase text-secondary-600">{t('map.mahallasIn')}</p>
          <h3 className="font-display font-bold text-[17px] text-ink-900 mt-0.5 mb-3">{district?.name}</h3>

          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-[15px] text-ink-400" strokeWidth={2} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('map.searchMahalla')}
              className="w-full h-9 rounded-[10px] bg-ink-50 border border-transparent pl-9 pr-3 text-[13px] text-ink-800 placeholder:text-ink-400 outline-none focus:bg-white focus:border-primary-200 focus:ring-4 focus:ring-primary-50 transition-all"
            />
          </div>

          {mahallaListQuery.loading && <EmptyState icon={Sparkles} title={t('map.loading')} />}
          {!mahallaListQuery.loading && filteredMahallas.length === 0 && (
            <EmptyState icon={Building2} title={t('map.emptyState.noMahallas')} />
          )}
          {!mahallaListQuery.loading && filteredMahallas.length > 0 && (
            <div className="divide-y divide-ink-100 max-h-[calc(100vh-380px)] overflow-y-auto">
              {filteredMahallas.map((m) => (
                <ListRow
                  key={m.id}
                  title={m.name}
                  subtitle={m.population != null ? `${t('map.stat.population')}: ${m.population.toLocaleString()}` : undefined}
                  onClick={() => onSelectMahalla(m.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {level === LEVELS.MAHALLA &&
        (mahalla ? (
          <MahallaDetailView mahalla={mahalla} onBack={onBackToDistrict} />
        ) : (
          <EmptyState icon={Sparkles} title={t('map.loading')} />
        ))}
    </GlassCard>
  )
}
