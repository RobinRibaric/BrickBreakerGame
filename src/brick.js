import { detectCollision } from './collisionDetection.js';

export default class Brick {
    constructor(game, position) {
        this.image = document.querySelector("#img_brick");

        this.gameHeight = game.gameHeight;
        this.gameWidth = game.gameWidth;

        this.width = 80;
        this.height = 24;

        this.game = game;

        this.position = position;

        this.markedForDeletion = false;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        if (detectCollision(this.game.ball, this)) {
            this.game.ball.speed.y = -this.game.ball.speed.y;
            this.markedForDeletion = true;
        }
    }

}