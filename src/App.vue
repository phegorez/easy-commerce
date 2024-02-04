<script setup>
import { RouterView } from "vue-router";
import { onMounted } from "vue";

import { useCartStore } from "@/stores/user/user_cart";
import { useProductStore } from "@/stores/user/user_product";


const cartStore = useCartStore();
const productStore = useProductStore()

onMounted(() => {
  cartStore.loadCartFromStorage();
  productStore.loadProductsFromStorage()
});
</script>

<template>
  <RouterView />
</template>