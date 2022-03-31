
// Handles game mode/type/ai;

const gameInitialisation = (() => {
  document.querySelector("[data-id='new-game-player']").addEventListener('click', () => {
    document.querySelectorAll('.button-container').forEach(button => button.style.display = 'none');
    document.getElementById('player-generation').style.display = 'block';
  })
})();

// Module - Handles Board and Ui functions
const boardModule = (() => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let cellIndex = 0;
  let turns = 0;
  const renderBoard = () => {
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.classList.add('active');
      cell.setAttribute('data-cell', cellIndex);
      cell.textContent = gameBoard[i];
      cell.addEventListener('click', gameFlow.placeMark)
      document.getElementById('gameboard').append(cell);
      cellIndex++;
    }
    cellIndex = 0
  }

  const resetBoard = () => {
    const board = document.getElementById("gameboard");
    board.innerHTML = "";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    boardModule.gameBoard = ["", "", "", "", "", "", "", "", ""];
    boardModule.turns = 0;
    gameUI.turnCount.textContent = "X TURN";
    renderBoard();
  }
  return {gameBoard, renderBoard, resetBoard, turns}
})();

// Factory Function - Player Creation

const playerFactory = (name, playerType) => {
  getName = () => name;
  getPlayType = () => playerType;
  return { getName, getPlayType }
}

// Module Function - control game flow

const gameFlow = (() => {

  let player1;
  let player2;

  let currentPlayMark;

  let xWins = 0;
  let ties = 0;
  let oWins = 0;

  document.getElementById('player-generation').addEventListener('submit', (e) => {
    e.preventDefault();

    generatedP1Name = document.getElementById('player1-input').value;
    generatedP2Name = document.getElementById('player2-input').value;

    gameInit();
  })

  const gameInit = () => {

    player1 = playerFactory(generatedP1Name, 'X');
    player2 = playerFactory(generatedP2Name, 'O');
    document.querySelector('.game-initialisation').remove();

    document.querySelector('.board').style.display = 'grid';

    boardModule.renderBoard()
  }

  const placeMark = (e) => {
    gameUI.turnTracker();
    checkForCurrentPlayer();
    const cell = e.target;
    cell.textContent = currentPlayMark;
    const cellIndex = cell.getAttribute("data-cell");
    boardModule.gameBoard[cellIndex] = cell.textContent;
    cell.removeEventListener('click', placeMark);
    cell.classList.remove('active');
    console.log(currentPlayMark);
    console.log(boardModule.gameBoard);
    boardModule.turns++;
    checkWinner();
  }

  const checkForCurrentPlayer = () => {
    boardModule.turns % 2 !== 0 ? currentPlayMark = player2.getPlayType() : currentPlayMark = player1.getPlayType();
  }

  const checkWinner = () => {
    if (boardModule.gameBoard[0] === currentPlayMark && boardModule.gameBoard[1] === currentPlayMark && boardModule.gameBoard[2] === currentPlayMark) {
      displayWinner();
      clearBoardEventListeners();
      gameUI.displayWinnerModal();
      updateScores();
    } else if (boardModule.gameBoard[2] === currentPlayMark && boardModule.gameBoard[5] === currentPlayMark && boardModule.gameBoard[8] === currentPlayMark) {
      displayWinner();
      clearBoardEventListeners();
      gameUI.displayWinnerModal();
      updateScores();
    } else if (boardModule.gameBoard[8] === currentPlayMark && boardModule.gameBoard[7] === currentPlayMark && boardModule.gameBoard[6] === currentPlayMark) {
      displayWinner();
      clearBoardEventListeners();
      gameUI.displayWinnerModal();
      updateScores();
    } else if (boardModule.gameBoard[6] === currentPlayMark && boardModule.gameBoard[3] === currentPlayMark && boardModule.gameBoard[0] === currentPlayMark) {
      displayWinner();
      clearBoardEventListeners();
      gameUI.displayWinnerModal();
      updateScores();
    } else if (boardModule.gameBoard[3] === currentPlayMark && boardModule.gameBoard[5] === currentPlayMark && boardModule.gameBoard[8] === currentPlayMark) {
      displayWinner();
      clearBoardEventListeners();
      gameUI.displayWinnerModal();
      updateScores();
    } else if (boardModule.gameBoard[0] === currentPlayMark && boardModule.gameBoard[4] === currentPlayMark && boardModule.gameBoard[8] === currentPlayMark) {
      displayWinner();
      clearBoardEventListeners();
      gameUI.displayWinnerModal();
      updateScores();
    } else if (boardModule.gameBoard[2] === currentPlayMark && boardModule.gameBoard[4] === currentPlayMark && boardModule.gameBoard[6] === currentPlayMark) {
      displayWinner();
      clearBoardEventListeners();
      gameUI.displayWinnerModal();
      updateScores();
    } else if (boardModule.gameBoard[1] === currentPlayMark && boardModule.gameBoard[4] === currentPlayMark && boardModule.gameBoard[7] === currentPlayMark) {
      displayWinner();
      clearBoardEventListeners();
      gameUI.displayWinnerModal();
      updateScores();
    } else if (boardModule.gameBoard[3] === currentPlayMark && boardModule.gameBoard[4] === currentPlayMark && boardModule.gameBoard[5] === currentPlayMark) {
      displayWinner();
      clearBoardEventListeners();
      gameUI.displayWinnerModal();
      updateScores();
    } else if (!boardModule.gameBoard.includes("")) {
      gameUI.displayWinnerModal();
      displayWinnerTie()
    }
  }

  const displayWinner = () => {
    if (currentPlayMark === player2.getPlayType()) {
      gameUI.winnerDisplayName.textContent = `${player2.getName()} Wins!`
      gameUI.winnerDisplayType.textContent = `${player2.getPlayType()} takes the round!`;
    } else if (currentPlayMark === player1.getPlayType()) {
      gameUI.winnerDisplayName.textContent = `${player1.getName()} Wins!`
      gameUI.winnerDisplayType.textContent = `${player1.getPlayType()} takes the round!`;
    }
  }

  const displayWinnerTie = () => {
    gameUI.winnerDisplayName.textContent = ""
    gameUI.winnerDisplayType.textContent = "Round Tied"
    ties++;
    gameUI.ties.textContent = ties;
  }

  const updateScores = () => {
    if (currentPlayMark === player1.getPlayType()) {
      xWins++;
      gameUI.p1Wins.textContent = xWins;
    } else if (currentPlayMark === player2.getPlayType()) {
      oWins++;
      gameUI.p2Wins.textContent = oWins;
    }
  }

  const clearBoardEventListeners = () => {
    document.querySelectorAll('.cell').forEach(cell => {
      cell.removeEventListener('click', placeMark);
    })
  }

  return { placeMark, checkWinner, checkForCurrentPlayer, displayWinner, clearBoardEventListeners, currentPlayMark, displayWinnerTie, updateScores, gameInit};
})();

