//Document Ready
//When player presses on Start Game:
//Prevent Default
//Order all questions in a random order
//Hide the header, show only the first question
//Make the answers of the first question random
//When Submit is pressed for each question:
//Prevent Default
//Make answers for the next question random
//If no answer selected, show an error message
//Count incorrect answers
//Hide current question, show the next question
//When max incorrect answer count reached, show Game Over
//If max incorrect answer count is not reached, show Winner!!



const app = {};
let interval;
let timeCount = 12;
let startTime = 12;
let incorrectAnswer = 0;
let questionLevelCount = 0;
let questionCount = 0;
let levels = 0;
const maxQuestionsPerLevel = 2;
const gameOver = 20;
const winner = 4;
let countIcons = 0;

// Game over after incorrect answers
app.countIncorrectAnswers = function () {
    incorrectAnswer++;
    if (incorrectAnswer == gameOver) {
        clearInterval(interval);
        $("main").html(`<h3>Game Over</h3><img src="styles/assets/hiclipartcom.png" alt="image of sad earth">`).addClass("levelsStyles");
    };
}

//Function for incorrect answers
app.incorect = function () {
    app.countIncorrectAnswers();
    $(".mistakes").html(`<h4>Stars left: ${gameOver - incorrectAnswer}/${gameOver}</h4>`);
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
    if (timeCount <= 4) {
        timeCount = 4;
        startTime = 4;
    }
    else {
        timeCount = timeCount - 2;
        startTime = startTime - 2;
    }
}

// Winner page
app.winnerFunction = function () {
    if (questionCount == winner) {
        $("main").empty().append(`<div class="wrapper winnerPage"><h3 class="addAnimationWinner ">Winner!!!</h3><img src="styles/assets/hiclipartcom_smily.png" alt="image of smily earth"></div>`);
    }
}

// If certain number of questions reached, go to the next level
app.nextLevel = function () {
    // Check if max number of questions is answered (check for the winner)
    app.winnerFunction();
    // Otherwise go to the next level
    if (questionLevelCount == maxQuestionsPerLevel) {
        $(".show").first().remove();
        clearInterval(interval);
        // Set the limit by how much time can be reduced
        app.timeReductionLimit();
        levels++;
        // Append information about levels, mistakes, remove unnecessary information
        $(".levels").removeClass("levelsMessage").append(`<h5><span class="congrat">Congratulations! </span><span class="levelMessage">Level ${levels} completed!</span></h5><p>You have ${timeCount} seconds to answer next questions</p><button class="start2" type="submit">Next Level</button><img class="doubleImg1" src="styles/assets/hiclipart2com(1).png" alt="image of the "><img class="doubleImg" src="styles/assets/hiclipart2com(1).png" alt="image of the earth">`);
        $(".progress").empty();
        if (incorrectAnswer > 0) {
            incorrectAnswer--;
            $(".stars").prepend(`<i class="fas fa-2x fa-star fullStar"></i>`);
            $(".emptyStar").first().remove();
            $(".mistakes").html(`<h4>Stars left: ${gameOver - incorrectAnswer}/${gameOver}</h4>`);
            // Show bonus points
            $(".bonusPoints").fadeIn().html(`<h6>+1 bonus point</h6>`).fadeOut(10000);
        }
        else {
            $(".mistakes").html(`<h4>Stars left: ${gameOver - incorrectAnswer}/${gameOver}</h4>`);
        }
        // Style the page
        $(".timer h4").remove();
        $(".time").addClass("levelsTime");
        $("main").addClass("levelsStyles");
        $(".formsDiv").addClass("levelsStyleForms");
        $(".mistakeCount").addClass("levelsMistakes");
        $(".stars").addClass("levelsStars");
    };
};

