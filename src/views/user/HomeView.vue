<script setup>
// Store
import { useProductStore } from '@/stores/product'

// Layout
import UserLayout from '@/layouts/UserLayout.vue'

// Components
import Product from '@/components/Product.vue'

const productStore = useProductStore()
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
    <Product :productList = 'productStore.list'/>

  </UserLayout>
</template>
