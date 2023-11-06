import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import InputMask from "primevue/inputmask";
import Calendar from "primevue/calendar";
import Avatar from "primevue/avatar";
import TabMenu from "primevue/tabmenu";
import RadioButton from "primevue/radiobutton";
import InputNumber from "primevue/inputnumber";
import Dropdown from "primevue/dropdown";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true });
  nuxtApp.vueApp.component("Button", Button);
  nuxtApp.vueApp.component("InputText", InputText);
  nuxtApp.vueApp.component("InputMask", InputMask);
  nuxtApp.vueApp.component("Calendar", Calendar);
  nuxtApp.vueApp.component("TabMenu", TabMenu);
  nuxtApp.vueApp.component("Avatar", Avatar);
  nuxtApp.vueApp.component("RadioButton", RadioButton);
  nuxtApp.vueApp.component("InputNumber", InputNumber);
  nuxtApp.vueApp.component("Dropdown", Dropdown);
  //other components that you need
});
