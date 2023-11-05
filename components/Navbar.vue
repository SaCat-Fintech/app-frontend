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
      <Avatar label="P" class="lg:mr-4" size="large" />
      <p class="hidden lg:flex mt-4">Pedro Soto</p>
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
    route: "/session",
  },
  {
    label: "Realizar operación",
    route: "/session/operation",
  },
  {
    label: "Historial",
    route: "/session/history",
  },
  {
    label: "¿Tienes alguna duda?",
    route: "/session/support",
  },
]);

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

<style>
.p-avatar {
  border-radius: 9999px;
}
</style>
