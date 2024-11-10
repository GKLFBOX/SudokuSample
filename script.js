let puzzle = [];
let solution = [];
let selectedCell = null;

// ランダムに数独の解を生成する関数
function generateSolution() {
    const baseGrid = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [2, 3, 4, 5, 6, 7, 8, 9, 1],
        [5, 6, 7, 8, 9, 1, 2, 3, 4],
        [8, 9, 1, 2, 3, 4, 5, 6, 7],
        [3, 4, 5, 6, 7, 8, 9, 1, 2],
        [6, 7, 8, 9, 1, 2, 3, 4, 5],
        [9, 1, 2, 3, 4, 5, 6, 7, 8],
    ];

    // 行と列をランダムに入れ替えて解を生成
    for (let i = 0; i < 10; i++) {
        shuffleRows(baseGrid);
        shuffleColumns(baseGrid);
    }

    return baseGrid;
}

// 行をランダムに入れ替える
function shuffleRows(grid) {
    const section = Math.floor(Math.random() * 3) * 3;
    const row1 = section + Math.floor(Math.random() * 3);
    const row2 = section + Math.floor(Math.random() * 3);
    [grid[row1], grid[row2]] = [grid[row2], grid[row1]];
}

// 列をランダムに入れ替える
function shuffleColumns(grid) {
    const section = Math.floor(Math.random() * 3) * 3;
    const col1 = section + Math.floor(Math.random() * 3);
    const col2 = section + Math.floor(Math.random() * 3);
    for (let row = 0; row < 9; row++) {
        [grid[row][col1], grid[row][col2]] = [grid[row][col2], grid[row][col1]];
    }
}

// 問題を生成する関数
function generatePuzzle(difficulty = 40) {
    solution = generateSolution();
    puzzle = solution.map(row => [...row]);

    let emptyCells = difficulty; // 難易度に応じて空白セルの数を決定
    while (emptyCells > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (puzzle[row][col] !== 0) {
            puzzle[row][col] = 0;
            emptyCells--;
        }
    }
}

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
function initializeGame() {
    generatePuzzle(); // ランダムな問題を生成
    generateBoard();  // 盤面を表示
}

// 初期化を実行
initializeGame();