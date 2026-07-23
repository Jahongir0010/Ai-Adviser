import { apiGet, apiPost } from '../lib/apiClient.js'

/**
 * @typedef {{value: string|number, label: string}} AnketaOption
 * @typedef {{
 *   key: string,
 *   label: string,
 *   type: 'select'|'text'|'number',
 *   required: boolean,
 *   dependsOn: string|null,
 *   requiredIf: {key: string, equals: string}|null,
 *   options?: AnketaOption[],
 * }} AnketaSavol
 */

/** @returns {Promise<AnketaSavol[]>} */
export function getSavollar(options) {
  return apiGet('/anketa/savollar', options).then((r) => r.data)
}

/**
 * Validates + normalizes answers server-side (options are re-checked against
 * the live geo data, numbers are coerced, requiredIf is re-evaluated).
 * @param {Record<string, unknown>} answers
 * @returns {Promise<Record<string, unknown>>} normalized data on success
 */
export function submitJavoblar(answers, options) {
  return apiPost('/anketa/javoblar', { answers }, options).then((r) => r.data)
}
