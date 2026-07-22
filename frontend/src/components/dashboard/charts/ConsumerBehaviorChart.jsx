import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, ResponsiveContainer } from 'recharts'
import ChartCard from './ChartCard.jsx'
import ChartTooltip from './ChartTooltip.jsx'
import { CONSUMER_BEHAVIOR } from '../../../data/charts.js'
import { CHART_COLORS, CHART_GRID } from '../../../utils/chartColors.js'
import { useLocale } from '../../../i18n/LocaleContext.jsx'
import { TRAITS, trMap } from '../../../i18n/dictionaries.js'

export default function ConsumerBehaviorChart() {
  const { locale, t } = useLocale()
  return (
    <ChartCard title={t('chart.consumerBehavior.title')} subtitle={t('chart.consumerBehavior.subtitle')}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={CONSUMER_BEHAVIOR} outerRadius="62%" margin={{ top: 12, right: 28, bottom: 12, left: 28 }}>
          <PolarGrid stroke={CHART_GRID} />
          <PolarAngleAxis dataKey="trait" tickFormatter={(v) => trMap(TRAITS, v, locale)} tick={{ fontSize: 10, fill: '#545F72' }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 9, fill: '#9AA6B7' }} axisLine={false} />
          <Tooltip content={<ChartTooltip />} labelFormatter={(v) => trMap(TRAITS, v, locale)} />
          <Radar
            name={t('chart.consumerBehavior.score')}
            dataKey="score"
            stroke={CHART_COLORS.primary}
            fill={CHART_COLORS.primary}
            fillOpacity={0.22}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
