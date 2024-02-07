<script setup>
import { RouterView } from "vue-router";
import { onMounted } from "vue";

import { useCartStore } from "@/stores/user/user_cart";
import { useProductStore } from "@/stores/user/user_product";
import { useEventStore } from "@/stores/event";

const cartStore = useCartStore();
const productStore = useProductStore();
const eventStore = useEventStore();

onMounted(() => {
  cartStore.loadCartFromStorage();
  productStore.loadProductsFromStorage();
});
</script>

<template>
  <div class="toast" v-if="eventStore.alert">
    <div class="alert" :class="`alert-${eventStore.data.status}`">
      <span class="font-bold text-white">{{ eventStore.data.message }}</span>
    </div>
  </div>
  <RouterView />
</template>
