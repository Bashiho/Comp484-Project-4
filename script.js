const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const scoreArea = document.querySelector(".scores");

// Used for timer
var intervalID;
var minutes, seconds, dispms;

// Array of quotes used for tests
// All quotes are from Deadlock characters
const quotes = [
    "They do lots of things!",
    "Never show fear, no matter the odds",
    "Time to change the world",
    "I like plants",
    "Mina Ha, rise up and take what you deserve",
    "I donate 1% of all my earnings to lashback, my charity for kids who kinda suck",
    "I'm doing this for money, and, well, just money",
    "Today, I'll explore the mysteries of New Jersey",
    "I didn't mean to offend you. I'm just socially awkward!",
    "Oh... I don't know. Get a hot dog?"
]

// Updates scores to those saved in localStorage
var scores = [
    localStorage.getItem("first"), 
    localStorage.getItem("second"), 
    localStorage.getItem("third")
];

// Various updates on load, sets quotes, clears input area, and loads scores
originText.innerHTML = quotes[Math.floor(Math.random() * quotes.length)];
testArea.innerHTML = "";
scoreArea.innerHTML = scores[0] + " wpm <br>" + scores[1] + " wpm <br>" + scores[2] + "wpm";

// Add leading zero to numbers 9 or below (purely for aesthetics):
function formatNumbers(minutes, seconds, dispms) {
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    dispms = dispms < 10 ? "0" + dispms : dispms;
    return minutes, seconds, dispms;
}

// Run a standard minute/second/hundredths timer:
function startTimer() {
    var timer = 0;
    intervalID = setInterval(function () {
        // Prepare numbers for display
        dispms = parseInt(timer % 100,10);
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

function compareText(){
    let input = document.querySelector("#test-area").value;
    let testText = originText.innerHTML;
    let wpm = checkWPM();
    let errors = 0;
    let wpmCount = document.querySelector(".wpm");
    let errorCount = document.querySelector(".error");

    testWrapper.classList.remove("typo-red");
    
    if(input === testText)
        completeTest();

    for(let i = 0; i < input.length; i++){
        if(input[i] !== testText[i]){
            testWrapper.classList.add("typo-red");
            errors++;
        }
    }

    if(!testWrapper.classList.contains("typo-red"))
        testWrapper.classList.add("matching-blue");

    wpmCount.innerHTML = "WPM: " + wpm;
    errorCount.innerHTML = "Errors: " + errors;

}

function completeTest(){
    testWrapper.classList.add("complete-green");
    clearInterval(intervalID);
    checkAndUpdateScore();
}

function checkWPM(){
    let wpm = document.querySelector("#test-area").value.length;
    let time = minutes + (seconds/60);
    wpm = ((wpm/5) / time);
    // Return integers only
    return Number.parseInt(wpm);
}

function checkAndUpdateScore(){
    // Calculate WPM
    let wpm = checkWPM();

    // Compare wpm to current scores
    if(wpm > scores[0]){
        scores[2] = scores[1];
        scores[1] = scores[0];
        scores[0] = wpm;
    }
    else if(wpm > scores[1]){
        scores[2] = scores[1];
        scores[1] = wpm;
    }
    else if(wpm > scores[2]){
        scores[2] = wpm;
    }

    scoreArea.innerHTML = scores[0] + " wpm <br>" + scores[1] + " wpm <br>" + scores[2] + " wpm";
    // Save scores locally
    localStorage.setItem("first", scores[0]);
    localStorage.setItem("second", scores[1]);
    localStorage.setItem("third", scores[2]);
}

// Reset everything:
function resetAll(){
    // Reset intervalID for checks in eventListener
    clearInterval(intervalID);
    intervalID = undefined;
    // Implement random quote selection and reset text areas
    originText.innerHTML = quotes[Math.floor(Math.random() * quotes.length)];
    testArea.value = "";
    testWrapper.classList.remove("complete-green");
    testWrapper.classList.remove("typo-red");
    testWrapper.classList.remove("matching-blue");
}

// Event listeners for keyboard input and the reset button:
resetButton.addEventListener('click', function(e){
    resetAll();
})

testWrapper.addEventListener('input', function(e) {
    if (!intervalID)
        startTimer();

    compareText();
})
