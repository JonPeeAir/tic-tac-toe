import Index from "../index.js";
import MainMenu from "./mainMenu.js";
import LocalGame from "./localGame.js";

export default (() => {

    function display(winner) {
        const gameResults = document.querySelector(".game-results");
        for (let child of gameResults.children) {
            child.classList.add("active");
        }

        if (winner) {
            showWinnerDialog(winner);
        } else {
            showTieDialog();
        }
    }

    function setup() {
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
        LocalGame.resetGame();
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
    return { display, setup };
})();
