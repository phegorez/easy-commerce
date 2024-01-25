<script setup>
import UserLayout from '@/layouts/UserLayout.vue'
import { reactive } from 'vue';

const FormData = [
    {
        name: 'Email Address',
        field: 'email',
    },
    {
        name: 'Name',
        field: 'name'
    },
    {
        name: 'Address',
        field: 'address'
    },
    {
        name: 'Note',
        field: 'note'
    }
]

const userFormData = reactive({
    email: '',
    name: '',
    address: '',
    note: ''
})

const payment = () => {
    console.log(userFormData);
}
</script>

<template>
    <UserLayout>
        <div class="flex">
            <section class="flex-auto w-64 bg-base-200 p-8">
                <label class="form-control w-full" v-for="formInput in FormData">
                    <div class="label">
                        <span class="label-text">{{ formInput.name }}</span>
                    </div>
                    <input v-model="userFormData[formInput.field]" type="text" :placeholder="formInput.field"
                        class="input input-bordered w-full" />
                </label>
                <button @click="payment" class="btn btn-neutral w-full mt-4">Checkout</button>
            </section>
            <section class="flex-auto w-32 bg-base-300">
                Summary
            </section>
        </div>
    </UserLayout>
</template>