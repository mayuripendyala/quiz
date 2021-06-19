function switchPage(from, to) {
    var location= window.location.pathname;
   location = location.replace(from,to);
     window.location.assign(location);
  }

  var allQuestions=[{
       question : "What is the element called that can continue to execute a block of code as long as the specified condition remains TRUE?",
       options  : ["1.Repeater","2.Loop","3.Debugger","4.clone"],
       answer : "2.Loop"

    },
    {
        question : "What is the element used – and hidden – in code that explains things and makes the content more readable?",
        options : ["1.Comments","2.Comparisons","3.Notes","4.Quotations"],
        answer : "1.Comments"
    },
    {
        question : "In JavaScript, what element is used to store multiple values in a single variable?",
        options : ["1.Strings","2.Arrays","3.Variables","4.Functions"],
        answer : "2.Arrays"       
    },
    {
        question : "In JavaScript, what is a block of code called that is used to perform a specific task?",
        options : ["1.Declaration","2.Variable","3.String","4.Function"],
        answer : "4.Function"
    }];

var timerElement = document.querySelector(".time-count");
var startButton = document.querySelector(".start-button");
var quizBlock = document.querySelector(".quiz-start");
var questionElement =document.querySelector(".question");
var optionElement = document.querySelector(".optionsUl");
var questionsElement =document.querySelector(".questions");
var containerElement =document.querySelector(".container");

var line =document.querySelector(".hLine");

var indx=0;
var timerCount=40;
var currentScore ;
var timer;

var allScores = [];

var createEl = document.createElement("p");
createEl.setAttribute("id","createP");



startButton.addEventListener("click",start);

function start(){
    hideDiv(quizBlock);
    displayQuestions(indx);
    startTimer();
}

function startTimer() {
    // event.preventDefault();
    
    timer = setInterval(function(){       
        // console.log(timerCount);

        timerElement.textContent =timerCount;
        if(timerCount === 0 ) {
            currentScore=timerCount;
            // clearInterval(timer);
            quizOver();
        }
        else{
            timerCount--;
        }

    },1000);
}

function hideDiv (selectedDiv){
    selectedDiv.setAttribute("style", "display:none;");


}

function minusTime() {
    var penality=10;
    timerCount =timerCount - penality;
    if(timerCount < 0){
        timerCount=0;
    }
}

function clearPrevQuestion() {
    questionElement.textContent='';
    optionElement.textContent='';
    

}

function displayQuestions(indx) {

        clearPrevQuestion();
        console.log(indx);
        questionElement.textContent=allQuestions[indx].question;   

        var codeOptions =allQuestions[indx].options;
        // console.log(questionElement);
        codeOptions.forEach(function(option){
                var buttonEl = document.createElement("button");
                buttonEl.setAttribute("style","colour:white;display:block;margin:5px 0px;background-color: indigo;");
                buttonEl.focus();
                buttonEl.innerText = option;
                optionElement.appendChild(buttonEl);
                buttonEl.addEventListener("click",compare);
        });

}
// to compare the answer with chosen option
function compare(event) {
    var element = event.target;
    createEl.textContent='';

    if(element.matches("button")){
        

        if(element.textContent == allQuestions[indx].answer){
            createEl.textContent="Correct!";
        }
        else{
            minusTime();
            createEl.textContent="Wrong!";
        }

    }
    indx++;
    if(indx == allQuestions.length){
        currentScore=timerCount;
        quizOver();
        

    }
    else{
       
        displayQuestions(indx);
    }
    line.setAttribute("style","display:block");
    containerElement.appendChild(createEl);

  
}
// This is to get the details of user when quiz finished
function quizOver() {
    clearInterval(timer);
    clearPrevQuestion();
    
    timerElement.textContent =timerCount;

    var createH1= document.createElement("H1");
    createH1.setAttribute("class","createH1");
    createH1.textContent="Game Over!"

    questionsElement.appendChild(createH1);

    var createP= document.createElement("P");
    createP.setAttribute("class","createP");

    questionsElement.appendChild(createP);

    //Calculating time remaining and replace it with the score
        createP.textContent="Your Score is : " + currentScore;

    var createLabel =document.createElement("label");
    createLabel.setAttribute("class","createLabel");
    createLabel.textContent ="Enter your initials: ";

    questionsElement.appendChild(createLabel);

    var createInput =document.createElement("input");
    createInput.setAttribute("class","createInput");
    createInput.setAttribute("type","text");
    createInput.textContent = "";

    questionsElement.appendChild(createInput);
    

    var createSubmit =document.createElement("button");
    createSubmit.setAttribute("class","createSubmit");
    createSubmit.setAttribute("type","submit");
    createSubmit.textContent = "Submit";

    questionsElement.appendChild(createSubmit);

   
    createSubmit.addEventListener("click",function(){
        var inputVal = createInput.value;

        if(inputVal === "") {

            console.log("No Initials Entered");
        }
        else{
                var finalScore ={
                    initials:inputVal,
                    score:currentScore
                }

                console.log(finalScore);
                var allScores =localStorage.getItem("allScores");
                if(allScores === null) {
                    allScores = []; 
                }else {
                    allScores =JSON.parse(allScores);
                }

                allScores.push(finalScore);
                var newScore = JSON.stringify(allScores);
                localStorage.setItem("allScores",newScore);
                switchPage("index","highscore");

        }
    


    });




}





