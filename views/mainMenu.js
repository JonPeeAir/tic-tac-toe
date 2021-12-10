import Index from "../index.js";
import PlayerPrompts from "./playerPrompts.js"
import DifficultySelect from "./difficultySelect.js";

export default (() => {

    function display() {
        const gameDiv = document.querySelector(".game");
        gameDiv.innerText = "Choose a gamemode"
        gameDiv.append(GameModeButtons.create());
    }

    const GameModeButtons = (() => {

        function create() {
            const gamemodeOptions = document.createElement("div");
            gamemodeOptions.classList.add("choices");
            gamemodeOptions.append(LocalModeButton.create());
            gamemodeOptions.append(AgainstBotButton.create());

            return gamemodeOptions;
        }

        const LocalModeButton = (() => {
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

        const AgainstBotButton = (() => {
            function create() {
                const againstBot = document.createElement("button");
                againstBot.innerText = "Against Bot"
                againstBot.id = "against-bot";
                againstBot.onclick = chooseDifficulty;

                return againstBot;
            }

            function chooseDifficulty() {
                Index.clearGameDisplay();
                DifficultySelect.display();
            }

            return { create };
        })();

        return { create };
    })();

    // These are the only usable methods and properties outside this file
    return { display };
})();
