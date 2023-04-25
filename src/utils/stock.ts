import type { StockPriceHistoryItem } from '@/types/stock'

function createPriceHistoryItem(value: StockPriceHistoryItem['value']): StockPriceHistoryItem {
  return {
    date: new Date().toISOString(),
    value
  }
}

export function updatePriceHistory(
  newValue: StockPriceHistoryItem['value'],
  history: StockPriceHistoryItem[] = []
): StockPriceHistoryItem[] {
  const newPriceHistoryItem = createPriceHistoryItem(newValue)
  if (history.length === 10) {
    return [...history.slice(-9), newPriceHistoryItem]
  }
  return [...history, newPriceHistoryItem]
}
