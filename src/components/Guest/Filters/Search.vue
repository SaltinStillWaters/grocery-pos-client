<template>
    <v-card rounded="lg" elevation="8" class="pa-2">
        <v-row density="compact" align="center" class="ga-2">
            <!-- Search -->
            <v-col cols="12" sm="10">
                <v-row>
                    <v-col cols="12" sm="5">
                        <v-text-field v-model="search" variant="solo" flat density="comfortable" hide-details
                            prepend-inner-icon="mdi-magnify" placeholder="Search by: Property Type, Keyword..." />
                    </v-col>

                    <v-divider vertical />

                    <!-- Location -->
                    <v-col cols="12" sm="5">
                        <v-text-field v-model="location" variant="solo" flat density="comfortable" hide-details
                            prepend-inner-icon="mdi-map-marker-outline"
                            placeholder="City, neighborhood, or address..." />
                    </v-col>
                </v-row>
            </v-col>

            <!-- Buttons -->
            <v-col cols="12" sm="2" class="flex-grow-1 flex-sm-grow-0">
                <v-row density="compact" align="center" class="ga-2">
                    <v-col cols="0" sm="3" class="flex-grow-1 flex-sm-grow-0">
                    </v-col>

                    <!-- Find -->
                    <v-col cols="12" sm="6" class="flex-grow-1 flex-sm-grow-0">
                        <v-btn color="primary" block size="large" rounded="lg" variant="flat" @click="onFind">
                            Find
                        </v-btn>
                    </v-col>

                    <!-- Sort -->
                    <v-col cols="12" sm="3">
                        <v-col cols="12" class="d-flex justify-center">
                            <v-menu>
                                <template v-slot:activator="{ props }">
                                    <v-btn v-bind="props" icon="mdi-sort" variant="outlined" flat class="bg-white"
                                        rounded="lg" elevation="8"></v-btn>
                                </template>

                                <v-list>
                                    <v-list-item v-for="item in sortSelection" :key="item" @click="onSort(item)">
                                        <v-list-item-title>{{ item }}</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-col>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-card>
</template>

<script setup>
import { ref } from 'vue';

const search = ref('')
const location = ref('')
const sortSelection = ['Recent', 'Relevant', 'Price', 'Popularity', 'Alphabetical', 'Nearest']

const onFind = () => {
    console.log('clicked')
}

const onSort = (item) => {
    console.log('sort by', item)
}
</script>