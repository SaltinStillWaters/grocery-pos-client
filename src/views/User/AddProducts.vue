<template>
  <v-card elevation="2" class="rounded-lg border">
    <v-card-title class="d-flex align-center px-4 py-3 bg-grey-lighten-4">
      <v-icon
        icon="mdi-package-variant-closed"
        color="amber-darken-2"
        class="me-2"
      />
      <span class="text-subtitle-1 font-weight-bold">New Products Draft</span>
      <v-spacer />
      <div class="d-flex ga-2">
        <v-btn
          color="amber-darken-2"
          variant="flat"
          prepend-icon="mdi-plus"
          size="small"
          @click="openAddDialog"
        >
          Add Product
        </v-btn>

        <v-btn
          color="green-darken-2"
          variant="flat"
          prepend-icon="mdi-content-save"
          size="small"
          @click="saveToDB"
        >
          Save All to Database
        </v-btn>
      </div>
    </v-card-title>

    <v-divider />

    <v-card-text class="bg-grey-lighten-5 pt-4">
      <v-row align="center">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="search"
            label="Search drafted products..."
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="compact"
            bg-color="white"
            hide-details
            color="amber-darken-2"
            clearable
          />
        </v-col>
        <v-spacer />

        <v-col cols="12" md="2">
          <v-btn
            color="grey-darken-2"
            variant="tonal"
            prepend-icon="mdi-delete-sweep-outline"
            block
            @click="items = []"
          >
            Clear Drafts
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>

    <v-divider />

    <v-data-table
      v-model:items-per-page="limit"
      :headers="headers"
      :items="items"
      :search="search"
      hover
    >
      <template v-slot:no-data>
        <div class="pa-4 text-grey-darken-1">
          No new products added yet. Click "Add Product" to start.
        </div>
      </template>

      <template v-slot:item.EAN="{ item }">
        <span v-if="item.autoGenerateEAN" class="text-grey-darken-1 font-italic">
          [Auto-Generated]
        </span>
        <span v-else>{{ item.EAN }}</span>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="d-flex justify-end ga-1">
          <v-btn
            icon="mdi-pencil"
            variant="text"
            color="blue-darken-2"
            size="small"
            density="comfortable"
            @click="editDraft(item)"
          />
          <v-btn
            icon="mdi-delete"
            variant="text"
            color="red-darken-2"
            size="small"
            density="comfortable"
            @click="deleteDraft(item)"
          />
        </div>
      </template>
    </v-data-table>
  </v-card>

  <v-dialog v-model="isAddDialogOpen" max-width="500" destroy-on-close>
    <add-product 
      @close="isAddDialogOpen = false" 
      @add="handleNewProduct" 
      @update="updateDraft" 
      v-bind="editItem" 
      :item="editItem"
    />
  </v-dialog>
</template>

<script setup>
import api from "@/axios";
import AddProduct from "@/components/User/AddProduct.vue";
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";

const isAddDialogOpen = ref(false);
const authStore = useAuthStore()
const limit = ref(5);
const search = ref("");
const items = ref([]); 

const editItem = ref({});
const editIndex = ref(-1);

const headers = ref([
  { title: "EAN", align: "start", sortable: true, key: "EAN" },
  { title: "Name", key: "name", align: "start", sortable: true },
  { title: "Price", key: "price", align: "start", sortable: true },
  { title: "Actions", key: "actions", align: "end", sortable: false }, 
]);

const saveToDB = async () => {
  const user = authStore.user.id
  console.log({user})
  const result = await api.post('/products/bulk', {
    newProducts: items.value,
    user
  });

  console.log(result)
}

const openAddDialog = () => {
  editItem.value = {}; 
  editIndex.value = -1; 
  isAddDialogOpen.value = true;
};

// Catches the emitted ADD data from the dialog and pushes it to the table
const handleNewProduct = (newProduct) => {
  items.value.push(newProduct);
  isAddDialogOpen.value = false;
};

// Opens the dialog for an EXISTING product
const editDraft = (item) => {
  editIndex.value = items.value.indexOf(item); // Track WHICH item we are editing
  editItem.value = { ...item }; // Pass a COPY of the item to the form
  isAddDialogOpen.value = true;
};

// Catches the emitted UPDATE data and overwrites the existing table row
const updateDraft = (updatedProduct) => {
  if (editIndex.value > -1) {
    // Replace the old item with the newly edited one at the same index
    items.value[editIndex.value] = updatedProduct; 
  }
  isAddDialogOpen.value = false;
};

// Deletes a specific item from the drafts array
const deleteDraft = (item) => {
  const index = items.value.indexOf(item);
  if (index > -1) {
    items.value.splice(index, 1);
  }
};
</script>