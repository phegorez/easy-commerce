<script setup>
// Libraly
import { useRouter, useRoute, RouterLink } from "vue-router";

// Store
import { useAdminProductStore } from "@/stores/admin/admin_product";
import { useEventStore } from "@/stores/event";

// Layout
import AdminLayout from "@/layouts/AdminLayout.vue";

// Vue commands
import { reactive, onMounted, ref } from "vue";

const adminProductStore = useAdminProductStore();
const eventStore = useEventStore();

const router = useRouter();
const route = useRoute();

const productID = ref(-1);
const ID = route.params.id
const mode = ref("Add");
const selectedProduct = ref({});

const FormData = [
    {
        name: "Name",
        field: "name",
    },
    {
        name: "Image",
        field: "imageUrl",
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

const productData = ref({
    name: '',
    imageUrl: '',
    price: 0,
    quantity: 0,
    about: '',
    status: ''
});

const AddOrEditProdcut = () => {
    if (mode.value === 'Add') {
        adminProductStore.addProduct(productData)
        router.push({ name: 'admin-products-list' })
    } else {
        // console.log(productData);
        adminProductStore.updateProduct(productID.value, productData)
        router.push({ name: 'admin-products-list' })
    }
}

onMounted(() => {
    if (route.params.id) {
        productID.value = parseInt(ID)
        mode.value = 'Edit'
        const selectedProduct = adminProductStore.getProduct(productID.value)
        Object.assign(productData, selectedProduct)
    }
})
</script>

<template>
    <AdminLayout>
        <div class="shadow-x p-8 mt-4">
            <div class="text-4xl font-bold">{{ mode }} Product</div>
            <div class="divider"></div>
            <div class="grid grid-cols-2 gap-4">
                <div v-for="formInput in FormData">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">{{ formInput.name }}</span>
                        </div>
                        <input type="text" placeholder="Type here" v-model="productData[formInput.field]"
                            class="input input-bordered w-full" />
                    </label>
                </div>
            </div>
            <div class="divider"></div>
            <div class="grid grid-cols-2 gap-4">
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Status</span>
                    </div>
                    <select v-model="productData.status" class="select select-bordered">
                        <option disabled selected>Choose Status</option>
                        <option value="open">Open</option>
                        <option value="close">Close</option>
                    </select>
                </label>
            </div>
            <div class="mt-4 flex justify-end gap-5">
                <RouterLink :to="{ name: 'admin-products-list' }" class="btn btn-ghost">Back</RouterLink>
                <button class="btn btn-neutral" @click="AddOrEditProdcut()">
                    {{ mode }}
                </button>
            </div>
        </div>
    </AdminLayout>
</template>
