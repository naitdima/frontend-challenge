import { describe, it, expect } from 'vitest'
import { updatePriceHistory, createPriceHistoryItem } from '@/utils/stock'
import type { StockPriceHistoryItem } from '@/types/stock'

describe('createPriceHistoryItem', () => {
  it('should return an object with a date and value', () => {
    const value = 100
    const priceHistoryItem = createPriceHistoryItem(value)

    expect(typeof priceHistoryItem).toBe('object')
    expect(typeof priceHistoryItem.date).toBe('string')
    expect(new Date(priceHistoryItem.date).toString() !== 'Invalid Date').toBe(true)
    expect(priceHistoryItem.value).toBe(value)
  })
})

describe('updatePriceHistory', () => {
  it('should add a new item to the history', () => {
    const newValue = 150
    const history = [createPriceHistoryItem(100)]

    const updatedHistory = updatePriceHistory(newValue, history)

    expect(updatedHistory.length).toBe(2)
    expect(updatedHistory[1].value).toBe(newValue)
  })

  it('should maintain a maximum of 10 items in the history', () => {
    const newValue: StockPriceHistoryItem['value'] = 500
    const history: StockPriceHistoryItem[] = Array.from({ length: 10 }, (_, index) =>
      createPriceHistoryItem(index * 10)
    )

    const updatedHistory = updatePriceHistory(newValue, history)

    expect(updatedHistory.length).toBe(10)
    expect(updatedHistory[0].value).toBe(10)
    expect(updatedHistory[9].value).toBe(newValue)
  })

  it('should return a new array with the new item when no history is provided', () => {
    const newValue: StockPriceHistoryItem['value'] = 200

    const updatedHistory = updatePriceHistory(newValue)

    expect(updatedHistory.length).toBe(1)
    expect(updatedHistory[0].value).toBe(newValue)
  })
})
