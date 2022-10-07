<script setup>
import { reactive, ref } from "vue";
import LineCanvas from "../components/LineCanvas.vue";
import Setting from "../components/Setting.vue";
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

const chartData = reactive({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      data: [1, 100, 1, 100, 1, 100, 1, 100]
    }
  ]
})

const chartOptions = reactive({
  layout: {
    padding: 75
  },
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 16 / 9,
  elements: {
    line: {
      tension: 0.3,
      borderColor: "#9AA3B0",
      borderWidth: 10,
      borderCapStyle: "round",
      borderJoinStyle: "round"
    },
    point: {
      radius: 0
    }
  },
  scales: {
    x: {
      display: false
    },
    y: {
      display: false
    }
  },
  plugins: {
    legend: {
      display: false
    },
  }
})

const handleTensionChange = (value) => {
  chartOptions.elements.line.tension = value / 100
}

const tension = ref(30)

const copyLineCanvas = () => {
  const canvas = document.getElementById("line-canvas")

  canvas.toBlob((blob) => {
    const item = new ClipboardItem({ "image/png": blob });
    navigator.clipboard.write([item]);
  });

}
</script>

<template >
  <div class="p-10 flex">
    <div class="w-3/5 flex flex-col items-center">
      <LineCanvas class="border rounded-lg" chart-id="line-canvas" :chartData="chartData"
        :chartOptions="chartOptions" />

      <div class="flex justify-center mt-10">
        <button
          class="m-1 group relative flex justify-center rounded-md border border-transparent bg-gray-700 py-2 px-4 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
          @click="copyLineCanvas">
          Copy
        </button>

        <button v-if="false"
          class="m-1 group relative flex justify-center rounded-md border border-transparent bg-gray-700 py-2 px-4 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
          @click="copyLineCanvas">
          Download
        </button>
      </div>

    </div>

    <div class="grow pl-5 mr-10">
      Tension
      <VueSlider class="mb-5" v-model="tension" min="0" max="100" interval="1" @change="handleTensionChange"
        :dot-style="{borderColor: '#4B5563'}" :process-style="{backgroundColor: '#4B5563'}">
      </VueSlider>

      Line width
      <VueSlider v-model="chartOptions.elements.line.borderWidth" min="1" max="100" interval="1"
        :dot-style="{borderColor: '#4B5563'}" :process-style="{backgroundColor: '#4B5563'}"></VueSlider>
    </div>

  </div>
</template>

<style scoped>

</style>
