import GameUtils from "./gameUtils.js"
import Game from "../views/game.js"

export default (() => {

    // This bot will only make random moves
    const EasyBot = (() => {

        function makeMove() { 
            doRandomMove(); 
        }

        return { makeMove };
    })();

    // This bot will only make a random move at the start. The rest of its moves will be smart
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

    // This bot will only make smart moves
    const HardBot = (() => {

        function makeMove() { 
            doSmartMove(); 
        }

        return { makeMove };
    })();


// ---------- ALL HELPER FUNCTIONS ---------- //

    function doRandomMove() {
        // Get all empty spaces in the board
        const allSpaces = Array.from(document.getElementsByClassName("space"));
        const emptySpaces = allSpaces.filter(space => space.innerText === "");

        // Choose a random space
        let randomIndex = Math.floor(Math.random() * emptySpaces.length);
        const randomSpace = emptySpaces[randomIndex];

        // Play on that random space
        const board = Game.GameBoard.getBoard();
        randomSpace.innerText = GameUtils.getCurrentPlayerSymbol(board);
    }

    function doSmartMove() {
        // Get a reference to all spaces on the board
        const board = Game.GameBoard.getBoard();
        const htmlBoard = Game.GameBoard.getHTMLBoard();

        // Calculate the optimal action using minimax
        const action = getMinimaxAction(board)[0];

        // Play the action on the board
        htmlBoard[action[0]][action[1]].innerText = GameUtils.getCurrentPlayerSymbol(board);
    }

    function getPossibleActions(board) {
        // Returns an array of actions where an action is defined by a 2-element array [i, j]

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
        // Returns the resulting board applying the given action

        // This does a deep copy of the board and puts it into resultBoard
        const resultBoard = JSON.parse(JSON.stringify(board));

        const currentSymbol = GameUtils.getCurrentPlayerSymbol(board);
        resultBoard[action[0]][action[1]] = currentSymbol;

        return resultBoard;
    }

    function getBoardUtility(board) {
        // Returns the utility/score of a terminal board

        if (GameUtils.getWinningSymbol(board) === "X") {
            return 1;
        } else if (GameUtils.getWinningSymbol(board) === "O") {
            return -1;
        } else { // It's a tie
            return 0;
        }
    }

    function getMinimaxAction(board, alpha=undefined, beta=undefined) {
        // Returns an array with an action as its first element and its utility/score as its second element

        if (GameUtils.boardIsTerminal(board)) {
            return null;
        }

        let currentPlayer = GameUtils.getCurrentPlayerSymbol(board);

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

// ---------- END OF HELPER FUNCTIONS ---------- //

    return {
        EasyBot,
        NormalBot,
        HardBot,
    }

})();