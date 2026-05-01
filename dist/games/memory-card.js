"use strict";
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const startButton = document.getElementById("startButton");
const gameBoard = document.getElementById("gameBoard");
const movesCount = document.getElementById("movesCount");
const matchesCount = document.getElementById("matchesCount");
const restartButton = document.getElementById("restartButton");
const message = document.getElementById("message");
function startGame() {
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    restartGame();
}
const cardImages = [
    "../../public/img/card-1.png",
    "../../public/img/card-2.png",
    "../../public/img/card-3.png",
    "../../public/img/card-4.png"
];
let cards = [];
let flippedCards = [];
let moves = 0;
let matches = 0;
let state = "waiting";
function createCards() {
    const pairedImages = [...cardImages, ...cardImages];
    return pairedImages
        .map((image, index) => ({
        id: index,
        image,
        isMatched: false
    }))
        .sort(() => Math.random() - 0.5);
}
function renderCards() {
    gameBoard.innerHTML = "";
    cards.forEach((card) => {
        const cardButton = document.createElement("button");
        cardButton.className =
            "group h-52 rounded-lg [perspective:1000px] focus:outline-none focus:ring-4 focus:ring-emerald-300";
        cardButton.dataset.id = String(card.id);
        cardButton.dataset.image = card.image;
        cardButton.innerHTML = `
      <div class="relative h-full w-full rounded-lg transition-transform duration-500 [transform-style:preserve-3d] group-[.flipped]:[transform:rotateY(180deg)]">
        <div class="absolute inset-0 flex items-center justify-center rounded-lg shadow-lg [backface-visibility:hidden]">
          <img src="../img/card-back.png" alt="Memory card backside" class="h-full w-full object-cover"/>
        </div>

        <div class="absolute inset-0 overflow-hidden rounded-lg bg-white shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <img src="${card.image}" alt="Memory card image" class="h-full w-full object-cover"/>
        </div>
      </div>
    `;
        cardButton.addEventListener("click", () => handleCardClick(cardButton));
        gameBoard.appendChild(cardButton);
    });
}
function handleCardClick(cardButton) {
    switch (state) {
        case "checking":
        case "finished":
            return;
        case "waiting":
            if (cardButton.classList.contains("flipped")) {
                return;
            }
            flipCard(cardButton);
            flippedCards.push(cardButton);
            if (flippedCards.length === 2) {
                moves++;
                updateStats();
                checkForMatch();
            }
            break;
        default:
            return;
    }
}
function flipCard(cardButton) {
    cardButton.classList.add("flipped");
}
function unflipCard(cardButton) {
    cardButton.classList.remove("flipped");
}
function checkForMatch() {
    state = "checking";
    const [firstCard, secondCard] = flippedCards;
    const firstImage = firstCard.dataset.image;
    const secondImage = secondCard.dataset.image;
    switch (firstImage === secondImage) {
        case true:
            handleMatch(firstCard, secondCard);
            break;
        case false:
            handleMismatch(firstCard, secondCard);
            break;
    }
}
function handleMatch(firstCard, secondCard) {
    firstCard.disabled = true;
    secondCard.disabled = true;
    matches++;
    flippedCards = [];
    updateStats();
    switch (matches === cardImages.length) {
        case true:
            state = "finished";
            message.textContent = `Congratulations! You won in ${moves} moves!`;
            break;
        case false:
            state = "waiting";
            break;
    }
}
function handleMismatch(firstCard, secondCard) {
    setTimeout(() => {
        unflipCard(firstCard);
        unflipCard(secondCard);
        flippedCards = [];
        state = "waiting";
    }, 750);
}
function updateStats() {
    movesCount.textContent = String(moves);
    matchesCount.textContent = String(matches);
}
function restartGame() {
    cards = createCards();
    flippedCards = [];
    moves = 0;
    matches = 0;
    state = "waiting";
    updateStats();
    renderCards();
}
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);
//# sourceMappingURL=memory-card.js.map