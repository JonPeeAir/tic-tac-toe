import { displayPlayerPrompts } from "./playerPrompts.js";
import { displayMainMenu } from "./mainMenu.js";

const gameDiv = document.querySelector(".game");
const localGamemode = document.getElementById("local");
const againstBotGamemode = document.getElementById("against-bot");

localGamemode.addEventListener("click", getPlayerNames);

function goBackToMainMenu() {
    clearGameDisplay();
    displayMainMenu();
}

function getPlayerNames() {
    clearGameDisplay();
    displayPlayerPrompts();
}

function clearGameDisplay() {
    while (gameDiv.firstChild) {
        gameDiv.removeChild(gameDiv.firstChild);
    }
}

export { goBackToMainMenu, getPlayerNames };

