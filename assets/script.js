// grabbing element refrences
var listOfLegends = document.getElementById("listOfLegends");
var Hofpage = document.getElementById("Hof-page");
var viewHallOfFame = document.getElementById("viewHallOfFame");
var startHof = document.getElementById("applyForHof");
var noTime = document.getElementById("noTime");
var clearHofBtn = document.getElementById("clearHofBtn");
var restartBtn = document.getElementById("restartBtn");
var submitHof = document.getElementById("submitHof");
var submitForHofBtn = document.getElementById("submitForHofBtn");
var highScore = document.getElementById("highScore");
var stopClock = document.getElementById("stopClock");
var entrybox = document.getElementById("entry-box");//
var finalScore = document.getElementById("finalScore");
var start = document.getElementById("start");
var choiceA = document.getElementById("answer0");
var choiceB = document.getElementById("answer1");
var choiceC = document.getElementById("answer2");
var choiceD = document.getElementById("answer3");
var questionHeader = document.getElementById("questionHeader");
var rightAnswer = 0;
var scoreHofpage; //when highscores are cleared makes sure there is a clean slate for new names to be entered instead of displaying high scores still
var questionIndex = 0; //makes sure the quiz starts on the first question
var totalTime = 100;

// Define a set of questions
var questions = [
    {
        question: "Who won the F1 Constructors Championship in 2022",
        choices: ["a. Red Bull", "b. Mercedes", "c. Smart Car", "d. Haas"],
        answer: "a. Red Bull"
    },
    {
        question: "Who is the Quarterback for the Bengals?",
        choices: ["a. Tom Brady", "b. Lewis Hamilton", "c. Joe Burrow", "d. Brock Purdy"],
        answer: "c. Joe Burrow"
    },
    {
        question: "Who won the 2022 FIFA World Cup?",
        choices: ["a. Mars", "b. Portugal", "c. America", "d. Argentina"],
        answer: "d. Argentina"
    },
    {
        question: "Who won the F1 2022 Driver's World Championship?",
        choices: ["a. Daniel Ricciardo", "b. Pierre Gasly", "c. The Buoy", "d. Max Verstappen"],
        answer: "d. Max Verstappen"
    },
    {
        question: "How many points is a touchdown?",
        choices: ["a. 1,000", "b. 42,069", "c. 6", "d. Too Many Points"],
        answer: "c. 6"
    },
    {
        question: "Who is the G.O.A.T?",
        choices: ["a. Tom Brady", "b. Danny Rojas", "c. Danny De Vito", "d. The Buoy"],
        answer: "a. Tom Brady"
    },
    {
        question: "Who missed a penalty in the England vs. France game in 2022",
        choices: ["a. Gordon Ramsay", "b. Harry Kane", "c. Pierre", "d. Harry Potter"],
        answer: "b. Harry Kane"
    },
    {
        question: "The best college football team is (wrong answers only):",
        choices: ["a. Harvard", "b. Alabama", "c. Texas A&M", "d. Iowa State"],
        answer: "d. Iowa State"
    },
];


// WHEN I click the start button, timer starts
startHof.addEventListener("click", startQuiz);
function startQuiz() {
	questionIndex = 0;  //setting the value to keep track of questions
    totalTime = 100 //set the value so there are 100 seconds
    stopClock.textContent = totalTime; //I'm setting the value of time left to represnt as totaltime
    //94-97 makes sure things display when they should as well as dissapear when not needed
    start.style.display = "none";
    entrybox.style.display = "block";
    timer.style.display = "block";
    noTime.style.display = "none";

    //This code starts a countdown timer and updates the remaining time on the screen, stops the countdown and calls a gameOver function when the time reaches 0 and calls a showQuiz function.
    var startTimer = setInterval(function() {
        totalTime--;
        stopClock.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(startTimer);
            gameOver();
        }
      },1000);
    showQuiz();
};

//shows the question as well as the answers to that question
function showQuiz() {
    nextQuestion();
};

function nextQuestion() {
    //gets the current question
    var currentQuestion = questions[questionIndex];
    
    //update question title which is the question itself
    questionHeader.textContent = currentQuestion.question;
    
    //update the possible answers
    choiceA.textContent = currentQuestion.choices[0];
    choiceB.textContent = currentQuestion.choices[1];
    choiceC.textContent = currentQuestion.choices[2];
    choiceD.textContent = currentQuestion.choices[3];
  };

  function checkAnswer(answer) {
    // make the text bold and visible
    answerCheck.style.fontWeight = "bolder";
    answerCheck.style.fontSize = "22px";
    answerCheck.style.display = "block";

    // it will check if the answer is right then will display the appropriate outcome
    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
        rightAnswer++;
        answerCheck.textContent = "Score!!!";
        //if the answer is wrong it will deduct 5 seconds
    } else {
        totalTime -= 5;
        stopClock.textContent = totalTime;
        answerCheck.textContent = "Penalty!!! The right answer is " + questions[questionIndex].answer;
    }

    //this updates to the next question in the list
    questionIndex++;

    // if there are more questions, show the next question or end the game if no more questions 
    //- this is a ternary operater(shorthand for an if else statement) - the part before the question mark lists what is being checked, after the ? is if the condition is true which will display the next question, after the : is what will happen if the conditional is false which ends the quiz
    questionIndex < questions.length ? nextQuestion() : gameOver();
};

submitForHofBtn.addEventListener("click", function(e){ 
    storeHighScores(e);
});

// functions to choose an answer, use arrow function(short hand to write functions)
var chooseA = () => checkAnswer(0);
var chooseB = () => checkAnswer(1);
var chooseC = () => checkAnswer(2);
var chooseD = () => checkAnswer(3);
//listens for a click on the answer button
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

// when all questions are answered or timer reaches 0, game over
function gameOver() {
    Hofpage.style.display = "block";
    entrybox.style.display = "none";
    start.style.display = "none";
    timer.style.display = "none";
    noTime.style.display = "block";

    // displays the final score
    finalScore.textContent = rightAnswer;
};


function storeHighScore() {
    var name = submitHof.value;

    //checks if the user has entered their name in the hall of fame
    if (!name) {
        alert("You Must Enter the Hall of Fame");
        return;
    }

    //gets the current high scores from local storage
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    //add the new score to the high scores
    highScores.push({initials: name, score: finalScore.textContent});

    //saves the new high scores to local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
};


var i = 0;
//this will retrieve an item from local storage with the key of "high scores", and if the item is not null it will parse it to a javascript object and creates a new p element for every element in the object
function showHighScores() {
    var savedHighScores = localStorage.getItem("high scores");
    if (savedHighScores === null) {
        return;
    }

    //this line of code is using the JSON.parse() method to convert a JSON string into a JavaScript object and assign it to the storedHighScores variable
    var storedHighScores = JSON.parse(savedHighScores);

    //this is iterating through an array, creating a new p element for each element in the array and adding it to an element with the text of the element being the value of the initials and score properties of the current element in the array
    storedHighScores.forEach(function(highScore) {
        var eachNewHallOfFamer = document.createElement("p");
        eachNewHallOfFamer.innerHTML = highScore.initials + ": " + highScore.score;
        listOfLegends.appendChild(eachNewHallOfFamer);
    });


};
//ends the quiz and takes you back to the home page to start the quiz again
restartBtn.addEventListener("click", function() {
    function showStart() {
        start.style.display = "block";
    }
    function hideHighScore() {
        highScore.style.display = "none";
    }
    showStart();
    hideHighScore();
});
