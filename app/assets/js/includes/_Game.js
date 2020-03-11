class Game{
    constructor(){
        this.counter = 0;
        this.score = 0;
        this.over = false;
        this.correctAnswer = null;
    }
    updateCounter(){
        this.counter++;
    }
    updateScore(score){
        this.score += score;
    }
    getCounter(){
        return this.counter;
    }
    getScore(){
        return this.score;
    }
    gameOver(){
        this.over = true;
    }
    isOver(){
        return this.over === true;
    }
    getCorrectAnswer(){
        return this.correctAnswer;
    }
    setCorrectAnswer(correct){
        this.correctAnswer = correct;
    }

}
module.exports = Game;