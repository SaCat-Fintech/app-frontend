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
      <Avatar
        :label="fullName[0]"
        class="lg:mr-4"
        size="large"
        @click="toggle"
      />
      <Menu ref="menu" id="overlay_menu" :model="menuItems" :popup="true" />
      <p class="hidden lg:flex mt-4">{{ fullName }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const toggle = (event: any) => {
  menu.value.toggle(event);
};

const menu = ref();
const menuItems = ref([
  {
    label: "Opciones",
    items: [
      {
        label: "Cerrar sesión",
        icon: "pi pi-sign-out",
        command: () => {
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("full_name");
          localStorage.removeItem("user_profile_id");
          router.push("/login");
        },
      },
    ],
  },
]);

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

const fullName = ref("");

onMounted(() => {
  active.value = items.value.findIndex(
    (item) => route.path === router.resolve(item.route).path,
  );

  const storedFullName = localStorage.getItem("full_name");

  if (storedFullName) {
    fullName.value = storedFullName;
  }
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
