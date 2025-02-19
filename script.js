const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'x'; // เริ่มต้นที่ X
let gameBoard = ['', '', '', '', '', '', '', '', '']; // กระดานเกม

// ฟังก์ชันที่จัดการการคลิก
cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

resetBtn.addEventListener('click', resetGame);

// ฟังก์ชันสำหรับจัดการคลิก
function handleClick(event) {
    const cell = event.target;
    const index = Array.from(cells).indexOf(cell);

    // ตรวจสอบว่าเซลล์ถูกคลิกแล้วหรือยัง
    if (gameBoard[index] !== '' || checkWinner()) return;

    // กำหนดสัญลักษณ์ให้กับเซลล์
    gameBoard[index] = currentPlayer;
    cell.classList.add(currentPlayer);  // เพิ่มคลาส X หรือ O
    cell.textContent = currentPlayer.toUpperCase();  // เพิ่มตัว X หรือ O ที่เซลล์

    // ตรวจสอบผลลัพธ์
    if (checkWinner()) {
        setTimeout(() => {
            alert(`${currentPlayer.toUpperCase()} wins!`);
            highlightWinner();
        }, 100);
    }

    // เปลี่ยนผู้เล่น
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    status.textContent = `Turn: ${currentPlayer.toUpperCase()}`;
}

// ฟังก์ชันตรวจสอบผู้ชนะ
function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}

// ฟังก์ชันเน้นเซลล์ผู้ชนะ
function highlightWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
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

// ฟังก์ชันรีเซ็ตเกม
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.classList.remove('x', 'o', 'winner');
        cell.textContent = '';  // ลบข้อความจากเซลล์
    });
    status.textContent = 'Turn: X';
    currentPlayer = 'x';
}

function sendStatsToServer(winner) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "save_stats.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log("บันทึกข้อมูลสำเร็จ");
        }
    };
    xhr.send("winner=" + winner);
}

// เมื่อเกมจบและมีผู้ชนะ
if (checkWinner()) {
    setTimeout(() => {
        alert(`${currentPlayer.toUpperCase()} wins!`);
        sendStatsToServer(currentPlayer.toUpperCase());
        highlightWinner();
    }, 100);
}

