// ! ----------------------------- Constants ----------------------------- ! //

hitDetection = [
  {'H': 'red'},
  {'M': 'blue'},
  {'N': 'lightBlue'}
];

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
  {type: 'submarine', length: 1},
  {type: 'destroyer', length: 2},
  {type: 'cruiser', length: 3},
  {type: 'battleship', length: 4},
  {type: 'carrier', length: 5}
];

//? ---------------------------- State Variables ---------------------------- ?//

let winner = null;
let choice = null;
let turn = null;

let carrierPlaced = false;
let battleshipPlaced = false;
let cruiserPlaced = false;
let destroyerPlaced = false;
let submarinePlaced = false;

let cpuCarrierPlaced = false;
let cpuBattleshipPlaced = false;
let cpuCruiserPlaced = false;
let cpuDestroyerPlaced = false;
let cpuSubmarinePlaced = false;

//* ---------------------------- Cached Elements ---------------------------- *//

const startScreen = document.querySelector('.difficulty-screen');
const cpuBoardTiles = document.querySelectorAll('#cpu-board > .dot');
const playerBoardTiles = document.querySelectorAll('#player-board > .dot');
const easyButton = document.querySelector('.easy');
const hardButton = document.querySelector('.hard');

//* ---------------------------- Event Listeners ---------------------------- *//

playerBoardTiles.forEach(playerdot => {
  playerdot.addEventListener('click', evt => {
    handleShipPlacement(evt, playerBoard)
  });
  playerdot.addEventListener('mouseenter', function (e) {
    e.target.classList.add('previewShipPlacement')
  });
  playerdot.addEventListener('mouseleave', function (e) {
    console.log('mouseleave')
    e.target.classList.remove('previewShipPlacement')
  });
});



function test() {
  console.log('test')
}


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
  // renderEasy();
  renderEasy();
}
// function initHard() {

// // }
function renderEasy() {
  if (turn === 1) {
    handleShot(cpuBoard)
  } else if (turn === -1) {
    handleCpuShot(playerBoard);
  }
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
};
//! -------------------------------- SHOOT FUNCTIONS --------------------------- !//
function handleShot(cpuBoard) {
  cpuBoardTiles.forEach(cpudot => {
    cpudot.addEventListener('click', shoot => {
      takeShot(shoot, cpuBoard, cpuBoardTiles)
      console.log('SHOOT')
    });
    cpudot.addEventListener('mouseenter', function (e) {
      e.target.classList.add('previewShotPlacement')
    });
    cpudot.addEventListener('mouseleave', function (e) {
      console.log('mouseleave')
      e.target.classList.remove('previewShotPlacement')
    });
  });
}
//TODO MOVE BELOW SHIP PLACEMENT SO BACKGROUND COLOUR CAN CHANGE
function takeShot(shoot, cpuBoard, cpuBoardTiles) {
  let shotLocation = Array.from(cpuBoardTiles).indexOf(shoot.target)
  console.log(shotLocation)
  console.log(cpuBoard[Math.floor(shotLocation / 10)][(shotLocation % 10)])
  if (cpuBoard[Math.floor(shotLocation / 10)][(shotLocation % 10)] === 0) {
    console.log('MISS')
    
    cpuBoardTiles[shotLocation].classList.add('miss')
  } else if (cpuBoard[Math.floor(shotLocation / 10)][(shotLocation % 10)] === 5) {
    console.log('HIT')
    
    cpuBoardTiles[shotLocation].classList.add('hit')
  } else if (cpuBoard[Math.floor(shotLocation / 10)][(shotLocation % 10)] === 4){
    console.log('HIT')
    
    cpuBoardTiles[shotLocation].classList.add('hit')
  } else if(cpuBoard[Math.floor(shotLocation / 10)][(shotLocation % 10)] === 3) {
    console.log('HIT')
    
    cpuBoardTiles[shotLocation].classList.add('hit')
  } else if(cpuBoard[Math.floor(shotLocation / 10)][(shotLocation % 10)] === 2) {
    console.log('HIT')
   
    cpuBoardTiles[shotLocation].classList.add('hit')
  } else if(cpuBoard[Math.floor(shotLocation / 10)][(shotLocation % 10)] === 1) {
    console.log('HIT')

    cpuBoardTiles[shotLocation].classList.add('hit')
  }
  turn *= -1;
  renderEasy();
  return;
}
// handleShot(cpuBoard, cpuBoardTiles)

