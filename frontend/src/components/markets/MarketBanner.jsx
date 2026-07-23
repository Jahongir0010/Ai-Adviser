import { useState } from 'react'
import { getStaticUrl } from '../../lib/apiClient.js'
import { MARKET_TYPE_GRADIENT } from './marketIcons.js'
import BannerPattern from './BannerPattern.jsx'

/**
 * Market card/modal header background: a real market photo when the backend
 * has one (GET /api/bozorlar), falling back to the illustrated gradient +
 * pattern (see BannerPattern.jsx) for the markets that don't have one yet
 * or if the image fails to load.
 */
export default function MarketBanner({ market, photoUrl, className = '', children }) {
  const [photoFailed, setPhotoFailed] = useState(false)
  const gradient = MARKET_TYPE_GRADIENT[market.marketType] ?? MARKET_TYPE_GRADIENT.Universal
  const showPhoto = Boolean(photoUrl) && !photoFailed

  return (
    <div className={`relative bg-gradient-to-br ${gradient} ${className}`}>
      {showPhoto ? (
        <>
          <img
            src={getStaticUrl(photoUrl)}
            alt=""
            onError={() => setPhotoFailed(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-black/15" />
        </>
      ) : (
        <BannerPattern />
      )}
      {children}
    </div>
  )
}
