<script setup>
import { reactive, onMounted } from "vue";

import { useRoute } from "vue-router";

import AdminLayout from "@/layouts/AdminLayout.vue";
const route = useRoute();
const FormData = [
  {
    name: "Name",
    field: "name",
  },
  {
    name: "Image",
    field: "image",
  },
  {
    name: "Price",
    field: "price",
  },
  {
    name: "Quantity",
    field: "quantity",
  },
  {
    name: "About",
    field: "about",
  },
];

const productFormData = reactive({
  email: "",
  name: "",
  address: "",
  note: "",
});

onMounted(() => {
  const word = "product";
  console.log(route.name);
});
</script>

<template>
  <AdminLayout>
    <div class="shadow-x p-8 mt-4">
      <div class="text-4xl font-bold">Add Product</div>
      <div class="divider"></div>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="formInput in FormData">
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">{{ formInput.name }}</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered w-full"
            />
          </label>
        </div>
      </div>
      <div class="divider"></div>
      <div class="grid grid-cols-2 gap-4">
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Status</span>
          </div>
          <select class="select select-bordered">
            <option disabled selected>Choose Status</option>
            <option value="open">Open</option>
            <option value="close">Close</option>
          </select>
        </label>
      </div>
      <div class="mt-4 flex justify-end gap-5">
        <button class="btn btn-ghost">Back</button>
        <button class="btn btn-neutral">Add</button>
      </div>
    </div>
  </AdminLayout>
</template>
