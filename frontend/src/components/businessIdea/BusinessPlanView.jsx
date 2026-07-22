import {
  ArrowLeft,
  Download,
  FileText,
  TrendingUp,
  Crosshair,
  Grid2x2,
  Megaphone,
  Calculator,
  ShieldAlert,
  Map,
  Wallet,
  LineChart,
} from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'
import Button from '../ui/Button.jsx'

const ICONS = {
  'executive-summary': FileText,
  'market-analysis': TrendingUp,
  'competitor-analysis': Crosshair,
  swot: Grid2x2,
  'marketing-strategy': Megaphone,
  'financial-forecast': Calculator,
  'risk-assessment': ShieldAlert,
  'implementation-roadmap': Map,
  'investment-plan': Wallet,
  'revenue-projection': LineChart,
}

export default function BusinessPlanView({ plan, idea, onBack }) {
  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-5 print:hidden">
        <button onClick={onBack} className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-ink-600 hover:text-primary-600">
          <ArrowLeft className="size-4" /> Back to ideas
        </button>
        <Button variant="secondary" size="sm" onClick={() => window.print()}>
          <Download className="size-4" strokeWidth={2} /> Export PDF
        </Button>
      </div>

      <GlassCard solid className="p-6 md:p-10">
        <div className="mb-8 pb-6 border-b border-ink-100">
          <p className="text-[12px] font-semibold tracking-wider uppercase text-primary-600 mb-2">AI-Generated Business Plan</p>
          <h1 className="font-display font-bold text-[26px] md:text-[30px] text-ink-900 tracking-tight">{plan.title}</h1>
          {idea && (
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 mt-3 text-[13px] text-ink-500">
              <span>Investment: <strong className="text-ink-800">{idea.investment}</strong></span>
              <span>ROI: <strong className="text-ink-800">{idea.roi}</strong></span>
              <span>Payback: <strong className="text-ink-800">{idea.payback}</strong></span>
              <span>AI Match: <strong className="text-ink-800">{idea.matchScore}/100</strong></span>
            </div>
          )}
        </div>

        <div className="space-y-8">
          {plan.sections.map((section, i) => {
            const Icon = ICONS[section.id] ?? FileText
            return (
              <section key={section.id} className="break-inside-avoid">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="size-8 rounded-[10px] bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                    <Icon className="size-[16px]" strokeWidth={2} />
                  </span>
                  <h2 className="font-display font-bold text-[16.5px] text-ink-900">
                    {String(i + 1).padStart(2, '0')}. {section.title}
                  </h2>
                </div>
                <p className="text-[14px] text-ink-600 leading-relaxed pl-[42px]">{section.body}</p>
              </section>
            )
          })}
        </div>
      </GlassCard>
    </div>
  )
}
