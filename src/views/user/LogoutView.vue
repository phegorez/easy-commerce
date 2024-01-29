<script setup>

import { useCartStore } from "@/stores/user/cart";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import Check from "@/components/icons/Check.vue";

const cartStore = useCartStore();
const router = useRouter();
let delay = ref(5)


const startDelayTimer = () => {
  const interval = 100
  const totalTime = delay.value * 1000
  let elapsedTime = 0

  const timer = setInterval(() => {
    elapsedTime += interval
    const remainingTime = Math.max(totalTime - elapsedTime, 0);
    delay.value = remainingTime / 1000

    if(remainingTime === 0) {
      clearInterval(timer)
      router.push({ name: "home" });
    }
  }, interval)
}

onMounted(() => {
  cartStore.items = [];
  startDelayTimer()
});
</script>

<template>
  <div class="flex h-screen">
    <div class="m-auto">
      <div class="border border-base-200 shadow-xl w-96 mx-auto my-4 p-8">
        <div class="flex flex-col items-center">
          <div class="mb-8 font-bold text-2xl">Sanctuary Shop</div>
          <div class="divider divider-success ">
            <div class="border-4 border-success p-4 rounded-full">
              <Check />
            </div>
          </div>
          <div class="mt-8 flex flex-col items-center">
            <div class="font-bold text-success-content">You have been logged out</div>
            <div class="text-gray-500">Thank you</div>
          </div>
          <div class="mt-10 flex items-center flex-col">
            <div>We will bring you to home page</div>
            <p>In: {{ delay }} seconds</p>
            <span class="loading loading-ring loading-lg text-success mt-2"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
