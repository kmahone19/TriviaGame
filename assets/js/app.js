$("document").ready(function () {
    var questions = [{
            question: "Which of the following is considered the first lady of fighting games?",
            answer: 'Chun Li',
            choices: ['Cammy', 'Abigal', 'C.Viper', 'Chun Li', 'Makoto'],
            userAnswer: ""
        },
        {
            question: "Abigal is the leader of what Metro City Gang",
            answer: 'The Mad Gear',
            choices: ['The Shadaloo', 'The Oboro Nnja Clan', 'The World Warriors', 'The Mad Gear'],
            userAnswer: ""
        },
        {
            question: "What is the name of the power that connects Ryu to Akuma?",
            answer: 'Satsui No Hado',
            choices: ['Rinnegan', 'Satsui No Hado', 'Kaio-ken', 'Second Gear', 'Bankai'],
            userAnswer: ""
        },
        {
            question: "Cody recently took over as mayor of Metro City, who did he replace?",
            answer: 'Mayor Mike Hagger',
            choices: ['Mayor Quimby', 'Mayor Goldie Wilson', 'Mayor Mike Hagger', 'Mayor Oliver Queen', 'Mayor Jerry Gergich'],
            userAnswer: ""
        },
        {
            question: "Shotos appear in almost every fighting game, which is Street fighter's joke shoto?",
            answer: 'Dan',
            choices: ['Kairi', 'Dan', 'Paul', 'Ryo', 'Ragna'],
            userAnswer: ""
        },
        {
            question: "Which of the following is not one of the four kings?",
            answer: 'Karin Kanzuki',
            choices: ['Karin Kanzuki', 'Balrog', 'M.Bision', 'Sagat', 'Vega'],
            userAnswer: ""
        },
        {
            question: "Blanka, who is famous for his green skin and electicity power, was raised by what after his plane chrase?",
            answer: 'Electric Eels',
            choices: ['Echindas', 'Electric mice', 'Electric catfish', 'Electric ray', 'Electric Eels'],
            userAnswer: ""
        }
    ];

    $("#results").hide();
    $('#quiz-form').hide();

    // function to print all questions to page
    function renderQuestions() {
        // clear out form
        $("#quiz-form").empty();

        // Loop through questions array
        questions.forEach(function (question, index) {
            // create div to hold question
            var $question = $("<div>").addClass("form-group");

            // add question to div
            var $label = $("<h4>")
                .text(question.question)
                .appendTo($question);

            // shuffle choices
            question.choices = question.choices.sort(function () {
                return .5 - Math.random();
            });

            // create a loop to iterate through question's choices and create radio buttons for each one
            for (var i = 0; i < question.choices.length; i++) {
                // create a div for choice and add bootstrap classes
                var $choice = $('<div>');
                $choice.addClass('form-check form-check-inline');

                // create an input tag for the radio button
                var $radio = $('<input>');

                // add attributes to provide the answer choice
                // the "name" attribute is super important, all radio buttons per question need to have the same "name" so they know which question it applies to
                $radio
                    .attr({
                        type: "radio",
                        value: question.choices[i],
                        name: index,
                        class: "form-check-input"
                    })
                    .appendTo($choice);

                // create label to actually print the choice to the page
                var $choiceLabel = $('<label>');
                $choiceLabel
                    .text(question.choices[i])
                    .addClass('form-check-label')
                    .appendTo($choice);

                // add whole radio button choice to question
                $choice.appendTo($question);
            }
            // when done making all of the choices, add whole question to the page
            $("#quiz-form").append($question);
        });
    }

    // create on "change" listener for all radio buttons but bind them to quiz-form since it's permanently on the page
    $("#quiz-form").on("change", ".form-check-input", function () {
        console.log(this);

        // GET question index out of "name" attribute so we know what question you answered
        var questionIndex = $(this).attr("name");

        console.log(questions[questionIndex]);

        // get value out of radio button you selected
        var answer = $(this).val();

        // set answer to question's userAnswer property
        questions[questionIndex].userAnswer = answer;

    });

    $("#start").on("click", function () {
        $("#start").hide();
        $("#quiz-form").show()
        run();
        var time = 30;
        var intervalId;
        var right = 0;
        var wrong = 0;
        function decrement() {
            time--;
            $("#timer").text("The round ends in " + time + " seconds!");
            if (time === 0) {
                stop();
                $("#timer").hide();
                for (var i = 0; i < questions.length; i++) {
                    if (questions[i].userAnswer === questions[i].answer) {
                        right++;
                    } else{
                        wrong++;
                    }
                }
                $("#results").show();
                $('#right').text(right);
                $("#wrong").text(wrong);
            }
        }

        function run() {
            clearInterval(intervalId);
            intervalId = setInterval(decrement, 1000);
        }

        function stop() {
            clearInterval(intervalId);
        }       

    })

    renderQuestions();
})