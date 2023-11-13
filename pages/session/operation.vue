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
            :max="2800000"
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
            v-model="capitalization"
            :options="capitalizations"
            showClear
            optionLabel="name"
            class="h-10 mt-4 ml-4"
            :disabled="!isNominalRate"
          />
        </div>
      </div>
      <div class="bg-sky-200" id="col-2">
        <div>7. Seleccionar tiempo de la tasa:</div>
        <div class="card flex justify-content-center">
          <Dropdown
            v-model="ratePeriod"
            :options="capitalizations"
            showClear
            optionLabel="name"
            class="h-10 mt-4 ml-4"
          />
        </div>
        <div class="flex flex-col">
          <div class="mt-6">8. Ingrese el valor de la tasa:</div>
          <InputNumber
            placeholder="ej. 1 - 99"
            id="number-input"
            v-model="rateValue"
            suffix="%"
            :min="1"
            :max="99"
            class="h-10 mt-4 ml-4 w-20"
          />
        </div>
        <div class="mt-6">9. Seleccione frecuencia de pago:</div>
        <div class="card flex justify-content-center">
          <Dropdown
            v-model="paymentFrequency"
            :options="capitalizations"
            showClear
            optionLabel="name"
            class="h-10 mt-4 ml-4"
          />
        </div>
        <div class="mt-6">10. Cantidad de cuotas:</div>
        <div class="card flex justify-content-center">
          <Dropdown
            v-model="feesAmount"
            :options="feesAmounts"
            showClear
            optionLabel="name"
            class="h-10 mt-4 ml-4"
          />
        </div>
        <div class="flex flex-col">
          <div class="mt-6">11. Ingresar el valor COK:</div>
          <InputNumber
            placeholder="ej. 1 - 99"
            id="number-input"
            v-model="cok"
            :min="1"
            :max="99"
            class="h-10 mt-4 ml-4 w-20"
          />
        </div>
        <div class="mt-6">12. Seleccionar plazo de gracia:</div>
        <div class="card flex justify-content-center">
          <Dropdown
            v-model="gracePeriodType"
            :options="gracePeriodTypes"
            showClear
            optionLabel="name"
            class="h-10 mt-4 ml-4"
          />
        </div>
      </div>
      <div class="bg-yellow-200" id="col-3">
        <div
          :style="{
            opacity:
              gracePeriodType &&
              gracePeriodType.name !== 'Parcial' &&
              gracePeriodType.name !== 'Total'
                ? '0.3'
                : '1',
          }"
        >
          <!-- Fix grace period disable selection -->
          13. Número de periodos de gracia:
        </div>
        <div class="card flex justify-content-center">
          <Dropdown
            v-model="gracePeriodNumber"
            :options="gracePeriodNumbers"
            showClear
            optionLabel="name"
            class="h-10 mt-4 ml-4"
            :disabled="
              gracePeriodType &&
              gracePeriodType.name !== 'Parcial' &&
              gracePeriodType.name !== 'Total'
            "
          />
        </div>
        <div
          class="mt-6"
          :style="{
            opacity:
              gracePeriodType &&
              gracePeriodType.name !== 'Parcial' &&
              gracePeriodType.name !== 'Total'
                ? '0.3'
                : '1',
          }"
        >
          <!-- Fix grace period disable selection -->
          14. Número de la cuota:
        </div>
        <div class="grid grid-rows-3">
          <div class="period-div grid grid-cols-2 mt-2">
            <div
              class="text-right pr-6 mt-2"
              :style="{
                opacity:
                  gracePeriodType &&
                  gracePeriodType.name !== 'Parcial' &&
                  gracePeriodType.name !== 'Total'
                    ? '0.3'
                    : '1',
              }"
            >
              1er periodo :
            </div>
            <InputNumber
              :placeholder="getMaxFeePlaceholder"
              id="number-input"
              v-model="firstFee"
              :min="1"
              :max="getMaxFeeValue"
              class="h-10 w-20"
              :disabled="
                gracePeriodType &&
                gracePeriodType.name !== 'Parcial' &&
                gracePeriodType.name !== 'Total'
              "
            />
          </div>
          <div class="period-div grid grid-cols-2 mt-2">
            <div
              class="text-right pr-6 mt-2"
              :style="{
                opacity:
                  gracePeriodType &&
                  gracePeriodType.name !== 'Parcial' &&
                  gracePeriodType.name !== 'Total'
                    ? '0.3'
                    : '1',
              }"
            >
              2do periodo :
            </div>
            <InputNumber
              :placeholder="getMaxFeePlaceholder"
              id="number-input"
              v-model="secondFee"
              :min="1"
              :max="getMaxFeeValue"
              class="h-10 w-20"
              :disabled="
                gracePeriodType &&
                gracePeriodType.name !== 'Parcial' &&
                gracePeriodType.name !== 'Total'
              "
            />
          </div>
          <div class="period-div grid grid-cols-2 mt-2">
            <div
              class="text-right pr-6 mt-2"
              :style="{
                opacity:
                  gracePeriodType &&
                  gracePeriodType.name !== 'Parcial' &&
                  gracePeriodType.name !== 'Total'
                    ? '0.3'
                    : '1',
              }"
            >
              3er periodo :
            </div>
            <InputNumber
              :placeholder="getMaxFeePlaceholder"
              id="number-input"
              v-model="thirdFee"
              :min="1"
              :max="getMaxFeeValue"
              class="h-10 w-20"
              :disabled="
                gracePeriodType &&
                gracePeriodType.name !== 'Parcial' &&
                gracePeriodType.name !== 'Total'
              "
            />
          </div>
        </div>
        <div class="col-span-1 flex flex-col items-center">
          <div
            class="w-9/12 rounded-xl text-center py-6 px-4 shadow-md my-6"
            style="background: var(--light-200)"
          >
            <p>
              Valor del vehículo:
              <span style="color: var(--light-900)">
                {{ formatCost(vehicleCost) }}
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
                  :cardValue="vehicleCost!"
                  :cardPercentage="initialPaymentPercentage!"
                />
              </div>
              <div>
                <OperationCard
                  cardOutTitle="Financiación"
                  :cardValue="vehicleCost!"
                  :cardPercentage="financingPercentage!"
                />
              </div>
              <div>
                <OperationCard
                  cardOutTitle="Final"
                  :cardValue="vehicleCost!"
                  :cardPercentage="getFinalPercentage!"
                />
              </div>
            </div>
            <div class="grid grid-cols-2 mt-6 text-center">
              <div>Plazos de gracia</div>
              <div>
                <span style="color: var(--light-900)"> 4 - 5 - 15 </span>
              </div>
            </div>
          </div>
          <Button
            severity="secondary"
            class="w-40 h-12 shadow-md"
            label="Continuar"
          />
        </div>
      </div>
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
      finalPercentage: null,
      rateType: "effective",
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
      capitalizations: [
        { name: "Anual" },
        { name: "Semestral" },
        { name: "Cuatrimestral" },
        { name: "Trimestral" },
        { name: "Bimestral" },
        { name: "Mensual" },
        { name: "Quincenal" },
        { name: "Diario" },
      ],
      feesAmounts: [{ name: "24" }, { name: "36" }],
      gracePeriodTypes: [
        { name: "Total", value: "Total" },
        { name: "Parcial", value: "Parcial" },
        { name: "Ninguno", value: "Ninguno" },
      ],
      gracePeriodNumbers: [{ name: "1" }, { name: "2" }, { name: "3" }],
    };
  },
  computed: {
    isNominalRate() {
      return this.rateType === "nominal";
    },
    getMaxFeeValue() {
      if (this.feesAmount !== null) {
        if (this.feesAmount.name === "24") {
          return 23;
        }
      }
      return 35;
    },
    getMaxFeePlaceholder() {
      let init = "1 - ";
      if (this.feesAmount !== null) {
        if (this.feesAmount.name === "24") {
          return init + "23";
        }
      }
      return init + "35";
    },
    getFinalPercentage() {
      if (
        this.initialPaymentPercentage !== null &&
        this.financingPercentage !== null
      ) {
        return (
          100 -
          this.initialPaymentPercentage -
          this.financingPercentage
        ).toString();
      }
      return null;
    },
    // hasGracePeriodNone() {
    //   return this.gracePeriodType === "Ninguno";
    // },
  },
  methods: {
    formatCost(value: any) {
      if (value === null) {
        return "-";
      } else {
        return value.toLocaleString();
      }
    },
  },
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
    width: 6rem;
  }
}
</style>
