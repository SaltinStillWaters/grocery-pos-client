<template>
  <v-card elevation="2" class="rounded-lg border">
    <v-card-title class="d-flex align-center px-4 py-3 bg-grey-lighten-4">
      <v-icon
        icon="mdi-truck-delivery-outline"
        color="amber-darken-2"
        class="me-2"
      />
      <span class="text-subtitle-1 font-weight-bold">Restock History</span>
      <v-spacer />
      <div class="d-flex ga-2">
        <v-btn
          color="amber-darken-2"
          variant="flat"
          prepend-icon="mdi-package-up"
          size="small"
        >
          Restock
        </v-btn>
      </div>
    </v-card-title>

    <v-divider />

    <v-card-text class="bg-grey-lighten-5 pt-4">
      <v-row dense align="center">
        <v-col cols="12" md="3">
          <v-select
            v-model="searchRestockedBy"
            :items="userOptions"
            label="Restocked By"
            prepend-inner-icon="mdi-account"
            variant="outlined"
            density="compact"
            bg-color="white"
            color="amber-darken-2"
            clearable
            hide-details
          />
        </v-col>

        <v-col cols="12" md="3">
          <v-menu v-model="dateMenu" :close-on-content-click="false">
            <template v-slot:activator="{ props }">
              <v-text-field
                v-bind="props"
                v-model="dateRangeText"
                label="Date Range"
                prepend-inner-icon="mdi-calendar"
                variant="outlined"
                density="compact"
                bg-color="white"
                readonly
                hide-details
                color="amber-darken-2"
                clearable
                @click:clear="dateRange = []"
              />
            </template>
            <v-date-picker
              v-model="dateRange"
              multiple="range"
              color="amber-darken-2"
              @update:model-value="onDateChange"
              hide-header
              :max="new Date()"
              />
          </v-menu>
        </v-col>
        <v-spacer />
        <v-col cols="12" md="2">
          <v-btn
            color="amber-darken-2"
            variant="flat"
            prepend-icon="mdi-magnify"
            block
            @click="fetchRestock"
          >
            Search
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>

    <v-divider />

    <v-data-table-server
      v-model:items-per-page="limit"
      :headers="headers"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      hover
      @update:options="fetchRestock"
      @click:row="showDetails"
    >
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@5" />
      </template>
    </v-data-table-server>

    <v-dialog v-model="isDialogOpen">
      <RestockDetails :item="selectedItem" @close="isDialogOpen = false">
      </RestockDetails>
    </v-dialog>
  </v-card>
</template>

<script setup>
import api from "@/axios";
import RestockDetails from "@/components/User/RestockDetails.vue";
import { computed, onMounted, ref } from "vue";

const loading = ref(true);
const limit = ref(5);
const totalItems = ref(0);
const searchDescription = ref('')
const searchRestockedBy = ref('')
const dateRange = ref([])
const dateMenu = ref(false)
const isDialogOpen = ref(false);
const selectedItem = ref();

const userOptions = ref([])

const fetchUserOptions = async () => {
  const result = await api.get('/restocks/users')
  const names = []

  result.data.data.forEach(({_id, name}) => {
    names.push(name)
    userMap.value[name] = _id  
  })

  userOptions.value = names

  console.log(names, userMap)
}

onMounted(() => {
  fetchUserOptions()
})

const userMap = ref({})

const dateRangeText = computed(() => {
  if (!dateRange.value || dateRange.value.length === 0) return ''
  
  const formatDate = (date) => new Date(date).toLocaleDateString('en-PH') // Adjust locale as needed
  
  if (dateRange.value.length === 1) {
    return formatDate(dateRange.value[0])
  }
  
  const start = formatDate(dateRange.value[0])
  const end = formatDate(dateRange.value[dateRange.value.length - 1])
  return `${start} - ${end}`
})

// Closes the menu automatically once a range is selected
const onDateChange = (val) => {
  if (val.length > 1) {
    fetchRestock() // Auto-fetch when range is complete (optional)
  }
}

const headers = ref([
  { title: "Description", key: "description", align: "start", sortable: false },
  { title: "Total Cost", key: "totalCost", align: "start", sortable: false },
  {
    title: "Restocked By",
    key: "restockedBy",
    align: "start",
    sortable: false,
  },
  { title: "Date", key: "date", align: "start", sortable: false },
]);

const serverItems = ref([]);

async function showDetails(event, { item }) {
  selectedItem.value = item;
  console.log("ITEM RAW");
  console.log(item);
  isDialogOpen.value = true;
}

async function fetchRestock({ page = 1, itemsPerPage }) {
  loading.value = true;
  const formattedDates = dateRange.value && dateRange.value.length
    ? dateRange.value.map(date => new Date(date).toISOString())
    : undefined;

  const result = await api.get(`/restocks`, {
    params: {
      page,
      limit: itemsPerPage ?? limit.value,
      restockedBy: userMap.value[searchRestockedBy.value] ?? null,
      dateRange: formattedDates
    },
    paramsSerializer: { indexes: null }
  });
  console.log(dateRange)

  serverItems.value = result.data.data.data.map((restock) => {
    return {
      id: restock._id,
      description: restock.description,
      restockedBy: restock.restockedBy.name,
      totalCost: restock.totalCost,
      date: new Date(restock.createdAt).toLocaleString("en-PH", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };
  });

  totalItems.value = result.data.data.totalItems;
  console.log(totalItems.value, {result});
  loading.value = false;
}
</script>
