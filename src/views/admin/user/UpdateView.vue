<script setup>
// Libraly
import { RouterLink, useRoute, useRouter } from 'vue-router'

// Store
import { useAdminUserStore } from '@/stores/admin/user'

// Layout
import AdminLayout from '@/layouts/AdminLayout.vue'

// Component
import Table from '@/components/Table.vue'
import PageTitle from '@/components/PageTitle.vue'

// Icons
import TrashIcon from '@/components/icons/Trash.vue'
import EditIcon from '@/components/icons/Edit.vue'

// Vue commands
import { ref, onMounted, reactive } from 'vue';

const adminUserStore = useAdminUserStore()
const route = useRoute()
const router = useRouter()

const userID = ref(-1)
const ID = route.params.id

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

const userData = reactive({
    name: '',
    role: '',
    status: '',
});

const updateUser = (index) => {
    adminUserStore.updateUser(userID.value, userData)
    router.push({ name: 'admin-users-list' })
}

onMounted(() => {
    if (route.params.id) {
        userID.value = parseInt(ID)
    }

    const selectedUser = adminUserStore.getUser(userID.value)
    Object.assign(userData, selectedUser)
})


</script>

<template>
    <AdminLayout>
        <div class="shadow-x p-8 mt-4">
            <div class="text-4xl font-bold">Update User</div>
            <div class="divider"></div>
            <div class="grid grid-cols-1 gap-2">
                <div v-for="formInput in FormData">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">{{ formInput.name }}</span>
                        </div>
                        <input v-if="formInput.type === 'text'" type="text" v-model="userData[formInput.field]"
                            placeholder="Type here" class="input input-bordered w-full" />
                        <select v-if="formInput.type === 'select'" v-model="userData[formInput.field]"
                            class="select select-bordered">
                            <option v-if="formInput.name === 'Role'" disabled selected>Choose Role</option>
                            <option v-if="formInput.name === 'Status'" disabled selected>Choose Status</option>
                            <option v-for="(dropdown, index) in formInput.dropdownList" :value="dropdown">{{ dropdown }}
                            </option>
                        </select>
                    </label>
                </div>
            </div>
            <div class="mt-4 flex justify-end gap-5">
                <RouterLink :to="{ name: 'admin-users-list' }" class="btn btn-ghost">Back</RouterLink>
                <button class="btn btn-neutral" @click="updateUser()">Update</button>
            </div>
        </div>
    </AdminLayout></template>