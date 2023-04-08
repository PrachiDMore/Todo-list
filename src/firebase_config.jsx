import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBi_h18gY_Tbdcllh-RmCSr3LVDvHrX9AM",
  authDomain: "todo-f9d3d.firebaseapp.com",
  projectId: "todo-f9d3d",
  storageBucket: "todo-f9d3d.appspot.com",
  messagingSenderId: "144346985029",
  appId: "1:144346985029:web:8e02097a6ff6a797ffa92c"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
