<template>
  <div class="h-screen">
    <nav>
      <Navbar />
    </nav>
    <div class="flex justify-center items-center h-5/6">
      <div class="text-center flex flex-col gap-4">
        <p class="mb-4 text-left text-xl">
          Revisa el historial de los cálculos de préstamos que haz realizado
        </p>
        <DataTable
          :value="operations"
          showGridlines
          tableStyle="min-width: 50rem"
          paginator
          :rows="5"
          :rowsPerPageOptions="[5, 10, 20, 50]"
        >
          <template #paginatorend>
            <Button label="Descargar CSV" @click="exportCSV($event)" />
          </template>
          <Column field="id" header="Código">
            <template #body="slotProps">
              {{ formatCode(slotProps.data.id) }}
            </template>
          </Column>
          <Column field="created_at" header="Fecha">
            <template #body="slotProps">
              {{ formatDate(slotProps.data.created_at) }}
            </template>
          </Column>
          <Column field="vehicle_cost" header="Valor">
            <template #body="slotProps">
              {{ slotProps.data.vehicle_cost.toLocaleString() }}
            </template>
          </Column>
          <Column field="currency" header="Tipo de Moneda">
            <template #body="slotProps">
              {{ slotProps.data.currency === "dollar" ? "Dólar" : "Sol" }}
            </template>
          </Column>
          <Column field="rate_value" header="Tasa">
            <template #body="slotProps">
              {{ slotProps.data.rate_value }}%
            </template>
          </Column>
          <Column field="rate_type" header="Tipo de Tasa">
            <template #body="slotProps">
              {{
                slotProps.data.rate_type === "nominal" ? "Nominal" : "Efectiva"
              }}
            </template>
          </Column>
          <Column field="rate_period" header="Tiempo">
            <template #body="slotProps">
              {{
                periods.find((cap) => cap.value === slotProps.data.rate_period)
                  ?.name
              }}
            </template>
          </Column>
          <Column field="payment_frequency" header="Pago">
            <template #body="slotProps">
              {{
                periods.find(
                  (cap) => cap.value === slotProps.data.payment_frequency,
                )?.name
              }}
            </template>
          </Column>
          <Column :exportable="false" style="min-width: 8rem" header="Detalles">
            <template #body="slotProps">
              <Button icon="pi pi-eye" text rounded aria-label="Details" />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Papa from "papaparse";

const periods = [
  { value: "anual", name: "Anual" },
  { value: "semestral", name: "Semestral" },
  { value: "cuatrimestral", name: "Cuatrimestral" },
  { value: "trimestral", name: "Trimestral" },
  { value: "bimestral", name: "Bimestral" },
  { value: "mensual", name: "Mensual" },
  { value: "quincenal", name: "Quincenal" },
  { value: "daily", name: "Diario" },
];

const formatCode = (value: string) => {
  return "OP" + value.slice(0, 4) + "***";
};
const formatDate = (value: string) => {
  const date = new Date(value);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const operations = ref([
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    created_at: "1999-01-08 04:05:06",
    vehicle_cost: 6000.0,
    currency: "dollar",
    rate_value: 5.6,
    rate_type: "nominal",
    rate_period: "anual",
    payment_frequency: "mensual",
  },
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    created_at: "1999-01-08 04:05:06",
    vehicle_cost: 5000.0,
    currency: "dollar",
    rate_value: 5.6,
    rate_type: "nominal",
    rate_period: "anual",
    payment_frequency: "mensual",
  },
  {
    id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    created_at: "1999-01-08 04:05:06",
    vehicle_cost: 8000.0,
    currency: "dollar",
    rate_value: 5.6,
    rate_type: "nominal",
    rate_period: "anual",
    payment_frequency: "mensual",
  },
  {
    id: "a987fbc9-4bed-3078-cf07-9141ba07c9f3",
    created_at: "1999-01-08 04:05:06",
    vehicle_cost: 9000.0,
    currency: "dollar",
    rate_value: 5.6,
    rate_type: "nominal",
    rate_period: "anual",
    payment_frequency: "mensual",
  },
]);

const exportCSV = () => {
  // Convert data to CSV format using PapaParse
  const csvData = Papa.unparse(operations.value);

  // Create a Blob containing the CSV data
  const blob = new Blob([csvData], { type: "text/csv" });

  // Create a download link and trigger a click to download the file
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = "exported_data.csv";
  link.click();
};
</script>

<style></style>
