
class Render{
    constructor(){
        this.questionCount = 0;
    }
    static nextQuestion(){
        this.questionCount++;
    }
    static cleanScreen(){
        //clear the screen
        document.querySelector('.icons').remove();
        let currentScreen = document.querySelector('#game-screen');
        while(currentScreen.firstChild){
            currentScreen.removeChild(currentScreen.firstChild);
        }

    }
  /*  static startGame(){
        // remove navigation on start
      
        //clean score screen
        Render.cleanScreen()
    }*/
    static renderScreen(correctAnswer, wrongAnswers){
        //at this point we have correct question with array of two incorrect
        //clean the screen
        Render.cleanScreen()

        //target screen to insert image and question
        let screen = document.querySelector('#game-screen');
        //create image for correct answer
        let image = document.createElement('img');
        image.className = "main__screen__img";
        image.style = "width: 90%; max-height: 300px; min-height:300px";
        image.src = correctAnswer.image;

        let correctButton = document.createElement('button');
        let wrongButton = document.createElement('button');
        let wrongButtonTwo = document.createElement('button')

        correctButton.className = 'main__screen__button';
        wrongButton.className = 'main__screen__button';
        wrongButtonTwo.className = 'main__screen__button';

        correctButton.value = correctAnswer.continent;
        wrongButton.value = wrongAnswers[0].continent;
        wrongButtonTwo.value = wrongAnswers[1].continent;

        correctButton.textContent = correctAnswer.continent;
        wrongButton.textContent = wrongAnswers[0].continent;
        wrongButtonTwo.textContent = wrongAnswers[1].continent;

        screen.appendChild(image);
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
        let questionList = [correct]
        screen.appendChild(correctButton);
        screen.appendChild(wrongButton);
        screen.appendChild(wrongButtonTwo);

    }

}

module.exports = Render;