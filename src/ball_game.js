var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var gStep = 5;
var player1 = {
    id: 1,
    height: 10,
    width: 100,
    x: 100,
    y: 0,
filled:
    false,
color: "#FF0000"	// red
};
var player2 = {
    id: 2,
    height: 100,
    width: 10,
    x: 0,
    y: 100,
filled:
    false,
color: "#000000"	// black
};
var player3 = {
    id: 3,
    height: 10,
    width: 100,
    x: 100,
    y: 290,
filled:
    false,
color: "#FFA500"	// orange
};
var player4 = {
    id: 4,
    height: 100,
    width: 10,
    x: 290,
    y: 100,
filled:
    false,
color: "#008000"	// green
};

function renderPlayer(object)
{
    ctx.fillStyle = object.color;
    ctx.fillRect(object.x, object.y, object.width, object.height);
    ctx.strokeRect(object.x, object.y, object.width, object.height);
}

function drawBall()
{
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    renderPlayer(player1);
    renderPlayer(player2);
    renderPlayer(player3);
    renderPlayer(player4);


    //if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    //dx = -dx;
    //}
    //if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
    //dy = -dy;
    //}
    if (((x + dx > canvas.width-ballRadius) && ((y < player4.y + (player4.height)) && (y > player4.y))) ||
            ((x + dx < ballRadius) && ((y < player2.y + (player2.height)) && (y > player2.y)))) {
        dx = -dx;
    }
    if (((y + dy > canvas.height-ballRadius) && ((x < player3.x + (player3.width)) && (x > player3.x))) ||
            ((y + dy < ballRadius) && ((x < player1.x + (player1.width)) && (x > player1.x)))) {
        dy = -dy;
    }


    x += dx;
    y += dy;

    //if (x < 0 || y < 0 || x > canvas.width || y > canvas.height) {
    //alert(`Game Over`);
    //}
}

function remote(obj, key_code, left_up, right_down)
{
    var step = gStep;
    // Player 1 & Player 3 move in x direction
    if (obj.id & 1) {
        if (key_code == left_up) {
            if (obj.x == 0) {
                step = 0;
            }
            obj.x -= step;
        }
        if (key_code == right_down) {
            if (obj.x == canvas.width - obj.width) {
                step = 0;
            }
            obj.x += step;
        }
    } else {
        // Player 2 & Player 4 move in y direction
        if (key_code == left_up) {
            if (obj.y == 0) {
                step = 0;
            }
            obj.y -= step;
        }
        if (key_code == right_down) {
            if (obj.y == canvas.height - obj.height) {
                step = 0;
            }
            obj.y += step;
        }
    }
}

document.addEventListener('keypress', (event) =>
{
    var keyName = event.key;
    var keyCode = event.code;
    //alert(`Keypress: The key pressed is ${keyName} and the code value is ${keyCode}`);
    //alert(`Keypress: The key pressed is ${player4.y} and the code value is ${y}`);
    remote (player1, keyCode, 'KeyJ', 'KeyK');
    remote (player2, keyCode, 'Digit1', 'KeyQ');
    remote (player3, keyCode, 'KeyD', 'KeyF');
    remote (player4, keyCode, 'Equal', 'BracketLeft');

}, false);

setInterval(draw, 10);
