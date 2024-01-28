<script setup>
import { useCartStore } from '@/stores/user/cart';

import { RouterLink, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

import UserLayout from '@/layouts/UserLayout.vue'

const cartStore = useCartStore();

const orderData = ref({})

onMounted(() => {
    cartStore.loadCheckout()
    if (cartStore.checkoutObj.orderID) {
        orderData.value = cartStore.checkoutObj
    }
})
</script>

<template>
    <UserLayout>
        <div class="border border-base-200 shadow-xl max-w-2xl mx-auto my-4 p-8">
            <div>
                <div class="text-2xl font-bold">Payment successful, Your order is purchased!</div>
                <div>Hi {{ orderData.name }}</div>
                <div>Your item will be shipped in 2 days.</div>
            </div>
            <div class="divider" />
            <div class="grid grid-cols-4">
                <div>
                    <div class="font-bold">
                        Order Date
                    </div>
                    <div>{{ orderData.orderDate }}</div>
                </div>
                <div>
                    <div class="font-bold">
                        Order Date
                    </div>
                    <div>{{ orderData.orderID }}</div>
                </div>
                <div>
                    <div class="font-bold">
                        Payment Method
                    </div>
                    <div>{{ orderData.paymentMethod }}</div>
                </div>
                <div>
                    <div class="font-bold">
                        Address
                    </div>
                    <div>{{ orderData.address }}</div>
                </div>
            </div>
            <div class="divider" />
            <div v-for="product in orderData.product" class="grid grid-cols-4 mb-4 p-2 items-center bg-base-300">
                <div>
                    <img :src="product.imageUrl" class="w-4/5">
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
                    <div> {{ cartStore.summaryPrice }}฿</div>
                </div>
                <div class="flex justify-between">
                    <div class="font-bold">Shipped Cost</div>
                    <div> {{ cartStore.shippingCost }}฿</div>
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