function handleCpuShot(playerBoard) {
  let cpuShotLocation = Math.floor(Math.random() * 100);
  console.log(`CPU SHOT LOCATION: ${cpuShotLocation}`);
  if (playerBoard[Math.floor(cpuShotLocation / 10)][(cpuShotLocation % 10)] === 0) {
    console.log('COMPUTER MISS');

  } else if (playerBoard[Math.floor(cpuShotLocation / 10)][(cpuShotLocation % 10)] === 5) {
    console.log('COMPUTER HIT CARRIER')

  }  else if (playerBoard[Math.floor(cpuShotLocation / 10)][(cpuShotLocation % 10)] === 4) {
    console.log('COMPUTER HIT BATTLESHIP')

  }  else if (playerBoard[Math.floor(cpuShotLocation / 10)][(cpuShotLocation % 10)] === 3) {
    console.log('COMPUTER HIT CRUISER')

  }  else if (playerBoard[Math.floor(cpuShotLocation / 10)][(cpuShotLocation % 10)] === 2) {
    console.log('COMPUTER HIT DESTROYER')

  }  else if (playerBoard[Math.floor(cpuShotLocation / 10)][(cpuShotLocation % 10)] === 1) {
    console.log('COMPUTER HIT SUB')
  }
  turn *= -1;
  renderEasy();
  return;
}
// cpuChoiceEasy() {

// }
// cpuChoiceHard() {

// }

//! ----------------------- SHIP PLACEMENT ----------------------- !//

function handleShipPlacement(evt, playerBoard, playerdot) {
  console.log('playershipplacement')
  if (carrierPlaced === false) {
    placeCarrier(evt, playerBoard, ships[4].length);
    console.log('carrier')
    carrierPlaced = true;
  } else if (battleshipPlaced === false) {
      placeBattleship(evt, playerBoard, ships[3].length );
      console.log('battleship')
      battleshipPlaced = true;
  } else if (cruiserPlaced === false) {
      placeCruiser(evt, playerBoard, ships[2].length);
      console.log('cruiser')
      cruiserPlaced = true;
    } else if (destroyerPlaced === false) {        
      placeDestroyer(evt, playerBoard, ships[0].length);
      console.log('destroyer')
      destroyerPlaced = true;
  } else if (submarinePlaced === false) {
      placeSubmarine(evt, playerBoard, ships[1].length);
      console.log('sub')
      submarinePlaced = true;       
      placeCpuShips(cpuBoard);   
  } else if (submarinePlaced === true) {
    
    // console.log(cpuBoard)
  }
}

//TODO ADD ROTATE FUNCTIONALITY AND CHECKFOROVERLAP
function placeCarrier(evt, playerBoard) {
  console.log(evt.target);
  //gets index of clicked tile
  const selection = Array.from(playerBoardTiles).indexOf(evt.target);
  console.log(selection)
  const shipLength = ships[4].length
  //for loops starts at clicked tile and goes 5 times to the right
  for (let x = selection; x < selection + shipLength; x++) {
    //set those tiles to gray
    playerBoardTiles[x].style.backgroundColor = 'gray';
    //divides tile index by 10 for first coordinate, then takes remainder of x/10 for second coordinate then sets those to 5s to represent carrier
    playerBoard[Math.floor(x / 10)][x % 10] = shipLength;
    // playerBoardTiles[x].removeEventListener('click', handlePlayerShipPlacement);
  }
}
function placeBattleship(evt, playerBoard) {
  const selection = Array.from(playerBoardTiles).indexOf(evt.target);
  console.log(selection)
  const shipLength = ships[3].length
  for (let x = selection; x < selection + shipLength; x++) {
    playerBoardTiles[x].style.backgroundColor = 'gray';
    playerBoard[Math.floor(x / 10)][x % 10] = shipLength;
  }
}
function placeCruiser(evt, playerBoard) {
  const selection = Array.from(playerBoardTiles).indexOf(evt.target);
  console.log(selection)
  const shipLength = ships[2].length
  for (let x = selection; x < selection + shipLength; x++) {
    playerBoardTiles[x].style.backgroundColor = 'gray';
    playerBoard[Math.floor(x / 10)][x % 10] = shipLength;
    playerBoardTiles[x].removeEventListener('click', handleShipPlacement);
  }
}
function placeDestroyer(evt, playerBoard) {
  const selection = Array.from(playerBoardTiles).indexOf(evt.target);
  console.log(selection)
  const shipLength = ships[1].length
  for (let x = selection; x < selection + shipLength; x++) {
    playerBoardTiles[x].style.backgroundColor = 'gray';
    playerBoard[Math.floor(x / 10)][x % 10] = shipLength;
    playerBoardTiles[x].removeEventListener('click', handleShipPlacement);
  }
}
function placeSubmarine(evt, playerBoard) {
  const selection = Array.from(playerBoardTiles).indexOf(evt.target);
  console.log(selection)
  const shipLength = ships[0].length
  for (let x = selection; x < selection + shipLength; x++) {
    playerBoardTiles[x].style.backgroundColor = 'gray';
    playerBoard[Math.floor(x / 10)][x % 10] = shipLength;
    playerBoardTiles[x].removeEventListener('click', handleShipPlacement);
  }
  console.log(playerBoard);
}

