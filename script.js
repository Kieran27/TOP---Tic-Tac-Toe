const board = document.getElementById("gameboard");

// Module - Handles Board and Ui functions
const boardModule = (() => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let cellIndex = 0;
  let turns = 0;
  let currentPlayer = true;
  const renderBoard = () => {
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('data-cell', cellIndex);
      cell.textContent = gameBoard[i];
      cell.addEventListener('click', gameFlow.placeMark)
      document.getElementById('gameboard').append(cell);
      cellIndex++;
    }
    cellIndex = 0
  }

  const resetBoard = () => {
    board.innerHTML = "";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    boardModule.gameBoard = ["", "", "", "", "", "", "", "", ""];
    renderBoard();
    turns = 0;
  }
  return {gameBoard, renderBoard, resetBoard, turns}
})();

// Factory Function - Player Creation
// Actual values will be derived from form submit at a later time

const playerFactory = (name, playerType) => {
  getName = () => name;
  getPlayType = () => playerType;
  return { getName, getPlayType }
}

const player1 = playerFactory("player1", "X");
const player2 = playerFactory('player2', "O");

// Module Function - control game flow

const gameFlow = (() => {
  let currentPlayMark = player1.getPlayType();
  const placeMark = (e) => {
    const cell = e.target
    boardModule.currentPlayer !== true ? cell.textContent = player1.getPlayType() : cell.textContent = player2.getPlayType();
    const cellIndex = cell.getAttribute("data-cell");
    cell.removeEventListener('click', placeMark)
    boardModule.gameBoard[cellIndex] = cell.textContent;
    console.log(boardModule.gameBoard)
    switchPlayer();
    boardModule.turns++;
    checkWinner();
  }

  const switchPlayer = () => {
    if (boardModule.turns % 2 !== 0) {
      boardModule.currentPlayer = false
      currentPlayMark = player2.getPlayType();
      console.log(currentPlayMark)
    } else {
      boardModule.currentPlayer = true
      currentPlayMark = player1.getPlayType();
      console.log(currentPlayMark)
    }
  }

  const checkWinner = () => {
    if (boardModule.gameBoard[0] === currentPlayMark && boardModule.gameBoard[1] === currentPlayMark && boardModule.gameBoard[2] === currentPlayMark) {
      displayWinner();
      clearBoardEventListeners();
    } else if (boardModule.gameBoard[2] === currentPlayMark && boardModule.gameBoard[5] === currentPlayMark && boardModule.gameBoard[8] === currentPlayMark) {
      displayWinner();
      clearBoardEventListeners();
    } else if (boardModule.gameBoard[8] === currentPlayMark && boardModule.gameBoard[7] === currentPlayMark && boardModule.gameBoard[6] === currentPlayMark) {
      displayWinner();
      clearBoardEventListeners();
    } else if (boardModule.gameBoard[6] === currentPlayMark && boardModule.gameBoard[3] === currentPlayMark && boardModule.gameBoard[0] === currentPlayMark) {
      displayWinner();
      clearBoardEventListeners();
    } else if (boardModule.gameBoard[3] === currentPlayMark && boardModule.gameBoard[5] === currentPlayMark && boardModule.gameBoard[8] === currentPlayMark) {
      displayWinner();
      clearBoardEventListeners();
    } else if (boardModule.gameBoard[0] === currentPlayMark && boardModule.gameBoard[4] === currentPlayMark && boardModule.gameBoard[8] === currentPlayMark) {
      displayWinner();
      clearBoardEventListeners();
    } else if (boardModule.gameBoard[2] === currentPlayMark && boardModule.gameBoard[4] === currentPlayMark && boardModule.gameBoard[6] === currentPlayMark) {
      displayWinner();
      clearBoardEventListeners();
    } else if (boardModule.gameBoard[1] === currentPlayMark && boardModule.gameBoard[4] === currentPlayMark && boardModule.gameBoard[7] === currentPlayMark) {
      displayWinner();
      clearBoardEventListeners();
    } else if (boardModule.gameBoard[3] === currentPlayMark && boardModule.gameBoard[4] === currentPlayMark && boardModule.gameBoard[5] === currentPlayMark) {
      displayWinner();
      clearBoardEventListeners();
    }
  }

  const displayWinner = () => {
    currentPlayMark === player1.getPlayType() ? console.log(player1.getName() + ' is the winner!') : console.log(player2.getName() + ' is the winner!');
  }

  const clearBoardEventListeners = () => {
    document.querySelectorAll('.cell').forEach(cell => {
      cell.removeEventListener('click', placeMark)
    })
  }

  return { placeMark, checkWinner, switchPlayer, displayWinner, clearBoardEventListeners };
})();

// Module - Handles UI Elements

const gameUI = (() => {
  console.log("Hooray!")
})();

// Global - Initialise Game

boardModule.renderBoard()
document.getElementById("reset-btn").addEventListener('click', () => {
  boardModule.resetBoard();
})
