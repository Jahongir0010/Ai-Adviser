/** Subtle diagonal-hatch texture over a gradient banner - pure CSS, no image dependency. */
export default function BannerPattern() {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.10) 0px, rgba(255,255,255,0.10) 1.5px, transparent 1.5px, transparent 13px)',
      }}
    />
  )
}
