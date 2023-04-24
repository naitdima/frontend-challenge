<template>
  <ApexChart
    v-if="data.length > 0"
    width="200"
    :options="chartOptions"
    :series="chartSeries"
  />
</template>

<script setup lang="ts">
import ApexChart from 'vue3-apexcharts'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  data: number[]
}>(), {
  data: () => []
})

const chartOptions = {
  chart: {
    type: 'area',
    toolbar: {
      show: false
    },
  },
  grid: {
    show: false
  },
  legend: {
    show: false
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    labels: {
      show: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    crosshairs: {
      show: false
    },
    tooltip: {
      enabled: false
    }
  },
  yaxis: {
    labels: {
      show: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    crosshairs: {
      show: false
    },
    tooltip: {
      enabled: false
    }
  },
  // responsive: [{
  //   breakpoint: undefined,
  //   options: {},
  // }]
}

const chartSeries = computed(() => {
  return [
    {
      data: props.data,
    }
  ]
})
</script>

<style scoped>
</style>
