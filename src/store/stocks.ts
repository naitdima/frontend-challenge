import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import type { Stock } from '@/types/stock'
import { updatePriceHistory } from '@/utils/stock'

export const useStocksStore = defineStore('stocks', () => {
  const socket: Ref<null | WebSocket> = ref(null)
  const socketIsConnected: Ref<boolean> = ref(false)
  const stocks: Stock[] = reactive([])

  function init() {
    socket.value = new WebSocket('ws://localhost:8425')
    socket.value.addEventListener('open', onOpen)
    socket.value.addEventListener('message', onMessage)
    socket.value.addEventListener('close', onClose)
    socket.value.addEventListener('error', onError)
  }

  function destroy() {
    if (socketIsConnected.value) {
      socket.value?.close()
    }
  }

  function onOpen(): void {
    socketIsConnected.value = true
  }

  function onClose(): void {
    socketIsConnected.value = false
    socket.value = null
  }

  function onError(error) {
    console.error('WebSocket error:', error)
  }

  function onMessage(event): void {
    if (!event?.data) {
      return
    }

    const newStock = JSON.parse(event.data)

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

  function sendMessage(message: any) {
    if (socket.value?.readyState === WebSocket.OPEN) {
      socket.value.send(JSON.stringify(message))
    } else {
      throw new Error('WebSocket is not connected.')
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
