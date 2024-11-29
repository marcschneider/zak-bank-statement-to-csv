// src/services/saveToCsv.js
import { promises as fs } from 'fs'
import { formatDate, formatAmount, formatDescription, formatCsvField } from '../utils/formatters.js'

export async function saveToCsv(transactions, outputPath) {
  const headers = ['date', 'time', 'title', 'description', 'valuta', 'incoming', 'outgoing', 'balance']

  const csvRows = transactions.map(t => [
    formatDate(t.date),
    t.time || '',
    t.title,
    formatDescription(t.description),
    formatDate(t.valuta),
    t.type === 'incoming' ? formatAmount(t.amount) : '',
    t.type === 'outgoing' ? formatAmount(t.amount) : '',
    formatAmount(t.balance)
  ].map(formatCsvField).join(','))

  const csvContent = [headers.join(','), ...csvRows].join('\n')
  await fs.writeFile(outputPath, csvContent)
}