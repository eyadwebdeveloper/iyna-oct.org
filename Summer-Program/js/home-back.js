import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

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
    const userEmail = user.email;
    checkProgress();
  } else {
    console.log('No user signed in');
    showPopup('no user signed in');
    setTimeout(function() {
      window.location.href = `./`;
    }, 2000);
  }
  
});

async function checkProgress() {
  console.log('checkProgress() called');
  if (auth.currentUser) {
    console.log('auth.currentUser is not null');
    document.getElementById('welcome').innerHTML = `Hello ${auth.currentUser.displayName}, Welcome to IYNA October Chapter 2024 Summer program!`
    document.getElementById('email').value = auth.currentUser.email;
    try {
      const userRef = doc(db, 'users', auth.currentUser.email);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.submitted) {
          window.location.href = './Status?tab=status'
        } else {
          console.log('You have saved progress, but not submitted yet.');
          // Populate input fields with saved progress data
          document.getElementById('name').value = userData.name;
          document.getElementById('email').value = userData.email;
          document.getElementById('tel').value = userData.tel;
          document.getElementById('country').value = userData.country;
          document.getElementById('school').value = userData.school;
          document.querySelector('#grade .span').textContent = userData.grade;
          document.getElementById('essay1').value = userData.first;
          document.getElementById('essay2').value = userData.second;
          document.getElementById('essay3').value = userData.third;
          document.getElementById('time-blocks').value = userData.timeBlocks;
          document.getElementById('hours').value = userData.hours;
          document.querySelector('#hear .span').value = userData.hear;
          document.getElementById('essay4').value = userData.fourth;
        }
      } else {
        console.log('No progress saved or submitted yet.');
      }
    } catch (error) {
      console.log('Error checking progress: ' + error.message);
    }
  } else {
    console.log('auth.currentUser is null');
    console.log('You must be signed in to check your progress.');
  }
}

