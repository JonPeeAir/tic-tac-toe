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

function displayMainMenu() {

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

    gameDiv.innerText = "Choose a gamemode";
    gameDiv.append(createGamemodeOptions());
}

function displayPlayerPrompts() {

    function createPlayerPrompts() {

        function toClassName(name) {
            return name.split(" ").join("-").toLowerCase();
        }

        function createPromptFor(name) {
            const label = document.createElement("label");
            label.innerHTML = `${name}'s name <br>`;

            const input = document.createElement("input");
            input.type = "text";
            input.id = `${toClassName(name)}`;
            input.name = `${toClassName(name)}`;

            label.append(input);
            return label;
        }

        const playerPromts = document.createElement("div");
        playerPromts.classList.add("player-prompts");
        playerPromts.append(createPromptFor("Player 1"));
        playerPromts.append(createPromptFor("Player 2"));

        return playerPromts;
    }

    function createNavButtons() {

        function createBackButton() {
            const back = document.createElement("button");
            back.innerText = "Back";
            back.classList.add("back");
            back.onclick = goBackToMainMenu;

            return back;
        }

        function createNextButton() {
            const button = document.createElement("button");
            button.innerText = "Next";
            button.classList.add("next");

            return button;
        }

        const navButtons = document.createElement("div");
        navButtons.classList.add("nav-btns");
        navButtons.append(createBackButton());
        navButtons.append(createNextButton());

        return navButtons;
    }

    gameDiv.append(createPlayerPrompts());
    gameDiv.append(createNavButtons());
}

