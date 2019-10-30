var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
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