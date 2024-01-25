<script setup>
import { useProductStore } from '@/stores/user/product'
import { useCartStore } from '@/stores/user/cart'

import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import UserLayout from '@/layouts/UserLayout.vue'

// Components
import Product from '@/components/Product.vue'


const productStore = useProductStore()
const cartStore = useCartStore();

const route = useRoute()
const router = useRouter()


const searchText = ref('')

// onMounted(() => {
//     if(route.query.q) {
//         searchText.value = route.query.q
//     }
// })

const addToCart = (product, isAddtoCart) => {
    if (isAddtoCart === 'fromAddTocart') {
        cartStore.addToCart(product);
    } else {
        cartStore.addToCart(product);
        router.push({ name: 'cart' })
    }
};

watch(() => route.query.q, (newSearchText) => {
    searchText.value = newSearchText
}, { immediate: true })

const filterProducts = computed(() => {
    return productStore.filterProducts(searchText.value)
})

</script>

<template>
    <UserLayout>
        <div class="text-xl font-bold m-4">Search: {{ searchText }}</div>
        <Product :productList='filterProducts' :addToCart="addToCart" />
    </UserLayout>
</template>@/stores/user/product