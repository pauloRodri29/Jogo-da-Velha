
const squares = document.querySelectorAll('.square');
const status = document.querySelector('#status');
const resetButton = document.querySelector('#reinicia-btn');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

const checkForWinner = () => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
        const winnerSquares = [squares[a], squares[b], squares[c]];
        winnerSquares.forEach(square => square.classList.add('ganhou'));
        return board[a];
    }
  }

  if (board.indexOf('') === -1) {
    return 'draw';
  }

  return null;
};

const updateStatus = () => {
  if (gameOver) {
    console.log(checkForWinner());
    if (checkForWinner() === 'draw') {
      status.textContent = 'Empate!';
    } else {
      status.textContent = `Parabéns, o " ${currentPlayer} " ganhou!`;
      status.classList.add('ganhou');
    }
    resetButton.textContent = 'Reiniciar Jogo';
  } else {
    status.textContent = `É a vez de " ${currentPlayer} "`;
    resetButton.textContent = 'Reiniciar Jogo';
  }
};

const handleClick = (e) => {
  const index = Array.from(squares).indexOf(e.target);
  if (board[index] === '' && !gameOver) {
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    const winner = checkForWinner();
    if (winner) {
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
    updateStatus();
  }
};

const handleReset = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    squares.forEach((square) => {
        square.classList.remove('ganhou');
      });
     status.classList.remove('ganhou');
    squares.forEach((square) => square.textContent = '');
    updateStatus();
  };
  
squares.forEach((square) => square.addEventListener('click', handleClick));
resetButton.addEventListener('click', handleReset);
updateStatus();