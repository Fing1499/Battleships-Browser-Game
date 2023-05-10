// ! ----------------------------- Constants ----------------------------- ! //

hitDetection = {
  'H': 'red',
  'M': 'blue',
  'N': 'lightBlue'
};

coords = [
  {letter:'A'},
  {letter:'B'},
  {letter:'C'},
  {letter:'D'},
  {letter:'E'},
  {letter:'F'},
  {letter:'G'},
  {letter:'H'},
  {letter:'I'},
  {letter:'J'}
];

ships = [
  {type: 'submarine', length: 2},
  {type: 'destroyer', length: 3},
  {type: 'cruiser', length: 3},
  {type: 'battleship', length: 4},
  {type: 'carrier', length: 5}
];

//? ---------------------------- State Variables ---------------------------- ?//

let winner = null;
let choice = null;
let turn;

//* ---------------------------- Cached Elements ---------------------------- *//

const startScreen = document.querySelector('.difficulty-screen');
const cpuBoardTiles = document.querySelectorAll('#cpu-board > #dot');
const playerBoardTiles = document.querySelectorAll('#player-board > #dot');
const easyButton = document.querySelector('.easy');
const hardButton = document.querySelector('.hard');

//* ---------------------------- Event Listeners ---------------------------- *//

playerBoardTiles.forEach(playerdot => {
  playerdot.addEventListener('click', evt => {
    handlePlayerShipPlacement(evt, playerBoard)
  });
});


function test() {
  console.log('test')
}
cpuBoardTiles.forEach(cpudot => {
  cpudot.addEventListener('click', () => {
    console.log('cpu tiles working');
  })
})

//! ------------------------------- Functions ------------------------------- !//

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
  playerBoard = [
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
  cpuBoard.forEach(function(cpuNumArray, cpuLetterIdx) {
    cpuNumArray.forEach(function(cpuCellValue, cpuNumIdx) {
      const cpuCellId = `cpu ${coords[cpuLetterIdx].letter}${cpuNumIdx}`;
      const cpuCellElement = document.getElementById(cpuCellId);
      console.log(cpuCellId);
    })
  })
 }
  function renderPlayerBoard() {
    playerBoard.forEach(function(numArray, letterIdx) {
      numArray.forEach(function(cellValue, numIdx) {
        const cellId = `player ${coords[letterIdx].letter}${numIdx}`;
        const cellElement = document.getElementById(cellId);
        console.log(cellId);
      })
    })
  function placeCpuShips(cellId) {
    shipPlacement = Math.floor(Math.random() * 10);
  }
};

// handleShot() {

// }
// cpuChoiceEasy() {

// }
// cpuChoiceHard() {

// }

//! ----------------------- SHIP PLACEMENT ----------------------- !//

function handlePlayerShipPlacement(evt, playerBoard, playerdot) {
  console.log('test2')
  placeCarrier(evt, playerBoard);
    console.log('test3')
    placeBattleship();
      placeCruiser();
        placeSubmarine();
          placeDestroyer();
}         
function placeCarrier(evt, playerBoard) {
  console.log(evt.target);
  //gets index of clicked tile
  const selection = Array.from(playerBoardTiles).indexOf(evt.target);
  console.log(selection)
  const shipLength = ships[4].length
  //for loops starts at clicked tiles and goes 5 times to the right
  for (let x = selection; x < selection + shipLength; x++) {
    //set those tiles to gray
    playerBoardTiles[x].style.backgroundColor = 'gray';
    //divides tile index by 10 for first coordinate, then takes remainder of x/10 for second coordinate then sets those to 5s to represent carrier
    playerBoard[Math.floor(x / 10)][x % 10] = shipLength;
    playerBoardTiles[x].removeEventListener('click', handlePlayerShipPlacement);
  }
  console.log(playerBoard);
  // removeEventListenerFromTilesInShipPlacement(playerBoardTiles, selection, shipLength);
}

// function removeEventListenerFromTilesInShipPlacement(playerBoardTiles, selection, shipLength) {
//   //for loops starts at clicked tiles and goes 5 times to the right
//   console.log('remove');
//   for (let r = selection; r < selection + shipLength; r++) {
//     //removes evt listeners from range of tiles
//     playerBoardTiles[r].removeEventListener('click', handlePlayerShipPlacement);
//     console.log(selection, shipLength, playerBoardTiles[r])
//     console.log('remove2');
//   }
// }