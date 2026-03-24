<template>
    <Button v-for="(label, ctr) in labels" :key="`${label}-${ctr}`" :label="label" @clicked="onClick(`${label}`)"
        :active="!!active[`${label}-${ctr}`]" :click-enabled="false" />
</template>

<script setup>
import { ref } from 'vue';
import Button from './Button.vue';

const props = defineProps({
    labels: { // List of button labels. Each label corresponds to a button
        type: Array,
        required: true
    },
    toggles: { // Specifies how many buttons can be toggled at the same time
        type: String,
        default: 'none' // Options: 'many', 'one', 'none'
    }
})

const emits = defineEmits([
    'transactionType'
])

const active = ref({})
const onClick = (key) => {
    if (props.toggles === 'one')
        active.value = { [key]: true }
    else if (props.toggles === 'many')
        active.value = {
            ...active.value,
            [key]: !active.value[key]
        }
    else if (props.toggles === 'none')
        return //for now, no need to have anything here

    const selected = Object.keys(active.value).filter(k => active.value[k])
    emits('transactionType', selected);
}
</script>