import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    signInWithEmailAndPassword
} from "firebase/auth";

import { auth } from '@/firebase'

const provider = new GoogleAuthProvider();

import { defineStore } from "pinia";

export const useAccountStore = defineStore('account', {
    state: () => ({
        isLoggedIn: false,
        isAdmin: false,
        user: {}
    }),
    actions: {
        async checkAuth() {
            return new Promise((resolve) => {
                onAuthStateChanged(auth, (user) => {
                    // console.log('user', user);
                    if (user) {
                        this.user = user;
                        // workaround
                        if(user.email === 'admin@test.com') {
                            this.isAdmin = true;
                        }
                        this.isLoggedIn = true;
                        resolve(true)
                    } else {
                        // User is signed out
                        // ...
                        resolve(false)
                    }
                });
            })
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