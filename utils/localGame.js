import Game from "../views/game.js"
import GameLogic from "./gameLogic.js"
import GameResults from "../views/gameResults.js"

export default (() => {

    function behavior() {
        if (this.innerText === "") {
            this.innerText = Game.GameBoard.getCurrentSymbol();
            if (GameLogic.gameEnded()) {
                Game.GameBoard.disableSpaces();
                const winner = GameLogic.getWinner();
                GameResults.display(winner);
            } else {
                Game.GameBoard.switchCurrentSymbol();
                Game.PlayerUtils.switchCurrentPlayer();
            }
        }
    }

    return { behavior }
})();