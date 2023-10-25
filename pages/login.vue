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
      <div class="text-center flex flex-col">
        <p class="text-xl sm:text-2xl mb-6">Inicia sesión con tu cuenta</p>
        <Button
          icon="pi pi-google"
          iconPos="left"
          severity="secondary"
          class="w-72 sm:w-96 h-12 mb-4"
          label="Inicia sesión con Google"
        />
        <p class="text-xl sm:text-2xl mb-4">o</p>
        <InputText class="w-72 sm:w-96 h-12 mb-6" placeholder="Email" />
        <InputText class="w-72 sm:w-96 h-12 mb-6" placeholder="Contraseña" />
        <Button class="w-72 sm:w-96 h-12" label="Iniciar sesión" />
      </div>
    </div>
  </div>
</template>

<script lang="ts"></script>

<style></style>
