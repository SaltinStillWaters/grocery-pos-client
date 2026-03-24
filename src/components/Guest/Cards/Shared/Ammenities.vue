<template>
  <div class="d-flex align-center justify-space-between w-100">

    <div v-for="amenity in amenities" class="d-flex align-center ga-1 text-no-wrap">
      <v-icon class="text-label-large " :icon="iconMap[amenity?.type]" color="primary" size="small" />
      <span class="text-medium-emphasis text-label-medium">
        {{ amenity?.count }} {{ appendMap[amenity?.type] }}
      </span>
    </div>

  </div>
</template>

<script setup>
const props = defineProps({
  /* SAMPLE INPUT:
  [
    {
      type: string, // 'BED', 'CAR', 'BATH', 'LOT'
      count: number
    },
  ]
  */
  amenities: {
    type: Array,
    required: true
  }
});

const iconMap = {
  'BED': 'mdi-bed-outline',
  'CAR': 'mdi-car',
  'BATH': 'mdi-shower',
  'LOT': 'mdi-ruler-square',
}

const appendMap = {
  'BED': 'beds',
  'CAR': 'cars',
  'BATH': 'baths',
  'LOT': 'sqm',
}

</script>
