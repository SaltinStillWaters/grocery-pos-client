<template>
  <v-card elevation="0" class="rounded-lg">
    <v-card-title
      class="d-flex align-center px-4 py-3 bg-blue-grey-lighten-5 border-bottom"
    >
      <v-icon icon="mdi-package-down" color="blue-grey-darken-2" class="me-2" />
      <span class="text-subtitle-1 font-weight-bold text-blue-grey-darken-4">
        {{ isEditMode ? "Edit Restock Entry" : "Add Restock Entry" }}
      </span>
      <v-spacer />
      <v-btn
        icon="mdi-close"
        variant="text"
        density="comfortable"
        color="grey-darken-1"
        @click="$emit('close')"
      />
    </v-card-title>

    <v-divider />

    <v-card-text class="pa-5">
      <v-form
        ref="formRef"
        v-model="isFormValid"
        @submit.prevent="submitRestock"
      >
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="formData.EAN"
              label="EAN / Barcode"
              prepend-inner-icon="mdi-barcode-scan"
              variant="outlined"
              density="comfortable"
              color="blue-grey-darken-2"
              :rules="[rules.required]"
              placeholder="Scan or type barcode"
              hide-details="auto"
            />
          </v-col>

          <v-col cols="12" sm="6" class="py-0">
            <v-text-field
              v-model.number="formData.quantity"
              label="Quantity"
              prepend-inner-icon="mdi-counter"
              variant="outlined"
              density="comfortable"
              color="blue-grey-darken-2"
              type="number"
              min="1"
              hide-details="auto"
              :rules="[rules.required, rules.minOne]"
            />
          </v-col>

          <v-col cols="12" sm="6" class="py-0">
            <v-text-field
              v-model.number="formData.unitCost"
              label="Unit Cost"
              prepend-inner-icon="mdi-currency-php"
              variant="outlined"
              density="comfortable"
              color="blue-grey-darken-2"
              type="number"
              min="0"
              hide-details="auto"
              :rules="[rules.required, rules.minZero]"
            />
          </v-col>

          <v-col cols="12" class="pt-0">
            <v-checkbox
              v-model="formData.isNewProduct"
              label="This is a new product"
              color="blue-grey-darken-2"
              density="compact"
              hide-details="auto"
              @update:model-value="handleNewProductToggle"
            />
          </v-col>

          <template v-if="formData.isNewProduct">
            <v-col cols="12" class="pt-2">
              <v-text-field
                v-model="formData.name"
                label="Product Name"
                prepend-inner-icon="mdi-format-text"
                variant="outlined"
                density="comfortable"
                color="blue-grey-darken-2"
                :rules="[rules.required]"
                hide-details="auto"
              />
            </v-col>

            <v-col cols="12" sm="6" class="py-0">
              <v-text-field
                v-model.number="formData.price"
                label="Selling Price"
                prepend-inner-icon="mdi-tag-outline"
                variant="outlined"
                density="comfortable"
                color="blue-grey-darken-2"
                type="number"
                min="0"
                hide-details="auto"
                :rules="[rules.required, rules.minZero]"
              />
            </v-col>
          </template>
        </v-row>
      </v-form>
    </v-card-text>

    <v-divider />

    <v-card-actions class="px-5 py-3 bg-grey-lighten-5">
      <v-spacer />
      <v-btn
        color="grey-darken-2"
        variant="text"
        class="text-none px-4"
        @click="$emit('close')"
      >
        Cancel
      </v-btn>
      <v-btn
        color="blue-grey-darken-2"
        variant="flat"
        class="text-none px-6"
        :prepend-icon="isEditMode ? 'mdi-content-save' : 'mdi-plus'"
        :disabled="!isFormValid"
        @click="submitRestock"
      >
        {{ isEditMode ? "Update Restock" : "Add Restock" }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";

const emit = defineEmits(["close", "add", "update"]);

// Updated props to match the new restock schema
const props = defineProps<{
  item?: {
    EAN?: string;
    quantity?: number;
    unitCost?: number;
    isNewProduct?: boolean;
    name?: string;
    price?: number;
  };
}>();

const formRef = ref<any>(null);
const isFormValid = ref(false);

const formData = reactive({
  EAN: "",
  quantity: null as number | null,
  unitCost: null as number | null,
  isNewProduct: false,
  name: "",
  price: null as number | null,
});

// Check if we have an item prop passed in
const isEditMode = computed(
  () => !!props.item && Object.keys(props.item).length > 0,
);

onMounted(() => {
  if (isEditMode.value && props.item) {
    formData.EAN = props.item.EAN || "";
    formData.quantity = props.item.quantity || null;
    formData.unitCost = props.item.unitCost || null;
    formData.isNewProduct = props.item.isNewProduct || false;
    formData.name = props.item.name || "";
    formData.price = props.item.price || null;
  }
});

const rules = {
  required: (v: any) => !!v || "This field is required",
  minZero: (v: number) => v >= 0 || "Cannot be negative",
  minOne: (v: number) => v >= 1 || "Must be at least 1",
};

// Clear out name and price if the user unchecks the "New Product" box
const handleNewProductToggle = (isNew: boolean) => {
  if (!isNew) {
    formData.name = "";
    formData.price = null;
  }
};

const submitRestock = async () => {
  const { valid } = await formRef.value.validate();

  if (valid) {
    // Only send name and price if it's a new product
    const payload = { ...formData };
    if (!payload.isNewProduct) {
      delete payload.name;
      delete payload.price;
    }

    if (isEditMode.value) {
      emit("update", payload);
    } else {
      emit("add", payload);
    }
    formRef.value.reset();
  }
};
</script>
