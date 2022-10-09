<script setup>
import { reactive, ref } from "vue";
import LineCanvas from "../components/LineCanvas.vue";
import Setting from "../components/Setting.vue";
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
import ColorInput from 'vue-color-input'
import { provideToast, useToast, POSITION, TYPE } from "vue-toastification";
import "vue-toastification/dist/index.css";

provideToast({ timeout: 1500 })

const chartData = reactive({
  labels: [0, 1, 2, 3, 4, 5, 6],
  datasets: [
    {
      data: [7, 10, 8, 15, 20, 22, 17]
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
const tension = ref(30)

const handleTensionChange = (value) => {
  chartOptions.elements.line.tension = value / 100;
}


const copyLineCanvas = () => {
  const canvas = document.getElementById("line-canvas")


  canvas.toBlob((blob) => {
    const item = new ClipboardItem({ "image/png": blob });
    navigator.clipboard.write([item]);

    const toast = useToast();

    toast("Copied", { type: TYPE.DEFAULT })
  });

}

const addPoint = () => {
  chartData.labels.push(0)
  chartData.datasets[0].data.push(0)
}


const downloadAsImage = () => {
  const canvas = document.getElementById("line-canvas")

  const link = document.createElement('a');

  link.download = 'line.png';
  link.href = canvas.toDataURL("image/png")
  link.click();
}

</script>

<template >
  <div class="sm:p-10 sm:flex w-full">
    <div class="sm:w-3/5 flex flex-col items-center">
      <LineCanvas class="border rounded-lg" chart-id="line-canvas" :chartData="chartData"
        :chartOptions="chartOptions" />

      <div class="flex justify-center mt-10">
        <button
          class="m-1 group relative flex justify-center rounded-md border border-transparent bg-gray-700 py-2 px-4 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
          @click="copyLineCanvas">
          Copy
        </button>

        <button
          class="m-1 group relative flex justify-center rounded-md border border-transparent bg-gray-700 py-2 px-4 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
          @click="downloadAsImage">
          Download
        </button>
      </div>

    </div>

    <div class="grow pl-5 mr-10 sm:w-[calc(100%/3-1rem)]">

      <div class="mb-10">
        Data
        <div class="flex">
          <div class="flex overflow-scroll">
            <template v-for="(item, index) in chartData.datasets[0].data" :key="index">
              <input class="border px-2 rounded mr-1 mt-2 w-14" v-model="chartData.datasets[0].data[index]" />
            </template>
          </div>
          <button
            class="mt-2 group relative flex justify-center rounded-md border border-transparent bg-gray-700 py-2 px-4 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
            @click="addPoint">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="24" height="24"
              viewBox="0 0 24 24" stroke-width="1.5" stroke="white" fill="none" stroke-linecap="round"
              stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>


      </div>
      <div>
        Color
        <div class="mt-1 mb-2">
          <ColorInput v-model="chartOptions.elements.line.borderColor" ref="colorInput" />
        </div>

        Tension
        <VueSlider class="mb-5" v-model="tension" min="0" max="100" interval="1" @change="handleTensionChange"
          :dot-style="{borderColor: '#4B5563'}" :process-style="{backgroundColor: '#4B5563'}">
        </VueSlider>

        Line width
        <VueSlider v-model="chartOptions.elements.line.borderWidth" min="1" max="100" interval="1"
          :dot-style="{borderColor: '#4B5563'}" :process-style="{backgroundColor: '#4B5563'}"></VueSlider>
      </div>

    </div>

  </div>
</template>

<style>
.color-input.user .box {
  @apply rounded-lg;
}

.color-input.user .picker-popup {
  @apply rounded-lg;
}

.color-input.user .saturation-area {
  @apply rounded-lg;
}

.color-input.user .saturation-area .slider-canvas {
  @apply rounded-t-lg;
}

.color-input.user .saturation-area .saturation-pointer {
  @apply cursor-pointer;
}

.color-input.user .picker-popup {
  @apply shadow-none border;
}

.color-input.user .slider-pointer {
  @apply w-5 h-5 cursor-pointer;
}

.color-input.user .text-input {
  @apply border rounded;
}

.Vue-Toastification__toast--default.simple-toast {
  @apply bg-gray-800;
}
</style>
