import GameUtils from "./gameUtils.js"
import Game from "../views/game.js"

export default (() => {

    const EasyBot = (() => {
        function makeMove() {
            doRandomMove();
        }

        return { makeMove };
    })();

    const NormalBot = (() => {
        let madeRandomMove = false;

        function makeMove() {
            if (madeRandomMove) {
                doSmartMove();
            } else {
                doRandomMove();
                madeRandomMove = true;
            }
        }

        function reset() {
            madeRandomMove = false;
        }

        return { makeMove, reset };
    })();

    const HardBot = (() => {
        function makeMove() {
            doSmartMove();
        }

        return { makeMove };
    })();

    function doRandomMove() {
        const randomSpace = getRandomSpace();
        randomSpace.innerText = Game.GameBoard.getCurrentSymbol();
    }

    function doSmartMove() {
        const board = Game.GameBoard.getBoard();
        const htmlBoard = Game.GameBoard.getHTMLBoard();
        const action = getMinimaxAction(board)[0];

        htmlBoard[action[0]][action[1]].innerText = Game.GameBoard.getCurrentSymbol();
    }

    function getPossibleMoves() {
        const allSpaces = Array.from(document.getElementsByClassName("space"));
        const playableSpaces = allSpaces.filter(space => space.innerText === "");
        return playableSpaces;
    }


    function getRandomSpace() {
        const playableSpaces = getPossibleMoves();
        let randomIndex = Math.floor(Math.random() * playableSpaces.length);
        return playableSpaces[randomIndex];
    }

    function getCurrentPlayerSymbol(board) {
        let xCount = 0;
        let oCount = 0;

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++){
                if (board[i][j] === "X") {
                    xCount++;
                } else if (board[i][j] === "O") {
                    oCount++;
                }
            }
        }

        return xCount === oCount ? "X" : "O";
    }

    function getOtherPlayerSymbol(board) {
        return getCurrentPlayerSymbol(board) === "X" ? "O" : "X";
    }

    function getPossibleActions(board) {
        let possibleActions = [];

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++){
                if (board[i][j] === "") {
                    const action = [i, j];
                    possibleActions.push(action);
                }
            }
        }

        return possibleActions;
    }

    function getResultBoard(board, action) {
        // Returns the resulting board if the given action was applied
        const possibleActions = getPossibleActions(board);
        for (let i = 0; i < possibleActions.length; i++) {
            let action_in_possibleActions = possibleActions[i][0] === action[0] && possibleActions[i][1] === action[1];
            if (action_in_possibleActions) {
                break;
            }

            if (i === possibleActions.length - 1 && !action_in_possibleActions) {
                throw "invalid action";
            }
        }

        const currentSymbol = getCurrentPlayerSymbol(board);

        // Get a deep copy of the board into resultBoard
        const resultBoard = JSON.parse(JSON.stringify(board));

        resultBoard[action[0]][action[1]] = currentSymbol;

        return resultBoard;
    }

    function getWinningSymbol(board) {
        if (GameUtils.thereIsWinner(board)) {
            return getOtherPlayerSymbol(board);
        }
        return null;
    }

    function boardIsTerminal(board) {
        const there_is_a_winner = getWinningSymbol(board) != null;
        const there_are_no_more_moves = !GameUtils.thereIsSpace(board);

        return there_is_a_winner || there_are_no_more_moves ? true : false;
    }

    function getBoardUtility(board) {
        if (getWinningSymbol(board) === "X") {
            return 1;
        } else if (getWinningSymbol(board) === "O") {
            return -1;
        } else { // It's a tie
            return 0;
        }
    }

    function getMinimaxAction(board, alpha=undefined, beta=undefined) {

        if (boardIsTerminal(board)) {
            return null;
        }

        let currentPlayer = getCurrentPlayerSymbol(board);

        if (currentPlayer === "X") {

            let bestAction = undefined;
            let bestActionValue = undefined;

            for (const action of getPossibleActions(board)) {

                let resultBoard = getResultBoard(board, action);
                let resultAction = getMinimaxAction(resultBoard, alpha, beta);


                let resultActionValue = resultAction === null ? getBoardUtility(resultBoard) : resultAction[1];

                if (bestActionValue === undefined || resultActionValue > bestActionValue) {
                    bestAction = action;
                    bestActionValue = resultActionValue;
                }

                if (beta != undefined && resultActionValue >= beta) {
                    return [bestAction, bestActionValue];
                }

                if (alpha === undefined || resultActionValue > alpha) {
                    alpha = resultActionValue;
                }

            }

            return [bestAction, bestActionValue];

        } else if (currentPlayer === "O") {

            let bestAction = undefined;
            let bestActionValue = undefined;

            for (const action of getPossibleActions(board)) {

                let resultBoard = getResultBoard(board, action);
                let resultAction = getMinimaxAction(resultBoard, alpha, beta);


                let resultActionValue = resultAction === null ? getBoardUtility(resultBoard) : resultAction[1];

                if (bestActionValue === undefined || resultActionValue < bestActionValue) {
                    bestAction = action;
                    bestActionValue = resultActionValue;
                }

                if (alpha != undefined && resultActionValue <= alpha) {
                    return [bestAction, bestActionValue];
                }

                if (beta === undefined || resultActionValue < beta) {
                    beta = resultActionValue;
                }

            }

            return [bestAction, bestActionValue];

        }

    }

    return {
        EasyBot,
        NormalBot,
        HardBot,
        getPossibleMoves,
        doRandomMove
    }

})();