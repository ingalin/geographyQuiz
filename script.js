//Document Ready
//Init function:
    // Activate How To Play button
        // Show information about game rules, block the back view
        // Activate Close How to Play
            // Hide How to play message, remove "block view"

    // Activate Start button
        // Prevent Default 
        // Show timer and a globe for each second
        // Start the timer
            // If time has passed and no answer selected:
                // Count it as an answered question
                // Reset time
                // Delete current globe icons
                // Run the function to add new globe icons for the next question
                // Add it to inccorrect answers
                    // Check if the max amount of incorrect answers is not reached, if it's reached, clear all text and insert "Game Over"
                        // Play Again Button
                            // Restart the page
                // Update star count (remove one, show next one, update text)
                // If certain number of questions reached, go to the next level
                    // Check if max number of questions is answered (check for the winner)
                        //If winner, clear screen, show a Winner message
                            // Play Again Button
                                // Restart the page
                    // Else show Next Level Page
                        // Stop timer
                        // Reduce time allowed for each question
                            // Force it not to be lower than 4 seconds
                        // Add one Level
                        // Append information about levels, mistakes, remove unnecessary information
                        // If incorrect answers > 0 add one bonus point, show a message, add a star
                        // Style the page
                // Go to the next question if not a new level
            // Order all forms in a random order
            // Hide Header, show the first question, make the answers random for the first question only
            // Activate Click on Radio Input
                // If answer is selected, show Submit button

    // Activate Next Level button
        // After Next Level button is clicked:
            // Trigger Start button to do all the same functions from the start
            // Style the page

    // Activate Submit button
        // Count questions and answers
        // Restart timer
        // Make answers random for the next question
        // Check if the answer is correct or no
            // Add points if the answer is correct
            // Add new timer icons
            // If certain number of questions reached, go to the next level
                // Check if max number of questions is answered (check for the winner)
                    //If winner, clear screen, show a Winner message
                        // Play Again Button
                            // Restart the page
                // Else show Next Level Page
                    // Stop timer
                    // Reduce time allowed for each question
                        // Force it not to be lower than 4 seconds
                    // Add one Level
                    // Append information about levels, mistakes, remove unnecessary information
                    // If incorrect answers > 0 add one bonus point, show a message, add a star
                    // Style the page
            // If the answer is not correct:
                // Add it to inccorrect answers
                    // Check if the max amount of incorrect answers is not reached, if it's reached, clear all text and insert "Game Over"
                        // Play Again Button
                            // Restart the page
                // Update star count (remove one, show next one, update text)
                // If certain number of questions reached, go to the next level
                    // Check if max number of questions is answered (check for the winner)
                        //If winner, clear screen, show a Winner message
                            // Play Again Button
                                // Restart the page
                    // Else show Next Level Page
                        // Stop timer
                        // Reduce time allowed for each question
                            // Force it not to be lower than 4 seconds
                        // Add one Level
                        // Append information about levels, mistakes, remove unnecessary information
                        // If incorrect answers > 0 add one bonus point, show a message, add a star
                        // Style the page
            // If not a new level, winner or game over, go to the next question



// Change maxQuestionsPerLevel, gameOver, winner, timeCount, startTime to change the rules of the game
const app = {};
const maxQuestionsPerLevel = 6;
const gameOver = 3;
const winner = 30;
app.interval;
app.timeCount = 12;
app.startTime = 12;
app.incorrectAnswer = 0;
app.questionLevelCount = 0;
app.questionCount = 0;
app.countIcons = 0;
app.levels = 0;



// Game over after incorrect answers
app.countIncorrectAnswers = function () {
    app.incorrectAnswer++;
    // If one star left, show a flashing star
    if (app.incorrectAnswer == 2) {
        $(".fullStar").addClass("lastStar");
    }
    if (app.incorrectAnswer == gameOver) {
        // Stop time
        clearInterval(app.interval);
        // Show mwssage and new game button
        $("main").html(`<h3 class="gameOver">Game Over</h3><button class="playAgain" type="submit">Play Again</button><img class="gameOverImg" src="styles/assets/hiclipartcom.png" alt="image of sad earth">`).addClass("levelsStyles");
        app.playAgain();
    };
}

//Function for incorrect answers
app.incorect = function () {
    app.countIncorrectAnswers();
    $(".mistakes").html(`<h4>Stars left: ${gameOver - app.incorrectAnswer}/${gameOver}</h4>`);
    $(".fullStar").last(".fullStar").remove();
    $(".stars").append(`<i class="far fa-2x fa-star emptyStar"></i>`);
    // Add icons for timer
    app.addFirstIcons();
    // If certain number of questions reached, go to the next level
    app.nextLevel();
}

