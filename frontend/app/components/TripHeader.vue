<template>
    <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white mb-6 shadow-xl">
      <div class="flex items-start justify-between mb-4">
        <div>
          <h2 class="text-3xl font-bold mb-2">{{ itinerary.destination }} Adventure</h2>
          <div class="flex items-center gap-4 text-indigo-100">
            <span class="flex items-center gap-1">
              <Icon name="lucide:calendar" class="w-4 h-4" />
              {{ itinerary.duration }}
            </span>
            <span class="flex items-center gap-1">
              <Icon name="lucide:dollar-sign" class="w-4 h-4" />
              {{ itinerary.budget }}
            </span>
            <div class="flex gap-2">
              <span
                v-for="(theme, i) in itinerary.theme"
                :key="i"
                class="px-3 py-1 bg-white/20 rounded-full text-xs"
              >
                {{ theme }}
              </span>
            </div>
          </div>
        </div>
        <div class="flex gap-2">
          <button @click="$emit('share')" class="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
            <Icon name="lucide:share-2" class="w-5 h-5" />
          </button>
          <button class="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
            <Icon name="lucide:save" class="w-5 h-5" />
          </button>
          <button @click="$emit('export-pdf')" class="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
            <Icon name="lucide:download" class="w-5 h-5" />
          </button>
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
  
  defineEmits(['share', 'export-pdf'])
  </script>