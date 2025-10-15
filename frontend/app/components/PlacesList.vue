<template>
    <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Icon name="lucide:map-pin" class="w-5 h-5 text-indigo-600" />
        Top Places to Visit
      </h3>
      <div class="space-y-3">
        <div
          v-for="(place, i) in places"
          :key="i"
          class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div class="bg-indigo-100 p-2 rounded-lg">
            <Icon name="lucide:camera" class="w-5 h-5 text-indigo-600" />
          </div>
          <div class="flex-1">
            <h4 class="font-semibold text-gray-900">{{ place.name }}</h4>
            <p class="text-sm text-gray-600">{{ place.type }}</p>
          </div>
          <div class="text-right">
            <p class="text-sm font-medium text-gray-900">{{ place.cost }}</p>
            <p class="text-xs text-gray-500">{{ place.duration }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    places: {
      type: Array,
      required: true
    }
  })
  </script>