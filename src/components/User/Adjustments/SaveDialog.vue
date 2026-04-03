<template>
  <v-card elevation="0" class="rounded-lg">
    <v-card-title
      class="d-flex align-center px-4 py-3 bg-blue-grey-lighten-5 border-bottom"
    >
      <v-icon icon="mdi-package-down" color="blue-grey-darken-2" class="me-2" />
      <span class="text-subtitle-1 font-weight-bold text-blue-grey-darken-4">
        {{ "Save Restock Info" }}
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
        @submit.prevent="save"
      >
        <v-row>
          <v-col cols="12" class="py-0">
            <v-text-field
              v-model="formData.descripton"
              label="Description"
              clearable
              prepend-inner-icon="mdi-format-text"
              variant="outlined"
              density="comfortable"
              color="blue-grey-darken-2"
              hide-details="auto"
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
        :prepend-icon="'mdi-content-save'"
        :disabled="!isFormValid"
        @click="save"
      >
        {{ "Save" }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import api from "@/axios";
import { Color, useUIStore } from "@/stores/ui";
import { ref, reactive } from "vue";

const emit = defineEmits(["close", "save"]);

const formRef = ref<any>(null);
const isFormValid = ref(false);

const formData = reactive({
  descripton: "",
});

const rules = {
  required: (v: any) => !!v || "This field is required",
};

const save = async () => {
  const { valid } = await formRef.value.validate();

  if (valid) {
    emit("save", formData)
    formRef.value.reset();
  }
};

const uiStore = useUIStore();

</script>
