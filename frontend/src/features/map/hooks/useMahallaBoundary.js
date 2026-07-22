import { useEffect, useState } from 'react'
import { getMahallaBoundary } from '../api/geoApi.js'

/**
 * Optimistically fetches a mahalla boundary that the backend doesn't serve
 * yet (see api/API_REQUIREMENTS.md). A 404/network error is treated as
 * "not available" rather than a hard error - the UI degrades to showing
 * stats without a shape instead of breaking.
 */
export function useMahallaBoundary(mahallaId) {
  const [state, setState] = useState({ boundary: null, checked: false })

  useEffect(() => {
    if (mahallaId == null) {
      setState({ boundary: null, checked: false })
      return
    }
    const controller = new AbortController()
    setState({ boundary: null, checked: false })

    getMahallaBoundary(mahallaId, { signal: controller.signal })
      .then((boundary) => setState({ boundary, checked: true }))
      .catch((error) => {
        if (error.name === 'AbortError') return
        setState({ boundary: null, checked: true })
      })

    return () => controller.abort()
  }, [mahallaId])

  return state
}
