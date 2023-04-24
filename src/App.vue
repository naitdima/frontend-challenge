<template>
  <Header class="app__header" />
  <main class="app__main">
    <section class="app__section">
      <h2 class="app_subheader">New subscription</h2>
      <Form @submit="subscribe" />
    </section>
    <section v-if="stocks.length > 0" class="app__section">
      <h2 class="app_subheader">Subscriptions</h2>
      <Stocks/>
    </section>
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
.app__header {
  max-width: 500px;
  margin-bottom: 20px;
}

.app__main {
  max-width: 500px;
  margin: 0 auto;
}

.app__section {
  &:not(:last-child) {
    margin-bottom: 28px;
  }
}

.app_subheader {
  font-size: 24px;
  line-height: 32px;
  margin: 0 0 16px 0;
}
</style>
