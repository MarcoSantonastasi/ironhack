// 01
var myGameArea = {
    canvas: document.createElement("canvas"),
    // 15
    frames: 0,
    start: function () {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        // 04
        this.interval = setInterval(updateGameArea, 20);
    },
    // 05
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    // 17
    stop: function () {
        clearInterval(this.interval);
    },
    // 21
    score: function () {
        var points = Math.floor(this.frames / 5);
        this.context.font = "18px serif";
        this.context.fillStyle = "black";
        this.context.fillText("Score: " + points + " Obstacles: " + myObstacles.length, 250, 50);
    }
};
// 02
class Component {
    constructor(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        // 08 new speed properties
        this.speedX = 0;
        this.speedY = 0;
    }
    update() {
        var ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    // 09
    newPos() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    // 18
    left() { return this.x; }
    right() { return this.x + this.width; }
    top() { return this.y; }
    bottom() { return this.y + this.height; }
    crashWith(obstacle) {
        return !(
            this.bottom() < obstacle.top() ||
            this.top() > obstacle.bottom() ||
            this.right() < obstacle.left() ||
            this.left() > obstacle.right()
        );
    }
}
// 03
var player = new Component(30, 30, "red", 0, 110);
// 10
document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 38: // up arrow
            player.speedY -= 1;
            break;
        case 40: // down arrow
            player.speedY += 1;
            break;
        case 37: // left arrow
            player.speedX -= 1;
            break;
        case 39: // right arrow
            player.speedX += 1;
            break;
    }
};
// 11
document.onkeyup = function (e) {
    player.speedX = 0;
    player.speedY = 0;
};
// 14
var myObstacles = [];
// 15
function updateObstacles() {
    // 16
    for (i = 0; i < myObstacles.length; i++) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    // 16 ende  
    myGameArea.frames += 1;
    if (myGameArea.frames % 120 === 0) {
        var x = myGameArea.canvas.width;
        var minHeight = 20;
        var maxHeight = 200;
        var height = Math.floor(
            Math.random() * (maxHeight - minHeight + 1) + minHeight
        );
        var minGap = 50;
        var maxGap = 200;
        var gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        myObstacles.push(new Component(10, height, "green", x, 0));
        myObstacles.push(new Component(10, x - height - gap, "green", x, height + gap));
    }
}
// 19
function checkGameOver() {
    var crashed = myObstacles.some(function (obstacle) {
        return player.crashWith(obstacle);
    });
    if (crashed) myGameArea.stop();
}
//06
function updateGameArea() {
    myGameArea.clear();
    // 12
    player.newPos();
    player.update();
    // 13
    updateObstacles();
    // 20
    checkGameOver();
    // 22
    myGameArea.score();
}

//07
myGameArea.start();