//Function after time is used
app.timeout = function () {
    timeCount--;
    // If certain amount of time passed, go to the next question, reduce points for an incorrect answer
    if (timeCount < 0) {
        questionCount++;
        console.log(questionCount);
        timeCount = startTime;
        // Empty icons for the next question // add new icons
        app.addFirstIcons();
        // Count incorrect answers
        app.countIncorrectAnswers();
        questionLevelCount++;
        // If certain number of questions reached, go to the next level
        $(".fullStar").last(".fullStar").remove();
        $(".stars").append(`<i class="far fa-2x fa-star emptyStar"></i>`);
        app.nextLevel();
        $(".show").next(".hide").addClass("show");
        $(".show").first().remove();
        $(".mistakes").html(`<h4>Stars left: ${gameOver - incorrectAnswer}/${gameOver}</h4>`);
        // $(".fullStar").last(".fullStar").remove();
        // $(".stars").append(`<i class="far fa-2x fa-star emptyStar"></i>`);
        countIcons = 0;
    };
    //Show timer on screen
    $(".timer").html(`<h4>Time left: ${timeCount}s</h4>`);
};

//Timer function
app.timer = function () {
    interval = setInterval(function () {
        // Function if time is used and no asnwer is selected
        app.timeout();
        // Remove the last icon (only the first question) // replace other icons one by one as time goes // remove the first circle (only the first question)
        $(`.count${timeCount}`).remove();
        $(".progress").append(`<i class="far fa-circle countCircle${countIcons}"></i>`);
        countIcons++;
        $(".countCircle0").remove();
    }, 1000);
    // }, 1000);
};

// Timeout function for the first replacement icon to appear (runs only once at Level 0)
app.timerForCircle = function () {
    intervalCircle = setTimeout(function () {
        $(".progress").append(`<i class="far fa-circle countCircle"></i>`);
    }, 1000);
}

// Add icons
app.addFirstIcons = function () {
    $(".progress").empty();
    for (let i = 0; i < timeCount; i++) {
        $(".progress").append(`<i class="fas fa-globe-americas count${i}"></i>`);
    }
}

//Press submit button to enter an answer
app.submitButton = function () {
    $("main").on('click', ".submit", function (event) {
        // Prevent default
        event.preventDefault();
        questionLevelCount++;
        questionCount++;
        console.log(questionCount);

        // Restart timer
        clearInterval(interval);
        timeCount = startTime;
        $(".timer").html(`<h4>Time left: ${startTime}s</h4>`);
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
        // Prevent Default 
        event.preventDefault();
        //Trigger first start button to do all the same functions from the start
        $(".start").trigger('click');
        $(this).closest("div").empty();
        questionLevelCount = 0;
        // $(".time").removeClass("hide");
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

app.startButton = function () {
    $(".start").on('click', function (event) {
        // Prevent Default 
        event.preventDefault();
        // Update field information
        $(".levels").addClass("levelsMessage");
        $(".timer").removeClass("hide");
        $(".mistakes").html(`<h4>Stars left: ${gameOver - incorrectAnswer}/${gameOver}</h4>`);
        // Add first icons
        app.addFirstIcons();
        // Timeout function for the first replacement icon to appear
        if (questionLevelCount == 0) {
            app.timerForCircle();
        };
        // Timer
        app.timer();
        $(".timer").html(`<h4>Time left: ${timeCount}s</h4>`);
        // Order all forms in a random order
        app.randomAllForms(this);
        //Hide Header, show the first question, make the answers random for the first question only
        let inputLabelDiv = [];
        $(this).closest("header").addClass("hide").next("main").removeClass("hide").find(".hide").first().addClass("show").find('div').each(function () {
            inputLabelDiv.push($(this));
        });
        app.randomOrder(inputLabelDiv);
    });
}

//Start
app.init = function () {

    // Pievienot skaidrojumu, kaa speeleet!!!!!!!
    //paarsaukt global variables uz app. 
    // https://www.momjunction.com/articles/geography-quiz-questions_00472564/
    // https://www.brightful.me/blog/geography-trivia-questions/
    // https://www.edsys.in/geography-quiz-for-kids-107-questions-answers/#1
    // https://www.funtrivia.com/en/ForChildren/Canadian-Geography-for-Kids-18561_3.html
    //Pievienot pie Game Over un Winner - play again, restart page
    //Back Forward buttons - restart??

    //Press start button
    app.startButton();

    // Input Radio on click
    app.inputRadioClick();

    // Go to the next level button // Reset start after Level is reached
    app.nextLevelButton();

    //Submit button to enter an answer
    app.submitButton();
};



//Document Ready
$(() => app.init());