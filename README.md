# RevoFun

This website introduces RevoFun as a playful game company and provides three browser-based mini games that users can play directly from the website.

## About the Project

This project focuses on creating a simple interactive gaming website using HTML, Tailwind CSS, and TypeScript. The homepage introduces the RevoFun brand, displays the available games, and links users to each game page.

The website includes three games:

1. **The MindReader!**
   - A number guessing game.
   - The player must guess a secret number between 1 and 100.
   - The player has 5 lives.
   - Wrong guesses give hints such as "too low" or "too high".

2. **The Rock Paper Scissors Gladiator**
   - A rock, paper, scissors battle against the computer.
   - Both the player and computer start with 5 lives.
   - The first side to lose all lives loses the game.

3. **Remember Your Past**
   - A memory card matching game.
   - The player flips cards and tries to match all pairs.
   - The game tracks the number of moves and matches.

## Features

- Responsive homepage for the RevoFun game company
- Navigation menu with links to all game pages
- Three playable browser games
- TypeScript-based game logic
- Shared lives utility for games that use heart/life systems
- Tailwind CSS styling
- Smooth scrolling navigation
- Game restart functionality
- Visual feedback effects such as heart loss, damage flash, and screen shake

## Live URL
https://revou-fsse-feb26.github.io/milestone-2-edwardyunkian/

## Tech Stack

- HTML
- CSS
- Tailwind CSS
- TypeScript
- JavaScript
- Jest configuration is included, but tests have not been implemented yet

## Project Structure

```txt
.
├── dist
│   ├── games
│   │   ├── memory-card.js
│   │   ├── memory-card.js.map
│   │   ├── number-guessing.js
│   │   ├── number-guessing.js.map
│   │   ├── rock-paper-scissors.js
│   │   └── rock-paper-scissors.js.map
│   ├── types
│   │   ├── index.js
│   │   └── index.js.map
│   └── utils
│       ├── lives.js
│       └── lives.js.map
├── public
│   ├── css
│   │   ├── input.css
│   │   └── output.css
│   ├── games
│   │   ├── memory-card.html
│   │   ├── number-guessing.html
│   │   └── rock-paper-scissors.html
│   └── img
├── src
│   ├── games
│   │   ├── memory-card.ts
│   │   ├── number-guessing.ts
│   │   └── rock-paper-scissors.ts
│   ├── types
│   │   └── index.ts
│   └── utils
│       └── lives.ts
├── .gitignore
├── index.html
├── jest.config.js
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

## Installation

Clone this repository and install the dependencies:

```bash
git clone https://github.com/Revou-FSSE-Feb26/milestone-2-edwardyunkian.git
```

## Running The Project

Open the homepage file in a browser:
```txt
public/index.html
```
From the homepage, users can navigate to each game page

## Build Commmands

Compile TypeScript files into the dist folder:
```bash
npm run build:ts
```
Build Tailwind CSS from input.css into output.css:
```bash
npm run build:css
```
Both commands currently run in watch mode, so they will continue watching for file changes.

## Pages

- public/index.html - Homepage
- public/games/number-guessing.html - The MindReader!
- public/games/rock-paper-scissors.html - The Rock Paper Scissors Gladiator
- public/games/memory-card.html - Remember Your Past

## Future Improvements

- Add Jest unit tests for the game logic
- Add more games to the RevoFun website
- Improve mobile responsiveness
- Add score saving or high score features