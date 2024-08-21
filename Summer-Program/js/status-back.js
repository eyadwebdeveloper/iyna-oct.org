import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

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
const db = getFirestore(app);


const popupContainer = document.getElementById('popup');
const closeBtn = document.querySelector('.close-btn');
closeBtn.addEventListener('click', ()=>{
  popupContainer.classList.remove('active');
})
function showPopup(message){
    document.getElementById('popup-text').innerHTML = message;
    popupContainer.classList.add('active');
}

onAuthStateChanged(auth, (user) => {
  console.log('onAuthStateChanged callback executed');
  if (user) {
    console.log('User is signed in:', user.displayName);
    checkProgress();
  } else {
    console.log('No user signed in');
    showPopup('no user signed in');
    window.location.href = './';
  }
});

async function checkProgress() {
  console.log('checkProgress() called');
  const user = auth.currentUser;
  if (user) {
    console.log('User is signed in:', user.displayName);
    try {
      const userRef = doc(db, 'users', user.email);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.submitted) {
          console.log('User is signed in:', user.displayName);
          document.getElementById('status-name').innerHTML = userData.name;
          document.getElementById('status-date').innerHTML = userData.date + ' , ' + userData.time;
        } else {
          window.location.href = './Application?tab=rules';
        }
      } else {
        window.location.href = './Application?tab=rules';
      }
    } catch (error) {
      console.log('Error checking progress: ' + error.message);
    }
  } else {
    console.log('No user signed in');
    showPopup('You must Signin first');
    setTimeout(function() {
        window.location.href = `./Application?tab=status`;
      }, 2000);
  }
}

function signOutUser() {
  auth.signOut().then(() => {
    // Sign-out successful.
    showPopup('You have been signed out');
    window.location.href = `./`; // redirect to login page
  }).catch((error) => {
    // An error happened.
    showPopup('Error signing out');
  });
}
const signOut = document.getElementById('signout');
signOut.addEventListener('click', (event) => {
  event.preventDefault();
  signOutUser();
});


