import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, ResponsiveContainer } from 'recharts'
import ChartCard from './ChartCard.jsx'
import ChartTooltip from './ChartTooltip.jsx'
import { CONSUMER_BEHAVIOR } from '../../../data/charts.js'
import { CHART_COLORS, CHART_GRID } from '../../../utils/chartColors.js'

export default function ConsumerBehaviorChart() {
  return (
    <ChartCard title="Consumer Behavior" subtitle="National index across key traits (0–100)">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={CONSUMER_BEHAVIOR} outerRadius="72%">
          <PolarGrid stroke={CHART_GRID} />
          <PolarAngleAxis dataKey="trait" tick={{ fontSize: 10.5, fill: '#545F72' }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 9, fill: '#9AA6B7' }} axisLine={false} />
          <Tooltip content={<ChartTooltip />} />
          <Radar
            name="Score"
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
