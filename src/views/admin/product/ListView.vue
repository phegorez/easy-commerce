<script setup>
//Libraly
import { RouterLink } from 'vue-router'

//Store
import { useAdminProductStore } from '@/stores/admin/product'

// Layout
import AdminLayout from '@/layouts/AdminLayout.vue'

// Component
import Table from '@/components/Table.vue'
import PageTitle from '@/components/PageTitle.vue'

// Icons
import TrashIcon from '@/components/icons/Trash.vue'
import EditIcon from '@/components/icons/Edit.vue'

//Vue commands
import { ref, onMounted } from 'vue';

const adminProductStore = useAdminProductStore()

const removeProduct = (index) => {
    adminProductStore.removeProduct(index)
}

const tabelHeaders = [
    'Name', 'Image', 'Price', 'Quantity', 'Status', 'Update At', ''
]

onMounted(() => {
    adminProductStore.loadProductsFromStorage()
})

</script>

<template>
    <AdminLayout>
        <PageTitle>
            <h1 class="text-4xl font-bold">Product</h1>
            <RouterLink :to="{ name: 'admin-product-create' }" class="btn btn-neutral">
                Add New
            </RouterLink>
        </PageTitle>
        <div class="divider"></div>
        <Table :headers="tabelHeaders">
            <tr v-for="(product, index) in adminProductStore.list">
                <th>{{ product.name }}</th>
                <td>
                    <div class="avatar">
                        <div class="w-24 h-24">
                            <img :src="product.imageUrl">
                        </div>
                    </div>
                </td>
                <td>{{ product.price }}</td>
                <td>{{ product.remainQuantity }}/{{ product.quantity }}</td>
                <td>
                    <div class="badge gap-2" :class="product.status === 'open' ? 'badge-success' : 'badge-error'">
                        {{ product.status }}
                    </div>
                </td>
                <td>{{ product.updatedAt }}</td>
                <td>
                    <div class="flex gap-2">
                        <div class="btn btn-ghost rounded-full" @click="removeProduct(index)">
                            <TrashIcon />
                        </div>
                        <RouterLink :to="{ name: 'admin-product-update', params: { id: index } }"
                            class="btn btn-ghost rounded-full">
                            <EditIcon />
                        </RouterLink>
                    </div>
                </td>
            </tr>
        </Table>
    </AdminLayout>
</template>