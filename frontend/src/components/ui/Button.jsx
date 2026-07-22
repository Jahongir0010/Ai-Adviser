const VARIANTS = {
  primary: 'btn-gradient-brand text-white shadow-glow-primary hover:brightness-[1.06] active:brightness-95',
  secondary: 'bg-white text-ink-700 border border-ink-200 hover:border-primary-300 hover:text-primary-700 shadow-soft',
  ghost: 'text-ink-600 hover:bg-ink-100',
  outline: 'bg-transparent text-primary-700 border border-primary-200 hover:bg-primary-50',
}

const SIZES = {
  sm: 'h-8 px-3 text-[13px] gap-1.5',
  md: 'h-10 px-4 text-[14px] gap-2',
  lg: 'h-12 px-6 text-[15px] gap-2',
}

export default function Button({ variant = 'primary', size = 'md', className = '', as: Tag = 'button', children, ...props }) {
  return (
    <Tag
      className={`inline-flex items-center justify-center rounded-[12px] font-semibold whitespace-nowrap transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
