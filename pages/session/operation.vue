<template>
  <Toast />
  <div class="h-screen">
    <nav>
      <Navbar />
    </nav>
    <form @submit.prevent="onSubmitForm">
      <div class="grid grid-cols-1 lg:grid-cols-3 px-4 sm:px-20 lg:px-32 mt-16">
        <div class="lg:pl-10" id="col-1">
          <div>
            1. Seleccionar moneda:
            <i
              class="pi pi-info-circle p-1"
              v-tooltip.right="
                'Elija la moneda que se va a usar en toda la corrida.'
              "
              style="font-size: 1rem; color: var(--primary-color)"
            ></i>
          </div>
          <div class="flex flex-wrap gap-x-6 mt-4 ml-4">
            <div class="flex align-items-center">
              <RadioButton
                v-model="formData.currency"
                inputId="currency1"
                value="PEN"
              />
              <label for="currency1" class="ml-2">Soles</label>
            </div>
            <div class="flex align-items-center">
              <RadioButton
                v-model="formData.currency"
                inputId="currency2"
                value="USD"
              />
              <label for="currency2" class="ml-2">Dólares</label>
            </div>
          </div>
          <div class="flex flex-col">
            <div class="mt-6">
              2. Valor del vehículo:
              <i
                class="pi pi-info-circle p-1"
                v-tooltip.right="
                  'Ingrese el valor total del vehículo a financiar.'
                "
                style="font-size: 1rem; color: var(--primary-color)"
              ></i>
            </div>
            <InputNumber
              placeholder="ej. 60,000"
              id="number-input"
              v-model="formData.vehicleCost"
              class="h-10 mt-4 ml-4 w-20"
              :max="2800000"
            />
          </div>
          <div class="flex flex-col">
            <div class="mt-6">
              3. Porcentaje de cuota inicial:
              <i
                class="pi pi-info-circle p-1"
                v-tooltip.right="
                  'Porcentaje del total del valor del vehículo que debe pagar al inicio del proceso para obtener el financiamiento. Este valor debe estar entre 15 y 35.'
                "
                style="font-size: 1rem; color: var(--primary-color)"
              ></i>
            </div>
            <InputNumber
              placeholder="ej. 15 - 35"
              id="percentage-input"
              v-model="formData.initialPaymentPercentage"
              class="h-10 mt-4 ml-4 w-20"
              suffix="%"
              :min="15"
              :max="35"
            />
            <small class="ml-4 mt-2 w-52" style="color: var(--primary-color)"
              >Se recomienda un 20% del porcentaje de la Cuota Inicial</small
            >
          </div>
          <div class="flex flex-col">
            <div class="mt-6">
              4. Porcentaje de financiación:
              <i
                class="pi pi-info-circle p-1"
                v-tooltip.right="
                  'Porcentaje del valor total del vehículo que se financia a través del préstamo. Este valor debe estar entre 30 y 40.'
                "
                style="font-size: 1rem; color: var(--primary-color)"
              ></i>
            </div>
            <InputNumber
              placeholder="ej. 30 - 40"
              id="number-input"
              v-model="formData.financingPercentage"
              suffix="%"
              :min="30"
              :max="40"
              class="h-10 mt-4 ml-4 w-20"
            />
          </div>
          <div class="mt-6">
            5. Seleccionar tipo de tasa:

            <i
              class="pi pi-info-circle p-1"
              v-tooltip.right="
                'Si se selecciona nominal, significa que los intereses se calculan sobre el capital original, mientras que en efectiva, los intereses se calculan sobre el capital más los intereses acumulados. En caso elija Nominal, tendrá que escoger la capitalización en el siguiente paso.'
              "
              style="font-size: 1rem; color: var(--primary-color)"
            ></i>
          </div>
          <div class="flex flex-wrap gap-x-6 mt-4 ml-4">
            <div class="flex align-items-center" @change="handleRateTypeChange">
              <RadioButton
                v-model="formData.rateType"
                inputId="rate1"
                value="EFFECTIVE"
              />
              <label for="rate1" class="ml-2">Efectiva</label>
            </div>
            <div class="flex align-items-center">
              <RadioButton
                v-model="formData.rateType"
                inputId="rate2"
                value="NOMINAL"
              />
              <label for="rate2" class="ml-2">Nominal</label>
            </div>
          </div>
          <div class="mt-6" :style="{ opacity: !isNominalRate ? '0.3' : '1' }">
            6. Seleccionar capitalización:

            <i
              class="pi pi-info-circle p-1"
              v-tooltip.right="
                'Indica cómo se calculará el interés sobre el préstamo: mensual, trimestral, anual, etc.'
              "
              style="font-size: 1rem; color: var(--primary-color)"
            ></i>
          </div>
          <div class="card flex justify-content-center">
            <Dropdown
              v-model="formData.capitalization"
              :options="capitalizations"
              showClear
              optionLabel="name"
              class="h-10 mt-4 ml-4"
              :disabled="!isNominalRate"
            />
          </div>
        </div>
        <div class="lg:pl-10" id="col-2">
          <div>
            7. Seleccionar tiempo de la tasa:
            <i
              class="pi pi-info-circle p-1"
              v-tooltip.right="
                'Es el periodo para el cual se establece la tasa de interés, por ejemplo, anual, mensual, trimestral, etc.'
              "
              style="font-size: 1rem; color: var(--primary-color)"
            ></i>
          </div>
          <div class="card flex justify-content-center">
            <Dropdown
              v-model="formData.ratePeriod"
              :options="capitalizations"
              showClear
              optionLabel="name"
              class="h-10 mt-4 ml-4"
            />
          </div>
          <div class="flex flex-col">
            <div class="mt-6">
              8. Ingrese el valor de la tasa:
              <i
                class="pi pi-info-circle p-1"
                v-tooltip.right="
                  'Porcentaje que se aplica al capital prestado para calcular los intereses. Este valor debe estar entre 1 a 99.'
                "
                style="font-size: 1rem; color: var(--primary-color)"
              ></i>
            </div>
            <InputNumber
              placeholder="ej. 1 - 99"
              id="number-input"
              v-model="formData.rateValue"
              suffix="%"
              :min="1"
              :max="99"
              class="h-10 mt-4 ml-4 w-20"
            />
          </div>
          <div class="mt-6">
            9. Seleccione frecuencia de pago:
            <i
              class="pi pi-info-circle p-1"
              v-tooltip.right="
                'Es la frecuencia con la que realizará las cuotas del préstamo. Puede ser mensual, trimestral, semestral, etc.'
              "
              style="font-size: 1rem; color: var(--primary-color)"
            ></i>
          </div>
          <div class="card flex justify-content-center">
            <Dropdown
              v-model="formData.paymentFrequency"
              :options="capitalizations"
              showClear
              optionLabel="name"
              class="h-10 mt-4 ml-4"
            />
          </div>
          <div class="mt-6">
            10. Cantidad de cuotas:
            <i
              class="pi pi-info-circle p-1"
              v-tooltip.right="
                'Número total de pagos que se deben realizar para saldar el préstamo. Puede escoger entre 24 y 36 cuotas.'
              "
              style="font-size: 1rem; color: var(--primary-color)"
            ></i>
          </div>
          <div class="card flex justify-content-center">
            <Dropdown
              v-model="formData.feesAmount"
              :options="feesAmounts"
              showClear
              optionLabel="name"
              class="h-10 mt-4 ml-4"
              @change="handleFeesAmountChange"
            />
          </div>
          <div class="flex flex-col">
            <div class="mt-6">
              11. Ingresar el valor COK:
              <i
                class="pi pi-info-circle p-1"
                v-tooltip.right="
                  'El costo de oportunidad del capital refleja la tasa de rendimiento que podría obtenerse al invertir el dinero en otra alternativa.'
                "
                style="font-size: 1rem; color: var(--primary-color)"
              ></i>
            </div>
            <InputNumber
              placeholder="ej. 1 - 99"
              id="number-input"
              v-model="formData.cok"
              :min="1"
              :max="99"
              class="h-10 mt-4 ml-4 w-20"
            />
          </div>
          <div class="mt-6">
            12. Seleccionar plazo de gracia:
            <i
              class="pi pi-info-circle p-1"
              v-tooltip.right="
                'Ninguna: No se otorga ningún periodo de gracia para comenzar a realizar los pagos. Total: Se permite un periodo completo sin realizar pagos. Parcial: Se permite un periodo en el que se pagan los intereses, pero se mantiene la obligación de pago del capital.'
              "
              style="font-size: 1rem; color: var(--primary-color)"
            ></i>
          </div>
          <div class="card flex justify-content-center">
            <Dropdown
              v-model="formData.gracePeriodType"
              :options="gracePeriodTypes"
              showClear
              optionLabel="name"
              class="h-10 mt-4 ml-4"
              @change="handleGracePeriodChange"
            />
          </div>
        </div>
        <div id="col-3">
          <div
            :style="{
              opacity:
                formData.gracePeriodType &&
                formData.gracePeriodType.name !== 'Parcial' &&
                formData.gracePeriodType.name !== 'Total'
                  ? '0.3'
                  : '1',
            }"
          >
            13. Número de periodos de gracia:
            <i
              class="pi pi-info-circle p-1"
              v-tooltip.right="'Se permiten como máximo 3 periodos de gracia.'"
              style="font-size: 1rem; color: var(--primary-color)"
            ></i>
          </div>
          <div class="card flex justify-content-center">
            <Dropdown
              v-model="formData.gracePeriodNumber"
              :options="gracePeriodNumbers"
              showClear
              optionLabel="name"
              class="h-10 mt-4 ml-4"
              @change="handleGracePeriodNumberChange"
              :disabled="
                formData.gracePeriodType! &&
                formData.gracePeriodType.name !== 'Parcial' &&
                formData.gracePeriodType.name !== 'Total'
              "
            />
          </div>
          <div
            class="mt-6"
            :style="{
              opacity:
                formData.gracePeriodType &&
                formData.gracePeriodType.name !== 'Parcial' &&
                formData.gracePeriodType.name !== 'Total'
                  ? '0.3'
                  : '1',
            }"
          >
            14. Número de la cuota:
            <i
              class="pi pi-info-circle p-1"
              v-tooltip.right="
                'Especifica a qué cuota se aplicará el periodo de gracia seleccionado. Puede escoger cualquier cuota menos la última.'
              "
              style="font-size: 1rem; color: var(--primary-color)"
            ></i>
          </div>
          <div class="grid grid-rows-3">
            <div class="period-div grid grid-cols-2 mt-2">
              <div
                class="text-right pr-6 mt-2"
                :style="{
                  opacity:
                    formData.gracePeriodType &&
                    formData.gracePeriodType.name !== 'Parcial' &&
                    formData.gracePeriodType.name !== 'Total'
                      ? '0.3'
                      : '1',
                }"
              >
                1er periodo :
              </div>
              <InputNumber
                :placeholder="getMaxFeePlaceholder"
                id="number-input"
                v-model="formData.firstFee"
                :min="1"
                :max="getMaxFeeValue"
                class="h-10 w-20"
                :disabled="
                  formData.gracePeriodType! &&
                  formData.gracePeriodType.name !== 'Parcial' &&
                  formData.gracePeriodType.name !== 'Total'
                "
              />
            </div>
            <div class="period-div grid grid-cols-2 mt-2">
              <div
                class="text-right pr-6 mt-2"
                :style="{
                  opacity:
                    formData.gracePeriodType &&
                    formData.gracePeriodType.name !== 'Parcial' &&
                    formData.gracePeriodType.name !== 'Total'
                      ? '0.3'
                      : '1',
                }"
              >
                2do periodo :
              </div>
              <InputNumber
                :placeholder="getMaxFeePlaceholder"
                id="number-input"
                v-model="formData.secondFee"
                :min="1"
                :max="getMaxFeeValue"
                class="h-10 w-20"
                :disabled="
                  (formData.gracePeriodType! &&
                    formData.gracePeriodType.name !== 'Parcial' &&
                    formData.gracePeriodType.name !== 'Total') ||
                  (formData.gracePeriodNumber &&
                    formData.gracePeriodNumber.value < 2)
                "
              />
            </div>
            <div class="period-div grid grid-cols-2 mt-2">
              <div
                class="text-right pr-6 mt-2"
                :style="{
                  opacity:
                    formData.gracePeriodType &&
                    formData.gracePeriodType.name !== 'Parcial' &&
                    formData.gracePeriodType.name !== 'Total'
                      ? '0.3'
                      : '1',
                }"
              >
                3er periodo :
              </div>
              <InputNumber
                :placeholder="getMaxFeePlaceholder"
                id="number-input"
                v-model="formData.thirdFee"
                :min="1"
                :max="getMaxFeeValue"
                class="h-10 w-20"
                :disabled="
                  (formData.gracePeriodType! &&
                    formData.gracePeriodType.name !== 'Parcial' &&
                    formData.gracePeriodType.name !== 'Total') ||
                  (formData.gracePeriodNumber &&
                    formData.gracePeriodNumber.value < 3)
                "
              />
            </div>
          </div>
          <div class="col-span-1 flex flex-col">
            <div
              class="rounded-xl py-6 px-4 mx-8 shadow-md my-6"
              style="background: var(--light-200)"
            >
              <p class="text-center">
                Valor del vehículo:
                <span style="color: var(--light-900)">
                  {{ formatCost(formData.vehicleCost) }}
                </span>
              </p>
              <div
                class="text-center p-2 mx-6 my-6 rounded-3xl shadow-md"
                style="background: var(--light-100)"
              >
                Cuotas
              </div>
              <div class="grid grid-cols-3 gap-x-4">
                <div>
                  <OperationCard
                    cardOutTitle="Inicial"
                    :cardValue="formData.vehicleCost!"
                    :cardPercentage="formData.initialPaymentPercentage!"
                  />
                </div>
                <div>
                  <OperationCard
                    cardOutTitle="Financiación"
                    :cardValue="formData.vehicleCost!"
                    :cardPercentage="formData.financingPercentage!"
                  />
                </div>
                <div>
                  <OperationCard
                    cardOutTitle="Final"
                    :cardValue="formData.vehicleCost!"
                    :cardPercentage="getFinalPercentage!"
                  />
                </div>
              </div>
              <div class="grid grid-cols-2 mt-6 text-center">
                <div>Plazos de gracia</div>
                <div>
                  <span style="color: var(--light-900)">
                    {{ showFeesAvailable }}
                  </span>
                </div>
              </div>
            </div>
            <div class="text-center">
              <Button
                severity="secondary"
                class="w-40 h-12 shadow-md"
                label="Calcular"
                @click="onSubmitForm"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";

