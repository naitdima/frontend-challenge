<template>
  <ul class="stocks">
    <li v-for="stock in stocks" :key="stock.isin" class="stocks__item">
      <Stock :stock="stock" deletable @delete="unsubscribe(stock.isin)" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import Stock from '@/components/Stock.vue'
import { useStocksStore } from '@/store/stocks'

const { stocks, unsubscribe } = useStocksStore()
</script>

<style scoped>
.stocks {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.stocks__item {
  &:not(:last-child) {
    margin-bottom: 12px;
  }
}
</style>
