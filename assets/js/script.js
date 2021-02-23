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









//TIMER INFO FROM CLASS

// Setting variables for the elements that we want to grab from the page
// that we wanna make use of
var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main');
var startBtn = document.getElementById('start');
var message =
  'Congratulations! Now you are prepared to tackle the Challenge this week! Good luck!';
// .split is a function of strings or String prototype meaning you can call split on any string
// its turns a string into an array
// using the thing we pass into split as the splitter
var words = message.split(' ');
// Timer that counts down from 5
function countdown() {
  var timeLeft = 2;
  // We are not using a for loop to decrement the timer by 1
  // We are using setInterval to decrement it by 1 every second
  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function() {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = timeLeft + ' seconds remaining';
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timerEl.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = '';
      // Use `clearInterval()` to stop the timer
      // clear Interval is a built in function for JS
      // you can call it with any declared setInterval function
      // and what it does is it stops that setInterval from firing again
      // stops timeInterval from happening again every second
      clearInterval(timeInterval);
      // Call the `displayMessage()` function
      displayMessage();
    }
  }, 1000);
}
// Displays the message one word at a time
function displayMessage() {
  console.log(words);
  var wordCount = 0;
  // words = ["manny", "cat", "monkeys", ]
  // words[4] === undefined;
  // [ "CONRA"]
  // Uses the `setInterval()` method to call a function to be executed every 300 milliseconds
  var msgInterval = setInterval(function() {
    // is to control that we are not out of bounds in our timer
    if (words[wordCount] === undefined) {
      clearInterval(msgInterval);
    } else {
      mainEl.textContent = words[wordCount];
      wordCount++;
    }
  }, 1000);
}
startBtn.onclick = countdown;