<script setup>
// Libraly
import { useRouter, useRoute, RouterLink } from "vue-router";
import { storage } from '@/firebase'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

// Store
import { useAdminProductStore } from "@/stores/admin/admin_product";
import { useEventStore } from "@/stores/event";
import { useAccountStore } from "@/stores/account";

// Layout
import AdminLayout from "@/layouts/AdminLayout.vue";

// Vue commands
import { reactive, onMounted, ref } from "vue";

const adminProductStore = useAdminProductStore();
const eventStore = useEventStore();
const accountStore = useAccountStore();

const router = useRouter();
const route = useRoute();


const productId = route.params.id
const mode = ref("Add");
const selectedProduct = ref({});

const FormData = [
    {
        name: "Name",
        field: "name",
        type: 'text',
    },
    {
        name: "Image",
        field: "imageUrl",
        type: 'upload-image',
    },
    {
        name: "Price",
        field: "price",
        type: 'number',
    },
    {
        name: "Quantity",
        field: "quantity",
        type: 'number',
    },
    {
        name: "About",
        field: "about",
        type: 'text',
    },
];

const productData = reactive({
    name: '',
    imageUrl: '',
    price: 0,
    quantity: 0,
    about: '',
    status: ''
});

const AddOrEditProdcut = () => {
    if (accountStore.profile.role === 'admin' || accountStore.profile.role === 'moderator') {
        if (mode.value === 'Add') {
            adminProductStore.addProduct(productData)
            router.push({ name: 'admin-products-list' })
            eventStore.popupMessage('success', 'Prodcut has been added')
        } else {
            adminProductStore.updateProduct(productId, productData)
            router.push({ name: 'admin-products-list' })
            eventStore.popupMessage('success', 'Prodcut has been update')
        }
    } else {
        throw new Error (`You don't have permission to add or edit products this your current role is: ${accountStore.profile.role}`)
    }

}

const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    let mainPath = ''

    if (productId) {
        mainPath = productId + '-'
    }

    if (file) {
        //Set reference in Firebase
        const uploadRef = storageRef(
            storage,
            `products/${mainPath}/${file.name}`
        )

        //Upload file
        const snapShot = await uploadBytes(uploadRef, file)

        //Get download file
        const downloadUrl = await getDownloadURL(snapShot.ref)
        productData.imageUrl = downloadUrl
    }
};

onMounted(async () => {
    if (route.params.id) {
        mode.value = 'Edit'
        const selectedProduct = await adminProductStore.getProduct(productId)
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

                        <input v-if="formInput.type !== 'upload-image'" :type="formInput.type" placeholder="Type here"
                            v-model="productData[formInput.field]" class="input input-bordered w-full" />
                        <div v-else>
                            <div class="avatar">
                                <div class="w-24 rounded-full">
                                    <img :src="productData[formInput.field]" />
                                </div>
                                <!-- <div>
                                    <img :src="imgeUrl">
                                </div> -->
                            </div>
                            <input type="file" class="inputFile border-2 border-neutral rounded-md"
                                @change="handleFileUpload" />
                        </div>
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
