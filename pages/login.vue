<template>
  <Toast />
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
        <form @submit.prevent="onSubmitForm" class="flex flex-col mt-4">
          <InputText
            id="email"
            v-model="formData.email"
            class="w-72 sm:w-96 h-12"
            placeholder="Email"
            required
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
            :class="{ 'p-invalid': emailInvalid }"
          />
          <small v-if="emailInvalid" class="p-error text-left">
            Ingrese un correo válido registrado, por ejemplo: test@mail.com
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

          <small class="flex flex-row mt-4">
            <div class="mr-1">¿Te olvidaste tu contraseña?</div>
            <div
              class="underline underline-offset-2"
              style="color: var(--primary-color)"
              v-tooltip="
                'Comunicate con nuestra central al 900 000 000 y provee tus datos al operador. Te brindaremos ayuda inmediata una vez validemos tus datos.'
              "
              @click="visible = true"
            >
              Recuperala aquí
            </div>
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

const config = useRuntimeConfig();

const visible = ref(false);

const formData = ref({
  email: "",
  password: "",
});
const showPassword = ref(false);
const emailInvalid = ref(false);
const passwordInvalid = ref(false);
const toastLifetime = 3500;

const onSubmitForm = async () => {
  emailInvalid.value = !isValidEmail();
  passwordInvalid.value = !isValidPassword();

  if (isValidEmail() && isValidPassword()) {
    // Form is valid, proceed with submission
    try {
      const response: any = await $fetch(
        config.public.baseUrl + "/api/v1/auth/signIn",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.value.email,
            password: formData.value.password,
          }),
          redirect: "follow",
        },
      );

      const token = response.jwt_token;
      const full_name = response.full_name;
      const user_profile_id = response.user_profile_id;

      localStorage.setItem("jwtToken", token);
      localStorage.setItem("full_name", full_name);
      localStorage.setItem("user_profile_id", user_profile_id);

      if (token) {
        formData.value = {
          email: "",
          password: "",
        };
        // Push to another site
        router.push("/session");
      } else {
        showFailureDialog(
          "Hubo un problema en el servidor. Intentelo de nuevo.",
        );
      }
    } catch (error: any) {
      console.log(error);
      // Registration failed
      showFailureDialog(
        "Las credenciales usadas no son correctas. Intentelo de nuevo.",
      );
    }
  } else {
    // Form is invalid, show error messages or prevent submission
    showFailureDialog(
      "Los campos tienen un formato incorrecto. Intentelo de nuevo.",
    );
  }
};

const showFailureDialog = (errorMessage: string) => {
  toast.add({
    severity: "error",
    summary: "Credenciales incorrectas",
    detail: errorMessage,
    life: toastLifetime,
  });
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
