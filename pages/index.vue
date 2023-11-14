<template>
  <div class="fixed top-0 w-screen bg-white z-10">
    <LandingNavbar />
  </div>
  <section id="hero" class="mb-20 lg:mb-0 lg:h-screen">
    <div class="flex justify-center items-center h-5/6">
      <div class="text-center flex flex-col w-screen mt-28">
        <div class="grid grid-cols-1 lg:grid-cols-2">
          <div class="hidden lg:flex">
            <NuxtImg src="hero-img.png" />
          </div>
          <div
            class="text-center lg:text-end flex flex-col items-center lg:items-end mx-4 lg:mr-20 lg:pl-8"
          >
            <h1 style="font-size: 4rem" class="mb-3 xl:mt-6">SaCat Fintech</h1>
            <p style="font-size: 1.75rem" class="max-w-[33rem]">
              El vehículo que siempre haz querido, a solo un préstamo.
              <br />Obtener un préstamo vehicular nunca fue tan fácil a
              comparación de SaCat
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
      </div>
    </div>
  </section>
  <section id="benefits" class="mb-20 lg:mb-0 lg:h-screen">
    <div class="flex justify-center items-center h-5/6">
      <div class="text-center flex flex-col w-screen">
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
      </div>
    </div>
  </section>
  <section id="info" class="mb-20 lg:mb-0 lg:h-screen">
    <div class="flex justify-center items-center h-5/6">
      <div class="text-center flex flex-col lg:mt-20">
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
    </div>
  </section>
  <section id="questions" class="mb-20 lg:mb-0 lg:h-screen">
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

  <footer style="background-color: var(--light-700)">
    <form class="px-4 md:px-20 xl:px-52 pb-20" @submit="onSubmit">
      <div
        class="grid grid-flow-row-dense grid-cols-1 lg:grid-cols-5 mt-10 lg:mt-32 gap-10 xl:gap-x-20 pt-16"
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
          <small v-if="nameInvalid" class="p-error text-left">
            Formato inválido de nombre.
          </small>
          <InputText
            id="email"
            v-model="email"
            class="w-full h-12 mt-6 shadow-md"
            placeholder="Email"
            required
            :class="{ 'p-invalid': emailInvalid }"
          />
          <small v-if="emailInvalid" class="p-error text-left">
            Formato inválido de correo.
          </small>
          <InputMask
            id="basic"
            v-model="phone"
            class="w-full h-12 mt-6 shadow-md"
            mask="99-999999999"
            placeholder="Número de Teléfono"
            :class="{ 'p-invalid': phoneInvalid }"
          />
          <small v-if="nameInvalid" class="p-error text-left">
            Formato inválido de número telefónico.
          </small>
          <div class="flex align-items-center mt-6">
            <Checkbox
              v-model="terms"
              inputId="terms"
              name="terms"
              :binary="true"
              class="mr-4"
            />
            <div class="flex flex-col">
              <small
                >Estoy de acuerdo con qué me manden información a mi número y
                correo</small
              >
              <small v-if="!terms" class="p-error text-left">
                Debe aceptar los términos.
              </small>
            </div>
          </div>
        </div>
        <div class="lg:col-span-3">
          <Textarea
            v-model="text"
            placeholder="Escriba aquí..."
            class="w-full h-48 shadow-md"
            :class="{ 'p-invalid': textInvalid }"
          />
          <div class="flex flex-col">
            <small class="mr-2">Palabras: {{ textWordCount }}</small>
            <small v-if="textInvalid" class="p-error text-left">
              Debe agregar un mensaje de 20 a 200 palabras.
            </small>
          </div>
          <div class="flex justify-end mt-4">
            <Button @click="onSubmit" class="h-12 w-40" label="Enviar" />
          </div>
        </div>
      </div>
      <div
        class="text-left text-xl mt-20 grid grid-cols-1 lg:grid-cols-3 gap-y-4 gap-x-48"
      >
        <p>
          <span class="font-bold">Dirección: </span>Av Lorem ipsum dolor sit
          amet
        </p>
        <p><span class="font-bold">Correo electrónico: </span>sacat@mail.com</p>
        <p><span class="font-bold">Teléfono: </span><br />900.000 000</p>
      </div>
    </form>
  </footer>
