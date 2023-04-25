import { formatPrice, formatDate } from '@/utils/format'
import { describe, it, expect } from 'vitest'

describe('formatDate', () => {
  it('should format a date string to a specified pattern', () => {
    const date = '2023-04-25'
    const pattern = 'yyyy-MM-dd'
    const expected = '2023-04-25'
    expect(formatDate(date, pattern)).toBe(expected)
  })

  it('should format a date string to a different pattern', () => {
    const date = '2023-04-25'
    const pattern = 'MMM dd, yyyy'
    const expected = 'Apr 25, 2023'
    expect(formatDate(date, pattern)).toBe(expected)
  })

  it('should format a date string with time to a pattern', () => {
    const date = '2023-04-25T10:30:00'
    const pattern = 'yyyy-MM-dd HH:mm:ss'
    const expected = '2023-04-25 10:30:00'
    expect(formatDate(date, pattern)).toBe(expected)
  })
})

describe('formatPrice', () => {
  it('should format a number with 2 decimal places', () => {
    const price = 42.5
    const expected = '42.50'
    expect(formatPrice(price)).toBe(expected)
  })

  it('should format a number with no decimal places to 2 decimal places', () => {
    const price = 42
    const expected = '42.00'
    expect(formatPrice(price)).toBe(expected)
  })

  it('should round a number to 2 decimal places', () => {
    const price = 42.555
    const expected = '42.55'
    expect(formatPrice(price)).toBe(expected)
  })

  it('should format a negative number with 2 decimal places', () => {
    const price = -42.5
    const expected = '-42.50'
    expect(formatPrice(price)).toBe(expected)
  })
})
