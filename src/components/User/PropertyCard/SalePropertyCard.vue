<template>
  <v-card class="mb-4 d-flex flex-row" border width="880" height="198">
    
    <v-img 
  :src="property.image" 
  width="320" 
  height="100%" 
  cover
  class="flex-grow-0 flex-shrink-0"
>
  <div class="d-flex flex-column justify-space-between h-100">
    
    <div class="pa-2 d-flex">
      <MainTags :status="property.status" />
      <v-spacer />
      <v-icon size="large" color="info" class="mr-1">mdi-sign-direction</v-icon>
    </div>

    <div 
      class="d-flex align-center pa-2 w-100" 
      style="background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);"
    >
      <v-avatar size="28" class="mr-2">
        <v-img :src="property.brokerAvatar" alt="Broker avatar" />
      </v-avatar>
      
      <div>
        <div class="text-title-small text-white font-weight-bold line-clamp-1">
          {{ property.brokerName }}
        </div>
        <div class="text-title-small text-white text-overline" style="line-height: 1;">
          {{ property.brokerPosition }}
        </div>
      </div>
      
      <v-spacer />
      <v-btn size="small" color="white" variant="flat">Export</v-btn>
    </div>

  </div>
</v-img>

    <v-card-text class="d-flex flex-column pa-4 grow">
      
      <div class="d-flex align-center mb-1">
        <div class="text-headline-medium font-weight-bold mr-2 text-truncate">
          {{ property.title }}
        </div>
        <v-spacer />
        <div class="text-title-large font-weight-bold text-primary text-no-wrap">
          &#8369;{{ property.price.toLocaleString() }}
          <span v-if="property.type == 'rent'" class="text-caption text-medium-emphasis">/month</span>
        </div>
      </div>

      <div class="d-flex align-center text-caption text-medium-emphasis mb-1">
        <span>{{ property.code }}</span>
        <v-divider vertical class="mx-2" />
        <span>{{ property.propertyType }}</span>
        <v-spacer />
        <v-chip size="small" color="primary" variant="flat">Published</v-chip>
      </div>

      <div class="d-flex align-center text-caption text-medium-emphasis mb-2">
        <v-icon size="small" color="error" class="mr-1">mdi-map-marker</v-icon>
        <span class="text-truncate">{{ property.location }}</span>
      </div>

      <div class="d-flex flex-wrap align-center ga-1 mb-2">
        <SubTags :tags="property.tags" />
        <v-spacer />
        <v-btn icon="mdi-comment-outline" size="small" variant="text" density="comfortable" />
      </div>

      <v-spacer />
      <v-divider class="mb-3" />

      <Amenities 
        :beds="property.beds" 
        :bathrooms="property.bathrooms" 
        :car-spaces="property.carSpaces" 
        :sqft="property.sqft" 
      />
      
    </v-card-text>
  </v-card>
</template>

<script setup>
import Amenities from './Shared/Ammenities.vue';
import MainTags from './Shared/MainTags.vue';
import SubTags from './Shared/SubTags.vue';

defineProps({
  property: { 
    type: Object, 
    required: true 
  },
});
</script>