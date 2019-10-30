var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = 'white';
ctx.font = '18px serif';

class Ghost {
    constructor(context) {
        this.x = 25;
        this.y = 25;
        this.ctx = context;
    }
    moveUp() { this.y -= 25; }
    moveDown() { this.y += 25; }
    moveLeft() { this.x -= 25; }
    moveRight() { this.x += 25; }
    //exercise
    reset(){ this.x=25;this.y=25;}
    draw() {
        this.ctx;
        let img = new Image();
        img.onload = () => { this.ctx.drawImage(img, this.x, this.y, 50, 50); }
        img.src = "https://media.giphy.com/media/Qr8JE9Hvi7ave/200.gif";
    }
}

let ghost = new Ghost(ctx);

document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 38: ghost.moveUp(); console.log('up', ghost); break;
        case 40: ghost.moveDown(); console.log('down', ghost); break;
        case 37: ghost.moveLeft(); console.log('left', ghost); break;
        case 39: ghost.moveRight(); console.log('right', ghost); break;
        //exercise
        case 32: ghost.reset();console.log('right', ghost);break;

        default: console.log(e.keyCode);
    }
    updateCanvas();
}

function updateCanvas() {
    ctx.clearRect(0, 0, 480, 270);
    ctx.fillText("Ghost_x: " + ghost.x, 380, 40);
    ctx.fillText("Ghost_y: " + ghost.y, 380, 60);
    ghost.draw();
}
updateCanvas();