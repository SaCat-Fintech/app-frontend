<template>
  <div class="h-full">
    <nav>
      <Navbar />
    </nav>
    <div class="flex justify-center items-center h-5/6">
      <div class="flex flex-col gap-4 items-center">
        <Button
          class="absolute left-10 top-20"
          label="Atrás"
          icon="pi pi-arrow-left"
          text
          @click="navigateTo('/session/history')"
        />
        <p class="mb-4 text-4xl mt-10">
          Detalles de Plan de Pago Nro
          {{ route.params.id.toString() }}
        </p>
        <div class="grid grid-cols-2 sm:grid-cols-4 text-left w-[54rem]">
          <div
            class="grid grid-rows-8 font-semibold"
            style="background-color: var(--light-700)"
          >
            <div class="p-2 border border-black">Tipo de Moneda:</div>
            <div class="p-2 border border-black">Cuota Inicial:</div>
            <div class="p-2 border border-black">Primera Tasa:</div>
            <div class="p-2 border border-black">Frecuencia de Pago:</div>
            <div class="p-2 border border-black">Número de Pagos:</div>
            <div class="p-2 border border-black">Plazo de Gracia:</div>
            <div class="p-2 border border-black">COK:</div>
            <div class="p-2 border border-black">TIR:</div>
          </div>
          <div class="grid grid-rows-8">
            <div class="p-2 border border-black">Dolares</div>
            <div class="p-2 border border-black">40,000</div>
            <div class="p-2 border border-black">12.5% TNA</div>
            <div class="p-2 border border-black">Semestral</div>
            <div class="p-2 border border-black">16</div>
            <div class="p-2 border border-black">Total</div>
            <div class="p-2 border border-black">20.00000%</div>
            <div class="p-2 border border-black">6.0949845%</div>
          </div>
          <div
            class="grid grid-rows-8 font-semibold"
            style="background-color: var(--light-700)"
          >
            <div class="p-2 border border-black">Precio de Inmueble:</div>
            <div class="p-2 border border-black">Precio a financiar:</div>
            <div class="p-2 border border-black">Tasa a convertir:</div>
            <div class="p-2 border border-black">Frecuencia de Pagos:</div>
            <div class="p-2 border border-black">Numero de Años:</div>
            <div class="p-2 border border-black">Periodo de Gracia:</div>
            <div class="p-2 border border-black">VAN:</div>
            <div class="p-2 border border-black">Fecha de guardado:</div>
          </div>
          <div class="grid grid-rows-8">
            <div class="p-2 border border-black">200,000</div>
            <div class="p-2 border border-black">160,000</div>
            <div class="p-2 border border-black">6.3424% TES</div>
            <div class="p-2 border border-black">Semestral</div>
            <div class="p-2 border border-black">8</div>
            <div class="p-2 border border-black">10</div>
            <div class="p-2 border border-black">US$ -884,398.34</div>
            <div class="p-2 border border-black">Jun 1, 2023</div>
          </div>
        </div>
        <p class="mb-4 text-4xl mt-10">Plan de Pagos</p>
        <DataTable
          :value="payments"
          showGridlines
          scrollable
          scrollHeight="36rem"
          tableStyle="min-width: 64rem"
          paginator
          :rows="5"
          :rowsPerPageOptions="[5, 10, 20, 40]"
          class="mb-10"
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
            header="Nro"
            :headerStyle="{
              'background-color': 'var(--light-700)',
            }"
          >
            <template #body="slotProps">
              {{ slotProps.data.id }}
            </template>
          </Column>
          <Column
            field="tem"
            header="TEM"
            :headerStyle="{
              'background-color': 'var(--light-700)',
            }"
          >
            <template #body="slotProps"> {{ slotProps.data.tem }} % </template>
          </Column>
          <Column
            field="pg"
            header="P.G."
            :headerStyle="{
              'background-color': 'var(--light-700)',
            }"
          >
            <template #body="slotProps">
              {{ slotProps.data.pg }}
            </template>
          </Column>
          <Column
            field="initialPayment"
            header="Cuota Inicial"
            :headerStyle="{
              'background-color': 'var(--light-700)',
            }"
          >
            <template #body="slotProps">
              {{
                slotProps.data.initialPayment
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}
            </template>
          </Column>
          <Column
            field="interest"
            header="Interés"
            :headerStyle="{
              'background-color': 'var(--light-700)',
            }"
          >
            <template #body="slotProps">
              {{
                slotProps.data.interest
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}
            </template>
          </Column>
          <Column
            field="rateType"
            header="Cuota"
            :headerStyle="{
              'background-color': 'var(--light-700)',
            }"
          >
            <template #body="slotProps">
              {{
                slotProps.data.rateType === "nominal" ? "Nominal" : "Efectiva"
              }}
            </template>
          </Column>
          <Column
            field="amortization"
            header="Amort."
            :headerStyle="{
              'background-color': 'var(--light-700)',
            }"
          >
            <template #body="slotProps">
              {{ slotProps.data.amortization }}
            </template>
          </Column>
          <Column
            field="finalBalance"
            header="Saldo Final"
            :headerStyle="{
              'background-color': 'var(--light-700)',
            }"
          >
            <template #body="slotProps">
              {{
                slotProps.data.finalBalance
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Papa from "papaparse";
const route = useRoute();

const payments = ref([
  {
    id: 1,
    tem: 5.6,
    pg: "N",
    initialPayment: 333333,
    interest: 323.33,
    rateType: "nominal",
    amortization: "2 años",
    finalBalance: 311.98,
  },
  {
    id: 2,
    tem: 5.6,
    pg: "N",
    initialPayment: 333333,
    interest: 323.33,
    rateType: "nominal",
    amortization: "2 años",
    finalBalance: 311.98,
  },
  {
    id: 3,
    tem: 5.6,
    pg: "N",
    initialPayment: 333333,
    interest: 323.33,
    rateType: "nominal",
    amortization: "2 años",
    finalBalance: 311.98,
  },
  {
    id: 4,
    tem: 5.6,
    pg: "N",
    initialPayment: 333333,
    interest: 323.33,
    rateType: "nominal",
    amortization: "2 años",
    finalBalance: 311.98,
  },
  {
    id: 5,
    tem: 5.6,
    pg: "N",
    initialPayment: 333333,
    interest: 323.33,
    rateType: "nominal",
    amortization: "2 años",
    finalBalance: 311.98,
  },
  {
    id: 6,
    tem: 5.6,
    pg: "N",
    initialPayment: 333333,
    interest: 323.33,
    rateType: "nominal",
    amortization: "2 años",
    finalBalance: 311.98,
  },
  {
    id: 7,
    tem: 5.6,
    pg: "N",
    initialPayment: 333333,
    interest: 323.33,
    rateType: "nominal",
    amortization: "2 años",
    finalBalance: 311.98,
  },
  {
    id: 8,
    tem: 5.6,
    pg: "N",
    initialPayment: 333333,
    interest: 323.33,
    rateType: "nominal",
    amortization: "2 años",
    finalBalance: 311.98,
  },
  {
    id: 9,
    tem: 5.6,
    pg: "N",
    initialPayment: 333333,
    interest: 323.33,
    rateType: "nominal",
    amortization: "2 años",
    finalBalance: 311.98,
  },
  {
    id: 9,
    tem: 5.6,
    pg: "N",
    initialPayment: 333333,
    interest: 323.33,
    rateType: "nominal",
    amortization: "2 años",
    finalBalance: 311.98,
  },
  {
    id: 9,
    tem: 5.6,
    pg: "N",
    initialPayment: 333333,
    interest: 323.33,
    rateType: "nominal",
    amortization: "2 años",
    finalBalance: 311.98,
  },
  {
    id: 9,
    tem: 5.6,
    pg: "N",
    initialPayment: 333333,
    interest: 323.33,
    rateType: "nominal",
    amortization: "2 años",
    finalBalance: 311.98,
  },
  {
    id: 9,
    tem: 5.6,
    pg: "N",
    initialPayment: 333333,
    interest: 323.33,
    rateType: "nominal",
    amortization: "2 años",
    finalBalance: 311.98,
  },
  {
    id: 9,
    tem: 5.6,
    pg: "N",
    initialPayment: 333333,
    interest: 323.33,
    rateType: "nominal",
    amortization: "2 años",
    finalBalance: 311.98,
  },
  {
    id: 9,
    tem: 5.6,
    pg: "N",
    initialPayment: 333333,
    interest: 323.33,
    rateType: "nominal",
    amortization: "2 años",
    finalBalance: 311.98,
  },
  {
    id: 9,
    tem: 5.6,
    pg: "N",
    initialPayment: 333333,
    interest: 323.33,
    rateType: "nominal",
    amortization: "2 años",
    finalBalance: 311.98,
  },
  {
    id: 9,
    tem: 5.6,
    pg: "N",
    initialPayment: 333333,
    interest: 323.33,
    rateType: "nominal",
    amortization: "2 años",
    finalBalance: 311.98,
  },
]);

const exportCSV = () => {
  // Convert data to CSV format using PapaParse
  const csvData = Papa.unparse(payments.value);

  // Create a Blob containing the CSV data
  const blob = new Blob([csvData], { type: "text/csv" });

  // Create a download link and trigger a click to download the file
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = "detalle_pagos_" + route.params.id + ".csv";
  link.click();
};

// Which id you're using
console.log(route.params.id);
</script>
