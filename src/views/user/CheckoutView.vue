<script setup>
// Store
import { useCartStore } from "@/stores/user/user_cart";
import { useEventStore } from "@/stores/event";

// Layout
import UserLayout from "@/layouts/UserLayout.vue";

// Library
import { RouterLink, useRouter } from "vue-router";

// Vue command
import { reactive } from "vue";

const cartStore = useCartStore();
const router = useRouter();
const eventStore = useEventStore()

const FormData = [
  {
    name: "Email Address",
    field: "email",
  },
  {
    name: "Name",
    field: "name",
  },
  {
    name: "Address",
    field: "address",
  },
  {
    name: "Note",
    field: "note",
  },
];

const userFormData = reactive({
  email: "",
  name: "",
  address: "",
  note: "",
});

const payment = async () => {
  const responesData = await cartStore.checkout(userFormData);
  location.href = responesData.redirectUrl
  //   if (cartStore.cartID) {
  //     // Navigate to success route with cart ID parameter
  //     console.log(cartStore.cartID);
  //   } else {
  //     console.error("Cart ID is not available.");
  //   }
  // if (cartStore.cartID) {
  //   router.push({
  //     name: "success",
  //     params: { cartid: cartStore.cartID },
  //   });
  //   eventStore.popupMessage('success', 'Your payment has been successfully');
  // }
};
</script>

<template>
  <UserLayout>
    <h1 class="text-3xl font-bold m-4">Checkout</h1>
    <div class="flex">
      <section class="flex-auto w-64 bg-base-200 p-8">
        <label class="form-control w-full" v-for="formInput in FormData">
          <div v-if="formInput.name != 'Address'">
            <div class="label">
              <span class="label-text">{{ formInput.name }}</span>
            </div>
            <input
              v-model="userFormData[formInput.field]"
              type="text"
              :placeholder="formInput.field"
              class="input input-bordered w-full"
            />
          </div>
          <div v-else>
            <div class="label">
              <span class="label-text">{{ formInput.name }}</span>
            </div>
            <textarea
              v-model="userFormData[formInput.field]"
              class="textarea textarea-bordered h-24 w-full"
              :placeholder="formInput.field"
            ></textarea>
          </div>
        </label>
        <button @click="payment" class="btn btn-neutral w-full mt-4">
          Checkout
        </button>
      </section>

      <section class="flex-auto w-32 bg-base-300">
        <div
          v-for="item in cartStore.items"
          class="flex bg-neutral-content m-8 py-4"
        >
          <div class="flex-1">
            <img class="w-full p-6" :src="item.imageUrl" />
          </div>
          <div class="flex-1">
            <div class="flex flex-col justify-between h-full p-4">
              <div>
                <div class="font-bold">{{ item.name }}</div>
                <div>Quantity : {{ item.quantity }}</div>
              </div>
              <RouterLink :to="{ name: 'cart' }" class="btn btn-neutral btn-sm"
                >Edit</RouterLink
              >
            </div>
          </div>
        </div>
        <div class="divider px-2 mx-auto divider-neutral"></div>
        <div class="px-6">
          <div class="font-bold mb-4">Order Summary</div>
          <div class="flex justify-between">
            <div>Price</div>
            <div>{{ cartStore.summaryPrice }}</div>
          </div>
          <div class="flex justify-between">
            <div>Shipping cost</div>
            <div>{{ cartStore.shippingCost }}</div>
          </div>
        </div>
        <div class="divider px-2 mx-auto divider-neutral"></div>
        <div class="px-6 mb-4">
          <div class="flex justify-between">
            <div>Total Price</div>
            <div>{{ cartStore.summaryTotalPrice }}</div>
          </div>
        </div>
      </section>
    </div>
  </UserLayout>
</template>
