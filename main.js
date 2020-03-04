let resultArea = document.getElementById("resultArea");
let chanceArea = document.getElementById("chanceArea");
let resetButton = document.getElementById("resetButton");
let timecount = document.getElementById("timecount");
let startButton = document.getElementById("startButton");
let yourGameHistory = document.getElementById("yourGameHistory");


//1. Set the Random Number
let randomNumber = Math.ceil(Math.random() * 100); // get the random number b/w 0 and 1
console.log(randomNumber);

//2. Input box
let userGuess = document.getElementById("userInput");

//3. Button click 
let guessButton = document.getElementById("guessButton");

let gameHistoryObject = [];
let roundNumber = 0;

// Number of chances that user begins with; history 
let chance = 3;
chanceArea.innerHTML = `Chances left: ${chance}`;
let history = [];
//Show that number of chances to the user

//3.a Read the value from input



//user clicking Button will trigger the guess function
guessButton.addEventListener("click", guess);
resetButton.addEventListener("click", reset);
startButton.addEventListener("click", timecounting);


function guess() {
    time=0;
    let userNumber = parseInt(userGuess.value);
    if (history.includes(userNumber)== true){
        alert("You guessed that number already! Try again.")
        time=0;
        return ; 
    }
    chance = chance - 1;
    let message = '';

    console.log(userNumber);

    //3.b compare with user typed number, show feedback on result area
    if (chance > 0) {
        if (userNumber === randomNumber) {
            message = ("CORRECT!");
            history.push(userNumber);
            document.getElementById("resultArea").style.color = "blue";
            document.getElementById("resetButton").style.backgroundColor = "green";
            document.getElementById("guessButton").disabled = true;
            timeOut();
        } else if (userNumber > randomNumber) {
            message = ("Too High!");
            history.push(userNumber);
        } else if (userNumber < randomNumber) {
            message = ("Too Low!");
            history.push(userNumber);
        } else {
            message = ("Aw! You didn't guess in time!");
        }
    } else {
        if (userNumber === randomNumber) {
            message = ("CORRECT!");
            document.getElementById("resultArea").style.color = "blue";
            document.getElementById("resetButton").style.backgroundColor = "green";
            history.push(userNumber);
        } else {
            document.getElementById("guessButton").disabled = true;
            document.getElementById("resultArea").style.color = "red";
            document.getElementById("resetButton").style.backgroundColor = "green";
            message = "You lose! You ran out of chances! :("
            history.push(userNumber);
        }

    }
    chanceArea.innerHTML = `Chances left: ${chance}`;
    historyArea.innerHTML = `Past guesses:${[history]}`;
    resultArea.innerHTML = `${message}`;
}


function reset() {
    roundNumber += 1;
    let match = {
        round:roundNumber,
        guessinghistory : history
    }
    gameHistoryObject.push(match);
    console.log(gameHistoryObject);

    gameHistoryObject['round'] =  roundNumber;
    str = JSON.stringify(gameHistoryObject);
    yourGameHistory.innerHTML = str;

    history = [];
    chance = 3;
    document.getElementById('userInput').value = '';
    document.getElementById('historyArea').innerHTML = 'Past Guesses:';
    randomNumber = Math.ceil(Math.random() * 100);
    console.log(randomNumber);
    document.getElementById("guessButton").disabled = false;
    document.getElementById('resultArea').innerHTML = '';
    document.getElementById('chanceArea').innerHTML = `Chances ${chance}`;
    document.getElementById("resetButton").style.backgroundColor = "";
    document.getElementById("resultArea").style.color = "";
}

let time = 0 // time start from 0
let myTime; // timer will be assign to this variable
function timecounting() {
    myTime = setInterval(() => {
        time += 1
        if (time===11 & chance>0){
            timeOut();
            time = 0;
            timecounting();
            guess();
        } else if (chance === 0){
            timeOut();
            time=0;
        }
        document.getElementById('timecount').innerHTML = `Timer: ${time}`
    }, 1000)// every 1 second, it will add 1 into time variable (computer use millisecond so 1000 is 1 second)
}
// fire the timecounting function!!

function timeOut() {
    clearInterval(myTime);
  }
