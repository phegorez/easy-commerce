<script setup>
// Libraly
import { RouterLink, useRoute, useRouter } from "vue-router";

// Store
import { useAdminUserStore } from "@/stores/admin/admin_user";
import { useEventStore } from "@/stores/event";

// Layout
import AdminLayout from "@/layouts/AdminLayout.vue";

// Component
import Table from "@/components/Table.vue";
import PageTitle from "@/components/PageTitle.vue";

// Icons
import TrashIcon from "@/components/icons/Trash.vue";
import EditIcon from "@/components/icons/Edit.vue";

// Vue commands
import { ref, onMounted, reactive } from "vue";

const adminUserStore = useAdminUserStore();
const eventStore = useEventStore();
const route = useRoute();
const router = useRouter();

let selectedUser = ref({})
const uid = route.params.id;

const FormData = [
  {
    name: "Name",
    field: "name",
    type: "text",
  },
  {
    name: "Role",
    field: "role",
    type: "select",
    dropdownList: ["admin", "moderator", "member"],
  },
  {
    name: "Status",
    field: "status",
    type: "select",
    dropdownList: ["active", "inactive"],
  },
];

const userData = reactive({
  name: "",
  role: "",
  status: "",
});

const updateUser = async () => {
  await adminUserStore.updateUser(uid, userData);
  router.push({ name: "admin-users-list" });
  eventStore.popupMessage("success", `User ${selectedUser.name} has been updated`);
};

onMounted(async () => {
  if (route.params.id) {
    selectedUser = await adminUserStore.getUser(uid);
    Object.assign(userData, selectedUser);
  }

});
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
            <select v-if="formInput.type === 'select'" v-model="userData[formInput.field]" class="select select-bordered">
              <option v-if="formInput.name === 'Role'" disabled selected>
                Choose Role
              </option>
              <option v-if="formInput.name === 'Status'" disabled selected>
                Choose Status
              </option>
              <option v-for="(dropdown, index) in formInput.dropdownList" :value="dropdown">
                {{ dropdown }}
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
  </AdminLayout>
</template>
@/stores/admin/admin_user
