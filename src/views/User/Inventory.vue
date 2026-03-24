<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="serverItems"
    :items-length="totalItems"
    :loading="loading"
    :search="search"
    item-value="name"
    @update:options="fetchInventory"
  >
    <template v-slot:tfoot>
      <!-- <tr>
        <td>
          <v-text-field v-model="name" class="ma-2" density="compact" placeholder="Search name..." hide-details></v-text-field>
        </td>
        <td>
          <v-text-field
            v-model="calories"
            class="ma-2"
            density="compact"
            placeholder="Minimum calories"
            type="number"
            hide-details
          ></v-text-field>
        </td>
      </tr> -->
    </template>
  </v-data-table-server>
</template>

<script setup>
  import api from '@/axios'
  import { ref, watch } from 'vue'

  const loading = ref(true)
  const itemsPerPage = ref(5)
  const totalItems = ref(0)
  const searchName = ref('')
  const searchEAN = ref('')

  const headers = ref([
    {
      title: 'EAN',
      align: 'start',
      sortable: false,
      key: 'EAN',
    },
    { title: 'Name', key: 'name', align: 'start' },
    { title: 'Stock', key: 'stock', align: 'end' },
  ])

  const serverItems = ref([])

  const name = ref('')
  const calories = ref('')
  const search = ref('')
  async function fetchInventory ({ page, itemsPerPage }) {
    loading.value = true
    const result = await api.get(`/inventories?page=${page}&limit=${itemsPerPage}&name=${searchName.value}&EAN=${searchEAN.value}`);
    console.log(result.data.data)
    serverItems.value = result.data.data.data.map(inventory => {
      return {
        id: inventory.product._id,
        EAN: inventory.product.EAN,
        name: inventory.product.name,
        stock: inventory.stock,
      }
    });
    totalItems.value = result.data.data.pages * itemsPerPage
    console.log(serverItems.value)
    loading.value = false

  }

  watch(name, () => {
    search.value = String(Date.now())
  })
  
  watch(calories, () => {
    search.value = String(Date.now())
  })
</script>