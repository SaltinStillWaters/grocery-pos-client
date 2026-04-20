# GroceryPOS Client Documentation

> A comprehensive guide to the GroceryPOS frontend application.

---

## Table of Contents

1. [Quick Start](#1-quick-start)
2. [Project Overview](#2-project-overview)
3. [Tech Stack](#3-tech-stack)
4. [Folder Structure](#4-folder-structure)
5. [How It All Fits Together](#5-how-it-all-fits-together)
6. [The Routes](#6-the-routes)
7. [State Management](#7-state-management)
8. [Making API Calls](#8-making-api-calls)
9. [Views Guide](#9-views-guide)
10. [Components Guide](#10-components-guide)
11. [Data Types](#11-data-types)
12. [Styling](#12-styling)

---

## 1. Quick Start

### Want to run it?

```bash
cd grocery-pos-client
pnpm install
pnpm run dev
```

### Want to understand it?

Start here. This doc explains everything in plain English.

---

## 2. Project Overview

**What is this?**
GroceryPOS Client is the web interface for a grocery point-of-sale system. It's a Vue 3 Single Page Application (SPA) that lets users:

- Log in to their account
- View a dashboard with stats
- Manage products (add, list, bulk create)
- View inventory levels
- Record restocks with history
- Record stock adjustments with history

**The Big Picture**

```
User clicks something
       ↓
Router figures out which page
       ↓
View component renders
       ↓
Calls API via Axios
       ↓
Data comes back, view updates
```

---

## 3. Tech Stack

| Technology | What It Does |
|------------|--------------|
| **Vue 3** | The framework - handles UI reactivity |
| **Vuetify 4** | Ready-made UI components (buttons, cards, tables) |
| **Vue Router** | Client-side routing (no page reloads) |
| **Pinia** | State management (stores user data, UI state) |
| **Axios** | HTTP client for talking to the API |
| **Vite** | Build tool and dev server |

### All Dependencies

```
vue ^3.5.29
vue-router ^5.0.3
pinia ^3.0.4
vuetify ^4.0.0
axios ^1.13.6
vue-toast-notification ^3.1.3
@mdi/font ^7.4.47
leaflet ^1.9.4
sass ^1.97.3
vite ^7.3.1
```

---

## 4. Folder Structure

```
src/
├── main.js              # App starts here
├── App.vue              # Root component
├── axios.js             # API client setup
├── constant.js          # API URLs and endpoints
├── router/
│   └── index.js         # All route definitions
├── stores/
│   ├── auth.js          # User authentication
│   ├── ui.ts            # Toast notifications
│   └── counter.js       # (example, not used)
├── layouts/
│   ├── GuestLayout.vue  # For login/public pages
│   └── UserLayout.vue   # For authenticated pages
├── views/               # Full pages
│   ├── Guest/
│   │   └── Login.vue
│   └── User/
│       ├── Dashboard.vue
│       ├── Products/Index.vue, Add.vue
│       ├── Inventories.vue
│       ├── Restock/Index.vue, Add.vue
│       └── Adjustments/Index.vue, Add.vue
├── components/          # Reusable pieces
│   ├── Toast.vue
│   ├── Guest/Navigation/
│   │   ├── GuestAppbar.vue
│   │   └── GuestFooter.vue
│   ├── User/Navigation/
│   │   ├── UserAppbar.vue
│   │   └── UserSidebar.vue
│   ├── User/Product/AddDialog.vue
│   ├── User/Restock/
│   │   ├── AddDialog.vue, DetailsDialog.vue, SaveDialog.vue
│   │   └── dto/
│   └── User/Adjustments/
│       ├── AddDialog.vue, DetailsDialog.vue, SaveDialog.vue
│       └── dto/
└── assets/
    ├── logo.svg, logo-white.png
    └── Socials/
```

---

## 5. How It All Fits Together

### The Application Flow

```
┌─────────────────────────────────────────────────────┐
│                    main.js                          │
│  • Registers plugins (Vuetify, Router, Toast)        │
│  • Creates Pinia store                              │
│  • Mounts App to #app                               │
└────────────────────┬────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────┐
│                     App.vue                         │
│  • Renders <RouterView> (the current page)         │
│  • Always shows <Toast> (notifications)             │
│  • Sets Poppins font                               │
└────────────────────┬────────────────────────────────┘
                     ↓
        ┌────────────┴────────────┐
        ↓                         ↓
┌───────────────┐        ┌────────────────┐
│ GuestLayout   │        │  UserLayout    │
│ (public pages)│        │(auth pages)    │
│ • Login page  │        │ • Dashboard    │
└───────────────┘        │ • Products     │
                         │ • Inventories  │
                         │ • Restocks     │
                         │ • Adjustments  │
                         └────────────────┘
```

### Key Files Explained

#### `main.js` - The Bootstrap

```javascript
// Registers plugins
registerPlugins(app)  // Sets up Vuetify, Router, Toast

// Creates state management
app.use(createPinia())

// Makes axios available everywhere as this.$axios
app.config.globalProperties.$axios = axios

// Mounts the app
app.mount('#app')
```

#### `router/index.js` - The Traffic Controller

```javascript
// Routes are grouped by layout
routes = [
  {
    path: '/',                    // Public route
    component: GuestLayout,
    children: [{ path: 'login' }]
  },
  {
    path: '/admin',              // Protected route
    component: UserLayout,
    meta: { requiresAuth: true }, // Needs login
    children: [/* all admin pages */]
  }
]

// Navigation guard runs before every route
router.beforeEach((to) => {
  if (requiresAuth && !isAuthenticated) {
    return { name: 'Login' }  // Kick to login
  }
})
```

#### `stores/auth.js` - User State

```javascript
// What it tracks
user: ref(initialUser)           // Current user
isAuthenticated: computed(() !!user.value)  // Am I logged in?

// What it does
login(username, password)   // POST /auth/login
logout()                    // POST /auth/logout, clear state
fetchMe()                   // GET /auth/profile
```

#### `stores/ui.ts` - Notifications

```javascript
// Simple queue of messages
queue = ref<SnackbarMessage[]>([])

// Add a message
queueMessage(Color.SUCCESS, "Saved!")
```

---

## 6. The Routes

### Public Routes (No Login Required)

| URL | Page | Layout |
|-----|------|--------|
| `/login` | Login form | GuestLayout |

### Protected Routes (Must Be Logged In)

All under `/admin`:

| URL | Page | Description |
|-----|------|-------------|
| `/admin` | Dashboard | Stats, charts, recent activity |
| `/admin/products` | Products | List all products |
| `/admin/products/add` | Add Products | Draft products before saving |
| `/admin/inventories` | Inventories | View stock levels |
| `/admin/restocks` | Restock History | View past restocks |
| `/admin/restocks/add` | Add Restock | Draft restock entries |
| `/admin/adjustments` | Adjustment History | View past adjustments |
| `/admin/adjustments/add` | Add Adjustment | Draft adjustment entries |

### What Happens When You Navigate?

```
User goes to /admin/products
       ↓
Router checks: "requiresAuth?" → Yes
       ↓
Auth store: "isAuthenticated?" → Yes
       ↓
Load Products/Index.vue inside UserLayout
       ↓
Component fetches data from API
       ↓
Table renders with data
```

---

## 7. State Management

### Auth Store (`stores/auth.js`)

Manages user authentication.

```
┌─────────────────────────────────────┐
│           Auth Store                │
├─────────────────────────────────────┤
│ State:                              │
│   user: { id, username, email }     │
│                                     │
│ Getters:                            │
│   isAuthenticated: boolean          │
│                                     │
│ Actions:                            │
│   login(username, password)          │
│   logout()                          │
│   fetchMe()                          │
└─────────────────────────────────────┘
```

**Login Flow:**
```javascript
// In Login.vue
const handleLogin = async () => {
  await authStore.login(form.username, form.password)
  router.push({ name: 'Dashboard' })
}
```

**Logout Flow:**
```javascript
// Anywhere
await authStore.logout()  // Clears user, redirects to login
```

### UI Store (`stores/ui.ts`)

Manages toast notifications.

```javascript
// Show a message
const uiStore = useUIStore()
uiStore.queueMessage(Color.SUCCESS, "Product saved!")
uiStore.queueMessage(Color.ERROR, "Something went wrong")
uiStore.queueMessage(Color.INFO, "Please wait...")
```

This shows a toast at the top-right of the screen for 3 seconds.

---

## 8. Making API Calls

### Axios Setup (`axios.js`)

```javascript
const api = axios.create({
  baseURL: 'http://localhost:3000',  // API base
  timeout: 60000,                     // 60 second timeout
  withCredentials: true,              // Send cookies
})
```

### The Token Refresh Logic

When a request gets a 401 (unauthorized):

```
1. Request fails with 401
2. Check if we're already refreshing
   - If yes: queue this request, wait
   - If no: start refresh process
3. Call POST /auth/refresh
4. On success: replay all queued requests
5. On failure: logout user, show error
```

This ensures users don't get logged out suddenly - the app tries to refresh the token automatically.

### Common API Patterns

**Fetching a list (with pagination):**

```javascript
const result = await api.get('/products', {
  params: {
    page: 1,
    limit: 5,
    name: 'MILK',
    EAN: '123456789'
  }
})

serverItems.value = result.data.data.data
totalItems.value = result.data.data.totalItems
```

**Posting data:**

```javascript
await api.post('/products/bulk', {
  newProducts: items.value
})
```

### All API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/auth/login` | Login |
| POST | `/auth/logout` | Logout |
| POST | `/auth/refresh` | Refresh token |
| GET | `/auth/profile` | Get current user |
| GET | `/products` | List products |
| POST | `/products/bulk` | Bulk create |
| GET | `/products/ensureValid` | Validate product |
| GET | `/products/matches` | Search products |
| GET | `/inventories` | List inventory |
| GET | `/restocks` | List restocks |
| POST | `/restocks` | Create restock |
| GET | `/restocks/details/:id` | Restock details |
| GET | `/restocks/users` | Who did restocks |
| GET | `/adjustments` | List adjustments |
| POST | `/adjustments` | Create adjustment |
| GET | `/adjustments/details/:id` | Adjustment details |
| GET | `/adjustments/users` | Who did adjustments |

---

## 9. Views Guide

### Login Page (`views/Guest/Login.vue`)

The entry point for all users.

**What it does:**
- Shows a split screen (image left, form right)
- Accepts username and password
- Has "Remember me" checkbox
- Shows error if login fails
- Redirects to Dashboard on success

**Key code:**
```javascript
const handleLogin = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  await authStore.login(form.username, form.password)
  router.push({ name: 'Dashboard' })
}
```

### Dashboard (`views/User/Dashboard.vue`)

The home page after login. Shows:

- **4 Stat Cards**: Total Listings, Active Clients, Deals Closed, Revenue
- **Monthly Sales Chart**: Bar chart (SVG)
- **Property Types Chart**: Donut chart (SVG)
- **Recent Listings Table**: 5 mock entries
- **Recent Activity Timeline**: 5 mock events

**Note:** Currently all data is hardcoded/mock - no API calls.

### Products Index (`views/User/Products/Index.vue`)

Displays a searchable, filterable list of products.

**Features:**
- Search by EAN barcode
- Search by product name
- Paginated table
- Clear filters button

**Data flow:**
```
User types in search → resetSearch() → fetchProducts() → API call → update table
```

### Products Add (`views/User/Products/Add.vue`)

Draft-based product creation.

**The flow:**
```
1. Click "Add Product" → AddDialog opens
2. Fill form → validate → emit 'add'
3. Product appears in local table (not saved yet)
4. Edit or delete drafts locally
5. Click "Save All" → POST to API → redirect to Index
```

### Inventories (`views/User/Inventories.vue`)

View-only page for stock levels.

- Search by EAN or name
- Paginated table
- Sorted alphabetically by name
- No editing here - just viewing

### Restocks Index (`views/User/Restock/Index.vue`)

History of all restock operations.

**Filters:**
- Who restocked (dropdown)
- Date range (date picker)

**Click any row** → Opens DetailsDialog showing:
- Description, who did it, when, total cost
- Line items (which products, quantities, costs)

### Restocks Add (`views/User/Restock/Add.vue`)

Create restock entries with a draft system.

**Key differences from Products Add:**
- Can add existing products OR new products
- Search products by typing EAN or name
- Has Quantity and Unit Cost fields
- Uses SaveDialog to add description before saving

### Adjustments Index & Add

Identical pattern to Restocks, but for stock adjustments (corrections, not new inventory).

---

## 10. Components Guide

### Layout Components

#### GuestLayout

```html
<v-app>
  <GuestAppbar v-if="!route.meta.hideAppBar" />
  <v-main><router-view /></v-main>
  <GuestFooter v-if="!route.meta.hideFooter" />
</v-app>
```

Used for public pages. Shows/hides nav elements based on route meta.

#### UserLayout

```html
<v-app>
  <UserAppbar @toggle-drawer="drawer = !drawer" />
  <UserSidebar v-model="drawer" />
  <v-main class="bg-grey-lighten-4">
    <router-view />
  </v-main>
</v-app>
```

Used for authenticated pages. Has sidebar navigation.

### Navigation Components

#### UserSidebar

The dark teal sidebar on the left:

```
┌──────────────────────────┐
│ Main                     │
│ ├ Dashboard              │
│ └ Analytics             │
├──────────────────────────┤
│ Inventory Management     │
│ ├ Product List          │
│ ├ Inventory             │
│ ├ Restock History       │
│ └ Adjustment History    │
├──────────────────────────┤
│ Admin                    │
│ ├ Users                  │
│ └ Roles                  │
├──────────────────────────┤
│ [Collapse]               │
└──────────────────────────┘
```

Click items to navigate. Can collapse to icons only.

### Dialog Components

There are three types of dialogs that repeat across features:

#### AddDialog

Add or edit an entry.

**Example (Product):**
- Fields: EAN, Name, Price
- Validates: Required fields, no negative prices
- On submit: Emits 'add' or 'update' with form data

#### DetailsDialog

View details of a saved entry.

**Example (Restock):**
- Shows header info (description, who, when, total)
- Shows searchable, paginated line items table

#### SaveDialog

Enter description before saving a draft.

**Example (Restock):**
- Field: Description (required)
- On submit: Emits 'save' with description, parent calls API

### Reusable Components

| Component | Purpose | Used In |
|-----------|---------|---------|
| `Toast.vue` | Show notifications | App.vue (global) |
| `UserAppbar.vue` | Top nav bar | UserLayout |
| `UserSidebar.vue` | Side navigation | UserLayout |
| `Filter.vue` | Sidebar filter panel | (unused) |
| `Search.vue` | Search bar | (unused) |

---

## 11. Data Types

### Restock Types

```typescript
interface AddForm {
  autoGenerateEAN: boolean   // Should we auto-gen EAN?
  EAN: string               // Barcode
  quantity: number          // How many
  unitCost: number          // Cost per item
  totalCost?: number        // quantity × unitCost (computed)
  product?: string          // Product ID (for existing products)
  isNewProduct: boolean     // Is this a new product?
  name: string              // Product name
  price?: number            // Selling price (for new products)
}

interface SaveForm {
  description: string       // What is this restock for?
}

interface MatchedProductsDto {
  EAN: string
  name: string
  product: string           // Product ID
}
```

### Adjustment Types

```typescript
interface AddForm {
  EAN: string
  name: string
  change: number            // Positive or negative adjustment
  reason: string            // Why adjust?
  product: string           // Product ID
}

interface SaveForm {
  description: string
}

interface MatchedProductsDto {
  EAN: string
  name: string
  product: string
}
```

---

## 12. Styling

### Fonts

**Poppins** is the primary font, loaded from Google Fonts.

```css
/* In App.vue */
:root {
  --v-font-family: 'Poppins', sans-serif;
}
```

### Vuetify Theme Colors

| Name | Light Value | Usage |
|------|-------------|-------|
| primary | #075BAB | Main actions, headers |
| secondary | #656264 | Secondary elements |
| surface | #FFFFFF | Cards, dialogs |
| background | #F9FAFB | Page background |
| error | #EF4444 | Error states |
| success | #22C55E | Success states |
| warning | #F97316 | Warnings |
| info | #3B82F6 | Information |

### Sidebar Colors

The UserSidebar uses a custom dark theme:
- Background: #0A303C (dark teal)
- Text: White
- Active items: Amber accent

---

## Quick Reference

### Show a Toast

```javascript
import { Color, useUIStore } from '@/stores/ui'
const uiStore = useUIStore()
uiStore.queueMessage(Color.SUCCESS, "It worked!")
```

### Make an API Call

```javascript
import api from '@/axios'
const result = await api.get('/products', { params: { page: 1 } })
const data = result.data.data.data
```

### Navigate Somewhere

```javascript
import { useRouter } from 'vue-router'
const router = useRouter()
router.push({ name: 'Dashboard' })
```

### Get Current User

```javascript
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
console.log(authStore.user)     // The user object
console.log(authStore.isAuthenticated)  // Boolean
```

---

*Last updated: April 2026*
*Version: v0.0.1*