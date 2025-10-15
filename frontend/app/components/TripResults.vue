<template>
  <div>
    <!-- Trip Header -->
    <TripHeader :itinerary="itinerary" @share="shareTrip" @export-pdf="exportPDF" />

    <!-- Tabs -->
    <TripTabs v-model:active-tab="activeTab" />

    <!-- Tab Content -->
    <TripOverview v-if="activeTab === 'overview'" :itinerary="itinerary" />
    <TripItinerary v-if="activeTab === 'itinerary'" :itinerary="itinerary" />
    <TripBudget v-if="activeTab === 'budget'" :itinerary="itinerary" @export-json="exportJSON" @export-pdf="exportPDF" />
    <TripMap v-if="activeTab === 'map'" />

    <button
      @click="$emit('new-trip')"
      class="mt-6 w-full py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
    >
      Create New Trip
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  itinerary: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['new-trip'])

const activeTab = ref('overview')

const exportPDF = () => {
  alert('PDF export would be generated here using jsPDF or similar library')
}

const exportJSON = () => {
  const dataStr = JSON.stringify(props.itinerary, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'trip-itinerary.json'
  link.click()
}

const shareTrip = () => {
  if (navigator.share) {
    navigator.share({
      title: 'My Trip to Japan',
      text: 'Check out my AI-generated trip itinerary!',
      url: window.location.href
    })
  } else {
    alert('Share link copied to clipboard!')
  }
}
</script>
