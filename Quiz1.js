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
    blank1: "forest",
    blank2: "paris",
    blank3: "jupiter",
    blank4: "h2o",
    blank5: "photosynthesis",
    blank6: "yen",
    blank7: "george washington",
    blank8: "invaders",
    blank9: "cell",
    blank10: "nile"
};

const progressBar = document.getElementById("progress-bar");
const feedback = document.getElementById("feedback");
const submitButton = document.getElementById("submit-button");
const nextButton = document.getElementById("next-button");
let currentQuestionIndex = 0;
const totalQuestions = Object.keys(correctAnswers).length;

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < totalQuestions) {
        // Hide the next button and show the current question
        nextButton.classList.add("hidden");
        document.querySelectorAll('.question').forEach((question, index) => {
            question.style.display = index === currentQuestionIndex ? 'block' : 'none';
        });
        feedback.classList.add("hidden"); // Hide feedback
    } else {
        alert("Quiz completed!");
        // Optionally reset the quiz or show results
    }
});

submitButton.addEventListener("click", () => {
    const userAnswer = document.getElementById(`blank${currentQuestionIndex + 1}`).value.trim().toLowerCase();
    const correctAnswer = correctAnswers[`blank${currentQuestionIndex + 1}`].toLowerCase();

    if (userAnswer === correctAnswer) {
        // Move the progress bar
                // Move the progress bar
                const currentWidth = parseInt(getComputedStyle(progressBar).width);
                const containerWidth = parseInt(getComputedStyle(progressBar.parentElement).width);
                const newWidth = Math.min(currentWidth + (containerWidth / totalQuestions), containerWidth); // Move based on total questions
                progressBar.style.width = (newWidth / containerWidth * 100) + "%";
                
                feedback.classList.add("hidden"); // Hide feedback
                nextButton.classList.remove("hidden"); // Show the next button
            } else {
                feedback.classList.remove("hidden"); // Show feedback
                nextButton.classList.add("hidden"); // Hide the next button
            }
        });
        
        // Initially hide all questions except the first one
    document.querySelectorAll('.question').forEach((question, index) => {
        question.style.display = index === 0 ? 'block' : 'none';
    });