function signOutUser() {
  auth.signOut().then(() => {
    // Sign-out successful.
    showPopup('You have been signed out');
    setTimeout(function() {
      window.location.href = `./`;
    }, 3000);
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


// Add save progress function
async function saveProgress(formData) {
  try {
    const userRef = doc(db, 'users', auth.currentUser.email);
    await setDoc(userRef, { ...formData, submitted: false }, { merge: true });
    showPopup('Progress saved successfully!');
  } catch (error) {
    showPopup('Error saving progress: ' + error.message);
  }
}





async function submitForm(formData) {
  try {
    const userRef = doc(db, 'users', auth.currentUser.email);
    await setDoc(userRef, { ...formData, submitted: true }, { merge: true });
    showPopup('Portal submitted successfully!');

    setTimeout(function() {
      window.location.href = './Status?tab=status'
    }, 2000);
    const formURL =
"https://docs.google.com/forms/u/0/d/e/1FAIpQLSezWZzwRx7bakowdWk0wh9CDW8FrurU7ogZWnJaBVQhzisyHg/formResponse";

const googleFormData = new URLSearchParams();
    googleFormData.append("entry.1626463080", document.getElementById('name').value); 
    googleFormData.append("entry.1381097618", document.getElementById('email').value);  
    googleFormData.append("entry.1485211006", document.getElementById('tel').value); 
    googleFormData.append("entry.916355813", document.getElementById('country').value);
    googleFormData.append("entry.1480317963", document.getElementById('school').value);
    googleFormData.append("entry.1037661662", document.getElementById('grade').textContent); 
    googleFormData.append("entry.877868938", document.getElementById('essay1').value); 
    googleFormData.append("entry.2013460935", document.getElementById('essay2').value); 
    googleFormData.append("entry.688020562", document.getElementById('essay3').value); 
    googleFormData.append("entry.732951479", document.getElementById('time-blocks').value); 
    googleFormData.append("entry.225966547", document.getElementById('hours').value); 
    googleFormData.append("entry.397915696", document.getElementById('hear').textContent); 
    googleFormData.append("entry.833407747", document.getElementById('essay4').value); 

    try {
      const response = await fetch(formURL, {
        method: "POST",
        body: googleFormData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: 'no-cors', 
      });

      if (response.ok) {
        console.log("Form submitted successfully!");
      } 
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    // ...
  } catch (error) {
    showPopup('Error submitting Portal: ' + error.message);
  }
}

const saveProgressBtn = document.getElementById('progress');
saveProgressBtn.addEventListener('click', (event) => {
  event.preventDefault();
  document.getElementById('loading').style.display = 'flex';
  setTimeout( ()=> {
    document.getElementById('loading').style.display = 'none';
  }, 3000);
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      tel: document.getElementById('tel').value,
      country: document.getElementById('country').value,
      school: document.getElementById('school').value,
      grade: document.getElementById('grade').textContent,
      first: document.getElementById('essay1').value,
      second: document.getElementById('essay2').value,
      third: document.getElementById('essay3').value,
      timeBlocks: document.getElementById('time-blocks').value,
      hours: document.getElementById('hours').value,
      hear: document.getElementById('hear').textContent,
      fourth: document.getElementById('essay4').value
  };
  saveProgress(formData);
});

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  let essay1Element = document.getElementById('essay1');
  let e1txt = essay1Element.value.trim();
  let e1count = e1txt.split(/\s+/).filter((item) => item).length;
  let essay2Element = document.getElementById('essay2');
  let e2txt = essay2Element.value.trim();
  let e2count = e2txt.split(/\s+/).filter((item) => item).length;
  let essay3Element = document.getElementById('essay3');
  let e3txt = essay3Element.value.trim();
  let e3count = e3txt.split(/\s+/).filter((item) => item).length;
  if(document.getElementById('name').value == ''){
    showPopup('Please enter your full name');
  } else if(document.getElementById('email').value == ''){
    showPopup('Please enter your email adress');
  } else if(document.getElementById('tel').value == ''){
    showPopup('Please enter your Phone number');
  } else if(document.getElementById('country').value == ''){
    showPopup('Please enter your country');
  } else if(document.getElementById('school').value == ''){
    showPopup('Please enter your school/university');
  } else if(document.getElementById('grade').textContent == 'Select'){
    showPopup('Please select your grade');
  } else if(document.getElementById('essay1').value == ''){
    showPopup('Please enter The first essay');
  } else if(document.getElementById('essay2').value == ''){
    showPopup('Please enter The second essay');
  } else if(document.getElementById('essay3').value == ''){
    showPopup('Please enter The third Essay');
  } else if(e1count < 150 || e1count > 250){
    showPopup('The first Essay must be between 150 and 250 words');
  } else if(e2count < 200){
    showPopup('The second Essay must be at least 200 words');
  } else if(e3count < 150 || e3count > 250){
    showPopup('The third Essay must be at least 300 words');
  } else if(document.getElementById('time-blocks').value == ''){
    showPopup('Please enter The time blocks');
  } else if(document.getElementById('hours').value == ''){
    showPopup('Please enter your avaliable hours');
  } else if(document.getElementById('hear').textContent == 'Select'){
    showPopup('Please enter How did you hear about us');
  }
  else{
    let currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    let currentTime = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    document.getElementById('loading').style.display = 'flex';
  setTimeout( ()=> {
    document.getElementById('loading').style.display = 'none';
  }, 3000);
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      tel: document.getElementById('tel').value,
      country: document.getElementById('country').value,
      school: document.getElementById('school').value,
      grade: document.getElementById('grade').textContent,
      first: document.getElementById('essay1').value,
      second: document.getElementById('essay2').value,
      third: document.getElementById('essay3').value,
      timeBlocks: document.getElementById('time-blocks').value,
      hours: document.getElementById('hours').value,
      hear: document.getElementById('hear').textContent,
      fourth: document.getElementById('essay4').value,
      date: currentDate,
      time: currentTime
    };
    submitForm(formData);
  }
});
 
