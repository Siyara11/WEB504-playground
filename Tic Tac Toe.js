(() => {
 
  const style = document.createElement('style');
  style.textContent = `
    body { font-family: Arial, sans-serif; text-align: center; margin-top: 40px; }
    .board { display: grid; grid-template-columns: repeat(3, 100px); gap: 5px; justify-content: center; margin-top: 20px; }
    .cell {
      width: 100px;
      height: 100px;
      font-size: 2em;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #eee;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .cell:hover { background-color: #ddd; }
    #status { margin-top: 20px; font-weight: bold; font-size: 20px; }
    #restartBtn {
      margin-top: 20px;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement('div');
  const title = document.createElement('h1');
  title.textContent = 'Tic Tac Toe';
  const statusMsg = document.createElement('div');
  statusMsg.id = 'status';
  const boardDiv = document.createElement('div');
  boardDiv.className = 'board';
  const restartBtn = document.createElement('button');
  restartBtn.id = 'restartBtn';
  restartBtn.textContent = 'Restart';

  container.appendChild(title);
  container.appendChild(statusMsg);
  container.appendChild(boardDiv);
  container.appendChild(restartBtn);
  document.body.innerHTML = '';
  document.body.appendChild(container);


  let board = Array(9).fill(null);
  let currentPlayer = 'X';
  let gameOver = false;

  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const renderBoard = () => {
    boardDiv.innerHTML = '';
    board.forEach((val, i) => {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.textContent = val;
      cell.addEventListener('click', () => handleMove(i));
      boardDiv.appendChild(cell);
    });
    statusMsg.textContent = `Player ${currentPlayer}'s turn`;
  };

  const handleMove = (index) => {
    if (gameOver || board[index]) return;
    board[index] = currentPlayer;
    const winner = checkWinner();
    renderBoard();
    if (winner) {
      gameOver = true;
      statusMsg.textContent = winner === 'tie' ? "It's a tie!" : `Player ${winner} wins!`;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  };

  const checkWinner = () => {
    for (const [a, b, c] of winningCombos) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
    }
    return board.includes(null) ? null : 'tie';
  };

  restartBtn.addEventListener('click', () => {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameOver = false;
    renderBoard();
  });


  renderBoard();
})();
