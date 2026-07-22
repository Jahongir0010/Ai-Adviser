import { useState } from 'react'
import { Sparkles, Bot, User, Check, ArrowRight } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'
import Button from '../ui/Button.jsx'
import WizardProgress from './WizardProgress.jsx'
import { WIZARD_QUESTIONS } from '../../data/wizard.js'

function ChatBubble({ from, text, subtext }) {
  if (!text) return null
  const isAi = from === 'ai'
  return (
    <div className={`flex items-start gap-2.5 ${isAi ? '' : 'flex-row-reverse'}`}>
      <div
        className={`size-7 rounded-full flex items-center justify-center shrink-0 ${
          isAi ? 'bg-primary-50 text-primary-600' : 'bg-secondary-50 text-secondary-700'
        }`}
      >
        {isAi ? <Bot className="size-3.5" strokeWidth={2} /> : <User className="size-3.5" strokeWidth={2} />}
      </div>
      <div
        className={`rounded-[14px] px-3.5 py-2.5 max-w-[80%] text-[13.5px] leading-snug ${
          isAi ? 'bg-ink-50 text-ink-800 rounded-tl-sm' : 'bg-primary-600 text-white rounded-tr-sm'
        }`}
      >
        {text}
        {subtext && <p className="text-[12px] text-ink-400 mt-1">{subtext}</p>}
      </div>
    </div>
  )
}

export default function WizardChat({ onComplete }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [multiSelection, setMultiSelection] = useState([])

  const question = WIZARD_QUESTIONS[stepIndex]
  const history = WIZARD_QUESTIONS.slice(0, stepIndex)

  function advance(value) {
    const updated = { ...answers, [question.id]: value }
    setAnswers(updated)
    setMultiSelection([])
    if (stepIndex + 1 >= WIZARD_QUESTIONS.length) {
      onComplete(updated)
    } else {
      setStepIndex(stepIndex + 1)
    }
  }

  function toggleMulti(opt) {
    setMultiSelection((prev) => (prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]))
  }

  return (
    <GlassCard className="p-5 md:p-7 max-w-2xl mx-auto w-full">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="size-9 rounded-[12px] btn-gradient-brand flex items-center justify-center shrink-0">
          <Sparkles className="size-[18px] text-white" strokeWidth={2.25} />
        </div>
        <div>
          <p className="font-semibold text-[14px] text-ink-900">AI Business Advisor</p>
          <p className="text-[12px] text-ink-400">Guided discovery · step {stepIndex + 1} of {WIZARD_QUESTIONS.length}</p>
        </div>
      </div>

      <WizardProgress step={stepIndex + 1} total={WIZARD_QUESTIONS.length} />

      <div className="mt-6 space-y-4 max-h-[380px] overflow-y-auto pr-1">
        {history.map((q) => (
          <div key={q.id} className="space-y-2">
            <ChatBubble from="ai" text={q.question} />
            <ChatBubble from="user" text={Array.isArray(answers[q.id]) ? answers[q.id].join(', ') : answers[q.id]} />
          </div>
        ))}

        <div key={question.id} className="animate-fade-up">
          <ChatBubble from="ai" text={question.question} subtext={question.subtext} />
          <div className="mt-3 ml-11 flex flex-wrap gap-2">
            {question.options.map((opt) => {
              const isMulti = question.type === 'multi'
              const isSelected = isMulti && multiSelection.includes(opt)
              return (
                <button
                  key={opt}
                  onClick={() => (isMulti ? toggleMulti(opt) : advance(opt))}
                  className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13.5px] font-medium transition-all ${
                    isSelected
                      ? 'bg-primary-600 border-primary-600 text-white'
                      : 'border-ink-200 text-ink-700 hover:border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  {isSelected && <Check className="size-3.5" strokeWidth={2.5} />}
                  {opt}
                </button>
              )
            })}
          </div>
          {question.type === 'multi' && (
            <div className="ml-11 mt-3">
              <Button size="sm" disabled={multiSelection.length === 0} onClick={() => advance(multiSelection)}>
                Continue <ArrowRight className="size-4" strokeWidth={2.25} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  )
}
