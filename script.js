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
let incorrectAnswer = 0;
let interval;
let k = 5;
let questionCount = 0;
let timer;

//Start
app.init = function () {

// Pievienot skaidrojumu, kaa speeleet!!!!!!!


    //Press start button
    $(".start").on('click', function(event){
        // Prevent Default 
        event.preventDefault();
        ///////////////////////////////////////////
        // Timer
        timer = function() {
            interval = setInterval(function() {
                k--;
                if (k < 0) {
                    k = 5;
                    incorrectAnswer++;
                    questionCount++;
         ///////////////////////////
            if (questionCount == 3) {
            clearInterval(interval);
            $(".show").first().remove();
            $(".levels").append(`<h2 class="start2">Level 2</h2><button class="start2" type="submit">Start Quizz</button>`);
        }
                    $(".show").next(".hide").addClass("show");
                    $(".show").first().remove();
                    $(".mistakes").html(`<p>${incorrectAnswer}</p>`);
                };
                $(".timer").html(`<p>${k}</p>`);
            }, 800);
            // }, 1000);
        };
        /////////////////////////////////

        timer();

    
       

        // Order forms in a random order
        let formRandom = [];

        $(this).closest("header").next("main").find('form').each(function () {
            formRandom.push($(this));
        });

        for (let i = 0; i < formRandom.length; i++) {
            let randomOrderNum = Math.floor(Math.random() * formRandom.length);
            $(formRandom[i]).before(formRandom[randomOrderNum]);
        }


        //////////////////////////////////////////////////////////////////////////
        //Hide Header, show the first question, make the answers random

        let inputLabelDiv = [];

        $(this).closest("header").addClass("hide").next("main").removeClass("hide").find(".hide").first().addClass("show").find("fieldset").find('div').each(function () {
            inputLabelDiv.push($(this));
        });

        for (let i = 0; i < inputLabelDiv.length; i++) {
            let randomOrderNum = Math.floor(Math.random() * inputLabelDiv.length);
            $(inputLabelDiv[i]).before(inputLabelDiv[randomOrderNum]);
        }







        ///////////////////////////////////////////////////////////////////////

        ///////////////////////////////////////////
        // If answer is selected, show Submit button
        $("input:radio").on('click', function (event) {
            $(this).closest("div").closest("form").find("button").addClass("showSubmit");
        })


        



    });


    //////////////////
    $("main").on('click', ".start2", function (event) {
        event.preventDefault();

        console.log("st2");
        // timer();
        $(".start").trigger('click');
        $(this).closest("div").empty();
        questionCount = 0;
    });


    //Press submit button
    $("main").on('click', ".submit", function (event) {
        // Prevent default
        event.preventDefault();
        questionCount++;

        ///////////////////////////////////////////
        // Set timer
        clearInterval(interval);
        k = 5;
        $(".timer").html(`<p>5</p>`);
        timer();



        //////////////////////////////////////////////
        // Make answers random
        let inputLabelDiv = [];
        $(this).closest("fieldset").closest("form").next("form").find("fieldset").find('div').each(function () {
            inputLabelDiv.push($(this));
        });
        for (let i = 0; i < inputLabelDiv.length; i++) {
            let randomOrderNum = Math.floor(Math.random() * inputLabelDiv.length);
            $(inputLabelDiv[i]).before(inputLabelDiv[randomOrderNum]);
        }


        //Add points if the answer is correct
        if ($(this).closest("fieldset").find("input:radio[class='check']:checked").val() == "correct") {


            if (questionCount == 3) {
                $(".show").first().remove();
                clearInterval(interval);
                console.log("ri" + questionCount);

                $(".levels").append(`<h2 class="start2">Level 2</h2><button class="start2" type="submit">Start Quizz</button>`);
                // return false;
            }

        }
        else {
            // console.log("not the right answer")
            function incorect() {
                incorrectAnswer = incorrectAnswer + 1;
                $(".mistakes").html(`<p>${incorrectAnswer}</p>`);

                if (questionCount == 3) {
                    $(".show").first().remove();
                    clearInterval(interval);
                    $(".levels").append(`<h2 class="start2">Level 2</h2><button class="start2" type="submit">Start Quizz</button>`);
                    // return false;
                }


            }
            incorect();
        }
        //Show the next question
        $(this).closest("form").removeClass("show").next("form").first(".hide").addClass("show");
        $(this).closest("form").remove();


    });




    
};



//Document Ready
$(() => app.init());






