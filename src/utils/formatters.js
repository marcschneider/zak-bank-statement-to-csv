/**
 * Formats a date string from dd.mm.yy to yyyy-mm-dd
 * @param {string} dateStr - Date string in format dd.mm.yy
 * @returns {string} Date in format yyyy-mm-dd
 * @throws {Error} If date string is invalid
 */
export function formatDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') {
    throw new Error('Invalid date string provided')
  }

  const parts = dateStr.split('.')
  if (parts.length !== 3) {
    throw new Error(`Invalid date format: ${dateStr}`)
  }

  const [day, month, year] = parts
  return `20${year}-${month}-${day}`
}

/**
 * Formats an amount string by removing apostrophes
 * @param {string} amountStr - Amount string
 * @returns {string} Formatted amount
 */
export function formatAmount(amountStr) {
  if (!amountStr || typeof amountStr !== 'string') {
    throw new Error('Invalid amount string provided')
  }
  return amountStr.replace(/'/g, '')
}

/**
 * Formats description array or string into a single string
 * @param {string|string[]} description - Description to format
 * @returns {string} Formatted description
 */
export function formatDescription(description) {
  if (!description) return ''
  return Array.isArray(description) ? description.join(' ') : String(description)
}

/**
 * Formats a field for CSV output
 * @param {any} field - Field to format
 * @returns {string} CSV-formatted field
 */
export function formatCsvField(field) {
  const str = String(field ?? '')
  return `"${str.replace(/"/g, '""')}"`
} 