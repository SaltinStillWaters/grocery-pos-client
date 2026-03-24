<template>
    <v-select v-model="propertyType" :items="propertyOptions" label="Property Type" variant="outlined"
        :menu-props="{ location: 'end top' }" hide-details>
        <template v-slot:item="{ props, item }">

            <v-list-subheader v-if="item.raw?.type === 'subheader'">
                <span class="text-high-emphasis font-weight-black text-subtitle-1" style="opacity: 1;">
                    {{ item.raw.title }}
                </span>
            </v-list-subheader>

            <v-list-item v-else v-bind="props" class="text-medium-emphasis"></v-list-item>

        </template>
    </v-select>
</template>

<script setup>

const propertyType = defineModel();

const emit = defineEmits(
    'propertyType'
)


// By adding "type: 'subheader'", Vuetify automatically knows 
// these aren't clickable/selectable options
const propertyOptions = [
    { type: 'subheader', title: 'Residential' },
    { title: 'House & Lot', value: 'House & Lot' },
    { title: 'Town House', value: 'Town House' },
    { title: 'Condominium', value: 'Condominium' },
    { title: 'Residential Lot', value: 'Residential Lot' },
    { title: 'Apartment', value: 'Apartment' },

    { type: 'subheader', title: 'Commercial' },
    { title: 'Building', value: 'Building' },
    { title: 'Office', value: 'Office' },
    { title: 'Retail Space', value: 'Retail Space' },
    { title: 'Dormitories', value: 'Dormitories' },
    { title: 'Commercial Lot', value: 'Commercial Lot' },

    { type: 'subheader', title: 'Industrial' },
    { title: 'Warehouse', value: 'Warehouse' },
    { title: 'Factory', value: 'Factory' },
    { title: 'Commissary', value: 'Commissary' },
    { title: 'Industrial Lot', value: 'Industrial Lot' }
];
</script>