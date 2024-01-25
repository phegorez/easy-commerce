<script setup>
import { defineProps } from "vue";

defineProps({
  productList: Array,
  addToCart: Function
});
</script>

<template>
  <section
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 mx-4"
  >
    <div
      v-for="product in productList"
      class="card card-compact w-full bg-base-100 shadow-xl"
    >
      <figure><img class="w-full" :src="product.imageUrl" /></figure>
      <div class="card-body">
        <h2 class="card-title">{{ product.name }}</h2>
        <p>{{ product.about }}?</p>
        <div class="flex gap-4 flex-col">
          <button class="btn btn-primary" @click="addToCart(product)">
            Buy Now
          </button>
          <button class="btn btn-primary" @click="addToCart(product, 'fromAddTocart')">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
