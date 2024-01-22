<script setup>
import { useProductStore } from '@/stores/product'

import { onMounted,ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

import UserLayout from '@/layouts/UserLayout.vue'

// Components
import Product from '@/components/Product.vue'


const productStore = useProductStore()
const route = useRoute()


const searchText = ref('')

// onMounted(() => {
//     if(route.query.q) {
//         searchText.value = route.query.q
//     }
// })

watch(() => route.query.q, (newSearchText) => {
    searchText.value = newSearchText
}, { immediate: true })

const filterProducts = computed(() => {
    return productStore.filterProducts(searchText.value)
})
</script>

<template>
    <UserLayout>
        <div class="text-xl font-bold m-4">Search: {{ searchText}}</div>
        <Product :productList = 'filterProducts'/>
    </UserLayout>
</template>