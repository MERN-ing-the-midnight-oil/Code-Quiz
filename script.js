// hooks into the DOM
var buttonContainer = document.querySelector(".buttonContainer");
var welcomeButton = document.querySelector("#welcomeButton");
var welcomeDiv = document.querySelector("#welcome");
var timerEl = document.querySelector(".timer");
var gameOver = document.querySelector(".gameOver");
var correct = document.querySelector(".correct");
var wrong = document.querySelector(".wrong");
//var scores = document.querySelector("#scores");

var tick; //declared here for global scope

var storedScores = JSON.parse(localStorage.getItem("scoresArray")); //storedScores is the Key in the value pair in local storage
var gameScores = []; //is the array where we construct the updated version of storedScores to pass back to local storage at game End
var endArray = []; // a place to combine the users end score and initials that they enter
if (storedScores !== null) {
	//if there is something already in storedScores,
	gameScores = storedScores; //give it to gameScores to build upon.
}

var secondsLeft = 40; //The number of seconds the timer starts with

var Questions = [
	{
		Q: "Javascript is an ____ language?",
		Choices: [
			"Object-Reduced",
			"Objectified",
			"Object-Oriented",
			"Object-Based",
		],
		TA: "Object-Oriented",
	},
	{
		Q: "Which of the following is also known as a conditional expression?",
		Choices: [
			"Alternative to if-else",
			"Switch statement",
			"if-then-else",
			"immediate if",
		],
		TA: "immediate if",
	},
	{
		Q: "In JavaScript, what is a block of statement?",
		Choices: [
			"Conditional Block",
			"block that combines statements into a compound statement",
			"both a conditional block and a single statement",
			"A block that contains a single statement",
		],
		TA: "block that combines statements into a compound statement",
	},
	{
		Q: "When an interpreter encounters an empty statement, what will it do?",
		Choices: [
			"Show a warning",
			"Prompts to complete the statement",
			"Throws an error",
			"Ignores the statements",
		],
		TA: "Ignores the statements",

		Q: "The 'function' and 'var' are known as:",
		Choices: [
			"Keywords",
			"Key commands",
			"Declaration Statements",
			"Prototypes",
		],
		TA: "Keywords",
		Q: "Which of the following variables takes precedence over the others if the names are the same??",
		Choices: ["Preprocessor", "Triggering Event", "RMI", "Function/Method"],
		TA: "Function/Method",

		Q: "xxxxxxxxxxxx?",
		Choices: ["yyyyyyyyyyy", "wwwwwwwwwwww", "hhhhhhhhhhhhh", "fffffffffffff"],
		TA: "wwwwwwwwwwww",
	},
];

//var QuestionIndex = 0; //use this line to have the quiz start with the first question in the Questions array
var QuestionIndex = Math.floor(Math.random() * Questions.length); //use this line instead to have the quiz start with a random question
console.log(QuestionIndex);

//The following function ends the game by hiding unwanted elements , stopping the timer, and storing the users initials and high score in local storage
function endGame() {
	buttonContainer.classList.add("hidden");
	correct.classList.add("hidden");
	wrong.classList.add("hidden");
	gameOver.classList.remove("hidden");
	//timerEl.classList.add("hidden");
	//The following takes the end time and user initials , combines them into a small array, and adds that array to the gameScores array.
	var endTime = 0;
	endTime = secondsLeft;
	clearInterval(tick);
	var endInitials = window.prompt(
		"Please enter your initials for the score board!"
	);
	endArray.push(endInitials); //here I"m taking the users initials and end time and pairing them in a small array called gameScores
	endArray.push(endTime);
	gameScores.push(endArray); //<gameScores is supposed to be an array, why does JS want to treat it like a function?
	//The following takes the small  gameScores array and stores in in local storage
	localStorage.setItem("scoresArray", JSON.stringify(gameScores));
	window.alert("high scores: " + gameScores);
	clearInterval(tick); //dont know why I should ahve to do this
}

