<template>
  <v-card border class="mb-4 d-flex" width="880" height="110">
    <v-card-text class="d-flex align-center pa-4 w-100">
     
      <div class="d-flex flex-column grow mr-16">
       
        <div class="d-flex align-center mb-4">
          <div class="text-title-large font-weight-bold mr-2">
            {{ property.title }}
          </div>
          <v-chip size="small" color="primary" variant="flat">
            {{ property.status }}
          </v-chip>
        </div>
 
        <div class="d-flex align-center text-caption text-medium-emphasis">
          <v-chip size="small" color="primary" variant="flat" class="mr-1">
            {{ property.intent }}
          </v-chip>
         
          <v-icon size="small" color="error">
            mdi-map-marker
          </v-icon>
          <span class="text-truncate">
            {{ property.location }}
          </span>
        </div>
      </div>
 
      <div
        class="d-flex flex-column align-end ml-13"
      >
        <div class="mb-1">
          Lot Size:
          <span class="font-weight-medium text-high-emphasis">{{ property.lotSize }}</span>
        </div>
 
        <div class="mb-1">
          Floor Area:
          <span class="font-weight-medium text-high-emphasis">{{ property.floorArea }}</span>
        </div>
 
        <Amenities
          :beds="property.beds"
          :bathrooms="property.bathrooms"
          :car-spaces="property.carSpaces"
        />
      </div>
 
      <v-divider vertical class="mx-4 shrink-0" />
     
      <v-btn
        icon="mdi-comment-outline"
        size="small"
        variant="text"
        class="ml-2 shrink-0"
        aria-label="Open comments"
      />
     
    </v-card-text>
  </v-card>
</template>
 
<script setup>
import Amenities from './Shared/Ammenities.vue'
 
defineProps({
  property: {
    type: Object,
    required: true
  }
})
</script>