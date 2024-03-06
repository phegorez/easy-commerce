<script setup>
import { useCartStore } from "@/stores/user/user_cart";

import { RouterLink, useRouter, useRoute } from "vue-router";
import { onMounted, ref } from "vue";

import UserLayout from "@/layouts/UserLayout.vue";

const cartStore = useCartStore();

const orderData = ref([]);
const router = useRouter();
const route = useRoute();
const isHaveProduct = ref(false);

onMounted(async () => {
  const ORDERID = route.query.order_id
  console.log('orderId', route.query.order_id);
  try {
    await cartStore.loadCheckout(ORDERID);
    console.log(cartStore.checkout);
    if (cartStore.checkout.orderId) {
      console.log('found');
      orderData.value = cartStore.checkout;
      isHaveProduct.value = true;
    } else {
        console.log('not found');
        isHaveProduct.value = false;
        router.push({ name: "notfound" });
    }
  } catch (err) {
    console.log('error:', err);
  }
});
</script>

<template>
  <UserLayout>
    <div v-if="isHaveProduct" class="border border-base-200 shadow-xl max-w-2xl mx-auto my-4 p-8">
      <div>
        <div class="text-2xl font-bold">
          Payment successful, Your order is purchased!
        </div>
        <div>Hi {{ orderData.name }}</div>
        <div>Your item will be shipped in 2 days.</div>
      </div>
      <div class="divider" />
      <div class="grid grid-cols-4">
        <div>
          <div class="font-bold">Order Date</div>
          <div>{{ orderData.createdAt }}</div>
        </div>
        <div>
          <div class="font-bold">Order ID</div>
          <div>{{ orderData.orderId }}</div>
        </div>
        <div>
          <div class="font-bold">Payment Method</div>
          <div>{{ orderData.paymentMethod }}</div>
        </div>
        <div>
          <div class="font-bold">Address</div>
          <div>{{ orderData.address }}</div>
        </div>
      </div>
      <div class="divider" />
      <div v-for="product in orderData.products" class="grid grid-cols-4 mb-4 p-2 items-center bg-base-300">
        <div>
          <img :src="product.imageUrl" class="w-4/5" />
        </div>
        <div>
          <div class="font-bold">Product Name</div>
          {{ product.name }}
        </div>
        <div>
          <div class="font-bold">Quantity</div>
          {{ product.quantity }}
        </div>
        <div>
          <div class="font-bold">Price</div>
          {{ product.price * product.quantity }}฿
        </div>
      </div>
      <div class="divider" />
      <div>
        <div class="flex justify-between mb-4">
          <div class="font-bold">Total Price</div>
          <div>{{ cartStore.summaryPrice }}฿</div>
        </div>
        <div class="flex justify-between">
          <div class="font-bold">Shipped Cost</div>
          <div>{{ cartStore.shippingCost }}฿</div>
        </div>
      </div>
      <div class="divider" />
      <div class="flex justify-between">
        <div class="font-bold">Total Cost</div>
        <div>{{ cartStore.summaryTotalPrice }}</div>
      </div>
      <div class="divider" />
      <div>Thank for your purchase</div>
    </div>
  </UserLayout>
</template>
@/stores/user/user_cart