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
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const scoreArea = document.querySelector(".scores");

// Used for timer
var intervalID;
// Array of quotes used for tests
const quotes = [
    ""
]
// Array of score objects, figure out later
var scores = [

]

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
    let errors = 0, wpm = 0;
    if(testArea.innerHTML === originText){
        completeTest();
    }
    else{
        for(var i = 0; i < testArea.innerHTML.length; i++){
            if(testArea.innerHTML[i] != originText[i])
                errors++;
        }
    }
    return errors, wpm;
}

function completeTest(){
    clearInterval(intervalID);
    checkAndUpdateScore();
    resetAll();
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

// Start the timer:


// Reset everything:
function resetAll(){
    // Reset intervalID for checks in eventListener
    intervalID = undefined;
    // Implement random quote selection
    originText = quotes[0]
}

// Event listeners for keyboard input and the reset button:
resetButton.addEventListener('click', function(e){
    resetAll();
})

testWrapper.addEventListener('keydown', function(e) {
    if (!intervalID){
        startTimer();
    }
    else{
        compareText();
    }
})
