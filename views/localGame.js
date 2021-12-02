import index from "../index.js";
import gameUtils from "../utils/gameUtils.js";

export default (() => {
    let player1, player2;

    function display(p1, p2) {
        player1 = p1;
        player2 = p2;

        if (player1 === "") player1 = "Player 1";
        if (player2 === "") player2 = "Player 2";

        const gameDiv = document.querySelector(".game");
        gameDiv.append(PlayerUtils.createCurrentPlayerText());
        gameDiv.append(GameBoard.create());
        gameDiv.append(QuitButton.create());
    }

    const PlayerUtils = (() => {
        let currentPlayer;

        function getCurrentPlayer() {
            return currentPlayer;
        }

        function createCurrentPlayerText() {
            currentPlayer = player1;

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

        return { getCurrentPlayer, createCurrentPlayerText, switchCurrentPlayer };
    })();

    const GameBoard = (() => {
        const NUM_OF_SPACES = 9;
        let currentSymbol = "X";

        function assignSymbolAndCheckGame() {
            if (this.innerText === "") {
                this.innerText = currentSymbol;
                if (gameUtils.gameEnded()) {
                    disableSpaces();
                    const winner = gameUtils.getWinner();
                    index.GameResults.display(winner);
                } else {
                    currentSymbol = currentSymbol === "X" ? "O" : "X";
                    PlayerUtils.switchCurrentPlayer();
                }
            }
        }

        function generateSpaces(parentBoard) {
            for (let i = 1; i <= NUM_OF_SPACES; i++) {
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

        function disableSpaces() {
            const spaces = document.getElementsByClassName("space");
            for (let space of spaces) {
                space.style.pointerEvents = "none";
            }
        }

        function create() {
            const gameBoard = document.createElement("div");
            gameBoard.classList.add("gameboard");
            generateSpaces(gameBoard);

            return gameBoard;
        }

        return { create };
    })();

    const QuitButton = (() => {

        function create() {
            const quitButton = document.createElement("button");
            quitButton.innerText = "Quit";
            quitButton.classList.add("quit");
            quitButton.onclick = index.goBackToMainMenu;

            return quitButton;
        }

        return { create };
    })();

    // These are the only usable properties and methods outside this file
    return { display, PlayerUtils }
})();