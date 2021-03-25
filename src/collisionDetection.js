export const detectCollision = (ball, gameObject) => {
    let bottomOfBall = ball.position.y + ball.size;
    let topOfBall = ball.position.y;
    let rightSideOfBall = ball.width + ball.position.x;
    let leftSideOfBall = ball.position.x;

    let topOfObject = gameObject.position.y;
    let rightSideOfObject = gameObject.width + gameObject.position.x;
    let leftSideOfObject = gameObject.position.x;
    let bottomOfObject = gameObject.position.y + gameObject.height;



    //paddle

    if (bottomOfBall >= topOfObject && topOfBall <= bottomOfObject && (ball.position.x <= rightSideOfObject && ball.position.x >= leftSideOfObject)) {
        return true;
    } else {
        return false;
    }
}