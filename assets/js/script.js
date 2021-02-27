//Setting variables and elements

var quizBody = document.getElementById("quiz");
var scoresEl = document.getElementbyID ("scores");
var finalScoreEl= document.getElementbyID ("finalScore");
var gameoverDiv = document.getElementbyID ("gameover");
var quizTimer = document.getElementById ("timer");
var startQuizBtn = document.getElementById ("startBtn");
var startQuizDiv = document.getElementById ("startpage");
var scoreContainer = document.getElementById ("scoreContainer");
var scoreDiv = document.getElementById ("scorePage");
var scoreInputName = document.getElementById ("initials");
var scoreDisplay = document.getElementById ("score-initials");
var endGameBtn = document.getElementById ("endGameBtn");
var submitScoreBtn = document.getElementById ("submitScoreBtn");
var scoreDisplay = document.getElementById ("score");
var buttonA = document.getElementById ("a");
var buttonB = document.getElementById ("b");
var buttonC = document.getElementById ("c");
var buttonD = document.getElementById ("d");

//Questions and answer key
const quizQuestion = [{
  question: "...",
  choiceA: "stuff",
  choiceB: "also stuff",
  choiceC: "more stuff",
  choiceD: "nothing",
  correctAnswer: "a"
  }
];

//Variables
var finalQuestionIndex = quizQuestion.length;
var currentQuestionIndex = 0;
var timeLeft=60;
var timerInterval;
var score = 0;
var correct;

//Generating questions
function generateQuestion() {
  gameoverDiv.style.display="none";
  if (currentQuestionIndex === finalQuestionIndex) {
    return showScore();
  }

  var displayQuestion = quizQuestion[currentQuestionIndex];
  questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
  buttonA.innerHTML = currentQuestion.choiceA;
  buttonB.innerHTML = currentQuestion.choiceB;
  buttonC.innerHTML = currentQuestion.choiceC;
  buttonD.innerHTML = currentQuestion.choiceD;
};

//Beginning the quiz

function startQuiz() {
  gameoverDiv.style.display ="none";
  startQuizDiv.style.display = "none";
  generateQuestion();

  //Timer
  var timerInterval = setInterval(function () {
    if (timeLeft > 1) {
      timerEl.textContent = timeLeft + "seconds remaining";
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.textContent = timeLeft + "second remaining";
      timeLeft--;
    } else {
      timerEl.textContent = '';
      clearInterval(timeInterval);
      displayMessage();
    }
  }, 1000);
  quizBody.style.display = "block";
}

//Show quiz score
function showScore() {
  quizBody.style.display = "none"
  gameoverDiv.style.display = "flex";
  clerIntervale(timerInterval);
  scoreInputName.value = "";
  finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestion.length + " correct!";
}

//Collect user initials for scoreboard 

submitScoreBtn.addEventListener("click", function highscore() {
  if (scoreInputName.value === "") {
    alert("Please enter first and last initial");
    return false;
  } else {
    var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    var currentUser = highscoreInputName.value.trim();
    var currentHighscore = {
      name: currentUser,
      score: score
    };

    savedHighscores.push(currentHighscore);
    localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
    generateHighscores();
  }
});

//Determining and generating the high score

function generateHighscores() {
  highscoreDisplayName.innerHTML = "";
  highscoreDisplayScore.innerHTML = "";
  var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
  for (i=0; i < highscores.length; i++) {
    var newNameSpan = document.createElement("li");
    var newScoreSpan = document.createElement("li");
    newNameSpan.textContent = highscores[i].name;
    newScoreSpan.textContent = highscores[i].score;
    highscoreDisplayName.appendChild(newNameSpan);
    highscoreDisplayScore.appendChild(newScoreSpan);
  }
}

//Displaying high schore
function showHighscore() {
  startQuizDiv.style.dislay = "none";
  gameoverDiv.style.display = "none";
  highscoreContainer.style.display = "flex";
  highscoreDiv.style.display = "block";
  endGameBtns.style.display = "flex";

  generateHighscores();
}

//Clear score and name initials
function clearScore() {
  window.localStorage.clear();
  highscoreDisplayName.textContent="";
  highscoreDisplayScore.textContent="";
}

//Restart quiz to try again
function replayQuiz() {
  highscoreContainer.sytle.display = "none";
  gameoverDiv.style.display = "none";
  startQuizDiv.style.display = "flex";
  timeLeft = 76;
  score = 0;
  currentQuestionIndex = 0;
}

//Function booleans for a quiz answers
function checkAnswer(answer) {
  correct = quizQuestion[currentQuestionIndex].correctAnswer;

  if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
    score++;
    currentQuestionIndex++;
    generateQuestion();
    //Deduct 10 sections if answer in incorrect or continue if correct
  } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
    timeLeft = timeLeft - 10;
    currentQuestionIndex++;
    generateQuestion();
  } else {
    showScore();
  } 
}

//Start quiz button
startQuizBtn.addEventListener("click", startQuiz);

