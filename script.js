// Ask player if they want to start
// let ans = confirm("Are you ready for Tic Tac Toe?");
// if (ans == true) {
//   alert("Let's start!");
// } else {
//   alert("Okay, bye!");
//   // Redirect away or hide the game board
//   document.querySelector('.board').style.display='none';
// }
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const welcome = document.getElementById('welcome');
const board = document.querySelector('.Game');
const signChoose = document.getElementById('sign_choose');
const crossBtn = document.getElementById('crossBtn');
const circleBtn = document.getElementById('circleBtn');
const playerName = document.getElementById('player_name');
const gameBoardIntro = document.getElementById('gameBoard');
const startGameBtn = document.getElementById('startGameBtn');
const exitBtn = document.getElementById('exitBtn');
const playerInfo = document.getElementById('playerInfo');
const player1NameSpan = document.getElementById('player1Name');
const player2NameSpan = document.getElementById('player2Name');
const player1Display = document.getElementById('player1Display');
const player2Display = document.getElementById('player2Display');
const reset = document.getElementById('exitResultBtn');
const cells = document.querySelectorAll('.cell');
const resultSection = document.getElementById('result');
const resultMessage = document.getElementById('resultMessage');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = '';
let gameActive = false;
let player1win = 0;
let player2win = 0;
let gameState = ["", "", "", "", "", "", "", "", ""];
let name1 = '';
let name2 = '';
let player1Sign = '';/// Variable to track the user's sign choice (X or O)
let player2Sign = '';
let vsComputer = false;
//let gameMode = "pvp"; // or "pvc"

// If user clicks Yes(player vs player)
yesBtn.addEventListener('click', () => {
  welcome.style.display = 'none'; // hide the welcome screen
  name1 = prompt("Enter name of Player 1:");
  if (!name1) {
    print("Please enter a valid name for Player 1.");
        showWelcome();
        return;
    }
  name2 = prompt("Enter name of Player 2:");
    if (!name2) {
      print("Please enter a valid name for Player 2.");
        showWelcome();
        return;
    }

  player1NameSpan.textContent = name1;
  player2NameSpan.textContent = name2;

  playerName.style.display = 'block';
  signChoose.style.display = 'block'; // show the sign choice screen

});

// If user clicks No(player vs computer)
noBtn.addEventListener('click', () => {
  vsComputer = true; // important!
  welcome.style.display = 'none'; // hide the welcome screen
  name1 = prompt("Enter name of Player:");
  if (!name1) {
    print("Please enter a valid name for Player.");
        showWelcome();
        return;
    }
  let sign1 = parseInt(prompt("Sign:(Enter 1 for cross else circle will be default)"));
  if (sign1 == 1) {
    player1Sign = 'X';
    player2Sign = 'O';
  } else {
    player1Sign = 'O';
    player2Sign = 'X';
  }
  name2 = "Computer";
  player1NameSpan.textContent = name1;
  player2NameSpan.textContent = name2;
  player1Display.textContent = `${name1} (${player1Sign})`;
  player2Display.textContent = `Computer (${player2Sign})`;
  gameBoardIntro.style.display = 'block';
});

function showWelcome() {
    document.getElementById('welcome').style.display = 'block';
    document.getElementById('player_name').style.display = 'none';
    document.getElementById('sign_choose').style.display = 'none';
    document.getElementById('playerInfo').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'none';
    document.querySelector('.Game').style.display = 'none';
    document.getElementById('result').style.display = 'none';
}

// after yesbtn 

// If user selects Cross (X)
crossBtn.addEventListener('click', () => {
  player1Sign = 'X'; // Set the player-1 sign to 'X'
  player2Sign = 'O';
  player1Display.textContent = `${name1} (${player1Sign})`;
  player2Display.textContent = `${name2} (${player2Sign})`;
  signChoose.style.display = 'none'; // Hide the sign choice section
  gameBoardIntro.style.display = 'block'; // Show the game board intro

});

// If user selects Zero (O)
circleBtn.addEventListener('click', () => {
  player1Sign = 'O'; // Set the player's sign to 'O'
  player2Sign = 'X';
  player1Display.textContent = `${name1} (${player1Sign})`;
  player2Display.textContent = `${name2} (${player2Sign})`;
  signChoose.style.display = 'none'; // Hide the sign choice section
  gameBoardIntro.style.display = 'block'; // Show the game board intro

});

//   // Handle "Start Game"
// startGameBtn.addEventListener('click', () => {
//   playerName.style.display = 'none';
//   gameBoardIntro.style.display = 'none';
//   // player1Display.textContent = `${name1} (${player1Sign})`;
//   // player2Display.textContent = `${name2} (${player2Sign})`;
//   playerInfo.style.display = 'block'; // Show the player info section
//   // document.getElementById('player1Display').textContent= `name1 (${player1Sign})`;
//   // document.getElementById('player2Display').textContent= `name2 (${player2Sign})`;
//   board.style.display = 'block';
// });

