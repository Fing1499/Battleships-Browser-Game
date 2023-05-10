// ! Constants
hitDetection = {
  'H': 'red',
  'M': 'blue',
  'N': 'lightBlue'
};
ships = {
  type: 'submarine', length: 2,
  type: 'destroyer', length: 3,
  type: 'cruiser', length: 3,
  type: 'battleship', length: 4,
  type: 'carrier', length: 5
};
//? State Variables
let winner = null;
let choice = null;
let turn;
//* Cached Elements
const startScreen = document.querySelector('.difficulty-screen');
const cpuBoardTiles = document.querySelectorAll('#cpu-board > #dot');
const playerBoardTiles = document.querySelectorAll('#player-board > #dot');
const easyButton = document.querySelector('.easy');
const hardButton = document.querySelector('.hard');


//* Event Listeners

playerBoardTiles.forEach(dot => {
  dot.addEventListener('click', () => {
    console.log('test');
  })
})
cpuBoardTiles.forEach(cpudot => {
  cpudot.addEventListener('click', () => {
    console.log('test cpu');
  })
})
//! Functions
initEasy();
function initEasy() {
    cpuBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  turn = 1;
  winner = null;
  renderEasy();
}
// function initHard() {

// // }
function renderEasy() {
  renderComputerBoard();
  renderPlayerBoard();
  renderMessage();
  renderControls();
}
 function renderComputerBoard() {
  cpuBoard.forEach(function(numArray, letterIdx) {
    numArray.forEach(function(cellValue, numIdx) {
      const cellId = `L${letterIdx} N${numIdx}`;
      const cellElement = document.getElementById(cellId);
      console.log(cellId);
    })
  })
};
// handleShot() {

// }
// cpuChoiceEasy() {

// }
// cpuChoiceHard() {

// }







  