const toast = useToast();
const router = useRouter();

const config = useRuntimeConfig();

const formData = ref({
  currency: "PEN",
  vehicleCost: null,
  initialPaymentPercentage: null,
  financingPercentage: null,
  rateType: "EFFECTIVE",
  rateValue: null,
  capitalization: null,
  ratePeriod: null,
  paymentFrequency: null,
  feesAmount: null,
  cok: null,
  gracePeriodType: null,
  gracePeriodNumber: null,
  firstFee: null,
  secondFee: null,
  thirdFee: null,
});

const formDataValid = ref({
  currency: true,
  vehicleCost: false,
  initialPaymentPercentage: false,
  financingPercentage: false,
  rateType: true,
  rateValue: false,
  capitalization: false,
  ratePeriod: false,
  paymentFrequency: false,
  feesAmount: false,
  cok: false,
  gracePeriodType: false,
  gracePeriodNumber: false,
  firstFee: false,
  secondFee: false,
  thirdFee: false,
});

const toastLifetime = 3500;

const capitalizations = ref([
  { value: "annually", name: "Anual" },
  { value: "semester", name: "Semestral" },
  { value: "quatrimesterly", name: "Cuatrimestral" },
  { value: "quarterly", name: "Trimestral" },
  { value: "bimonthly", name: "Bimestral" },
  { value: "monthly", name: "Mensual" },
  { value: "biweekly", name: "Quincenal" },
  { value: "daily", name: "Diario" },
]);

