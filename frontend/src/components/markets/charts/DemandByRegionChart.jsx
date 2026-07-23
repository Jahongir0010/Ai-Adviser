import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import ChartCard from '../../dashboard/charts/ChartCard.jsx'
import ChartTooltip from '../../dashboard/charts/ChartTooltip.jsx'
import { getDemandByRegion, getRegionName } from '../../../data/markets.js'
import { CHART_COLORS, CHART_GRID, CHART_AXIS } from '../../../utils/chartColors.js'
import { useLocale } from '../../../i18n/LocaleContext.jsx'

export default function DemandByRegionChart() {
  const { locale, t } = useLocale()
  const data = getDemandByRegion().map((r) => ({ ...r, name: getRegionName(r.regionId, locale) }))

  return (
    <ChartCard title={t('markets.charts.demandByRegion')}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke={CHART_GRID} strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10.5, fill: CHART_AXIS }}
            axisLine={{ stroke: CHART_GRID }}
            tickLine={false}
            interval={0}
            angle={-35}
            textAnchor="end"
            height={56}
          />
          <YAxis tick={{ fontSize: 11, fill: CHART_AXIS }} axisLine={false} tickLine={false} width={28} domain={[0, 100]} />
          <Tooltip content={<ChartTooltip />} />
          <Bar dataKey="demand" name={t('markets.analysis.demand')} radius={[4, 4, 0, 0]} maxBarSize={28}>
            {data.map((entry) => (
              <Cell key={entry.regionId} fill={CHART_COLORS.primary} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
