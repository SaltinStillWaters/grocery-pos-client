<template>
    <v-chip
        v-for="tag in tags"
        :key="tag"
        size="small"
        variant="flat"
        color="primary"
        >
        {{ tag }}
    </v-chip>

</template>

<script setup>
    const props = defineProps({
        tags: {
            type: Array
        }
    })

</script>