const feesAmounts = ref([
  { name: "24", value: 24 },
  { name: "36", value: 36 },
]);

const gracePeriodTypes = ref([
  { value: "TOTAL", name: "Total" },
  { value: "PARCIAL", name: "Parcial" },
  { value: "NONE", name: "Ninguno" },
]);

const gracePeriodNumbers = ref([
  { name: "1", value: 1 },
  { name: "2", value: 2 },
  { name: "3", value: 3 },
]);

const isNominalRate = computed(() => formData.value.rateType === "NOMINAL");

const getMaxFeeValue = computed(() => {
  if (formData.value.feesAmount !== null) {
    return formData.value.feesAmount.name === "24" ? 23 : 35;
  }
  return 35;
});

const getMaxFeePlaceholder = computed(() => {
  const init = "1 - ";
  if (formData.value.feesAmount !== null) {
    return formData.value.feesAmount.name === "24" ? init + "23" : init + "35";
  }
  return init + "35";
});

const getFinalPercentage = computed(() => {
  if (
    formData.value.initialPaymentPercentage !== null &&
    formData.value.financingPercentage !== null
  ) {
    return (
      100 -
      formData.value.initialPaymentPercentage -
      formData.value.financingPercentage
    ).toString();
  }
  return null;
});

const showFeesAvailable = computed(() => {
  if (
    formData.value.firstFee &&
    formData.value.secondFee &&
    formData.value.thirdFee
  ) {
    return `${formData.value.firstFee} - ${formData.value.secondFee} - ${formData.value.thirdFee}`;
  } else if (formData.value.firstFee && formData.value.secondFee) {
    return `${formData.value.firstFee} - ${formData.value.secondFee}`;
  } else if (formData.value.firstFee && formData.value.thirdFee) {
    return `${formData.value.firstFee} - ${formData.value.thirdFee}`;
  } else if (formData.value.secondFee && formData.value.thirdFee) {
    return `${formData.value.secondFee} - ${formData.value.thirdFee}`;
  } else if (formData.value.firstFee) {
    return formData.value.firstFee;
  } else if (formData.value.secondFee) {
    return formData.value.secondFee;
  } else if (formData.value.thirdFee) {
    return formData.value.thirdFee;
  }
});

