<template>
    <div class="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
      <h3 class="text-2xl font-bold text-gray-900 mb-6">Detailed Budget Breakdown</h3>
      <div class="grid grid-cols-2 gap-6">
        <div
          v-for="([category, amount]) in Object.entries(itinerary.budgetBreakdown)"
          :key="category"
          class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6"
        >
          <h4 class="text-lg font-semibold text-gray-900 capitalize mb-2">{{ category }}</h4>
          <p class="text-3xl font-bold text-indigo-600 mb-3">RM {{ amount }}</p>
          <div class="w-full bg-gray-300 rounded-full h-3">
            <div
              class="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full"
              :style="{ width: `${(amount / 2000) * 100}%` }"
            />
          </div>
        </div>
      </div>
      <div class="mt-8 flex gap-4">
        <button @click="$emit('export-json')" class="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
          Export as JSON
        </button>
        <button @click="$emit('export-pdf')" class="flex-1 bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all">
          Download PDF
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    itinerary: {
      type: Object,
      required: true
    }
  })
  
  defineEmits(['export-json', 'export-pdf'])
  </script>