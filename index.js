import PlayerPrompts from "./views/playerPrompts.js";
import MainMenu from "./views/mainMenu.js";

export default (() => {

    function goBackToMainMenu() {
        clearGameDisplay();
        MainMenu.display();
    }

    function getPlayerNames() {
        clearGameDisplay();
        PlayerPrompts.display();
    }

    function clearGameDisplay() {
        const gameDiv = document.querySelector(".game");
        while (gameDiv.firstChild) {
            gameDiv.removeChild(gameDiv.firstChild);
        }
    }

    return { goBackToMainMenu, getPlayerNames, clearGameDisplay }

})();

MainMenu.display();

