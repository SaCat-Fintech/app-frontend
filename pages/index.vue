<template>
  <section id="hero">
    <div class="grid grid-cols-1 lg:grid-cols-2">
      <div class="hidden lg:flex">
        <NuxtImg src="hero-img.png" />
      </div>
      <div
        class="text-center lg:text-end flex flex-col items-center lg:items-end mx-4 lg:mr-20 lg:ml-10"
      >
        <h1 style="font-size: 4rem" class="mb-2">SaCat Fintech</h1>
        <p style="font-size: 1.75rem">
          El vehículo que siempre haz querido, a solo un préstamo. <br />Obtener
          un préstamo vehicular nunca fue tan fácil a comparación de SaCat
        </p>
        <div
          class="mb-8 mt-6"
          style="
            background: var(--primary-color);
            width: 15.2rem;
            height: 0.0625rem;
          "
        />
        <Button label="Adquirir ahora" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style></style>
