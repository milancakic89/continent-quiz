exports.setLocalStorage = function(scores){
    //let score = newGame.getScore();
    let date = new Date();

    let d = date.getDay();
    let m = date.getMonth();
    let y = date.getFullYear();
    let fullDate = d + '/'+ m + '/' +y;

    let scoreObject = {score: scores, date: fullDate}
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
exports.getLocalStorage = function(){
    let scores;
    let sortedScores;
    let currentScores = localStorage.getItem('scores');

        
    let scoreOne = document.getElementById('best-scores-first');
    let scoreTwo = document.getElementById('best-scores-second');
    let scoreThree = document.getElementById('best-scores-third');
    
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
