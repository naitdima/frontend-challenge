<template>
  <div class="stock-params">
    <template v-for="param in params" :key="param.title">
      <dl class="stock-param">
        <dt class="stock-param__label">{{ param.title }}</dt>
        <dd
          class="stock-param__value"
          :class="{
            'stock-param__value_positive': param.positive,
            'stock-param__value_negative': param.negative
          }"
        >
          {{ param.value }}
        </dd>
      </dl>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { StockParam } from '@/types/stock'

withDefaults(
  defineProps<{
    params: StockParam[]
  }>(),
  {
    params: () => []
  }
)
</script>

<style scoped>
.stock-params {
  min-width: 100px;
}

.stock-param {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;

  &:not(:last-child) {
    margin-bottom: 4px;
  }
}

.stock-param__label {
  min-width: 24px;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-foreground1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stock-param__value {
  margin: 0;
  font-size: 18px;
  line-height: 20px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stock-param__value_positive {
  color: var(--color-primary-green4);
}

.stock-param__value_negative {
  color: var(--color-primary-red4);
}
</style>
