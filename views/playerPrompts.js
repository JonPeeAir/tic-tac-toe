import LocalGame from "./localGame.js";
import Index from "../index.js";

export default (() => {

    function display() {
        const gameDiv = document.querySelector(".game");
        gameDiv.append(PlayerPrompts.create());
        gameDiv.append(NavButtons.create());

        document.addEventListener("keydown", function startLocalGameWithEnterKey(event) {
            if(event.key === "Enter") {
                console.log("Enter key was pressed");
                NavButtons.NextButton.startLocalGame();
                document.removeEventListener("keydown", startLocalGameWithEnterKey);
            }
        });
    }

    const PlayerPrompts = (() => {
        function create() {
            const playerPromts = document.createElement("div");
            playerPromts.classList.add("player-prompts");
            playerPromts.append(createPromptFor("Player 1"));
            playerPromts.append(createPromptFor("Player 2"));

            return playerPromts;
        }

        function createPromptFor(playerLabel) {
            const label = document.createElement("label");
            label.innerHTML = `${playerLabel}'s name <br>`;

            const input = document.createElement("input");
            input.type = "text";
            input.autocomplete = "off";
            input.id = `${toClassName(playerLabel)}`;
            input.name = `${toClassName(playerLabel)}`;

            label.append(input);
            return label;
        }

        function toClassName(playerLabel) {
            return playerLabel.split(" ").join("-").toLowerCase();
        }

        return { create };

    })();

    const NavButtons = (() => {
        function create() {
            const navButtons = document.createElement("div");
            navButtons.classList.add("nav-btns");
            navButtons.append(BackButton.create());
            navButtons.append(NextButton.create());

            return navButtons;
        }

        const BackButton = (() => {
            function create() {
                const back = document.createElement("button");
                back.innerText = "Back";
                back.classList.add("back");
                back.onclick = Index.goBackToMainMenu;

                return back;
            }

            return { create };
        })();

        const NextButton = (() => {
            function create() {
                const button = document.createElement("button");
                button.innerText = "Next";
                button.classList.add("next");
                button.onclick = startLocalGame;

                return button;
            }

            function startLocalGame() {
                const player1 = document.getElementById("player-1").value;
                const player2 = document.getElementById("player-2").value;

                Index.clearGameDisplay();
                LocalGame.display(player1, player2);
            }

            return { create, startLocalGame };
        })();

        return { create, NextButton};
    })();

    // These are the only usable methods and properties outside this file
    return { display };
})();
