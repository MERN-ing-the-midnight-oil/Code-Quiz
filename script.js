// hooks into the DOM
var buttonContainer = document.querySelector(".buttonContainer");
var welcomeButton = document.querySelector("#welcomeButton");
var welcomeDiv = document.querySelector("#welcome");
//var question_1Prompt = document.querySelector("#question_1");

welcomeButton.addEventListener("click", function () {
	//reveals the button container and hides the Welcome div when a click is received
	buttonContainer.classList.remove("hidden");
	welcomeDiv.classList.add("hidden");

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
	var QuestionIndex = 0; //The question the user is on. Update this Index after a click on text exists. QUESTION INDEX <-------------------------------!
	//THIS FUNCTION DISPLAYS ONE QUESTION AND ITS POSSIBLE ANSWERS, AND THEN ADVANCES TO THE NEXT QUESTION UPON AN ANSWER CLICK
	console.log(QuestionIndex);
	//check to see if Questions[QuestionIndex] has a value or not.

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
			console.log("Time to end the quiz");
		}
	}

	makeQuestion();

	buttonContainer.addEventListener("click", function (event) {
		var clickedOnText = $(event.target).text(); //grabs the user's choice text and calls it clickedOn

		var ivalue = event.target.dataset.ivalue; //records the ivalue (question number, basically)

		if (clickedOnText === Questions[ivalue].TA) {
			console.log("great job");
			makeQuestion();
		} else {
			console.log("sorry, try again");
			makeQuestion();
			//try again!
			//subtract some time from the timer
		}

		//from class about removing a list item (removing the parent and itself)
		//student event delegation  handle remove item
		//$(event.target).parent().remove();
	});
});
