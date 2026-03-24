<template>
    <v-card flat class="pa-4">
        <v-card-subtitle class="pb-2">
            {{ label }}
            <v-btn v-show="selected.length > 0" icon="mdi-refresh" density="compact" @click="onReset" />
        </v-card-subtitle>

        <v-card-text class="pt-0 overflow-y-auto" style="max-height: 200px;">
            <v-checkbox v-for="item in items" :key="item" v-model="selected" :label="item" :value="item" hide-details
                density="comfortable" color="primary" />
        </v-card-text>
    </v-card>
</template>

<script setup>

const props = defineProps({
    items: {
        type: Array,
        default: () => []
    },
    label: {
        type: String,
        required: true
    }
})

const selected = defineModel({ default: () => [] });

const onReset = () => {
    selected.value = []
}
</script>