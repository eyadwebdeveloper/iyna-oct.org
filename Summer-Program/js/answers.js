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

let essay1Element = document.getElementById('essay1');
let e1counter = document.getElementById("e1counter");

essay1Element.addEventListener("input", () => {
  let txt = essay1Element.value.trim();
  let e1count = txt.split(/\s+/).filter((item) => item).length;
  e1counter.textContent = e1count + '/150-250';
  if(e1count < 150 || e1count > 250){
      e1counter.style.color = 'red';
  } else{
      e1counter.style.color = 'green';
  }
});

let essay2Element = document.getElementById('essay2');
let e2counter = document.getElementById("e2counter");

essay2Element.addEventListener("input", () => {
  let txt = essay2Element.value.trim();
  let e2count = txt.split(/\s+/).filter((item) => item).length;
  e2counter.textContent = e2count + '/200';
  if(e2count < 200){
    e2counter.style.color = 'red';
  } else{
    e2counter.style.color = 'green';
  }
});

let essay3Element = document.getElementById('essay3');
let e3counter = document.getElementById("e3counter");

essay3Element.addEventListener("input", () => {
    let txt = essay2Element.value.trim();
    let e3count = txt.split(/\s+/).filter((item) => item).length;
    e3counter.textContent = e3count + '/150-250';
    if(e3count < 150 || e3count > 250){
        e3counter.style.color = 'red';
    } else{
        e3counter.style.color = 'green';
    }     
});


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
    document.getElementById('answers-title').innerHTML = `${user.displayName}'s Application`
    try {
      const userRef = doc(db, 'users', user.email);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.submitted) {
          console.log('User is signed in:', user.displayName);
          document.getElementById('name').value = userData.name;
          document.getElementById('email').value = userData.email;
          document.getElementById('tel').value = userData.tel;
          document.getElementById('country').value = userData.country;
          document.getElementById('school').value = userData.school;
          document.querySelector('.select .span').textContent = userData.grade;
          document.getElementById('essay1').value = userData.first;
          document.getElementById('essay2').value = userData.second;
          document.getElementById('essay3').value = userData.third;
        } else {
          window.location.href = './summer-program?tab=rules';
        }
      } else {
        window.location.href = './summer-program?tab=rules';
      }
    } catch (error) {
      console.log('Error checking progress: ' + error.message);
      window.location.href = './summer-program?tab=rules';
    }
  } else {
    console.log('No user signed in');
    showPopup('You must Signin first');
    setTimeout(function() {
        window.location.href = `./`;
      }, 2000);
  }
}

function signOutUser() {
  auth.signOut().then(() => {
    showPopup('You have been signed out');
    window.location.href = `./`; 
  }).catch((error) => {
    showPopup('Error signing out');
  });
}
const signOut = document.getElementById('signout');
signOut.addEventListener('click', (event) => {
  event.preventDefault();
  signOutUser();
});


