

export default class InputHandler {
    constructor(paddle, game) {
        document.addEventListener('keydown', (e) => {
            //alert(e.keyCode);
            switch (e.keyCode) {
                case 37:
                    paddle.moveLeft();
                    break;
                case 39:
                    paddle.moveRight();
                    break;
                case 27:
                    game.tooglePause();
                    break;
                case 32:
                    game.start();
                    break;
            }
        });

        document.addEventListener('keyup', (e) => {

            switch (e.keyCode) {
                case 37:
                    if (paddle.speed < 0) {
                        paddle.stop();
                    }
                    break;
                case 39:
                    if (paddle.speed > 0) {
                        paddle.stop();
                    }
                    break;
            }
        });
    }

}