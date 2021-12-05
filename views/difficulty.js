import Index from "../index.js";
import Game from "./game.js";

export default (() => {

    function display() {
        const gameDiv = document.querySelector(".game");
        gameDiv.append(createText("Choose a difficulty"));
        gameDiv.append(DifficultyOptions.create());
        gameDiv.append(BackButton.create());
    }

    function createText(textContent) {
        const text = document.createElement("p");
        text.textContent = textContent;

        return text;
    }

    const DifficultyOptions = (() => {

        function create() {
            const difficultyOptions = document.createElement("div");
            difficultyOptions.classList.add("difficulty-options");
            difficultyOptions.append(EasyMode.create());
            difficultyOptions.append(NormalMode.create());
            difficultyOptions.append(AgainstJeff.create());
            return difficultyOptions;
        }

        const EasyMode = (() => {
            
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

        const NormalMode = (() => {

            function create() {
                const normalMode = document.createElement("button");
                normalMode.classList.add("normal");
                normalMode.textContent = "Normal";
                return normalMode;
            }

            return { create };
        })();

        const AgainstJeff = (() => {

            function create() {
                const jeff = document.createElement("button");
                jeff.classList.add("jeff");
                jeff.textContent = "Jeff";
                return jeff;
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