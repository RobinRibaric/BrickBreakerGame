import { detectCollision } from './collisionDetection.js';

export default class Ball {
    constructor(game) {
        this.image = document.querySelector("#img_ball");

        this.gameHeight = game.gameHeight;
        this.gameWidth = game.gameWidth;

        this.size = 16;

        this.game = game;

        this.speed = {
            x: 3,
            y: 3,
        }
        this.position = {
            x: 10,
            y: 160,
        }

        this.speed = {
            x: 3,
            y: 3,
        }

        this.reset();
    }

    reset() {
        this.position = {
            x: 10,
            y: 160,
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }

    update(deltaTime) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        //wall left or right
        if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
            this.speed.x = -this.speed.x;
        }
        //wall top or bottom
        if (this.position.y < 0) {
            this.speed.y = -this.speed.y;
        }

        if (this.position.y + this.size > this.gameHeight) {
            this.game.lives -= 1;
            this.reset();
        }

        //paddle
        if (detectCollision(this, this.game.paddle)) {
            this.speed.y = -this.speed.y;
        }
    }
}