const formatCost = (value: any) => {
  if (value === null) {
    return "-";
  } else {
    return value.toLocaleString();
  }
};

const handleRateTypeChange = () => {
  if (formData.value.rateType) {
    if (formData.value.rateType === "EFFECTIVE") {
      formData.value.capitalization = null;
    }
  } else {
    formData.value.capitalization = null;
  }
};

const handleFeesAmountChange = () => {
  formData.value.firstFee = null;
  formData.value.secondFee = null;
  formData.value.thirdFee = null;
};

const handleGracePeriodChange = () => {
  if (
    formData.value.gracePeriodType &&
    formData.value.gracePeriodType.name !== "Parcial" &&
    formData.value.gracePeriodType.name !== "Total"
  ) {
    formData.value.gracePeriodNumber = null;
    formData.value.firstFee = null;
    formData.value.secondFee = null;
    formData.value.thirdFee = null;
  }
};

const handleGracePeriodNumberChange = () => {
  if (formData.value.gracePeriodNumber) {
    if (formData.value.gracePeriodNumber.value < 3) {
      formData.value.thirdFee = null;
    }
    if (formData.value.gracePeriodNumber.value < 2) {
      formData.value.secondFee = null;
    }
  } else {
    formData.value.firstFee = null;
    formData.value.secondFee = null;
    formData.value.thirdFee = null;
  }
};

