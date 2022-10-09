<script setup>
import { defineProps } from 'vue';
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
)

const props = defineProps({
  chartData: {
    type: Object,
    required: true
  },
  chartOptions: {
    type: Object,
    default: {}
  },
})

</script>


<template>
  <Line :chart-data="props.chartData" :chart-options="props.chartOptions"
    class="w-[var(--width,calc(vw))] sm:w-[var(--width,calc(50vw))]" />
</template>

