exports.getQuestions = async function(){

    const result = await fetch('https://api.myjson.com/bins/a6da9');
    const questions = await result.json();
    return questions;
}