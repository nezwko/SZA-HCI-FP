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


const questions = [
    { question: "The habitat of a Grizzly Bear are the ", answer: "forests" },
    { question: "The capital of France is ", answer: "Paris" },
    { question: "Water boils at __ degrees Celsius.", answer: "100" },
    { question: "The Great Wall of China is in __", answer: "China" },
    { question: "The chemical symbol for water is __", answer: "H2O" },
    { question: "The fastest land animal is the __", answer: "cheetah" },
    { question: "The largest planet in our solar system is __", answer: "Jupiter" },
    { question: "The process of converting light into energy in plants is __", answer: "photosynthesis" },
    { question: "The inventor of the light bulb was __", answer: "Edison" },
    { question: "The largest ocean on Earth is the __", answer: "Pacific" }
];

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

const progressBar = document.getElementById("progress-bar");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerInput = document.getElementById("answer-input");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const feedback = document.getElementById("feedback");

function loadQuestion() {
    questionElement.textContent = questions[currentQuestion].question;
    answerInput.value = "";
    feedback.textContent = "";
    nextBtn.classList.add("hidden");
}

function updateProgressBar() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

submitBtn.addEventListener("click", () => {
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = questions[currentQuestion].answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";
        score++;
    } else {
        feedback.textContent = "Wrong Answer!";
        feedback.style.color = "red";
        incorrectAnswers.push({
            question: questions[currentQuestion].question,
            correctAnswer: questions[currentQuestion].answer
        });
    }

    nextBtn.classList.remove("hidden");
});


// Initialize the quiz
loadQuestion();
updateProgressBar();