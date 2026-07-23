const VARIANT_CLASS = {
  default: 'glass-panel',
  solid: 'glass-panel-solid',
  frosted: 'glass-panel-frosted',
}

export default function GlassCard({ as: Tag = 'div', className = '', variant = 'default', solid = false, children, ...props }) {
  const variantClass = VARIANT_CLASS[solid ? 'solid' : variant]
  return (
    <Tag className={`${variantClass} rounded-[18px] ${className}`} {...props}>
      {children}
    </Tag>
  )
}
