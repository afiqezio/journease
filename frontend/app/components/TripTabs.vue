<template>
    <div class="flex gap-2 mb-6 bg-white rounded-xl p-2 shadow-sm">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="$emit('update:activeTab', tab)"
        :class="[
          'flex-1 py-3 px-4 rounded-lg font-medium transition-all capitalize',
          activeTab === tab
            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
            : 'text-gray-600 hover:bg-gray-50'
        ]"
      >
        {{ tab }}
      </button>
    </div>
  </template>
  
  <script setup>
  const tabs = ['overview', 'itinerary', 'budget', 'map']
  
  const props = defineProps({
    activeTab: {
      type: String,
      default: 'overview'
    }
  })
  
  defineEmits(['update:activeTab'])
  </script>