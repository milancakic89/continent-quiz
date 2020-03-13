const Elements = require('./Elements');
const LS = require('./LS');

exports.goToHome = function(){
    Elements.homeScreen.classList.remove('hidden');
    Elements.mainScreen.classList.add('hidden');
    LS.getLocalStorage();
}
exports.jumpToLedderboard = function(){
    Elements.homeScreen.classList.add('hidden');
    Elements.mainScreen.classList.remove('hidden');
    LS.getLocalStorage();
}