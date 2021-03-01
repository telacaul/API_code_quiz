//Creating elements
const quizBody = document.getElementById("quiz");
const resultsEl = document.getElementById ("result");
const finalScoreEl= document.getElementById ("finalScore");
const gameoverDiv = document.getElementById ("gameover");
const questionsEl = document.getElementById ("questions");
const quizTimer = document.getElementById ("timer");
const startBtn = document.getElementById ("startBtn");
const startQuizDiv = document.getElementById ("startpage");
const scoreContainer = document.getElementById ("scoreContainer");
const scoreDiv = document.getElementById ("scorePage");
const scoreInputName = document.getElementById ("initials");
const scoreDisplayName = document.getElementById ("score-initials");
const endGameBtns = document.getElementById ("endGameBtns");
const submitScoreBtn = document.getElementById ("submitScoreBtn");
const scoreDisplay = document.getElementById ("score");
const buttonA = document.getElementById ("a");
const buttonB = document.getElementById ("b");
const buttonC = document.getElementById ("c");
const buttonD = document.getElementById ("d");

//Questions and answer key
const quizQuestions = [{
    question: "How do I do this?",
    choiceA: "stuff",
    choiceB: "also stuff",
    choiceC: "more stuff",
    choiceD: "nothing",
    correctAnswer: "a"
  },
  {
    question: "What should I do?",
    choiceA: "stuff",
    choiceB: "also stuff",
    choiceC: "more stuff",
    choiceD: "nothing",
    correctAnswer: "b"
  },
  {
    question: "How can we?",
    choiceA: "stuff",
    choiceB: "also stuff",
    choiceC: "more stuff",
    choiceD: "nothing",
    correctAnswer: "d"
  },
  {
    question: "What is?",
    choiceA: "stuff",
    choiceB: "also stuff",
    choiceC: "more stuff",
    choiceD: "nothing",
    correctAnswer: "c"
  },
  {
    question: "Who is?",
    choiceA: "stuff",
    choiceB: "also stuff",
    choiceC: "more stuff",
    choiceD: "nothing",
    correctAnswer: "a"
  }
];

//Variables
var finalQuestionIndex = quizQuestions.length;
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

  var currentQuestion = quizQuestions[currentQuestionIndex];
  questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
  buttonA.innerHTML = currentQuestion.choiceA;
  buttonB.innerHTML = currentQuestion.choiceB;
  buttonC.innerHTML = currentQuestion.choiceC;
  buttonD.innerHTML = currentQuestion.choiceD;
};

//Beginning the quiz

function startQuiz(){
  gameoverDiv.style.display ="none";
  startQuizDiv.style.display = "none";
  generateQuestion();

  //Timer
  timerInterval = setInterval(function () {
    timeLeft--;
    quizTimer.textContent = "Time left: " + timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      showScore();
    }
  }, 1000);
  quizBody.style.display = "block";
}

//Display quiz score
function showScore() {
  quizBody.style.display = "none"
  gameoverDiv.style.display = "flex";
  clearInterval(timerInterval);
  scoreInputName.value = "";
  finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

//Collect user initials for scoreboard 

submitScoreBtn.addEventListener("click", function highscore() {

  if (scoreInputName.value === "") {
    alert("Please enter first and last initial");
    return false;

  } else {
    var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    var currentUser = scoreInputName.value.trim();
    var currentHighscore = {
      name: currentUser,
      score: score
    };

    gameoverDiv.style.display = "none";
    scoreContainer.style.display = "flex";
    scoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    savedHighscores.push(currentHighscore);
    localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
    generateHighscores();
  }
});

//Determining and generating the high score

function generateHighscores() {
  scoreDisplayName.innerHTML = "";
  scoreDisplay.innerHTML = "";
  var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
  for (i=0; i < highscores.length; i++) {
    var newNameSpan = document.createElement("li");
    var newScoreSpan = document.createElement("li");
    newNameSpan.textContent = highscores[i].name;
    newScoreSpan.textContent = highscores[i].score;
    scoreDisplayName.appendChild(newNameSpan);
    scoreDisplay.appendChild(newScoreSpan);
  }
}

//Displaying high schore
function showHighscore() {
  startQuizDiv.style.display = "none";
  gameoverDiv.style.display = "none";
  scoreContainer.style.display = "flex";
  scoreDiv.style.display = "block";
  endGameBtns.style.display = "flex";

  generateHighscores();
}

//Clear score and name initials
function clearScore() {
  window.localStorage.clear();
  scoreDisplayName.textContent = "";
  scoreDisplay.textContent = "";
}

//Restart quiz to try again
function replayQuiz() {
  scoreContainer.style.display = "none";
  gameoverDiv.style.display = "none";
  startQuizDiv.style.display = "flex";
  timeLeft = 60;
  score = 0;
  currentQuestionIndex = 0;
}

//Function booleans for a quiz answers
function checkAnswer(answer) {
  correct = quizQuestions[currentQuestionIndex].correctAnswer;

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
startBtn.addEventListener("click", startQuiz);

