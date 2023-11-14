<template>
  <section id="hero" class="h-screen">
    <div class="grid grid-cols-1 lg:grid-cols-2 mt-32 lg:mt-20">
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
  <section id="benefits" class="mb-40 sm:mb-60 lg:mb-0 lg:h-screen">
    <div class="text-center flex flex-col mt-32 lg:mt-20">
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
          class="col-span-2 px-4 md:px-36 lg:px-10 xl:px-16 2xl:px-40 pb-10 lg:py-0"
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
  <section id="info" class="mb-40 sm:mb-60 lg:mb-0 lg:h-screen">
    <div class="text-center">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-10">
        <div
          class="text-3xl flex items-center justify-center px-12 py-20"
          style="background: var(--light-700)"
        >
          100% digital
        </div>
        <div
          class="text-xl flex items-center justify-center px-12 py-20"
          style="border-color: var(--light-700); border-width: 2px"
        >
          Ya no tienes que ir al banco para solicitar el Préstamo Efectivo que
          necesitas, hazlo desde donde estés.
        </div>
        <div
          class="text-3xl flex items-center justify-center px-12 py-20"
          style="background: var(--light-200)"
        >
          Personaliza tu préstamo
        </div>
        <div
          class="text-xl flex items-center justify-center px-12 py-20"
          style="border-color: var(--light-200); border-width: 2px"
        >
          Pide el monto y las cuotas que necesites.
        </div>
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-10 mt-6"
      >
        <div
          class="text-xl flex items-center justify-center px-12 py-20"
          style="border-color: var(--light-200); border-width: 2px"
        >
          Puedes elegir entre 24 o 26 meses
        </div>
        <div
          class="text-3xl flex items-center justify-center px-12 py-20"
          style="background: var(--light-200)"
        >
          Elige tus cuotas
        </div>
        <div
          class="text-xl flex items-center justify-center px-12 py-20"
          style="border-color: var(--light-700); border-width: 2px"
        >
          Al instante y sin pagar comisiones. Si no tienes una cuenta, te
          creamos una sin costo y con tarjeta digital.
        </div>
        <div
          class="text-3xl flex items-center justify-center px-12 py-20"
          style="background: var(--light-700)"
        >
          Recíbelo en tu cuenta
        </div>
      </div>
    </div>
  </section>
  <section id="questions" class="lg:h-screen">
    <div class="flex justify-center items-center h-5/6">
      <div class="text-center flex flex-col">
        <h2 class="text-center px-4">Preguntas frecuentes</h2>
        <Accordion
          :activeIndex="0"
          class="w-screen sm:w-[40rem] lg:w-[60rem] mt-14 text-left"
        >
          <AccordionTab
            v-for="tab in tabs"
            :key="tab.title"
            :header="tab.title"
          >
            <p class="m-0">{{ tab.content }}</p>
          </AccordionTab>
        </Accordion>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const onClickLogin = () => {
  return navigateTo("/login");
};
const tabs = ref([
  {
    title: "¿Cómo solicitar un préstamo online?",
    content:
      "Lorem ipsum dolor sit amet consectetur. Nisi vel venenatis id a arcu lectus lorem felis. Ipsum amet laoreeteleifend fermentum aliquet amet elementum facilisi ut. Ut convallis semper fames ultricies neque nunc.Et magna adipiscing adipiscing viverra vestibulum.",
  },
  {
    title: "¿Qué necesito para solicitar un préstamo online?",
    content:
      "Lorem ipsum dolor sit amet consectetur. Nisi vel venenatis id a arcu lectus lorem felis. Ipsum amet laoreeteleifend fermentum aliquet amet elementum facilisi ut. Ut convallis semper fames ultricies neque nunc.Et magna adipiscing adipiscing viverra vestibulum.",
  },
  {
    title: "¿Puedo personalizar mi préstamo online?",
    content:
      "Lorem ipsum dolor sit amet consectetur. Nisi vel venenatis id a arcu lectus lorem felis. Ipsum amet laoreeteleifend fermentum aliquet amet elementum facilisi ut. Ut convallis semper fames ultricies neque nunc.Et magna adipiscing adipiscing viverra vestibulum.",
  },
  {
    title: "¿En cuánto tiempo recibiré el préstamo?",
    content:
      "Lorem ipsum dolor sit amet consectetur. Nisi vel venenatis id a arcu lectus lorem felis. Ipsum amet laoreeteleifend fermentum aliquet amet elementum facilisi ut. Ut convallis semper fames ultricies neque nunc.Et magna adipiscing adipiscing viverra vestibulum.",
  },
]);
</script>

<style></style>
