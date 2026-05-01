export function renderLives(
    livesDisplay: HTMLElement,
    lives: number, 
    heartImage: string
): void {
    livesDisplay.innerHTML = "";

  for (let i: number = 0; i < lives; i++) {
    const heart = document.createElement("img");

    heart.src = heartImage;
    heart.alt = "Life";
    heart.className = "heart";

    livesDisplay.appendChild(heart);
  }
}

export function triggerDamageEffect(damageOverlay: HTMLElement): void {
  damageOverlay.classList.add("animate-damage-flash");
  document.body.classList.add("animate-shake");

  setTimeout(function (): void {
    damageOverlay.classList.remove("animate-damage-flash");
    document.body.classList.remove("animate-shake");
  }, 650);
}

export function loseLife(livesDisplay: HTMLElement): void {
  const hearts = livesDisplay.querySelectorAll(".heart");
  const lastHeart = hearts[hearts.length - 1];

  if (lastHeart) {
    lastHeart.classList.add("animate-heart-break");
  }
}