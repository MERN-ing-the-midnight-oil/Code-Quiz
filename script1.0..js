

//A Countdown Timer----------------------------------------------------------

// HOOKS to the UI: gains access to DOM elements
// Selects element by class
var timeEl = document.querySelector(".time");

// Selects element by id
var mainEl = document.getElementById("main");

// STATE Variables: keeps track of the seconds left in the countdown
var secondsLeft = 5;

// MAIN function: contains the initial actions to take upon load
function setTime() {
  // Sets interval in variable

  // Create Events: setInterval generates events at specified interval
  var timerInterval = setInterval(function () {
    // EVENT HANDLER: this function is automatically called when the interval event happens

    // Update State
    secondsLeft--;

    // Update UI
    timeEl.textContent = secondsLeft + " seconds left ";

    // Check for exit state: Are we done?
    if (secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      sendMessage();
    }
  }, 1000); //milliseconds
}

// Helper Function to create and append colorsplosion image
function sendMessage() {
  timeEl.textContent = "Game Over";
  //var imgEl = document.createElement("img");
  //imgEl.setAttribute("src", "images/image_1.jpg");
  //mainEl.appendChild(imgEl);
}

// Start the MAIN function
setTime();







//---------------------------- Multiple Choice Questions--------V


//put multiple choice questions in an array?
// question arrays are of the form [question, index of correct answer, a, b, c, d]
 var q1 = ["what is one plus one?", 3, "one", "two", "three", "four"]
 var q2 = ["what is the capital of Alaska?", 2,"Juneau", "two", "three", "four"]
 var q3 = ["what is your favorite color?",2, "green", "two", "three", "four"]
 var q4 = ["what is a diatom?", 4, "two", "three", "plankton", "four"]
 var q5 = ["what is water made from?", 5, "one", "two", "three", "H2O"]
 var q6 = ["what is the meaning of life?", 2, "42", "two", "three", "four"]

var qs = [q1,q2,q3,q4,q5,q6]//This is my array of arrays so I can refer easily to questions and answers


//---------------------------- Multiple Choice Buttons--------V
var body = document.body;
var questionNumber = 0
//Create a question div 
var questionEl = document.createElement("div")
// creates answer buttons
var button1El = document.createElement("button");
var button2El = document.createElement("button");
var button3El = document.createElement("button");
var button4El = document.createElement("button");

//populates text to question div and buttons elements
function nextquestion (){
questionEl.textContent = qs[questionNumber][0]; 

  button1El.textContent = qs[questionNumber][2];
  button2El.textContent = qs[questionNumber][3];
  button3El.textContent = qs[questionNumber][4];
  button4El.textContent = qs[questionNumber][5];
 button1El.addEventListener("click", function (event) { })//event listeners use anonymous functions //better to declare function separately 



}

 
 // console.log (event.target.textContent) 
  var choice = (event.target.textContent)//gets the chosen answer text so we can compare it to the correct answer at index 1
  var answerIndex = qs[i][1] //should have the index number of the correct answer which I put in the second position of each question array
  if (choice === qs[answerIndex]){
    

  }
   //then  say "good job" , i++ and re-run nextquestion
})


nextquestion() //calls the function after I defined it

//Append the question div to the body
body.appendChild(questionEl);
//append the buttons to the div
questionEl.appendChild(button1El);
questionEl.appendChild(button2El);
questionEl.appendChild(button3El);
questionEl.appendChild(button4El);





//so next call the compare function and advance the counter variable
function compare (){
//if choice is equal to the correct answer
//then advance to the next question
//call the next question function
//advance the counter variable

}