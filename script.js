// 初期盤面 (0は空マス)
const puzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

// 正解
const solution = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

let selectedCell = null;

// 盤面を生成
function generateBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    for (let row = 0; row < 9; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < 9; col++) {
            const td = document.createElement('td');
            if (puzzle[row][col] !== 0) {
                td.textContent = puzzle[row][col];
                td.classList.add('fixed'); // 初期値には 'fixed' クラスを追加
            } else {
                td.addEventListener('click', () => selectCell(td, row, col));
            }
            tr.appendChild(td);
        }
        board.appendChild(tr);
    }
}

// セルを選択
function selectCell(cell, row, col) {
    // 初期値セルは選択不可
    if (cell.classList.contains('fixed')) return;

    // すでに選択されているセルがある場合、その選択を解除
    if (selectedCell) {
        selectedCell.cell.classList.remove('selected');
    }

    // 新しいセルを選択
    cell.classList.add('selected');
    selectedCell = { cell, row, col };
}

// 数字を入力
function inputNumber(number) {
    if (!selectedCell) return;

    const { cell, row, col } = selectedCell;

    cell.textContent = number;
    puzzle[row][col] = number;
    cell.classList.add('user-input'); // ユーザー入力のセルに 'user-input' クラスを追加
    validateInput(number, row, col);
}

// クリア機能
function clearCell() {
    if (!selectedCell) return;

    const { cell, row, col } = selectedCell;

    // ユーザー入力のセルのみクリア
    if (cell.classList.contains('user-input')) {
        cell.textContent = '';
        cell.classList.remove('user-input'); // 'user-input' クラスを解除
        puzzle[row][col] = 0;
    }
}

// 入力の検証
function validateInput(number, row, col) {
    const message = document.getElementById('message');
    if (number !== solution[row][col]) {
        message.textContent = '間違っています。';
    } else {
        message.textContent = '';
        checkClear();
    }
}

// クリア判定
function checkClear() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (puzzle[row][col] !== solution[row][col]) {
                return;
            }
        }
    }
    document.getElementById('message').textContent = 'クリア！おめでとうございます！';
}

// ゲームの初期化
generateBoard();