//This is the game timer. Running out of time is one way the game ends.
function timer() {
	tick = setInterval(function () //setInterval is a built in time handler
	{
		secondsLeft--;
		//console.log("the timer has "secondsLeft);
		timerEl.textContent = secondsLeft + "seconds remaining in this quiz";
		if (secondsLeft < 1) {
			clearInterval(tick);
			endGame(); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ENDS THE GAME WHEN TIMER RUNS OUT
		}
	}, 1000);
}

function makeQuestion() {
	var currentQuestion = Questions[QuestionIndex]; //currentQuestion is always an array consisting of a Q, a Choices, and a TA.  QuestionIndex tells it which set to get
	var buttonDiv = document.createElement("div");
	buttonContainer.appendChild(buttonDiv); //makes a button div in the Dom

	buttonDiv.innerHTML = Questions[QuestionIndex].Q; //gives said button some question text
	for (let i = 0; i < currentQuestion.Choices.length; i++) {
		//makes sure that no more or fewer buttons are made than needed for the current question
		var ghostButton = document.createElement("button"); //makes buttons for the multiple choice answers
		ghostButton.innerHTML = Questions[QuestionIndex].Choices[i]; // grabs each correct multiple choice text from the questions array
		ghostButton.dataset.ivalue = QuestionIndex; //gives each button a datum equal to the question number
		//ghostButton.setAttribute("ivalue",QuestionIndex) would have been another way to do it.
		buttonDiv.appendChild(ghostButton); //appends each button to the DOM
	}
}
//THIS FUNCTION ENDS THE QUIZ WITH A DISPLAY AND WILL SOMEDAY SOON SAVE THE SCORE

//THIS FUNCTION WAITS FOR A CLICK TO START THE QUIZ
welcomeButton.addEventListener("click", function () {
	//reveals the button container and hides the Welcome div when a click is received
	buttonContainer.classList.remove("hidden");
	//buttonContainer.classList.add("hidden");
	welcomeDiv.classList.add("hidden");

	timer(); // CALLS THE TIMER FUNCTION

	makeQuestion(); // CALLS THE MAKE QUESTION FUNCTION, PUTTING QUESTION NUMBER ONE IN BUTTONS IN THE DOM AND WAITING FOR A CLICK
});
buttonContainer.addEventListener("click", function (event) {
	var clickedOnText = $(event.target).text(); //grabs the user's choice text and calls it clickedOn
	var ivalue = event.target.dataset.ivalue; //records the ivalue (question number, basically)
	if (clickedOnText === Questions[ivalue].TA) {
		//compares clicked on text to the correct answer
		correct.classList.remove("hidden"); //reveal the message in "correct" class
		wrong.classList.add("hidden"); //hide the "wrong" answer if it isn't already hidden
	} else {
		wrong.classList.remove("hidden"); //reveals the "wrong" class message text
		correct.classList.add("hidden"); // hides the "correct!" message text if it isn't already hidden
		secondsLeft = secondsLeft - 10; //penalizes the user for a wrong answer by subtracting time left
	}

	//	QuestionIndex = QuestionIndex + 1; //uncomment this line to just let the questions appear in the order that they are in the Questions array
	QuestionIndex = Math.floor(Math.random() * Questions.length); //Makes questions appear in random order, could have some questions multiple times, some questions might not appear

	if (QuestionIndex < Questions.length) {
		makeQuestion();
	} else {
		endGame();
	}
});
//<--end of the event listener/handler

//Maybe usefull stuff
//from class about removing a list item (removing the parent and itself)
//student event delegation  handle remove item
//$(event.target).parent().remove();

//----------------------------------------------------------------------

//----------------------------------------------------------------------------------
//*GIVEN I am taking a code quiz
//WHEN I click the start button
////THEN a timer starts and I am presented with a question
//WHEN I answer a question
//THEN I am presented with another question
//WHEN I answer a question incorrectly
//THEN time is subtracted from the clock
//WHEN all questions are answered or the timer reaches 0
//THEN the game is over
//WHEN the game is over
//THEN I can save my initials and score
