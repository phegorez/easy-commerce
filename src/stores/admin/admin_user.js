import { defineStore } from "pinia";

import { db } from "@/firebase"
import {
    collection,
    doc,
    getDocs,
    getDoc,
    setDoc
} from 'firebase/firestore'

export const useAdminUserStore = defineStore("user", {
    state: () => ({
        usersList: []
    }),
    actions: {
        async loadUser() {
            //find collection
            const userCol = collection(db, 'user')
            //create snapshot
            const userSnapshot = await getDocs(userCol)

            const userList = userSnapshot.docs.map(doc => {

                let convertedUser = doc.data()
                //add uid
                convertedUser.uid = doc.id
                //convert date/time format
                convertedUser.updatedAt = convertedUser.updatedAt.toDate().toLocaleString()

                //return
                return convertedUser
            })

            this.usersList = userList
        },
        async getUser(uid) {
            // return this.usersList[index]
            try {
                const userRef = doc(db, 'user', uid)
                const userSnapshot = await getDoc(userRef)
                return userSnapshot.data()
            } catch (err) {
                console.log('error', err);
            }
        },
        async updateUser(uid, userData) {
            try {
                const updatedUser = {
                    name: userData.name,
                    role: userData.role,
                    status: userData.status,
                    updatedAt: new Date()
                }

                const docRef = doc(db, 'user', uid)
                await setDoc(docRef, updatedUser)
            } catch (err) {
                console.log('error', err);
            }
            // this.usersList[index].updatedAt = (new Date()).toLocaleString();
        },
    },
    getters: {

    },
});