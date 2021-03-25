import Game from "./game.js";
import { headerAnimation } from './headerAnimation.js';

let canvas = document.querySelector("#gameScreen");
let livesHeader = document.querySelector(".dashboard_lives");
let levelHeader = document.querySelector(".dashboard_level");

const updateLevel = (game) => {
    levelHeader.innerHTML = `Level: ${game.currentLevel + 1}`;
}

const updateLives = game => {
    livesHeader.innerHTML = `Lives: ${game.lives}`;
}

let ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;


let game = new Game(GAME_WIDTH, GAME_HEIGHT);



let lastTime = 0;

const gameLoop = (timestamp) => {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    game.update(deltaTime);
    game.draw(ctx);

    updateLives(game);
    updateLevel(game);

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
