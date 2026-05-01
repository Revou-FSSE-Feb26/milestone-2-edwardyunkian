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
// Randomly selects rock, paper, or scissors for the computer by generating random index number for the choice.
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}
// Compares the player's choice with the computer's choice and returns whether the player wins, loses, or draws.
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
// Updates player or computer lives based on the round result and triggers visual feedback when a life is lost.
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
// Displays both choices and the result message for the current round.
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
// Checks whether either side has no lives left, then disables the buttons and displays the final winner message.
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
// Runs one full round: gets the computer choice, decides the result, updates lives, displays messages, and checks if the game is over.
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
// Restores both players' lives, clears messages, and enables the choice buttons again.
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