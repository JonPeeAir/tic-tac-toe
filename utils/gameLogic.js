import Game from "../views/game.js";

export default (() => {

    let winner = null;

    function gameEnded() {
        const spaces = Array.from(document.getElementsByClassName("space"));
        const symbols = spaces.map(space => space.innerText);

        if (thereIsWinner(symbols)) {
            setWinner();
        }

        return thereIsWinner(symbols) || !thereIsSpace(symbols);
    }

    function thereIsWinner(symbol) {

        function winnerByRow() {
            const topRowWin = symbol[0] === symbol[1] && symbol[0] === symbol[2] && symbol[0] != "";
            const middleRowWin = symbol[3] === symbol[4] && symbol[3] === symbol[5] && symbol[3] != "";
            const bottomRowWin = symbol[6] === symbol[7] && symbol[6] === symbol[8] && symbol[6] != "";

            return topRowWin || middleRowWin || bottomRowWin;
        }

        function winnerByColumn() {
            const leftColumnWin = symbol[0] === symbol[3] && symbol[0] === symbol[6] && symbol[0] != "";
            const centerColumnWin = symbol[1] === symbol[4] && symbol[1] === symbol[7] && symbol[1] != "";
            const rightColumnWin = symbol[2] === symbol[5] && symbol[2] === symbol[8] && symbol[2] != "";

            return leftColumnWin || centerColumnWin || rightColumnWin;
        }

        function winnerByDiagonal() {
            const topLeftToRightWin = symbol[0] === symbol[4] && symbol[0] === symbol[8] && symbol[0] != "";
            const topRightToLeftWin= symbol[2] === symbol[4] && symbol[2] === symbol[6] && symbol[2] != "";

            return topLeftToRightWin || topRightToLeftWin;
        }

        return winnerByRow() || winnerByColumn() || winnerByDiagonal();
    }

    function thereIsSpace(symbol) {
        for (let i = 0; i < symbol.length; i++) {
            if (symbol[i] === "") {
                return true;
            }
        }
        return false;
    }

    function getWinner() {
        return winner;
    }

    function setWinner() {
        winner = Game.PlayerUtils.getCurrentPlayer();
    }

    // These are the only usable methods and properties outside this file
    return { gameEnded, getWinner }
})();

