<script setup>
//Libraly
import { RouterLink } from 'vue-router'

//Store
import { useAdminProductStore } from '@/stores/admin/product'

// Layout
import AdminLayout from '@/layouts/AdminLayout.vue'

// Icons
import TrashIcon from '@/components/icons/Trash.vue'
import EditIcon from '@/components/icons/Edit.vue'

//Vue commands
import { ref } from 'vue';

const adminProduct = useAdminProductStore()

</script>

<template>
    <AdminLayout>
        <div class="flex justify-between items-center my-4">
            <h1 class="text-4xl font-bold">Product</h1>
            <RouterLink :to="{name: 'admin-product-create'}" class="btn btn-neutral">
                Add New
            </RouterLink>
        </div>
        <div class="divider"></div> 
        <div class="overflow-x-auto">
            <table class="table">
                <!-- head -->
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Update At</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr v-for="produt in adminProduct.list">
                        <th>{{ produt.name }}</th>
                        <td>
                            <div class="avatar">
                                <div class="w-24 h-24">
                                    <img :src="produt.imageUrl">
                                </div>
                            </div>
                        </td>
                        <td>{{ produt.price }}</td>
                        <td>{{ produt.remainQuantity }}/{{ produt.quantity }}</td>
                        <td>
                            <div class="badge badge-success gap-2">
                                {{ produt.status }}
                            </div>
                        </td>
                        <td>{{ produt.updatedAt }}</td>
                        <td>
                            <div class="flex gap-2">
                                <div class="btn btn-ghost rounded-full" >
                                    <TrashIcon />
                                </div>
                                <div class="btn btn-ghost rounded-full" >
                                    <EditIcon />
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </AdminLayout>
</template>