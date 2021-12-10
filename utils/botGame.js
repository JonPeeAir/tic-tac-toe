import Game from "../views/game.js"
import GameResults from "../views/gameResults.js"
import GameUtils from "./gameUtils.js"
import BotUtils from "./botUtils.js"

export default (() => {

    function easyMode() {

        // Get the current board and symbol to play
        const board = Game.GameBoard.getBoard();
        const currentSymbol = GameUtils.getCurrentPlayerSymbol(board);

        // If this space is playable...
        if (this.innerText === "") {

            // Play the current symbol on this space and get the resulting board from this play 
            this.innerText = currentSymbol;
            const newBoard = Game.GameBoard.getBoard();

            if (GameUtils.boardIsTerminal(newBoard)) {

                // Get the name of the winner and display it in GameResults
                const winningSymbol = GameUtils.getWinningSymbol(newBoard);
                const losingSymbol = GameUtils.getLosingSymbol(newBoard);
                const winner = Game.getPlayerNameWith(winningSymbol);
                const loser = Game.getPlayerNameWith(losingSymbol);

                Game.GameBoard.disableSpaces();
                GameResults.display(winner, loser);

            } else {

                playBotsMove("easy");

            }
        }

    }

    function normalMode() {

        // Get the current board and symbol to play
        const board = Game.GameBoard.getBoard();
        const currentSymbol = GameUtils.getCurrentPlayerSymbol(board);

        // If this space is playable...
        if (this.innerText === "") {

            // Play the current symbol on this space and get the resulting board from this play 
            this.innerText = currentSymbol;
            const newBoard = Game.GameBoard.getBoard();

            if (GameUtils.boardIsTerminal(newBoard)) {

                // Get the name of the winner and display it in GameResults
                const winningSymbol = GameUtils.getWinningSymbol(newBoard);
                const losingSymbol = GameUtils.getLosingSymbol(newBoard);
                const winner = Game.getPlayerNameWith(winningSymbol);
                const loser = Game.getPlayerNameWith(losingSymbol);

                Game.GameBoard.disableSpaces();
                GameResults.display(winner, loser);

            } else {

                playBotsMove("normal");

            }
        }

    }

    function hardMode() {

        // Get the current board and symbol to play
        const board = Game.GameBoard.getBoard();
        const currentSymbol = GameUtils.getCurrentPlayerSymbol(board);

        // If this space is playable...
        if (this.innerText === "") {

            // Play the current symbol on this space and get the resulting board from this play 
            this.innerText = currentSymbol;
            const newBoard = Game.GameBoard.getBoard();

            if (GameUtils.boardIsTerminal(newBoard)) {

                // Get the name of the winner and display it in GameResults
                const winningSymbol = GameUtils.getWinningSymbol(newBoard);
                const losingSymbol = GameUtils.getLosingSymbol(newBoard);
                const winner = Game.getPlayerNameWith(winningSymbol);
                const loser = Game.getPlayerNameWith(losingSymbol);

                Game.GameBoard.disableSpaces();
                GameResults.display(winner, loser);

            } else {

                playBotsMove("hard");

            }
        }

    }


    function playBotsMove(difficulty) {

        Game.CurrentPlayerText.updateCurrentPlayer();
        Game.GameBoard.disableSpaces();

        setTimeout(() => {

            switch (difficulty) {
                case "easy":
                    BotUtils.EasyBot.makeMove();
                    break;
                case "normal":
                    BotUtils.NormalBot.makeMove();
                    break;
                case "hard":
                    BotUtils.HardBot.makeMove();
                    break;
                default:
                    BotUtils.EasyBot.makeMove();
            }

            const newerBoard = Game.GameBoard.getBoard();

            if (GameUtils.boardIsTerminal(newerBoard)) {

                // Get the name of the winner and display it in GameResults
                const winningSymbol = GameUtils.getWinningSymbol(newerBoard);
                const losingSymbol = GameUtils.getLosingSymbol(newerBoard);
                const winner = Game.getPlayerNameWith(winningSymbol);
                const loser = Game.getPlayerNameWith(losingSymbol);

                Game.GameBoard.disableSpaces();
                GameResults.display(winner, loser);

            } else {

                Game.CurrentPlayerText.updateCurrentPlayer();
                Game.GameBoard.enableSpaces();

            }

        }, 1000);

    }

    return {
        easyMode, 
        normalMode, 
        hardMode
    }

})();