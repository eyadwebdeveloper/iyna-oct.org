// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

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

const popupContainer = document.getElementById('popup');
const closeBtn = document.querySelector('.close-btn');
closeBtn.onclick = () => {
    popupContainer.classList.remove('active');
}
function showPopup(message){
    document.getElementById('popup-text').innerHTML = message;
    popupContainer.classList.add('active');
}




const form = document.getElementById('sign-in-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('sign-in-email').value;
  const password = document.getElementById('sign-in-password').value;
  
  if(email == ''){
    showPopup('Please enter your email address');
    return;
  } else if (!/@/.test(email)) {
    showPopup('Please enter a valid email address');
    return;
  } else if (password == '') {
    showPopup('Please enter your password');
    return;
  }
  else{
    document.getElementById('loading').style.display = 'flex';
  setTimeout( ()=> {
    document.getElementById('loading').style.display = 'none';
  }, 3000);
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showPopup('logged in successfully');
      const user = userCredential.user;
      setTimeout(function() {
        window.location.href = `./Application?tab=rules`;
      }, 3000);
      
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-credential') {
        showPopup('Incorrect Email or Password');
      } else {
        showPopup('Account does not Exist');
      }
    })
  }
});
document.getElementById('sign-in-google').addEventListener('click', (event)=>{
  event.preventDefault();

  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      showPopup('login is successful');
      const user = result.user;
      setTimeout(function() {
        window.location.href = `./Application?tab=rules`;
      }, 2000);
    })
    .catch((error) => {
      const errorCode = error.code;
      showPopup('Error signing in with Google: ' + errorCode);
    });
})  
  



// const microsoftButton = document.getElementById('microsoft');
// microsoftButton.addEventListener('click', (event) => {
//   event.preventDefault();
//   const provider = new OAuthProvider('microsoft.com');
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       showPopup('login is successful');
//       const user = result.user;
//       setTimeout(function() {
//         window.location.href = `home.html?tab=rules`;
//       }, 2000);
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       showPopup('Error signing in with Microsoft: ' + errorCode);
//     });
// });