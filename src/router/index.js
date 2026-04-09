import { useAuthStore } from '@/stores/auth'
import { Color, useUIStore } from '@/stores/ui'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // GUEST LAYOUT
  {
    path: '/',
    component: () => import('@/layouts/GuestLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Guest/Home.vue'),
        meta: { guest: true },
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/Guest/Login.vue'),
        meta: { guest: true, hideAppBar: true, hideFooter: true },
      },
    ],
  },

  // USER LAYOUT (auth required)
  {
    path: '/admin',
    component: () => import('@/layouts/UserLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/User/Dashboard.vue'),
      },

      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/User/Products/Index.vue'),
      },
      {
        path: 'products/add',
        name: 'Products/Add',
        component: () => import('@/views/User/Products/Add.vue'),
      },

      {
        path: 'inventories',
        name: 'Inventories',
        component: () => import('@/views/User/Inventories.vue'),
      },

      {
        path: 'restocks',
        name: 'Restocks',
        component: () => import('@/views/User/Restock/Index.vue'),
      },
      {
        path: 'restocks/add',
        name: 'Restocks/Add',
        component: () => import('@/views/User/Restock/Add.vue'),
      },
      
      {
        path: 'adjustments',
        name: 'Adjustments',
        component: () => import('@/views/User/Adjustments/Index.vue'),
      },
      {
        path: 'adjustments/add',
        name: 'Adjustments/Add',
        component: () => import('@/views/User/Adjustments/Add.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// Dynamic import error handling
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

// Navigation Guard — use return instead of next() to avoid deprecation warning
router.beforeEach((to) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated

  const requiresAuth = to.matched.some(r => r.meta?.requiresAuth)

  // Not logged in, trying to access protected route → redirect to login
  if (requiresAuth && !isAuthenticated) {
    const uiStore = useUIStore()
    uiStore.queueMessage(Color.ERROR, 'Please log in to continue')
    return { name: 'Login' }
  }

  // Already logged in, trying to access login page → redirect to dashboard
  if (to.name === 'Login' && isAuthenticated) {
    return { name: 'Dashboard' }
  }

  // All good — proceed
  return true
})

export default router