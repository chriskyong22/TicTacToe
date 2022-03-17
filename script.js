// Loaded the boardGame.js before this module.
// Methods:
/*
    getCurrentTurn,
    getBoard,
    move,
    getWinner,
    checkFinishedGame,
    resetBoard
*/

console.log("Test");
console.log(gameBoard.getBoard());

var currentTurnInput = document.querySelector('.current-turn-text');

function updateCurrentTurn() {
    currentTurnInput.textContent = gameBoard.getCurrentTurn();
}

function initBoard() {
    let board = gameBoard.getBoard();
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            let dataAttribute = `${row},${col}`;
            let cell = document.querySelector(`[data-row-col="${dataAttribute}"]`);
            console.log(cell);
        }
    }
}

initBoard();