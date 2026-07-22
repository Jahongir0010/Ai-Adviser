import { useEffect, useRef, useState } from 'react'

/**
 * Generic fetch-on-deps-change hook with abort-on-unmount/re-run.
 * @param {(signal: AbortSignal) => Promise<any>} fetcher
 * @param {any[]} deps
 * @param {{ enabled?: boolean }} [options]
 */
export function useFetch(fetcher, deps, { enabled = true } = {}) {
  const [state, setState] = useState({ data: null, loading: enabled, error: null })
  const fetcherRef = useRef(fetcher)
  fetcherRef.current = fetcher

  useEffect(() => {
    if (!enabled) {
      setState({ data: null, loading: false, error: null })
      return
    }
    const controller = new AbortController()
    setState((prev) => ({ ...prev, loading: true, error: null }))

    fetcherRef.current(controller.signal)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((error) => {
        if (error.name === 'AbortError') return
        setState({ data: null, loading: false, error })
      })

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...deps])

  return state
}
