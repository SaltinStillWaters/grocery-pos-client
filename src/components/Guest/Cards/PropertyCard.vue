<template>
  <v-card class="mb-4 position-relative" rounded="lg" style="overflow: visible !important;">

    <v-img :src="property.image" height="170" cover class="rounded-t-lg" />

    <div class="position-absolute" style="top: 170px; left: -10px; transform: translateY(-50%); z-index: 2;">
      <MainTags :status="property.status" />
    </div>

    <v-card-item class="pt-7 pb-0">

      <div class="d-flex align-center pb-1">
        <span class="text-title-large font-weight-semibold text-primary">
          ₱{{ property.price.toLocaleString() }}
        </span>
        <span v-if="property.type === 'rent'" class="text-caption text-medium-emphasis ml-1 mt-1">
          /month
        </span>

        <v-spacer />

        <v-btn icon="mdi-heart-outline" size="medium" variant="text" color="primary" />
      </div>

      <div class="text-title-large font-weight-bold">
        {{ property.title }}
      </div>

      <div class="px-0 mt-1 text-body-medium text-weight-bold">
        {{ property.code }}
      </div>

      <div class="d-flex align-center text-body-large text-medium-emphasis pt-1 pb-3">
        {{ property.location }}, NCR
      </div>

      <div class="mb-3">
        <SubTags :tags="property.tags" />
      </div>
    </v-card-item>

    <v-divider />

    <v-card-actions class="px-4 py-3">
      <Amenities :amenities="property.amenities" />
    </v-card-actions>

  </v-card>
</template>

<script setup>
import Amenities from "./Shared/Ammenities.vue";
import MainTags from "./Shared/MainTags.vue";
import SubTags from "./Shared/SubTags.vue";

defineProps({
  property: {
    type: Object,
    required: true,
  },
});
</script>