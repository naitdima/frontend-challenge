<template>
  <Header />
  <Form @submit="subscribe" />
  <Stocks />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useStocksStore } from '@/store/stocks'
import { storeToRefs } from 'pinia'

const socket = ref(null)

const stocksStore = useStocksStore()
const { stocks } = storeToRefs(stocksStore)

function sendMessage(message) {
  if (socket.value && socket.value.readyState === WebSocket.OPEN) {
    socket.value.send(message);
  } else {
    console.log('WebSocket is not connected.');
  }
}

function subscribe(isin: string) {
  sendMessage(`{"subscribe":"${isin}"}`)
}

function unsubscribe(isin: string) {
  sendMessage(`{"unsubscribe":"${isin}"}`)
}

onMounted(() => {
  socket.value = new WebSocket('ws://localhost:8425')

  socket.value.addEventListener('open', (event) => {
    console.log('WebSocket connected:', event);
  })

  socket.value.addEventListener('message', (event) => {
    const newStock = JSON.parse(event.data)
    const index = stocks.value.findIndex(stock => stock.isin === newStock.isin)
    if (index >= 0) {
      stocks.value.splice(index, 1, newStock)
    } else {
      stocks.value.push(newStock)
    }
  })
})

onBeforeUnmount(() => {
  socket.value?.close?.()
})
</script>

<style>
#app {
  font-family: var(--main-font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

<style scoped>
.main {
  max-width: var(--max-width);
  margin: 0 auto;
}

.heading1 {
  font-weight: 700;
}

.component-list {
  padding: 0 0 0 12px;
}
</style>