// Start the game and allow clicking
startGameBtn.addEventListener('click', () => {
  currentPlayer = player1Sign;
  gameState = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
  });
  gameBoardIntro.style.display = 'none';
  playerName.style.display = 'none';
  playerInfo.style.display = 'block'; // Show the player info section
  board.style.display = 'block';
  gameActive = true;
});

// Handle "Exit"
exitBtn.addEventListener('click', () => {
  location.reload(); // reloads the page to start over
});

// Cell click handler
cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = cell.getAttribute('data-index');
    if (!gameActive || gameState[index] !== "") return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer === 'X' ? 'x' : 'o');

    if (checkWin()) {
      setTimeout(() => handleWin(), 1000); // <-- Delay shows the move first
      return;
    } else if (gameState.every(cell => cell !== "")) {
      endGame("It's a draw!");
      return;
    }

    if (vsComputer) {
      // PLAYER just moved, now COMPUTER's turn
      currentPlayer = player2Sign;
      setTimeout(computerMove, 500);
    } else {
      // PVP turn switch
      currentPlayer = currentPlayer === player1Sign ? player2Sign : player1Sign;
    }
  });
});

// Win conditions
function checkWin() {
  const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6]           // diagonals
  ];

  for (let i = 0; i < winCombos.length; i++) {
    const [a, b, c] = winCombos[i];
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return winCombos[i]; // Return winning combo
    }
  }
  return null;
}

//handle win condition for computer as well as player
function handleWin() {
  // const winningCombo = checkWin();
  // if (!winningCombo) return;

  // showStrike(winningCombo);

  if (currentPlayer === player1Sign) {
    player1Display.textContent = `${name1} wins!`;
    player1win++;
  } else {
    player2Display.textContent = `${vsComputer ? "Computer" : name2} wins!`;
    player2win++;
  }

  player1Display.style.color = currentPlayer === player1Sign ? 'green' : 'red';
  player2Display.style.color = currentPlayer === player2Sign ? 'green' : 'red';

  //setTimeout(() => {
    endGame(`${currentPlayer === player1Sign ? name1 : (vsComputer ? "Computer" : name2)} wins!`);
 // }, 400); // Delay lets the strike be visible first
}

// function showStrike(combo) {
//   const strike = document.getElementById('strike');
//   strike.style.display = 'block';

//   const comboMap = {
//     '0,1,2': 'strike-row-0',
//     '3,4,5': 'strike-row-1',
//     '6,7,8': 'strike-row-2',
//     '0,3,6': 'strike-col-0',
//     '1,4,7': 'strike-col-1',
//     '2,5,8': 'strike-col-2',
//     '0,4,8': 'strike-diag-0',
//     '2,4,6': 'strike-diag-1'
//   };

//   const key = combo.join(',');
//   strike.className = `strike ${comboMap[key]}`;
// }

// Computer move logic
// function computerMove() {
//   if (!gameActive) return; 

//   const emptyIndices = gameState
//     .map((val, idx) => val === "" ? idx : null)
//     .filter(idx => idx !== null);
// //.map((val, idx) => val === "" ? idx : null)
// // This goes through each cell:
// // If the cell is empty (""), return its index (idx)
// // Otherwise, return null
// //["X", "", "O", "", "", "X", "", "O", ""]
// //[null, 1, null, 3, 4, null, 6, null, 8]

// //.filter(idx => idx !== null)
// // This will give us an array of indices where the cells are empty
// // [1, 3, 4, 6, 7]


//   if (emptyIndices.length === 0) return;//Double-check if there's any move left.
  
//   const bestMove = getBestMove();
//   gameState[bestMove] = player2Sign;

//   const cell = document.querySelector(`.cell[data-index='${bestMove}']`);
//   cell.textContent = player2Sign;
//   cell.classList.add(player2Sign === 'X' ? 'x' : 'o');

//   if (checkWin()) {
//     handleWin();
//     return;
//   } else if (gameState.every(cell => cell !== "")) {
//     endGame("It's a draw!");
//     return;
//   }

//   currentPlayer = player1Sign;
// }


