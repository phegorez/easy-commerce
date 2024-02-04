<script setup>
// Libraly
import { RouterLink } from 'vue-router'

// Store
import { useAdminUserStore } from '@/stores/admin/admin_user'

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

const adminUserStore = useAdminUserStore()

const changeStatus = (index) => {
    const selectedUser = adminUserStore.usersList[index]
    selectedUser.status = selectedUser.status === 'active' ? 'inactive' : 'active'
    adminUserStore.updateUser(index, selectedUser)
}

const tabelHeaders = [
    'Name', 'Role', 'Status', 'Updated At', ''
]


</script>

<template>
    <AdminLayout>
        <PageTitle>
            <h1 class="text-4xl font-bold">User</h1>
        </PageTitle>
        <Table :headers="tabelHeaders">
            <tr v-for="(user, index) in adminUserStore.usersList" :key="index">
                <td>{{ user.name }}</td>
                <td>{{ user.role }}</td>
                <td>
                    <div class="badge gap-2" :class="user.status === 'active' ? 'badge-success' : 'badge-error'">
                        {{ user.status }}
                    </div>
                </td>
                <td>{{ user.updatedAt }}</td>
                <td>
                    <div class="flex gap-2">
                        <RouterLink :to="{ name: 'admin-users-update', params: { id: index } }" class="btn font-bold">
                            EDIT
                        </RouterLink>
                        <button @click="changeStatus(index)" class="btn font-bold"
                            :class="user.status === 'active' ? '' : 'btn-neutral'">
                            {{ user.status === 'active' ? 'DISABLE' : 'ENABLE' }}
                        </button>
                    </div>
                </td>
            </tr>
        </Table>
</AdminLayout></template>@/stores/admin/admin_user