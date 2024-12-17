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
    {
        question: "This animal is known for its long neck. What is it?",
        options: ["Elephant", "Giraffe", "Lion", "Tiger"],
        answer: 1 // Index of the correct answer
    },
    {
        question: "This animal is known for its ability to fly. What is it?",
        options: ["Fish", "Bird", "Frog", "Lizard"],
        answer: 1
    },
    // Add more questions as needed
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const nextButton = document.getElementById("next-button");
    const scoreDisplay = document.getElementById("score-display");

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';

    nextButton.classList.remove("visible");

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.addEventListener("click", () => checkAnswer(index));
        optionsElement.appendChild(button);
    });

    scoreDisplay.textContent = `Points: ${score}`;
}

function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const options = document.querySelectorAll(".option");

    if (selectedIndex === currentQuestion.answer) {
        options[selectedIndex].classList.add("correct");
        score++;
    } else {
        options[selectedIndex].classList.add("wrong");
        options[currentQuestion.answer].classList.add("correct");
    }

    const scoreDisplay = document.getElementById("score-display");
    scoreDisplay.textContent = `Points: ${score}`; // Update score display

    const nextButton = document.getElementById("next-button");
    nextButton.classList.add("visible");

    options.forEach(option => option.disabled = true); // Disable all options
}

document.getElementById("next-button").addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion(); // Load the next question
    } else {
        // Display the reset modal with the score when all questions are answered
        document.getElementById("final-score").textContent = score;
        document.getElementById("total-questions").textContent = questions.length;
        document.getElementById("reset-modal").style.display = "flex"; // Show the modal
    }
});

// Restart the quiz when the "Restart" button is clicked
document.getElementById("restart-button").addEventListener("click", () => {
    currentQuestionIndex = 0; // Reset to the first question
    score = 0; // Reset score
    loadQuestion(); // Load the first question
    document.getElementById("reset-modal").style.display = "none"; // Hide the modal
});

// Close the modal when the "Cancel" button is clicked
document.getElementById("cancel-button").addEventListener("click", () => {
    document.getElementById("reset-modal").style.display = "none"; // Hide the modal
});

// Load the first question
loadQuestion();