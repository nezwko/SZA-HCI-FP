const questions = [
  { question: "The habitat of a Grizzly Bear is the", answer: "forest" },
  { question: "The habitat of a Grizzly Bear is the", answer: "forest" },
  { question: "The habitat of a Grizzly Bear is the", answer: "forest" },
  { question: "The habitat of a Grizzly Bear is the", answer: "forest" },
  { question: "The habitat of a Grizzly Bear is the", answer: "forest" },
  { question: "The habitat of a Grizzly Bear is the", answer: "forest" },
  { question: "The habitat of a Grizzly Bear is the", answer: "forest" },
  { question: "The habitat of a Grizzly Bear is the", answer: "forest" },
  { question: "The habitat of a Grizzly Bear is the", answer: "forest" },
  { question: "The habitat of a Grizzly Bear is the", answer: "forest" }
];

let currentQuestionIndex = 0;
const totalQuestions = questions.length;
const animal = document.getElementById('animal');
const message1 = document.getElementById('wrong-message');
const message2 = document.getElementById('correct-message');
const questionElement = document.getElementById('question');
const popup = document.getElementById('popup');
const closePopupButton = document.getElementById('close-popup');

// Function to display the current question
function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
}

// Function to clear messages
function clearMessages() {
  message1.innerText = '';
  message2.innerText = '';
}

// Event listener for the submit button
document.getElementById('submit').addEventListener('click', function() {
  const answer = document.querySelector('.blank').innerText.trim().toLowerCase();
  const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();
  
  clearMessages(); // Clear previous messages

  if (answer === correctAnswer) {
      // Move the animal to the right
      let currentLeft = parseInt(window.getComputedStyle(animal).left);
      animal.style.left = (currentLeft + 50) + 'px'; // Move 50px to the right
      message2.innerText = 'Correct!';
      
      // Clear the message after 2 seconds
      setTimeout(clearMessages, 2000);
      
      // Move to the next question
      currentQuestionIndex++;
      
      // Check if there are more questions
      if (currentQuestionIndex < totalQuestions) {
          displayQuestion(); // Display the next question
      } else {
          // Show the popup when all questions are answered
          popup.style.display = 'block';
      }
  } else {
      message1.innerText = 'Wrong Answer! Try again.';
      
      // Clear the message after 2 seconds
      setTimeout(clearMessages, 2000);
  }
});

// Event listener for closing the popup
closePopupButton.addEventListener('click', function() {
  popup.style.display = 'none'; // Hide the popup
});

// Initialize the first question
displayQuestion();