// Module - Handles UI Elements

const gameUI = (() => {

  const winnerModal = document.querySelector("[data-id='winner-modal']")

  const p1Wins = document.querySelector("[data-id='p1-wins']");
  const ties = document.querySelector("[data-id='ties']");
  const p2Wins = document.querySelector("[data-id='p2-wins']");
  const turnCount = document.querySelector("[data-id='turn-tracker']").querySelector('p');
  const winnerDisplayType = document.querySelector("[data-id='winner-display-type']");
  const winnerDisplayName = document.querySelector("[data-id='winner-display-name']");

  const displayWinnerModal = () => {
    winnerModal.classList.toggle('toggle-display');
  }

  const modalQuit = () => {
    winnerModal.classList.toggle('toggle-display');
  }

  const modalNextRound = () => {
    winnerModal.classList.toggle('toggle-display');
    boardModule.resetBoard();
  }

  const turnTracker = () => {
  const turnTrackerText = document.querySelector("[data-id='turn-tracker']").querySelector('p');
  (boardModule.turns - 1) % 2 !== 0 ? turnTrackerText.textContent = "O TURN" : turnTrackerText.textContent = "X TURN";
  }


  return { displayWinnerModal, modalQuit, modalNextRound, p1Wins, ties, p2Wins, turnCount, winnerDisplayName, winnerDisplayType, turnTracker }
})();

// EventListeners for Static Buttons

document.getElementById("reset-btn").addEventListener('click', boardModule.resetBoard);
document.querySelector("[data-id='quit-btn']").addEventListener('click', gameUI.modalQuit);
document.querySelector("[data-id='next-round-btn']").addEventListener('click', gameUI.modalNextRound);
