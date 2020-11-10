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
const maxQuestionsPerLevel = 5;
const gameOver = 3;


// Game over after incorrect answers
app.countIncorrectAnswers = function (){
    incorrectAnswer++;
    if (incorrectAnswer == gameOver) {
        clearInterval(interval);
        $("main").html(`<h3>Game Over</h3>`);
    };
}

//Function for incorrect answers
app.incorect = function () {
    app.countIncorrectAnswers();
    $(".mistakes").html(`<p>${incorrectAnswer}</p>`);
    // If certain number of questions reached, go to the next level
    app.nextLevel();
}

//Function to change order
app.randomOrder = function (itemToOrder) {
    for (let i = 0; i < itemToOrder.length; i++) {
        let randomOrderNum = Math.floor(Math.random() * itemToOrder.length);
        $(itemToOrder[i]).before(itemToOrder[randomOrderNum]);
    }
}

// If certain number of questions reached, go to the next level
app.nextLevel = function () {
    if (questionLevelCount == maxQuestionsPerLevel) {
        $(".show").first().remove();
        clearInterval(interval);
        timeCount = timeCount - 2;
        startTime = startTime - 2;
        levels++;
        $(".levels").append(`<h2 class="start2">Congratulations! Level ${levels} completed!</h2><p>You have ${timeCount} seconds to answer next questions</p><button class="start2" type="submit">Next Level</button>`);
        if (incorrectAnswer > 0) {
            incorrectAnswer--;
            $(".mistakes").fadeIn("slow").html(`<p>${incorrectAnswer} you get one extra point for reaching a level</p>`);
        }
        else {
            $(".mistakes").html(`<p>${incorrectAnswer}</p>`);
        }
    };
};

//Function after time is used
app.timeout = function () {
    timeCount--;
    // If certain amount of time passed, go to the next question, reduce points for an incorrect answer
    if (timeCount < 0) {
        timeCount = startTime;
        // Count incorrect answers
        app.countIncorrectAnswers();
        questionLevelCount++;
        // If certain number of questions reached, go to the next level
        app.nextLevel();
        $(".show").next(".hide").addClass("show");
        $(".show").first().remove();
        $(".mistakes").html(`<p>${incorrectAnswer}</p>`);
    };
    //Show timer on screen
    $(".timer").html(`<p>${timeCount}</p>`);
};

//Timer function
app.timer = function () {
    interval = setInterval(function () {
        app.timeout();
    }, 1000);
// }, 1000);
};

//Start
app.init = function () {

// Pievienot skaidrojumu, kaa speeleet!!!!!!!
//paarsaukt global variables uz app. 


    //Press start button
    $(".start").on('click', function(event){
        // Prevent Default 
        event.preventDefault();
        $(".levels").empty();

        // Timer
        app.timer();
        $(".timer").html(`<p>${timeCount}</p>`);

        // Order forms in a random order
        let formRandom = [];
        $(this).closest("header").next("main").find('form').each(function () {
            formRandom.push($(this));
        });
        app.randomOrder(formRandom);

        //Hide Header, show the first question, make the answers random
        let inputLabelDiv = [];
        $(this).closest("header").addClass("hide").next("main").removeClass("hide").find(".hide").first().addClass("show").find('div').each (function () {
            inputLabelDiv.push($(this));
        });
        app.randomOrder(inputLabelDiv);
    });



    // If answer is selected, show Submit button
    $("main").on('click', "input:radio", function (event) {
        $(this).closest("div").closest("form").find("button").addClass("showSubmit");
    });


    //Start2 button which appears after a level is reached
    $("main").on('click', ".start2", function (event) {
        // Prevent Default 
        event.preventDefault();

        //Trigger first start button to do all the same functions from the start
        $(".start").trigger('click');
        $(this).closest("div").empty();
        questionLevelCount = 0;

    });


    //Press submit button to enter an answer
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


    
};



//Document Ready
$(() => app.init());