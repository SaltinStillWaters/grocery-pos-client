<template>
  <v-chip
    v-if="status"
    :color="currentStatus.color"
    :prepend-icon="currentStatus.icon"
    size="small"
    variant="elevated"
    class="font-weight-bold text-caption"
  >
    {{ status }}
  </v-chip>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  status: {
    type: String,
    default: "",
  }
});


const statusConfig = {
  'Popular': { color: 'purple', icon: 'mdi-star' },
  'New Listing': { color: 'success', icon: 'mdi-flash' },
};


const currentStatus = computed(() => {
  return statusConfig[props.status] ?? { color: 'grey', icon: 'mdi-information' };
});
</script>