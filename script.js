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

let name1 = '';
let name2 = '';
// Variable to track the user's sign choice (X or O)
let player1Sign = '';
let player2Sign = '';

// If user clicks Yes
yesBtn.addEventListener('click', () => {
  welcome.style.display = 'none'; // hide the welcome screen
  name1 = prompt("Enter name of Player 1:");
  name2 = prompt("Enter name of Player 2:");

  player1NameSpan.textContent = name1;
  player2NameSpan.textContent = name2;

  playerName.style.display = 'block';
  signChoose.style.display = 'block'; // show the sign choice screen
  
});

// If user clicks No
noBtn.addEventListener('click', () => {
  welcome.innerHTML = '<h1>Okay, maybe next time!</h1>';
});

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
    // document.getElementById('player1Display').textContent= `name1 (${player1Sign})`;
    // document.getElementById('player2Display').textContent= `name2 (${player2Sign})`;
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

// Handle "Exit"
exitBtn.addEventListener('click', () => {
  location.reload(); // reloads the page to start over
});

const cells = document.querySelectorAll('.cell');
const resultSection = document.getElementById('result');
const resultMessage = document.getElementById('resultMessage');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = '';
let gameActive = false;
let player1win=0;
let player2win=0;
let gameState = ["", "", "", "", "", "", "", "", ""];

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

// Cell click handler
cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = cell.getAttribute('data-index');
    if (!gameActive || gameState[index] !== "") return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer === 'X' ? 'x' : 'o');

    if (checkWin()) {
      if (currentPlayer === player1Sign) {
        player1Display.textContent = `${name1} wins!`;
        player1win++;
      } else {
        player2Display.textContent = `${name2} wins!`;
        player2win++;
      }
      player1Display.style.color = currentPlayer === player1Sign ? 'green' : 'red';
      player2Display.style.color = currentPlayer === player2Sign ? 'green' : 'red';
      endGame(`${currentPlayer === player1Sign ? name1 : name2} wins!`);
    } else if (gameState.every(cell => cell !== "")) {
      endGame("It's a draw!");
    } else {
      currentPlayer = currentPlayer === player1Sign ? player2Sign : player1Sign;
    }
  });
});

// Win conditions
function checkWin() {
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diagonals
  ];

  return winCombos.some(combo => {
    const [a, b, c] = combo;
    return gameState[a] !== "" && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

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
  if(player1Display.textContent === `${name1} wins!`){
      player1Display.textContent = `${name1} (${player1Sign})x${player1win}`;
  }
  else {
      player2Display.textContent = `${name2} (${player2Sign})x${player2win}`;
  }
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = player1Sign;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
  });
  gameActive = true;
});

winningCells.forEach(index => {
  cells[index].classList.add('win');
});

confetti({
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 }
});
