// hooks into the DOM
var buttonContainer = document.querySelector(".buttonContainer");
var welcomeButton = document.querySelector("#welcomeButton");
var welcomeDiv = document.querySelector("#Welcome");
var question_1Prompt = document.querySelector("#question_1");

var buttonsPer = 4; //The number of buttons per question
var quantityOfQuestions = 4; //The number of questions in this quiz
//Quiz Maker. This will make a quiz' worth of questions with buttons
for (let I = 0; I < quantityOfQuestions; I++) {
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
	//Single quizquestion maker. This section will repeatedly make a div with 4 buttons
	var buttonDiv = document.createElement("div"); //makes a question div
	buttonContainer.appendChild(buttonDiv); //appends buttonDiv to buttonContainer
	buttonDiv.innerHTML = Questions[I].Q; // prints the relevant quiz question text onto each button
	for (let i = 0; i < buttonsPer; i++) {
		//prints the relevant quiz multiple choice answer text onto each button
		var ghostButton = document.createElement("button"); //makes a button
		ghostButton.innerHTML = Questions[I].Choices[i]; // grabs the right text from the questions array
		ghostButton.dataset.ivalue = I; //gives the button a data attribute of iValue equal to the outer loop variable (so, essentially the question number)
		buttonDiv.appendChild(ghostButton); //appends it to div above , which is appended to the body
		console.log(ghostButton);
	}
}

welcomeButton.addEventListener("click", function () {
	//reveal the hidden buttons and hide the Welcome div when click received by removing hidden and adding hidden
	buttonContainer.classList.remove("hidden");
	welcomeDiv.classList.add("hidden");
});

buttonContainer.addEventListener("click", function (event) {
	var clickedOnText = $(event.target).text(); //grabs the user's choice text and calls it clickedOn

	//var iValue = $(event.target).dataset.ivalue();
	//var iValue = event.target.dataset.ivalue();
	//var iValue = event.target.getAttribute("data-ivalue");
	var iValue = event.target.dataset.ivalue;
	console.log(iValue);
	//	if clickedOntext == Questions[data--ivalue].TA)[];
});
