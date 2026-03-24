<template>
  <v-container>
    <h1 class="text-h4 mb-6">Property Cards Component Admin</h1>

    <BaseCard 
      v-for="item in allPropertiesList" 
      :key="item.id" 
      :property="item"
    />

  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import BaseCard from '@/components/User/PropertyCard/BaseCard.vue'

const allPropertiesList = ref([
  { 
    id: 1, 
    code: 'A-RIZ024',
    type: 'sale',
    propertyType: 'Residential: Condominium',
    title: 'Luxury Condo', 
    status: 'Popular',
    location: 'Pasig',
    price: 15000000, 
    image: 'https://loremflickr.com/340/190/condominium?lock=${1}', 
    brokerAvatar: 'https://i.pravatar.cc/30',
    brokerName: 'Ervin Josh Pejo',
    brokerPosition: 'Real Estate Broker',
    tags: ['Popular', 'Fully Furnished', 'Repriced'],
    beds: 2,
    bathrooms: 2,
    carSpaces: 1,
    sqft: 120
  },
  { 
    id: 2, 
    code: 'A-RIZ024',
    type: 'rent',
    propertyType: 'Residential: Condominium',
    title: 'Beachfront Lot', 
    status: 'New Listing',
    location: 'Rizal',
    price: 30000, 
    image: 'https://loremflickr.com/340/190/condominium,building?lock=15',
    brokerAvatar: 'https://i.pravatar.cc/',
    brokerName: 'Mychal Andrei Pejana',
    brokerPosition: 'Professional Full-Stack Developer',
    tags: ['Popular', 'Fully Furnished', 'PlaceHolder'],
    beds: 4,
    bathrooms: 2,
    carSpaces: 3,
    sqft: 140
  },
  { 
    id: 3, 
    type: 'wanted',
    title: 'Looking for House & Lot',
    propertyType: 'House & Lot',
    status: 'Unpublished',
    intent: 'Renting',
    location: 'Pasay City',
    lotSize: '300 sqm',
    floorArea: '300 sqm',
    beds: 2,
    bathrooms: 3,
    carSpaces: 1,
  
  },
  
])

</script>