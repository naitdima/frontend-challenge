<template>
  <Line :data="chartData" :options="chartOptions" width="100%" height="100%" />
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs'
import { computed, ref } from 'vue'
import { Chart, registerables } from 'chart.js'
import type { StockPriceHistoryItem } from '@/types/stock'

Chart.register(...registerables)

enum Color {
  Default = 'rgba(149, 76, 233, 1)',
  Half = 'rgba(149, 76, 233, 0.5)',
  Quarter = 'rgba(149, 76, 233, 0.25)',
  Zero = 'rgba(149, 76, 233, 0)'
}

const props = withDefaults(
  defineProps<{
    data: StockPriceHistoryItem[]
  }>(),
  {
    data: () => []
  }
)

const chartData = computed(() => {
  return {
    labels: props.data.map((item) => item.date),
    datasets: [
      {
        data: props.data.map((item) => item.value),
        pointStyle: false,
        tension: 0.1,
        borderWidth: -4,
        borderColor: Color.Default,
        borderJoinStyle: 'round',
        fill: true,
        backgroundColor: (ctx) => {
          const canvas = ctx.chart.ctx
          const gradient = canvas.createLinearGradient(0, 25, 0, 300)
          gradient.addColorStop(0, Color.Half)
          gradient.addColorStop(0.35, Color.Quarter)
          gradient.addColorStop(1, Color.Zero)

          return gradient
        }
      }
    ]
  }
})

const chartOptions = ref({
  plugins: {
    legend: { display: false }
  },
  scales: {
    x: { display: false },
    y: { display: false }
  },
  responsive: true
})
</script>
