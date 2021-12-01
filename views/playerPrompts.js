import localGame from "./localGame.js";
import index from "../index.js";

const gameDiv = document.querySelector(".game");

export default function displayPlayerPrompts() {

    function createPlayerPrompts() {

        function toClassName(name) {
            return name.split(" ").join("-").toLowerCase();
        }

        function createPromptFor(name) {
            const label = document.createElement("label");
            label.innerHTML = `${name}'s name <br>`;

            const input = document.createElement("input");
            input.type = "text";
            input.autocomplete = "off";
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
            back.onclick = index.goBackToMainMenu;

            return back;
        }

        function createNextButton() {

            function startLocalGame() {
                const player1 = document.getElementById("player-1").value;
                const player2 = document.getElementById("player-2").value;

                index.clearGameDisplay();
                localGame.display(player1, player2);
            }

            const button = document.createElement("button");
            button.innerText = "Next";
            button.classList.add("next");
            button.onclick = startLocalGame;

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
