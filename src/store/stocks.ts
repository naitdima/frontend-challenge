import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Stock } from '../types/stock'

export const useStocksStore = defineStore('stocks', () => {
  const socket = new WebSocket('ws://localhost:8425')

  const stocks: Stock[] = reactive([
    {"isin":"US0378331005","price":202.40490308361424,"bid":202.39490308361425,"ask":202.41490308361423,"updatedAt":"2023-04-24T17:39:42.752Z"}
  ])

  function sendMessage(message: string) {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    } else {
      console.log('WebSocket is not connected.');
    }
  }

  socket.addEventListener('open', (event) => {
    console.log('WebSocket connected:', event);
  })

  socket.addEventListener('message', (event) => {
    if (!event?.data) {
      return
    }
    const newStock = JSON.parse(event.data)
    newStock.updatedAt = new Date().toISOString()
    const index = stocks.findIndex(stock => stock.isin === newStock.isin)
    const prevStock = stocks[index]
    if (index >= 0) {
      newStock.priceHistory = prevStock.priceHistory ? [...prevStock.priceHistory.slice(-9), newStock.price] : [newStock.price]
      stocks.splice(index, 1, newStock)
    } else {
      stocks.push({
        ...newStock,
        priceHistory: [newStock.price]
      })
    }
  })

  function subscribe(isin: string) {
    sendMessage(`{"subscribe":"${isin}"}`)
  }

  function unsubscribe(isin: string) {
    sendMessage(`{"unsubscribe":"${isin}"}`)
    const index = stocks.findIndex(stock => stock.isin === isin)
    if (index >= 0) {
      stocks.splice(index, 1)
    }
  }

  function isISINSubscribed(isin: string) {
    return stocks.some(stock => stock.isin === isin)
  }

  function reset() {
    socket.close()
  }

  return {
    stocks,
    subscribe,
    unsubscribe,
    isISINSubscribed
  }
})
