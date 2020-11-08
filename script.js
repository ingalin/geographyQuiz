const app = {};
let incorrectAnswer = 0;


//Start
app.init = function () {
    //Press start button
    $(".start").on('click', function(event){
        event.preventDefault();
        //Hide Header, show the first question
        // $(this).closest("header").addClass("hide").next("main").find(".hide").first(".hide").addClass("show");
        $(this).closest("header").addClass("hide").next("main").addClass("show").find(".mistakes").addClass("show").next(".hide").addClass("show");

        // $(this).closest("header").next("main").find(".mistakes").addClass("show");
    });

    //Press submit button
    $(".submit").on('click', function(event){
        event.preventDefault();
        //Get the text from the radio button
        // $('input:radio[name=population]:checked').val();

        //If nothing selected, show an error message
        if($("input:radio[class='check']").is(":checked")) {
            //Find out the checked value
            console.log($('form input[type=radio]:checked').val());
            //Add points if the answer is correct
            if($('form input[type=radio]:checked').val() == "correct") {
                console.log("yahooo")
            }
            else {
                console.log("not the right answer")
                function incorect () {
                    incorrectAnswer = incorrectAnswer + 1;
                    console.log(incorrectAnswer)
                    $(".mistakes").empty().append(`<p>${incorrectAnswer}</p>`);
                }
                incorect();
            }

            //Remove the check
            $("input:radio").attr("checked", false);
            //Show the next question
            $(this).closest("form").removeClass("show").next("form").first(".hide").addClass("show");
        }
        else {
            //Show error if fields are not selected
            $(".error").append(`<p>Error</p>`);
            console.log("empty")
        }


        // $("#myRadioID").prop("checked", false)


    });
};



//Document Ready
$(() => app.init());