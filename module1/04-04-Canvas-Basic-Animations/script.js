var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

/*
ctx.fillStyle = "#FF0000";
ctx.fillRect(0,0,150,150);
var color = {
  red:   Math.floor(Math.random()*255),
  green: Math.floor(Math.random()*255),
  blue:  Math.floor(Math.random()*255),
  rgb: function() {
    return "rgb(" + this.red + "," + this.green + "," + this.blue + ")"
  }
}

function updateCanvas(){
  //  color.red   = (color.red+1) % 255
  color.blue  = (color.blue+1) % 255
  // color.green = (color.green+1) % 255

  ctx.clearRect(0,0,480,270);
  ctx.fillStyle = color.rgb();
  ctx.fillRect(0,0,150,150);
  window.requestAnimationFrame(updateCanvas);
}

window.requestAnimationFrame(updateCanvas);
*/

ctx.fillStyle = "#FF0000";
var y1 = 0;
var y2 = 0;
var y3 = 0;
var dy3 = 3;

function clearCanvas() {
  ctx.clearRect(0,0,480,270);
}

function updateCanvas(){
  y1 += 1;
  y2 += 2;
  y3 += dy3;

  if (y3>270)dy3=-3;
  if (y3<0) dy3=3;
  clearCanvas();
  ctx.fillRect( 50,y1,50,50);
  ctx.fillRect(150,y2,50,50);
  ctx.fillRect(250,y3,50,50);  window.requestAnimationFrame(updateCanvas);
}

window.requestAnimationFrame(updateCanvas);
