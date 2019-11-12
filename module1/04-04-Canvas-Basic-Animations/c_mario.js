var img = new Image();
img.src = 'https://orig15.deviantart.net/8bed/f/2015/058/a/8/smb1_background_by_steamerthesteamtrain-d8jq7ea.png';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var backgroundImage = {
  img: img,
  x: 0,
  speed: 1,

  move: function() {
    this.x += this.speed;
    this.x %= canvas.width;
  },

  draw: function() {
    //shift image to left or right, leaving some blank space
    ctx.drawImage(this.img, this.x, 0);
    if (this.x < 0) {
      //fill the blank space on the right
      ctx.drawImage(this.img, this.x + canvas.width, 0);
    } else {
        //fill the blank space on the left
    //  ctx.drawImage(this.img, this.x - this.img.width, 0);
    }
  }
};

function updateCanvas() {
  backgroundImage.move();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  backgroundImage.draw();

  requestAnimationFrame(updateCanvas);
}

// start calling updateCanvas once the image is loaded
img.onload = updateCanvas;