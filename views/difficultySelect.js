import Index from "../index.js";
import Game from "./game.js";

export default (() => {

    function display() {
        const gameDiv = document.querySelector(".game");
        gameDiv.append(text("Choose a difficulty"));
        gameDiv.append(DifficultyOptions.create());
        gameDiv.append(BackButton.create());
    }

    function text(textContent) {
        const text = document.createElement("p");
        text.textContent = textContent;

        return text;
    }

    const DifficultyOptions = (() => {

        function create() {
            const difficultyOptions = document.createElement("div");
            difficultyOptions.classList.add("difficulty-options");
            difficultyOptions.append(EasyModeButton.create());
            difficultyOptions.append(NormalModeButton.create());
            difficultyOptions.append(HardModeButton.create());
            return difficultyOptions;
        }

        const EasyModeButton = (() => {
            
            function create() {
                const easyMode = document.createElement("button");
                easyMode.classList.add("easy");
                easyMode.textContent = "Easy";
                easyMode.onclick = startEasyBotGame;
                return easyMode;
            }

            function startEasyBotGame() {
                Index.clearGameDisplay();
                Game.display("Player", "Baby Jeff", "easy");
            }

            return { create };
        })();

        const NormalModeButton = (() => {

            function create() {
                const normalMode = document.createElement("button");
                normalMode.classList.add("normal");
                normalMode.textContent = "Normal";
                normalMode.onclick = startNormalBotGame;
                return normalMode;
            }

            function startNormalBotGame() {
                Index.clearGameDisplay();
                Game.display("Player", "Teen Jeff", "normal");
            }

            return { create };
        })();

        const HardModeButton = (() => {

            function create() {
                const jeff = document.createElement("button");
                jeff.classList.add("jeff");
                jeff.textContent = "Jeff";
                jeff.onclick = startHardBotGame;
                return jeff;
            }

            function startHardBotGame() {
                Index.clearGameDisplay();
                Game.display("Player", "Jeff Bezos?", "hard");
            }

            return { create };
        })();

        return { create };
    })();

    const BackButton = (() => {

        function create(){
            const back = document.createElement("button");
            back.innerText = "Back";
            back.classList.add("back");
            back.onclick = Index.goBackToMainMenu;
            return back;
        }

        return { create };
    })();

    return { display };

})();