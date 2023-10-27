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
        <form submit="onSubmitForm" class="flex flex-col gap-6">
          <InputText
            id="email"
            v-model="email"
            class="w-72 sm:w-96 h-12"
            placeholder="Email"
          />
          <InputText
            id="password"
            v-model="password"
            class="w-72 sm:w-96 h-12"
            placeholder="Contraseña"
          />
          <Button
            @click="onSubmitForm"
            class="w-72 sm:w-96 h-12"
            label="Iniciar sesión"
          />
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
    };
  },
  computed: {
    isValidEmail() {
      // TODO: Prevent SQL injection
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(this.email);
    },
    isValidPassword() {
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
      return passwordPattern.test(this.password) && this.password.length >= 8;
    },
  },
  methods: {
    onSubmitForm() {
      if (this.isValidEmail && this.isValidPassword) {
        console.log("SUCCESS");
      } else {
        console.log("Not cool");
      }
    },
  },
};
</script>

<style></style>
