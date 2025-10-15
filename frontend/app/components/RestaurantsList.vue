<template>
    <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Icon name="lucide:utensils" class="w-5 h-5 text-purple-600" />
        Recommended Restaurants
      </h3>
      <div class="space-y-3">
        <div
          v-for="(restaurant, i) in restaurants"
          :key="i"
          class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div>
            <h4 class="font-semibold text-gray-900">{{ restaurant.name }}</h4>
            <p class="text-sm text-gray-600">{{ restaurant.cuisine }}</p>
          </div>
          <div class="text-right">
            <p class="text-sm font-medium text-gray-900">{{ restaurant.budget }}</p>
            <p class="text-xs text-yellow-600">★ {{ restaurant.rating }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    restaurants: {
      type: Array,
      required: true
    }
  })
  </script>