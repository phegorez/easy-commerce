<script setup>
// Libraly
import { RouterLink } from 'vue-router'


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

const tabelHeaders = [
    'Customer Name', 'Price', 'Status', 'Updated At', ''
]

</script>
<template>
    <AdminLayout>
        <PageTitle>
            <h1 class="text-4xl font-bold">Order</h1>
        </PageTitle>
        <Table v-for="(order, index) in adminOrderStore.odersList" :key="index" :headers="tabelHeaders">
            <tr>
                <td>{{order.customerName}}</td>
                <td>{{order.totalPrice.toLocaleString()}} ฿</td>
                <td>{{order.status}}</td>
                <td>{{order.updatedAt}}</td>
                <td>
                    <RouterLink :to="{name : 'admin-orders-details', params: {id: index}}" class="btn btn-neutral font-bold">SEE DETAILS</RouterLink>
                </td>
            </tr>
        </Table>
    </AdminLayout>
</template>@/stores/admin/admin_order