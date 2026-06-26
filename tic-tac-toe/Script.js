let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let scores = { X: 0, O: 0, draw: 0 };

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function makeMove(index) {
    if (!gameActive || board[index] !== '') return;
    
    board[index] = currentPlayer;
    const cell = document.querySelector(`[data-index="${index}"]`);
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    
    if (checkWin()) {
        endGame(false);
    } else if (board.every(cell => cell !== '')) {
        endGame(true);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
    }
}

function checkWin() {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            highlightWin(condition);
            return true;
        }
    }
    return false;
}

function highlightWin(cells) {
    cells.forEach(index => {
        document.querySelector(`[data-index="${index}"]`).classList.add('winner');
    });
}

function endGame(isDraw) {
    gameActive = false;
    const status = document.getElementById('status');
    
    if (isDraw) {
        status.textContent = "It's a Draw!";
        scores.draw++;
        document.getElementById('scoreDraw').textContent = scores.draw;
    } else {
        status.textContent = `Player ${currentPlayer} Wins!`;
        scores[currentPlayer]++;
        document.getElementById(`score${currentPlayer}`).textContent = scores[currentPlayer];
    }
}

function updateStatus() {
    document.getElementById('status').textContent = `Player ${currentPlayer}'s Turn`;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell';
    });
    
    updateStatus();
}

function resetScores() {
    scores = { X: 0, O: 0, draw: 0 };
    document.getElementById('scoreX').textContent = '0';
    document.getElementById('scoreO').textContent = '0';
    document.getElementById('scoreDraw').textContent = '0';
    resetGame();
}