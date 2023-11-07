<template>
  <div class="h-screen">
    <nav>
      <Navbar />
    </nav>
    <div class="px-4 sm:px-10 md:px-20 xl:px-40 mt-10 lg:mt-24">
      <p class="text-3xl">
        Si usted presenta alguna duda puede usar estos canales de atención:
      </p>
      <form class="px-4: lg:px-20 xl:px-40" @submit="onSubmit">
        <div
          class="grid grid-flow-row-dense grid-cols-1 lg:grid-cols-5 mt-10 lg:mt-32 gap-10 xl:gap-x-20"
        >
          <div class="lg:col-span-2">
            <InputText
              id="name"
              v-model="name"
              class="h-12 w-full shadow-md"
              placeholder="Nombres y Apellidos"
              required
              pattern="[a-zA-Z]{1,100}"
              :class="{ 'p-invalid': nameInvalid }"
            />
            <InputText
              id="email"
              v-model="email"
              class="w-full h-12 mt-6 shadow-md"
              placeholder="Email"
              required
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
              :class="{ 'p-invalid': emailInvalid }"
            />
            <small v-if="emailInvalid" class="p-error text-left">
              Formato inválido de correo
            </small>
            <InputMask
              id="basic"
              v-model="phone"
              class="w-full h-12 mt-6 shadow-md"
              mask="99-999999999"
              placeholder="Número de Teléfono"
            />
            <div class="flex align-items-center mt-6">
              <!-- TODO: Fix the size of this checkbox -->
              <Checkbox
                v-model="terms"
                inputId="terms"
                name="terms"
                :binary="true"
                class="mr-4"
              />
              <small
                >Estoy de acuerdo con qué me manden información a mi número y
                correo</small
              >
            </div>
          </div>
          <div class="lg:col-span-3">
            <Textarea
              v-model="text"
              placeholder="Escriba aquí..."
              class="w-full h-48 shadow-md"
            />
            <div class="flex justify-end mt-4">
              <Toast />
              <Button @click="onSubmit" class="h-12 w-40" label="Enviar" />
            </div>
          </div>
        </div>
        <p class="text-end mt-20">
          <span class="font-bold">Teléfono: </span>900 000 000
        </p>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { useToast } from "primevue/usetoast";

export default {
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      text: "",
      nameInvalid: false,
      emailInvalid: false,
      textInvalid: false,
      terms: false,
    };
  },
  methods: {
    onSubmit() {
      const toast = useToast();
      this.nameInvalid = !this.isValidName(this.name);
      this.emailInvalid = !this.isValidEmail();
      this.textInvalid = !this.isValidText();

      if (
        this.isValidName(this.name) &&
        this.isValidEmail() &&
        this.isValidText()
      ) {
        console.log("test");
      } else {
        toast.add({
          severity: "warn",
          summary: "Warn Message",
          detail: "Message Content",
          life: 3000,
        });
      }
    },
    isValidEmail() {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(this.email);
    },
    isValidName(nameValue: string) {
      return /^[a-zA-Z]{1,100}$/.test(nameValue);
    },
    isValidText() {
      return /^[a-zA-Z0-9]{1,500}$/.test(this.text);
    },
  },
};
</script>

<style>
.p-inputtext {
  border-radius: 1rem;
  border-width: 0rem;
  background-color: #e3f9eb;
}
.p-button {
  border-radius: 1rem;
}
</style>
