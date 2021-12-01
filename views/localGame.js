import { goBackToMainMenu } from "../script.js";
import gameUtils from "../gameUtils.js";

const gameDiv = document.querySelector(".game");

export default function displayLocalGame(player1, player2) {

    if (player1 === "") player1 = "Player 1";
    if (player2 === "") player2 = "Player 2";

    const PlayerUtils = (function () {
        let currentPlayer = player1;

        function createCurrentPlayerText() {
            const currentPlayerText = document.createElement("p");
            currentPlayerText.id = "current-player";
            currentPlayerText.textContent = `It's ${currentPlayer}'s turn`;

            return currentPlayerText;
        }

        function switchCurrentPlayer() {
            const currentPlayerText = document.getElementById("current-player");
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            currentPlayerText.textContent = `It's ${currentPlayer}'s turn`;
        }

        return { createCurrentPlayerText, switchCurrentPlayer };
    })();

    function createGameBoard() {

        let currentSymbol = "X";

        function generateSpace(parentBoard) {
            for (let i = 1; i <= 9; i++) {
                const space = document.createElement("div");
                space.id = i;
                space.classList.add("space");
                space.innerText = "";
                space.style.cursor = "pointer";
                space.onclick = assignSymbolAndCheckGame;

                let row = i < 4 ? "top" : i < 7 ? "middle" : "bottom";
                let col = i % 3 === 0 ? "right" : i % 3 === 1 ? "left" : "center";
                space.classList.add(row, col);

                parentBoard.append(space);
            }
        }

        function assignSymbolAndCheckGame() {
            if (this.innerText === "") {
                this.innerText = currentSymbol;
                if (gameUtils.gameEnded()) {
                    const winner = gameUtils.getWinner();
                    console.log(winner);
                } else {
                    currentSymbol = currentSymbol === "X" ? "O" : "X";
                    PlayerUtils.switchCurrentPlayer();
                }
            }
        }

        const gameBoard = document.createElement("div");
        gameBoard.classList.add("gameboard");
        generateSpace(gameBoard);

        return gameBoard;
    }

    function createQuitButton() {
        const quitButton = document.createElement("button");
        quitButton.innerText = "Quit";
        quitButton.classList.add("quit");
        quitButton.onclick = goBackToMainMenu;

        return quitButton;
    }


    gameDiv.append(PlayerUtils.createCurrentPlayerText());
    gameDiv.append(createGameBoard());
    gameDiv.append(createQuitButton());
}