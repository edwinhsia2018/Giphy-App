$(document).ready(function() {

    //variables
    var questionsArr = ["What does every minion wear on their head?", "How many fingers do minions have?", "What language do minions speak?", "What's a minion's favorite fruit?", "Why are evil minions purple?", "What character helped to inspire minions?", "What chemical turns a minion evil?"];
    var answersArr = [["Bandanas","Goggles","Hats","Wigs"], ["One","Two","Three","Four"], ["English", "Minionish", "JavaScript","Minionese"], ["Durian","Apples","Bananas","Tomatoes"],["Opposite color spectrum","Color of royalty","Just looks evil and cool","Producer and designer spilled grape juice"],["Smurfs", "Lemmings", "Pokemon", "Jawas"], ["Mutagen PX-41", "Mutagen P-90X","Mutagen T25", "Mutagen Insanity"]];
    var rightAns = ["Goggles","Three", "Minionese", "Bananas", "Opposite Color Spectrum", "Oompa Loompas","Mutagen PX-41"];
    var correctAns = 0;
    var wrongAns = 0;
    var skippedQuestions = 0;
    var questionId = 0;

    //timers
    var timer = {
        time: 16,
        reset: function () {
            this.time = 15;
            $("#show-time").html("Time Remaining: " + this.time);
        },
        start: function () {
            counter = setInterval(timer.count, 1000);
        },
        stop: function () {
            clearInterval(counter);
        },
        count: function (){
            timer.time--;
            $("#show-time").html("Time Remaining: " + timer.time);
            if (timer.time <= 0) {
                skippedQuestions++;
                nextQuestion ();
        }
        }
    }

    $("#game-start").html("Click to Start!");

    //Start Game
    $("#game-start").on("click", function(){
        $("#trivia-question").text(questionsArr[questionId]);
        $("#answer1").html(answersArr[questionId][0]);
        $("#answer2").html(answersArr[questionId][1]);
        $("#answer3").html(answersArr[questionId][2]);
        $("#answer4").html(answersArr[questionId][3]);
        timer.start();
        $(document).on("click", ".btnanswer", function() {
            var userAnswer = $(this).text().trim();
            if (userAnswer == rightAns[questionId]) {
                correctAns++;
                nextQuestion();
            }
            else {
                wrongAns++;
                nextQuestion();
            }
            });
        $("#game-start").html("");
    })

    //countdown function that goes to the next problem
    function nextQuestion () {
        if (questionId < questionsArr.length) {
            questionId++;
            timer.reset ();
            $("#trivia-question").text(questionsArr[questionId]);
            $("#answer1").html(answersArr[questionId][0]);
            $("#answer2").html(answersArr[questionId][1]);
            $("#answer3").html(answersArr[questionId][2]);
            $("#answer4").html(answersArr[questionId][3]);
            $(document).on("click", ".btnanswer", function() {
                var userAnswer = $(this).text().trim();
                if (userAnswer == rightAns[questionId]) {
                    correctAns++;
                    nextQuestion();
                }
                else {
                    wrongAns++;
                    nextQuestion();
                }});
        }
        else {
            timer.stop ();
            gameOver ();
        }
    }

    //Gameover.  Tally and display scores
    function gameOver (){
        $("#correct-answers").html("Correct answers: " + correctAns);
        $("#wrong-answers").html("Wrong answers: " + wrongAns);
        $("#skipped-questions").html("Skipped questions: " + skippedQuestions);
        
    }
});
