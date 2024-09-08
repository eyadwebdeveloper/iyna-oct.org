import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCp5YscKqWKU97TU3eq7_xLkapgCTClRlY",
  authDomain: "iyna-portal.firebaseapp.com",
  databaseURL: "https://iyna-portal-default-rtdb.firebaseio.com",
  projectId: "iyna-portal",
  storageBucket: "iyna-portal.appspot.com",
  messagingSenderId: "256208881067",
  appId: "1:256208881067:web:f37186387ac82366003eee",
  measurementId: "G-8C9VQ9BH0F"
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

let multiplePerson = false;
let tabSwitch = false;


document.addEventListener("visibilitychange", function() {
  if (document.visibilityState === "hidden") {
    tabSwitch = true;
  }
});

onAuthStateChanged(auth, (user) => {
  console.log('onAuthStateChanged callback executed');
  if (user) {
    console.log('User is signed in:', user.email);
    checkProgress();

  } else {
    console.log('No user signed in');
    showPopup('no user signed in');
    location.href = 'index.html';
  }
});
function submitForm() {
  // Your existing submission code here
  let answers = {}; // Object to store answers
  let score = 0; // Initialize score to 0
  const questions = document.querySelectorAll('.input-field');
const correctAnswers = ["q1a", "q2b", "q3c", "q4d", "q5b", "q6d", "q7e", "q8b", "q9d", "q10c", "q11a", "q12a", "q13e", "q14a", "q15d", "q16e", "q17d", "q18a", "q19b", "q20c", "q21b", "q22a", "q23b", "q24d", "q25c", "q26c", "q27c", "q28d", "q29b", "q30e", "q31a", "q32a", "q33c", "q34a", "q35a", "q36d", "q37b", "q38b", "q39d", "q40a", "q41c", "q42c", "q43b", "q44b", "q45b"];

// Only select the first 45 questions
const selectedQuestions = Array.from(questions).slice(0, correctAnswers.length);
  // Loop through each question and get the selected answer
// Loop through each question and get the selected answer
selectedQuestions.forEach(function(question, index) {
let selectedAnswer = question.querySelector('input[type="radio"]:checked');
if (!selectedAnswer) {
  console.log(`No answer selected for question ${index + 1}`);
  // You can also add the question number to the unsolved warning here
  const warningText = unsolvedWarning.innerHTML;
  if (!warningText.includes(`Question #${index + 1}`)) {
    unsolvedWarning.innerHTML += `<br>Question #${index + 1}`;
    unsolvedWarning.classList.add('show');
  }
  return;
}

answers[`question${index + 1}`] = selectedAnswer.value;

// Check if the selected answer is correct
if (selectedAnswer.value === correctAnswers[index]) {
  score++;
}
});

// Since you only have 45 questions, you should not see "No answer selected for question 46"
// However, to be safe, you can add a check to make sure you're not trying to access an index that's out of bounds
if (score < correctAnswers.length) {
console.log(`You answered ${score} out of ${correctAnswers.length} questions correctly.`);
} else {
console.log(`You answered all ${correctAnswers.length} questions correctly!`);
}

  // Get the current user
  const user = auth.currentUser;

  // Submit the score to Firestore
  const round1Ref = doc(db, "round1", auth.currentUser.email);
  setDoc(round1Ref, {
    name: user.displayName,
    email: user.email,
    score: score,
    answers: answers,
    cheatPerson: multiplePerson,
    cheatTab: tabSwitch
    })
  .then(() => {
    console.log("Score submitted successfully!");
    showPopup('Exam Submitted Successfully!');
    console.log(score);
    setTimeout(()=>{
      location.href = 'submitted.html';
    },2000)
  })
  .catch((error) => {
    console.error("Error submitting score:", error);
  });
}
async function checkProgress() {
  console.log('checkProgress() called');
  if (auth.currentUser) {
    console.log('auth.currentUser is not null');
    try {
      const userRef = doc(db, 'round1', auth.currentUser.email);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        console.log('submitted');
        location.href = 'submitted.html';
      } else {
        console.log('Not submitted yet.');
      }
    } catch (error) {
      console.log('Error checking progress: ' + error.message);
    }
  } else {
    console.log('auth.currentUser is null');
    console.log('You must be signed in to check your progress.');
  }
}