watch(() => formData.value.gracePeriodType, handleGracePeriodChange);
watch(() => formData.value.rateType, handleRateTypeChange);

const validateForm = () => {
  for (const key in formData.value) {
    if (!formData.value[key]) {
      formDataValid.value[key] = false;
    } else {
      formDataValid.value[key] = true;
    }
  }

  // if rateType is "EFFECTIVE", capitalization is valid
  if (formData.value.rateType === "EFFECTIVE") {
    formDataValid.value.capitalization = true;
  }

  // if gracePeriodType is "NONE", then  FirstFee, SecondFee, ThirdFee, gracePeriodNumber are valid
  if (
    formData.value.gracePeriodType &&
    formData.value.gracePeriodType.value === "NONE"
  ) {
    formDataValid.value.firstFee = true;
    formDataValid.value.secondFee = true;
    formDataValid.value.thirdFee = true;
    formDataValid.value.gracePeriodNumber = true;
  }

  // if gracePeriodNumber is 1, then  SecondFee, Third Fee are valid
  if (
    formData.value.gracePeriodNumber &&
    formData.value.gracePeriodNumber.value === 1
  ) {
    formDataValid.value.secondFee = true;
    formDataValid.value.thirdFee = true;
  }

  // if gracePeriodNumber is 2, then Third Fee is valid
  if (
    formData.value.gracePeriodNumber &&
    formData.value.gracePeriodNumber.value === 2
  ) {
    formDataValid.value.thirdFee = true;
  }

  // FirstFee, SecondFee, ThirdFee have to be different
  if (
    (formData.value.firstFee !== null &&
      (formData.value.firstFee === formData.value.secondFee ||
        formData.value.firstFee === formData.value.thirdFee)) ||
    (formData.value.secondFee !== null &&
      formData.value.secondFee === formData.value.thirdFee)
  ) {
    formDataValid.value.firstFee = false;
    formDataValid.value.secondFee = false;
    formDataValid.value.thirdFee = false;

    toast.add({
      severity: "error",
      summary: "Hay periodos iguales",
      detail:
        "Los periodos no pueden ser iguales. Porfavor coloque valores de periodos.",
      life: toastLifetime,
    });
    return false;
  }

  if (Object.values(formDataValid.value).every((valid) => valid)) {
    return true;
  } else {
    toast.add({
      severity: "error",
      summary: "Campos vacios",
      detail: "Es posible que esten faltando datos en la operación.",
      life: toastLifetime,
    });
    return false;
  }
};

