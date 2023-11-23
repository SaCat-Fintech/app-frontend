<template>
  <div class="h-screen">
    <nav>
      <Navbar />
    </nav>
    <div class="flex justify-center items-center h-5/6">
      <div class="text-center flex flex-col gap-4">
        <p class="mb-4 text-4xl">Historial de los cálculos de préstamos</p>
        <DataTable
          :value="operations"
          showGridlines
          scrollable
          scrollHeight="36rem"
          tableStyle="min-width: 50rem"
          paginator
          :rows="5"
          :rowsPerPageOptions="[5, 10, 20, 50]"
        >
          <template #paginatorend>
            <Button
              label="Descargar CSV"
              @click="exportCSV($event)"
              style="
                background-color: var(--light-700);
                color: black;
                border-radius: 1.25rem;
                padding-inline: 1.8rem;
                box-shadow: 0.5rem;
              "
            />
          </template>
          <Column
            field="id"
            header="Código"
            style="min-width: 4rem; text-align: center"
            :headerStyle="{
              'background-color': 'var(--light-700)',
            }"
          >
            <template #body="slotProps">
              {{ slotProps.data.id }}
            </template>
          </Column>
          <Column
            field="created_at"
            header="Fecha"
            :headerStyle="{
              'background-color': 'var(--light-700)',
            }"
          >
            <template #body="slotProps">
              {{ formatDate(slotProps.data.created_at) }}
            </template>
          </Column>
          <Column
            field="vehicle_cost"
            header="Valor"
            :headerStyle="{
              'background-color': 'var(--light-700)',
            }"
          >
            <template #body="slotProps">
              {{
                Number(slotProps.data.vehicle_cost)
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}
            </template>
          </Column>
          <Column
            field="currency"
            header="Tipo de Moneda"
            :headerStyle="{
              'background-color': 'var(--light-700)',
            }"
          >
            <template #body="slotProps">
              {{ slotProps.data.currency === "USD" ? "Dólar" : "Sol" }}
            </template>
          </Column>
          <Column
            field="rate_value"
            header="Tasa"
            :headerStyle="{
              'background-color': 'var(--light-700)',
            }"
          >
            <template #body="slotProps">
              {{ slotProps.data.rate_value }}%
            </template>
          </Column>
          <Column
            field="rate_type"
            header="Tipo de Tasa"
            :headerStyle="{
              'background-color': 'var(--light-700)',
            }"
          >
            <template #body="slotProps">
              {{
                slotProps.data.rate_type === "NOMINAL" ? "Nominal" : "Efectiva"
              }}
            </template>
          </Column>
          <Column
            field="payment_years"
            header="Tiempo"
            :headerStyle="{
              'background-color': 'var(--light-700)',
            }"
          >
            <template #body="slotProps">
              {{ slotProps.data.payment_years }} años
            </template>
          </Column>
          <Column
            field="payment_frequency"
            header="Pago"
            :headerStyle="{
              'background-color': 'var(--light-700)',
            }"
          >
            <template #body="slotProps">
              {{
                periods.find(
                  (cap) => cap.value === slotProps.data.payment_frequency,
                )?.name
              }}
            </template>
          </Column>
          <Column
            :exportable="false"
            style="min-width: 4rem; text-align: center"
            header="Detalles"
            :headerStyle="{
              'background-color': 'var(--light-700)',
            }"
          >
            <template #body="slotProps">
              <Button
                @click="navigateTo('/session/details/' + slotProps.data.id)"
                icon="pi pi-eye"
                text
                rounded
                aria-label="Details"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Papa from "papaparse";

const config = useRuntimeConfig();

const periods = ref([
  { value: "annually", name: "Anual" },
  { value: "semester", name: "Semestral" },
  { value: "quatrimesterly", name: "Cuatrimestral" },
  { value: "quarterly", name: "Trimestral" },
  { value: "bimonthly", name: "Bimestral" },
  { value: "monthly", name: "Mensual" },
  { value: "biweekly", name: "Quincenal" },
  { value: "daily", name: "Diario" },
]);

const formatDate = (value: string) => {
  const date = new Date(value);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const operations = ref([]);

const fetchOperations = async () => {
  try {
    // Make the API call using $fetch
    const response: any = await $fetch(
      config.public.baseUrl +
        "/api/v1/session/history/" +
        localStorage.getItem("user_profile_id"),
      {
        headers: {
          accept: "application/json",
        },
      },
    );

    // Assuming the API response is an array of operations
    operations.value = response;
  } catch (error) {
    console.error("Error fetching operations:", error);
  }
};

// Fetch operations when the component is mounted
onMounted(fetchOperations);

const exportCSV = () => {
  // Convert data to CSV format using PapaParse
  const csvData = Papa.unparse(operations.value);

  // Create a Blob containing the CSV data
  const blob = new Blob([csvData], { type: "text/csv" });

  // Create a download link and trigger a click to download the file
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = "historial_corridas.csv";
  link.click();
};
</script>

<style></style>
