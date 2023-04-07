// Get the canvas element
const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

// Set up the game board
const boardWidth = 400;
const boardHeight = 400;

// Set up the paddles
const paddleWidth = 10;
const paddleHeight = 50;
const paddleSpeed = 5;
let player1PaddleY = boardHeight / 2 - paddleHeight / 2;
let player2PaddleY = boardHeight / 2 - paddleHeight / 2;

// Set up the pucks
const puckRadius = 10;
const puckSpeed = 5;
let puckX = boardWidth / 2;
let puckY = boardHeight / 2;
let puckDx = puckSpeed;
let puckDy = puckSpeed;

// Set up the player scores
let player1Score = 0;
let player2Score = 0;

var keyCode;

// Draw the game board, paddles, and puck
function draw()
{
    // Clear the canvas
    context.clearRect(0, 0, boardWidth, boardHeight);

    // Draw the game board
    context.beginPath();
    context.rect(0, 0, boardWidth, boardHeight);
    context.fillStyle = "#ffffff";
    context.fill();
    context.closePath();

    // Draw the paddles
    context.beginPath();
    context.rect(0, player1PaddleY, paddleWidth, paddleHeight);
    context.fillStyle = "#000000";
    context.fill();
    context.closePath();

    context.beginPath();
    context.rect(boardWidth - paddleWidth, player2PaddleY, paddleWidth, paddleHeight);
    context.fillStyle = "#000000";
    context.fill();
    context.closePath();

    // Draw the puck
    context.beginPath();
    context.arc(puckX, puckY, puckRadius, 0, Math.PI * 2);
    context.fillStyle = "#000000";
    context.fill();
    context.closePath();

    // Draw the player scores
    context.font = "30px Arial";
    context.fillStyle = "#000000";
    context.fillText(player1Score, 100, 50);
    context.fillText(player2Score, boardWidth - 100, 50);
}

document.addEventListener('keyup', (event) =>
{
    //keyCode = event.code;
    if (event.code == 'KeyQ') {
        keyCode &= ~0x1;
    }

    if (event.code == 'KeyA') {
        keyCode &= ~(0x1 << 1);
    }

    if (event.code == 'KeyK') {
        keyCode &= ~(0x1 << 2);
    }

    if (event.code == 'KeyJ') {
        keyCode &= ~(0x1 << 3);
    }
},)

document.addEventListener('keydown', (event) =>
{
    //keyCode = event.code;
    if (event.code == 'KeyQ') {
        keyCode |= 0x1;
    }

    if (event.code == 'KeyA') {
        keyCode |= (0x1 << 1);
    }

    if (event.code == 'KeyK') {
        keyCode |= (0x1 << 2);
    }

    if (event.code == 'KeyJ') {
        keyCode |= (0x1 << 3);
    }

    if (event.code == 'KeyM') {
        alert(`pause`);
    }
},)

// Move the paddles based on user input
function movePaddles()
{
    if (keyCode & 0x1) {
        // Move player 1 paddle up
        if (player1PaddleY > 0) {
            player1PaddleY -= paddleSpeed;
        }
    }
    if (keyCode & (0x1 << 1)) {
        // Move player 1 paddle down
        if (player1PaddleY < boardHeight - paddleHeight) {
            player1PaddleY += paddleSpeed;
        }
    }
    if (keyCode & (0x1 << 2)) {
        // Move player 2 paddle up
        if (player2PaddleY > 0) {
            player2PaddleY -= paddleSpeed;
        }
    }
    if (keyCode & (0x1 << 3)) {
        // Move player 2 paddle down
        if (player2PaddleY < boardHeight - paddleHeight) {
            player2PaddleY += paddleSpeed;
        }
    }
}

// Move the puck
function movePuck()
{
    puckX += puckDx;
    puckY += puckDy;
}

// Detect collisions between the puck and the walls or paddles
function detectCollisions()
{
    // Check for collisions with top and bottom walls
    if (puckY < puckRadius || puckY > boardHeight - puckRadius) {
        puckDy = -puckDy;
    }

    // Check for collisions with paddles
    if (puckX < paddleWidth && puckY > player1PaddleY && puckY < player1PaddleY + paddleHeight) {
        puckDx = -puckDx;
    } else if (puckX > boardWidth - paddleWidth && puckY > player2PaddleY && puckY < player2PaddleY + paddleHeight) {
        puckDx = -puckDx;
    }

    // Check for goals
    if (puckX < puckRadius) {
        // Player 2 scored
        player2Score++;
        resetPuck();
    } else if (puckX > boardWidth - puckRadius) {
        // Player 1 scored
        player1Score++;
        resetPuck();
    }
}

// Reset the puck to the center of the board
function resetPuck()
{
    puckX = boardWidth / 2;
    puckY = boardHeight / 2;
    puckDx = puckSpeed;
    puckDy = puckSpeed;
}

// Update the game state and redraw the game
function update()
{
    movePaddles();
    movePuck();
    detectCollisions();
    draw();
}

// Set up the game loop
setInterval(update, 20);

