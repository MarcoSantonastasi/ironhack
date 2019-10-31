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

class AvoidWallsGames extends CanvasGame {
    constructor(width, heigth) {
        super(width, heigth);
        this.updateGameState = this.updateGameState.bind(this);
        this.checkGameOver = this.checkGameOver.bind(this);
        this.interval = setInterval(this.updateGameState, 20);
        this.frames = 0;
        //game objects
        this.player = new MovingRectangle(this.context, 30, 30, "red", 0, 110);
        this.obstacles = [];
        //game events
        document.onkeydown = (e)=> {
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
    updateGameState(){
        this.clearCanvas();
        this.player.newPos();
        this.player.update();
        this.updateObstacles();
        this.checkGameOver();
        this.score();

    }
    updateObstacles() {
        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].x += -1;
            this.obstacles[i].update();
        }
        this.frames += 1;
        if (this.frames % 120 === 0) {
            var x = this.canvas.width;
            var minHeight = 20;
            var maxHeight = 200;
            var height = Math.floor(
                Math.random() * (maxHeight - minHeight + 1) + minHeight
            );
            var minGap = 50;
            var maxGap = 200;
            var gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
            this.obstacles.push(new MovingRectangle(this.context,10, height, "green", x, 0));
            this.obstacles.push(new MovingRectangle(this.context,10, x - height - gap, "green", x, height + gap));
        }
    }
    score(){
        var points = Math.floor(this.frames / 5);
        this.context.font = "18px serif";
        this.context.fillStyle = "black";
        this.context.fillText("Score: " + points + " Obstacles: " + this.obstacles.length, 250, 50);
    }
    checkGameOver() {    
        var crashed = this.obstacles.some((obstacle) => {
            return this.player.isCollidedWith(obstacle);
        });
        if (crashed) this.stop();
    }
    stop() {
        clearInterval(this.interval);
    }
}

class MovingRectangle {
    constructor(context, width, height, color, x, y) {
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
        this.newPos();
        var ctx = this.context;
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
        return !(
            this.bottom() < obstacle.top() ||
            this.top() > obstacle.bottom() ||
            this.right() < obstacle.left() ||
            this.left() > obstacle.right()
        );
    }
}

let game = new AvoidWallsGames(480,270);
