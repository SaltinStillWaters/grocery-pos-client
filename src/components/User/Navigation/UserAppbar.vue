<template>
  <v-app-bar flat color="white" border="b" height="72" class="px-2">

    <v-app-bar-title>
      <div class="d-flex align-center ga-2 cursor-pointer" @click="router.push('/')">
        <v-avatar color="primary" variant="tonal" size="36" rounded="lg">
          <v-icon size="22">mdi-home-city</v-icon>
        </v-avatar>
        <span class="text-h6 font-weight-black text-primary tracking-tight" style="letter-spacing: -0.5px;">EstateVue</span>
      </div>
    </v-app-bar-title>

    <template v-slot:append>
      
      <div class="d-none d-md-flex align-center ga-3 mr-6">
        <v-btn 
          prepend-icon="mdi-cart-plus" 
          color="primary" 
          variant="flat" 
          rounded="pill"
          class="text-none px-5 font-weight-bold"
          elevation="0"
        >
          Sell
        </v-btn>
        
        <v-btn 
          prepend-icon="mdi-plus" 
          color="primary"
          variant="tonal" 
          rounded="pill"
          class="text-none px-4 font-weight-medium"
          :to="{
            name: 'Products/Add'
          }"
        >
          Product
        </v-btn>

        <v-btn 
          prepend-icon="mdi-package-variant-closed" 
          color="grey-darken-2"
          variant="text" 
          rounded="pill"
          class="text-none px-3 font-weight-medium"
          :to="{
            name: 'Restocks/Add'
          }"
        >
          Restock
        </v-btn>

        <v-btn 
          prepend-icon="mdi-tune" 
          color="grey-darken-2"
          variant="text" 
          rounded="pill"
          class="text-none px-3 font-weight-medium"
        >
          Adjust
        </v-btn>
      </div>

      <v-menu min-width="240" rounded="xl" :offset="[12, 0]" transition="slide-y-transition">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            variant="outlined"
            color="grey-lighten-2"
            rounded="pill"
            class="text-none pl-1 pr-3 h-auto py-1 border-opacity-75"
            elevation="0"
          >
            <div class="d-flex align-center">
              <v-avatar size="32" color="primary" class="mr-2">
                <span class="text-white text-caption font-weight-bold">{{ initials }}</span>
              </v-avatar>
              <span class="d-none d-sm-inline text-body-2 text-grey-darken-3 font-weight-bold text-capitalize mr-1">
                {{ userName }}
              </span>
              <v-icon size="20" color="grey-darken-1">mdi-chevron-down</v-icon>
            </div>
          </v-btn>
        </template>

        <v-card elevation="8" rounded="xl" border>
          <v-list-item class="pa-4">
            <template v-slot:prepend>
              <v-avatar color="primary" variant="tonal" size="48" class="mr-3">
                <span class="text-primary font-weight-bold text-subtitle-1">{{ initials }}</span>
              </v-avatar>
            </template>
            <v-list-item-title class="font-weight-bold text-body-1">{{ userName }}</v-list-item-title>
            <v-list-item-subtitle class="text-caption mt-1">{{ userEmail }}</v-list-item-subtitle>
          </v-list-item>

          <v-divider class="mb-2" />

          <v-list density="compact" nav class="px-2 pb-2">
            <v-list-item
              prepend-icon="mdi-account-outline"
              title="My Profile"
              rounded="lg"
              class="mb-1"
            />
            <v-list-item
              prepend-icon="mdi-cog-outline"
              title="Account Settings"
              rounded="lg"
              class="mb-1"
            />
            <v-divider class="my-2" />
            <v-list-item
              prepend-icon="mdi-logout"
              title="Sign out"
              rounded="lg"
              base-color="error"
              @click="logout"
            />
          </v-list>
        </v-card>
      </v-menu>

    </template>
  </v-app-bar>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const emit      = defineEmits(['toggle-drawer'])
const router    = useRouter()
const authStore = useAuthStore()

const userName  = computed(() => authStore.user?.username || 'User')
const userEmail = computed(() => authStore.user?.email || 'user@example.com') 
const initials  = computed(() =>
  userName.value.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
)

const logout = async () => {
  await authStore.logout()
  console.log('logging out')
}
</script>