// all of the possible winning combinations in array format. 
const WIN_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// grab all necessary elements from index.html
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);

// when oTurn is true, it is O's turn, when false it is x's turn.
let oTurn;

start();

restartButton.addEventListener("click", start);


// start function clears the board, and only allows one click per cell. Game also starts
//     with x's turn.
function start() {
  oTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove("x");
    cell.classList.remove("o");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  boardHover();
  winningMessageElement.classList.remove("show");
}

// handles all clicks and places the mark on the screen. Calls relevant function depending
//    on the state of the board.
function handleClick(e) {
  const cell = e.target;
  const currentClass = oTurn ? "o" : "x";
  placeMark(cell, currentClass);
  if (winner(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    switchTurns();
    boardHover();
  }
}

// adds the x or the o to the board.
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

// checks if there is a win by comparing with the winning combinations array.
function winner(currentClass) {
  return WIN_COMBOS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

// when each of the 9 cells are full, it will print an end message depending
//    on the result.
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!";
  } else {
    winningMessageTextElement.innerText = `${oTurn ? "O's" : "X's"} Win!`;
  }
  winningMessageElement.classList.add("show");
}

// simply switches turns
function switchTurns() {
  oTurn = !oTurn;
}

// checks if the game is a draw by checking if every cell is full.
function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("o");
  });
}

// adds the hover effect on empty cells depending on whether if it is x's or o's turn.
function boardHover() {
  board.classList.remove("x");
  board.classList.remove("o");
  if (oTurn) {
    board.classList.add("o");
  } else {
    board.classList.add("x");
  }
}
