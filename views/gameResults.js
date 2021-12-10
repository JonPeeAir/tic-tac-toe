import Index from "../index.js";
import MainMenu from "./mainMenu.js";
import Game from "./game.js";

export default (() => {

    function display(winner) {
        const gameResults = document.querySelector(".game-results");
        setupButtons();
        for (let child of gameResults.children) {
            child.classList.add("active");
        }

        winner ? showWinnerDialog(winner) : showTieDialog();
    }

    function setupButtons() {
        const mainMenuBtn = document.querySelector(".main-menu");
        mainMenuBtn.onclick = goBackToMainMenu;

        const playAgainBtn = document.querySelector(".play-again");
        playAgainBtn.onclick = playAgain;
    }

    function goBackToMainMenu() {
        removeDisplay();
        Index.clearGameDisplay();
        MainMenu.display();
    }

    function playAgain() {
        removeDisplay();
        Game.resetGame();
    }

    function removeDisplay() {
        const gameResults = document.querySelector(".game-results");
        for (let child of gameResults.children) {
            child.classList.remove("active");
        }
    }

    function showWinnerDialog(winner) {
        const resultText = document.querySelector(".result-text");
        resultText.textContent = `${winner} wins`
    }

    function showTieDialog() {
        const resultText = document.querySelector(".result-text");
        resultText.textContent = "It's a Tie"
    }


    // These are the only usable methods and properties outside this file
    return { display };
})();
