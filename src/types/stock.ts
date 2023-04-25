export interface StockPriceHistoryItem {
  date: string
  value: number
}

export interface Stock {
  isin: string
  price: number
  bid: number
  ask: number
  updatedAt: string
  priceHistory: StockPriceHistoryItem[]
}

export interface StockParam {
  title: string
  value: string | number
  positive?: boolean
  negative?: boolean
}