document.getElementById('submit-portal').addEventListener('click', function(event) {
  event.preventDefault();

  // Check if there are unsolved or flagged questions
  const unsolvedQuestions = document.querySelectorAll('[id^="q"][id$="state"]:not(.solved)');
  const flaggedQuestions = document.querySelectorAll('[id^="q"][id$="state"].flagged');

  if (unsolvedQuestions.length > 0 || flaggedQuestions.length > 0) {
    // Show a warning message
    const popupAlertContainer = document.getElementById('popup-alert');
    const closeBtn = document.getElementById('close-btn');
    closeBtn.addEventListener('click', ()=>{
      popupAlertContainer.classList.remove('active');
    })
        popupAlertContainer.classList.add('active');
    // Add a confirm button to the popup
    const confirmButton = document.getElementById('confirm-submit');
    confirmButton.addEventListener('click', () => {
      // Proceed with submission
      submitForm();
    });
  } else {
    // Proceed with submission
    submitForm();
  }
 
  });

  let countdownElement = document.getElementById('count-down');
  let currentTime = new Date().getTime();
  let currentHour = new Date(currentTime).getUTCHours();
  let currentMinute = new Date(currentTime).getUTCMinutes();
  
  let countdownTime;
  if (currentHour >= 2 && currentHour < 3) {
    // If current time is between 2:00 and 3:00 GMT+0, set countdown time to 1 hour
    countdownTime = 60 * 60 * 1000;
  } else if (currentHour >= 3 && currentHour < 4) {
    // If current time is between 3:00 and 4:00 GMT+0, set countdown time to remaining time until 4:20
    let endTime = new Date();
    endTime.setUTCHours(4);
    endTime.setUTCMinutes(20); // Change this line from 0 to 20
    endTime.setUTCSeconds(0);
    countdownTime = endTime.getTime() - currentTime;
  } else {
    // If current time is before 2:00 or after 4:20 GMT+0, no countdown is needed
    countdownTime = 0;
  }
  
  let startTime = new Date().getTime();
  let endTime = startTime + countdownTime;
  
  function updateCountdown() {
    let currentTime = new Date().getTime();
    let timeRemaining = endTime - currentTime;
    let hours = Math.floor(timeRemaining / (60 * 60 * 1000));
    let minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
    let seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000);
  
    let countdownText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    countdownElement.textContent = countdownText;
  
    if (timeRemaining <= 0) {
      countdownEnded();
    } else {
      setTimeout(updateCountdown, 1000);
    }
  }
  
  function countdownEnded() {
    console.log('Time over!');
    countdownElement.textContent = 'Time over!';
    showPopup('Time ended');
    // submitForm();
    setTimeout( ()=> {
      // location.href = 'submitted.html';
    }, 2000);
  }
  
  document.getElementById('loading').style.display = 'flex';
  setTimeout( ()=> {
    document.getElementById('loading').style.display = 'none';
    startTime = new Date().getTime();
    endTime = startTime + countdownTime;
    updateCountdown();
  }, 10000);

// Get all flag buttons
const flagButtons = document.querySelectorAll('button[id^="flgq"]');

// Get all radio buttons
const radioButtons = document.querySelectorAll('input[type="radio"][name^="q"]');

// Get the flagged warning element
const flaggedWarning = document.getElementById('flagged-warning');
const unsolvedWarning = document.getElementById('unsolved-warning');

// Add event listener to each button
flagButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    // Get the question number from the button id
    const questionNumber = button.id.replace('flgq', '');

    // Get the corresponding question state element
    const questionState = document.getElementById(`q${questionNumber}state`);

    // Check if the question is already flagged
    if (questionState.classList.contains('flagged')) {
      // Remove the "flagged" class
      questionState.classList.remove('flagged');
      // Update the button text
      button.textContent = `Flag Question`;
      // Remove the question number from the flagged warning
      const warningText = flaggedWarning.innerHTML.replace(`<br>Question #${questionNumber}`, '');
      flaggedWarning.innerHTML = warningText;
      if (!warningText.trim()) {
        flaggedWarning.classList.remove('show');
      }
    } else {
      // Add the "flagged" class
      questionState.classList.add('flagged');
      // Update the button text
      button.textContent = `Unflag Question`;
      // Add the question number to the flagged warning
      flaggedWarning.innerHTML += `<br>Question #${questionNumber}`;
      flaggedWarning.classList.add('show');
    }
  });
});

// Add event listener to each radio button
radioButtons.forEach(radioButton => {
  radioButton.addEventListener('change', () => {
    // Get the question number from the radio button name
    const questionNumber = radioButton.name.replace('q', '');

    // Get the corresponding question state element
    const questionState = document.getElementById(`q${questionNumber}state`);

    if (!questionState) {
      console.error(`Could not find question state element for question ${questionNumber}`);
      return;
    }

    // Add the "solved" class
    questionState.classList.add('solved');

    // Remove the question number from the unsolved warning
    const warningText = unsolvedWarning.innerHTML.replace(`<br>Question #${questionNumber}`, '');
    unsolvedWarning.innerHTML = warningText;
    if (!warningText.trim()) {
      unsolvedWarning.classList.remove('show');
    }
  });
});
// Initialize unsolved warning
const questionStates = document.querySelectorAll('[id^="q"][id$="state"]');
questionStates.forEach(questionState => {
  const questionNumber = questionState.id.replace('q', '').replace('state', '');
  if (!questionState.classList.contains('solved')) {
    unsolvedWarning.innerHTML += `<br>Question #${questionNumber}`;
    unsolvedWarning.classList.add('show');
  }
});