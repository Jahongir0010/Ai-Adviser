import { createContext, useContext } from 'react'

export const MapInstanceContext = createContext(null)

/** The live maplibregl.Map instance, or null before the style has finished loading. */
export function useMapInstance() {
  return useContext(MapInstanceContext)
}
