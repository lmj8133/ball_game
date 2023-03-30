var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 4;
var dy = -4;
var last_dx = dx;
var last_dy = dy;
var step = 30;
var speed_count = 0;
var rebound = false;
var player1 = {
    id: 1,
    height: 10,
    width: canvas.width,
    x: 0,
    y: 0,
    color: "#000000"	// red
};
var player2 = {
    id: 2,
    height: canvas.height,
    width: 10,
    x: 0,
    y: 0,
    color: "#000000"	// black
};
var player3 = {
    id: 3,
    height: 10,
    width: 200,
    x: canvas.width / 3,
    y: canvas.height - 10,
    color: "#FFA500"	// orange
};
var player4 = {
    id: 4,
    height: canvas.height,
    width: 10,
    x: canvas.width - 10,
    y: 0,
    color: "#000000"	// green
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
        rebound = true;
        dx = -dx;
        speed_count++;
        //alert(`Keypress: The key pressed is ${speed_count} and the code value is ${speed_count / 10}`);
        //dx *= ((speed_count / 10) + 1);
        angle_x += (Math.abs(y - (player4.y + (player4.height / 2))) / player4.height);
        if ((y - (player4.y + (player4.height / 2))) > 0) {
            dy = -dy
        } else if ((y - (player4.y + (player4.height / 2))) == 0) {
            dy = 0;
        }
    }

    if ((x < ballRadius) && ((y < player2.y + (player2.height)) && (y > player2.y))) {
        rebound = true;
        dx = -dx;
        speed_count++;
        //alert(`Keypress: The key pressed is ${speed_count} and the code value is ${speed_count / 10}`);
        //dx *= ((speed_count / 10) + 1);
        angle_x += (Math.abs(y - (player2.y + (player2.height / 2))) / player2.height);
        if ((y - (player2.y + (player2.height / 2))) > 0) {
            dy = -dy
        } else if ((y - (player2.y + (player2.height / 2))) == 0) {
            dy = 0;
        }
    }

    if ((y > canvas.height - ballRadius) && ((x < player3.x + (player3.width)) && (x > player3.x))) {
        rebound = true;
        dy = -dy;
        speed_count++;
        //alert(`Keypress: The key pressed is ${speed_count} and the code value is ${speed_count / 10}`);
        //dy *= ((speed_count / 10) + 1);
        angle_y += (Math.abs(x - (player3.x + (player3.width / 2))) / player3.width);
        if ((x - (player3.x + (player3.height / 2))) < 0) {
            dx = -dx
        } else if ((x - (player3.x + (player3.height / 2))) == 0) {
            dx = 0;
        }
    }

    if ((y < ballRadius) && ((x < player1.x + (player1.width)) && (x > player1.x))) {
        rebound = true;
        dy = -dy;
        speed_count++;
        //alert(`Keypress: The key pressed is ${speed_count} and the code value is ${speed_count / 10}`);
        //dy *= ((speed_count / 10) + 1);
        angle_y += (Math.abs(x - (player1.x + (player1.width / 2))) / player1.width);
        if ((x - (player1.x + (player1.height / 2))) < 0) {
            dx = -dx
        } else if ((x - (player1.x + (player1.height / 2))) == 0) {
            dx = 0;
        }
    }

    if (rebound == true) {
        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (x > canvas.width) x = canvas.width;
        if (y > canvas.height) y = canvas.height;
        rebound = false;
    }

    if (x < 0 || y < 0 || x > canvas.width || y > canvas.height) {
        alert(`Game Over, {x: ${x}, y: ${y}, dx: ${dx}, dy: ${dy}}`);
        window.location.reload();
    }

    /*
    if (dx > 4 || dy > 4) {
        dx = 4;
        dy = 4;
    }
    */

    /*
    x += dx * angle_x;
    y += dy * angle_y;
    */
    x += dx;
    y += dy;

    if (dx == 0) {
        dx = last_dx;
    } else {
        last_dx = dx;
    }

    if (dy == 0) {
        dy = last_dy;
    } else {
        last_dy = dy;
    }
}

function remote(obj, key_code, left_up, right_down)
{
    // Player 1 & Player 3 move in x direction
    if (obj.id & 1) {
        if (key_code == left_up && obj.x != 0) {
            obj.x -= step;
        }
        if (key_code == right_down && obj.x != canvas.width - obj.width) {
            obj.x += step;
        }
    } else {
    // Player 2 & Player 4 move in y direction
        if (key_code == left_up && obj.y != 0) {
            obj.y -= step;
        }
        if (key_code == right_down && obj.y != canvas.height - obj.height) {
            obj.y += step;
        }
    }
}

//document.addEventListener('keypress', (event) =>
document.addEventListener('keydown', (event) =>
{
    var keyName = event.key;
    var keyCode = event.code;
    //alert(`Keypress: The key pressed is ${keyName} and the code value is ${keyCode}`);
    //alert(`Keypress: The key pressed is ${player4.y} and the code value is ${y}`);
    /*
    remote (player1, keyCode, 'KeyJ', 'KeyK');
    remote (player2, keyCode, 'Digit1', 'KeyQ');
    remote (player3, keyCode, 'KeyD', 'KeyF');
    remote (player4, keyCode, 'Equal', 'BracketLeft');
    */
    remote (player3, keyCode, 'KeyJ', 'KeyL');

}, false);

setInterval(draw, 10);
