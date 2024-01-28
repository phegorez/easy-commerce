<script setup>
import { ref, onMounted } from 'vue'
import UserLayout from '@/layouts/UserLayout.vue'

const profileImageUrl = ref('https://i1.sndcdn.com/artworks-000161913473-5mwrx1-t500x500.jpg')
const email = ref('')
const name = ref('')

const handleFileUpload = (event) => {
    const file = event.target.files[0]

    if(file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            profileImageUrl.value = e.target.result
        }
        reader.readAsDataURL(file)
    }
}

const updateProfile = () => {
    const profileData = {
        imageUrl: profileImageUrl.value,
        email: email.value,
        name: name.value
    }
    localStorage.setItem('profile-data', JSON.stringify(profileData))
    alert('Success')
}

onMounted(() => {
    let profileData = localStorage.getItem('profile-data')
    if(profileData){
        profileData = JSON.parse(profileData)
        profileImageUrl.value = profileData.imageUrl
        name.value = profileData.name
        email.value = profileData.email
    }
})
</script>

<template>
    <UserLayout>
        <div class="border border-base-200 shadow-xl max-w-2xl mx-auto my-4 p-8">
            <div class="font-bold text-2xl">Your Profile</div>

            <div class="flex flex-col items-center">
                <div class="flex flex-col items-center">
                    <div class="avatar">
                        <div class="w-24 rounded-full">
                            <img :src="profileImageUrl">
                        </div>
                    </div>
                    <input type="file" class="mt-4" @change="handleFileUpload">
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Email</span>
                    </label>
                    <input v-model="email" type="text" placeholder="Type here" class="input input-bordered w-full" />
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Name</span>
                    </label>
                    <input v-model="name" type="text" placeholder="Type here" class="input input-bordered w-full" />
                </div>
                <button @click="updateProfile" class="btn btn-neutral mt-4 w-full">Update Profile</button>
            </div>
        </div>
    </UserLayout>
</template>