var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var gStep = 5;
var speed_count = 0;
var player1 = {
    id: 1,
    height: 10,
    width: 100,
    x: canvas.width / 2,
    y: 0,
    color: "#FF0000"	// red
};
var player2 = {
    id: 2,
    height: 100,
    width: 10,
    x: 0,
    y: canvas.height / 2,
    color: "#000000"	// black
};
var player3 = {
    id: 3,
    height: 10,
    width: 100,
    x: canvas.width / 2,
    y: canvas.height - 10,
    color: "#FFA500"	// orange
};
var player4 = {
    id: 4,
    height: 100,
    width: 10,
    x: canvas.width - 10,
    y: canvas.height / 2,
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
    var angle_x = 1;
    var angle_y = 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    renderPlayer(player1);
    renderPlayer(player2);
    renderPlayer(player3);
    renderPlayer(player4);

    /*
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
    */
    /*
    if (((x > canvas.width-ballRadius) && ((y < player4.y + (player4.height)) && (y > player4.y))) ||
            ((x < ballRadius) && ((y < player2.y + (player2.height)) && (y > player2.y)))) {
        dx = -dx;
        speed_count++;
        //alert(`Keypress: The key pressed is ${speed_count} and the code value is ${speed_count / 10}`);
        dx *= ((speed_count / 500) + 1);
    }
    if (((y > canvas.height-ballRadius) && ((x < player3.x + (player3.width)) && (x > player3.x))) ||
            ((y < ballRadius) && ((x < player1.x + (player1.width)) && (x > player1.x)))) {
        dy = -dy;
        speed_count++;
        //alert(`Keypress: The key pressed is ${speed_count} and the code value is ${speed_count / 10}`);
        dy *= ((speed_count / 500) + 1);
    }
    */
    if ((x > canvas.width - ballRadius) && ((y < player4.y + (player4.height)) && (y > player4.y))) {
        dx = -dx;
        speed_count++;
        //alert(`Keypress: The key pressed is ${speed_count} and the code value is ${speed_count / 10}`);
        dx *= ((speed_count / 500) + 1);
        angle_x += (Math.abs(y - (player4.y + (player4.height / 2))) / player4.height);
    }

    if ((x < ballRadius) && ((y < player2.y + (player2.height)) && (y > player2.y))) {
        dx = -dx;
        speed_count++;
        //alert(`Keypress: The key pressed is ${speed_count} and the code value is ${speed_count / 10}`);
        dx *= ((speed_count / 500) + 1);
        angle_x += (Math.abs(y - (player2.y + (player2.height / 2))) / player2.height);
    }

    if ((y > canvas.height - ballRadius) && ((x < player3.x + (player3.width)) && (x > player3.x))) {
        dy = -dy;
        speed_count++;
        //alert(`Keypress: The key pressed is ${speed_count} and the code value is ${speed_count / 10}`);
        dy *= ((speed_count / 500) + 1);
        angle_y += (Math.abs(x - (player3.x + (player3.width / 2))) / player3.width);
    }

    if ((y < ballRadius) && ((x < player1.x + (player1.width)) && (x > player1.x))) {
        dy = -dy;
        speed_count++;
        //alert(`Keypress: The key pressed is ${speed_count} and the code value is ${speed_count / 10}`);
        dy *= ((speed_count / 500) + 1);
        angle_y += (Math.abs(x - (player1.x + (player1.width / 2))) / player1.width);
    }

    if (x < 0 || y < 0 || x > canvas.width || y > canvas.height) {
        alert(`Game Over`);
    }

    x += dx * angle_x;
    y += dy * angle_y;


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
