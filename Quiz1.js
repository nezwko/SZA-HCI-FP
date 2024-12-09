// DROPDOWN

const indicator = document.querySelector(".nav-indicator");
const items = document.querySelectorAll(".navbar");
const dropdowns = document.querySelectorAll('.dropdown-toggle');



function handleIndicator(el) {
    // Remove active class from all items
    items.forEach((item) => {
        item.classList.remove("active");
        item.removeAttribute("style");
    });

    // Set the width and position of the indicator
    indicator.style.width = `${el.offsetWidth}px`;
    indicator.style.left = `${el.getBoundingClientRect().left - document.querySelector('.top-navbar').getBoundingClientRect().left}px`; // Adjust for navbar padding
    indicator.style.backgroundColor = el.getAttribute("active-color");

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
let score = 0; // Initialize score
const animal = document.getElementById("animal");
const wrongAnswerDisplay = document.getElementById("wrong-answer");
const scoreDisplay = document.getElementById("score-display");
const nextButton = document.getElementById("next-button");
const answerInput = document.getElementById("answer-input");

const questions = [
    {
        question: "The habitat of a Grizzly Bear are the ",
        answer: "forests"
    },
    {
        question: "The diet of a Panda Bear consists mainly of ",
        answer: "bamboo"
    },
    {
        question: "The fastest land animal is the ",
        answer: "cheetah"
    }
    // Add more questions as needed
];

function loadQuestion() {
    const questionElement = document.getElementById("question");
    questionElement.textContent = questions[currentQuestionIndex].question;
    answerInput.value = ""; // Clear previous input
    wrongAnswerDisplay.classList.add("hidden"); // Hide wrong answer message
    nextButton.classList.remove("visible"); // Hide next button initially
}

function checkAnswer() {
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        score++; // Increment score for correct answer
        scoreDisplay.textContent = `Score: ${score}`; // Update score display
        moveAnimal(); // Move the animal
        nextButton.classList.add("visible"); // Show next button
    } else {
        wrongAnswerDisplay.classList.remove("hidden"); // Show wrong answer message
    }
}

function moveAnimal() {
    const distance = (currentQuestionIndex + 1) * 100; // Move 100px for each question
    animal.style.left = `${distance}px`; // Move the animal
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        alert(`Quiz completed! Your score: ${score} out of ${questions.length}`);
        // Optionally reset the quiz or show results
        currentQuestionIndex = 0; // Reset to the first question
        score = 0; // Reset score
        scoreDisplay.textContent = `Score: ${score}`; // Reset score display
        loadQuestion(); // Load the first question again
        animal.style.left = `0px`; // Reset animal position
    }
});

// Load the first question
loadQuestion();

// Add event listener for the answer input
answerInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkAnswer(); // Check answer when Enter is pressed
    }
});