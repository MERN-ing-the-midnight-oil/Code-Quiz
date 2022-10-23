// hooks into the DOM
var buttonContainer = document.querySelector(".buttonContainer");
var welcomeButton = document.querySelector("#welcomeButton");
var welcomeDiv = document.querySelector("#welcome");
var timerEl = document.querySelector(".timer");
var gameOver = document.querySelector(".gameOver");
var correct = document.querySelector(".correct");
var wrong = document.querySelector(".wrong");
//var scores =document.querySelector(".scores");//not sure if I need this yet or at all

//STORED SCORES SCORES SCORES SCORES
var storedScores = JSON.parse(localStorage.getItem("scoresArray")); //get the stored scores array from local storage
var gameScores = ["asdf", "123"];
var endArray = [];
if (storedScores !== null) {
	gameScores = storedScores;
}
console.log("the Game Score is starting with " + gameScores);

var secondsLeft = 50; //The number of seconds the timer starts with
var QuestionIndex = 0; //The question the user is on. Gets updated as questions are answered

var Questions = [
	{
		Q: "What is Alaska's Capital City?",
		Choices: ["Anchorage", "Fairbanks", "Olympia", "Juneau"],
		TA: "Juneau",
	},
	{
		Q: "How many roads must a man walk down, before you call him a man?",
		Choices: ["Forty-two", "Sixteen", "Seventy-Seven", "Blowing in the Wind"],
		TA: "Blowing in the Wind",
	},
	{
		Q: "How will the world end?",
		Choices: ["Fire", "Ice", "A fizzle", "A bang"],
		TA: "Fire",
	},
	{
		Q: "Why did the chicken cross the road?",
		Choices: [
			"Better View",
			"Sour Grapes",
			"To race the Hare",
			"Greener Grass",
		],
		TA: "Sour Grapes",
	},
];

function endGame() {
	buttonContainer.classList.add("hidden");
	gameOver.classList.remove("hidden");
	timerEl.classList.add("hidden");

	//The following takes the end time and user initials , combines them into a small array, and adds that array to the gameScores array.
	var endTime = 0;
	endTime = secondsLeft;
	var endInitials = window.prompt(
		"Please enter your initials for the score board!"
	);
	endArray.push(endInitials); //here I"m taking the users initials and end time and pairing them in a small array called gameScores
	endArray.push(endTime);
	gameScores.push(endArray); //<gameScores is supposed to be an array, why does JS want to treat it like a function?
	//The following takes the small  gameScores array and stores in in local storage
	localStorage.setItem("scoresArray", JSON.stringify(gameScores));
}

function timer() {
	var tick = setInterval(function () //setInterval is a built in time handler
	{
		secondsLeft--;
		timerEl.textContent = secondsLeft + "seconds remaining in this quiz";
		if (secondsLeft < 1) {
			//clearInterval(tick);
			endGame(); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ENDS THE GAME WHEN TIMER RUNS OUT
		}
	}, 1000);
}

function makeQuestion() {
	var currentQuestion = Questions[QuestionIndex]; //currentQuestion is always an array consisting of a Q, a Choices, and a TA.  QuestionIndex tells it which set to get
	var buttonDiv = document.createElement("div"); //makes a button div in the Dom
	buttonContainer.appendChild(buttonDiv);
	buttonDiv.innerHTML = Questions[QuestionIndex].Q;
	for (let i = 0; i < currentQuestion.Choices.length; i++) {
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

	//THIS EVENT HANDLER WAITS FOR A CLICK ON A MULTIPLE CHOICE BUTTON CREATED IN THE PREVIOUS STEP AND CHECKS IF THE USER CHOICE IS CORRECT, AND DOES STUFF BASED ON THAT
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
			secondsLeft = secondsLeft - 10; //
		}

		QuestionIndex = QuestionIndex + 1;

		if (QuestionIndex < Questions.length) {
			makeQuestion();
		} else {
			endGame(); //ENDS THE GAME WHEN ALL QUESTIONS HAVE BEEN ANSWERED
			clearInterval(tick); //this was my unsuccessful attempt to keep the timer from continuing runnign down to zero and ending the game... agian.
		}
	});
}); //<--end of the event listener/handler

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
