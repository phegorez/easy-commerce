<script setup>
import UserLayout from "@/layouts/UserLayout.vue";

import { useCartStore } from "@/stores/user/cart";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const cartStore = useCartStore();
const router = useRouter();

onMounted(() => {
  cartStore.items = [];
  setTimeout(() => {
    router.push({ name: "home" });
  }, 5000);
});
</script>

<template>
  <UserLayout>
    <div>Logout View</div>
  </UserLayout>
</template>
