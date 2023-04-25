<template>
  <Header class="app__header" />
  <main class="app__main">
    <section class="app__section">
      <h2 class="app_subheader">New subscription</h2>
      <StockForm />
    </section>
    <section v-if="stocks.length > 0" class="app__section">
      <h2 class="app_subheader">Subscriptions</h2>
      <Stocks />
    </section>
  </main>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import StockForm from '@/components/StockForm.vue'
import Stocks from '@/components/Stocks.vue'
import { useStocksStore } from '@/store/stocks'

const { stocks } = useStocksStore()
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
  max-width: 400px;
  margin-bottom: 20px;
}

.app__main {
  max-width: 400px;
  margin: 0 auto;
  padding-bottom: 80px;
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
