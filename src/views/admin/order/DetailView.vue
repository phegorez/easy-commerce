<script setup>
// Libraly
import { RouterLink, useRoute } from 'vue-router'

// Store
import { useAdminOrderStore } from '@/stores/admin/admin_order'

// Layout
import AdminLayout from '@/layouts/AdminLayout.vue'

// Component
import Table from '@/components/Table.vue'
import PageTitle from '@/components/PageTitle.vue'

// Icons
import TrashIcon from '@/components/icons/Trash.vue'
import EditIcon from '@/components/icons/Edit.vue'

// Vue commands
import { ref, onMounted } from 'vue';

const adminOrderStore = useAdminOrderStore()
const route = useRoute()

const orderID = ref(-1)
const ID = route.params.id
const orderData = ref({
    product: []
})


const FormData = [
    {
        name: "Name",
        field: "name",
        type: 'text',
    },
    {
        name: "Role",
        field: "role",
        type: 'select',
        dropdownList: ['admin', 'moderator', 'user']
    },
    {
        name: "Status",
        field: "status",
        type: 'select',
        dropdownList: ['active', 'inactive']
    },
];

onMounted(() => {
    if (route.params.id) {
        orderID.value = parseInt(ID)
        const selectedOrder = adminOrderStore.getOrder(orderID.value)
        orderData.value = selectedOrder
    }
    console.log((orderData.value.totalPrice.toLocaleString()));
})
</script>

<template>
    <AdminLayout>
        <div class="shadow-x p-8 mt-4">
            <div class="text-4xl font-bold">Order Details ID: {{ orderData.orderID }}</div>
            <div class="divider"></div>
            <div class="flex justify-between">
                <div class="flex-1">
                    <div class="mb-4">
                        <h1 class="font-bold">Order date</h1>
                        <p>{{ orderData.updatedAt }}</p>
                    </div>
                    <div>
                        <h1 class="font-bold">Payment Method</h1>
                        <p>{{ orderData.paymentMethod }}</p>
                    </div>
                </div>
                <div class="flex-1">
                    <div class="mb-4">
                        <h1 class="font-bold">Order Number</h1>
                        <p>{{ orderData.orderID }}</p>
                    </div>
                    <div>
                        <h1 class="font-bold">Address</h1>
                        <p>{{ orderData.address }}</p>
                    </div>
                </div>
            </div>
            <div class="divider"></div>
            <div class="flex justify-between items-center mb-4" v-for="(product, index) in orderData.products" :key="index">

                <div>
                    <div class="flex items-center">
                        <div class="avatar">
                            <div class="w-24 h-24">
                                <img
                            :src="product.imageUrl">
                            </div>
                        </div>

                        <div class="ml-4">
                            <h1 class="font-bold">{{product.name}}</h1>
                            <p>{{product.description}}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <p>
                        amount : {{product.quantity}} item
                    </p>
                </div>

                <div>
                    <h1 class="font-bold">
                        {{ product.price.toLocaleString() }} ฿
                    </h1>
                </div>
            </div>
            <div class="divider"></div>
            <div class="flex justify-between">
                <h1 class="font-bold">Total Price</h1>
                <h1 class="font-bold">{{ orderData.totalPrice }} ฿</h1>
            </div>
            <div class="flex justify-end mt-6">
                <RouterLink :to="{name: 'admin-orders-list'}" class="btn btn-neutral">Back</RouterLink>
            </div>
        </div>
    </AdminLayout>
</template>@/stores/admin/admin_order