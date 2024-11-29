// src/services/assembleTransactions.js
import { promises as fs } from 'fs'
import path from 'path'
import { parsePdf } from './parsePdf.js'
import { logger } from '../utils/logger.js'
import { formatDate } from '../utils/formatters.js'

/**
 * @typedef {import('./parsePdf.js').Transaction} Transaction
 */

/**
 * Assembles transactions from all PDF files in the specified directory
 * @param {string} dirPath - Directory containing PDF files
 * @returns {Promise<Transaction[]>}
 * @throws {Error} If directory reading or PDF processing fails
 */
export async function assembleTransactions(dirPath) {
  try {
    // Verify directory exists
    await fs.access(dirPath)
    
    const files = await fs.readdir(dirPath)
    const pdfFiles = files.filter(file => 
      file.toLowerCase().endsWith('.pdf')
    )
    
    if (pdfFiles.length === 0) {
      throw new Error(`No PDF files found in ${dirPath}`)
    }
    
    logger(`Found ${pdfFiles.length} PDF files`)
    
    const allTransactions = []
    const errors = []
    
    for (const pdfFile of pdfFiles) {
      const filePath = path.join(dirPath, pdfFile)
      logger(`Processing ${pdfFile}...`)
      
      try {
        const transactions = await parsePdf(filePath)
        allTransactions.push(...transactions)
        logger(`Processed ${transactions.length} transactions from ${pdfFile}`)
      } catch (err) {
        errors.push(`Failed to process ${pdfFile}: ${err.message}`)
        logger(`Error processing ${pdfFile}:`, err)
      }
    }
    
    if (errors.length > 0) {
      logger('Encountered errors while processing files:', errors)
    }
    
    if (allTransactions.length === 0) {
      throw new Error('No transactions were successfully processed')
    }
    
    // Sort by date
    allTransactions.sort((a, b) => {
      const dateA = new Date(formatDate(a.date))
      const dateB = new Date(formatDate(b.date))
      return dateA - dateB
    })
    
    return allTransactions
    
  } catch (err) {
    const error = new Error(`Failed to process transactions: ${err.message}`)
    error.cause = err
    throw error
  }
}
  