<template>
  <div class="flex w-screen justify-between pt-6 px-10">
    <div class="hidden md:flex">
      <NuxtImg class="w-8" src="nav-cat.png" />
      <p class="mt-2 ml-2">SaCat</p>
    </div>
    <p class="mt-2">
      {{ navQuestion }}
      <NuxtLink
        style="
          color: var(--primary-color);
          text-decoration: underline;
          text-underline-offset: 4px;
        "
        :to="navRedirect"
        >{{ navText }}</NuxtLink
      >
    </p>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    navQuestion: String,
    navText: String,
    navRedirect: String,
  },
};
</script>

<style></style>
