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
const animalParts = [
    { part: 'cattailgame.jpg', name: 'cat' },
    { part: 'giraffeneckgame.jpg', name: 'giraffe' },
    { part: 'duckfeetgame.jpg', name: 'duck' },
    { part: 'trunkelephantgame.jpg', name: 'elephant' },
    { part: 'octopustentaclegame.jpg', name: 'octopus' }
];

let currentAnimal = {};
let level = 0;
let score = 0; // Initialize score
let wrongAnswers = []; // To track incorrect answers
const wrongAnswerDisplay = document.getElementById("wrong-answer");
const scoreDisplay = document.getElementById("score");

function loadAnimalPart() {
    if (level < animalParts.length) {
        currentAnimal = animalParts[level];
        document.getElementById('animalImage').src = currentAnimal.part;
        wrongAnswerDisplay.classList.add("hidden");
        document.getElementById('next-button').classList.remove('visible');
        createGuessBoxes(currentAnimal.name.length);
    } else {
        // Show the modal when the game is completed
        showModal();
    }
}

function createGuessBoxes(length) {
    const guessBoxes = document.getElementById('guessBoxes');
    guessBoxes.innerHTML = ''; // Clear previous boxes
    for (let i = 0; i < length; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = '1';
        input.dataset.index = i; // Store index for later use

        // Add event listener for input event
        input.addEventListener('input', function () {
            if (input.value.length === 1) { // Check if a character has been entered
                const nextInput = guessBoxes.children[i + 1];
                if (nextInput) {
                    nextInput.focus(); // Move to the next input
                }
            }
        });

        guessBoxes.appendChild(input);
    }
    // Focus the first input box
    guessBoxes.firstChild.focus();
}

// Function to handle keydown events
function handleKeyDown(event) {
    const inputs = document.querySelectorAll('#guessBoxes input');
    const currentIndex = Array.from(inputs).findIndex(input => input === document.activeElement);

    if (event.key === 'ArrowRight') {
        event.preventDefault(); // Prevent default scrolling behavior
        if (currentIndex < inputs.length - 1) {
            inputs[currentIndex + 1].focus(); // Move to the next input
        } else {
            inputs[0].focus(); // Loop back to the first input
        }
    } else if (event.key === 'ArrowLeft') {
        event.preventDefault(); // Prevent default scrolling behavior
        if (currentIndex > 0) {
            inputs[currentIndex - 1].focus(); // Move to the previous input
        } else {
            inputs[inputs.length - 1].focus(); // Loop back to the last input
        }
    } else if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default form submission
        document.getElementById('submitGuess').click(); // Trigger the submit button click
    }
};

document.getElementById('submitGuess').addEventListener('click', function () {
    const inputs = document.querySelectorAll('#guessBoxes input');
    let userGuess = '';
    inputs.forEach(input => {
        userGuess += input.value.toLowerCase();
    });

    if (userGuess === currentAnimal.name) {
        score++; // Increment score for a correct guess
        updateScoreDisplay(); // Update the score display
    } else {
        wrongAnswers.push({
            question: currentAnimal.part,
            correctAnswer: currentAnimal.name,
            userAnswer: userGuess
        });
    }

    // Allow the player to move to the next question regardless of correctness
    document.getElementById('next-button').classList.add('visible');
    document.getElementById('next-button').style.display = 'block';
});

document.getElementById('next-button').addEventListener('click', function () {
    document.getElementById('next-button').style.display = 'none';
    level++;
    loadAnimalPart();
});

// Function to show the modal
function showModal() {
    // Update the modal with the score
    document.getElementById('final-score').textContent = `Your Score: ${score} out of ${animalParts.length}`;

    const modalContent = document.getElementById('modal-content');
    const wrongAnswersList = document.createElement('ul');

    wrongAnswers.forEach(answer => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>Question:</strong> <img src="${answer.question}" alt="Animal Part" style="width: 50px; height: auto;"> 
            <strong>Your Answer:</strong> ${answer.userAnswer || 'No Answer'} 
            <strong>Correct Answer:</strong> ${answer.correctAnswer}
        `;
        wrongAnswersList.appendChild(listItem);
    });

    modalContent.appendChild(wrongAnswersList);

    document.getElementById('reset-modal').style.display = 'flex'; // Show the modal
}


// Function to restart the game
function restartQuiz() {
    level = 0; // Reset level
    score = 0; // Reset score
    wrongAnswers = []; // Clear wrong answers
    updateScoreDisplay(); // Reset the score display
    document.getElementById('reset-modal').style.display = 'none'; // Hide the modal
    loadAnimalPart(); // Reload the first animal part
}

// Function to redirect to startplay.html
function finishQuiz() {
    window.location.href = 'startplay.html'; // Redirect to startplay.html
}

// Function to update the score display
function updateScoreDisplay() {
    scoreDisplay.textContent = `Score: ${score}`;
}

// Attach event listeners for modal buttons
document.getElementById('restart-button').addEventListener('click', restartQuiz);
document.getElementById('finish-button').addEventListener('click', finishQuiz);

// Add keydown event listener to the document
document.addEventListener('keydown', handleKeyDown);

// Load the first animal part when the page loads
window.onload = loadAnimalPart;
