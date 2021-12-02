import Index from "../index.js";

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

    function setup() {
        const mainMenuBtn = document.querySelector(".main-menu");
        mainMenuBtn.onclick = Index.goBackToMainMenu;

        const playAgainBtn = document.querySelector(".play-again");
        playAgainBtn.onclick = removeDisplay;
    }

    return { display, setup };
})();
