<script setup>
import { RouterLink, useRoute } from "vue-router";
import { onMounted, ref } from "vue";

const route = useRoute();

const activeMenu = ref("");

onMounted(() => {
  activeMenu.value = route.name;
});

const menus = [
  {
    name: "Dashboard",
    routeName: "admin-dashboard",
    keyWord: "dashboard",
  },
  {
    name: "User",
    routeName: "admin-users-list",
    keyWord: "user",
  },
  {
    name: "Product",
    routeName: "admin-products-list",
    keyWord: "product",
  },
  {
    name: "Order",
    routeName: "admin-orders-list",
    keyWord: "order",
  },
  {
    name: "Logout",
    routeName: "admin-login",
  },
];
</script>

<template>
  <div class="drawer drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content mx-4">
      <slot></slot>
    </div>
    <div class="drawer-side">
      <label
        for="my-drawer-2"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <li class="text-3xl font-bold mb-4"><a>Backoffice</a></li>
        <!-- Sidebar content here -->
        <li v-for="menu in menus" class="mb-4">
          <RouterLink
            :class="activeMenu.includes(menu.keyWord) ? 'active' : ''"
            :to="{ name: menu.routeName }"
            >{{ menu.name }}</RouterLink
          >
        </li>
      </ul>
    </div>
  </div>
</template>
