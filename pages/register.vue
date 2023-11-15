<template>
  <Toast />
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
            v-model="formData.dni"
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
            v-model="formData.name"
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
            v-model="formData.lastName"
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
            v-model="formData.dateOfBirth"
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
            v-model="formData.email"
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
            v-model="formData.password"
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
<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";

const toast = useToast();
const router = useRouter();

const formData = ref({
  dni: "",
  name: "",
  lastName: "",
  dateOfBirth: "",
  email: "",
  password: "",
});

const dniInvalid = ref(false);
const nameInvalid = ref(false);
const lastNameInvalid = ref(false);
const dateOfBirthInvalid = ref(false);
const emailInvalid = ref(false);
const passwordInvalid = ref(false);
const toastLifetime = 3500;

const onSubmitForm = async () => {
  dniInvalid.value = !isValidDni();
  nameInvalid.value = !isValidName(formData.value.name);
  lastNameInvalid.value = !isValidName(formData.value.lastName);
  dateOfBirthInvalid.value = !isValidDateOfBirth();
  emailInvalid.value = !isValidEmail();
  passwordInvalid.value = !isValidPassword();

  if (
    isValidDni() &&
    isValidName(formData.value.name) &&
    isValidName(formData.value.lastName) &&
    isValidDateOfBirth() &&
    isValidEmail() &&
    isValidPassword()
  ) {
    // Form is valid, proceed with submission
    try {
      const response = await $fetch(
        "http://localhost:3000/api/v1/auth/signUp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.value.email,
            password: formData.value.password,
            dni: formData.value.dni,
            first_name: formData.value.name,
            last_name: formData.value.lastName,
            birthdate: formData.value.dateOfBirth,
          }),
          redirect: "follow",
        },
      );

      if (response) {
        showSuccessDialog();
      } else {
        showFailureDialog(
          "No se realizado el registro correctamente. Intentelo de nuevo.",
        );
      }
    } catch (error: any) {
      // Registration failed
      showFailureDialog(error.message);
    }
  } else {
    // Form is invalid, show error messages or prevent submission
    showFailureDialog(
      "No se realizado el registro correctamente. Intentelo de nuevo.",
    );
  }
};

const showSuccessDialog = () => {
  formData.value = {
    dni: "",
    name: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    password: "",
  };

  toast.add({
    severity: "success",
    summary: "Registro exitoso",
    detail: "Se ha creado el registro existosamente",
    life: toastLifetime,
  });

  setTimeout(() => {
    router.push("/login");
  }, toastLifetime);
};
const showFailureDialog = (errorMessage: string) => {
  toast.add({
    severity: "error",
    summary: "Rechazado",
    detail: errorMessage,
    life: toastLifetime,
  });
};
const isValidDni = () => {
  return /^[0-9]{8}$/.test(formData.value.dni);
};
const isValidName = (nameValue: string) => {
  return /^[a-zA-Z]{1,16}$/.test(nameValue);
};

const isValidDateOfBirth = () => {
  const currentDate = new Date();
  const inputDate = new Date(formData.value.dateOfBirth);

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
};
const isValidEmail = () => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(formData.value.email);
};
const isValidPassword = () => {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
  return (
    passwordPattern.test(formData.value.password) &&
    formData.value.password.length >= 8
  );
};
</script>

<style></style>
