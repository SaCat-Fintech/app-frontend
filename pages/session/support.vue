<template>
  <div class="h-screen">
    <nav>
      <Navbar />
    </nav>
    <div class="px-4 sm:px-10 md:px-20 mt-10 lg:mt-24">
      <p class="text-3xl">
        Si usted presenta alguna duda puede usar estos canales de atención:
      </p>
      <form class="px-4 md:px-20 xl:px-52 pb-20" @submit="onSubmit">
        <div
          class="grid grid-flow-row-dense grid-cols-1 lg:grid-cols-5 lg:mt-20 gap-10 xl:gap-x-20"
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
          <p>
            <span class="font-bold">Correo electrónico: </span>sacat@mail.com
          </p>
          <p><span class="font-bold">Teléfono: </span><br />900.000 000</p>
        </div>
      </form>
    </div>
  </div>
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
