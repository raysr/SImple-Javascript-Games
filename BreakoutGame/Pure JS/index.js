document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
  });
  let canvas=document.getElementById("myCanvas");
  let ctx=canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;

var score = 0;
var modif=parseInt(prompt("Vitesse de la balle ? "));
var dx = modif;
var dy = -1*modif;

var ballRadius = 10;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;

var brickRowCount = 12;
var brickColumnCount = 15;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

function drawBall()
{
    ctx.beginPath();
    if((y+dy<ballRadius)) {dy=(-dy);}
    else if((y+dy>canvas.height-ballRadius)){     if(x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
    }else{  alert("CI FINI IWI");
    document.location.reload();}}
    if((x+dx<ballRadius) || x+dx>canvas.width-ballRadius) dx=(-dx);
    

    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle()
{
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status==1){
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
        }
    }
}

  function draw(){
      // drawing code
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawScore();
      drawBall();
      drawPaddle();
      collisionDetection();
      drawBricks();
      x += dx;
      y += dy;
      if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    
  }
  setInterval(draw, 10);

  function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status==1)
            {
            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                score=score+10;
                dy = -dy;
                bricks[c][r].status=0;
                if(score == brickRowCount*brickColumnCount*10) {
                    alert("TOUT LE MONDE IL A GAGNE :) ");
                    document.location.reload();
                }
            }
        }
        }
    }
}

  function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}