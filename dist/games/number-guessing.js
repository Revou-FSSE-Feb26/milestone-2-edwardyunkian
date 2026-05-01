const guessedNumber = document.getElementById("guessedNumber");
const guessButton = document.getElementById("guessButton");
const restartButton = document.getElementById("restartButton");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const livesDisplay = document.getElementById("livesDisplay");
const damageOverlay = document.getElementById("damageOverlay");
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const startButton = document.getElementById("startButton");
const maxLives = 5;
const heartImage = "../../public/img/icon-heart.png";
let secretNumber = generateSecretNumber();
let attempts = 0;
let lives = maxLives;
let gameOver = false;
startButton.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
});
function generateSecretNumber() {
    return Math.floor(Math.random() * 100) + 1;
}
import { renderLives } from "../utils/lives.js";
import { triggerDamageEffect } from "../utils/lives.js";
import { loseLife } from "../utils/lives.js";
function checkGuess() {
    if (gameOver) {
        message.textContent = "The game is over. Press Restart to play again.";
        return;
    }
    const guess = Number(guessedNumber.value);
    if (!guess || guess < 1 || guess > 100) {
        message.textContent = "Please enter a number between 1 and 100.";
        return;
    }
    attempts++;
    attemptsDisplay.textContent = String(attempts);
    if (guess === secretNumber) {
        message.textContent = `Correct! The number was ${secretNumber}. You survived!`;
        gameOver = true;
    }
    else {
        triggerDamageEffect(damageOverlay);
        lives--;
        loseLife(livesDisplay);
        setTimeout(() => {
            renderLives(livesDisplay, lives, heartImage);
        }, 600);
        if (lives === 0) {
            message.textContent = `Game over! The number was ${secretNumber}.`;
            gameOver = true;
        }
        else if (guess < secretNumber) {
            message.textContent = `Too low. You have ${lives} lives left.`;
        }
        else {
            message.textContent = `Too high. You have ${lives} lives left.`;
        }
    }
    guessedNumber.value = "";
    guessedNumber.focus();
}
function restartGame() {
    secretNumber = generateSecretNumber();
    attempts = 0;
    lives = maxLives;
    gameOver = false;
    attemptsDisplay.textContent = String(attempts);
    message.textContent = "Make your first guess.";
    guessedNumber.value = "";
    guessedNumber.focus();
    renderLives(livesDisplay, lives, heartImage);
}
guessButton.addEventListener("click", checkGuess);
restartButton.addEventListener("click", restartGame);
guessedNumber.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});
renderLives(livesDisplay, lives, heartImage);
//# sourceMappingURL=number-guessing.js.map