</template>

<script setup lang="ts">
const name = ref("");
const email = ref("");
const phone = ref("");
const terms = ref(false);
const text = ref("");
const textWordCount = ref(0);

const nameInvalid = ref(false);
const emailInvalid = ref(false);
const phoneInvalid = ref(false);
const textInvalid = ref(false);

const validateText = () => {
  const words = text.value
    .trim()
    .split(/\s+/)
    .filter((word) => word !== ""); // Count non-empty words
  const wordCount = words.length;

  textWordCount.value = wordCount;

  const minWords = 20;
  const maxWords = 200;

  if (!text.value || wordCount < minWords || wordCount > maxWords) {
    textInvalid.value = true;
    return false;
  }

  textInvalid.value = false;
  return true;
};

watchEffect(() => {
  validateText();
});

const onSubmit = () => {
  // If terms are not accepted
  if (!terms.value) {
    return;
  }
  if (
    !name.value ||
    name.value.split(" ").length < 2 ||
    name.value.length < 4
  ) {
    nameInvalid.value = true;
    return;
  }
  nameInvalid.value = false;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email.value)) {
    emailInvalid.value = true;
    return;
  } else {
    emailInvalid.value = false;
  }

  if (!phone.value) {
    phoneInvalid.value = true;
  } else {
    phoneInvalid.value = false;
  }

  if (!validateText()) {
    return;
  }

  if (
    nameInvalid.value ||
    emailInvalid.value /* add other conditions as needed */
  ) {
    return;
  }

  // TODO: Submission logic
  console.log("Form submitted:", {
    name: name.value,
    email: email.value,
    phone: phone.value,
    terms: terms.value,
    text: text.value,
  });
};

const onClickLogin = () => {
  return navigateTo("/login");
};
const tabs = ref([
  {
    title: "¿Cómo solicitar un préstamo online?",
    content:
      "Accede a la plataforma en línea de SaCat, crea una cuenta o si ya cuentas con una, inicia sesión. Una vez logueado podrás acceder a la calculadora de plan de pagos, para la cual tendrás que ingresar los datos requeridos. Completa el formulario y nuestro equipo se encargará de comunicarse contigo para verificar los siguientes pasos.",
  },
  {
    title: "¿Qué necesito para solicitar un préstamo online?",
    content:
      "Al momento de realizar la corrida se te van a pedir datos como el valor del vehículo, porcentaje de cuota inicial, porcentaje de financiación, el tipo de tasa que se va a usar, la cantidad de cuotas, entre otros datos más.",
  },
  {
    title: "¿Puedo personalizar mi préstamo online?",
    content:
      "Sí, ofrecemos opciones de personalización para adaptarnos a tus necesidades financieras. Puedes ajustar el monto del préstamo, el plazo de pago y, en algunos casos, la tasa de interés según tus preferencias y capacidad de pago. Nuestro objetivo es proporcionar flexibilidad para que encuentres la mejor solución para tus circunstancias.",
  },
  {
    title: "¿En cuánto tiempo recibiré el préstamo?",
    content:
      "El tiempo de aprobación y desembolso de tu préstamo puede variar, pero nos esforzamos por proporcionar respuestas rápidas. Una vez que hayas completado la solicitud en línea y proporcionado la documentación necesaria, nuestro equipo revisará tu solicitud en el menor tiempo posible. La mayoría de los clientes reciben sus fondos en 48 horas después de la aprobación.",
  },
]);
</script>

<style>
.p-inputtext {
  border-radius: 1rem;
  border-width: 0rem;
  background-color: #e3f9eb;
}
form {
  .p-button {
    border-radius: 0.8rem;
  }
}
</style>
