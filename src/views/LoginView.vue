<script setup>
import { RouterLink } from 'vue-router'

import CenterDiv from '@/utility/CenterDiv.vue'
</script>

<template>
    <CenterDiv>
        <div class="font-bold text-4xl">Login</div>
        <label class="form-control w-full max-w-xs mt-4">
            <div class="label">
                <span class="label-text font-bold">Email</span>
            </div>
            <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
        </label>
        <label class="form-control w-full max-w-xs mt-4">
            <div class="label">
                <span class="label-text font-bold">Password</span>
            </div>
            <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
        </label>
        <RouterLink :to="{name : 'admin-dashboard'}" class="mt-10 btn btn-neutral w-full">LOGIN</RouterLink>
    </CenterDiv>
</template>