//i dont want a computer to make  a forcefully draw so i decided for
function computerMove() {
  if (!gameActive) return;

  //currentPlayer = player2Sign;

  let move = findWinningMove(player2Sign); // Try to win
  if (move === null) {
    move = findWinningMove(player1Sign);   // Block player
  }
  if (move === null && gameState[4] === "") {
    move = 4; // Take center
  }
  if (move === null) {
    const corners = [0, 2, 6, 8].filter(i => gameState[i] === "");
    if (corners.length > 0) move = corners[Math.floor(Math.random() * corners.length)];
  }
  if (move === null) {
    const sides = [1, 3, 5, 7].filter(i => gameState[i] === "");
    if (sides.length > 0) move = sides[Math.floor(Math.random() * sides.length)];
  }

  if (move !== null) {
    gameState[move] = player2Sign;
    const cell = document.querySelector(`.cell[data-index='${move}']`);
    cell.textContent = player2Sign;
    cell.classList.add(player2Sign === 'X' ? 'x' : 'o');

    if (checkWin()) {
      setTimeout(() => handleWin(), 1000); // <-- Delay shows the move first
      return;
    } else if (gameState.every(cell => cell !== "")) {
      endGame("It's a draw!");
      return;
    }

    currentPlayer = player1Sign;
  }
}

// Find a winning move for the given player
function findWinningMove(player) {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const values = [gameState[a], gameState[b], gameState[c]];
    if (
      values.filter(val => val === player).length === 2 &&
      values.includes("")
    ) {
      return pattern[values.indexOf("")];
    }
  }

  return null;
}



//  goal We want the computer to:
  // Win if it can
  // Block the opponent if needed
  // Force a draw if no win is possible
  // Never make a random or losing move

// This is achieved by exploring all future possible game states using the Minimax algorithm.
//Loops through possible moves and chooses the best one using minimax.
// function getBestMove() {
//   let bestScore = -Infinity;
//   let move;

//   for (let i = 0; i < gameState.length; i++) {
//     if (gameState[i] === "") {
//       gameState[i] = player2Sign; // Try move for the computer
//       let score = minimax(gameState, 0, false); // Evaluate this move
//       gameState[i] = ""; // Undo move

//       if (score > bestScore) {
//         bestScore = score;
//         move = i;
//       }
//     }
//   }

//   return move;
// }

//Simulates all outcomes of a move recursively and assigns a score.
// function minimax(board, depth, isMaximizing) {
//   if (checkWinSim(board, player2Sign)) return 10 - depth;
//   if (checkWinSim(board, player1Sign)) return depth - 10;
//   if (board.every(cell => cell !== "")) return 0; // Draw

//   if (isMaximizing) {
//     let bestScore = -Infinity;
//     for (let i = 0; i < board.length; i++) {
//       if (board[i] === "") {
//         board[i] = player2Sign;
//         let score = minimax(board, depth + 1, false);
//         board[i] = "";
//         bestScore = Math.max(score, bestScore);
//       }
//     }
//     return bestScore;
//   } else {
//     let bestScore = Infinity;
//     for (let i = 0; i < board.length; i++) {
//       if (board[i] === "") {
//         board[i] = player1Sign;
//         let score = minimax(board, depth + 1, true);
//         board[i] = "";
//         bestScore = Math.min(score, bestScore);
//       }
//     }
//     return bestScore;
//   }
// }

//Checks whether a simulated board is in a winning state.
// function checkWinSim(board, player) {
//   const winPatterns = [
//     [0,1,2],[3,4,5],[6,7,8], // rows
//     [0,3,6],[1,4,7],[2,5,8], // columns
//     [0,4,8],[2,4,6]          // diagonals
//   ];

//   return winPatterns.some(pattern => 
//     pattern.every(idx => board[idx] === player)
//   );
// }


// End game
function endGame(message) {
  resultMessage.textContent = message;
  resultSection.style.display = 'block';
  board.style.display = 'none';
  playerInfo.style.display = 'none';
  gameActive = false;
}

// Restart game
restartBtn.addEventListener('click', () => {
  resultSection.style.display = 'none';
  board.style.display = 'block';
  playerInfo.style.display = 'block';
  if (player1Display.textContent === `${name1} wins!`) {
    player1Display.textContent = `${name1} (${player1Sign})x${player1win}`;
  }
  else if(player2Display.textContent === `${name2} wins!`){
    player2Display.textContent = `${name2} (${player2Sign})x${player2win}`;
  }
  else{
    player1Display.textContent = `${name1} (${player1Sign})`;
    player2Display.textContent = `${name2} (${player2Sign})`;
  }
  
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = player1Sign;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
  });
  gameActive = true;
});

// Reset game after playing once
reset.addEventListener('click', () => {
  resultMessage.textContent = 'Thanks for playing!';
  restartBtn.style.display = 'none'; // Hide restart button
  reset.style.display = 'none'; // Hide reset button
  setTimeout(() => {
    location.reload(); // reloads the page to start over
  }, 1000);
});
