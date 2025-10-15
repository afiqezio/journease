<template>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <PlacesList :places="itinerary.places" />
        <RestaurantsList :restaurants="itinerary.restaurants" />
      </div>
  
      <div class="space-y-6">
        <BudgetOverview :budget-breakdown="itinerary.budgetBreakdown" />
        <TravelTips />
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