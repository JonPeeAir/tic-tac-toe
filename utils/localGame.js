import Game from "../views/game.js"
import GameUtils from "./gameUtils.js"
import GameResults from "../views/gameResults.js"
import BotUtils from "./botUtils.js"

export default (() => {

    function behavior() {

        // Get the current board and symbol to play
        const board = Game.GameBoard.getBoard();
        const currentSymbol = GameUtils.getCurrentPlayerSymbol(board);

        // If this space is playable...
        if (this.innerText === "") {

            // Play the current symbol on this space and get the resulting board from this play 
            this.innerText = currentSymbol;
            const newBoard = Game.GameBoard.getBoard();

            // If the Game is terminal/over...
            if (GameUtils.boardIsTerminal(newBoard)) {

                // Get the name of the winner and display it in GameResults
                const winningSymbol = GameUtils.getWinningSymbol(newBoard);
                const losingSymbol = GameUtils.getLosingSymbol(newBoard);
                const winner = Game.getPlayerNameWith(winningSymbol);
                const loser = Game.getPlayerNameWith(losingSymbol);

                Game.GameBoard.disableSpaces();
                GameResults.display(winner, loser);

            } else {

                Game.CurrentPlayerText.updateCurrentPlayer();

            }

        }

    }

    return { behavior }
})();