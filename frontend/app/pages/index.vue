<template>
  <div>
    <TripInput 
      v-if="!itinerary" 
      :generating="isGenerating"
      @generate="generateItinerary" 
    />
    <TripResults 
      v-else 
      :itinerary="itinerary" 
      @new-trip="resetTrip" 
    />
  </div>
</template>

<script setup>
// Vue 3 Composition API
const isGenerating = ref(false)
const itinerary = ref(null)

// Methods
const generateItinerary = (description) => {
  isGenerating.value = true
  
  // Simulate AI generation
  setTimeout(() => {
    itinerary.value = {
      destination: 'Japan',
      duration: '5 days',
      budget: 'RM 3,000',
      theme: ['Nature', 'Food'],
      days: [
        {
          day: 1,
          title: 'Arrival & Tokyo Exploration',
          activities: [
            { time: '09:00', name: 'Arrive at Narita Airport', type: 'transport', cost: 0 },
            { time: '11:00', name: 'Narita Express to Tokyo', type: 'transport', cost: 50 },
            { time: '13:00', name: 'Lunch at Tsukiji Outer Market', type: 'food', cost: 25 },
            { time: '15:00', name: 'Senso-ji Temple Visit', type: 'attraction', cost: 0 },
            { time: '18:00', name: 'Dinner at Ramen Alley', type: 'food', cost: 15 }
          ]
        },
        {
          day: 2,
          title: 'Mt. Fuji & Hakone Nature Day',
          activities: [
            { time: '07:00', name: 'Train to Hakone', type: 'transport', cost: 40 },
            { time: '10:00', name: 'Lake Ashi Boat Cruise', type: 'attraction', cost: 30 },
            { time: '13:00', name: 'Traditional Kaiseki Lunch', type: 'food', cost: 45 },
            { time: '15:00', name: 'Hakone Open-Air Museum', type: 'attraction', cost: 20 },
            { time: '19:00', name: 'Return to Tokyo', type: 'transport', cost: 40 }
          ]
        },
        {
          day: 3,
          title: 'Kyoto Cultural Experience',
          activities: [
            { time: '08:00', name: 'Shinkansen to Kyoto', type: 'transport', cost: 120 },
            { time: '11:00', name: 'Fushimi Inari Shrine Hike', type: 'attraction', cost: 0 },
            { time: '14:00', name: 'Lunch at Nishiki Market', type: 'food', cost: 20 },
            { time: '16:00', name: 'Arashiyama Bamboo Grove', type: 'attraction', cost: 0 },
            { time: '19:00', name: 'Traditional Izakaya Dinner', type: 'food', cost: 30 }
          ]
        }
      ],
      budgetBreakdown: {
        accommodation: 600,
        food: 450,
        transport: 380,
        attractions: 270,
        miscellaneous: 300
      },
      restaurants: [
        { name: 'Tsukiji Outer Market', cuisine: 'Seafood', budget: 'RM 25', rating: 4.8 },
        { name: 'Ichiran Ramen', cuisine: 'Ramen', budget: 'RM 15', rating: 4.7 },
        { name: 'Nishiki Market Stalls', cuisine: 'Street Food', budget: 'RM 20', rating: 4.6 }
      ],
      places: [
        { name: 'Senso-ji Temple', type: 'Cultural', duration: '2 hours', cost: 'Free' },
        { name: 'Lake Ashi', type: 'Nature', duration: '3 hours', cost: 'RM 30' },
        { name: 'Fushimi Inari', type: 'Cultural & Nature', duration: '3 hours', cost: 'Free' }
      ]
    }
    isGenerating.value = false
  }, 2000)
}

const resetTrip = () => {
  itinerary.value = null
  isGenerating.value = false
}
</script>