const Game = require('./includes/_Game');
const Questions = require('./includes/_Questions');


const newGame = new Game();
const newQuestions = new Questions();

async function getQuestions(){
    const result = await fetch('https://api.myjson.com/bins/a6da9');
    const questions = await result.json()
    return questions;
}
getQuestions()
.then(result=>{
    newQuestions.setQuestions(result);
});

document.querySelector('#play').addEventListener('click', letsPlay);

/*   lets      play      function    */
function letsPlay(){
    if(newQuestions.getQuestions() !== null){
        getQuestionsList()
    }; 
}
function getQuestionsList(){

    if(newGame.isOver() !== true && newGame.getCounter() <5){

        let questionsList = newQuestions.getQuestions();

        let wrongAnswers = [];
        let correctAnswer = questionsList[Math.round(Math.random() * questionsList.length)];
        newGame.setCorrectAnswer(correctAnswer.continent)

        let firstWrongQuestionList = questionsList.filter(item => item.continent !== correctAnswer.continent);
        let firstWrongQuestion = firstWrongQuestionList[Math.round(Math.random() * firstWrongQuestionList.length)];

        wrongAnswers.push(firstWrongQuestion);

        let secondWrongQuesionList = firstWrongQuestionList.filter(item=> item.continent !== firstWrongQuestion.continent)
        let secondWrongQuesion = secondWrongQuesionList[Math.round(Math.random() * secondWrongQuesionList.length)];

        wrongAnswers.push(secondWrongQuesion);

        renderQuestion(correctAnswer, wrongAnswers)
    }else{
        //show result screen
    }
}

function renderQuestion(correctAnswer, wrongAnswers){

    let questionOnScreen = newGame.getCounter();
    if(questionOnScreen === 0){
            document.querySelector('.icons').remove();
    }
    let currentScreen = document.querySelector('#game-screen');
        while(currentScreen.firstChild){
            currentScreen.removeChild(currentScreen.firstChild);
        }

    newGame.updateCounter();
    questionOnScreen = newGame.getCounter();
   

    let screen = document.querySelector('#game-screen');
    let info = document.querySelector("#info");
    let img = document.createElement('img');

    info.className = 'in-game';
    info.textContent = `Question: ${questionOnScreen}`;

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

    buttonOne.value = firstContinent.continent;
    buttonTwo.value = secondContinent.continent;
    buttonThree.value = thirdContinent.continent;

    buttonOne.id = firstContinent.continent;
    buttonTwo.id = secondContinent.continent;
    buttonThree.id = thirdContinent.continent;

    buttonOne.textContent = firstContinent.continent;
    buttonTwo.textContent = secondContinent.continent;
    buttonThree.textContent = thirdContinent.continent;

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
   let gotIt;
   
   if(picked === correct){
       newGame.updateScore(750);
       gotIt = true;
   }
   let next = document.createElement('button');
   next.className = "main__screen__next";
   next.textContent = "Next";
   next.addEventListener('click', getQuestionsList);

   let a = document.getElementById(`${picked}`);
   let b = document.getElementById(`${correct}`);

   if(gotIt){
        b.classList.add('correct-answer')
   }else{
        a.classList.add('wrong-answer');
        b.classList.add('correct-answer')
   }



   a.classList.add(a.id === correct ? 'correct-answer' : 'wrong-answer');
   b.classList.add(b.id === correct ? 'correct-answer' : 'wrong-answer');



   let screen = document.querySelector('#game-screen');


   screen.appendChild(next)
   

}

