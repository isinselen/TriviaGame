$(document).ready(function () {
    var options = [
        {
            question: "Which of the zodiac sign is the most dangerous/most likely to be serial killer?", 
            choice: ["Gemini", "Aquarius", "Cancer", "Capricorn"],
            answer: 2,
            photo: "assets/images/cancer.jpg"
         },
         {
             question: "Who are the best selling artist of all time?", 
            choice: ["Elton John", "Led Zeppelin", "The Beatles", "Michael Jackson"],
            answer: 2,
            photo: "assets/images/thebeatles.jpg"
         }, 
         {
             question: "Which of the alcohol that has anasone in it produced in Turkey?", 
            choice: ["Arak", "Raki", "Uzo", "Pastis" ],
            answer: 1,
            photo: "assets/images/raki.jpg"
        }, 
        {
            question: "Which is not an ingredient in a Long Island Iced Tea?", 
            choice: ["Rum", "Vodka", "Beer", "Gin" ],
            answer: 2,
            photo: "assets/images/beer.jpeg"
        }, 
        {
            question: "What kind of dog is the smartest?", 
            choice: ["Labrador Retriever", "Golden retriever", "Papillion", "Border Collie" ],
            answer: 3,
            photo: "assets/images/bordercollie.jpg"
        }, 
        {
            question: "What is the most expensive car brand in the world?", 
            choice: ["Ferrari", "Bugatti", "Aston Martin", "Rolls Royce" ],
            answer: 1,
            photo: "assets/images/bugatti.jpg"
        }, 
        {
            question: "What is the most common blood type?", 
            choice: ["A(+)", "A(-)", "0(+)", "B(+)" ],
            answer: 2,
            photo: "assets/images/zero.jpg"
        }, 
        {
            question: "What is the most expensive city to visit?", 
            choice: ["London", "Dubai", "New York City", "Stockholm" ],
            answer: 1,
            photo: "assets/images/dubai.jpg"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#again").hide();
   
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#block").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array 
    
    function displayQuestion() {
        
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
            //iterate 
            $("#Qblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("choice");
                userChoice.html(pick.choice[i]);
                //assign array position 
                userChoice.attr("data-guessvalue", i);
                $("#block").append(userChoice);
    }
    
    //click function 
    $(".choice").on("click", function () {
       
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#block").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#block").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    function hidepicture () {
        $("#block").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#block").empty();
            timer= 20;
    
        //run the score screen 
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#Qblock").empty();
            $("#Qblock").html("<h3>Game Over!  Here's your score: </h3>");
            $("#block").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#block").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#block").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#again").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    
    }
    
    $("#again").on("click", function() {
        $("#again").hide();
        $("#block").empty();
        $("#Qblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })