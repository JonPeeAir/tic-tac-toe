import UnderConstruction from "./underConstruction.js";

import Index from "../index.js";
import PlayerPrompts from "./playerPrompts.js"

export default (() => {

    function display() {
        const gameDiv = document.querySelector(".game");
        gameDiv.innerText = "Choose a gamemode"
        gameDiv.append(GameModes.create());
    }

    const GameModes = (() => {

        function create() {
            const gamemodeOptions = document.createElement("div");
            gamemodeOptions.classList.add("choices");
            gamemodeOptions.append(LocalMode.create());
            gamemodeOptions.append(AgainstBotMode.create());

            return gamemodeOptions;
        }

        const LocalMode = (() => {
            function create() {
                const local = document.createElement("button");
                local.innerText = "Local";
                local.id = "local";
                local.onclick = getPlayerNames;

                return local;
            }

            function getPlayerNames() {
                Index.clearGameDisplay();
                PlayerPrompts.display();
            }

            return { create };
        })();

        const AgainstBotMode = (() => {
            function create() {
                const againstBot = document.createElement("button");
                againstBot.innerText = "Against Bot"
                againstBot.id = "against-bot";
                againstBot.onclick = displayUnderConstruction;

                return againstBot;
            }

            function displayUnderConstruction() {
                Index.clearGameDisplay();
                UnderConstruction.display();
            }

            return { create };
        })();

        return { create };
    })();

    // These are the only usable methods and properties outside this file
    return { display };
})();
