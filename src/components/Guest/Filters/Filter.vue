<template>
    <v-card class="px-1" max-width="400
    " subtitle="Filter">
        <v-row density="compact" align="start">
            <v-col cols="12">
                <v-card variant="flat" class="pt-2 pl-5 pr-6">
                    <Dropdown v-model="propertyType"/>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card variant="flat" class="pl-5 pr-6" subtitle="Transaction Type">
                    <ButtonGroup :labels="['Rent', 'Sale', 'Foreclosed']" toggles="one" @transaction-type="updateTransactionType" />
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card variant="flat" class="pl-5 pr-6" subtitle="Price Range (In ₱1,000,000)">
                    <Slider prepend-text="₱" append-text="M" @update="updatePriceRange"/>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card variant="flat" class="pl-5 pr-6" subtitle="Lot Area (in sqm)">
                    <Slider append-text="sqm"  @update="updateLotArea"/>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card variant="flat" class="pl-5 pr-6" subtitle="Floor Area (in sqm)">
                    <Slider append-text="sqm"  @update="updateFloorArea"/>
                </v-card>
            </v-col>
            <v-col cols="12">
                <CheckboxGroup v-model="amenities" label="Ammenities"
                    :items="['Kitchen', 'Parking', 'CCTV', 'Security', 'Parking', 'Gym', 'Pet-friendly']" />
            </v-col>
            <v-col cols="12">
                <CheckboxGroup v-model="tags" label="Tags" :items="['New', 'Pre-owned', 'Fully-furnished', 'Bare Unit']" />
            </v-col>
            <v-col cols="12">
                <v-card variant="flat" class="px-5" subtitle="Features">
                    <v-row density="compact" align="start">
                        <v-col cols="6">
                            <NumberInput label="Beds" />
                        </v-col>
                        <v-col cols="6">
                            <NumberInput label="Baths" />
                        </v-col>
                        <v-col cols="12">
                            <NumberInput label="Car Spaces" />
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-btn @click="applyFilters"></v-btn>
    </v-card>
</template>

<script setup>
import { ref } from 'vue';
import ButtonGroup from './ButtonGroup.vue';
import CheckboxGroup from './CheckboxGroup.vue';
import NumberInput from './NumberInput.vue';
import Slider from './Slider.vue';
import Dropdown from './Dropdown.vue';

const propertyType = ref(null)
const transactionType = ref(null)
const priceRange = ref([])
const floorArea = ref([])
const lotArea = ref([])
const amenities = ref()
const tags = ref()
const beds = ref()
const baths = ref()
const cars = ref()

const updateTransactionType = (value) => {
    transactionType.value = value
}

const updatePriceRange = (value) => {
    priceRange.value = value
}

const updateLotArea = (value) => {
    lotArea.value = value
}

const updateFloorArea = (value) => {
    floorArea.value = value
}
</script>