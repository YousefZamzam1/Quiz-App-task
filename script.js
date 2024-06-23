document.addEventListener('DOMContentLoaded', (event) => {
    const startqButton = document.getElementById('start-q-button');
    if (startqButton) {
        startqButton.addEventListener('click', () => {
            localStorage.removeItem('qScore'); // Clear the score when starting the q
            window.location.href = 'q1.html';
        });
    }

    const submitButton = document.getElementById('submit-button');
    if (submitButton) {
        submitButton.addEventListener('click', () => {
            checkAnswer();
            const currentPage = window.location.pathname.split('/').pop();
            const nextPage = getNextPage(currentPage);
            if (nextPage) {
                window.location.href = nextPage;
            } else {
                window.location.href = 'result.html';
            }
        });
    }

    if (window.location.pathname.includes('result.html')) {
        displayScore();
    }
});

function getNextPage(currentPage) {
    const pageMap = {
        'q1.html': 'q2.html',
        'q2.html': 'q3.html',
        'q3.html': 'q4.html',
        'q4.html': 'q5.html',
        'q5.html': 'result.html'
    };
    return pageMap[currentPage];
}

function checkAnswer() {
    const currentPage = window.location.pathname.split('/').pop();
    const questionMap = {
        'q1.html': { question: 'question1', correctAnswer: 'Paris' },
        'q2.html': { question: 'question2', correctAnswer: 'Cairo' },
        'q3.html': { question: 'question3', correctAnswer: 'Riyadh' },
        'q4.html': { question: 'question4', correctAnswer: 'Berlin' },
        'q5.html': { question: 'question5', correctAnswer: 'Rome' }
    };

    const currentQuestion = questionMap[currentPage];
    if (currentQuestion) {
        const selectedAnswer = document.querySelector(`input[name="${currentQuestion.question}"]:checked`);
        if (selectedAnswer) {
            const isCorrect = selectedAnswer.value === currentQuestion.correctAnswer;
            let score = localStorage.getItem('qScore') || 0;
            score = parseInt(score) + (isCorrect ? 1 : 0);
            localStorage.setItem('qScore', score);
        }
    }
}

function displayScore() {
    const score = localStorage.getItem('qScore') || 0;
    const percentage = (score / 5) * 100; // Calculate the percentage
    const formattedPercentage = percentage.toFixed(2); // Format the percentage to two decimal places
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `${formattedPercentage}%`; // Display the formatted percentage

    // Create a div to hold the buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex'; // Use flexbox
    buttonContainer.style.justifyContent = 'space-between'; // Space the buttons apart

    if (percentage < 50) {
        const reqButton = document.createElement('button');
        reqButton.textContent = 'Restart The Quiz';
        reqButton.addEventListener('click', () => {
            localStorage.removeItem('qScore'); // Clear the score
            window.location.href = 'q1.html'; // Restart the q
        });
        buttonContainer.appendChild(reqButton); // Add the button to the container
    } else {
        // Add button to review correct answers
        const reviewButton = document.createElement('button');
        reviewButton.textContent = 'Review Answers';
        reviewButton.addEventListener('click', () => {
            window.location.href = 'answers.html';
        });
        buttonContainer.appendChild(reviewButton); // Add the button to the container
    }

    // Add the container with the buttons after the score
    scoreElement.insertAdjacentElement('afterend', buttonContainer);

    // Add a line break
    const lineBreak = document.createElement('br');
    scoreElement.insertAdjacentElement('afterend', lineBreak);
}


function displayAnswers() {
    const answers = {
        'Question 1': 'Paris',
        'Question 2': 'Cairo',
        'Question 3': 'Riyadh',
        'Question 4': 'Berlin',
        'Question 5': 'Rome'
    };

    const answersList = document.getElementById('answers-list');
    for (const question in answers) {
        const answerItem = document.createElement('li');
        answerItem.textContent = `${question}, Answer: ${answers[question]}`;
        answersList.appendChild(answerItem);
    }

    // Add button to redirect to start page
    const startButton = document.createElement('button');
    startButton.textContent = 'Go to start';
    startButton.addEventListener('click', () => {
        localStorage.removeItem('qScore'); // Clear the score
        window.location.href = 'start.html'; // Redirect to start page
    });
    answersList.insertAdjacentElement('afterend', startButton); // Add the button after the answers
}

// Call the displayAnswers function when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    displayAnswers();
});