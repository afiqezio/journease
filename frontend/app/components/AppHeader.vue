<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl">
            <Icon name="lucide:map" class="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              TripGenius AI
            </h1>
            <p class="text-xs text-gray-500">Your intelligent travel companion</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button class="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
            My Trips
          </button>
          <button class="px-4 py-2 text-sm bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
            Sign In
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
// Header-specific logic
</script>
