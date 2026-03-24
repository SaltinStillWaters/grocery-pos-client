<template>
  <component 
    :is="cardComponent" 
    :property="property" 
    
  />
</template>

<script setup>
import { computed } from 'vue'
import SalePropertyCard from './SalePropertyCard.vue'
import WantedPropertyCard from './WantedPropertyCard.vue'

const props = defineProps({
  property: {
    type: Object,
    required: true
  }
})


const cardComponent = computed(() => {
  if (props.property.type === 'wanted') {
    return WantedPropertyCard
  }
  return SalePropertyCard
})
</script>