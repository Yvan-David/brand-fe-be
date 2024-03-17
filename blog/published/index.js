let button = document.getElementById("button");
let grid = document.getElementById("grid");

let onButtonClick = function (){
    let newCard = document.createElement("div");
    grid.appendChild(newCard);
    newCard.className += "card"
    let newH1 = document.createElement("h1");
    newCard.appendChild(newH1);
    let heading = prompt("Blog Title: ")
    newH1.innerHTML = heading

    let newP = document.createElement("p");
    newCard.appendChild(newP);
    let content = prompt("paste your blog here: ");
    newP.innerHTML = content
}

button.addEventListener("click", onButtonClick)