import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import ChartCard, { LegendDot } from './ChartCard.jsx'
import ChartTooltip from './ChartTooltip.jsx'
import { SEASONAL_TRENDS } from '../../../data/charts.js'
import { CHART_COLORS, CHART_GRID, CHART_AXIS } from '../../../utils/chartColors.js'
import { useLocale } from '../../../i18n/LocaleContext.jsx'

export default function SeasonalTrendsChart() {
  const { t } = useLocale()
  return (
    <ChartCard
      title={t('chart.seasonalTrends.title')}
      subtitle={t('chart.seasonalTrends.subtitle')}
      legend={
        <>
          <LegendDot color={CHART_COLORS.primary} label={t('chart.seasonalTrends.retail')} />
          <LegendDot color={CHART_COLORS.secondary} label={t('chart.seasonalTrends.tourism')} />
          <LegendDot color={CHART_COLORS.amber} label={t('chart.seasonalTrends.agriculture')} />
        </>
      }
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={SEASONAL_TRENDS} margin={{ top: 4, right: 4, left: -18, bottom: 0 }} barGap={4} barCategoryGap={24}>
          <CartesianGrid vertical={false} stroke={CHART_GRID} strokeDasharray="3 3" />
          <XAxis dataKey="quarter" tick={{ fontSize: 11, fill: CHART_AXIS }} axisLine={{ stroke: CHART_GRID }} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: CHART_AXIS }} axisLine={false} tickLine={false} width={28} />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(0,91,172,0.05)' }} />
          <Bar dataKey="retail" name={t('chart.seasonalTrends.retail')} fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} maxBarSize={18} />
          <Bar dataKey="tourism" name={t('chart.seasonalTrends.tourism')} fill={CHART_COLORS.secondary} radius={[4, 4, 0, 0]} maxBarSize={18} />
          <Bar dataKey="agriculture" name={t('chart.seasonalTrends.agriculture')} fill={CHART_COLORS.amber} radius={[4, 4, 0, 0]} maxBarSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
