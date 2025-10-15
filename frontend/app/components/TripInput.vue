<template>
    <div class="max-w-3xl mx-auto">
      <!-- Input Section -->
      <div class="text-center mb-8">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">
          Describe Your Dream Trip
        </h2>
        <p class="text-lg text-gray-600">
          Tell us about your travel plans and let AI create the perfect itinerary for you
        </p>
      </div>
  
      <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Trip Description
          </label>
          <textarea
            v-model="tripDescription"
            placeholder="e.g., 5 days in Japan under RM3000, I love nature and food"
            class="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-400"
          />
        </div>
  
        <TripFeatures />
  
        <button
          @click="handleGenerate"
          :disabled="!tripDescription || isGenerating"
          class="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <div v-if="isGenerating" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <Icon v-else name="lucide:sparkles" class="w-5 h-5" />
          {{ isGenerating ? 'Generating Your Perfect Trip...' : 'Generate Itinerary with AI' }}
        </button>
      </div>
  
      <TripStats />
    </div>
  </template>
  
  <script setup>
  const tripDescription = ref('')
  const isGenerating = ref(false)
  
  const emit = defineEmits(['generate'])
  
  const handleGenerate = () => {
    isGenerating.value = true
    emit('generate', tripDescription.value)
  }
  
  // Watch for external changes to isGenerating
  const props = defineProps({
    generating: {
      type: Boolean,
      default: false
    }
  })
  
  watch(() => props.generating, (newVal) => {
    isGenerating.value = newVal
  })
  </script>