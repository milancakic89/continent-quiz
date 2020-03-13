const Game = require('./includes/_Game');
const Questions = require('./includes/_Questions');

const newGame = new Game();

let questionsList = null;

let scoreOne = document.getElementById('best-scores-first');
let scoreTwo = document.getElementById('best-scores-second');
let scoreThree = document.getElementById('best-scores-third');

let homeScreen = document.getElementById('home-screen');
let mainScreen = document.getElementById('startscreen');
let questionScreen = document.getElementById('question-screen');
let resultScreen = document.querySelector('.result__screen');

let buttonPlay = document.getElementById('play');
let buttonPlayAgain = document.getElementById('play-again');
let buttonBackToStart = document.getElementById('back-to-main');
let homeButtonPlay = document.getElementById('home-button-play');
let buttonGoToHome = document.getElementById('go-to-home');

let buttonOne = document.querySelector('.buttonOne');
let buttonTwo = document.querySelector('.buttonTwo');
let buttonThree = document.querySelector('.buttonThree');
let buttonNext = document.querySelector('.buttonNext');

let questionCounter = document.getElementById('question-count');
let img = document.getElementById('image-url');


/*
    NOTE: I HAVE DESIDED TO MAKE ENTIRE GAME TROUGHT JS, I COULD USE EASIER APROACH
          WITH MORE HTML AND CSS, AND LESS JS... PRACTICING VANILA JS IS MY MAIN GOAL HERE,
          AND I WOULD APPRITIATE NOTICE ON ANY MISTAKE I MADE.
*/
buttonGoToHome.addEventListener('click', goToHome);
homeButtonPlay.addEventListener('click', jumpToLedderboard);


function goToHome(){
    homeScreen.classList.remove('hidden');
    mainScreen.classList.add('hidden');
    getLocalStorage();
}
function jumpToLedderboard(){
    homeScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
    getLocalStorage();
}


// fetching questions
Questions.getQuestions()
.then(result=>{
    // storing questions
    questionsList = result;
   //- newQuestions.setQuestions(result);
});

//adding an event listener to play button at start
buttonPlay.addEventListener('click', letsPlay);

function letsPlay(){
    //checking if the questions are stored
   if(questionsList !== null){
        //calling the function that will handle questions 
        getQuestionsList();
    }; 
}

// function for creating correct answer and two random wrong answers
function getQuestionsList(){
     buttonOne.disabled = false;
     buttonTwo.disabled = false;
     buttonThree.disabled = false;
     buttonOne.className = 'question__button buttonOne';
     buttonTwo.className = 'question__button buttonTwo';
     buttonThree.className = 'question__button buttonThree';
     buttonNext.className = 'question__next buttonNext hidden';

    //since this function will be called more than once, making sure game is not over
    if(newGame.isOver() !== true && newGame.getCounter() !==5){

        //storing all questions in variable
        

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

        questionScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
        document.getElementById('score-container').textContent = newGame.getScore();

        buttonPlayAgain.addEventListener('click', letsPlayAgain);
        buttonBackToStart.addEventListener('click', backToStart);

        setLocalStorage();
    }
}
function backToStart(){
    
    newGame.resetGame();
    resultScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
    
    getLocalStorage();
    
   
}
function letsPlayAgain(){
    newGame.resetGame();
    getQuestionsList();
    questionScreen.classList.remove('hidden');
    resultScreen.classList.add('hidden');
}
//
function renderQuestion(correctAnswer, wrongAnswers){
    
    let questionListWithThree = [correctAnswer, wrongAnswers[0], wrongAnswers[1]];
    let firstContinent = questionListWithThree[Math.round(Math.random()*2)] 

    let questionListWithTwo = questionListWithThree.filter(item=> item.continent !== firstContinent.continent);
    let secondContinent = questionListWithTwo[Math.round(Math.random())];

    let questionListWithOne = questionListWithTwo.filter(item=> item.continent !== secondContinent.continent);
    let thirdContinent = questionListWithOne[0];

    //current question to be displayed;
    let questionOnScreen = newGame.getCounter();

    //clean screen, this will be called on each question, we clean previous, then we render next
    //screen is cleaned, we can now render question
    newGame.updateCounter();

    //current question on screen
    questionOnScreen = newGame.getCounter();
   
    //adding current question value to be displayed
    questionCounter.textContent = `Question: ${questionOnScreen}`;

    img.src = correctAnswer.image;

    mainScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');

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

}



function checkAnswer(e){


   let picked = e.target.value;
   let correct = newGame.getCorrectAnswer();

   let gotIt;
   //if we got correct answer, that button will be displayed green
   //but if we not, we need to make button red, but also correct green
   //we will use this variable to check for that

   if(picked === correct){
       newGame.updateScore(750);
       gotIt = true;
   }

   //creating button NEXT

   //assigning the same function as play at the beggining to event listener-
   //we updated counter and score if needed, we will start same process again
   buttonNext.addEventListener('click', getQuestionsList);
   buttonNext.classList.remove('hidden')

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
   buttonOne.disabled = true;
   buttonTwo.disabled = true;
   buttonThree.disabled = true;

}

function setLocalStorage(){
    let score = newGame.getScore();
    let date = new Date();

    let d = date.getDay();
    let m = date.getMonth();
    let y = date.getFullYear();
    let fullDate = d + '/'+ m + '/' +y;

    let scoreObject = {score: score, date: fullDate}
    let topThreeScores = localStorage.getItem('scores');

    if(!topThreeScores){
        topThreeScores = []
        topThreeScores.push(scoreObject);
        let scoreToStorage = JSON.stringify(topThreeScores);
        localStorage.setItem('scores', scoreToStorage);
    
      
    }else{
        let newScores = JSON.parse(topThreeScores);
        newScores.push(scoreObject);

        let newStorageScores = JSON.stringify(newScores)
        localStorage.setItem('scores',newStorageScores);
    }
 
}
function getLocalStorage(){
    let scores;
    let sortedScores;
    let currentScores = localStorage.getItem('scores');
    
    if(currentScores){
        scores = JSON.parse(currentScores);
       
        if(scores.length === 1){
            scoreOne.textContent = scores[0].score;
            scoreOne.previousElementSibling.previousElementSibling.textContent = 'On:' + scores[0].date;
        }
        //sort highest scores
        if(scores.length > 1){
            sortedScores = scores.sort(function(a, b){
                return b.score - a.score;
            });
        }
        if(scores.length === 2){
            scoreOne.textContent = sortedScores[0].score;
            scoreOne.previousElementSibling.previousElementSibling.textContent = 'On: '+ sortedScores[0].date;

            scoreTwo.textContent = sortedScores[1].score;
            scoreTwo.previousElementSibling.previousElementSibling.textContent = 'On: '+ sortedScores[1].date;
        }
        if(scores.length >= 3){
            scoreOne.textContent = sortedScores[0].score;
            scoreOne.previousElementSibling.previousElementSibling.textContent = 'On: '+ sortedScores[0].date;

            scoreTwo.textContent = sortedScores[1].score;
            scoreTwo.previousElementSibling.previousElementSibling.textContent = 'On: '+ sortedScores[1].date;

            scoreThree.textContent = sortedScores[2].score;
            scoreThree.previousElementSibling.previousElementSibling.textContent = 'On: '+ sortedScores[2].date;

           let newScr =  sortedScores.slice(0,3);
           let scoreToStr = JSON.stringify(newScr);
           localStorage.setItem('scores', scoreToStr);
        }
        
    }
    
    
}
