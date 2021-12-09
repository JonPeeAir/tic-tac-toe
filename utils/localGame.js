import Game from "../views/game.js"
import GameUtils from "./gameUtils.js"
import GameResults from "../views/gameResults.js"

export default (() => {

    function behavior() {
        if (this.innerText === "") {
            this.innerText = Game.GameBoard.getCurrentSymbol();
            if (GameUtils.gameEnded()) {
                Game.GameBoard.disableSpaces();
                const winner = GameUtils.getWinner();
                GameResults.display(winner);
            } else {
                Game.GameBoard.switchCurrentSymbol();
                Game.PlayerUtils.switchCurrentPlayer();
            }
        }
    }

    return { behavior }
})();