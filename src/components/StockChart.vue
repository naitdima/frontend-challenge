<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart, registerables } from "chart.js";
import type { StockPriceHistoryItem } from '@/types/stock'

Chart.register(...registerables);

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
    labels: props.data.map(item => item.date),
    datasets: [
      {
        pointStyle: false,
        label: 'Dataset 1',
        data: props.data.map(item => item.value),
        tension: 0.1,
        borderWidth: -4,
        borderColor: '#954CE9',
        borderJoinStyle: 'round',
        fill: true,
        backgroundColor: (ctx) => {
          const colors = {
            purple: {
              default: "rgba(149, 76, 233, 1)",
              half: "rgba(149, 76, 233, 0.5)",
              quarter: "rgba(149, 76, 233, 0.25)",
              zero: "rgba(149, 76, 233, 0)"
            },
            indigo: {
              default: "rgba(80, 102, 120, 1)",
              quarter: "rgba(80, 102, 120, 0.25)"
            }
          }

          const canvas = ctx.chart.ctx;
          const gradient = canvas.createLinearGradient(0, 25, 0, 300);
          gradient.addColorStop(0, colors.purple.half);
          gradient.addColorStop(0.35, colors.purple.quarter);
          gradient.addColorStop(1, colors.purple.zero);

          return gradient;
        },
      }
    ]
  }
})

const chartOptions = ref({
  plugins: {
    legend: { display: false }
  },
  scales: {
    x: {
      display: false
    },
    y: {
      display: false
    },
  },
  responsive: true,
})
</script>

<style scoped></style>
