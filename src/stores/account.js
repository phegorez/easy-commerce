import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    signInWithEmailAndPassword
} from "firebase/auth";

import {
    doc,
    getDoc,
    setDoc,
    updateDoc
} from 'firebase/firestore'

import { auth, db } from '@/firebase'

const provider = new GoogleAuthProvider();

import { defineStore } from "pinia";

export const useAccountStore = defineStore('account', {
    state: () => ({
        isLoggedIn: false,
        isAdmin: false,
        user: {},
        profile: {}
    }),
    actions: {
        async checkAuth() {
            return new Promise((resolve) => {
                onAuthStateChanged(auth, async (user) => {
                    // console.log('user', user);
                    if (user) {
                        this.user = user;

                        // console.log('This user is', user.email);

                        const docRef = doc(db, 'user', user.uid);
                        const docSnap = await getDoc(docRef)

                        if (docSnap.exists()) {
                            // no add new
                            this.profile = docSnap.data()
                        } else {
                            // add new
                            const newUser = {
                                name: user.displayName,
                                role: 'member',
                                status: 'active',
                                updatedAt: new Date()
                            }
                            await setDoc(docRef, newUser)
                            this.profile = newUser
                        }

                        // check if user is admin and moderator for provide admin permissions
                        if (this.profile.role === 'admin' || this.profile.role === 'moderator') {
                            this.isAdmin = true;
                        }

                        // new memeber
                        this.isLoggedIn = true;

                        this.profile.email = user.email

                        resolve(true)
                    } else {
                        // User is signed out
                        // ...
                        resolve(false)
                    }
                });
            })
        },
        async updateProfile(userData) {
            try {
                const updateUserData = {
                    name: userData.name,
                    imageUrl: userData.imageUrl
                }

                const userRef = doc(db, `user/${this.user.uid}`)
                await updateDoc(userRef, updateUserData)
            } catch (err) {
                console.log('Error updating profile', err);
            }
        },
        async signInWithGoogle() {
            try {
                const result = await signInWithPopup(auth, provider)
                this.isLoggedIn = true
                this.user = result.user
                // console.log(this.user);
            } catch (err) {
                console.log("Error signing in with google", err);
            }
        },
        async signInAdmin(email, password) {
            try {
                const result = await signInWithEmailAndPassword(auth, email, password)
                this.isLoggedIn = true
                this.isAdmin = true
                this.user = result.user
            } catch (err) {
                console.log(err.code);
                switch (err.code) {
                    case 'auth/invalid-email':
                        throw new Error('Your email address is invalid')
                    case 'auth/wrong-password':
                        throw new Error('Your password is incorrect')
                    default:
                        throw new Error('We have problems with your accout')
                }
            }
        },
        async logOut() {
            this.isLoggedIn = false
            this.isAdmin = false
            await signOut(auth)
        }
    }
})