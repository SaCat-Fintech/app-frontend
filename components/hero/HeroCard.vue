<template>
  <div class="place-self-center flex flex-col text-center items-center w-56">
    <h4 class="text-lg font-semibold" style="color: var(--alt-color)">
      {{ cardTitle }}
    </h4>
    <p class="w-46">{{ cardText }}</p>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    cardTitle: String,
    cardText: String,
  },
};
</script>

<style></style>
