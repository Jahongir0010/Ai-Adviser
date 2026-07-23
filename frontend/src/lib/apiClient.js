const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api'

export class ApiError extends Error {
  constructor(message, { status, payload } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.payload = payload
  }
}

async function parseResponse(response) {
  let body = null
  try {
    body = await response.json()
  } catch {
    // no JSON body (e.g. plain 404 from a proxy) - fall through with null body
  }

  if (!response.ok || body?.success === false) {
    throw new ApiError(body?.message ?? `So'rov muvaffaqiyatsiz tugadi (${response.status})`, {
      status: response.status,
      payload: body,
    })
  }

  return body
}

/**
 * Thin GET wrapper around the backend's `{ success, data }` envelope.
 * @param {string} path - e.g. "/anketa/savollar"
 * @param {{ params?: Record<string, string|number|undefined>, signal?: AbortSignal }} [options]
 */
export async function apiGet(path, { params, signal } = {}) {
  const url = new URL(`${BASE_URL}${path}`)
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) url.searchParams.set(key, String(value))
    }
  }

  let response
  try {
    response = await fetch(url, { signal })
  } catch (cause) {
    if (cause.name === 'AbortError') throw cause
    throw new ApiError('Backendga ulanib bo\'lmadi. Server ishga tushirilganini tekshiring.', { status: 0 })
  }

  return parseResponse(response)
}

/**
 * POST wrapper around the backend's `{ success, data }` envelope.
 * @param {string} path - e.g. "/anketa/javoblar"
 * @param {object} body
 * @param {{ signal?: AbortSignal }} [options]
 */
export async function apiPost(path, body, { signal } = {}) {
  let response
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal,
    })
  } catch (cause) {
    if (cause.name === 'AbortError') throw cause
    throw new ApiError('Backendga ulanib bo\'lmadi. Server ishga tushirilganini tekshiring.', { status: 0 })
  }

  return parseResponse(response)
}
