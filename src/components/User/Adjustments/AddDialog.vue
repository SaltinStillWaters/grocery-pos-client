<template>
  <v-card elevation="0" class="rounded-lg">
    <v-card-title
      class="d-flex align-center px-4 py-3 bg-blue-grey-lighten-5 border-bottom"
    >
      <v-icon icon="mdi-package-down" color="blue-grey-darken-2" class="me-2" />
      <span class="text-subtitle-1 font-weight-bold text-blue-grey-darken-4">
        {{ isEditMode ? "Edit Adjustment" : "Adjust Stock" }}
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
        @submit.prevent="submit"
      >
        <v-row>
            <v-col cols="12" class="py-0">
              <v-autocomplete
                v-model="formData.EAN"
                :items="matchedProducts"
                item-title="name"
                item-value="EAN"
                :loading="isLoadingMatches"
                @update:search="debounceSearch"
                @update:model-value="handleNameUpdate"
                :custom-filter="() => true"
                :rules="[rules.required]"
                
                label="Search Product (EAN or Name)"
                placeholder="Start typing..."
                clearable
              />
              
            </v-col>
         
          <v-col cols="12" sm="6" class="py-0">
            <v-text-field
              v-model.number="formData.change"
              label="Change"
              prepend-inner-icon="mdi-counter"
              variant="outlined"
              density="comfortable"
              color="blue-grey-darken-2"
              type="number"
              hide-details="auto"
              :rules="[rules.required]"
            />
          </v-col>

          <v-col cols="12" class="py-0">
            <v-textarea
              v-model.number="formData.reason"
              label="Reason"
              prepend-inner-icon="mdi-format-text"
              variant="outlined"
              density="comfortable"
              color="blue-grey-darken-2"
              hide-details="auto"
              auto-grow
            />
          </v-col>

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
        @click="submit"
      >
        {{ isEditMode ? "Update Adjustment" : "Adjust" }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import api from "@/axios";
import { ref, reactive, computed, onMounted } from "vue";

const emit = defineEmits(["close", "add", "update"]);

const props = defineProps<{
  item?: {
    EAN: string,
    name: string,
    change: number,
    reason: string,
  };
}>();

const formRef = ref<any>(null);
const isFormValid = ref(false);
const formData = reactive({
  EAN: "",
  name: "",
  change: 0,
  reason: "",
});

const isEditMode = computed(
  () => !!props.item && Object.keys(props.item).length > 0,
);

onMounted(() => {
  if (isEditMode.value && props.item) {
    formData.EAN = props.item.EAN || "";
    formData.name = props.item.name || "";
    formData.change = props.item.change || 0;
    formData.reason = props.item.reason || "";
  }
});

const rules = {
  required: (v: any) => !!v || "This field is required",
};

const submit = async () => {
  const { valid } = await formRef.value.validate();

  if (valid) {
    const payload = { ...formData }

    if (isEditMode.value)
      emit('update', payload)
    else
      emit('add', payload)
    
    formRef.value.reset();
  }
};

const handleNameUpdate = () => {
  matchedProducts.value.forEach((match) => {
    if (match.EAN === formData.EAN) {
      formData.name = match.name
      return
    }
  })
}

// Product Search
const matchedProducts = ref([]);
const isLoadingMatches = ref(false);

let debounceId: NodeJS.Timeout;

function debounceSearch(querySearch: string) {
  if (!querySearch && !formData.EAN)  
    return;

  if (debounceId) 
    clearTimeout(debounceId);
  
  debounceId = setTimeout(() => {
    search(querySearch);
  }, 500);
}

async function search(querySearch: string) {
  if (!querySearch) return

  isLoadingMatches.value = true;

  const query: any = {};
  const isNumeric = /^\d+$/.test(querySearch);

  if (isNumeric)
    query.EAN = querySearch;
  else
    query.name = querySearch.toUpperCase();

  const result = await api.get("products/matches", {
    params: query,
  });
  matchedProducts.value = result.data.data;
  isLoadingMatches.value = false;
}
</script>
