<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="flex h-screen">
    <div class="m-auto">
      <div
        class="border border-base-200 shadow-xl flex flex-col items-center w-96 mx-auto my-4 p-8"
      >
        <div class="font-bold text-9xl">404</div>
        <div class="font-bold text-2xl">PAGE NOT FOUND</div>
        <RouterLink :to="{ name: 'home' }" class="btn btn-primary mt-4 w-full"
          >GO TO HOME PAGE</RouterLink
        >
      </div>
    </div>
  </div>
</template>
