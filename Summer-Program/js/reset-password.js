// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, sendPasswordResetEmail  } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA4Krrj7Z8ieWT0pQZ0-kgKRzxA9QmUZkY",
  authDomain: "iyna-members.firebaseapp.com",
  projectId: "iyna-members",
  storageBucket: "iyna-members.appspot.com",
  messagingSenderId: "1052512029004",
  appId: "1:1052512029004:web:7705e148dbe6eefedde7e9",
  measurementId: "G-VT4K16ZHCX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


function load(){
  document.getElementById('loading').style.display = 'flex';
  setTimeout( ()=> {
    document.getElementById('loading').style.display = 'none';
  }, 3000);
}
window.onload(load());

const popupContainer = document.getElementById('popup');
const closeBtn = document.querySelector('.close-btn');
closeBtn.onclick = () => {
    popupContainer.classList.remove('active');
}
function showPopup(message){
    document.getElementById('popup-text').innerHTML = message;
    popupContainer.classList.add('active');
}
const form = document.getElementById('reset-password-form');

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    load();
    const email = document.getElementById('reset-password-email').value;
    sendPasswordResetEmail(auth, email)
  .then(() => {
    showPopup("Password reset link sent successfully!, check your email, then you can sigin with the new passwrod.");    
  })
  .catch((error) => {
    showPopup("Error sending password reset link:");
  });
})




  