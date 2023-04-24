<template>
  <div class="stock">
    <div>
      <div class="stock__container">
        <p class="stock__isin">
          {{ stock.isin }}
        </p>
        <IconClose v-if="deletable" class="stock__delete" @click="emit('delete')" />
      </div>
      <div class="stock__container">
        <div>
          <dl class="stock__param">
            <dt class="stock__param-label">
              Ask
            </dt>
            <dd class="stock__param-value stock__param-value_negative">
              {{ stock.ask.toFixed(2) }}
            </dd>
          </dl>
          <dl class="stock__param">
            <dt class="stock__param-label">
              Bid
            </dt>
            <dd class="stock__param-value stock__param-value_positive">
              {{ stock.bid.toFixed(2) }}
            </dd>
          </dl>
        </div>
        <span class="stock__price" :class="{ 'stock__price_error': isOutdated }">
          {{ stock.price.toFixed(2) }}
        </span>
      </div>
      <p v-if="isOutdated" class="stock__error">
        Failed to update - value from {{ formatTime(stock.updatedAt) }}
      </p>
    </div>
    <StockChart
      v-if="stock.priceHistory?.length > 0"
      class="stock__chart"
      :data="stock.priceHistory"
    />
    <div class="stock__actions">
      <button v-if="deletable" class="stock__action" @click="emit('delete')">
        <IconClose class="stock__action-icon" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconClose from '@/assets/icons/close.svg'
import { computed } from 'vue'
import { formatTime } from '@/utils/format'
import type { Stock } from '../types/stock'

const props = defineProps<{
  stock: Stock
  deletable: boolean
}>()

const emit = defineEmits<{
  (e: 'delete'): void
}>()

const isOutdated = computed(() => {
  const currentDate = new Date()
  const stockDate = new Date(props.stock.updatedAt)
  return currentDate.getTime() - stockDate.getTime() > 1000
})
</script>

<style scoped>
.stock {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  position: relative;
  padding: 12px 0;
  border-bottom: 1px solid var(--color-foreground3);
}

.stock__price_error {
  color: var(--color-primary-red2);
}

.stock__delete {
  display: none;
  fill: var(--color-background1);
  height: 16px;
  width: 16px;
  background-color: var(--color-foreground3);
  padding: 2px;
  cursor: pointer;
}

.stock__actions {
  display: flex;
  align-items: stretch;
}

.stock__action {
  background-color: var(--color-background1);
  height: 100%;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: var(--color-foreground3);

    .stock__action-icon {
      fill: var(--color-foreground4);
    }
  }

  &:active {
    background-color: var(--color-foreground2);

    .stock__action-icon {
      fill: var(--color-foreground4);
    }
  }
}

.stock__action-icon {
  fill: var(--color-foreground3);
  height: 20px;
  width: 20px;
}

.stock__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 8px;
}

.stock__isin {
  margin: 0;
  font-size: 18px;
  line-height: 24px;
}

.stock__price {
  font-size: 40px;
  line-height: 40px;
  font-weight: 700;
}

.stock__param {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;

  &:not(:last-child) {
    margin-bottom: 4px;
  }
}

.stock__param-label {
  min-width: 24px;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-foreground1);
}

.stock__param-value {
  margin: 0;
  font-size: 18px;
  line-height: 20px;
  font-weight: 700;
}

.stock__param-value_positive {
  color: var(--color-primary-green4);
}

.stock__param-value_negative {
  color: var(--color-primary-red4);
}

.stock__error {
  margin: 0;
  padding: 8px 0;
  font-size: 14px;
  line-height: 18px;
  color: var(--color-primary-red2);
}

.stock__chart {
  display: none;
}
</style>
