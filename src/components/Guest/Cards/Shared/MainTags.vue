<template>
    <div class="ribbon-wrapper">

        <v-chip class="text-uppercase text-caption font-weight-bold px-4 custom-rounded" :color="colorStatus"
            size="default" variant="elevated" :prepend-icon="iconStatus">
            {{ status }}
        </v-chip>

        <div class="ribbon-fold" :style="{ borderTopColor: shadowColor }"></div>

    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    status: {
        type: String,
        default: () => ""
    }
})

const colorStatus = computed(() => {
    if (props.status === "Popular") return "#6366F1"
    if (props.status === "Rare Deal") return "#EF4444"
    return "#16A34A"
})

const shadowColor = computed(() => {
    if (props.status === "Popular") return "#3730A3"
    if (props.status === "Rare Deal") return "#991B1B"
    return "#14532D"
})

const iconStatus = computed(() => {
    if (props.status === "Popular") return "mdi-auto-fix"
    if (props.status === "Rare Deal") return "mdi-fire"
    return "mdi-flash"
})
</script>

<style scoped>
.ribbon-wrapper {
    position: relative;
    display: inline-block;
}

.custom-rounded {
    border-radius: 8px 8px 8px 0 !important;
}

.ribbon-fold {
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 0;
    height: 0;

    border-top: 10px solid;

    /* IMPORTANT: This width must exactly match the negative 'left' offset 
     you set on the parent v-card (e.g., left: -10px) */
    border-left: 10px solid transparent;
}
</style>