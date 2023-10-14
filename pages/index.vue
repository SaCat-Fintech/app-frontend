<template>
  <section id="hero">
    <div class="grid grid-cols-1 lg:grid-cols-2">
      <div class="hidden lg:flex">
        <NuxtImg src="hero-img.png" />
      </div>
      <div
        class="text-center lg:text-end flex flex-col items-center lg:items-end mx-4 lg:mr-20 lg:pl-8"
      >
        <h1 style="font-size: 4rem" class="mb-3 xl:mt-6">SaCat Fintech</h1>
        <p style="font-size: 1.75rem" class="max-w-[33rem]">
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
        <Button label="Adquirir ahora" @click="onClickLogin" />
      </div>
    </div>
  </section>
  <section id="benefits">
    <div class="text-center flex flex-col">
      <h2 class="mx-6">Descubre los beneficios que tenemos</h2>
      <div class="grid grid-cols-1 lg:grid-cols-4 mt-14 mx-10">
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2"
        >
          <HeroCard
            cardTitle="Tasa nomal o efectiva"
            cardText="Tú eliges que tipo de tasa deseas usar con total libertad."
          />
          <HeroCard
            cardTitle="Dólares o soles"
            cardText="Puedes elegir entre soles o dólares para realizar tus operaciones sin complicación."
          />
        </div>
        <NuxtImg
          class="col-span-2 px-4 md:px-36 lg:px-10 xl:px-28 2xl:px-40 pb-10 lg:py-0"
          src="hero-cat.png"
        />
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2"
        >
          <HeroCard
            cardTitle="Elige tu frecuencia de pago"
            cardText="Tienes opciones como Mensual, Bimestral, Trimestral, Semestral o Anual."
          />
          <HeroCard
            cardTitle="Selecciona tu periodo de gracia"
            cardText="Puedes elegir entre parcial, total y ninguno."
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const onClickLogin = () => {
  return navigateTo("/login");
};
</script>

<style></style>
