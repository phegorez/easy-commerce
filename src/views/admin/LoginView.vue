<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useAccountStore } from '@/stores/account';
import { useEventStore } from '@/stores/event';

import CenterDiv from '@/utility/CenterDiv.vue'

const accountStore = useAccountStore()
const eventStore = useEventStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const logIn = async () => {
    try {
        await accountStore.signInAdmin(email.value, password.value)
        router.push({name: 'admin-dashboard'})
    } catch(err) {
        eventStore.popupMessage('error', err.message)
    }
}
</script>

<template>
    <CenterDiv>
        <div class='font-bold text-4xl'>Login</div>
        <label class='form-control w-full max-w-xs mt-4'>
            <div class='label'>
                <span class='label-text font-bold'>Email</span>
            </div>
            <input type='text' v-model='email' placeholder='Type here' class='input input-bordered w-full max-w-xs' />
        </label>
        <label class='form-control w-full max-w-xs mt-4'>
            <div class='label'>
                <span class='label-text font-bold'>Password</span>
            </div>
            <input type='password' v-model='password' placeholder='Type here' class='input input-bordered w-full max-w-xs' />
        </label>
        <button @click='logIn' class='mt-10 btn btn-neutral w-full'>LOGIN</button>
    </CenterDiv>
</template>