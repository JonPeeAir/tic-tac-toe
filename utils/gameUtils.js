import Game from "../views/game.js";

export default (() => {

    let winner = null;

    function getWinner() {
        return winner;
    }

    function setWinner() {
        winner = Game.PlayerUtils.getCurrentPlayerName();
    }

    function resetWinner() {
        winner = null;
    }

    function gameEnded() {
        const symbols = Game.GameBoard.getBoard(); 

        if (thereIsWinner(symbols)) {
            setWinner();
        }

        return thereIsWinner(symbols) || !thereIsSpace(symbols);
    }

    function thereIsWinner(symbols) {

        function winnerByRow() {
            for (let i = 0; i < symbols.length; i++) {
                if (symbols[i][0] === symbols[i][1] && symbols[i][0] === symbols[i][2] && symbols[i][0] != "") {
                    return true;
                }
            }
            return false
        }

        function winnerByColumn() {
            for (let i = 0; i < symbols.length; i++) {
                if (symbols[0][i] === symbols[1][i] && symbols[0][i] === symbols[2][i] && symbols[0][i] != "") {
                    return true;
                }
            }
            return false
        }

        function winnerByDiagonal() {
            const topLeftToRightWin = symbols[0][0] === symbols[1][1] && symbols[0][0] === symbols[2][2] && symbols[0][0] != "";
            const topRightToLeftWin= symbols[0][2] === symbols[1][1] && symbols[0][2] === symbols[2][0] && symbols[0][2] != "";

            return topLeftToRightWin || topRightToLeftWin;
        }

        return winnerByRow() || winnerByColumn() || winnerByDiagonal();
    }

    function thereIsSpace(symbols) {
        for (let i = 0; i < symbols.length; i++) {
            for (let j = 0; j < symbols[i].length; j++) {
                if (symbols[i][j] === "") {
                    return true;
                }
            }
        }
        return false;
    }


    // These are the only usable methods and properties outside this file
    return { 
        gameEnded,
        getWinner, 
        resetWinner,
        thereIsWinner, 
        thereIsSpace
    }
})();