const onSubmitForm = async () => {
  console.log("Submit logic");
  console.log(formData.value);

  if (validateForm()) {
    console.log("Form is valid. Submitting...");

    // Data formatted for body
    let _capitalization = "null";
    if (formData.value.rateType === "NOMINAL") {
      _capitalization = formData.value.capitalization.value;
    }

    let _periodNumbers = [];
    if (formData.value.gracePeriodType.value !== "NONE") {
      _periodNumbers = [..._periodNumbers, formData.value.firstFee];

      if (formData.value.secondFee) {
        _periodNumbers = [..._periodNumbers, formData.value.secondFee];
      }

      if (formData.value.thirdFee) {
        _periodNumbers = [..._periodNumbers, formData.value.thirdFee];
      }
    }

    try {
      // Send data to endpoint for operation
      const response: any = await $fetch(
        config.public.baseUrl +
          "/api/v1/session/operation/" +
          localStorage.getItem("user_profile_id"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currency: formData.value.currency,
            vehicle_cost: formData.value.vehicleCost,
            initial_payment_percentage:
              formData.value.initialPaymentPercentage / 100,
            financing_percentage: formData.value.financingPercentage / 100,
            rate: {
              rate_type: formData.value.rateType,
              rate_period: formData.value.ratePeriod.value,
              rate_value: formData.value.rateValue / 100,
              capitalization_period: _capitalization,
            },
            payment_frequency: formData.value.paymentFrequency.value,
            amount_of_fees: formData.value.feesAmount.value,
            cok_percentage: formData.value.cok / 100,
            gracePeriod: {
              type: formData.value.gracePeriodType.value,
              period_numbers: _periodNumbers,
            },
          }),
        },
      );

      // Retrieve the id obtained from the operation
      const operation_id = response.id;

      // Go to site where operation details are
      router.push("/session/details/" + operation_id);
    } catch (error: any) {
      console.log("Error:", error);
    }
  } else {
    console.log("Form is invalid.");
  }
};
</script>

<style>
.p-inputtext {
  border-radius: 1rem;
  width: 14rem;
}
.p-dropdown {
  border-radius: 1rem;
  width: 14rem;
}
.p-dropdown-label {
  padding-top: 0.5rem;
}
.p-button {
  border-radius: 1rem;
}

.period-div {
  .p-inputtext {
    border-radius: 1rem;
    width: 5rem;
  }
}
</style>
