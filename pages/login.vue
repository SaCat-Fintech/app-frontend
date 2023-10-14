<template>
  <div>
    <h1>LOGIN</h1>
    <h2>tester</h2>
    <h3>tester</h3>
    <p>tester p</p>
    <div class="btns">
      <Button label="Click" />
      <Button severity="secondary" label="Click" />
    </div>
    <div>
      <InputText type="text" v-model="value" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const value = ref(null);
</script>

<style>
.btns {
  display: flex;
  flex-flow: column;
  max-width: 10rem;
}
.p-button {
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
}
</style>
