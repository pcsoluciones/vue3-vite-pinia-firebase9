import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: "AIzaSyA4igricmnZQ_VKwqUV3CEjwe-DTvm8eO8",
  authDomain: "vue3-2022.firebaseapp.com",
  projectId: "vue3-2022",
  storageBucket: "vue3-2022.appspot.com",
  messagingSenderId: "377321887877",
  appId: "1:377321887877:web:4512b4add3159dae21b1ec"
};
initializeApp(firebaseConfig);

const auth = getAuth()
const db = getFirestore()

export {auth, db}


