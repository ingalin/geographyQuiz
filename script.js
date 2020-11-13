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
let timeCount = 10;
let startTime = 10;
let incorrectAnswer = 0;
let questionLevelCount = 0;
let levels = 0;
const maxQuestionsPerLevel = 3;
const gameOver = 8;
let countIcons = 0;




//Function for incorrect answers
app.incorect = function () {
    app.countIncorrectAnswers();
    $(".mistakes").html(`<p>${incorrectAnswer}</p>`);
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

// If certain number of questions reached, go to the next level
app.nextLevel = function () {
    if (questionLevelCount == maxQuestionsPerLevel) {
        $(".show").first().remove();
        clearInterval(interval);
        $(".time").addClass("hide");
        // Set the limit by how much time can be reduced
        app.timeReductionLimit();
        levels++;
        // Append information about levels, mistakes, remove unnecessary information
        $(".levels").append(`<h2 class="start2">Congratulations! Level ${levels} completed!</h2><p>You have ${timeCount} seconds to answer next questions</p><button class="start2" type="submit">Next Level</button>`);
        $(".progress").empty();
        if (incorrectAnswer > 0) {
            incorrectAnswer--;
            $(".mistakes").html(`<p>${incorrectAnswer}</p>`);
            $(".bonusPoints").fadeIn().html(`<p>+1 you get one extra point for reaching a level</p>`).fadeOut(10000);
        }
        else {
            $(".mistakes").html(`<p>${incorrectAnswer}</p>`);
        }
    };
};

// Game over after incorrect answers
app.countIncorrectAnswers = function () {
    incorrectAnswer++;
    if (incorrectAnswer == gameOver) {
        clearInterval(interval);
        $("main").html(`<h3>Game Over</h3>`);
    };
}

//Function after time is used
app.timeout = function () {
    timeCount--;
    // If certain amount of time passed, go to the next question, reduce points for an incorrect answer
    if (timeCount < 0) {
        timeCount = startTime;
        // Empty icons for the next question // add new icons
        app.addFirstIcons();
        // Count incorrect answers
        app.countIncorrectAnswers();
        questionLevelCount++;
        // If certain number of questions reached, go to the next level
        app.nextLevel();
        $(".show").next(".hide").addClass("show");
        $(".show").first().remove();
        $(".mistakes").html(`<p>${incorrectAnswer}</p>`);
        countIcons=0;
    };
    //Show timer on screen
    $(".timer").html(`<p>${timeCount}</p>`);
};

//Timer function
app.timer = function () {
    interval = setInterval(function () {
        // Function if time is used and no asnwer is selected
        app.timeout();
        // Remove the last icon (only the first question) // replace other icons one by one as time goes // remove the first circle (only the first question)
        $(`.count${timeCount}`).remove();
        $(".progress").append(`<i class="far fa-2x fa-circle countCircle${countIcons}"></i>`);
        countIcons++;
        $(".countCircle0").remove();
    }, 1000);
// }, 1000);
};

// Timeout function for the first replacement icon to appear (runs only once at Level 0)
app.timerForCircle = function () {
    intervalCircle = setTimeout(function () {
        $(".progress").append(`<i class="far fa-2x fa-circle countCircle"></i>`);
    }, 1000);
}

// Add icons
app.addFirstIcons = function () {
    $(".progress").empty();
    for (let i = 0; i < timeCount; i++) {
        $(".progress").append(`<i class="fas fa-2x fa-globe-americas count${i}"></i>`);
    }
}   

//Press submit button to enter an answer
app.submitButton = function () {
    $("main").on('click', ".submit", function (event) {
        // Prevent default
        event.preventDefault();
        questionLevelCount++;
        // Restart timer
        clearInterval(interval);
        timeCount = startTime;
        $(".timer").html(`<p>${startTime}</p>`);
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

//Start2 button which appears after a level is reached
app.nextlevelButton = function () {
    $("main").on('click', ".start2", function (event) {
        // Prevent Default 
        event.preventDefault();
        //Trigger first start button to do all the same functions from the start
        // $(".mistakes").fadeIn();
        $(".start").trigger('click');
        $(this).closest("div").empty();
        questionLevelCount = 0;
        $(".time").removeClass("hide");
    });
}

// If answer is selected, show Submit button
app.inputRadioClick = function () {
    $("main").on('click', "input:radio", function (event) {
        $(this).closest("div").closest("form").find("button").addClass("showSubmit");
    });
}

app.startButton = function(){
    $(".start").on('click', function (event) {
        // Prevent Default 
        event.preventDefault();
        // Emty unnecessary fields
        $(".levels").empty();
        // Add first icons
        app.addFirstIcons();
        // Timeout function for the first replacement icon to appear
        if (questionLevelCount == 0) {
            app.timerForCircle();
        };
        // Timer
        app.timer();
        $(".timer").html(`<p>${timeCount}</p>`);
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

    //Press start button
    app.startButton();

    // Input Radio on click
    app.inputRadioClick();

    // Go to the next level button // Reset start after Level is reached
    app.nextlevelButton();

    //Submit button to enter an answer
    app.submitButton();
};



//Document Ready
$(() => app.init());