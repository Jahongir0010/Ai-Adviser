export default function GlassCard({ as: Tag = 'div', className = '', solid = false, children, ...props }) {
  return (
    <Tag
      className={`${solid ? 'glass-panel-solid' : 'glass-panel'} rounded-[18px] ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
