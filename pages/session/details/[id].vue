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
            class="grid grid-rows-9 font-semibold"
            style="background-color: var(--light-700)"
          >
            <div class="p-2 border border-black">Tipo de Moneda:</div>
            <div class="p-2 border border-black">Cuota Inicial:</div>
            <div class="p-2 border border-black">Primera Tasa:</div>
            <div class="p-2 border border-black">Capitalización:</div>
            <div class="p-2 border border-black">Frecuencia de Pago:</div>
            <div class="p-2 border border-black">Número de Pagos:</div>
            <div class="p-2 border border-black">Plazo de Gracia:</div>
            <div class="p-2 border border-black">COK:</div>
            <div class="p-2 border border-black">TIR:</div>
          </div>
          <div class="grid grid-rows-9">
            <div class="p-2 border border-black">
              {{ response?.inputData.currency === "USD" ? "Dólar" : "Sol" }}
            </div>
            <div class="p-2 border border-black">
              {{
                Number(response?.financingResult.initial_fee_ammount)
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}
            </div>
            <div class="p-2 border border-black">
              {{ Number(response?.inputData.rate.rate_value) * 100 }}%
              {{
                response?.inputData.rate.rate_type === "EFFECTIVE"
                  ? "Efectiva"
                  : "Nominal"
              }}
            </div>
            <div class="p-2 border border-black">
              {{
                response?.inputData.rate.capitalization_period === "null"
                  ? "-"
                  : periods.find(
                      (cap) =>
                        cap.value ===
                        response?.inputData.rate.capitalization_period,
                    )?.name
              }}
            </div>
            <div class="p-2 border border-black">
              {{
                periods.find(
                  (cap) => cap.value === response?.inputData.payment_frequency,
                )?.name
              }}
            </div>
            <div class="p-2 border border-black">
              {{ response?.inputData.amount_of_fees }}
            </div>
            <div class="p-2 border border-black">
              {{
                gracePeriodTypes.find(
                  (cap) => cap.value === response?.inputData.gracePeriod.type,
                )?.name
              }}
            </div>
            <div class="p-2 border border-black">
              {{ Number(response?.inputData.cok_percentage) * 100 }}%
            </div>
            <div class="p-2 border border-black">
              {{
                Number(
                  response?.profitabilityIndicator.internal_rate_of_return,
                ) * 100
              }}%
            </div>
          </div>
          <div
            class="grid grid-rows-8 font-semibold"
            style="background-color: var(--light-700)"
          >
            <div class="p-2 border border-black">Precio del vehículo:</div>
            <div class="p-2 border border-black">Precio a financiar:</div>
            <div class="p-2 border border-black">Tasa a convertir:</div>
            <div class="p-2 border border-black">Amortización:</div>
            <div class="p-2 border border-black">Número de años:</div>
            <div class="p-2 border border-black">Tipo de periodo:</div>
            <div class="p-2 border border-black">Periodo(s) de gracia:</div>
            <div class="p-2 border border-black">VAN:</div>
            <div class="p-2 border border-black">Fecha de guardado:</div>
          </div>
          <div class="grid grid-rows-8">
            <div class="p-2 border border-black">
              {{
                Number(response?.inputData.vehicle_cost)
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}
            </div>
            <div class="p-2 border border-black">
              {{
                Number(
                  response?.financingResult.financed_balance_with_installment,
                )
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}
            </div>
            <div class="p-2 border border-black">
              {{
                Number(
                  response?.financingResult.effective_rate_by_payment_frequency,
                ) * 100
              }}% TEM
            </div>
            <div class="p-2 border border-black">TODOOOOO</div>
            <div class="p-2 border border-black">
              {{ response?.financingResult.number_of_years }}
            </div>
            <div class="p-2 border border-black">
              me maree que es tipo de periodo
            </div>
            <div class="p-2 border border-black">
              {{ response?.inputData.gracePeriod.period_numbers }}
            </div>
            <div class="p-2 border border-black">
              {{
                response?.inputData.currency +
                " " +
                response?.profitabilityIndicator.net_present_value
              }}
            </div>
            <div class="p-2 border border-black">
              {{ formatDate(response?.created_at!) }}
            </div>
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

const gracePeriodTypes = ref([
  { value: "TOTAL", name: "Total" },
  { value: "PARCIAL", name: "Parcial" },
  { value: "NONE", name: "Ninguno" },
]);

interface Rate {
  id: number;
  rate_type: string;
  rate_period: string;
  rate_value: string;
  capitalization_period: string | null;
}

interface GracePeriod {
  id: number;
  type: string;
  period_numbers: number[];
}

interface InputData {
  id: number;
  currency: string;
  vehicle_cost: string;
  initial_payment_percentage: string;
  financing_percentage: string;
  payment_frequency: string;
  amount_of_fees: number;
  cok_percentage: string;
  rate: Rate;
  gracePeriod: GracePeriod;
}

interface PaymentInstallment {
  payment_number: number;
  initial_balance: string;
  interest_amount: string;
  payment_amount: string;
  amortization: string;
  installment: string;
  outstanding_balance: string;
  id: number;
}

interface ProfitabilityIndicator {
  id: number;
  discount_rate: string;
  internal_rate_of_return: string;
  annual_effective_cost_rate: string;
  net_present_value: string;
}

interface FinancingResult {
  id: number;
  final_fee: string;
  number_of_years: number;
  annual_effective_rate: string;
  effective_rate_by_payment_frequency: string;
  rates_per_year: number;
  initial_fee_ammount: string;
  final_fee_ammount: string;
  lease_amount: string;
  financed_balance_with_installment: string;
}

interface ApiResponse {
  id: number;
  created_at: string;
  updated_at: string;
  inputData: InputData;
  paymentInstallments: PaymentInstallment[];
  profitabilityIndicator: ProfitabilityIndicator;
  financingResult: FinancingResult;
}

const payments = ref([
  // {
  //   id: 1,
  //   tem: 5.6,
  //   pg: "N",
  //   initialPayment: 333333,
  //   interest: 323.33,
  //   rateType: "nominal",
  //   amortization: "2 años",
  //   finalBalance: 311.98,
  // },
  // {
  //   id: 2,
  //   tem: 5.6,
  //   pg: "N",
  //   initialPayment: 333333,
  //   interest: 323.33,
  //   rateType: "nominal",
  //   amortization: "2 años",
  //   finalBalance: 311.98,
  // },
]);

const response = ref<ApiResponse>();

const fetchDetails = async () => {
  try {
    // Make the API call using $fetch
    const apiResponse: ApiResponse = await $fetch(
      config.public.baseUrl + "/api/v1/session/detail/" + route.params.id,
      {
        headers: {
          accept: "application/json",
        },
      },
    );

    response.value = apiResponse;
    console.log(response.value);
  } catch (error) {
    console.error("Error fetching operations:", error);
  }
};

// Fetch operations when the component is mounted
onMounted(fetchDetails);

const formatDate = (value: string) => {
  const date = new Date(value);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

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
