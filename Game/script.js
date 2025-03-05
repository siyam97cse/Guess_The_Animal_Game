const gameContainer = document.getElementById('game-container');
const originalImage = document.getElementById('original-image');
const canvas = document.getElementById('flashlight-canvas');
const ctx = canvas.getContext('2d');
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const guessResult = document.getElementById('guess-result');
const scoreDisplay = document.getElementById('score');
const nextButton = document.getElementById('next-button');

canvas.width = gameContainer.offsetWidth;
canvas.height = gameContainer.offsetHeight;

const flashlightRadius = 50;
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;
let score = 0;
let currentPersonIndex = 0;

const people = [
    { image: 'cat.jpg', name: 'Cat' },
    { image: 'dog.jpg', name: 'Dog' },
    { image: 'tiger.jpg', name: 'Tiger' },
];

function loadPerson(index) {
    originalImage.src = people[index].image;
    guessInput.value = '';
    guessResult.textContent = '';
    drawFlashlight();
}


function drawFlashlight() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, flashlightRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
}

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    drawFlashlight();
});

guessButton.addEventListener('click', () => {
    const guess = guessInput.value.trim().toLowerCase();
    const correctAnswer = people[currentPersonIndex].name.toLowerCase();

    if (guess === correctAnswer) {
        guessResult.textContent = 'Correct!';
        guessResult.style.color = 'green';
        score++;
        scoreDisplay.textContent = score;
        guessInput.disabled = true;
        guessButton.disabled = true;
    } else {
        guessResult.textContent = 'Incorrect. Try again.';
        guessResult.style.color = 'red';
    }
});

nextButton.addEventListener('click', () => {
    currentPersonIndex = (currentPersonIndex + 1) % people.length;
    loadPerson(currentPersonIndex);
    guessInput.disabled = false;
    guessButton.disabled = false;
});

loadPerson(currentPersonIndex);

