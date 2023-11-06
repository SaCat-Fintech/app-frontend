<template>
  <div class="h-screen">
    <nav>
      <Navbar />
    </nav>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-x-12 px-4 md:px-20 mt-8">
      <div class="bg-red-200" id="col-1">
        <div>1. Seleccionar moneda:</div>
        <div class="flex flex-wrap gap-x-6 mt-4 ml-4">
          <div class="flex align-items-center">
            <RadioButton v-model="currency" inputId="currency1" value="soles" />
            <label for="currency1" class="ml-2">Soles</label>
          </div>
          <div class="flex align-items-center">
            <RadioButton
              v-model="currency"
              inputId="currency2"
              value="dollars"
            />
            <label for="currency2" class="ml-2">Dólares</label>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="mt-6">2. Valor del vehículo:</div>
          <InputNumber
            placeholder="ej. 60,000"
            id="number-input"
            v-model="vehicleCost"
            class="h-10 mt-4 ml-4 w-20"
          />
        </div>
        <div class="flex flex-col">
          <div class="mt-6">3. Porcentaje de cuota inicial:</div>
          <InputNumber
            placeholder="ej. 15 - 35"
            id="percentage-input"
            v-model="initialPaymentPercentage"
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
          <div class="mt-6">4. Porcentaje de financiación:</div>
          <InputNumber
            placeholder="ej. 30 - 40"
            id="number-input"
            v-model="financingPercentage"
            suffix="%"
            :min="30"
            :max="40"
            class="h-10 mt-4 ml-4 w-20"
          />
        </div>
        <div class="mt-6">5. Seleccionar tipo de tasa:</div>
        <div class="flex flex-wrap gap-x-6 mt-4 ml-4">
          <div class="flex align-items-center">
            <RadioButton v-model="rateType" inputId="rate1" value="effective" />
            <label for="rate1" class="ml-2">Efectiva</label>
          </div>
          <div class="flex align-items-center">
            <RadioButton v-model="rateType" inputId="rate2" value="nominal" />
            <label for="rate2" class="ml-2">Nominal</label>
          </div>
        </div>
        <div class="mt-6" :style="{ opacity: !isNominalRate ? '0.3' : '1' }">
          6. Seleccionar capitalización:
        </div>
        <div class="card flex justify-content-center">
          <Dropdown
            v-model="ratePeriod"
            :options="capitalizations"
            showClear
            optionLabel="name"
            class="h-10 mt-4 ml-4"
            :disabled="!isNominalRate"
          />
        </div>
      </div>
      <div class="bg-sky-200" id="col-2">02</div>
      <div class="bg-green-200" id="col-3">03</div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      currency: "soles", // Default selected value
      vehicleCost: null,
      initialPaymentPercentage: null,
      financingPercentage: null,
      rateType: "effective",
      ratePeriod: null,
      capitalizations: [
        { name: "ANUAL" },
        { name: "SEMESTRAL" },
        { name: "CUATRIMESTRAL" },
        { name: "TRIMESTRAL" },
        { name: "BIMESTRAL" },
        { name: "MENSUAL" },
        { name: "QUINCENAL" },
        { name: "DIARIO" },
      ],
    };
  },
  computed: {
    isNominalRate() {
      return this.rateType === "nominal";
    },
  },
  methods: {},
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
</style>
