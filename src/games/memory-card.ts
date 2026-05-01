type Card = {
  id: number;
  image: string;
  isMatched: boolean;
};

type GameState = "waiting" | "checking" | "finished";

const startScreen = document.getElementById("startScreen") as HTMLElement;
const gameScreen = document.getElementById("gameScreen") as HTMLElement;
const startButton = document.getElementById("startButton") as HTMLButtonElement;
const gameBoard = document.getElementById("gameBoard") as HTMLElement;
const movesCount = document.getElementById("movesCount") as HTMLElement;
const matchesCount = document.getElementById("matchesCount") as HTMLElement;
const restartButton = document.getElementById("restartButton") as HTMLButtonElement;
const message = document.getElementById("message") as HTMLElement;

function startGame(): void {
  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  restartGame();
}

const cardImages: string[] = [
  "../../public/img/card-1.png",
  "../../public/img/card-2.png",
  "../../public/img/card-3.png",
  "../../public/img/card-4.png"
];

let cards: Card[] = [];
let flippedCards: HTMLButtonElement[] = [];
let moves = 0;
let matches = 0;
let state: GameState = "waiting";

function createCards(): Card[] {
  const pairedImages = [...cardImages, ...cardImages];

  return pairedImages
    .map((image, index) => ({
      id: index,
      image,
      isMatched: false
    }))
    .sort(() => Math.random() - 0.5);
}

function renderCards(): void {
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

function handleCardClick(cardButton: HTMLButtonElement): void {
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

function flipCard(cardButton: HTMLButtonElement): void {
  cardButton.classList.add("flipped");
}

function unflipCard(cardButton: HTMLButtonElement): void {
  cardButton.classList.remove("flipped");
}

function checkForMatch(): void {
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

function handleMatch(firstCard: HTMLButtonElement, secondCard: HTMLButtonElement): void {
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

function handleMismatch(firstCard: HTMLButtonElement, secondCard: HTMLButtonElement): void {
  setTimeout(() => {
    unflipCard(firstCard);
    unflipCard(secondCard);

    flippedCards = [];
    state = "waiting";
  }, 750);
}

function updateStats(): void {
  movesCount.textContent = String(moves);
  matchesCount.textContent = String(matches);
}

function restartGame(): void {
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