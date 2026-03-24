<template>
  <v-card border min-height="160">
    <v-card-item>
      <template v-slot:title>
        <div class="font-weight-bold text-truncate">
          {{ requirement.title }}
        </div>
      </template>
      <template v-slot:append>
        <v-btn icon="mdi-heart-outline" size="small" variant="text" color="black" density="compact" aria-label="Save requirement" />
      </template>
    </v-card-item>

    <v-card-text class="pt-0">

      <div class="d-flex align-center mb-3">
        <v-chip size="small" color="success" variant="flat" class="font-weight-bold mr-2 text-white text-uppercase">
          {{ requirement.type }}
        </v-chip>

        <v-icon size="small" color="error" class="mr-1">
          mdi-map-marker
        </v-icon>

        <span class="text-body-2 font-weight-bold text-grey-darken-4">
          {{ requirement.location }}
        </span>
      </div>

      <div class="text-body-2 text-grey-darken-4">
        <div v-if="requirement.lotSize">Lot Size: {{ requirement.lotSize }} sqm</div>
        <div v-else>Lot Size: n/a</div>
        
        <div v-if="requirement.floorArea">Floor Area: {{ requirement.floorArea }} sqm</div>
        <div v-else>Floor Area: n/a</div>
      </div>

      <v-divider class="my-2"/>

      <Amenities :amenities="requirement.amenities" />

    </v-card-text>
  </v-card>
</template>

<script setup>
import Amenities from './Shared/Ammenities.vue'

defineProps({
  /* EXAMPLE INPUT:
  {
    title: string,
    location: string,
    type: string // 'buying', 'selling'
    lotSize: number,
    floorArea: number,
    amenities: [
      type: string, // 'BED', 'BATH', 'LOT', 'CAR'
      count: number
    ]
  }
  */
  requirement: {
    type: Object,
    required: true
  }
})
</script>