<template>
  <div class="h-screen">
    <nav>
      <AltNavbar
        navQuestion="¿No está registrado?"
        navText="Hágalo aquí"
        navRedirect="/register"
      />
    </nav>
    <div class="flex justify-center items-center h-5/6">
      <div class="text-center flex flex-col gap-4">
        <p class="text-xl sm:text-2xl">Inicia sesión con tu cuenta</p>
        <Button
          icon="pi pi-google"
          iconPos="left"
          severity="secondary"
          class="w-72 sm:w-96 h-12"
          label="Inicia sesión con Google"
        />
        <p class="text-xl sm:text-2xl mb-2">o</p>
        <form @submit.prevent="onSubmitForm" class="flex flex-col">
          <InputText
            id="email"
            v-model="email"
            class="w-72 sm:w-96 h-12"
            placeholder="Email"
            required
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
            :class="{ 'p-invalid': emailInvalid }"
          />
          <small v-if="emailInvalid" class="p-error text-left">
            Formato inválido de correo
          </small>

          <span class="p-input-icon-right mt-6">
            <i
              class="pi"
              :class="{ 'pi-eye-slash': showPassword, 'pi-eye': !showPassword }"
              @click="showPassword = !showPassword"
            />
            <InputText
              id="password"
              v-model="password"
              class="w-72 sm:w-96 h-12"
              placeholder="Contraseña"
              :type="showPassword ? 'text' : 'password'"
              pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
              title="Password must contain at least 8 characters, one lowercase letter, one uppercase letter, and one number."
              :class="{ 'p-invalid': passwordInvalid }"
            />
          </span>
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
      email: "",
      password: "",
      showPassword: false,
      emailInvalid: false,
      passwordInvalid: false,
    };
  },
  computed: {},
  methods: {
    onSubmitForm() {
      this.emailInvalid = !this.isValidEmail();
      this.passwordInvalid = !this.isValidPassword();

      if (this.isValidEmail() && this.isValidPassword()) {
        // Form is valid, proceed with submission
        console.log("Form is valid");
        // You can submit the form data to your server or perform other actions here.
      } else {
        // Form is invalid, show error messages or prevent submission
        console.log("Form is invalid");
      }
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
