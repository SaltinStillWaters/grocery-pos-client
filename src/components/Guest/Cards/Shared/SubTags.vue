<template>
  <div class="d-flex justify-space-between">
    <v-chip v-for="tag in tags" :key="tag" color="primary" variant="flat" size="small" class="text-contain-small pa-2">
      {{ tag }}
    </v-chip>
  </div>
</template>

<script setup>
const props = defineProps({
  tags: {
    type: Array
  }
})

</script>