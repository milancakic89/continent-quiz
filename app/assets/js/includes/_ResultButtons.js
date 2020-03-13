exports.goToHome = function(){
    homeScreen.classList.remove('hidden');
    mainScreen.classList.add('hidden');
    LS.getLocalStorage();
}
exports.jumpToLedderboard = function(){
    homeScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
    LS.getLocalStorage();
}