import PlayerPrompts from "./views/playerPrompts.js";
import MainMenu from "./views/mainMenu.js";

export default (() => {

    function goBackToMainMenu() {
        clearGameDisplay();
        MainMenu.display();
    }

    function getPlayerNames() {
        clearGameDisplay();
        PlayerPrompts.display();
    }

    function clearGameDisplay() {
        const gameDiv = document.querySelector(".game");
        while (gameDiv.firstChild) {
            gameDiv.removeChild(gameDiv.firstChild);
        }
    }

    const GameResults = (() => {
        function display(winner) {
            const gameResults = document.querySelector(".game-results");
            for (let child of gameResults.children) {
                child.classList.add("active");
            }

            console.log(winner);

            if (winner) {
                showWinnerDialog(winner);
            } else {
                showTieDialog();
            }
        }

        function showWinnerDialog(winner) {
            const resultText = document.querySelector(".result-text");
            resultText.textContent = `${winner} wins`
        }

        function showTieDialog() {
            const resultText = document.querySelector(".result-text");
            resultText.textContent = "It's a Tie"
        }

        return { display };
    })();


    return { goBackToMainMenu, getPlayerNames, clearGameDisplay, GameResults }

})();

MainMenu.display();

