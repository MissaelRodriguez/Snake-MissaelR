var snake;
var snakeLength;
var snakeSize;

var context;
var screenWidth;
var screenHeight;

gameInitialize();
snakeInitialize();
gameDraw();
snakeDraw();

function gameInitialize() {
    var canvas = document.getElementById("game-screen");
    context = canvas.getContext("2d");
    
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    
    canvas.width = screenWidth;
    canvas.height = screenHeight;
}

function gameLoop() {
    
}

function gameDraw() {
    context.fillStyle = "rgb(180, 250, 213)";
    context.fillRect(0, 0, screenWidth, screenHeight);
}

function snakeInitialize() {
    snake = [];
    snakeLenght = 5;
    snakeSize = 50;
    
    for(var index = 0; index < snakeLenght; index++) {
       snake.puch( {
           x: index,
           y: 0
       }); 
    }
}

function snakeDraw() {
    for(var index = 0; index < snake.lenght; index++){
        contex.fillstyle = 'white';
        conrex.fillrect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
    }
    
}

function snakeUpdate() {
    
}