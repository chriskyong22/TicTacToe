let gameBoard = (function(){
    const BOARD_SIZE = 3;
    let tiles = ['X', 'O'];
    let currentTurn = 0;
    let finishGame = false;
    let finishState = '';
    let piecesPlaced = 0;

    let board = [
                    ['','',''],
                    ['','',''],
                    ['','','']
                ];
    
    function resetBoard() {
        currentTurn = 0;
        finishGame = false;
        finishState = '';
        piecesPlaced = 0;
        board = board.map((boardRow) => boardRow.map((_item) => ''));
    }

    function getBoard() {
        return board;
    }

    function getCurrentTurn() {
        return tiles[currentTurn];
    }

    function move(x, y) {
        if (x >= 3 || 
                y >= 3 || 
                y < 0 || 
                x < 0 || 
                board[x][y] !== '' ||
                finishGame) {
            return false;
        }

        board[x][y] = tiles[currentTurn];
        currentTurn = currentTurn ? 0 : 1;
        piecesPlaced++;
        calculateNewBoardState(x, y);
        return true;
    }

    function calculateNewBoardState(x, y) {
        finishGame = checkWin(x, y);
        if (!finishGame && piecesPlaced === (BOARD_SIZE * BOARD_SIZE)) {
            finishGame = true;
            finishState = 'T';
        }
    }

    function checkRowAndColumn(x, y) {
        const CURRENT_TILE = board[x][y];
        let rowSameTile = 0;
        let colSameTile = 0;
        for (let tile = 0; tile < BOARD_SIZE; tile++) {
            if (CURRENT_TILE === board[tile][y]) {
                colSameTile++;
            }
            if (CURRENT_TILE === board[x][tile]) {
                rowSameTile++;
            }
        }
        return rowSameTile === 3 || colSameTile === 3;
    }

    function checkTopLeftDiagonal(x, y) {
        const CURRENT_TILE = board[x][y];
        let leftDiagonal = 0;
        for (let row = x, col = y; row >= 0 && col >= 0; row--, col--) {
            if (CURRENT_TILE === board[row][col]) {
                leftDiagonal++;
            }
        }
        for (let row = x + 1, col = y + 1; row < BOARD_SIZE && col < BOARD_SIZE; row++, col++) {
            if (CURRENT_TILE === board[row][col]) {
                leftDiagonal++;
            }
        }
        return leftDiagonal === 3;
    }

    function checkBottomLeftDiagonal(x, y) {
        const CURRENT_TILE = board[x][y];
        let rightDiagonal = 0;
        for (let row = x, col = y; row < BOARD_SIZE && col >= 0; row++, col--) {
            if (CURRENT_TILE === board[row][col]) {
                rightDiagonal++;
            }
        }
        for (let row = x - 1, col = y + 1; row >= 0 && col < BOARD_SIZE; row--, col++) {
            if (CURRENT_TILE === board[row][col]) {
                rightDiagonal++;
            }
        }
        return rightDiagonal === 3;
    }

    function checkWin(x, y) {
        if (checkRowAndColumn(x, y) ||
                checkTopLeftDiagonal(x, y) ||
                checkBottomLeftDiagonal(x, y)) {
            finishState = board[x][y];
            return true;
        }
        return false;
    }
    
    function checkFinishedGame() {
        return finishGame;
    }

    function getWinner() {
        return finishState; 
    }

    return {
        getCurrentTurn,
        getBoard,
        move,
        getWinner,
        checkFinishedGame,
        resetBoard
    }
})();

