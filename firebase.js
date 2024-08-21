// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFDiGaVh5p8EXxKMOWs7VphatnUCucpJ0",
  authDomain: "e-commerce-website-5e9dc.firebaseapp.com",
  databaseURL: "https://e-commerce-website-5e9dc-default-rtdb.firebaseio.com",
  projectId: "e-commerce-website-5e9dc",
  storageBucket: "e-commerce-website-5e9dc.appspot.com",
  messagingSenderId: "428538565063",
  appId: "1:428538565063:web:78b48167d4ef3987c089e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message,divId){
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block"
  messageDiv.innerHTML = message
  messageDiv.style.opacity =1
  setTimeout(function(){
    messageDiv.style.opacity = 0;
  }, 10000)
}
const signUp = document.getElementById("submitSignUp");
signUp.addEventListener('click', (event) =>{
  event.preventDefault();
  const email = document.getElementById('rEmail').value
  const password = document.getElementById('rPassword').value
  const firstName = document.getElementById('fName').value
  const lastName = document.getElementById('lName').value

  const auth = getAuth()
  const db = getFirestore()

  createUserWithEmailAndPassword(auth, email, password). then((userCredential) =>{
    sendEmailVerification(auth.currentUser)
    .then(()=>{
        alert('Email verification link sent!')
    })
    const user = userCredential.user;
    const userData ={
      email :email,
      firstName:firstName,
      lastName:lastName 
    };
    showMessage("Account created successfully", "signUpMessage");
    const docRef = doc(db, "users", user.uid)
    setDoc(docRef, userData)
    .then(()=>{
      window.location.href= "cart.html"
    })
    .catch((error)=>{
      console.error('error writing document', error)
    })
  })
  .catch((error)=>{
    const errorCode =error.code;
    if(errorCode=="auth/email-already-in-use"){
      showMessage("Email Address Already Exists !!!" ,'signUpMessage')

    }
    else{
      showMessage("Unable to create User", "signUpMessage")
    }
  })
})

const signIn = document.getElementById("submitSignIn")
signIn.addEventListener("click", (event)=>{
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById('password').value;
    const auth =getAuth();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        showMessage("Login is successful", "signInMessage");
        const user = userCredential.user;
        localStorage.setItem("loggedInUserId", user.uid)
        window.location.href = " cart.html"
    })
    .catch((error)=>{
        const errorCode = error.code;
        if(errorCode ==="auth/invalid-credential"){
            showMessage("Incorrect Email or password","signInMessage")
        }
        else{
            showMessage('Account does not Exist', 'signInMessage')
        }
    })
})