class CanvasGame {
    constructor(width, height) {
        //general game setup
        this.canvas = document.createElement("canvas"),
            this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
    clearCanvas() { this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); }
    stopGame() { clearInterval(this.interval); }
}

class AvoidWallsGame extends CanvasGame {
    constructor(width, height) {
        super(width, height);
        this.updateGameState = this.updateGameState.bind(this);
        this.checkGameOver = this.checkGameOver.bind(this);
        this.interval = setInterval(this.updateGameState, 20);
        this.frames = 0;
        //game objects
        this.gameObjects = [];
        this.player = new MovingRectangle(this.context, 30, 30, "red", 0, 110);
        this.gameObjects.push(this.player);
        //game events
        document.onkeydown = (e) => {
            console.log(e.keyCode);
            switch (e.keyCode) {
                case 38: // up arrow
                    this.player.speedY -= 1;
                    break;
                case 40: // down arrow
                    this.player.speedY += 1;
                    break;
                case 37: // left arrow
                    this.player.speedX -= 1;
                    break;
                case 39: // right arrow
                    this.player.speedX += 1;
                    break;
            }
        };
        document.onkeyup = (e) => {
            this.player.speedX = 0;
            this.player.speedY = 0;
        };
    }
    updateGameState() {
        this.frames += 1;
        this.clearCanvas();
        if (this.frames % 120 === 0) this.createObstacle();
        this.gameObjects.forEach((gameObject) => gameObject.update())
        this.checkGameOver();
        this.score();
    }
    createObstacle() {
        let x = this.canvas.width;
        let minHeight = 20;
        let maxHeight = 200;
        let height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight );
        let minGap = 50;
        let maxGap = 200;
        let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        this.gameObjects.push(new Obstacle(this.context, height, 0));
        this.gameObjects.push(new Obstacle(this.context, this.canvas.height - height - gap, height + gap));
    }
    score() {
        let points = Math.floor(this.frames / 5);
        this.context.font = "18px serif";
        this.context.fillStyle = "black";
        this.context.fillText("Score: " + points + " Obstacles: " + this.gameObjects.length, 250, 50);
    }
    checkGameOver() {
        let crashed = this.gameObjects.some((obstacle) => {
            return this.player.isCollidedWith(obstacle);
        });
        if (crashed) this.stop();
    }
    stop() { clearInterval(this.interval); }
}
class MovingRectangle {
    constructor(context, width, height, color, x, y) {
        console.log("new MR:", width, height, color, x, y);
        this.context = context;
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
    }
    update() {
        console.log("update Rect");
        this.newPos();
        let ctx = this.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    newPos() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    left() { return this.x; }
    right() { return this.x + this.width; }
    top() { return this.y; }
    bottom() { return this.y + this.height; }
    isCollidedWith(obstacle) {
        //since the player is also a gameObject we have to make sure that it doesn't "collide" with itself
        if (this === obstacle) return false;
        return !(
            this.bottom() < obstacle.top() ||
            this.top() > obstacle.bottom() ||
            this.right() < obstacle.left() ||
            this.left() > obstacle.right()
        );
    }
}
class Obstacle extends MovingRectangle {
    constructor(context, height, y) {
        super(context, 10, height, "green", context.canvas.width, y);
        this.speedX = -1;
        this.speedY = 0;
    }
}

let game = new AvoidWallsGame(480, 270);
