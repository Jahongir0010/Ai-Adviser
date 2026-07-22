import { useState } from 'react'
import { MapPin, Sparkles } from 'lucide-react'
import GlassCard from '../components/ui/GlassCard.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import UzbekistanMap from '../components/dashboard/UzbekistanMap.jsx'
import RegionDetailsPanel from '../components/dashboard/RegionDetailsPanel.jsx'
import InsightCard from '../components/dashboard/InsightCard.jsx'
import AnalyticsSection from '../components/dashboard/AnalyticsSection.jsx'
import SummaryCards from '../components/dashboard/SummaryCards.jsx'
import { AI_INSIGHTS } from '../data/insights.js'
import { DEFAULT_REGION_ID } from '../data/regions.js'

export default function Dashboard() {
  const [selectedRegion, setSelectedRegion] = useState(DEFAULT_REGION_ID)

  return (
    <div className="flex flex-col gap-7 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div>
          <p className="text-[12px] font-semibold tracking-wider uppercase text-primary-600 mb-1.5">Regional Intelligence</p>
          <h1 className="font-display font-bold text-[26px] md:text-[30px] text-ink-900 tracking-tight">
            Uzbekistan Business Intelligence
          </h1>
          <p className="text-[14px] text-ink-500 mt-1.5 max-w-xl">
            Select any region to explore AI-generated market, competition, and investment intelligence.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <GlassCard className="xl:col-span-2 p-5 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[15px] text-ink-900 flex items-center gap-2">
              <MapPin className="size-[18px] text-primary-600" strokeWidth={2} />
              Interactive Regional Map
            </h3>
            <span className="text-[12px] text-ink-400">14 regions · click to explore</span>
          </div>
          <UzbekistanMap selectedId={selectedRegion} onSelect={setSelectedRegion} />
        </GlassCard>

        <div className="xl:col-span-1">
          <RegionDetailsPanel regionId={selectedRegion} />
        </div>
      </div>

      <section>
        <SectionHeading
          eyebrow="AI Engine"
          title="AI Insight Modules"
          description="Five specialised models continuously monitor the national market on your behalf."
          action={
            <span className="hidden sm:flex items-center gap-1.5 text-[12.5px] font-medium text-secondary-700 bg-secondary-50 rounded-full px-3 py-1.5">
              <Sparkles className="size-3.5" /> Updated 12 min ago
            </span>
          }
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
          {AI_INSIGHTS.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </section>

      <AnalyticsSection />

      <SummaryCards />
    </div>
  )
}
