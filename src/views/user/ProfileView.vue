<script setup>
// Libraly
import { storage } from '@/firebase'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

// Store
import { useAccountStore } from '@/stores/account'
const accountStore = useAccountStore()

// Layout
import UserLayout from "@/layouts/UserLayout.vue";

// Vue commands
import { ref, onMounted } from "vue";



//Step to upload image to Firebase
//1. Set reference in Firebase
//2. Upload file
//3. Get download file

const profileImageUrl = ref(
  "https://i1.sndcdn.com/artworks-000161913473-5mwrx1-t500x500.jpg",
);
const email = ref("");
const name = ref("");

const handleFileUpload = async (event) => {
  const file = event.target.files[0];

  if (file) {
    //Set reference in Firebase
    const uploadRef = storageRef(
      storage,
      `users/${accountStore.user.uid}/${file.name}`
    )

    //Upload file
    const snapShot = await uploadBytes(uploadRef, file)

    //Get download file
    const downloadUrl = await getDownloadURL(snapShot.ref)
    profileImageUrl.value = downloadUrl

  }
};

const updateProfile = async () => {
  try {
    const profileData = {
      imageUrl: profileImageUrl.value,
      email: email.value,
      name: name.value,
    };
    await accountStore.updateProfile(profileData)
  } catch (err) {
    console.log('Failed to update profile', err);
  }
};

onMounted(() => {
  let profileData = accountStore.profile
  profileImageUrl.value = (profileData.imageUrl || 'https://i1.sndcdn.com/artworks-000161913473-5mwrx1-t500x500.jpg')
  name.value = profileData.name;
  email.value = profileData.email;

});
</script>

<template>
  <UserLayout>
    <div class="border border-base-200 shadow-xl max-w-2xl mx-auto my-4 p-8">
      <div class="font-bold text-2xl">Your Profile</div>

      <div class="flex flex-col items-center">
        <div class="flex flex-col items-center">
          <div class="avatar">
            <div class="w-24 rounded-full">
              <img :src="profileImageUrl" />
            </div>
          </div>
          <input type="file" class="inputFile border-2 border-neutral rounded-md" @change="handleFileUpload" />
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input :value="accountStore.user.email" type="text" placeholder="Type here" class="input input-bordered w-full"
            disabled />
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Name</span>
          </label>
          <input v-model="name" type="text" placeholder="Type here" class="input input-bordered w-full" />
        </div>
        <button @click="updateProfile" class="btn btn-neutral mt-4 w-full">
          Update Profile
        </button>
      </div>
    </div>
  </UserLayout>
</template>
