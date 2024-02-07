<script setup>
// Store
import { useProductStore } from '@/stores/user/user_product'
import { useCartStore } from "@/stores/user/user_cart";
import { useEventStore } from '@/stores/event';

// libraly
import { useRouter } from 'vue-router';

// Layout
import UserLayout from '@/layouts/UserLayout.vue'

// Components
import Product from '@/components/Product.vue'

const productStore = useProductStore()
const cartStore = useCartStore();
const eventStore = useEventStore();

const router = useRouter()

const addToCart = (product, isAddtoCart) => {
  if (isAddtoCart === 'fromAddTocart') {
    cartStore.addToCart(product);
    eventStore.popupMessage('success', `Add ${product.name} to cart ${cartStore.summaryQuantity} items`)
  } else {
    cartStore.addToCart(product);
    router.push({ name: 'cart' })
    eventStore.popupMessage('success', `Add ${product.name} to cart ${cartStore.summaryQuantity} items`)
  }
};
</script>

<template>
  <UserLayout>
    <!-- Hero -->
    <div class="hero min-h-96 mx-4"
      style="background-image: url(https://images.unsplash.com/photo-1529264978834-666a0e99f884?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);">
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">Hello to Sanctuary shop</h1>
          <p class="mb-5">Drink is not crime, Is art</p>
          <!-- <button class="btn btn-primary">Get Started</button> -->
        </div>
      </div>
    </div>

    <!-- Product card -->
    <Product :productList='productStore.list' :addToCart='addToCart' />

  </UserLayout>
</template>
@/stores/user/product@/stores/user/user_cart@/stores/user/user_product