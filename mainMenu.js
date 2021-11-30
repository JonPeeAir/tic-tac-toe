import { getPlayerNames } from "./script.js";

const gameDiv = document.querySelector(".game");

export default function displayMainMenu() {

    function createGamemodeOptions() {

        function createLocalOption() {
            const local = document.createElement("button");
            local.innerText = "Local";
            local.id = "local";
            local.onclick = getPlayerNames;

            return local;
        }
        
        function createAgainstBotOption() {
            const againstBot = document.createElement("button");
            againstBot.innerText = "Against Bot"
            againstBot.id = "against-bot";

            return againstBot;
        }

        const gamemodeOptions = document.createElement("div");
        gamemodeOptions.classList.add("choices");
        gamemodeOptions.append(createLocalOption());
        gamemodeOptions.append(createAgainstBotOption());

        return gamemodeOptions;
    }

    gameDiv.innerText = "Choose a gamemode"
    gameDiv.append(createGamemodeOptions());
}
