<template>
  <article class="stock">
    <div class="stock__wrapper">
      <header class="stock__container">
        <h3 class="stock__isin">
          {{ stock.isin }}
        </h3>
        <button v-if="deletable" class="stock__delete" @click="emit('delete')">
          <IconClose class="stock__delete-icon" />
        </button>
      </header>

      <div class="stock__container">
        <StockParams class="stock__params" :params="params" />
        <span class="stock__price" :class="{ stock__price_error: error }">
          {{ formatPrice(stock.price) }}
        </span>
      </div>

      <p v-if="error" class="stock__error">
        {{ error }}
      </p>
    </div>

    <StockChart
      v-if="stock.priceHistory.length > 0"
      class="stock__chart"
      :data="stock.priceHistory"
    />
  </article>
</template>

<script setup lang="ts">
import StockChart from '@/components/StockChart.vue'
import StockParams from '@/components/StockParams.vue'
import IconClose from '@/assets/icons/close.svg'
import { computed } from 'vue'
import { formatDate, formatPrice } from '@/utils/format'
import type { ComputedRef } from 'vue'
import type { Stock, StockParam } from '@/types/stock'

const props = defineProps<{
  stock: Stock
  deletable: boolean
}>()

const emit = defineEmits<{
  (e: 'delete'): void
}>()

const params: ComputedRef<StockParam[]> = computed(() => {
  return [
    {
      title: 'Ask',
      negative: true,
      value: formatPrice(props.stock.ask)
    },
    {
      title: 'Bid',
      positive: true,
      value: formatPrice(props.stock.bid)
    }
  ]
})

const isOutdated: ComputedRef<boolean> = computed(() => {
  return new Date().getTime() - new Date(props.stock.updatedAt).getTime() > 1000
})

const error: ComputedRef<string> = computed(() => {
  if (isOutdated.value) {
    return `Failed to update - value from ${formatDate(props.stock.updatedAt, 'kk:mm:ss')}`
  }
  return ''
})
</script>

<style scoped>
.stock {
  position: relative;
  border-bottom: 1px solid var(--color-foreground3);
}

.stock__wrapper {
  width: 100%;
  height: 100%;
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.5);
}

.stock__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 8px;
}

.stock__isin {
  flex-grow: 1;
  margin: 0;
  font-size: 18px;
  line-height: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stock__delete {
  flex-shrink: 0;
  padding: 0;
  height: 22px;
  width: 22px;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid transparent;

  &:hover {
    border-color: var(--color-foreground3);
  }

  &:active {
    border-color: var(--color-foreground2);

    .stock__delete-icon {
      fill: var(--color-foreground2);
    }
  }
}

.stock__delete-icon {
  fill: var(--color-foreground3);
  width: 100%;
  height: 100%;
}

.stock__params {
  flex-grow: 1;
}

.stock__price {
  flex-shrink: 1;
  font-size: 40px;
  line-height: 40px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stock__price_error {
  color: var(--color-primary-red2);
}

.stock__error {
  margin: 0;
  padding: 8px 0;
  font-size: 14px;
  line-height: 18px;
  color: var(--color-primary-red2);
}

.stock__chart {
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
