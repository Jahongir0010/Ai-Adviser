import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'

const STEPS = [
  'Analyzing your responses…',
  'Cross-referencing regional market data…',
  'Scoring opportunities against risk tolerance…',
  'Ranking personalized business ideas…',
]

export default function GeneratingState() {
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, STEPS.length - 1))
    }, 850)
    return () => clearInterval(id)
  }, [])

  return (
    <GlassCard className="p-10 max-w-lg mx-auto w-full flex flex-col items-center text-center">
      <div className="relative mb-5">
        <div className="size-16 rounded-2xl btn-gradient-brand flex items-center justify-center shadow-glow-primary animate-pulse-ring">
          <Sparkles className="size-7 text-white" strokeWidth={2} />
        </div>
      </div>
      <h3 className="font-display font-bold text-[18px] text-ink-900">Generating your business ideas</h3>
      <p className="text-[13.5px] text-ink-500 mt-2 min-h-[20px]">{STEPS[stepIndex]}</p>
      <div className="w-full h-1.5 rounded-full bg-ink-100 overflow-hidden mt-5">
        <div
          className="h-full rounded-full btn-gradient-brand transition-all duration-700 ease-out"
          style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
        />
      </div>
    </GlassCard>
  )
}