function placeCpuShips(cpuBoard) {
  console.log('placing cpu ships');
  if (cpuCarrierPlaced === false) {
    placeCpuCarrier(cpuBoard, ships[4].length) 
    cpuCarrierPlaced = true;
    console.log('PLACED CARRIER')
  } 
  if (cpuCarrierPlaced === true) {
    placeCpuBattleship(cpuBoard, ships[3].length) 
    cpuBattleshipPlaced = true;
    console.log('PLACED BATTLESHIP')
  } 
  if (cpuBattleshipPlaced === true) {
    placeCpuCruiser(cpuBoard, ships[2].length) 
    cpuCruiserPlaced = true;
    console.log('PLACED CRUISER')
  } 
  if (cpuCruiserPlaced === true) {
    placeCpuDestroyer(cpuBoard, ships[1].length) 
    cpuDestroyerPlaced = true;
    console.log('PLACED DESTROYER')
  } 
  if (cpuDestroyerPlaced === true) {
    placeCpuSubmarine(cpuBoard, ships[0].length) 
    cpuSubmarinePlaced = true;
    console.log('PLACED SUBMARINE')
  }
}


function placeCpuCarrier (cpuBoard) {

  const shipLength = ships[4].length;

  let randomStartLocation;
  let startingRow = 1;
  let endingRow = 2;
  let startingLetter = 1;
  let endingLetter = 2;

  while (startingRow !== endingRow) {
    console.log('STARTING WHILE LOOP');
    randomStartLocation = Math.floor(Math.random() * 100);
    console.log(`RANDOM START: ${randomStartLocation}`)

    startingRow = Math.floor(randomStartLocation / 10);
    console.log(`STARTINGROW: ${startingRow}`)
    endingRow = Math.floor((randomStartLocation + shipLength) / 10);
    console.log(`ENDINGROW: ${endingRow}`)
    endingLetter = Math.floor((randomStartLocation + shipLength) % 10);
    console.log(`ENDINGLETTER: ${endingLetter}`)
    startingLetter = Math.floor(randomStartLocation % 10);
    console.log(`STARTINGLETTER: ${startingLetter}`)
  

    }
    for (let x = startingLetter; x < startingLetter + shipLength; x++) {
      console.log(` X VALUE: ${x}`)
      if (cpuBoard[startingRow][x] !== 0) {
        console.log('does not contain 0');
      } else {
        cpuBoard[startingRow][x] = shipLength;
        cpuBoardTiles[x + (startingRow * 10)].style.backgroundColor = 'gray';
      }
  }
  console.log(cpuBoard);
}

function placeCpuBattleship (cpuBoard) {

  const shipLength = ships[3].length;

  let randomStartLocation;
  let startingRow = 1;
  let endingRow = 2;
  let startingLetter = 1;
  let endingLetter = 2;

  while (startingRow !== endingRow) {
    console.log('STARTING WHILE LOOP');
    randomStartLocation = Math.floor(Math.random() * 100);
    console.log(`RANDOM START: ${randomStartLocation}`)

    startingRow = Math.floor(randomStartLocation / 10);
    console.log(`STARTINGROW: ${startingRow}`)
    endingRow = Math.floor((randomStartLocation + shipLength) / 10);
    console.log(`ENDINGROW: ${endingRow}`)
    endingLetter = Math.floor((randomStartLocation + shipLength) % 10);
    console.log(`ENDINGLETTER: ${endingLetter}`)
    startingLetter = Math.floor(randomStartLocation % 10);
    console.log(`STARTINGLETTER: ${startingLetter}`)
    } 

    for (let x = startingLetter; x < startingLetter + shipLength; x++) {
      if (cpuBoard[startingRow][(startingLetter - 1)] && cpuBoard[startingRow][(startingLetter)] && cpuBoard[startingRow][(startingLetter + 1)] && cpuBoard[startingRow][(startingLetter + 2)] !== 0) {
        placeCpuBattleship(cpuBoard);
        return;     
      } else {
          console.log(` X VALUE: ${x}`)
          console.log('does contain 0');
          cpuBoard[startingRow][x] = shipLength;
          cpuBoardTiles[x + (startingRow * 10)].style.backgroundColor = 'gray';
      }
    }
  console.log(cpuBoard);
}

