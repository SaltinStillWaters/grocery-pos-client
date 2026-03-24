<template>
  <v-btn :variant="currentVariant" rounded="0" elevation="8" color="primary" class="text-none px-3" @click="onClick">
    {{ label }}
  </v-btn>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  label: { // text to be shown
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false // false = variant: 'outlined'; true = variant: 'flat'
  },
  type: {
    type: String,
    default: 'toggle' // Options: 'fixed', 'toggle'
  },
  clickEnabled: { // Controls whether the click event changes the button's active state or not
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['clicked'])

const active = ref(props.active)

const currentVariant = computed(() => {
  if (props.type === 'fixed')
    return props.variant

  return active.value ? 'flat' : 'outlined'
})

const onClick = () => {
  if (props.clickEnabled) {
    active.value = !active.value
  }
  emit('clicked')
}

watch(
  () => props.active,
  () => active.value = props.active
)
</script>