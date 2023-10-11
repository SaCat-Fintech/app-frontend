// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["primevue/resources/themes/lara-light-blue/theme.css"],
  build: {
    transpile: ["primevue"],
  },
  devtools: { enabled: true },
  modules: [
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Inter: [300, 400, 500, 600, 700, 800],
        },
      },
    ],
  ],
});
