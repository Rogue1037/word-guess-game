var questions = ['Who was the pilot for the Outrider?', 'Who is the leader for the Rebel Alliance?','Who was the Lead Sound Designer on Star Wars?','What was the model of Darth Vader\'s?'];
var answers = ['Dash Rendar','Mon Montha','Ben Burt', 'Tie Advanced'];
var guessed = [];
var currentQuestion = 0;
var allowedGuesses = 10;
var amountGuesses = 0;
var correctGuesses = 0;
var restartLevel = false;
var endgame = false;

startLevel();

function startLevel(){
    window.onload = function(){ 
        doLevel();
    
    }
}

function resetGame (){
    guessed = [];
    curretnQuestion = 0;
    allowedGuesses = 10;
    amountGuesses = 0;
    correctGuesses = 0;
    restartLevel = false;
    endgame = false;

    doLevel();
}

function doLevel(){
    var myNode = document.getElementById("gamecontainer");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
        }

    correctGuesses = 0; 
    guessed = [];

    createScoreContainer();
    createQuestionContainer();
    createAnswerContainer();
    createBillboardContainer();

    document.addEventListener("keydown", gameTurnLoop, false);
}

function createScoreContainer(){

document.getElementById('gamecontainer').style.width = "100%";

var gameDiv = document.createElement("div");
gameDiv.id = "scoreContainer";
gameDiv.style.height = "40px";
gameDiv.style.padding = "5px";
gameDiv.style.border - "thin black solid";

document.getElementById('gamecontainer').appendChild(gameDiv);

updateGuesses();

}

function updateGuesses(){
    document.getElementById('scoreContainer').innerHTML = amountGuesses + " guesses used of " + allowedGuesses;
}

function createQuestionContainer(){
   var questionDiv = document.createElement("div");
    questionDiv.id = "questionContainer";
    questionDiv.style.padding = "5px";
    questionDiv.style.border = "thin black solid";
    questionDiv.style.fontSize = "24";
    questionDiv.style.margin = "auto";


    document.getElementById('gamecontainer').appendChild(questionDiv);

    questionDiv.innerHTML = "Question: " + questions[currentQuestion];
    
}

function createAnswerContainer(){
    var answerDiv = document.createElement("div");
    answerDiv.id = "answerContainer";

    var aWidth = answers[currentQuestion].length*62;
    answerDiv.style.width = aWidth + "px";
    answerDiv.style.height = "75px";
    answerDiv.style.margin = "auto";
    answerDiv.style.marginTop = "20px";

    document.getElementById('gamecontainer').appendChild(answerDiv);
    
    currentLetter = 0;

    answers[currentQuestion].split('').forEach(function(curLetter){
        var letterDiv = document.createElement("div");
        letterDiv.id = "letter" + currentLetter;
        letterDiv.style.width = "60px";
        letterDiv.style.height = "100px";

        if(isLetter(curLetter)){
            letterDiv.style.border = "thin black solid";
        }
        letterDiv.style.cssFloat = "left";
        letterDiv.style.textAlign = "center";
        
        document.getElementById('answerContainer').appendChild(letterDiv);

        currentLetter++;
    });

    
    }
function createBillboardContainer() {

    var billboardDiv = document.createElement("div");
    billboardDiv.id = "billboardContainer";
    billboardDiv.style.width = "400px";
    billboardDiv.style.height = "100px";
    billboardDiv.style.border = "thin black solid";
    billboardDiv.style.visibility = "hidden";
    billboardDiv.style.position = "fixed";
    billboardDiv.style.left = "420px";
    billboardDiv.style.top = "250px";
    billboardDiv.style.marginleft = "-200px";
    billboardDiv.style.marginRight = "34px";
    billboardDiv.style.paddingTop = "24px";
    billboardDiv.style.textAlign = "center";
    billboardDiv.style.background = "crimson";
    billboardDiv.style.fontsize = "24px";
    billboardDiv.style.color = "whitesmoke";
    

    document.getElementById("gamecontainer").appendChild(billboardDiv);


}
function updateBillboardContainer(theText) {
    var extraText = "<br><br>Hit ENTER to continue";
    if(endgame == true){
        extraText = "<br><br>Hit ENTER to restart game. ";

 }
 document.getElementById('billboardContainer').innerHTML = theText + extraText;

 document.removeEventListener("keydown", gameTurnLoop);

 document.addEventListener("keydown", billboardListener, false);

 document.getElementById('billboardContainer').style.visibility = "visible";

}

function billboardListener(e){
    var keyCode = e.keyCode;

    if(keyCode==13) {
        document.removeEventListener("keydown", billboardListener);

        document.getElementById('billboardContainer').style.visibility = "hidden";

        if(endgame == true) {
            resetGame();
        } else if(restartLevel == true) {

            currentQuestion++;

            if(currentQuestion >= answers.length){
                endgame = true;
                updateBillboardContainer("UNLIMITED POWER!!");
                


            }
            else {
                restartLevel = false;
                doLevel();
            } 
        }   


        else {
            document.addEventListener("keydown", gameTurnLoop, false);
        }
    }

}


function gameTurnLoop (e) {
    
    var keyCode = e.keyCode;
    var currentGuess = String.fromCharCode(e.keyCode).toLowerCase();
    
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        var currentLetter = 0; 
        var guessedCorrectly = false;
        
        if(guessed.indexOf(currentGuess) != -1){
            updateBillboardContainer("you guessed " + currentGuess + " already!");
        } else {
            guessed.push(currentGuess);

            answers[currentQuestion].split('').forEach(function(curLetter){
                if(curLetter.toLowerCase() == currentGuess){
                    guessedCorrectly = true;
                    correctGuesses++;
                    updateBillboardContainer("I can feel the power flowing through you. Correct!!");

                    var theID = "letter" + currentLetter;
                    document.getElementById(theID).innerHTML = currentGuess;

                }

                currentLetter++;

            });

            if(guessedCorrectly == false){
                amountGuesses++;
                updateGuesses();

                if(amountGuesses == allowedGuesses){

                endgame = true;
                updateBillboardContainer("Like Obi Won, you have failed!!")
            }
            else {
                updateBillboardContainer("I have the high ground! INCORRECT!");

            }
        }
        else {
            var totalLetters = 0;
            answers[currentQuestion].split('').forEach(function(curLetter){
                if(isLetter(curLetter)){
                    totalLetters++;

            }

        });
        if(totalLetters == correctGuesses){
            restartLevel = true;
            updateBillboardContainer("You are the Chosen One!");
        }       
    
        }
    
        }
    }

}

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);

}
