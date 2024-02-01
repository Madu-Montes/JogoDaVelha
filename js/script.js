const currentPlayer = document.querySelector(".currentPlayer");

let selected;

let player = "X";

let positions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
]

function init() {
    selected = [];
    document.querySelector(".hidden-title").textContent = "Jogo da Velha"; 
    currentPlayer.innerHTML = `VEZ DO: ${player}`;

    document.querySelectorAll(".box button").forEach((item) => {
        item.innerHTML = "";
        item.addEventListener("click", newMove);
    });
}

document.querySelector(".hidden-btn").addEventListener("click", function() {
    init();
});


init();

function newMove(e) {
    const index = e.target.getAttribute("data-i");
    e.target.innerHTML = player;
    e.target.removeEventListener("click", newMove);
    selected[index] = player;

    setTimeout(() => {
        check();
    }, [100]);

    player = player === "X" ? "O" : "X";
    currentPlayer.innerHTML = `VEZ DO: ${player}`;

}

function check() {
    let playerLastMove = player === "X" ? "O" : "X";

    const itens = selected
    .map((item, i) => [item, i]) 
    .filter((item) => item[0] === playerLastMove)
    .map((item) => item[1]);

    for (pos of positions) {
        if (pos.every((item) => itens.includes(item))) {
            document.querySelector(".hidden-title").textContent = `O jogador ${playerLastMove} ganhou!`;
            return;
        }
    }

    if (selected.filter((item) => item).length === 9) {
        document.querySelector(".hidden-title").textContent = "Deu Velha!";
        return;
    }
}

document.querySelector(".hidden-btn").addEventListener("click", function() {
    init(); 
});

