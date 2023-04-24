<template>
  <main class="app__main">
    <Header />
    <h2>New subscription</h2>
    <Form @submit="subscribe" />
    <template v-if="stocks.length > 0">
      <h2>Subscriptions</h2>
      <Stocks/>
    </template>
  </main>
</template>

<script setup lang="ts">
import { useStocksStore } from '@/store/stocks'

const stocksStore = useStocksStore()
const { stocks, subscribe } = stocksStore
</script>

<style>
#app {
  font-family: var(--main-font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

<style scoped>
.app__main {
  max-width: var(--max-width);
  margin: 0 auto;
}
</style>
