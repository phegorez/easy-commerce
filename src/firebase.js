// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator  } from 'firebase/firestore';
import { getAuth, connectAuthEmulator  } from "firebase/auth";
import { getStorage, connectStorageEmulator  } from 'firebase/storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDAKXlMUAs7Fuy0GphK5mqzmFxoQo0_S30',
    authDomain: 'easy-commerce-2bb8d.firebaseapp.com',
    databaseURL: 'https://easy-commerce-2bb8d-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'easy-commerce-2bb8d',
    storageBucket: 'easy-commerce-2bb8d.appspot.com',
    messagingSenderId: '858899646160',
    appId: '1:858899646160:web:2c4e9e08c52515b85b40d5'
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

connectFirestoreEmulator(db, '127.0.0.1', 8080);
connectAuthEmulator(auth, "http://127.0.0.1:9099");
connectStorageEmulator(storage, "127.0.0.1", 9199);

export {
    db,
    auth,
    storage
}


// cli for run emulators
//  firebase emulators:start --import firebase-export-1708189724296WfERyh --export-on-exit