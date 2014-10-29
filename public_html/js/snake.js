/*-----------------------------------------------------------------------------
 * Variables
 * ----------------------------------------------------------------------------
 */
var snake;
var snakeLength;
var snakeSize;
var snakeDirection;
var context;
var screenWidth;
var screenHeight;

var gameState;
var gameOverMenu;
var playAgainButton;
var playHUD;
var scoreboard;

/*-----------------------------------------------------------------------------
 * Function Callers- tell functions to activate.
 * ----------------------------------------------------------------------------
 */
gameInitialize();
snakeInitialize();
foodInitialize();
setInterval(gameLoop, 65);
/*-----------------------------------------------------------------------------
 * Functions- tell website what to do and can be used whenever.(these are game ones)
 * ----------------------------------------------------------------------------
 */

function gameInitialize(){
    var canvas = document.getElementById("game-screen");
    context = canvas.getContext("2d");
    
  screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    
        canvas.width = screenWidth;
    canvas.height = screenHeight;
   
   document.addEventListener("keydown", keyboardHandler);
   
   gameOverMenu = document.getElementById("gameOver");
   centerMenuPosition(gameOverMenu);
   
    playAgainButton = document.getElementById("playAgainButton");
    playAgainButton.addEventListener("click", gamePlayAgain);
   
    playHUD = document.getElementById("playHUD");
   scoreboard = document.getElementById("scoreboard");
   
   setState("PLAY");
}
/*-----------------------------------------------------------------------------
 * Function Caller that repeats the calls.
 * ----------------------------------------------------------------------------
 */

function gameLoop() {
    gameDraw();
    if(gameState == "PLAY") {
    snakeUpdate();
    snakeDraw();
    foodDraw();
       }
      drawScoreboard(); 
  }
 
/*-----------------------------------------------------------------------------
 * Continuation of game Functions
 * ----------------------------------------------------------------------------
 */
function gameDraw() {
    context.fillStyle = "black";
    context.fillRect(0, 0, screenWidth, screenHeight);
    
    
}
function gamePlayAgain() {
    snakeInitialize();
    foodInitialize();
    hideMenu(gameOverMenu);
    setState("PLAY");
}

/*-----------------------------------------------------------------------------
 * snake Functions
 * ----------------------------------------------------------------------------
 */
function snakeInitialize(){
    snake = [];
    snakeLength = 1;
    snakeSize = 15;
    snakeDirection = "down";
    foodSize = 15;
    
    for (var index = snakeLength - 1; index >= 0; index--) {
        snake.push({
            x: index,
            y: 0
        });
}
    
}



function snakeDraw(){
    for (var index = 0; index < snake.length; index++){
        context.fillStyle = "lightgreen";
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
    }
}
function snakeUpdate(){
     var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;
    
    if(snakeDirection === "down") {
        snakeHeadY++;
    }
    else if(snakeDirection === "right") {
        snakeHeadX++;
    }
    else if(snakeDirection === "left") {
        snakeHeadX--;
    }
    else if(snakeDirection === "up") {
        snakeHeadY--;
    }
    
   checkFoodCollisions(snakeHeadX, snakeHeadY);
   checkWallCollisions(snakeHeadX, snakeHeadY);
   checkSnakeCollision(snakeHeadX, snakeHeadY);
   
    var snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
     snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
    }
    /*-------------------------------------------------------------------------
     * Food Functions
     * ------------------------------------------------------------------------
     */
    function foodInitialize(){
        food = {
            x: 0,
            y: 0
        };
        setFoodPosition();                          
    }
    
    function foodDraw(){
         context.fillStyle = "firebrick";
        context.fillRect(food.x * snakeSize, food.y * snakeSize, foodSize, foodSize);
    }
    
    function setFoodPosition(){ 
        var RandomX = Math.floor(Math.random() * screenWidth);
         var RandomY = Math.floor(Math.random() * screenHeight);
        
        food.x = Math.floor(RandomX / snakeSize);
        food.y = Math.floor(RandomY / snakeSize);
    }
    
    /*-------------------------------------------------------------------------
     * Input Functions /  snake direction keys  W.A.S.D. = 68R, 65L, 87U, 83D  
     *                                   arrows keys = 38U, 37L, 40D, 39R     
     * ------------------------------------------------------------------------
     */
    
    function keyboardHandler(event) {
        console.log(event);
        
        if(event.keyCode == "39" && snakeDirection != "left") {    
            snakeDirection = "right";
        }  
        
        if(event.keyCode == "37" && snakeDirection != "right") {
            snakeDirection = "left";
        }       
        
        if(event.keyCode == "38" && snakeDirection != "down") {
            snakeDirection = "up";
        }
        
        if(event.keyCode == "40" && snakeDirection != "up") {
            snakeDirection = "down";
        }
    }
    /*-------------------------------------------------------------------------
     * Collision Handling
     * ------------------------------------------------------------------------
     */
    
    function checkFoodCollisions (snakeHeadX, snakeHeadY) {
        if(snakeHeadX === food.x && snakeHeadY === food.y){
            console.log("yumm");
            snake.push({
                x: 0,
                y: 0
            });
            snakeLength++;
            setFoodPosition();
        }
    }
    
    function checkWallCollisions (snakeHeadX, snakeHeadY) {
        if(snakeHeadX * snakeSize >= screenWidth || snakeHeadX * snakeSize < 0) {
            setState("GAME OVER");
        }
        
       if(snakeHeadY * snakeSize >= screenHeight || snakeHeadY * snakeSize < 0){
            setState("GAME OVER");
            
       }
    
    }
    function checkSnakeCollision(snakeHeadX, snakeHeadY) {
        for(var index = 1; index < snake.length; index++){
           if(snakeHeadX === snake[index].x && snakeHeadY === snake[index].y){
               setState("GAME OVER");
               return;
           } 
        }
    }
    
    
    function setState(state){
        gameState = state;
        showMenu(state);
    }
   
    /*-------------------------------------------------------------------------
     * Menu Functiions
     * ------------------------------------------------------------------------
     */
   
   function displayMenu(menu){
       menu.style.visibility = "visible";
   }
   
   function hideMenu(menu){
       menu.style.visibility = "hidden";
   }
   
   function showMenu(state) {
       if(state == "GAME OVER") {
           displayMenu(gameOverMenu)
       }
       else if(state == "PLAY") {
          displayMenu(playHUD); 
       }
   }
   
   function centerMenuPosition(menu) {
       menu.style.top = (screenHeight / 2) - (menu.offsetHeight / 2) + "px";
       menu.style.left = (screenWidth / 2) - (menu.offsetWidth / 2) + "px";
   }
   
   function drawScoreboard() {
       scoreboard.innerHTML = "Score: " + snakeLength;
   }