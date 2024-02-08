<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useAccountStore } from "@/stores/account";

const route = useRoute();
const router =useRouter()
const activeMenu = ref("");
const accountStore = useAccountStore();

onMounted(() => {
  activeMenu.value = route.name;
});

const logOut = async () => {
  try {
    accountStore.logOut()
    router.push({name: 'login'})
  } catch(err) {
    console.log('error', err);
  }
}

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
        <li class="mb-4">
          <a @click="logOut">logout</a>
        </li>
      </ul>
    </div>
  </div>
</template>
