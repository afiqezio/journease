<template>
    <div class="space-y-6">
      <div
        v-for="(day, i) in itinerary.days"
        :key="i"
        class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div class="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
          <h3 class="text-xl font-bold">Day {{ day.day }}</h3>
          <p class="text-indigo-100">{{ day.title }}</p>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="(activity, j) in day.activities" :key="j" class="flex gap-4">
              <div class="flex flex-col items-center">
                <div class="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
                  {{ activity.time }}
                </div>
                <div v-if="j < day.activities.length - 1" class="w-0.5 h-12 bg-indigo-200 my-2" />
              </div>
              <div class="flex-1 pb-4">
                <div class="flex items-start justify-between">
                  <div>
                    <h4 class="font-semibold text-gray-900">{{ activity.name }}</h4>
                    <p class="text-sm text-gray-500 capitalize">{{ activity.type }}</p>
                  </div>
                  <span class="text-sm font-medium text-gray-900">
                    {{ activity.cost > 0 ? `RM ${activity.cost}` : 'Free' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  </script>