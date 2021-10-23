import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, updateProfile, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { getFirestore, collection, addDoc, doc, setDoc, updateDoc, arrayUnion, arrayRemove, getDoc } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import {design, select, timeoutHide, info} from './apk.js'
const firebaseConfig = {
  apiKey: "AIzaSyAtoeJC8Pc0b7XO4KSxGONEL3fyxhqXXxQ",
  authDomain: "vegtaza-68667.firebaseapp.com",
  projectId: "vegtaza-68667",
  storageBucket: "vegtaza-68667.appspot.com",
  messagingSenderId: "446430771457",
  appId: "1:446430771457:web:d12be61b172fb757d14300",
  measurementId: "G-9SM7K9GJVP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

function stater() {
  setPersistence(auth, browserLocalPersistence).then(() => {})
}
stater()

export function registerFn(email, password, name, phone){
  createUserWithEmailAndPassword(auth, email.value, password.value).then((cred)=>{
    updateProfile(auth.currentUser, {
      displayName: name.value
    })
    setDoc(doc(db, "users", cred.user.uid), {
      'email': cred.user.email,
      'id': cred.user.uid,
      'phone': phone.value,
      'name': name.value,
      'cart': [],
      'orderHistory': [],
      'address':'',
      'location':''
    });
    setDoc(doc(db, "admin", cred.user.email), {
      'id': cred.user.uid
    }).then(()=>{
      window.location.reload()
    })
  })
}

export function loginFn(email, password) {
  signInWithEmailAndPassword(auth, email.value, password.value).then((userCredential) => {window.location.reload()}).catch((err)=>{
    
    design(select('#alert'),{
              display:'block'
            })
            timeoutHide('#alert', 3000)
            info(select('#alertMsg'),{
              innerText:err.message
            })
            let au=new Audio('../pop.mp3')
            au.play()
  })
}

export async function dataBase(gate1, gate2, func) {
  const docRef = doc(db, gate1, gate2);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    func(docSnap.data())
  }
}

export async function updateArray(gate1, data1, func) {
  try{
  const ref = doc(db, 'users', auth.currentUser.uid);
  await updateDoc(ref, {
    [gate1]: arrayUnion(data1)
  });
  func()
  }catch(err){
    design(select('#alert'),{
              display:'block'
            })
            timeoutHide('#alert', 3000)
            info(select('#alertMsg'),{
              innerText:'please login first'
            })
            let au=new Audio('../pop.mp3')
            au.play()
  }
  
}

export function ready(func){
  onAuthStateChanged(auth, (user) => {
  if (user) {
    func(user)
  }
});
}

export async function getCart(authId,func1) {
  const docRef=doc(db, 'users', authId);
  const docSnap =await getDoc(docRef);
  if (docSnap.exists()) {
    func1(docSnap.data())
  }
}

export async function removeArray(authId,gate1,data1, func) {
  const ref=await doc(db, "users", authId);
    updateDoc(ref, {
      [gate1]: arrayRemove(data1)
    });
    func()
}
