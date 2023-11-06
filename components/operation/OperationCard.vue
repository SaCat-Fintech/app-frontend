<template>
  <div class="place-self-center flex flex-col text-center items-center">
    <p>{{ cardOutTitle }}</p>
    <div
      class="p-4 rounded-lg shadow-md mt-2 w-full"
      style="background: var(--light-100)"
    >
      <p>{{ titleValue }}</p>
      <small class="opacity-50"
        >{{ cardPercentage === null ? "-" : cardPercentage }}%</small
      >
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    cardOutTitle: String,
    cardValue: String,
    cardPercentage: String,
  },
  computed: {
    titleValue() {
      if (this.cardValue !== null && this.cardPercentage !== null) {
        return ((this.cardValue * this.cardPercentage) / 100).toLocaleString();
      }
      return "-";
    },
  },
};
</script>

<style></style>
