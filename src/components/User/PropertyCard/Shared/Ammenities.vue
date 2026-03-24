<template>
  <div class="d-flex align-center ga-4 text-body-small">
   
    <div v-if="beds" class="d-flex align-center ga-1">
      <v-icon icon="mdi-bed" size="small" />
      <span>{{ beds }} Beds</span>
    </div>
   
    <div v-if="bathrooms" class="d-flex align-center ga-1">
      <v-icon icon="mdi-shower" size="small" />
      <span>{{ bathrooms }} Bathrooms</span>
    </div>
   
    <div v-if="carSpaces" class="d-flex align-center ga-1">
      <v-icon icon="mdi-car" size="small" />
      <span>{{ carSpaces }} Car spaces</span>
    </div>
   
    <div v-if="sqft" class="d-flex align-center ga-1">
      <v-icon icon="mdi-ruler-square" size="small" />
      <span>{{ sqft }} sqft</span>
    </div>
   
  </div>
</template>
 
<script setup>
defineProps({
  beds: { type: Number },
  bathrooms: { type: Number },
  carSpaces: { type: Number },
  sqft: { type: Number },
});
</script>