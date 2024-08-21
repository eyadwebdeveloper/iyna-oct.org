import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

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

const form = document.getElementById('sign-up-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const rpassword = document.getElementById('sign-up-password').value;
  if (rpassword.length < 6) {
    showPopup('Password must be at least 6 characters long');
    return;
  }
  else if (!/[a-z]/.test(rpassword)) {
    showPopup('Password must contain at least one lowercase letter');
    return;
  }
  else if (!/[A-Z]/.test(rpassword)) {
    showPopup('Password must contain at least one uppercase letter');
    return;
  }
  else if (!/[0-9]/.test(rpassword)) {
    showPopup('Password must contain at least one number');
    return;
  }
  else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(rpassword)) {
    showPopup('Password must contain at least one special character');
    return;
  }
  else{
    const rname = document.getElementById('sign-up-name').value; // get the value from another input field
    const remail = document.getElementById('sign-up-email').value;
    const rpassword = document.getElementById('sign-up-password').value;
    document.getElementById('loading').style.display = 'flex';
  setTimeout( ()=> {
    document.getElementById('loading').style.display = 'none';
  }, 2000);
    createUserWithEmailAndPassword(auth, remail, rpassword)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(user, {
        displayName: rname
      })
      .then(() => {
        console.log('Profile updated successfully!');
        showPopup(`Account Created Successfully ${rname}`);
        setTimeout(function() {
          window.location.href = `./Application?tab=rules`;
        }, 2000);
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        // Handle profile update error here
      });
    })
    .catch((error) => {
      console.error('Error creating user:', error);
      // Handle user creation error here
      if(error.code == 'auth/email-already-in-use'){
        showPopup(`Email already in use`);
      }
    });
  }
})


document.getElementById('sign-up-google').addEventListener('click', (event)=>{
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

