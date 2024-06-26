
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 1;

var started = false;

$(document).on("keypress", function () {
    if (!started) {
        started = true;
        nextSequence();
    }
});

$(".btn").on("click", function (e) {

    var userChosenColourID = e.target.id; // or this.id

    userClickedPattern.push(userChosenColourID);

    playSound(userChosenColourID);
    animatePress(userChosenColourID);

    checkAnswer(userClickedPattern.length - 1);

});

function playSound(name) {

    var sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();
    
}

function nextSequence() {

    userClickedPattern = [];

    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    
    var randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);p
    
    level++;

}


function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(recentIndex) {
    if (userClickedPattern[recentIndex] == gamePattern[recentIndex]) {

        // check whether the user has completed their sequence
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        var wrongAudio = new Audio("./sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 300)
        $("#level-title").text("Game Over, Press Any Key To Restart");
        startOver();
    }
}

function startOver() {
    gamePattern = [];
    level = 1;
    started = false;
}
    








