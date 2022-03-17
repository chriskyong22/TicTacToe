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

var currentTurnInput = document.querySelector('.current-turn-text');
var resetBtn = document.querySelector('.reset-game-btn');
var winnerTxt = document.querySelector('.winner');

resetBtn.addEventListener('click', resetBoard);
currentTurnInput.textContent = gameBoard.getCurrentTurn();

function updateCurrentTurn() {
    currentTurnInput.textContent = gameBoard.getCurrentTurn();
}

function setBoard() {
    let board = gameBoard.getBoard();
    let cells = getBoardCells();
    for (let cell of cells) {
        let [row, col] = cell.getAttribute('data-row-column').split(',');
        cell.textContent = board[row][col];
    }
}

function initBoard() {
    let cells = getBoardCells();
    for (let cell of cells) {
        let [row, col] = cell.getAttribute('data-row-column').split(',');
        cell.addEventListener('click', setCell);
    }
    setBoard();
}

function setCell(event) {
    let [row, col] = event.currentTarget.getAttribute('data-row-column').split(',');
    console.log(gameBoard.move(parseInt(row), parseInt(col)));
    event.currentTarget.textContent = gameBoard.getBoard()[row][col];
    updateCurrentTurn();
    updateFinishGameUI();
}

function* getBoardCells() {
    let board = gameBoard.getBoard();
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            let dataAttribute = `${row},${col}`;
            yield document.querySelector(`[data-row-column="${dataAttribute}"]`);
        }
    }
}

function updateFinishGameUI() {
    winnerTxt.textContent = gameBoard.checkFinishedGame() ? gameBoard.getWinner() : "";
}

function resetBoard() {
    gameBoard.resetBoard();
    setBoard();
    updateCurrentTurn();
    updateFinishGameUI();
}

initBoard();