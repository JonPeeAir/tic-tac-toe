import Game from "../views/game.js"

export default (() => {

    const EasyBot = (() => {
        function makeMove() {
            doRandomMove();
        }

        return { makeMove };
    })();

    function getPossibleMoves() {
        const allSpaces = Array.from(document.getElementsByClassName("space"));
        const playableSpaces = allSpaces.filter(space => space.innerText === "");
        return playableSpaces;
    }

    function doRandomMove() {
        const randomSpace = getRandomSpace();
        randomSpace.innerText = Game.GameBoard.getCurrentSymbol();
    }

    function getRandomSpace() {
        const playableSpaces = getPossibleMoves();
        let randomIndex = Math.floor(Math.random() * playableSpaces.length);
        return playableSpaces[randomIndex];
    }

    return {
        EasyBot,
        getPossibleMoves,
        doRandomMove
    }

})();