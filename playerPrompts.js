import { goBackToMainMenu } from "./script.js";

const gameDiv = document.querySelector(".game");

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

export { displayPlayerPrompts };