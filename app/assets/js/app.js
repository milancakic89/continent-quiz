const Game = require('./includes/_Game');
const Questions = require('./includes/_Questions');

const newGame = new Game();
const newQuestions = new Questions();

/*
    NOTE: I HAVE DESIDED TO MAKE ENTIRE GAME TROUGHT JS, I COULD USE EASIER APROACH
          WITH MORE HTML AND CSS, AND LESS JS... PRACTICING VANILA JS IS MY MAIN GOAL HERE,
          AND I WOULD APPRITIATE NOTICE ON ANY MISTAKE I MADE.
*/

async function getQuestions(){

    const result = await fetch('https://api.myjson.com/bins/a6da9');
    const questions = await result.json();
    return questions;
}
// fetching questions
getQuestions()
.then(result=>{
    // storing questions
    newQuestions.setQuestions(result);
});

//adding an event listener to play button at start
document.querySelector('#play').addEventListener('click', letsPlay);

function letsPlay(){
    //checking if the questions are stored
    if(newQuestions.getQuestions() !== null){

        //calling the function that will handle questions 
        getQuestionsList();
    }; 
}

// function for creating correct answer and two random wrong answers
function getQuestionsList(){

    //since this function will be called more than once, making sure game is not over
    if(newGame.isOver() !== true && newGame.getCounter() <5){

        //storing all questions in variable
        let questionsList = newQuestions.getQuestions();

        //array for 2 wrong questions
        let wrongAnswers = [];

        //storing one random variable to be a correct answer
        let correctAnswer = questionsList[Math.round(Math.random() * questionsList.length)];

        //storing correct answer for later use 
        newGame.setCorrectAnswer(correctAnswer.continent);

        //filtering questions, removing same continents as correct answer
        let firstWrongQuestionList = questionsList.filter(item => item.continent !== correctAnswer.continent);

        //storing random wrong question from filtered array
        let firstWrongQuestion = firstWrongQuestionList[Math.round(Math.random() * firstWrongQuestionList.length)];

        //storing wrong answer into array
        wrongAnswers.push(firstWrongQuestion);

        //filtering array again to remove the first wrong answer continent as well
        let secondWrongQuesionList = firstWrongQuestionList.filter(item=> item.continent !== firstWrongQuestion.continent);

        //storing second wrong answer into array
        let secondWrongQuesion = secondWrongQuesionList[Math.round(Math.random() * secondWrongQuesionList.length)];

        //pushing second wrong answer into array as well
        wrongAnswers.push(secondWrongQuesion);

        //we have one correct, and two wrong question, we can move on
        renderQuestion(correctAnswer, wrongAnswers);
    }else{
        //show result screen
    }
}
//
function renderQuestion(correctAnswer, wrongAnswers){
    //rendering stuff
    //current question to be displayed;
    let questionOnScreen = newGame.getCounter();

    /*
         only if current counter is 0 means we have pressed play button
         for the first time, and we want to remove it from screen
    */
    if(questionOnScreen === 0){
            document.querySelector('.icons').remove();
    }
    //clean screen, this will be called on each question, we clean previous, then we render next
    let currentScreen = document.querySelector('#game-screen');
        while(currentScreen.firstChild){
            currentScreen.removeChild(currentScreen.firstChild);
        }
    
    //screen is cleaned, we can now render question
    newGame.updateCounter();

    //current question on screen
    questionOnScreen = newGame.getCounter();
   
    //targeting main div, we will append all on this later
    let screen = document.querySelector('#game-screen');

    //targeting information text, question counter will be stored here
    let info = document.querySelector("#info");

    //adding class for some styling
    info.className = 'in-game';

    //adding current question value to be displayed
    info.textContent = `Question: ${questionOnScreen}`;

    //creating img element
    let img = document.createElement('img');
    img.className = 'main__screen__img';
    img.style = "width:90%; min-height:300px";
    img.src = correctAnswer.image;

    screen.appendChild(img);

    let buttonOne = document.createElement('button');
    let buttonTwo = document.createElement('button');
    let buttonThree = document.createElement('button');

    buttonOne.className = 'main__screen__button buttonOne';
    buttonTwo.className = 'main__screen__button buttonTwo';
    buttonThree.className = 'main__screen__button buttonThree';

    /*
        We cant just append buttons now, the answer would be allways on same spot.
        We need to mix them randomly.
        idea: 
        Put all answers into array. Pick random 1 from 3 and put him into variable,
        thats the first random question pick. Now we need to remove that question from array,
        we have it in variable, and for the next pick, we dont want that same question as
        an option. So filter array to remove that question, now we have array with 2, random again
        bettwen those 2, assign it to variable, thats second random question. Filter again,
        remaining question is the third question... Now we append one by one, and we dont know
        witch one is actualy correct.
    */

    let questionListWithThree = [correctAnswer, wrongAnswers[0], wrongAnswers[1]];
    let firstContinent = questionListWithThree[Math.round(Math.random()*2)] 

    let questionListWithTwo = questionListWithThree.filter(item=> item.continent !== firstContinent.continent);
    let secondContinent = questionListWithTwo[Math.round(Math.random())];

    let questionListWithOne = questionListWithTwo.filter(item=> item.continent !== secondContinent.continent);
    let thirdContinent = questionListWithOne[0];

    //adding continents as values
    buttonOne.value = firstContinent.continent;
    buttonTwo.value = secondContinent.continent;
    buttonThree.value = thirdContinent.continent;

    //this fields will help later with css when we click on button
    buttonOne.id = firstContinent.continent;
    buttonTwo.id = secondContinent.continent;
    buttonThree.id = thirdContinent.continent;
    
    //adding text to buttons
    buttonOne.textContent = firstContinent.continent;
    buttonTwo.textContent = secondContinent.continent;
    buttonThree.textContent = thirdContinent.continent;

    //adding event listeners
    buttonOne.addEventListener('click', checkAnswer);
    buttonTwo.addEventListener('click', checkAnswer);
    buttonThree.addEventListener('click', checkAnswer);

    screen.appendChild(buttonOne);
    screen.appendChild(buttonTwo);
    screen.appendChild(buttonThree);
}



function checkAnswer(e){
   let picked = e.target.value;
   let correct = newGame.getCorrectAnswer();

   //if we got correct answer, that button will be displayed green
   //but if we not, we need to make button red, but also correct green
   //we will use this variable to check for that
   let gotIt;
   
   if(picked === correct){
       newGame.updateScore(750);
       gotIt = true;
   }
   //creating button NEXT
   let next = document.createElement('button');
   next.className = "main__screen__next";
   next.textContent = "Next";

   //assigning the same function as play at the beggining to event listener-
   //we updated counter and score if needed, we will start same process again
   next.addEventListener('click', getQuestionsList);

   /*
    here is why i created ids on those buttons before.


   */
   let a = document.getElementById(`${picked}`);
   let b = document.getElementById(`${correct}`);

   if(gotIt){
        b.classList.add('correct-answer')
   }else{
        a.classList.add('wrong-answer');
        b.classList.add('correct-answer')
   }


/*
   TARGET MAIN DIV AND MAKE BUTTONS BE DISABLED
   a.classList.add(a.id === correct ? 'correct-answer' : 'wrong-answer');
   b.classList.add(b.id === correct ? 'correct-answer' : 'wrong-answer');

*/

   let screen = document.querySelector('#game-screen');


   screen.appendChild(next)
   

}

