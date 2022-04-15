//empty array to store user click patter
var userClickedPattern = [];
//empty array to add random chosen colour, later
var gamePattern = [];

//array of 4 colours
var buttonColours = ["red", "blue", "green", "yellow"];

//var to detect if game has gameStarted
var gameStarted = false;

//store level which increases each time next sequence is  called
var level = 0;

//function
function nextSequence() {
  //reset userClickedPattern to empty array ready for next Level
  userClickedPattern = [];

  //increase level
  level++;
  //update heading to reflect Level
  $("#level-title").text("Level " + level);

  //generate random number between 1-3
  var randomNumber = Math.floor(Math.random() * 4);
  //var to select a random colour from the colour array
  var randomChosenColour = buttonColours[randomNumber];
  //add random chosen colour to the game gamePattern
  gamePattern.push(randomChosenColour);

  //use jQuery to select the button with the same id as the randomChosenColour
  //and animate it
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //play corresponding sound
  playSound(randomChosenColour);
}


//detect when keyboard has been pressed to initiate game
$(document).keypress(function() {
  //if game hasn't started, call nextSequence
  if (!gameStarted) {
    //change heading to reflect level 0
    $("#level-title").text("Level 0");
    //call game sequence
    nextSequence();
    //set boolean to true because game has started
    gameStarted = true;
  }
});

//detect when any of the buttons are clicked and trigger handler function
$(".btn").click(function() {
  //store id of clicked button
  var userChosenColour = $(this).attr("id");
  //add userChosenColour to array of userClickedPattern
  userClickedPattern.push(userChosenColour);
  //play corresponding sound
  playSound(userChosenColour);

  //call animate function
  animatePress(userChosenColour);

  //call checkAnswer passing in index of last checkAnswer??
  checkAnswer(userClickedPattern.length-1);
});

//function to play corresponding sound to game sequence and user click
function playSound(name) {
  //store and play corresponding audio file
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//function to animate user clicks
function animatePress(currentColour) {
  //get current button clicked and add animate class
  $("#" + currentColour).addClass("pressed");
  //remove animate pressed class after 100miliseconds
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


//function to check user pattern against game pattern
function checkAnswer(currentLevel) {
  //check if user pattern is equal to game gamePattern??
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
        //call nextSequence after 1000milisecons
        setTimeout(function () {
          nextSequence();
        }, 1000);
    }
  }
  else {
    console.log("wrong");
    //play wrong sound id user fails
    playSound("wrong");

    //apply css to display game-over look
    $("body").addClass("game-over");
    //remove game over css after 200 100miliseconds
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    //set h1 to game-over
    $("#level-title").text("Game Over, Press Any Key to Restart");

    //call restart function
    startOver();
  }
}


//function to restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
