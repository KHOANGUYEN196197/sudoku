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

const initialBoard = [
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

function createBoard() {
  const boardDiv = document.getElementById('sudoku-board');
  boardDiv.innerHTML = '';

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const input = document.createElement('input');
      input.type = 'text';
      input.maxLength = 1;

      const value = initialBoard[row][col];
      if (value !== 0) {
        input.value = value;
        input.disabled = true;
        input.style.background = "#eee";
      }

      input.dataset.row = row;
      input.dataset.col = col;

      input.addEventListener('input', (e) => {
        const val = e.target.value;
        if (!/^[1-9]$/.test(val)) {
          e.target.value = '';
        }
      });
      input.addEventListener('dblclick', () => {
        if (!input.disabled && input.value == '') {
          const row = +input.dataset.row;
          const col = +input.dataset.col;
          input.value = solution[row][col];
          updateAllCandidates();
        }else if(!input.disabled && input.value) {
          input.value = '';
        }
      });

      boardDiv.appendChild(input);
    }
  }
}

function checkBoard() {
  const inputs = document.querySelectorAll('#sudoku-board input');
  let valid = true;

  inputs.forEach(input => input.style.backgroundColor = 'white');

  for (let input of inputs) {
    const row = +input.dataset.row;
    const col = +input.dataset.col;
    const val = input.value;

    if (val === '') continue;

    if (!isValid(row, col, +val)) {
      input.style.backgroundColor = '#f99';
      valid = false;
    }
  }

  if (valid) {
    alert("Bảng Sudoku hợp lệ!");
  } else {
    alert("Có lỗi trong bảng Sudoku.");
  }
}

function isValid(row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (i !== col && getValue(row, i) === num) return false;
    if (i !== row && getValue(i, col) === num) return false;
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;

  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if ((r !== row || c !== col) && getValue(r, c) === num) return false;
    }
  }

  return true;
}

function getValue(row, col) {
  const input = document.querySelector(`input[data-row="${row}"][data-col="${col}"]`);
  return input && input.value ? +input.value : 0;
}

createBoard();
