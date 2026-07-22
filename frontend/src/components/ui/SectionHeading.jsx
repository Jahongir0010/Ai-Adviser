export default function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-5">
      <div>
        {eyebrow && (
          <p className="text-[12px] font-semibold tracking-wider uppercase text-primary-600 mb-1.5">{eyebrow}</p>
        )}
        <h2 className="font-display font-bold text-[20px] text-ink-900 tracking-tight">{title}</h2>
        {description && <p className="text-[13.5px] text-ink-500 mt-1 max-w-xl">{description}</p>}
      </div>
      {action}
    </div>
  )
}