function placeCpuCruiser (cpuBoard) {

  const shipLength = ships[2].length;

  let randomStartLocation;
  let startingRow = 1;
  let endingRow = 2;
  let startingLetter = 1;
  let endingLetter = 2;

  while (startingRow !== endingRow) {
    console.log('STARTING WHILE LOOP');
    randomStartLocation = Math.floor(Math.random() * 100);
    console.log(`RANDOM START: ${randomStartLocation}`)

    startingRow = Math.floor(randomStartLocation / 10);
    console.log(`STARTINGROW: ${startingRow}`)
    endingRow = Math.floor((randomStartLocation + shipLength) / 10);
    console.log(`ENDINGROW: ${endingRow}`)
    endingLetter = Math.floor((randomStartLocation + shipLength) % 10);
    console.log(`ENDINGLETTER: ${endingLetter}`)
    startingLetter = Math.floor(randomStartLocation % 10);
    console.log(`STARTINGLETTER: ${startingLetter}`)
    } 

    for (let x = startingLetter; x < startingLetter + shipLength; x++) {
      if (cpuBoard[startingRow][(startingLetter - 1)] && cpuBoard[startingRow][(startingLetter)] && cpuBoard[startingRow][(startingLetter + 1)] !== 0) {
        placeCpuCruiser(cpuBoard);
        return;     
      } else {
          console.log(` X VALUE: ${x}`)
          console.log('does contain 0');
          cpuBoard[startingRow][x] = shipLength;
          cpuBoardTiles[x + (startingRow * 10)].style.backgroundColor = 'gray';
      }
    }
  console.log(cpuBoard);
}

function placeCpuDestroyer (cpuBoard) {

  const shipLength = ships[1].length;

  let randomStartLocation;
  let startingRow = 1;
  let endingRow = 2;
  let startingLetter = 1;
  let endingLetter = 2;

  while (startingRow !== endingRow) {
    console.log('STARTING WHILE LOOP');
    randomStartLocation = Math.floor(Math.random() * 100);
    console.log(`RANDOM START: ${randomStartLocation}`)

    startingRow = Math.floor(randomStartLocation / 10);
    console.log(`STARTINGROW: ${startingRow}`)
    endingRow = Math.floor((randomStartLocation + shipLength) / 10);
    console.log(`ENDINGROW: ${endingRow}`)
    endingLetter = Math.floor((randomStartLocation + shipLength) % 10);
    console.log(`ENDINGLETTER: ${endingLetter}`)
    startingLetter = Math.floor(randomStartLocation % 10);
    console.log(`STARTINGLETTER: ${startingLetter}`)
    } 

    for (let x = startingLetter; x < startingLetter + shipLength; x++) {
      if (cpuBoard[startingRow][(startingLetter - 1)] && cpuBoard[startingRow][(startingLetter)] !== 0) {
        placeCpuDestroyer(cpuBoard);
        return;     
      } else {
          console.log(` X VALUE: ${x}`)
          console.log('does contain 0');
          cpuBoard[startingRow][x] = shipLength;
          cpuBoardTiles[x + (startingRow * 10)].style.backgroundColor = 'gray';
      }
    }
  console.log(cpuBoard);
}

function placeCpuSubmarine (cpuBoard) {

  const shipLength = ships[0].length;

  let randomStartLocation;
  let startingRow = 1;
  let endingRow = 2;
  let startingLetter = 1;
  let endingLetter = 2;

  while (startingRow !== endingRow) {
    console.log('STARTING WHILE LOOP');
    randomStartLocation = Math.floor(Math.random() * 100);
    console.log(`RANDOM START: ${randomStartLocation}`)

    startingRow = Math.floor(randomStartLocation / 10);
    console.log(`STARTINGROW: ${startingRow}`)
    endingRow = Math.floor((randomStartLocation + shipLength) / 10);
    console.log(`ENDINGROW: ${endingRow}`)
    endingLetter = Math.floor((randomStartLocation + shipLength) % 10);
    console.log(`ENDINGLETTER: ${endingLetter}`)
    startingLetter = Math.floor(randomStartLocation % 10);
    console.log(`STARTINGLETTER: ${startingLetter}`)
    } 

    for (let x = startingLetter; x < startingLetter + shipLength; x++) {
      if (cpuBoard[startingRow][x] !== 0) {
        placeCpuSubmarine(cpuBoard);
        return;     
      } else {
          console.log(` X VALUE: ${x}`)
          console.log('does contain 0');
          cpuBoard[startingRow][x] = shipLength;
          cpuBoardTiles[x + (startingRow * 10)].style.backgroundColor = 'gray';
      }
    }
  console.log(cpuBoard);
}
