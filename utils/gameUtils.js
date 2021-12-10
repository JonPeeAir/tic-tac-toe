import Game from "../views/game.js";

export default (() => {

    function thereIsSpace(board) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === "") return true;
            }
        }
        return false;
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

    function getWinningSymbol(board) {

        function checkRow(symbol) {
            for (let i = 0; i < board.length; i++) {
                if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][2] === symbol) {
                    return true;
                }
            }
            return false;
        }

        function checkColumn(symbol) {
            for (let i = 0; i < board.length; i++) {
                if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[2][i] === symbol) {
                    return true;
                }
            }
            return false;
        }

        function checkDiagonal(symbol) {
            const topLeftToBottomRight = board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[2][2] === symbol;
            const topRightToBottomLeft= board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[2][0] === symbol;

            return topLeftToBottomRight || topRightToBottomLeft
        }

        if (checkRow("X") || checkColumn("X") || checkDiagonal("X")) {
            return "X";
        } else if (checkRow("O") || checkColumn("O") || checkDiagonal("O")) {
            return "O";
        } else {
            return null;
        }
    }

    function getLosingSymbol(board) {
        return getWinningSymbol(board) === "X" ? "O" : "X";
    }

    function boardIsTerminal(board) {
        const there_is_a_winner = getWinningSymbol(board) != null;
        const there_are_no_more_moves = !thereIsSpace(board);

        return there_is_a_winner || there_are_no_more_moves ? true : false;
    }

    return { 
        thereIsSpace,
        getCurrentPlayerSymbol,
        getOtherPlayerSymbol,
        getWinningSymbol,
        getLosingSymbol,
        boardIsTerminal
    }
})();

