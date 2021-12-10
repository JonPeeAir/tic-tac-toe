import Index from "../index.js";
import MainMenu from "./mainMenu.js";
import Game from "./game.js";
import GameUtils from "../utils/gameUtils.js";

export default (() => {

    let winner, loser;

    function display(winningPlayer, losingPlayer) {
        // store winner and loser
        winner = winningPlayer;
        loser = losingPlayer;

        // Setup Buttons
        const mainMenuBtn = document.querySelector(".main-menu");
        const playAgainBtn = document.querySelector(".play-again");
        mainMenuBtn.onclick = goBackToMainMenu;
        playAgainBtn.onclick = playAgain;

        // Animate the showing of results by adding the class active to all children of game results
        const gameResults = document.querySelector(".game-results");
        for (let child of gameResults.children) {
            child.classList.add("active");
        }

        // Show the proper dialog depending on whether there is a winner or not
        winner ? showWinnerDialog(winner) : showTieDialog();
    }

    function goBackToMainMenu() {
        removeDisplay();
        Index.clearGameDisplay();
        MainMenu.display();
    }

    function playAgain() {
        removeDisplay();
        const board = Game.GameBoard.getBoard()
        const player1 = Game.getPlayerNameWith(GameUtils.getOtherPlayerSymbol(board));
        const player2 = Game.getPlayerNameWith(GameUtils.getCurrentPlayerSymbol(board));
        Game.resetGame(player2, player1);
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

    return { display };
})();
