var canvas = document.getElementById('example');
var ctx = canvas.getContext('2d');
// ****************************
// draw rectangle:
// ****************************

ctx.fillStyle="purple";
ctx.fillRect(260, 260, 30, 30);

 // start the path
 ctx.beginPath();
 // starting position is x=50, y=50
 ctx.moveTo(50, 50);
 // draw the line that has final coordinates x=250, y=50
 ctx.lineTo(250, 50);

 // .stroke() executes the drawing
 ctx.stroke();

 // start a new line from these coordinates: x=250, y=50
 ctx.moveTo(250, 50);
 // draw the line that has final coordinates x=250, y=100
 ctx.lineTo(250, 100);
 // .stroke() executes the drawing
 ctx.stroke();

 // close the path
 ctx.closePath();

 // ****************************
    // draw circle
    // ****************************

    ctx.beginPath();
    // ctx.arc(x, y, radius, startAngle, endAngle)
    ctx.arc(150, 170, 75, 0, Math.PI * 2);
    ctx.lineWidth = 20;
    ctx.strokeStyle = "green"; // !
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(150, 170, 35, 0, Math.PI * 2);
    ctx.fillStyle = "red"; // !
    // fills the inner circle with red color
    ctx.fill();
    ctx.closePath();

    // ****************************
    // draw text 
    // ****************************

    // color the text
    ctx.fillStyle = "orange";
    ctx.font = "30px Arial";
    // ctx.fillText("string", x, y); => x, y are coordinates where the text
    // is going to appear
    ctx.fillText("Hello there", 20, 40);