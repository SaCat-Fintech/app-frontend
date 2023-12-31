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
            Debe tener 8 caracteres y solo valores numéricos
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
            Ingrese su nombre, solo debe tener caracteres alfabéticos.
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
            Ingrese su apellido, solo debe tener caracteres alfabéticos.
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
            Ingrese un correo válido, por ejemplo: test@mail.com
          </small>

          <span class="p-input-icon-right mt-6 w-72 sm:w-96">
            <i
              class="pi"
              :class="{ 'pi-eye-slash': showPassword, 'pi-eye': !showPassword }"
              @click="showPassword = !showPassword"
            />
            <InputText
              id="password"
              v-model="formData.password"
              class="w-72 sm:w-96 h-12"
              placeholder="Contraseña"
              :type="showPassword ? 'text' : 'password'"
              pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
              title="Password must contain at least 8 characters, one lowercase letter, one uppercase letter, and one number."
              :class="{ 'p-invalid': passwordInvalid }"
            />
          </span>
          <small v-if="passwordInvalid" class="p-error text-left w-72 sm:w-96">
            La contraseña debe tener 8 caracteres como mínimo, 1 letra en
            minúscula, 1 en mayúscula, 1 número y 1 carácter especial como
            mínimo.
          </small>

          <div class="mt-4">
            <Button
              @click="onSubmitForm"
              class="w-72 sm:w-96 h-12"
              label="Crear cuenta"
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

const config = useRuntimeConfig();

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
const showPassword = ref(false);

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
        config.public.baseUrl + "/api/v1/auth/signUp",
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

      showSuccessDialog();
    } catch (error: any) {
      // Registration failed
      showFailureDialog(
        "No se realizado el registro correctamente. Es posible que ya exista. Intentelo de nuevo.",
      );
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
