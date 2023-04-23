import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useStocksStore = defineStore('stocks', () => {
  const stocks = reactive([])

  // function subscribe(isin: string) {
  //
  // }

  return {
    stocks
  }
})
