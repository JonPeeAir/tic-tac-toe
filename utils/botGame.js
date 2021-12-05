import Game from "../views/game.js"
import GameResults from "../views/gameResults.js"
import GameLogic from "./gameLogic.js"
import BotUtils from "./botUtils.js"

export default (() => {

    function easyMode() {

        if (this.innerText === "") {
            this.innerText = Game.GameBoard.getCurrentSymbol();
            if (GameLogic.gameEnded()) {
                Game.GameBoard.disableSpaces();
                const winner = GameLogic.getWinner();
                GameResults.display(winner);
            } else {
                Game.GameBoard.switchCurrentSymbol();
                Game.PlayerUtils.switchCurrentPlayer();
                Game.GameBoard.disableSpaces();
                setTimeout(() => {
                    BotUtils.EasyBot.makeMove();
                    if (GameLogic.gameEnded()) {
                        Game.GameBoard.disableSpaces();
                        const winner = GameLogic.getWinner();
                        GameResults.display(winner);
                    } else {
                        Game.GameBoard.switchCurrentSymbol();
                        Game.GameBoard.enableSpaces();
                        Game.PlayerUtils.switchCurrentPlayer();
                    }
                }, 1000);
            }
        }

    }

    function checkGameEnded() {
        if (GameLogic.gameEnded()) {
            Game.GameBoard.disableSpaces();
            const winner = GameLogic.getWinner();
            GameResults.display(winner);
        }
    }

    function normalMode() {
        return;
    }

    function hardMode() {
        return;
    }

    return {
        easyMode, 
        normalMode, 
        hardMode
    }

})();