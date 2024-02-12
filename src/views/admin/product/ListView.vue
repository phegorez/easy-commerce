<script setup>
//Libraly
import { RouterLink } from "vue-router";

//Store
import { useAdminProductStore } from "@/stores/admin/admin_product";
import { useEventStore } from "@/stores/event";

// Layout
import AdminLayout from "@/layouts/AdminLayout.vue";

// Component
import Table from "@/components/Table.vue";
import PageTitle from "@/components/PageTitle.vue";

// Icons
import TrashIcon from "@/components/icons/Trash.vue";
import EditIcon from "@/components/icons/Edit.vue";

//Vue commands
import { ref, onMounted } from "vue";

const adminProductStore = useAdminProductStore();
const eventStore = useEventStore();

const removeProduct = (id) => {
  adminProductStore.removeProduct(id);
  eventStore.popupMessage('warning', 'Product has been removed')
};

const searchProduct = async () => {
  await adminProductStore.loadProduct()
}

const changeStatusFilter = async (newStatus) => {
  // console.log('check',newStatus, adminProductStore.filter.status);
  // if(newStatus === adminProductStore.filter.status) {
  //   adminProductStore.filter.status = ''
  // }
  adminProductStore.filter.status = newStatus
  await adminProductStore.loadProduct()
}

const tabelHeaders = [
  "Name",
  "Image",
  "Price",
  "Quantity",
  "Status",
  "Update At",
  "",
];

onMounted(async () => {
  await adminProductStore.loadProduct()
});
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
    <div class="flex items-center gap-6">
      <div class="flex-1">
        <input v-model="adminProductStore.filter.search" type="text" placeholder="Type here" class="input input-bordered w-full" />
      </div>
      <div class="flex-1">
        <h1>Update At</h1>
        <div class="join">
          <button class="btn join-item">ASC</button>
          <button class="btn join-item">DESC</button>
        </div>
      </div>
      <div class="flex-1">
        <h1>Status</h1>
        <div class="join">
          <button class="btn join-item" @click="changeStatusFilter('open')" :class="adminProductStore.filter.status === 'open' ? 'btn-success ' : ''">OPEN</button>
          <button class="btn join-item" @click="changeStatusFilter('close')" :class="adminProductStore.filter.status === 'close' ? 'btn-error  ' : ''">CLOSE</button>
        </div>
      </div>
      <div class="flex-1">
        <button class="btn btn-neutral" @click="searchProduct()">Search</button>
      </div>
    </div>
    <Table :headers="tabelHeaders">
      <tr v-for="(product, index) in adminProductStore.list">
        <th>{{ product.name }}</th>
        <td>
          <div class="avatar">
            <div class="w-24 h-24">
              <img :src="product.imageUrl" />
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
            <div class="btn btn-ghost rounded-full" @click="removeProduct(product.productId)">
              <TrashIcon />
            </div>
            <RouterLink :to="{ name: 'admin-product-update', params: { id: product.productId } }"
              class="btn btn-ghost rounded-full">
              <EditIcon />
            </RouterLink>
          </div>
        </td>
      </tr>
    </Table>
  </AdminLayout>
</template>
