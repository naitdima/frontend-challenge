<template>
  <ul>
    <li
      v-for="stock in stocks"
      :key="stock.isin"
    >
      <Card>
        {{ stock.isin }} {{ stock.price }}
      </Card>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStocksStore } from '@/store/stocks'
import Card from './Card.vue'

const emit = defineEmits<{
  (e: 'submit', isin: string): void
}>()

const stocksStore = useStocksStore()
const { stocks } = storeToRefs(stocksStore)
</script>

<style scoped>
</style>
