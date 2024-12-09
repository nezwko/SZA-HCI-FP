document.addEventListener("DOMContentLoaded", () => {
    const animals = [
        { image: "elephant.jpg", name: "Elephant" },
        { image: "tiger.jpg", name: "Tiger" },
        { image: "giraffe.jpg", name: "Giraffe" },
        { image: "lion.jpg", name: "Lion" },
    ];

    let currentAnimalIndex = 0;

    const animalImage = document.getElementById("animal-image");
    const guessInput = document.getElementById("guess");
    const submitButton = document.getElementById("submit-button");
    const feedback = document.getElementById("feedback");
    const nextButton = document.getElementById("next-button");

    function loadAnimal() {
        const currentAnimal = animals[currentAnimalIndex];
        animalImage.src = `images/${currentAnimal.image}`;
        animalImage.alt = `Part of ${currentAnimal.name}`;
        guessInput.value = "";
        feedback.textContent = "";
        nextButton.disabled = true;
    }

    function checkAnswer() {
        const currentAnimal = animals[currentAnimalIndex];
        const userGuess = guessInput.value.trim().toLowerCase();
        if (userGuess === currentAnimal.name.toLowerCase()) {
            feedback.textContent = "Correct! You guessed it!";
            feedback.style.color = "green";
            nextButton.disabled = false;
        } else {
            feedback.textContent = "Wrong! Try again.";
            feedback.style.color = "red";
        }
    }

    function nextAnimal() {
        currentAnimalIndex++;
        if (currentAnimalIndex < animals.length) {
            loadAnimal();
        } else {
            feedback.textContent = "Congratulations! You've completed the game.";
            animalImage.style.display = "none";
            guessInput.style.display = "none";
            submitButton.style.display = "none";
            nextButton.style.display = "none";
        }
    }

    submitButton.addEventListener("click", checkAnswer);
    nextButton.addEventListener("click", nextAnimal);

    loadAnimal();
});
