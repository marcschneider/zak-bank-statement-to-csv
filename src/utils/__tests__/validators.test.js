import { isDate, isAmount, shouldSkipLine } from '../validators.js'

describe('isDate', () => {
  it('should validate correct date format', () => {
    expect(isDate('31.12.23')).toBe(true)
    expect(isDate('01.01.24')).toBe(true)
  })

  it('should reject invalid date formats', () => {
    expect(isDate('2023-12-31')).toBe(false)
    expect(isDate('31-12-23')).toBe(false)
    expect(isDate('not a date')).toBe(false)
  })
})

describe('isAmount', () => {
  it('should validate correct amount format', () => {
    expect(isAmount('1234.56')).toBe(true)
    expect(isAmount('1\'234.56')).toBe(true)
  })

  it('should reject invalid amount formats', () => {
    expect(isAmount('1,234.56')).toBe(false)
    expect(isAmount('not an amount')).toBe(false)
  })
})

describe('shouldSkipLine', () => {
  const skipWords = ['SKIP', 'TEST']

  it('should identify lines containing skip words', () => {
    expect(shouldSkipLine('SKIP this line', skipWords)).toBe(true)
    expect(shouldSkipLine('This is a TEST', skipWords)).toBe(true)
  })

  it('should not skip lines without skip words', () => {
    expect(shouldSkipLine('Normal line', skipWords)).toBe(false)
  })
}) 