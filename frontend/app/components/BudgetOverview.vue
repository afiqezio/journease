<template>
  <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <h3 class="text-xl font-bold text-gray-900 mb-4">Budget Overview</h3>
    <div class="space-y-3">
      <div v-for="([key, value]) in Object.entries(budgetBreakdown)" :key="key">
        <div class="flex justify-between mb-1">
          <span class="text-sm text-gray-600 capitalize">{{ key }}</span>
          <span class="text-sm font-semibold text-gray-900">RM {{ value }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all"
            :style="{ width: `${(value / 2000) * 100}%` }"
          />
        </div>
      </div>
    </div>
    <div class="mt-4 pt-4 border-t border-gray-200">
      <div class="flex justify-between items-center">
        <span class="font-semibold text-gray-900">Total</span>
        <span class="text-2xl font-bold text-indigo-600">
          RM {{ totalBudget }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  budgetBreakdown: {
    type: Object,
    required: true
  }
})

const totalBudget = computed(() => {
  return Object.values(props.budgetBreakdown).reduce((a, b) => a + b, 0)
})
</script>
