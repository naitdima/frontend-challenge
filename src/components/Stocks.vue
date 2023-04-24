<template>
  <ul class="stocks">
    <li
      v-for="stock in stocks"
      :key="stock.isin"
      class="stocks__item"
    >
      <Card class="stocks__card">
        <IconClose class="stocks__card-close" @click="unsubscribe(stock.isin)" />
        <div class="stocks__card-container">
          <dl class="stocks__card-param">
            <dt class="stocks__card-param-label">
              Isin
            </dt>
            <dd class="stocks__card-param-value">
              {{ stock.isin }}
            </dd>
          </dl>
          <dl class="stocks__card-param">
            <dt class="stocks__card-param-label">
              Price
            </dt>
            <dd class="stocks__card-param-value">
              {{ stock.price.toFixed(2) }}
            </dd>
          </dl>
        </div>
        <div class="stocks__card-container">
          <dl class="stocks__card-param">
            <dt class="stocks__card-param-label">
              Ask
            </dt>
            <dd class="stocks__card-param-value stocks__card-param-value_negative">
              {{ stock.ask.toFixed(2) }}
            </dd>
          </dl>
          <dl class="stocks__card-param">
            <dt class="stocks__card-param-label">
              Bid
            </dt>
            <dd class="stocks__card-param-value stocks__card-param-value_positive">
              {{ stock.bid.toFixed(2) }}
            </dd>
          </dl>
        </div>
        <p v-if="isOutdatedStock(stock)" class="stocks__card-error">
          Failed to update. Value from {{ formatTime(stock.updatedAt) }}.
        </p>
      </Card>
    </li>
  </ul>
</template>

<script setup lang="ts">
import IconClose from '@/assets/icons/close.svg'
import { useStocksStore } from '@/store/stocks'
import { formatTime } from '@/utils/format'
import type { Stock } from '../types/stock'

const emit = defineEmits<{
  (e: 'submit', isin: string): void
}>()

const stocksStore = useStocksStore()
const { stocks, unsubscribe } = stocksStore

function isOutdatedStock(stock: Stock) {
  const currentDate = new Date()
  const stockDate = new Date(stock.updatedAt)
  return currentDate.getTime() - stockDate.getTime() > 1000
}
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

.stocks__card {
  position: relative;
}

.stocks__card-close {
  position: absolute;
  top: 10px;
  right: 10px;
  fill: var(--color-foreground3);
  height: 20px;
  width: 20px;
  cursor: pointer;
}

.stocks__card-container {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.stocks__card-param {
  margin: 0;
}

.stocks__card-param-label {
  margin: 0;
  font-size: 14px;
  line-height: 18px;
  color: var(--color-foreground1);
}

.stocks__card-param-value {
  margin: 0;
  font-size: 20px;
  line-height: 26px;
  font-weight: 700;
}

.stocks__card-param-value_positive {
  color: var(--color-primary-green4);
}

.stocks__card-param-value_negative {
  color: var(--color-primary-red4);
}

.stocks__card-error {
  color: var(--color-primary-red2);
}
</style>
