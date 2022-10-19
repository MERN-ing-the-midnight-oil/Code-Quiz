// buttonContainer will have event listener
var buttonContainer = document.querySelector(".buttonContainer");
var welcomeButton = document.querySelector("#welcomeButton");
var welcomeDiv = document.querySelector("#Welcome");
var question_1Prompt = document.querySelector("#question_1");

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

console.log(question_1Prompt);
console.log(Questions[0].Q);
question_1Prompt.textContent = Questions[0].Q;
Questions[0].Choices;
console.log(Questions[0].Choices);

//loop through the choices array
//for each , createElement , google how to create a button element
//for each element created, append to the DOM in buttonContainer

// welcomeButton.addEventListener("click", function () {
//reveal the hidden buttons
// buttonContainer.classList.remove("hidden");
// welcomeDiv.classList.add("hidden");
//hide the welcome div
// });

// buttonContainer.addEventListener("click", function (event) {
// 	var clickedOn = event.target;

// if (clickedOn.matches("button")) {
//get the value of the button's data-veracity attribute (also give each button a "veracity" attribute)

//an idea , possibility
// var veracity = clickedOn.getAttribute("data-veracity");

// if (veracity === "true") {
// 	//Display "Good Job"
// 	//Advance to next question and next answers
// 		}
// 	}
// });
/*
  2. Declare variables: DOM hooks
    - In the Javascript, create variables for each of the DOM elements that will display feedback
    - create variables for the elements that will receive input
    - set each variable to its DOM element like:
    var theElement = document.querySelector([CSS Selector for your element]);
 */

/*
 3. Declare variables: state
    - What are the datq that need to be kept track of? 
    - Global state variables sometimes emerge while working on event handlers (i.e., it
      becomes clearer what needs to be tracked across the application)
    - state variables:
      "State describes the status of the entire program or an individual
       object. It could be text, a number, a boolean, or another data type.

       It’s a common tool for coordinating code. For example, once you update state, a bunch of different functions can instantly react to that change."
       https://www.freecodecamp.org/news/state-in-javascript-explained-by-cooking-a-simple-meal-2baf10a787ee/
    - Does the state variable need to be global (i.e., used by all the event handlers) or does it only need to be local
      to the event handler?
*/

/*
 4. Declare variables: constants
    - What are the data the application needs that won't change?
    - e.g. Math constants, pre-created content (maybe the questions and answers?)
*/

/*
 5. Identify events
    - Based on the variables created in Step 2, create event handlers

      theElement.addeventListener([EVENT TYPE], function(event){
        // do stuff here...
      })

    ...where [EVENT TYPE] is "click" or "change" or "keydown" or whatver

    - Identify the things that should happen in the click handlers
    - Rememember: there is always a page load event. Usually have a function for anything
      that needs setting up at the beginning, before people interact with the 
      page. Start the execution of this setup function at the bottom of page
*/

/*
 6. Refactor
    - identify tasks that can be broken into their own functions, outside the event handlers
    - Are there tasks that more than one event handler share?
*/
