// hooks into the DOM
var buttonContainer = document.querySelector(".buttonContainer");
var welcomeButton = document.querySelector("#welcomeButton");
var welcomeDiv = document.querySelector("#welcome");
var timerEl = document.querySelector(".timer");
var gameOver = document.querySelector(".gamOver");
var correct = document.querySelector(".correct");
var wrong = document.querySelector(".wrong");
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

var QuestionIndex = 0; //The question the user is on. Gets updated as questions are answered

welcomeButton.addEventListener("click", function () {
	//reveals the button container and hides the Welcome div when a click is received
	buttonContainer.classList.remove("hidden");
	//buttonContainer.classList.add("hidden");
	welcomeDiv.classList.add("hidden");

	//THIS IS THE TIMER   \----------------------------------------------
	var secondsLeft = 20;
	function timer() {
		var tick = setInterval(function () //setInterval is a built in time handler
		{
			secondsLeft--;
			timerEl.textContent = secondsLeft + "seconds remaining in this quiz";
			if (secondsLeft === 0) {
				console.log("timer is out of time");
				clearInterval(tick);
				gameOver();
			}
		}, 1000); //this number is the millisecond interval set by setInterval
	}
	timer();
	//-------------------------------------------------------------------------------------
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

		QuestionIndex = QuestionIndex + 1;
		console.log(QuestionIndex);
		if (QuestionIndex == Questions.length) {
			//the last question does't get asked, but using Questions.length + 1  doesn't work  either because , there is no such element in the array
			buttonContainer.classList.add("hidden");
			//get the score
			//clear the timer
			gameOver();
		}
	}

	makeQuestion();

	//Event and event response------------------------
	buttonContainer.addEventListener("click", function (event) {
		var clickedOnText = $(event.target).text(); //grabs the user's choice text and calls it clickedOn

		var ivalue = event.target.dataset.ivalue; //records the ivalue (question number, basically)

		if (clickedOnText === Questions[ivalue].TA) {
			correct.classList.remove("hidden");
			//			wrong.classList.add("hidden");
			makeQuestion();
		} else {
			wrong.classList.remove("hidden");
			correct.classList.add("hidden");
			makeQuestion();

			//subtract some time from the timer
		}

		//from class about removing a list item (removing the parent and itself)
		//student event delegation  handle remove item
		//$(event.target).parent().remove();
	});
});

function gameOver() {
	buttonContainer.classList.add("hidden");
	gameOver.classList.remove("hidden");
	//Save the score to local storage
}
//----------------------------------------------------------------------
//SAVING HIGH SCORES TO LOCAL STORAGE

//JSON.parse(window.localStorage.getItem("highscores")) and
//append the new score to the array
// send your appended array to local storage
//window.localStorage.setItem("highscores", JSON.stringify(highscores))

//Have a link to the high scores
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
