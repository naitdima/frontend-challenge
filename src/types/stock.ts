export interface StockPriceHistoryItem {
  date: string
  value: string
}

export interface Stock {
  isin: string
  price: number
  bid: number
  ask: number
  updatedAt: string
  priceHistory: StockPriceHistoryItem[]
}
