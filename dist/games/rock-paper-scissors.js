const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const damageOverlay = document.getElementById("damageOverlay");
const livesDisplayPlayer = document.getElementById("livesDisplayPlayer");
const livesDisplayComputer = document.getElementById("livesDisplayComputer");
const roundResultText = document.getElementById("roundResult");
const choicesResultText = document.getElementById("choicesResult");
const choiceButtons = document.querySelectorAll(".choiceButton");
const maxLives = 5;
const heartImage = "../../public/img/icon-heart.png";
let playerLives = maxLives;
let computerLives = maxLives;
startButton.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
});
import { renderLives } from "../utils/lives.js";
import { triggerDamageEffect } from "../utils/lives.js";
import { loseLife } from "../utils/lives.js";
const choices = ["rock", "paper", "scissors"];
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}
function getRoundResult(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "draw";
    }
    switch (playerChoice) {
        case "rock":
            return computerChoice === "scissors" ? "win" : "lose";
        case "paper":
            return computerChoice === "rock" ? "win" : "lose";
        case "scissors":
            return computerChoice === "paper" ? "win" : "lose";
    }
}
function updateLives(result) {
    switch (result) {
        case "win":
            computerLives--;
            loseLife(livesDisplayComputer);
            break;
        case "lose":
            triggerDamageEffect(damageOverlay);
            playerLives--;
            loseLife(livesDisplayPlayer);
            break;
        case "draw":
            break;
    }
    setTimeout(function () {
        renderLives(livesDisplayPlayer, playerLives, heartImage);
        renderLives(livesDisplayComputer, computerLives, heartImage);
    }, 600);
}
function renderRoundMessage(playerChoice, computerChoice, result) {
    choicesResultText.textContent = `You chose ${playerChoice}. Computer chose ${computerChoice}.`;
    switch (result) {
        case "win":
            roundResultText.textContent = "You win this round!";
            break;
        case "lose":
            roundResultText.textContent = "The Opponent wins this round!";
            break;
        case "draw":
            roundResultText.textContent = "It's a draw!";
            break;
    }
}
function checkGameOver() {
    if (playerLives > 0 && computerLives > 0) {
        return;
    }
    choiceButtons.forEach((button) => {
        button.disabled = true;
        button.classList.add("opacity-50", "cursor-not-allowed");
    });
    restartButton.classList.remove("hidden");
    if (playerLives === 0) {
        roundResultText.textContent = "Game over. The opponent wins!";
    }
    else {
        roundResultText.textContent = "You survived. You win!";
    }
}
function playRound(playerChoice) {
    if (playerLives === 0 || computerLives === 0) {
        return;
    }
    const computerChoice = getComputerChoice();
    const result = getRoundResult(playerChoice, computerChoice);
    updateLives(result);
    renderRoundMessage(playerChoice, computerChoice, result);
    checkGameOver();
}
choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const playerChoice = button.dataset.choice;
        playRound(playerChoice);
    });
});
restartButton.addEventListener("click", restartGame);
function restartGame() {
    playerLives = 5;
    computerLives = 5;
    renderLives(livesDisplayPlayer, playerLives, heartImage);
    renderLives(livesDisplayComputer, computerLives, heartImage);
    roundResultText.textContent = "";
    choicesResultText.textContent = "";
    restartButton.classList.add("hidden");
    choiceButtons.forEach((button) => {
        button.disabled = false;
        button.classList.remove("opacity-50", "cursor-not-allowed");
    });
}
renderLives(livesDisplayPlayer, playerLives, heartImage);
renderLives(livesDisplayComputer, computerLives, heartImage);
//# sourceMappingURL=rock-paper-scissors.js.map