<template>
  <v-text-field v-model="value" type="number" :label="label" variant="outlined" :min="min" :max="max"
    :step="step"></v-text-field>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  min: {
    type: Number,
    default: 1
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: Number,
    default: 1
  },
})

const value = defineModel({ default: 0 });
</script>