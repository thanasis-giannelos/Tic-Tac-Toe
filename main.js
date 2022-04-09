function Player(marker) {
    this.marker = marker;
}

function Board() {
    this.size = 9;
    this.board = new Array();
    for (let i = 0; i < this.size; i++) {
        this.board.push("");
    }
}
Board.prototype.setMarker = function(index) {
    this.board[index] = currentPlayer.marker;
}


let thereIsWinner = function() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (const combination of winningCombinations) {
        if (board1.board[combination[0]] === currentPlayer.marker && 
            board1.board[combination[1]] === currentPlayer.marker &&
            board1.board[combination[2]] === currentPlayer.marker) {
                return true;
        }
    }
    return false;
}

let isFull = function() {
    for (const tile of board1.board) {
        if (tile === "") {
            return false;
        }
    }
    return true;
}

let switchPlayer = function(){
    if (currentPlayer === player1) {
        currentPlayer = player2;
    } else {
        currentPlayer = player1;
    }
}

function renderBoard() {
    for (let i = 0; i < board1.size; i++) {
        document.getElementById(i + 1).textContent = board1.board[i];
    }
}


function gameFlow(e) {
    if (e.target = "cell") {
        let cellPosition = e.target.id;
        console.log("cell clicked: ", cellPosition);

        if (board1.board[cellPosition-1] === "") {
            board1.setMarker(cellPosition-1);
            
            renderBoard();
            console.log("board1: ", board1.board);

            if (thereIsWinner()) {
                console.log(`${currentPlayer.marker} player wins`);
                document.querySelector(".board").removeEventListener("click", gameFlow);
                document.querySelector(".gameOverDisplay").textContent = `${currentPlayer.marker} Player Wins!`;
                document.querySelector(".gameOverDisplay").classList.toggle("on");
            } else {
                if (isFull()) {
                    console.log("game over - Draw");
                    document.querySelector(".board").removeEventListener("click", gameFlow);
                    document.querySelector(".gameOverDisplay").textContent = `It's a Draw!`;
                    document.querySelector(".gameOverDisplay").classList.toggle("on");
                } else {
                    switchPlayer();
                }
            }
        }
    }
}

//  DRIVER CODE
let board1 = new Board();
console.log("board1 initialized: ", board1.board);
let player1 = new Player("X");
console.log(`player1 initialized with ${player1.marker}`);
let player2 = new Player("O");
console.log(`player2 initialized with ${player2.marker}`);
let currentPlayer = player1;
console.log("current player: ", currentPlayer);
document.querySelector(".board").addEventListener("click", gameFlow);