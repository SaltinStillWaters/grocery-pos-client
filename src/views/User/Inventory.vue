<template>
  <v-card elevation="2" class="rounded-lg border">
    <v-card-title class="d-flex align-center px-4 py-3 bg-grey-lighten-4">
      <v-icon
        icon="mdi-package-variant-closed"
        color="amber-darken-2"
        class="me-2"
      />
      <span class="text-subtitle-1 font-weight-bold">Inventory</span>
      <v-spacer />
      <div class="d-flex ga-2">
        <v-btn
          color="amber-darken-2"
          variant="flat"
          prepend-icon="mdi-plus"
          size="small"
        >
          Add Product
        </v-btn>
        <v-btn
          color="amber-darken-2"
          variant="flat"
          prepend-icon="mdi-package-up"
          size="small"
        >
          Restock
        </v-btn>
        <v-btn
          color="amber-darken-2"
          variant="flat"
          prepend-icon="mdi-pencil"
          size="small"
        >
          Adjust
        </v-btn>
      </div>
    </v-card-title>

    <v-divider />

    <v-card-text class="bg-grey-lighten-5 pt-4">
      <v-row dense align="center">
        <v-col cols="12" md="3">
          <v-text-field
            v-model="searchEAN"
            label="EAN / Barcode"
            prepend-inner-icon="mdi-barcode-scan"
            variant="outlined"
            density="compact"
            bg-color="white"
            color="amber-darken-2"
            clearable
            hide-details
            :disabled="!!searchStock"
            @keyup.enter="fetchInventory"
          />
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="searchName"
            label="Product Name"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="compact"
            bg-color="white"
            color="amber-darken-2"
            clearable
            hide-details
            :disabled="!!searchStock"
            @keyup.enter="fetchInventory"
          />
        </v-col>

        <v-col cols="12" md="1" class="text-center">
          <span class="text-caption font-weight-bold text-grey-darken-1"
            >OR</span
          >
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field
            v-model="searchStock"
            label="Max Stock Level"
            prepend-inner-icon="mdi-package-down"
            variant="outlined"
            density="compact"
            bg-color="white"
            color="amber-darken-2"
            type="number"
            clearable
            hide-details
            :disabled="!!searchEAN || !!searchName"
            @keyup.enter="fetchInventory"
          />
        </v-col>

        <v-col cols="12" md="2">
          <v-btn
            color="amber-darken-2"
            variant="flat"
            prepend-icon="mdi-magnify"
            block
            @click="fetchInventory"
          >
            Search
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>

    <v-divider />

    <v-data-table-server
      v-model:items-per-page="limit"
      :headers="headers"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      item-value="ean"
      hover
      @update:options="fetchInventory"
    >
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@5" />
      </template>
    </v-data-table-server>
  </v-card>
</template>

<script setup>
import api from "@/axios";
import { ref } from "vue";

const loading = ref(true);
const limit = ref(5);
const totalItems = ref(0);
const searchName = ref("");
const searchEAN = ref("");
const searchStock = ref();

const headers = ref([
  {
    title: "EAN",
    align: "start",
    sortable: false,
    key: "EAN",
  },
  { title: "Name", key: "name", align: "start", sortable: false },
  { title: "Stock", key: "stock", align: "start", sortable: false },
]);

const serverItems = ref([]);

async function fetchInventory({ page = 1, itemsPerPage }) {
  loading.value = true;
  const result = await api.get(`/inventories`, {
    params: {
      page,
      limit: itemsPerPage ?? limit.value,
      name: searchName.value,
      EAN: searchEAN.value,
      maxStock: searchStock.value,
    },
  });

  serverItems.value = result.data.data.data.map((inventory) => {
    return {
      id: inventory.product._id,
      EAN: inventory.product.EAN,
      name: inventory.product.name,
      stock: inventory.stock,
    };
  });

  totalItems.value = result.data.data.totalItems;
  console.log(totalItems.value);
  loading.value = false;
}
</script>
