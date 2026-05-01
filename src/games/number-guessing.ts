const guessedNumber = document.getElementById("guessedNumber") as HTMLInputElement;
const guessButton = document.getElementById("guessButton") as HTMLButtonElement;
const restartButton = document.getElementById("restartButton") as HTMLButtonElement;
const message = document.getElementById("message") as HTMLElement;
const attemptsDisplay = document.getElementById("attempts") as HTMLElement;
const livesDisplay = document.getElementById("livesDisplay") as HTMLElement;
const damageOverlay = document.getElementById("damageOverlay") as HTMLElement;
const startScreen = document.getElementById("startScreen") as HTMLElement;
const gameScreen = document.getElementById("gameScreen") as HTMLElement;
const startButton = document.getElementById("startButton") as HTMLButtonElement;

const maxLives: number = 5;
const heartImage: string = "../../public/img/icon-heart.png";

let secretNumber: number = generateSecretNumber();
let attempts: number = 0;
let lives: number = maxLives;
let gameOver: boolean = false;

startButton.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
});

function generateSecretNumber(): number {
  return Math.floor(Math.random() * 100) + 1;
}

import {renderLives} from "../utils/lives.js";
import {triggerDamageEffect} from "../utils/lives.js"
import {loseLife} from "../utils/lives.js"; 

function checkGuess(): void {
  if (gameOver) {
    message.textContent = "The game is over. Press Restart to play again.";
    return;
  }

  const guess: number = Number(guessedNumber.value);

  if (!guess || guess < 1 || guess > 100) {
    message.textContent = "Please enter a number between 1 and 100.";
    return;
  }

  attempts++;
  attemptsDisplay.textContent = String(attempts);

  if (guess === secretNumber) {
    message.textContent = `Correct! The number was ${secretNumber}. You survived!`;
    gameOver = true;
  } else {
    triggerDamageEffect(damageOverlay);
    lives--
    loseLife(livesDisplay);
    setTimeout(() => {
      renderLives(livesDisplay, lives, heartImage);
    }, 600);
    if (lives === 0) {
      message.textContent = `Game over! The number was ${secretNumber}.`;
      gameOver = true;
    } else if (guess < secretNumber) {
    message.textContent = `Too low. You have ${lives} lives left.`;
    } else {
    message.textContent = `Too high. You have ${lives} lives left.`;
    }
  }

  guessedNumber.value = "";
  guessedNumber.focus();
}

function restartGame(): void {
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

guessedNumber.addEventListener("keydown", function (event: KeyboardEvent): void {
  if (event.key === "Enter") {
    checkGuess();
  }
});

renderLives(livesDisplay, lives, heartImage);