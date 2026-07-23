import { apiGet } from '../lib/apiClient.js'

/**
 * @typedef {{regionId: number, bozorNomi: string, rasm: string, rasmUrl: string}} BozorRasmi
 * @returns {Promise<BozorRasmi[]>}
 */
export function getAllBozorRasmlari(options) {
  return apiGet('/bozorlar', options).then((r) => r.data)
}
