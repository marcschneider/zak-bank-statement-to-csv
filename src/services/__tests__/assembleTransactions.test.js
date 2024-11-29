import { jest } from '@jest/globals'
import { mockTransaction } from './fixtures/mockData.js'

// Mock dependencies
const mockReaddir = jest.fn()
const mockAccess = jest.fn()
jest.unstable_mockModule('fs', () => ({
  promises: {
    readdir: mockReaddir,
    access: mockAccess
  }
}))

// Mock logger
jest.unstable_mockModule('../../utils/logger.js', () => ({
  logger: jest.fn()
}))

const mockParsePdf = jest.fn()
jest.unstable_mockModule('../parsePdf.js', () => ({
  parsePdf: mockParsePdf
}))

const { assembleTransactions } = await import('../assembleTransactions.js')

describe('assembleTransactions', () => {
  beforeEach(() => {
    mockReaddir.mockClear()
    mockAccess.mockClear()
    mockParsePdf.mockClear()
    
    // Default successful responses
    mockAccess.mockResolvedValue(undefined)
    mockReaddir.mockResolvedValue(['test1.pdf', 'test2.pdf', 'notapdf.txt'])
    mockParsePdf.mockResolvedValue([mockTransaction])
  })

  it('should process PDF files and return sorted transactions', async() => {
    const transactions = await assembleTransactions('input')
    
    expect(mockReaddir).toHaveBeenCalledWith('input')
    expect(mockParsePdf).toHaveBeenCalledTimes(2)
    expect(transactions).toHaveLength(2)
    expect(transactions[0].date).toBe(mockTransaction.date)
  })

  it('should handle PDF processing errors', async() => {
    mockParsePdf.mockRejectedValue(new Error('PDF processing failed'))
    mockReaddir.mockResolvedValue(['test1.pdf']) // Only one file to simplify test

    await expect(assembleTransactions('input'))
      .rejects
      .toThrow('Failed to process transactions: No transactions were successfully processed')
  })

  it('should throw error if no PDF files found', async() => {
    mockReaddir.mockResolvedValue(['notapdf.txt'])
    
    await expect(assembleTransactions('input'))
      .rejects
      .toThrow('No PDF files found in input')
  })

  it('should throw error if directory does not exist', async() => {
    mockAccess.mockRejectedValue(new Error('Directory not found'))
    
    await expect(assembleTransactions('invalid'))
      .rejects
      .toThrow('Failed to process transactions: Directory not found')
  })
}, 10000)