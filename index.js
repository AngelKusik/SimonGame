
//Declarations:  

//Create a new array to hold the button colors
var buttonColours = ["red", "blue", "green", "yellow"];

//Create an array to hold the game pattern
var gamePattern = [];

//Create an array to hold the user's clicked buttons pattern
var userClickedPattern = [];

//Create a flag to indicate whether the game has already started
var gameStarted = false;

//Create a variable to hold the game level
var level = 0; 


//Detect when a keyboard key has been pressed
$(document).keydown(function(){
    if(gameStarted == false){
        //Update the h1 text content to show the level
        $("#level-title").text("Level " + level)
        
        //Update game started flag to true
        gameStarted = true;

        //When a key is pressed for the first time (starting the game), call the next Sequence
        nextSequence();
    }
})


//Detect when a button is clickedg
$(".btn").on("click", function(event){
    //console.log(event.target.id) //returns the id of the button
    var userChosenColor = event.target.id //could also have done $(this).attr("id")

    //Add user chosen color to user's pattern
    userClickedPattern.push(userChosenColor);

    //Play corresponding sound
    playSound(userChosenColor)
    //console.log(userClickedPattern);

    //Animate button clicked
    animatePress(userChosenColor);

    //Call check answer function
    checkAnswer()
})

//Functions:

/**
 * playSound: Plays the sound that corresponds to the button id
 * being passed as a parameter.
 * @param {a string that represent the id of the button} name 
 */
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

/**
 * animatePress: Adds some special styles to the pressed button by adding a css class
 * and removing it after a short interval to simulate an animation
 * @param {a string representing the color of the button selected} currentColor 
 */
function animatePress(currentColor){
    //Get the button whose id matches the current color and add the pressed class
    $("." + currentColor).addClass("pressed")

    //remove the class after 100 miliseconds
    setTimeout(function(){
        $("." + currentColor).removeClass("pressed")
    }, 100);
}

/**
 * nextSequence: Selects a new random button color, highlights the new button and adds it to 
 * the game pattern, 
 */
function nextSequence(){
    //Reset user pattern for next round
    userClickedPattern = [];

    $("#level-title").text("Level " + level)

    //Generate a random number between 0 - 3
    var randomNumber = Math.round(Math.random() * 3)
    //console.log("Random Number: " + randomNumber)

    //Select a random color 
    var randomChosenColor = buttonColours[randomNumber];

    //Add the new chosen color to the game pattern
    gamePattern.push(randomChosenColor);
    //console.log("Game pattern inside next sequence: " + gamePattern)

    //Get the button whose id matches the random color chosen
    var buttonSelected = $("#" + randomChosenColor);

    //Make the element flash
    buttonSelected.fadeOut(100).fadeIn(100)

    //Play the respective sound
    playSound(randomChosenColor);

    level++;

}

/**
 * checkAnswer: Checks if user's pattern array has the same length as the game's pattern
 * (meaning user's turn is over) and if lengths match, check if user's pattern colors are the 
 * same as the game. If patterns are the same, calls the nextSequence function to continue the game
 * otherwise it calls the gameOver function to end the game.
 */
function checkAnswer(){
    //console.log("This is the current level index: " + currentLevel)
    var isGameOver = false;

    //Check if user's pattern has the same number of colors as game pattern
    if(userClickedPattern.length === gamePattern.length){
         //if so, check if the colors are the same
         for(var i = 0; i < gamePattern.length; i++){
            if(userClickedPattern[i] !== gamePattern[i]){
                isGameOver = true;
                gameOver();
            }
         }

         if(isGameOver == false){
            //If patterns match increment level and call nextSequence to continue the game

            //For testing purposes:
            //console.log("Next Sequence! Game's Pattern: " + gamePattern)
            //console.log("Next Sequence! User's Pattern: " + userClickedPattern)

            setTimeout(function(){
                nextSequence();
            }, 1000);
         }

    }else{
        //Wait for user finish clicking on the colors to check answer
        console.log("User didn't complete sequence yet")
    }
}

/**
 * gameOver: Applies a red background to the game when user 
 * gets wrong pattern and reinitialize game variables.
 */
function gameOver(){
    //For testing purposes:
    //console.log("Game Over! Game's Pattern: " + gamePattern)
    //console.log("Game Over! User's Pattern: " + userClickedPattern)

    //Reset the variables to restart the game
    level = 0;
    gamePattern = [];
    gameStarted = false;

    //Change h1 text 
    $("#level-title").text("Game Over, Press Any Key to Restart");

    //If user's answer is wrong apply red background
    $("body").addClass("game-over");

    setTimeout(function(){
        $("body").removeClass("game-over")
    }, 400)
}


