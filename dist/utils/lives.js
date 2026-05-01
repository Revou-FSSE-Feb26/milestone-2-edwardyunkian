export function renderLives(livesDisplay, lives, heartImage) {
    livesDisplay.innerHTML = "";
    for (let i = 0; i < lives; i++) {
        const heart = document.createElement("img");
        heart.src = heartImage;
        heart.alt = "Life";
        heart.className = "heart";
        livesDisplay.appendChild(heart);
    }
}
export function triggerDamageEffect(damageOverlay) {
    damageOverlay.classList.add("animate-damage-flash");
    document.body.classList.add("animate-shake");
    setTimeout(function () {
        damageOverlay.classList.remove("animate-damage-flash");
        document.body.classList.remove("animate-shake");
    }, 650);
}
export function loseLife(livesDisplay) {
    const hearts = livesDisplay.querySelectorAll(".heart");
    const lastHeart = hearts[hearts.length - 1];
    if (lastHeart) {
        lastHeart.classList.add("animate-heart-break");
    }
}
//# sourceMappingURL=lives.js.map