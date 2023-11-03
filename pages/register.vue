<template>
  <div class="h-screen">
    <nav>
      <AltNavbar
        navQuestion="¿Ya tienes cuenta?"
        navText="Inicia sesión"
        navRedirect="/login"
      />
    </nav>
    <div class="flex justify-center items-center h-5/6">
      <div class="text-center flex flex-col gap-4">
        <p class="text-xl sm:text-2xl">Crea tu cuenta</p>
        <Button
          icon="pi pi-google"
          iconPos="left"
          severity="secondary"
          class="w-72 sm:w-96 h-12"
          label="Continuar con Google"
        />
        <p class="text-xl sm:text-2xl mb-2">o</p>
        <form @submit.prevent="onSubmitForm" class="flex flex-col">
          <InputText
            id="dni"
            v-model="dni"
            class="w-72 sm:w-96 h-12 mt-4"
            placeholder="DNI"
            required
            pattern="[0-9]{8}"
            :class="{ 'p-invalid': dniInvalid }"
          />
          <small v-if="dniInvalid" class="p-error text-left">
            Formato inválido de DNI
          </small>
          <InputText
            id="name"
            v-model="name"
            class="w-72 sm:w-96 h-12 mt-4"
            placeholder="Nombre"
            required
            pattern="[a-zA-Z]{1,16}"
            :class="{ 'p-invalid': nameInvalid }"
          />
          <small v-if="nameInvalid" class="p-error text-left">
            Formato inválido de nombre
          </small>
          <InputText
            id="lastName"
            v-model="lastName"
            class="w-72 sm:w-96 h-12 mt-4"
            placeholder="Apellido"
            required
            pattern="[a-zA-Z]{1,16}"
            :class="{ 'p-invalid': lastNameInvalid }"
          />
          <small v-if="lastNameInvalid" class="p-error text-left">
            Formato inválido de apellido
          </small>
          <Calendar
            id="dateOfBirth"
            v-model="dateOfBirth"
            class="w-72 sm:w-96 h-12 mt-4"
            placeholder="Fecha de nacimiento"
            required
            :class="{ 'p-invalid': dateOfBirthInvalid }"
            dateFormat="dd/mm/yy"
          />
          <small v-if="dateOfBirthInvalid" class="p-error text-left">
            Usted no es mayor de edad
          </small>
          <InputText
            id="email"
            v-model="email"
            class="w-72 sm:w-96 h-12 mt-4"
            placeholder="Email"
            required
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
            :class="{ 'p-invalid': emailInvalid }"
          />
          <small v-if="emailInvalid" class="p-error text-left">
            Formato inválido de correo
          </small>

          <InputText
            id="password"
            v-model="password"
            class="w-72 sm:w-96 h-12 mt-4"
            placeholder="Contraseña"
            type="text"
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
            title="Password must contain at least 8 characters, one lowercase letter, one uppercase letter, and one number."
            :class="{ 'p-invalid': passwordInvalid }"
          />
          <small v-if="passwordInvalid" class="p-error text-left">
            Formato inválido de contraseña
          </small>

          <div class="mt-4">
            <Button
              @click="onSubmitForm"
              class="w-72 sm:w-96 h-12"
              label="Iniciar sesión"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  data() {
    return {
      dni: "",
      name: "",
      lastName: "",
      dateOfBirth: "",
      email: "",
      password: "",
      dniInvalid: false,
      nameInvalid: false,
      lastNameInvalid: false,
      dateOfBirthInvalid: false,
      emailInvalid: false,
      passwordInvalid: false,
    };
  },
  computed: {},
  methods: {
    onSubmitForm() {
      this.dniInvalid = !this.isValidDni();
      this.nameInvalid = !this.isValidName(this.name);
      this.lastNameInvalid = !this.isValidName(this.lastName);
      this.dateOfBirthInvalid = !this.isValidDateOfBirth();
      this.emailInvalid = !this.isValidEmail();
      this.passwordInvalid = !this.isValidPassword();

      if (
        this.isValidDni() &&
        this.isValidName(this.name) &&
        this.isValidName(this.lastName) &&
        this.isValidDateOfBirth() &&
        this.isValidEmail() &&
        this.isValidPassword()
      ) {
        // Form is valid, proceed with submission
        console.log("Form is valid");
        // You can submit the form data to your server or perform other actions here.
      } else {
        // Form is invalid, show error messages or prevent submission
        console.log("Form is invalid");
      }
    },
    isValidDni() {
      return /^[0-9]{8}$/.test(this.dni);
    },
    isValidName(nameValue: string) {
      return /^[a-zA-Z]{1,16}$/.test(nameValue);
    },
    isValidDateOfBirth() {
      const currentDate = new Date();
      const inputDate = new Date(this.dateOfBirth);

      // Difference of age in years
      let age = currentDate.getFullYear() - inputDate.getFullYear();

      // Check if birthday has already ocurred
      if (
        currentDate.getMonth() < inputDate.getMonth() ||
        (currentDate.getMonth() === inputDate.getMonth() &&
          currentDate.getDate() < inputDate.getDate())
      ) {
        age--;
      }

      return age >= 18;
    },
    isValidEmail() {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(this.email);
    },
    isValidPassword() {
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
      return passwordPattern.test(this.password) && this.password.length >= 8;
    },
  },
};
</script>

<style></style>
