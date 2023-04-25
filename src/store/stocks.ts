import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { Stock } from '@/types/stock'
import { updatePriceHistory } from '@/utils/stock'
import { useWebSockets } from '@/composables/web-socket'

export const useStocksStore = defineStore('stocks', () => {
  const stocks: Stock[] = reactive([])

  const { init, destroy, sendMessage } = useWebSockets('ws://localhost:8425', onStockReceived)

  function onStockReceived(newStock: any): void {
    if (!newStock?.isin) {
      return
    }

    const stockIndex = stocks.findIndex((stock) => stock.isin === newStock.isin)
    const stock = stocks[stockIndex]

    newStock.updatedAt = new Date().toISOString()
    newStock.priceHistory = updatePriceHistory(newStock.price, stock?.priceHistory ?? [])

    if (!stock) {
      stocks.push(newStock)
    } else {
      stocks.splice(stockIndex, 1, newStock)
    }
  }

  function subscribe(isin: string): void {
    sendMessage({ subscribe: isin })
  }

  function unsubscribe(isin: string): void {
    sendMessage({ unsubscribe: isin })

    const index = stocks.findIndex((stock) => stock.isin === isin)
    if (index >= 0) {
      stocks.splice(index, 1)
    }
  }

  function isISINSubscribed(isin: string): boolean {
    return stocks.some((stock) => stock.isin === isin)
  }

  return {
    stocks,
    init,
    destroy,
    subscribe,
    unsubscribe,
    isISINSubscribed
  }
})
