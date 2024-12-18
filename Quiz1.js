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
    { question: "The habitat of a Grizzly Bear is the", answer: "forest" },
    { question: "Lions mostly eat ", answer: "meat" },
    { question: "The fastest animal in the and is the ", answer: "cheetah" },
    { question: "The animal that is used for its wool is ", answer: "sheep" },
    { question: "The animal whose eggs are most commonly used is ", answer: "chicken" },
    { question: "The animal whose milk is most commonly consumed is ", answer: "cow" },
    { question: "The insect that has 8 legs is ", answer: "spider" },
    { question: "The animal that has black and white stripes is ", answer: "zebra" },
    { question: "The largest bird is called the ", answer: "ostrich" },
    { question: "The animal that makes honey is ", answer: "bee" }
];

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

const progressBar = document.getElementById("progress-bar");
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

// Add event listener for the Next button
nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
        updateProgressBar();
    } else {
        // Optionally, you can show results or reset the quiz here
        alert(`Quiz completed! Your score: ${score}/${questions.length}`);
        // Reset for a new quiz
        currentQuestion = 0;
        score = 0;
        incorrectAnswers = [];
        progressBar.style.width = '0%'; // Reset progress bar to 0%
        loadQuestion(); // Load the first question again
    }
});

// Initialize the quiz
loadQuestion();
progressBar.style.width = '0%'; // Ensure the progress bar starts at 0%