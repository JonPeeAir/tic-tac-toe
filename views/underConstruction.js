import Index from "../index.js";

export default (() => {
    function display() {
        const gameDiv = document.querySelector(".game");
        gameDiv.append(ConstructionSign.create());
        gameDiv.append(BackButton.create());
    }

    const ConstructionSign = (() => {

        function create() {
            const constructionDoge = document.createElement("div");
            constructionDoge.append(createText("Umm... Working on it, yes"));
            constructionDoge.append(createDogeImage());
            constructionDoge.append(createText("I'm still training... Come back soon..."));

            return constructionDoge;
        }

        function createDogeImage() {
            const image = document.createElement("img");
            image.src = "images/doge-under-construction.jpg";
            image.alt = "dog with a construction hat";
            image.width = "200";

            return image;
        }

        return { create };
    })();

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

    function createText(text) {
        const textDiv = document.createElement("p");
        textDiv.textContent = text;
        textDiv.style.textAlign = "center";
        return textDiv;
    }

    return { display };
})();