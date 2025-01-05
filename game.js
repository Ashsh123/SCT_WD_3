class TicTacToe {
    constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.gameMode = 'player';
        this.gameActive = true;

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const cells = document.querySelectorAll('.cell');
        const playerModeBtn = document.getElementById('player-mode');
        const computerModeBtn = document.getElementById('computer-mode');
        const resetBtn = document.getElementById('reset-game');

        cells.forEach(cell => {
            cell.addEventListener('click', () => this.handleCellClick(cell));
        });

        playerModeBtn.addEventListener('click', () => this.setGameMode('player'));
        computerModeBtn.addEventListener('click', () => this.setGameMode('computer'));
        resetBtn.addEventListener('click', () => this.resetGame());
    }

    handleCellClick(cell) {
        const index = cell.getAttribute('data-index');

        if (!this.gameActive || this.board[index] !== null) return;

        this.makeMove(index);

        if (this.gameMode === 'computer' && this.gameActive) {
            this.computerMove();
        }
    }

    makeMove(index) {
        this.board[index] = this.currentPlayer;
        document.querySelector(`[data-index="${index}"]`).textContent = this.currentPlayer;

        if (this.checkWinner()) {
            this.endGame(false);
        } else if (this.isDraw()) {
            this.endGame(true);
        } else {
            this.switchPlayer();
        }
    }

    computerMove() {
        const emptyCells = this.board
            .map((cell, index) => cell === null ? index : null)
            .filter(val => val !== null);

        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        this.makeMove(randomCell);
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('current-player').textContent = `Current Player: ${this.currentPlayer}`;
    }

    checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
            [0, 4, 8], [2, 4, 6]              // Diagonals
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return this.board[a] && 
                   this.board[a] === this.board[b] && 
                   this.board[a] === this.board[c];
        });
    }

    isDraw() {
        return this.board.every(cell => cell !== null);
    }

    endGame(draw) {
        this.gameActive = false;
        if (draw) {
            alert('Game is a Draw!');
        } else {
            alert(`Player ${this.currentPlayer} Wins!`);
        }
    }

    setGameMode(mode) {
        this.gameMode = mode;
        this.resetGame();
    }

    resetGame() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.gameActive = true;

        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.textContent = '';
        });

        document.getElementById('current-player').textContent = 'Current Player: X';
    }
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});