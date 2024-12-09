document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
            question: "I am four-legged, live in the tree, what am I?",
            options: ["Dog", "Cat", "Monkey", "Elephant"],
            correct: 2,
        },
        {
            question: "I have a long trunk and big ears, what am I?",
            options: ["Tiger", "Giraffe", "Elephant", "Lion"],
            correct: 2,
        },
        {
            question: "I am the king of the jungle, what am I?",
            options: ["Lion", "Cheetah", "Bear", "Wolf"],
            correct: 0,
        },
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options");
    const nextButton = document.getElementById("next-button");
    const scoreDisplay = document.getElementById("score");

    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        optionsContainer.innerHTML = "";

        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.textContent = option;
            button.classList.add("option");
            button.addEventListener("click", () => handleAnswer(index, button));
            optionsContainer.appendChild(button);
        });

        nextButton.disabled = true;
    }

    function handleAnswer(selectedIndex, button) {
        const currentQuestion = questions[currentQuestionIndex];
        const correctIndex = currentQuestion.correct;

        if (selectedIndex === correctIndex) {
            button.classList.add("correct");
            score++;
            scoreDisplay.textContent = score;
        } else {
            button.classList.add("wrong");
            document.querySelectorAll(".option")[correctIndex].classList.add("correct");
        }

        document.querySelectorAll(".option").forEach((option) => {
            option.disabled = true;
        });

        nextButton.disabled = false;
    }

    nextButton.addEventListener("click", () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            questionText.textContent = `Quiz completed! Your final score is ${score}/${questions.length}.`;
            optionsContainer.innerHTML = "";
            nextButton.style.display = "none";
        }
    });

    loadQuestion();
});
