import Index from "../index.js"
import LocalGame from "../utils/localGame.js";
import BotGame from "../utils/botGame.js";
import BotUtils from "../utils/botUtils.js";
import GameUtils from "../utils/gameUtils.js";

export default (() => {

    let Player = {};
    let gameMode;

    function display(player1, player2, game) {
        Player["X"] = player1;
        Player["O"] = player2;
        if (Player["X"] === "") Player["X"] = "Player 1";
        if (Player["O"] === "") Player["O"] = "Player 2";

        gameMode = game;

        BotUtils.NormalBot.reset();
        const gameDiv = document.querySelector(".game");
        gameDiv.append(CurrentPlayerText.create());
        gameDiv.append(GameBoard.create());
        gameDiv.append(QuitButton.create());

        const bot_has_to_make_first_move = gameMode != "local" && Player["X"] != "Player";
        if (bot_has_to_make_first_move) {
            switch (gameMode) {
                case "easy":
                    BotUtils.EasyBot.makeMove();
                    break;
                case "normal":
                    BotUtils.NormalBot.reset();
                    BotUtils.NormalBot.makeMove();
                    break;
                case "hard":
                    BotUtils.HardBot.makeMove();
                    break;
                default:
                    return;
            }
            CurrentPlayerText.updateCurrentPlayer();
        }
    
    }

    function resetGame(player1, player2) {
        Index.clearGameDisplay();
        display(player1, player2, gameMode);
    }

    function getPlayerNameWith(symbol) {
        return Player[symbol];
    }

    // const PlayerUtils = (() => {
    //     let currentPlayer;

    //     function getCurrentPlayerName() {
    //         return currentPlayer;
    //     }

    //     function getOtherPlayerName() {
    //         return currentPlayer === Player["X"] ? Player["O"] : Player["X"];
    //     }

    //     function createCurrentPlayerText() {
    //         currentPlayer = Player["X"];

    //         const currentPlayerText = document.createElement("p");
    //         currentPlayerText.id = "current-player";
    //         currentPlayerText.textContent = `It's ${currentPlayer}'s turn`;

    //         return currentPlayerText;
    //     }

    //     function switchCurrentPlayer() {
    //         currentPlayer = getOtherPlayerName();
    //         const currentPlayerText = document.getElementById("current-player");
    //         currentPlayerText.textContent = `It's ${currentPlayer}'s turn`;
    //     }

    //     return { 
    //         getCurrentPlayerName, 
    //         getOtherPlayerName, 
    //         createCurrentPlayerText, 
    //         switchCurrentPlayer 
    //     };

    // })();

    const CurrentPlayerText = (() => {
        
        function create() {
            const currentPlayerText = document.createElement("p");
            currentPlayerText.id = "current-player";
            currentPlayerText.textContent = `It's ${getPlayerNameWith("X")}'s turn`;

            return currentPlayerText;
        }

        function updateCurrentPlayer() {
            const board = GameBoard.getBoard();
            const currentSymbol = GameUtils.getCurrentPlayerSymbol(board);
            
            const currentPlayerText = document.getElementById("current-player");
            currentPlayerText.textContent = `It's ${getPlayerNameWith(currentSymbol)}'s turn`;
        }

        return { create, updateCurrentPlayer };

    })();

    const GameBoard = (() => {
        const NUM_OF_ROWS = 3;
        const NUM_OF_COLUMNS = 3;
        const NUM_OF_SPACES = NUM_OF_ROWS * NUM_OF_COLUMNS;

        function create() {
            const gameBoard = document.createElement("div");
            gameBoard.classList.add("gameboard");
            generateSpaces(gameBoard);
            return gameBoard;
        }

        function getBoard() {
            const spaces = Array.from(document.getElementsByClassName("space"));
            const board = [];
            for (let i = 0; i < NUM_OF_ROWS; i++) {
                board.push([]);
                for (let j = 0; j < NUM_OF_COLUMNS; j++) {
                    let space = spaces.shift();
                    board[i].push(space.innerText);
                }
            }

            return board;
        }

        function getHTMLBoard() {
            const spaces = Array.from(document.getElementsByClassName("space"));
            const htmlBoard = [];
            for (let i = 0; i < NUM_OF_ROWS; i++) {
                htmlBoard.push([]);
                for (let j = 0; j < NUM_OF_COLUMNS; j++) {
                    let space = spaces.shift();
                    htmlBoard[i].push(space);
                }
            }

            return htmlBoard;
        }

        function generateSpaces(parentBoard) {
            for (let i = 1; i <= NUM_OF_SPACES; i++) {
                const space = document.createElement("div");
                space.id = i;
                space.classList.add("space");
                space.innerText = "";
                space.style.cursor = "pointer";

                switch(gameMode) {
                    case "local":
                        space.onclick = LocalGame.behavior;
                        break;
                    case "easy":
                        space.onclick = BotGame.easyMode;
                        break;
                    case "normal":
                        space.onclick = BotGame.normalMode;
                        break;
                    case "hard":
                        space.onclick = BotGame.hardMode;
                        break;
                    default:
                        space.onclick = LocalGame.behavior;
                }

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

        function enableSpaces() {
            const spaces = document.getElementsByClassName("space");
            for (let space of spaces) {
                space.style.pointerEvents = "all";
            }
        }

        return { 
            create, 
            getBoard,
            getHTMLBoard,
            disableSpaces,
            enableSpaces 
        };

    })();

    const QuitButton = (() => {

        function create() {
            const quitButton = document.createElement("button");
            quitButton.innerText = "Quit";
            quitButton.classList.add("quit");
            quitButton.onclick = Index.goBackToMainMenu;

            return quitButton;
        }

        return { create };
    })();

    return { 
        display, 
        resetGame, 
        getPlayerNameWith, 
        GameBoard, 
        CurrentPlayerText 
    }
})();