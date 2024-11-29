import { formatDate } from '../formatters.js'

describe('formatDate', () => {
  test('formats date correctly', () => {
    expect(formatDate('31.12.23')).toBe('2023-12-31')
  })
}) 