import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";

export default defineNuxtRouteMiddleware((to, from) => {
  // Check if the jwtToken variable is present in localStorage
  const jwtToken = process.client ? localStorage.getItem("jwtToken") : null;

  // Check if the route is '/login' or '/register'
  if (to.path === "/login" || to.path === "/register") {
    if (jwtToken) {
      // Redirect to '/session' if jwtToken is present
      return navigateTo("/session");
    }
  } else if (to.path.includes("/session")) {
    // Check if the jwtToken variable is present in localStorage
    const jwtToken = process.client ? localStorage.getItem("jwtToken") : null;

    if (!jwtToken) {
      // Redirect to the login page if jwtToken is not present
      return navigateTo("/");
    }
  }
});
