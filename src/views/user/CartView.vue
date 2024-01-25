<script setup>
import UserLayout from "@/layouts/UserLayout.vue";
import Close from "@/components/icons/Close.vue";
import CartXmark from "@/components/icons/CartXmark.vue";

import { useCartStore } from "@/stores/user/cart";

import { RouterLink } from "vue-router";


const cartStore = useCartStore();

const changeQuantity = (event, index) => {
  // covert string to int for passing updateQuantity function
  const newQuantity = parseInt(event.target.value);
  cartStore.updateQuantity(index, newQuantity);
};
</script>

<template>
  <UserLayout>
    <h1 class="text-3xl font-bold m-4">Shopping Cart</h1>

    <div class="flex border-4 border-neutral my-2 rounded-md">
      <div class="flex-1 w-64 bg-base-200 p-4">
        <div v-if="cartStore.items.length === 0" class="h-full flex flex-col">
          <div class="m-auto">
            <h1 class="text-center font-bold text-base-content text-xl">
              Cart is empty
            </h1>
            <CartXmark />
          </div>
        </div>
        <div v-else class="flex" v-for="(item, index) in cartStore.items">
          <div class="flex-1">
            <img class="w-full p-4" :src="item.imageUrl" />
          </div>
          <div class="flex-1">
            <div class="flex flex-col justify-between h-full">
              <div class="grid grid-cols-2 relative">
                <div>
                  <div class="font-bold">{{ item.name }}</div>
                  <div>{{ item.about }}</div>
                  <div>{{ item.price }} ฿</div>
                </div>
                <div>
                  <select @change="changeQuantity($event, index)" class="select w-3/4" v-model="item.quantity">
                    <option v-for="quantity in item.stock">
                      {{ quantity }}
                    </option>
                  </select>
                </div>
                <div @click="cartStore.removeItemIncart(index)" class="absolute top-0 right-0 cursor-pointer">
                  <Close />
                </div>
              </div>
              <div class="font-bold">Instock</div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-1 w-32 bg-base-300 p-4">
        <h1 class="font-bold">Order Summary</h1>
        <div class="divider">Details</div>
        <div class="my-4">
          <div class="flex justify-between">
            <div>Price</div>
            <div>{{ cartStore.summaryPrice }}</div>
          </div>
          <div class="divider divider-neutral"></div>
          <div class="flex justify-between">
            <div>Delivered Price</div>
            <div>{{ cartStore.deliveredCost }}</div>
          </div>
          <div class="divider divider-neutral"></div>
          <div class="flex justify-between">
            <div>Total Price</div>
            <div>{{ cartStore.summaryTotalPrice }}</div>
          </div>
        </div>
        <RouterLink :to="{name: 'checkout'}">
          <button class="btn btn-neutral w-full font-bold text-lg mt-4">Checkout</button>
        </RouterLink>
      </div>
    </div>
  </UserLayout>
</template>
