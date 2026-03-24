<template>
  <v-navigation-drawer
    v-model="drawerModel"
    :rail="rail"
    permanent
    color="#0A303C"
    width="260"
  >
    <!-- Logo area at top -->
    <v-list-item
      class="py-4"
      :prepend-icon="rail ? undefined : 'mdi-home-city'"
    >
      <template v-if="rail" v-slot:prepend>
        <v-icon color="amber-darken-2">mdi-home-city</v-icon>
      </template>
      <v-list-item-title v-if="!rail" class="text-white font-weight-bold text-subtitle-1">
        EstateVue
      </v-list-item-title>
    </v-list-item>

    <v-divider class="opacity-20 mb-2" />

    <v-list nav density="comfortable">

      <!-- Main -->
      <v-list-subheader v-if="!rail" class="text-uppercase text-caption font-weight-bold opacity-50 text-white">
        Main
      </v-list-subheader>

      <v-list-item
        prepend-icon="mdi-view-dashboard-outline"
        title="Dashboard"
        to="/dashboard"
        rounded="lg"
        color="amber-darken-2"
        base-color="white"
      />

      <v-list-item
        prepend-icon="mdi-chart-bar"
        title="Analytics"
        to="/analytics"
        rounded="lg"
        color="amber-darken-2"
        base-color="white"
      />

      <v-divider v-if="!rail" class="my-3 opacity-20" />

      <!-- Real Estate -->
      <v-list-subheader v-if="!rail" class="text-uppercase text-caption font-weight-bold opacity-50 text-white">
        Real Estate
      </v-list-subheader>

      <v-list-item
        prepend-icon="mdi-home-search-outline"
        title="Inventory"
        :to="{ name: 'Inventory' }"
        rounded="lg"
        color="amber-darken-2"
        base-color="white"
      />

      <v-list-item
        prepend-icon="mdi-map-marker-multiple-outline"
        title="Restock History"
        rounded="lg"
        color="amber-darken-2"
        base-color="white"
      />

      <v-list-item
        prepend-icon="mdi-account-tie-outline"
        title="Clients"
        rounded="lg"
        color="amber-darken-2"
        base-color="white"
      />

      <v-list-item
        prepend-icon="mdi-calendar-check-outline"
        title="Appointments"
        rounded="lg"
        color="amber-darken-2"
        base-color="white"
      />

      <v-divider v-if="!rail" class="my-3 opacity-20" />

      <!-- Admin -->
      <v-list-subheader v-if="!rail" class="text-uppercase text-caption font-weight-bold opacity-50 text-white">
        Admin
      </v-list-subheader>

      <v-list-item
        prepend-icon="mdi-account-multiple-outline"
        title="Users"
        rounded="lg"
        color="amber-darken-2"
        base-color="white"
      />

      <v-list-item
        prepend-icon="mdi-shield-account-outline"
        title="Roles"
        rounded="lg"
        color="amber-darken-2"
        base-color="white"
      />

    </v-list>

    <!-- Collapse toggle pinned to bottom -->
    <!-- <template v-slot:append>
      <v-divider class="opacity-20" />
      <v-list-item
        :prepend-icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
        :title="rail ? '' : 'Collapse'"
        rounded="lg"
        base-color="white"
        class="opacity-60 my-1"
        @click="rail = !rail"
      />
    </template> -->

  </v-navigation-drawer>
</template>

<script setup>
import Inventory from '@/views/User/Inventory.vue'
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits(['update:modelValue'])

const drawerModel = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const rail = ref(false)
</script>