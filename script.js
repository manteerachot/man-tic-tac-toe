const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const xWinsElement = document.getElementById('xWins');
const oWinsElement = document.getElementById('oWins');
const drawsElement = document.getElementById('draws');

let currentPlayer = 'x'; 
let gameBoard = ['', '', '', '', '', '', '', '', '']; 
let xWins = 0;
let oWins = 0;
let draws = 0;

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

resetBtn.addEventListener('click', resetGame);

function handleClick(event) {
    const cell = event.target;
    const index = Array.from(cells).indexOf(cell);

    if (gameBoard[index] !== '' || checkWinner()) return;

    gameBoard[index] = currentPlayer;
    cell.classList.add(currentPlayer);
    cell.textContent = currentPlayer.toUpperCase();

    if (checkWinner()) {
        setTimeout(() => {
            alert(`${currentPlayer.toUpperCase()} wins!`);
            updateStats(currentPlayer);
            highlightWinner();
        }, 100);
        return;
    }

    if (!gameBoard.includes('')) {
        setTimeout(() => {
            alert("It's a draw!");
            updateStats('draw');
        }, 100);
    }

    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    status.textContent = `Turn: ${currentPlayer.toUpperCase()}`;
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}

function highlightWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
        }
    }
}

function updateStats(winner) {
    if (winner === 'x') {
        xWins++;
        xWinsElement.textContent = xWins;
    } else if (winner === 'o') {
        oWins++;
        oWinsElement.textContent = oWins;
    } else {
        draws++;
        drawsElement.textContent = draws;
    }
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.classList.remove('x', 'o', 'winner');
        cell.textContent = '';
    });
    status.textContent = 'Turn: X';
    currentPlayer = 'x';
}