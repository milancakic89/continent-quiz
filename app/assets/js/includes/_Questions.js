const Render = require('./_Render');
class Questions{
    constructor(){
        this.correctAnswer = null;
        this.wrongAnswers = [];
    }

    static async fetchQuestions(){

      const wrongQuestions = [];
       fetch("https://api.myjson.com/bins/a6da9")
        .then(result=>{
            return result.json();
   
        })
        .then(questions=>{
            //storing one correct random answer from questions length
            let questionsList = questions;

            this.correctAnswer = questionsList[Math.round(Math.random() * questionsList.length)];
            
            //removing corect answer continent to prevent same question
            let firstWrongQuestionList = questionsList.filter(quest=>{
                return quest.continent !== this.correctAnswer.continent
            });
            let firstWrongQuestion = firstWrongQuestionList[Math.round(Math.random() * firstWrongQuestionList.length)];
            wrongQuestions.push(firstWrongQuestion)

            /*
              correct answer continent is allready removed from an array, now we need to remove 
              continent from first wrong question also, we dont want two same wrong continent eather
              */
            let secondWrongQuesionList = firstWrongQuestionList.filter(quest=>{
                return quest.continent !== firstWrongQuestion.continent;
            })
            //assigning second wrong question
            let secondWrongQuesion = secondWrongQuesionList[Math.round(Math.random() * secondWrongQuesionList.length)];
            wrongQuestions.push(secondWrongQuesion);
            this.wrongAnswers = wrongQuestions;

            Render.renderScreen(this.correctAnswer, this.wrongAnswers);

        })
        .catch(err=>console.log(err));

    }
    static getQuestions(){
       return {
           correctAnswer: this.correctAnswer,
           wrongAnswers: this.wrongAnswers
       }
   
    }

    static resetGame(){
        this.correctAnswer = null;
        this.wrongAnswers = [];
        this.correctAnswerCollection = [];
    }
}

module.exports = Questions;