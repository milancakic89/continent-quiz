const Game = require('./includes/Game');
const Questions = require('./includes/Questions');
const LS = require('./includes/LS');
const ResultButtons = require('./includes/ResultButtons');
const Elements = require('./includes/Elements');

const newGame = new Game();

let questionsList = null;

Elements.buttonGoToHome.addEventListener('click', ResultButtons.goToHome);
Elements.homeButtonPlay.addEventListener('click', ResultButtons.jumpToLedderboard);


// fetching questions
Questions.getQuestions().then(result => questionsList = result).catch(err => console.log(err));

//adding an event listener to play button at start
Elements.buttonPlay.addEventListener('click', letsPlay);

function letsPlay(){
    //checking if the questions are stored
   if(questionsList !== null){
        //calling the function that will handle questions 
        getQuestionsList();
    }; 
}

// function for creating correct answer and two random wrong answers
function getQuestionsList(){
    
    //this function is called on every question, question needs to be enabled
    //because they are all disabled once the user clicks on any button
     Elements.buttonOne.disabled = false;
     Elements.buttonTwo.disabled = false;
     Elements.buttonThree.disabled = false;
     Elements.buttonOne.className = 'question__button buttonOne';
     Elements.buttonTwo.className = 'question__button buttonTwo';
     Elements.buttonThree.className = 'question__button buttonThree';
     Elements.buttonNext.className = 'question__next buttonNext hidden';

    //making sure game is not over
    if(newGame.isOver() !== true && newGame.getCounter() !==5){

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
        //game over, display results and save score to local storage
        Elements.questionScreen.classList.add('hidden');
        Elements.resultScreen.classList.remove('hidden');
        Elements.scoreContainer.textContent = newGame.getScore();

        Elements.buttonPlayAgain.addEventListener('click', letsPlayAgain);
        Elements.buttonBackToStart.addEventListener('click', backToStart);

        let scoreToLocalStorage = newGame.getScore();

        LS.setLocalStorage(scoreToLocalStorage);
    }
}
//function to go back from result screen to main screen
function backToStart(){
    
    newGame.resetGame();
    Elements.resultScreen.classList.add('hidden');
    Elements.mainScreen.classList.remove('hidden');
    LS.getLocalStorage(); 
}
//function to directly go from result page to a new game
function letsPlayAgain(){
    newGame.resetGame();
    getQuestionsList();
    Elements.questionScreen.classList.remove('hidden');
    Elements.resultScreen.classList.add('hidden');
}
//responsible for creating questions and injecting values into buttons
function renderQuestion(correctAnswer, wrongAnswers){
    let scoreOnScreen = newGame.getScore();

    Elements.scoreOnScreen.textContent = scoreOnScreen;
    /*
        we have questions we need.
        We cant just set values in buttons, the answer would be allways on same spot.
        We need to mix them randomly and inject in button values.
        idea: 
        Put all three answers into array. Pick random 1 from 3 and put him into variable.
        Thats the first random question pick. Now we need to remove that question from an array,
        we dont want that same question as an option. So filter array to remove that question, 
        now we have array with 2, random again bettwen those 2, assign it to variable, thats second random question.
        Filter again, remaining question is the third question... Now we append one by one, and we dont know
        witch one is actualy correct.
    */
    
    let questionListWithThree = [correctAnswer, wrongAnswers[0], wrongAnswers[1]];
    let firstContinent = questionListWithThree[Math.round(Math.random()*2)]

    let questionListWithTwo = questionListWithThree.filter(item=> item.continent !== firstContinent.continent);
    let secondContinent = questionListWithTwo[Math.round(Math.random())];

    let questionListWithOne = questionListWithTwo.filter(item=> item.continent !== secondContinent.continent);
    let thirdContinent = questionListWithOne[0];

    //current question to be displayed;
    let questionOnScreen = newGame.getCounter();

    //screen is cleaned, we can now render question
     newGame.updateCounter();

    //current question on screen
     questionOnScreen = newGame.getCounter();
   
    //adding current question value to be displayed
    Elements.questionCounter.textContent = `Question: ${questionOnScreen}`;

    //displaying image on screen
    Elements.img.src = correctAnswer.image;

    //adding continents as values
     Elements.buttonOne.value = firstContinent.continent;
     Elements.buttonTwo.value = secondContinent.continent;
     Elements.buttonThree.value = thirdContinent.continent;

    //this fields will help later with css when we click on button
     Elements.buttonOne.id = firstContinent.continent;
     Elements.buttonTwo.id = secondContinent.continent;
     Elements.buttonThree.id = thirdContinent.continent;
    
    //adding text to buttons
     Elements.buttonOne.textContent = firstContinent.continent;
     Elements.buttonTwo.textContent = secondContinent.continent;
     Elements.buttonThree.textContent = thirdContinent.continent;

    //adding event listeners
     Elements.buttonOne.addEventListener('click', checkAnswer);
     Elements.buttonTwo.addEventListener('click', checkAnswer);
     Elements.buttonThree.addEventListener('click', checkAnswer);

     Elements.mainScreen.classList.add('hidden');
     Elements.questionScreen.classList.remove('hidden');
}
function checkAnswer(e){

   let picked = e.target.value;
   let correct = newGame.getCorrectAnswer();

   let gotCorrectAnswer;
   //if we got correct answer, that button will be displayed green
   //but if we not, we need to make button red, but also correct green
   //we will use this variable to check for that
   if(picked === correct){
       newGame.updateScore(750);
       gotCorrectAnswer = true;
   }
   //displaying button NEXT and adding event listener
   Elements.buttonNext.addEventListener('click', getQuestionsList);
   Elements.buttonNext.classList.remove('hidden')

   /*
    here is why i created ids on those buttons before.
   */
   let a = document.getElementById(`${picked}`);
   let b = document.getElementById(`${correct}`);

   //if we have correct answer, both above variables will target same element
   //if we have wrong answer, above variables will target diferent element
   if(gotCorrectAnswer){
       //adding class correct to correct button, displaying green
        b.classList.add('correct-answer')
   }else{
       //adding class correct to correct button, and class wrong to wrong button
       //displaying one green, one red
        a.classList.add('wrong-answer');
        b.classList.add('correct-answer')

   }
   Elements.buttonOne.disabled = true;
   Elements.buttonTwo.disabled = true;
   Elements.buttonThree.disabled = true;

}
