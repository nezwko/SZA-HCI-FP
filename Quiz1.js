// DROPDOWN
const items = document.querySelectorAll(".navbar");
const dropdowns = document.querySelectorAll('.dropdown-toggle');

function handleIndicator(el) {
    // Remove active class from all items
    items.forEach((item) => {
        item.classList.remove("active");
        item.removeAttribute("style");
    });
    
    // Add active class to the clicked item
    el.classList.add("active");
    el.style.color = el.getAttribute("active-color");
}

// Click event for normal navbar items
items.forEach((item) => {
    item.addEventListener("click", (e) => {
        // Check if the clicked item is not a dropdown toggle
        if (!item.classList.contains("dropdown-toggle")) {
            // Hide all dropdowns
            dropdowns.forEach(dropdown => {
                const dropdownContent = dropdown.nextElementSibling;
                dropdownContent.style.display = 'none';
            });
        }
        handleIndicator(e.target);
    });
    item.classList.contains("active") && handleIndicator(item);
});

// Click event for dropdown toggles
dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', function(event) {
        // Prevent the click event from bubbling up to the window
        event.stopPropagation();
        
        // Toggle the dropdown content visibility
        const dropdownContent = this.nextElementSibling; // Get the associated dropdown content
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
        
        // Handle the active state for dropdowns
        handleIndicator(this);
    });
});

// Close the dropdown if the user clicks outside of it
window.addEventListener('click', function(event) {
    dropdowns.forEach(dropdown => {
        const dropdownContent = dropdown.nextElementSibling;
        if (!dropdown.contains(event.target)) {
            dropdownContent.style.display = 'none';
        }
    });
});


let currentQuestionIndex = 0;
let score = 0;
let isAnswerCorrect = false; // Flag to track if the answer is correct
const wrongAnswerDisplay = document.getElementById("wrong-answer");
const scoreDisplay = document.getElementById("score-display");
const nextButton = document.getElementById("next-button");
const answerInput = document.getElementById("answer-input");
const carrotContainer = document.getElementById("carrot-container"); // Get the carrot container

const questions = [
    {
        question: "The habitat of a Grizzly Bear are the ",
        answer: "forests"
    },
    {
        question: "The habitat of a Grizzly Bear are the ",
        answer: "forests"
    },
    {
        question: "The habitat of a Grizzly Bear are the ",
        answer: "forests"
    },
    {
        question: "The habitat of a Grizzly Bear are the ",
        answer: "forests"
    },
    {
        question: "The habitat of a Grizzly Bear are the ",
        answer: "forests"
    },
    {
        question: "The habitat of a Grizzly Bear are the ",
        answer: "forests"
    },
    {
        question: "The habitat of a Grizzly Bear are the ",
        answer: "forests"
    },
    {
        question: "The habitat of a Grizzly Bear are the ",
        answer: "forests"
    },
    {
        question: "The habitat of a Grizzly Bear are the ",
        answer: "forests"
    },
    {
        question: "The habitat of a Grizzly Bear are the ",
        answer: "forests"
    }
    // Add more questions as needed
];

const TOTAL_QUESTIONS = 10; // Define the total number of questions to reach

function loadQuestion() {
    const questionElement = document.getElementById("question");
    questionElement.textContent = questions[currentQuestionIndex].question;
    answerInput.value = ""; // Clear previous input
    wrongAnswerDisplay.classList.add("hidden"); // Hide wrong answer message
    nextButton.classList.remove("visible"); // Hide next button initially
}

nextButton.addEventListener("click", function() {
    currentQuestionIndex++; // Move to the next question
    if (currentQuestionIndex < questions.length) {
        loadQuestion(); // Load the next question
        nextButton.classList.remove("visible"); // Hide the next button again
    } else {
        // If there are no more questions, display a completion message
        alert("You've completed all the questions! Final Score: " + score);
        nextButton.style.display = "none"; // Hide the next button
    }
});

function checkAnswer() {
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        score++; // Increment score for correct answer
        scoreDisplay.textContent = `Score: ${score}`; // Update score display
        nextButton.classList.add("visible"); // Show next button
        addCarrot(); // Add a new carrot after each correct answer

    } else {
        wrongAnswerDisplay.classList.remove("hidden"); // Show wrong answer message
        isAnswerCorrect = false; // Reset the flag if the answer is wrong
    }
}

function addCarrot() {
    const carrotImage = document.createElement("img");
    carrotImage.src = "https://static.vecteezy.com/system/resources/thumbnails/018/887/875/small_2x/cartoon-carrot-icon-png.png"; // Carrot image URL
    carrotImage.alt = "Carrot";
    carrotImage.id = "carrot"; // Assign an ID to the carrot image
    carrotContainer.appendChild(carrotImage); // Append the carrot image to the container
}

// Load the first question
loadQuestion();

// Add event listener for the answer input
answerInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        if (!isAnswerCorrect) {
            checkAnswer(); // Check answer when Enter is pressed
        } else {
            // If the answer is correct, trigger the next button click to move to the next question
            nextButton.click(); 
        }
    }
});
