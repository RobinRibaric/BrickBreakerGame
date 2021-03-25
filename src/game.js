import Paddle from './paddle.js';
import InputHandler from './input.js';
import Ball from './ball.js';
import { level1, level2, dummyLevel, buildLevel } from './levels.js';

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWlEVEL: 4,
}

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameHeight = gameHeight;
        this.gameWidth = gameWidth;

        this.gameState = GAMESTATE.MENU;
        this.gameObjects = [];

        this.lives = 3;

        this.paddle = new Paddle(this);
        this.ball = new Ball(this);

        this.bricks = [];

        this.levels = [level1, level2];
        this.currentLevel = 0;
        this.ballSpeedIncrease = 1;

        new InputHandler(this.paddle, this);
    }

    start() {
        if (this.gameState !== GAMESTATE.MENU && this.gameState !== GAMESTATE.NEWlEVEL) return;

        this.bricks = buildLevel(this, this.levels[this.currentLevel]);
        this.ball.reset();
        this.gameObjects = [this.ball, this.paddle];

        this.gameState = GAMESTATE.RUNNING;

    }

    draw(ctx) {
        [...this.gameObjects, ...this.bricks].forEach(obj => obj.draw(ctx));

        if (this.gameState === GAMESTATE.PAUSED) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,0.5";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
        }

        if (this.gameState === GAMESTATE.MENU) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Press SPACEBAR to start", this.gameWidth / 2, this.gameHeight / 2);
        }

        if (this.gameState === GAMESTATE.GAMEOVER) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,0.5";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAMEOVER", this.gameWidth / 2, this.gameHeight / 2);
        }
    }


    update(deltaTime) {
        if (this.gameState === GAMESTATE.PAUSED || this.gameState === GAMESTATE.MENU || this.gameState === GAMESTATE.GAMEOVER) return;

        if (this.lives === 0) this.gameState = GAMESTATE.GAMEOVER;

        [...this.gameObjects, ...this.bricks].forEach(obj => obj.update(deltaTime));

        this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);

        if (this.bricks.length === 0) {
            this.currentLevel += 1;
            this.gameState = GAMESTATE.NEWlEVEL;
            this.start();
            this.ball.speed.x += this.ballSpeedIncrease;
            this.ball.speed.y += this.ballSpeedIncrease;
        }
    }

    tooglePause() {
        if (this.gameState == GAMESTATE.PAUSED) {
            this.gameState = GAMESTATE.RUNNING;
        } else {
            this.gameState = GAMESTATE.PAUSED;
        }
    }
}