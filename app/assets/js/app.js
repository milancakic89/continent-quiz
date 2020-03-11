const Questions = require('./includes/_Questions');
const Render = require('./includes/_Render');

document.getElementById('play').addEventListener('click', letsPlay);

function letsPlay(){
    Questions.fetchQuestions();

}