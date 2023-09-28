
const GameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => board;

    return { getBoard };
})();

let players = [];

let currentPlayerIndex = 0;
let gameEnd = false;

const gameboard = document.querySelector('.board');
const boardArray = GameBoard.getBoard();

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name1 = document.getElementById('name1').value;
    const name2 = document.getElementById('name2').value;

    players = [
        { name: name1, symbol: "X" },
        { name: name2, symbol: "O" }
    ];

    name1.value = "";
    name2.value = "";

    for (let i = 0; i < 9; i++) {

        const newCell = document.createElement('div');
        newCell.classList.add('cell');
        newCell.textContent = boardArray[i];
        gameboard.appendChild(newCell);

        newCell.addEventListener('click', () => {
            if (gameEnd) {
                return;
            }

            if (boardArray[i] === "") {
                const currentPlayer = players[currentPlayerIndex];
                newCell.textContent = currentPlayer.symbol;
                boardArray[i] = currentPlayer.symbol;

                currentPlayerIndex = (currentPlayerIndex + 1) % players.length;

                if (winner()) {
                    showWinner(currentPlayer);
                    gameEnd = true;
                } else if (tie()) {
                    showTie();
                    gameEnd = true;
                }
            }
        });
    }
});

function winner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardArray[a] && boardArray[a] === boardArray[b] && boardArray[a] === boardArray[c]) {
            return true;
        }
    }

    return false;
}

function tie() {
    for (const cell of boardArray) {
        if (cell === "") {
            return false;
        }
    }
    return true;
}

function showWinner(currentPlayer) {
    alert(`${currentPlayer.name} wins!`);
}

function showTie() {
    alert("It's a tie!");
}

const restart = document.querySelector('.restart-btn');
restart.addEventListener('click', () => {
    name1.value = "";
    name2.value = "";
    gameEnd = false;
    gameboard.innerHTML = '';

    boardArray.fill("");
});
