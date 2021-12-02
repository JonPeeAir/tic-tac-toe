import MainMenu from "./views/mainMenu.js";
import GameResults from "./views/gameResults.js";

export default (() => {

    function goBackToMainMenu() {
        clearGameDisplay();
        MainMenu.display();
    }

    function clearGameDisplay() {
        const gameDiv = document.querySelector(".game");
        while (gameDiv.firstChild) {
            gameDiv.removeChild(gameDiv.firstChild);
        }
    }

    // These are the only usable methods and properties outside this file
    return { goBackToMainMenu, clearGameDisplay }
})();

MainMenu.display();
GameResults.setup();

