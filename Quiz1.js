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


const correctAnswers = {
    blank1: "",
    blank2: "",
    blank3: "",
    blank4: "",
    blank5: "",
    blank6: "",
    blank7: "",
    blank8: "",
    blank9: "",
    blank10: ""
};

const progressBar = document.getElementById("progress-bar");
const feedback = document.getElementById("feedback");
const submitButton = document.getElementById("submit-button");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");
const finishButton = document.getElementById("finish-button");
const modal = document.getElementById("modal");
const finalScore = document.getElementById("final-score");
const wrongAnswersList = document.getElementById("wrong-answers-list");

let currentQuestionIndex = 0;
let correctAnswersCount = 0;
const totalQuestions = Object.keys(correctAnswers).length;

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < totalQuestions - 1) {
        currentQuestionIndex++;
        showCurrentQuestion();
        feedback.classList.add("hidden");
    } else {
        showResults();
    }
});

submitButton.addEventListener("click", () => {
    const userAnswer = document.getElementById(`blank${currentQuestionIndex + 1}`).value.trim().toLowerCase();
    const correctAnswer = correctAnswers[`blank${currentQuestionIndex + 1}`].toLowerCase();

    if (userAnswer === correctAnswer) {
        correctAnswersCount++;
        const currentWidth = parseInt(getComputedStyle(progressBar).width);
        const containerWidth = parseInt(getComputedStyle(progressBar.parentElement).width);
        const newWidth = Math.min(currentWidth + (containerWidth / totalQuestions), containerWidth);
        progressBar.style.width = (newWidth / containerWidth * 100) + "%";
        feedback.classList.add("hidden"); // Hide feedback if the answer is correct
    } else {
        feedback.classList.remove("hidden"); // Show feedback if the answer is wrong
    }

    // Make sure the Next button is always visible
    nextButton.classList.remove("hidden");
});

restartButton.addEventListener("click", () => {
    correctAnswersCount = 0;
    currentQuestionIndex = 0;
    progressBar.style.width = "0%";
    feedback.classList.add("hidden");
    nextButton.classList.add("hidden");
    modal.classList.add("hidden");

    showCurrentQuestion();
});

finishButton.addEventListener("click", () => {
    window.location.href = "Quizzes.html";
});

function showCurrentQuestion() {
    document.querySelectorAll('.question').forEach((question, index) => {
        question.style.display = index === currentQuestionIndex ? 'block' : 'none';
    });
}

function showResults() {
    finalScore.textContent = `You answered ${correctAnswersCount} out of ${totalQuestions} questions correctly.`;
    wrongAnswersList.innerHTML = '';

    for (let i = 0; i < totalQuestions; i++) {
        const questionNumber = i + 1;
        const userAnswer = document.getElementById(`blank${questionNumber}`).value.trim().toLowerCase();
        const correctAnswer = correctAnswers[`blank${questionNumber}`].toLowerCase();

        if (userAnswer !== correctAnswer) {
            const listItem = document.createElement("li");
            listItem.textContent = `Question ${questionNumber}: Your answer: "${userAnswer}" - Correct answer: "${correctAnswer}"`;
            wrongAnswersList.appendChild(listItem);
        }
    }

    // Show the modal
    modal.classList.remove("hidden");
    modal.style.display = "block"; // Ensure the modal is displayed

    // Disable further submissions after quiz ends
    submitButton.disabled = true;
    nextButton.disabled = true;
}
restartButton.addEventListener("click", () => {
    // Reset the score and question index
    correctAnswersCount = 0;
    currentQuestionIndex = 0;

    // Reset the progress bar
    progressBar.style.width = "0%";

    // Hide feedback and next button
    feedback.classList.add("hidden");
    nextButton.classList.add("hidden");

    // Hide the modal and clear its content
    modal.classList.add("hidden");
    modal.style.display = "none"; // Ensure the modal is not displayed
    finalScore.textContent = ""; // Clear the final score text
    wrongAnswersList.innerHTML = ''; // Clear the wrong answers list

    // Show the first question
    showCurrentQuestion();
});

document.addEventListener("DOMContentLoaded", () => {
    showCurrentQuestion();
});