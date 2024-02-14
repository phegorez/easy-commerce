<script setup>
import { defineProps } from 'vue'

//iconse
import AnglesRight from "@/components/icons/AnglesRight.vue";
import AnglesLeft from "@/components/icons/AnglesLeft.vue"

defineProps({
    activePage: Number,
    maxPage: Number,
    changePage: Function
})
</script>

<template>
    <div class="join">
        <button v-if="activePage - 1 > 0" class="join-item btn" @click="changePage(activePage - 1)"><AnglesLeft /></button>
        <button class="join-item btn">Page {{ activePage }} / {{ maxPage }}</button>
        <button v-if="activePage + 1 <= maxPage" class="join-item btn" @click="changePage(activePage + 1)"><AnglesRight /></button>
    </div>
</template>