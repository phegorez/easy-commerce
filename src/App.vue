<script setup>
import { RouterView } from "vue-router";
import { onMounted } from "vue";

import { useCartStore } from "@/stores/user/cart";

const cartStore = useCartStore();

onMounted(() => {
  cartStore.loadFromStorage();
});
</script>

<template>
  <RouterView />
</template>
