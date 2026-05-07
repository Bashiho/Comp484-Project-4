// TBD
// Task 1:
// Standard Timer Testing
// Input Validation
// Event Handling
// Reset Logic
// Task 2:
// Dynamic Visual Feedback
// Data Persistence
// Content Randomization
// Live Performance Metrics

const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const scoreArea = document.querySelector(".scores");

// Used for timer
var intervalID;
// Array of quotes used for tests
const quotes = [
    "They do lots of things!",
    "Never show fear, no matter the odds",
    "Time to change the world",
    "I like plants",
    "Mina Ha, rise up and take what you deserve",
    "I donate 1% of all my earnings to lashback, my charity for kids who kinda suck"
]
// Array of score objects, figure out later
var scores = [

]

originText.innerHTML = quotes[Math.floor(Math.random() * quotes.length)];
testArea.innerHTML = "";

// Add leading zero to numbers 9 or below (purely for aesthetics):
function formatNumbers(minutes, seconds, dispms) {
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    dispms = dispms < 10 ? "0" + dispms : dispms;
    return minutes, seconds, dispms;
}

// Run a standard minute/second/hundredths timer:
function startTimer() {
    var timer = 0, minutes, seconds, dispms;
    intervalID = setInterval(function () {
        // Prepare numbers for display
        dispms=parseInt(timer % 100,10);
        seconds = parseInt(timer / 100, 10);
        minutes = parseInt(seconds / 60, 10);
        seconds = parseInt(seconds % 60, 10);
        // Handle formatting of numbers
        minutes, seconds, dispms = formatNumbers(minutes, seconds, dispms);
        // Display numbers
        theTimer.textContent = minutes + ":" + seconds + ":" + dispms;
        timer++;
    }, 10);
}

// Match the text entered with the provided text on the page:
// Probably hyper scuffed but figure it out later lol
function compareText(){
    let input = document.querySelector("#test-area");
    let errors = 0, wpm = 0;
    testText = originText.innerHTML;
    const len = Math.max(typed.length, testText.length);
    const typed = input.value;
    let correctChars = 0;
    const perChar = [];
    
    if(input === testText)
        completeTest();

    for (let i = 0; i < len; i++) {
        const t = testText[i];
        const c = typed[i];
        if (c === undefined) {
          perChar.push(null);
        } else {
          if (c === t) {
            correctChars++;
            perChar.push(true);
          } else {
            perChar.push(false);
          }
        }
    }
    return errors, wpm;
}

function completeTest(){
    resetAll();
    // checkAndUpdateScore();
}

function checkAndUpdateScore(){
    let errors, wpm = compareText();
    let place = 1;
    // Compare with top 3
    for(let i = 0; i < 3; i++){
        if(wpm < scores[i].wpm)
            place++;
    }
    // Solve logic to add new score to list
    if(place >= 3){
        if(place == 3)
            scores[2] = wpm;
        else{
            scores[2] = scores[1];
            scores[1] = place == 2 ? wpm : scores[0];
            scores[0] = place == 1 ? wpm : scores[0];
        }
    }
    scoreArea.innerHTML = scores;
}

// Reset everything:
function resetAll(){
    // Reset intervalID for checks in eventListener
    clearInterval(intervalID);
    intervalID = undefined;
    // Implement random quote selection and reset text areas
    originText.innerHTML = quotes[Math.floor(Math.random() * quotes.length)];
    testArea.innerHTML = undefined;
}

// Event listeners for keyboard input and the reset button:
resetButton.addEventListener('click', function(e){
    resetAll();
})

testWrapper.addEventListener('keydown', function(e) {
    if (!intervalID)
        startTimer();

    compareText();
})
