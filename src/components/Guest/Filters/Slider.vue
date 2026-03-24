<template>
    <v-range-slider v-model="sliderRange" :min="0" :max="100" :step="0.1" strict thumb-label="always" color="primary"
        track-color="blue-lighten-4" class="mt-4">
        <template v-slot:thumb-label="{ modelValue }">
            {{prependText + formatActual(toActual(modelValue)) + appendText}}
        </template>
    </v-range-slider>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    max: {
        type: Number,
        default: 1000
    },
    power: {
        type: Number,
        default: 3
    },
    prependText: {
        type: String,
        default: ''
    },
    appendText: {
        type: String,
        default: ''
    }
})

const emits = defineEmits([
    'update'
])
const toSlider = (priceVal) => {
    return 100 * Math.pow(priceVal / props.max, 1 / props.power);
};

const toActual = (sliderVal) => {
    const price = props.max * Math.pow(sliderVal / 100, props.power);
    return Math.round(price * 10) / 10;
};

const formatActual = (val) => {
    return val % 1 === 0 ? val : val.toFixed(1);
};


const sliderRange = ref([
    toSlider(0),
    toSlider(props.max)
]);

const actualRange = computed(() => {
    const range = [
        toActual(sliderRange.value[0]),
        toActual(sliderRange.value[1])
    ];

    emits( 'update', range );
    return range;
});
</script>