// Sort all forms in a random order
app.randomAllForms = function (startButton) {
    let formRandom = [];
    $(startButton).closest("header").next("main").find('form').each(function () {
        formRandom.push($(this));
    });
    app.randomOrder(formRandom);
};

//Function to change order
app.randomOrder = function (itemToOrder) {
    for (let i = 0; i < itemToOrder.length; i++) {
        let randomOrderNum = Math.floor(Math.random() * itemToOrder.length);
        $(itemToOrder[i]).before(itemToOrder[randomOrderNum]);
    }
}

// Set the limit by how much time can be reduced
app.timeReductionLimit = function () {
    if (app.timeCount <= 4) {
        app.timeCount = 4;
        app.startTime = 4;
    }
    else {
        app.timeCount = app.timeCount - 2;
        app.startTime = app.startTime - 2;
    }
}

// Winner page, show message, button to play again
app.winnerFunction = function () {
    if (app.questionCount == winner) {
        $("main").empty().append(`<div class="wrapper winnerPage"><h3 class="addAnimationWinner ">Winner!!!</h3><button class="playAgain" type="submit">Play Again</button><img src="styles/assets/hiclipartcom_smily.png" alt="image of smily earth"></div>`);
        app.playAgain();
    }
}

// If certain number of questions reached, go to the next level
app.nextLevel = function () {
    // Check if max number of questions is answered (check for the winner)
    app.winnerFunction();
    // Otherwise go to the next level
    if (app.questionLevelCount == maxQuestionsPerLevel) {
        $(".show").first().remove();
        clearInterval(app.interval);
        // Set the limit by how much time can be reduced
        app.timeReductionLimit();
        app.levels++;
        // Append information about levels, mistakes, remove unnecessary information
        $(".levels").removeClass("levelsMessage").append(`<h5><span class="congrat">Congratulations! </span><span class="levelMessage">Level ${app.levels} completed!</span></h5><p>You have ${app.timeCount} seconds to answer next questions</p><button class="start2" type="submit">Next Level</button><img class="doubleImg1" src="styles/assets/hiclipart2com(1).png" alt="image of the "><img class="doubleImg" src="styles/assets/hiclipart2com(1).png" alt="image of the earth">`);
        $(".progress").empty();
        if (app.incorrectAnswer > 0) {
            app.incorrectAnswer--;
            $(".stars").prepend(`<i class="fas fa-2x fa-star fullStar"></i>`);
            $(".emptyStar").first().remove();
            $(".mistakes").html(`<h4>Stars left: ${gameOver - app.incorrectAnswer}/${gameOver}</h4>`);
            // Show bonus points
            $(".bonusPoints").html(`<h6>+1 bonus point</h6>`).fadeOut(5000);
        }
        else {
            $(".mistakes").html(`<h4>Stars left: ${gameOver - app.incorrectAnswer}/${gameOver}</h4>`);
        }
        // Style the page
        $(".timer h4").remove();
        $(".time").addClass("levelsTime");
        $("main").addClass("levelsStyles");
        $(".formsDiv").addClass("levelsStyleForms");
        $(".mistakeCount").addClass("levelsMistakes");
        $(".stars").addClass("levelsStars");
        $(".fullStar").removeClass("lastStar");
    };
};

//Function after time is used
app.timeout = function () {
    app.timeCount--;
    // Add flashing globes if time is close to the end
    if (app.timeCount == 3){
        $(".fa-globe-americas").addClass("lastSeconds");
    }
    // If certain amount of time passed, go to the next question, reduce points for an incorrect answer
    if (app.timeCount < 0) {
        app.questionCount++;
        app.timeCount = app.startTime;
        // Empty icons for the next question // add new icons
        app.addFirstIcons();
        // Count incorrect answers
        app.countIncorrectAnswers();
        app.questionLevelCount++;
        // If certain number of questions reached, go to the next level
        $(".fullStar").last(".fullStar").remove();
        $(".stars").append(`<i class="far fa-2x fa-star emptyStar"></i>`);
        app.nextLevel();
        $(".show").next(".hide").addClass("show");
        $(".show").first().remove();
        $(".mistakes").html(`<h4>Stars left: ${gameOver - app.incorrectAnswer}/${gameOver}</h4>`);
        app.countIcons = 0;
    };
    //Show timer on screen
    $(".timer").html(`<h4>Time left: ${app.timeCount}s</h4>`);
};

//Timer function
app.timer = function () {
    app.interval = setInterval(function () {
        // Function if time is used and no asnwer is selected
        app.timeout();
        // Remove the last icon (only the first question) // replace other icons one by one as time goes // remove the first circle (only the first question)
        $(`.count${app.timeCount}`).remove();
        $(".progress").append(`<i class="far fa-circle countCircle${app.countIcons}"></i>`);
        app.countIcons++;
        $(".countCircle0").remove();
    }, 1000);
};

