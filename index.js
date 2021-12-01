import displayPlayerPrompts from "./views/playerPrompts.js";
import displayMainMenu from "./views/mainMenu.js";

export default (() => {

    function goBackToMainMenu() {
        clearGameDisplay();
        displayMainMenu();
    }

    function getPlayerNames() {
        clearGameDisplay();
        displayPlayerPrompts();
    }

    function clearGameDisplay() {
        const gameDiv = document.querySelector(".game");
        while (gameDiv.firstChild) {
            gameDiv.removeChild(gameDiv.firstChild);
        }
    }

    return { goBackToMainMenu, getPlayerNames, clearGameDisplay }

})();

displayMainMenu();

