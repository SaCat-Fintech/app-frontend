<template>
  <div class="flex w-screen justify-between pt-6 px-4 sm:px-10">
    <div class="hidden md:flex">
      <NuxtImg class="h-12" src="nav-cat.png" />
      <p class="mt-2 ml-2">SaCat</p>
    </div>
    <TabMenu v-model:activeIndex="active" :model="items">
      <template #item="{ label, item, props }">
        <router-link
          v-if="item.route"
          v-slot="routerProps"
          :to="item.route"
          custom
        >
          <a
            :href="routerProps.href"
            v-bind="props.action"
            @click="($event) => routerProps.navigate($event)"
          >
            <span v-bind="props.label">{{ label }}</span>
          </a>
        </router-link>
      </template>
    </TabMenu>
    <router-view />
    <div class="flex flex-row pl-4">
      <Button label="Iniciar Sesión" @click="onClickLogin" outlined />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const active = ref(0);
const items = ref([
  {
    label: "Inicio",
    route: "/#hero",
  },
  {
    label: "Beneficios",
    route: "/#benefits",
  },
  {
    label: "¿Qué me ofrece?",
    route: "/#info",
  },
  {
    label: "FAQ",
    route: "/#questions",
  },
]);

const onClickLogin = () => {
  return navigateTo("/login");
};

onMounted(() => {
  active.value = items.value.findIndex(
    (item) => route.path === router.resolve(item.route).path,
  );
});

watch(
  route,
  () => {
    active.value = items.value.findIndex(
      (item) => route.path === router.resolve(item.route).path,
    );
  },
  { immediate: true },
);
</script>

<style></style>