// Timeout function for the first replacement icon to appear (runs only once at Level 0)
app.timerForCircle = function () {
    app.intervalCircle = setTimeout(function () {
        $(".progress").append(`<i class="far fa-circle countCircle"></i>`);
    }, 1000);
}

// Add icons (globes)
app.addFirstIcons = function () {
    $(".progress").empty();
    for (let i = 0; i < app.timeCount; i++) {
        $(".progress").append(`<i class="fas fa-globe-americas count${i}"></i>`);
    }
}

//Play Again button 
app.playAgain = function () {
    $("main").on('click', ".playAgain", function (event) {
        // Reload page
        location.reload();
    });
}

//Press submit button to enter an answer
app.submitButton = function () {
    $("main").on('click', ".submit", function (event) {
        // Count questions
        app.questionLevelCount++;
        app.questionCount++;
        // Restart timer
        clearInterval(app.interval);
        app.timeCount = app.startTime;
        $(".timer").html(`<h4>Time left: ${app.startTime}s</h4>`);
        app.timer();
        // Make answers random
        let inputLabelDiv = [];
        $(this).closest("fieldset").closest("form").next("form").find("fieldset").find('div').each(function () {
            inputLabelDiv.push($(this));
        });
        app.randomOrder(inputLabelDiv);
        //Add points if the answer is correct
        if ($(this).closest("fieldset").find("input:radio[class='check']:checked").val() == "correct") {
            //Add icons for the times
            app.addFirstIcons();
            // If certain number of questions reached, go to the next level
            app.nextLevel();
        }
        else {
            //Count incorrect answers, go to the next level
            app.incorect();
        }
        //Show the next question
        $(this).closest("form").removeClass("show").next("form").first(".hide").addClass("show");
        $(this).closest("form").remove();
    });
}

//Start2 button which appears after a level is reached; go to the next question:
app.nextLevelButton = function () {
    $("main").on('click', ".start2", function (event) {
        //Trigger first start button to do all the same functions from the start
        $(".start").trigger('click');
        $(this).closest("div").empty();
        app.questionLevelCount = 0;
        // Reset styles
        $(".time").removeClass("levelsTime");
        $("main").removeClass("levelsStyles");
        $(".formsDiv").removeClass("levelsStyleForms");
        $(".mistakeCount").removeClass("levelsMistakes");
        $(".stars").removeClass("levelsStars");
        $(".levels").empty();
        $(".bonusPoints").empty();
    });
}

// If answer is selected, show Submit button
app.inputRadioClick = function () {
    $("main").on('click', "input:radio", function (event) {
        $(this).closest("div").closest("form").find("button").addClass("showSubmit");
    });
}

// Close how to play window
app.closeHowToPlay = function () {
    $(".close").on("click", function () {
        $(".howToPlayDetails").removeClass("howToPlayDetailsShow");
        $(".blockView").remove();
    });
}

// Open How to Play window
app.howToPlay = function(){
    $(".howToPlayButton").on("click", function(){
        $(".howToPlayDetails").addClass("howToPlayDetailsShow");
        $("header").append(`<div class="blockView"></div>`);
        //Close How to play?
        app.closeHowToPlay();
    });
}

app.startButton = function () {
    $(".start").on('click', function (event) {
        // Prevent Default 
        event.preventDefault();
        // Update field information
        $(".levels").addClass("levelsMessage");
        $(".timer").removeClass("hide");
        $(".mistakes").html(`<h4>Stars left: ${gameOver - app.incorrectAnswer}/${gameOver}</h4>`);
        // Add first icons
        app.addFirstIcons();
        // Timeout function for the first replacement icon to appear
        if (app.questionLevelCount == 0) {
            app.timerForCircle();
        };
        // Timer
        app.timer();
        $(".timer").html(`<h4>Time left: ${app.timeCount}s</h4>`);
        // Order all forms in a random order
        app.randomAllForms(this);
        //Hide Header, show the first question, make the answers random for the first question only
        let inputLabelDiv = [];
        $(this).closest("header").addClass("hide").next("main").removeClass("hide").find(".hide").first().addClass("show").find('div').each(function () {
            inputLabelDiv.push($(this));
        });
        app.randomOrder(inputLabelDiv);
        // Show Submit button on Input Radio click
        app.inputRadioClick();
    });
}

//Start
app.init = function () {

    //How to play?
    app.howToPlay();

    //Press start button
    app.startButton();

    // Go to the next level button // Reset start after Level is reached
    app.nextLevelButton();

    //Submit button to enter an answer
    app.submitButton();
};

//Document Ready
$(() => app.init());