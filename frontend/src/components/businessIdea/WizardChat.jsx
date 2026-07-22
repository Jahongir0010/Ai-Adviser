import { useState } from 'react'
import { Sparkles, Bot, User, Check, ArrowRight } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'
import Button from '../ui/Button.jsx'
import WizardProgress from './WizardProgress.jsx'
import { WIZARD_QUESTIONS } from '../../data/wizard.js'
import { useLocale, tr } from '../../i18n/LocaleContext.jsx'

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
  const { locale, t } = useLocale()
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

  function answerText(q) {
    const value = answers[q.id]
    if (value == null) return null
    return Array.isArray(value) ? value.map((o) => tr(o, locale)).join(', ') : tr(value, locale)
  }

  return (
    <GlassCard className="p-5 md:p-7 max-w-2xl mx-auto w-full">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="size-9 rounded-[12px] btn-gradient-brand flex items-center justify-center shrink-0">
          <Sparkles className="size-[18px] text-white" strokeWidth={2.25} />
        </div>
        <div>
          <p className="font-semibold text-[14px] text-ink-900">{t('wizard.advisorName')}</p>
          <p className="text-[12px] text-ink-400">
            {t('wizard.stepOf').replace('{current}', stepIndex + 1).replace('{total}', WIZARD_QUESTIONS.length)}
          </p>
        </div>
      </div>

      <WizardProgress step={stepIndex + 1} total={WIZARD_QUESTIONS.length} />

      <div className="mt-6 space-y-4 max-h-[380px] overflow-y-auto pr-1">
        {history.map((q) => (
          <div key={q.id} className="space-y-2">
            <ChatBubble from="ai" text={tr(q.question, locale)} />
            <ChatBubble from="user" text={answerText(q)} />
          </div>
        ))}

        <div key={question.id} className="animate-fade-up">
          <ChatBubble from="ai" text={tr(question.question, locale)} subtext={tr(question.subtext, locale)} />
          <div className="mt-3 ml-11 flex flex-wrap gap-2">
            {question.options.map((opt) => {
              const isMulti = question.type === 'multi'
              const isSelected = isMulti && multiSelection.includes(opt)
              return (
                <button
                  key={opt.en}
                  onClick={() => (isMulti ? toggleMulti(opt) : advance(opt))}
                  className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13.5px] font-medium transition-all ${
                    isSelected
                      ? 'bg-primary-600 border-primary-600 text-white'
                      : 'border-ink-200 text-ink-700 hover:border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  {isSelected && <Check className="size-3.5" strokeWidth={2.5} />}
                  {tr(opt, locale)}
                </button>
              )
            })}
          </div>
          {question.type === 'multi' && (
            <div className="ml-11 mt-3">
              <Button size="sm" disabled={multiSelection.length === 0} onClick={() => advance(multiSelection)}>
                {t('wizard.continue')} <ArrowRight className="size-4" strokeWidth={2.25} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  )
}
