import { goBackToMainMenu } from "./script.js";

const gameDiv = document.querySelector(".game");

export default function displayLocalGame(player1, player2) {

    function createGameBoard() {

        function assignSymbol() {
            if (!localStorage.getItem("current-move")) {
                localStorage.setItem("current-move", "X");
            }

            if (this.innerText === "") {
                let currentMove = localStorage.getItem("current-move");
                this.innerText = currentMove;
                currentMove === "X" ? localStorage.setItem("current-move", "O") : localStorage.setItem("current-move", "X");
            }

        }

        function generateSpace(parentBoard) {
            for (let i = 1; i <= 9; i++) {
                const space = document.createElement("div");
                space.classList.add("space");
                space.innerText = "";

                let row = i < 4 ? "top" : i < 7 ? "middle" : "bottom";
                let col = i % 3 === 0 ? "right" : i % 3 === 1 ? "left" : "center";
                space.classList.add(row, col);

                space.onclick = assignSymbol;

                parentBoard.append(space);
            }
        }

        const gameBoard = document.createElement("div");
        gameBoard.classList.add("gameboard");
        generateSpace(gameBoard);

        return gameBoard;
    }

    const quitButton = document.createElement("button");
    quitButton.innerText = "Quit";
    quitButton.classList.add("quit");
    quitButton.onclick = goBackToMainMenu;

    gameDiv.innerText = player1 === "" ? "It's Player 1's turn" : `It's ${player1}'s turn`;
    gameDiv.append(createGameBoard());
    gameDiv.append(quitButton);
}