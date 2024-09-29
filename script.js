const board = document.getElementById("puzzleBoard");
const shuffleButton = document.getElementById("shuffleButton");
const movesCounter = document.getElementById("moves");

let moves = 0;
let tiles;
let blankTile;

function createJumbledBoard() {
    const tileArray = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    for (let i = tileArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tileArray[i], tileArray[j]] = [tileArray[j], tileArray[i]];
    }

    const board = [];
    let index = 0;
    for (let row = 0; row < 3; row++) {
        const currentRow = [];
        for (let col = 0; col < 3; col++) {
            currentRow.push(tileArray[index]);
            index++;
        }
        board.push(currentRow);
    }
    return board;
}

function startGame() { 
    tiles = createJumbledBoard();
    
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (tiles[row][col] === 0) {
                blankTile = { row, col };
            }
        }
    }
    moves = 0;
    updateMoves();
    displayBoard(); 
}

function displayBoard() { 
    board.innerHTML = ''; 
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const tileValue = tiles[row][col];
            const tileElement = document.createElement('div');
            tileElement.classList.add('tile');
            tileElement.innerText = tileValue === 0 ? '' : tileValue; 
            
            if (tileValue === 0) {
                tileElement.classList.add('blank'); 
            } else {
                tileElement.addEventListener('click', () => moveTile(row, col)); 
            }
            
            board.appendChild(tileElement);
        }
    }
}

function moveTile(row, col) {
    const isValidMove = (
        (row === blankTile.row && Math.abs(col - blankTile.col) === 1) || 
        (col === blankTile.col && Math.abs(row - blankTile.row) === 1)
    );

    if (isValidMove) {
        tiles[blankTile.row][blankTile.col] = tiles[row][col];
        tiles[row][col] = 0;
        blankTile = { row, col }; 
        moves++;
        updateMoves();
        displayBoard(); 
        checkWin();
    }
}

function updateMoves() {
    movesCounter.innerText = `Moves: ${moves}`;
}

function checkWin() {
    const winState = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 0]
    ];
    if (JSON.stringify(tiles) === JSON.stringify(winState)) {
        setTimeout(() => alert("Congratulations! You solved the puzzle!"), 100);
    }
}

shuffleButton.addEventListener('click', () => {
    tiles = createJumbledBoard(); 
    moves = 0;
    updateMoves();
    displayBoard(); 
});

startGame(); 
