// ! ----------------------------- Constants ----------------------------- ! //

//TODO  ADD FALSE IDENTIFIERS TO ALL PLAYERSHIP PLACING FUNCTIONS LIKE ON SUB AND CARRIERR
//TODO FIGURE OUT WHY BATTLESHIP AND DOWN CANT BE PLACED VERTICALLY IN THE BOTTOM HALF OF THE BOARD
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

let winner = false;
let turn = false;

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

let rotation = 1;

//* ---------------------------- Cached Elements ---------------------------- *//

const startScreen = document.querySelector('.difficulty-screen');
const cpuBoardTiles = document.querySelectorAll('#cpu-board > .dot');
const playerBoardTiles = document.querySelectorAll('#player-board > .dot');
const easyButton = document.querySelector('.easy');
const hardButton = document.querySelector('.hard');
const playAgainButton = document.querySelector('.play-again');
const title = document.querySelector('.UI-title');
const dialogueBox = document.querySelector('#dialogue-box');
const cpuDialogueBox = document.querySelector('#cpu-dialogue-box')
//* ---------------------------- Event Listeners ---------------------------- *//


easyButton.addEventListener('click', initEasy);
playAgainButton.addEventListener('click', restart);


//! ------------------------------- Functions ------------------------------- !//



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
  previousCpuShots = [];
  turn = false;
  winner = null;
  renderEasy(startScreen);
  dialogueBox.innerText = "> PLACE YOUR CARRIER";

  playerBoardTiles.forEach(playerdot => {
    playerdot.addEventListener('click', evt => {
      handleShipPlacement(evt, playerBoard);
      
    });
    playerdot.addEventListener('mouseenter', function (e) {
      e.target.classList.add('previewShipPlacement')
    });
    playerdot.addEventListener('mouseleave', function (e) {
      console.log('mouseleave')
      e.target.classList.remove('previewShipPlacement')
    });
  });
  document.addEventListener('keydown', keypress => {
    rotation *= -1;
    console.log(rotation);
  });
 
}

function handleShot(cpuBoard) {
  cpuBoardTiles.forEach(cpudot => {
    cpudot.addEventListener('click', shoot => {
      if (turn === false) {
        takeShot(shoot, cpuBoard, cpuBoardTiles);
        console.log('SHOOT');
        // cpudot.removeEventListener('click', takeShot)
      }
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

function renderEasy() {
  startScreen.style.visibility = "hidden";
  playAgainButton.style.visibility = "hidden";


}
function restart() {
  startScreen.style.visibility = 'visible';
}

function checkForWinner(cpuBoard, playerBoard) {

  if (checkForPlayerWinner(cpuBoard) === true) {
    playAgainButton.style.visibilty = 'visible';
    title.innerText = 'PLAYER WINS - WELL DONE';
    title.style.color = 'green';
    title.style.textShadow ="0 0 .5vmin green"
    playAgainButton.style.visibility = "visible";

  } else if (CheckForCpuWinner(playerBoard) === true) {
    playAgainButton.style.visibilty = 'visible';
    title.innerText = 'COMPUTER WINS - GAME OVER';
    title.style.color = 'red';
    title.style.textShadow ="0 0 .5vmin red"
    playAgainButton.style.visibility = "visible";
  }
}

function checkForPlayerWinner(cpuBoard) {
  return cpuBoard.every(cpunum => {
     return cpunum.every(cpuall => {
      return cpuall === 0;
    });
  });
}

function CheckForCpuWinner(playerBoard) {
  return playerBoard.every(num => {
    return num.every(all => {
      return all === 0;
    });
  });
}




//! -------------------------------- SHOOT FUNCTIONS --------------------------- !//


//TODO MOVE BELOW SHIP PLACEMENT SO BACKGROUND COLOUR CAN CHANGE ALSO REMOVE PREVIOUS SHOTS FROM  POSSIBLE TARGETS
function takeShot(shoot, cpuBoard, cpuBoardTiles) {
  let shotLocation = Array.from(cpuBoardTiles).indexOf(shoot.target)
  console.log(shotLocation)
  console.log(cpuBoard[Math.floor(shotLocation / 10)][(shotLocation % 10)])
  if (cpuBoard[Math.floor(shotLocation / 10)][(shotLocation % 10)] === 0) {
    dialogueBox.innerText = "> YOU MISSED";
    cpuBoardTiles[shotLocation].classList.add('miss')
  } else if (cpuBoard[Math.floor(shotLocation / 10)][(shotLocation % 10)] === 5) {
    dialogueBox.innerText = "> YOU LANDED A HIT";
    cpuBoard[Math.floor(shotLocation / 10)][(shotLocation % 10)] = 0;
    cpuBoardTiles[shotLocation].style.backgroundColor = '';
    cpuBoardTiles[shotLocation].classList.add('hit')
  } else if (cpuBoard[Math.floor(shotLocation / 10)][(shotLocation % 10)] === 4){
    dialogueBox.innerText = "> NICE SHOT";
    cpuBoard[Math.floor(shotLocation / 10)][(shotLocation % 10)] = 0;
    cpuBoardTiles[shotLocation].style.backgroundColor = '';
    cpuBoardTiles[shotLocation].classList.add('hit')
  } else if(cpuBoard[Math.floor(shotLocation / 10)][(shotLocation % 10)] === 3) {
    dialogueBox.innerText = "> GOOD SHOOTING";
    cpuBoard[Math.floor(shotLocation / 10)][(shotLocation % 10)] = 0;
    cpuBoardTiles[shotLocation].style.backgroundColor = '';
    cpuBoardTiles[shotLocation].classList.add('hit')
  } else if(cpuBoard[Math.floor(shotLocation / 10)][(shotLocation % 10)] === 2) {
    dialogueBox.innerText = "> HIT";
    cpuBoard[Math.floor(shotLocation / 10)][(shotLocation % 10)] = 0;
    cpuBoardTiles[shotLocation].style.backgroundColor = '';
    cpuBoardTiles[shotLocation].classList.add('hit')
  } else if(cpuBoard[Math.floor(shotLocation / 10)][(shotLocation % 10)] === 1) {
    dialogueBox.innerText = "> GREAT SHOT";
    cpuBoard[Math.floor(shotLocation / 10)][(shotLocation % 10)] = 0;
    cpuBoardTiles[shotLocation].style.backgroundColor = '';
    cpuBoardTiles[shotLocation].classList.add('hit')
  }
  turn = true;
  console.log(cpuBoard)
  handleCpuShotEasy(playerBoard);
  checkForWinner(cpuBoard, playerBoard);
}


function handleCpuShotEasy(playerBoard) {
  if (turn === true) {
    let cpuShotLocation = Math.floor(Math.random() * 100);
    if (previousCpuShots.includes(cpuShotLocation)) {
      handleCpuShotEasy(playerBoard);
    } else {
    console.log(`CPU SHOT LOCATION: ${cpuShotLocation}`);
    if (playerBoard[Math.floor(cpuShotLocation / 10)][(cpuShotLocation % 10)] === 0) {
      cpuDialogueBox.innerText = "> ENEMY MISSED";
      playerBoardTiles[cpuShotLocation].classList.add('miss')
    } else if (playerBoard[Math.floor(cpuShotLocation / 10)][(cpuShotLocation % 10)] === 5) {
      cpuDialogueBox.innerText = "> ENEMY HIT YOUR CARRIER";
      playerBoard[Math.floor(cpuShotLocation / 10)][(cpuShotLocation % 10)] = 0
      playerBoardTiles[cpuShotLocation].style.backgroundColor = '';
      playerBoardTiles[cpuShotLocation].classList.add('hit')
    }  else if (playerBoard[Math.floor(cpuShotLocation / 10)][(cpuShotLocation % 10)] === 4) {
      cpuDialogueBox.innerText = "> ENEMY HIT YOUR BATTLESHIP";
      playerBoard[Math.floor(cpuShotLocation / 10)][(cpuShotLocation % 10)] = 0
      playerBoardTiles[cpuShotLocation].style.backgroundColor = '';
      playerBoardTiles[cpuShotLocation].classList.add('hit')
    }  else if (playerBoard[Math.floor(cpuShotLocation / 10)][(cpuShotLocation % 10)] === 3) {
      cpuDialogueBox.innerText = "> ENEMY HIT YOUR CRUISER";
      playerBoard[Math.floor(cpuShotLocation / 10)][(cpuShotLocation % 10)] = 0
      playerBoardTiles[cpuShotLocation].style.backgroundColor = '';
      playerBoardTiles[cpuShotLocation].classList.add('hit')
    }  else if (playerBoard[Math.floor(cpuShotLocation / 10)][(cpuShotLocation % 10)] === 2) {
      cpuDialogueBox.innerText = "> ENEMY HIT YOUR DESTROYER";
      playerBoard[Math.floor(cpuShotLocation / 10)][(cpuShotLocation % 10)] = 0
      playerBoardTiles[cpuShotLocation].style.backgroundColor = '';
      playerBoardTiles[cpuShotLocation].classList.add('hit')
    }  else if (playerBoard[Math.floor(cpuShotLocation / 10)][(cpuShotLocation % 10)] === 1) {
      cpuDialogueBox.innerText = "> ENEMY HIT YOUR SUBMARINE";
      playerBoard[Math.floor(cpuShotLocation / 10)][(cpuShotLocation % 10)] = 0
      playerBoardTiles[cpuShotLocation].style.backgroundColor = '';
      playerBoardTiles[cpuShotLocation].classList.add('hit')
    }
    turn = false;
    previousCpuShots.push(cpuShotLocation);
    console.log(playerBoard)
    console.log(previousCpuShots);
  }
}
checkForWinner(cpuBoard, playerBoard);
}

//! ----------------------- SHIP PLACEMENT ----------------------- !//
function handleShipPlacement(evt, playerBoard, playerdot) {
  if (carrierPlaced === false) {
    placeCarrier(evt, playerBoard, ships[4].length);
    dialogueBox.innerText = "> PLACE YOUR BATTLESHIP";
  } else if (battleshipPlaced === false) {
      placeBattleship(evt, playerBoard, ships[3].length );
      dialogueBox.innerText = "> PLACE YOUR CRUISER";
  } else if (cruiserPlaced === false) {
      placeCruiser(evt, playerBoard, ships[2].length);
      dialogueBox.innerText = "> PLACE YOUR DESTORYER";
    } else if (destroyerPlaced === false) {        
      placeDestroyer(evt, playerBoard, ships[0].length);
      dialogueBox.innerText = "> PLACE YOUR SUBMARINE";
  } else if (submarinePlaced === false) {
      placeSubmarine(evt, playerBoard, ships[1].length);
      dialogueBox.innerText = "> TAKE YOUR SHOT!";
      placeCpuShips(cpuBoard); 
      cpuDialogueBox.innerText = "> ENEMY SHIPS IN THE WATER!";  
      handleShot(cpuBoard);
  } else if (submarinePlaced === true) {

  }
}


function placeCarrier(evt, playerBoard) {
  const shipLength = ships[4].length
  const selection = Array.from(playerBoardTiles).indexOf(evt.target);
  startingRow = Math.floor(selection / 10);
  endingRow = Math.floor((selection + (shipLength - 1)) / 10);
  endingLetter = Math.floor(selection + ((shipLength) * 10)) % 10;
  startingLetter = (selection % 10);
  if (rotation === 1) {
    if (startingRow === endingRow) {
      for (let x = selection; x < selection + shipLength; x++) {
        if (playerBoard[Math.floor(x / 10)][x % 10] === 0) {
          playerBoardTiles[x].style.backgroundColor = 'gray';
          //divides tile index by 10 for first coordinate, then takes remainder of x/10 for second coordinate then sets those to 5s to represent carrier
          playerBoard[Math.floor(x / 10)][x % 10] = shipLength;
          // playerBoardTiles[x].removeEventListener('click', handlePlayerShipPlacement);
          carrierPlaced = true;
      } else {
        console.log('OVERLAP');
        carrierPlaced = false;
      }
      }
    } else {
      console.log('SHIP DOESNT FIT');
      carrierPlaced = false;
    }
  } else if (rotation === -1) {
    if (endingRow < shipLength + 1) {
      for (let x = selection; x <= selection + ((shipLength - 1) * 10); x += 10) {
        if (playerBoard[Math.floor(x / 10)][x % 10] === 0) {
          playerBoardTiles[x].style.backgroundColor = 'gray';
          playerBoard[Math.floor(x / 10)][x % 10] = shipLength;
          carrierPlaced = true;
      } else {
        console.log('OVERLAP');
        carrierPlaced = false;
      }
    }
    } else {
      console.log('SHIP DOESNT FIT');
      carrierPlaced = false;
    }
  }
  console.log(playerBoard);
}

function placeBattleship(evt, playerBoard) {
  const shipLength = ships[3].length
  const selection = Array.from(playerBoardTiles).indexOf(evt.target);
  startingRow = Math.floor(selection / 10);
  endingRow = Math.floor((selection + (shipLength - 1)) / 10);
  endingLetter = Math.floor(selection + ((shipLength) * 10)) % 10;
  startingLetter = (selection % 10);
  if (rotation === 1) {
    if (startingRow === endingRow) {
      for (let x = selection; x < selection + shipLength; x++) {
        if (playerBoard[Math.floor(x / 10)][(x % 10)] === 0) {
          playerBoardTiles[x].style.backgroundColor = 'gray';
          //divides tile index by 10 for first coordinate, then takes remainder of x/10 for second coordinate then sets those to 5s to represent carrier
          playerBoard[Math.floor(x / 10)][x % 10] = shipLength;
          // playerBoardTiles[x].removeEventListener('click', handlePlayerShipPlacement);
          battleshipPlaced = true;
      } else {
        console.log('OVERLAP');
        battleshipPlaced = false;
      }
      }
    } else {
      console.log('SHIP DOESNT FIT first if');
      battleshipPlaced = false;
    }
  } else if (rotation === -1) {
    if (startingRow < 7) {
      for (let x = selection; x <= selection + ((shipLength - 1) * 10); x += 10) {
        if (playerBoard[Math.floor(x / 10)][x % 10] === 0) {
          playerBoardTiles[x].style.backgroundColor = 'gray';
          playerBoard[Math.floor(x / 10)][x % 10] = shipLength;
          battleshipPlaced = true;
      } else {
        console.log('OVERLAP');
        battleshipPlaced = false;

      }
    }
    } else {
      console.log('SHIP DOESNT FIT 2nd if');
      battleshipPlaced = false;
    }
  }
  console.log(playerBoard);
}

function placeCruiser(evt, playerBoard) {
  const shipLength = ships[2].length
  const selection = Array.from(playerBoardTiles).indexOf(evt.target);
  startingRow = Math.floor(selection / 10);
  endingRow = Math.floor((selection + (shipLength - 1)) / 10);
  endingLetter = Math.floor(selection + ((shipLength) * 10)) % 10;
  startingLetter = (selection % 10);
  if (rotation === 1) {
    if (startingRow === endingRow) {
      for (let x = selection; x < selection + shipLength; x++) {
        if (playerBoard[Math.floor(x / 10)][x % 10] === 0) {
          playerBoardTiles[x].style.backgroundColor = 'gray';
          //divides tile index by 10 for first coordinate, then takes remainder of x/10 for second coordinate then sets those to 5s to represent carrier
          playerBoard[Math.floor(x / 10)][x % 10] = shipLength;
          // playerBoardTiles[x].removeEventListener('click', handlePlayerShipPlacement);
          cruiserPlaced = true;
      } else {
        console.log('OVERLAP');
        cruiserPlaced = false;
      }
      }
    } else {
      console.log('SHIP DOESNT FIT');
      cruiserPlaced = false;
    }
  } else if (rotation === -1) {
    if (startingRow < 8) {
      for (let x = selection; x <= selection + ((shipLength - 1) * 10); x += 10) {
        if (playerBoard[Math.floor(x / 10)][x % 10] === 0) {
          playerBoardTiles[x].style.backgroundColor = 'gray';
          playerBoard[Math.floor(x / 10)][x % 10] = shipLength;
          cruiserPlaced = true;
      } else {
        console.log('OVERLAP');
        cruiserPlaced = false;

      }
    }
    } else {
      console.log('SHIP DOESNT FIT');
      cruiserPlaced = false;
    }
  }
  console.log(playerBoard);
}

function placeDestroyer(evt, playerBoard) {
  const shipLength = ships[1].length
  const selection = Array.from(playerBoardTiles).indexOf(evt.target);
  startingRow = Math.floor(selection / 10);
  endingRow = Math.floor((selection + (shipLength - 1)) / 10);
  endingLetter = Math.floor(selection + ((shipLength) * 10)) % 10;
  startingLetter = (selection % 10);
  if (rotation === 1) {
    if (startingRow === endingRow) {
      for (let x = selection; x < selection + shipLength; x++) {
        if (playerBoard[Math.floor(x / 10)][x % 10] === 0) {
          playerBoardTiles[x].style.backgroundColor = 'gray';
          //divides tile index by 10 for first coordinate, then takes remainder of x/10 for second coordinate then sets those to 5s to represent carrier
          playerBoard[Math.floor(x / 10)][x % 10] = shipLength;
          // playerBoardTiles[x].removeEventListener('click', handlePlayerShipPlacement);
          destroyerPlaced = true;
      } else {
        console.log('OVERLAP');
        destroyerPlaced = false;
      }
      }
    } else {
      console.log('SHIP DOESNT FIT first if');
      destroyerPlaced = false;
    }
  } else if (rotation === -1) {
    if (startingRow < 9) {
      for (let x = selection; x <= selection + ((shipLength - 1) * 10); x += 10) {
        if (playerBoard[Math.floor(x / 10)][x % 10] === 0) {
          playerBoardTiles[x].style.backgroundColor = 'gray';
          playerBoard[Math.floor(x / 10)][x % 10] = shipLength;
          destroyerPlaced = true;
      } else {
        console.log('OVERLAP');
        destroyerPlaced = false;

      }
    }
    } else {
      console.log('SHIP DOESNT FIT 2nd if');
      destroyerPlaced = false;
    }
  }
  console.log(playerBoard);
}

function placeSubmarine(evt, playerBoard) {
  const shipLength = ships[0].length
  const selection = Array.from(playerBoardTiles).indexOf(evt.target);
  startingRow = Math.floor(selection / 10);
  endingRow = Math.floor((selection / 10) + (shipLength - 1));
  endingLetter = Math.floor(selection + ((shipLength) * 10)) % 10;
  startingLetter = (selection % 10);
    if (startingRow === endingRow) {
      for (let x = selection; x < selection + shipLength; x++) {
        if (playerBoard[Math.floor(x / 10)][x % 10] === 0) {
          playerBoardTiles[x].style.backgroundColor = 'gray';
          //divides tile index by 10 for first coordinate, then takes remainder of x/10 for second coordinate then sets those to 5s to represent carrier
          playerBoard[Math.floor(x / 10)][x % 10] = shipLength;
          // playerBoardTiles[x].removeEventListener('click', handlePlayerShipPlacement);
          submarinePlaced = true;
        } else {
          console.log('OVERLAP');
          submarinePlaced = false;
        }
      }
    }
  console.log(playerBoard);
}

function placeCpuShips(cpuBoard) {
  console.log('placing cpu ships');
  if (cpuCarrierPlaced === false) {
    placeCpuCarrier(cpuBoard, ships[4].length) 
    // cpuCarrierPlaced = true;
    console.log('PLACED CARRIER')
  } 
  if (cpuCarrierPlaced === true) {
    placeCpuBattleship(cpuBoard, ships[3].length) 
    // cpuBattleshipPlaced = true;
    console.log('PLACED BATTLESHIP')
  } 
  if (cpuBattleshipPlaced === true) {
    placeCpuCruiser(cpuBoard, ships[2].length) 
    // cpuCruiserPlaced = true;
    console.log('PLACED CRUISER')
  } 
  if (cpuCruiserPlaced === true) {
    placeCpuDestroyer(cpuBoard, ships[1].length) 
    // cpuDestroyerPlaced = true;
    console.log('PLACED DESTROYER')
  } 
  if (cpuDestroyerPlaced === true) {
    placeCpuSubmarine(cpuBoard, ships[0].length) 
    // cpuSubmarinePlaced = true;
    console.log('PLACED SUBMARINE')
  }
  console.log(cpuBoard)
}

function placeCpuCarrier (cpuBoard) {
  console.log(`START OF CARRIER`)
  const shipLength = ships[4].length;
  let randomRotation = Math.floor(Math.random() * 2);
  let randomStartLocation = Math.floor(Math.random() * 100);
  let startingRow = 15;
  let endingRow = 10;
  let startingLetter = 1;
  let endingLetter = 11;

  if (randomRotation === 1) {

  while (startingRow !== endingRow) {
    console.log('STARTING WHILE LOOP');
    randomStartLocation = Math.floor(Math.random() * 99);
    console.log(`RANDOM START: ${randomStartLocation}`)
    endingLetter = Math.floor(randomStartLocation + ((shipLength - 1) * 10)) % 10;
    startingLetter = (randomStartLocation % 10);
    startingRow = Math.floor(randomStartLocation / 10);
    console.log(`STARTINGROW: ${startingRow}`)
    endingRow = Math.floor((randomStartLocation + shipLength) / 10);
    console.log(`ENDINGROW: ${endingRow}`)
  }

    for (let x = startingLetter; x < startingLetter + shipLength; x++) {
      if (cpuBoard[startingRow][x] !== 0) {
        cpuCarrierPlaced = false;
        return;
      } else {
          console.log(` X VALUE: ${x}`)
          console.log('does contain 0');
          cpuBoard[startingRow][x] = shipLength;
          // cpuBoardTiles[x + (startingRow * 10)].style.backgroundColor = 'gray';
          cpuCarrierPlaced = true;
      }
    }
  

  } else {

    while (startingRow > shipLength) {
      console.log('STARTING WHILE LOOP');
      randomStartLocation = Math.floor(Math.random() * 100);
      console.log(`RANDOM START: ${randomStartLocation}`)
  
      startingRow = Math.floor(randomStartLocation / 10);
      console.log(`STARTINGROW: ${startingRow}`)
      endingRow = Math.floor((randomStartLocation + shipLength) / 10);
      console.log(`ENDINGROW: ${endingRow}`)
      endingLetter = Math.floor(randomStartLocation + ((shipLength - 1) * 10)) % 10;
      startingLetter = (randomStartLocation % 10);

      } 
  
      for (let x = randomStartLocation; x < randomStartLocation + ((shipLength) * 10); x += 10) {
       if  (cpuBoard[startingRow][(x - 1)] && cpuBoard[startingRow][(x)] && cpuBoard[startingRow][(x + 1)] && cpuBoard[startingRow][(x + 2)] !== 0) {
          cpuCarrierPlaced = false;
          return;
        } else {
            console.log(` X VALUE: ${x}`)
            console.log('does contain 0');
            cpuBoard[Math.floor(x / 10)][x % 10] = shipLength;
            // cpuBoardTiles[x].style.backgroundColor = 'gray';
            cpuCarrierPlaced = true;
        }
      }
  } 
  console.log(cpuBoard);
}

function placeCpuBattleship (cpuBoard) {
  console.log(`START OF CARRIER`)
  const shipLength = ships[3].length;
  let randomRotation = Math.floor(Math.random() * 2);
  let randomStartLocation = Math.floor(Math.random() * 100);
  let startingRow = 15;
  let endingRow = 10;
  let startingLetter = 1;
  let endingLetter = 11;

  if (randomRotation === 1) {

  while (startingRow !== endingRow) {
    console.log('STARTING WHILE LOOP');
    randomStartLocation = Math.floor(Math.random() * 99);
    console.log(`RANDOM START: ${randomStartLocation}`)
    endingLetter = Math.floor(randomStartLocation + ((shipLength - 1) * 10)) % 10;
    startingLetter = (randomStartLocation % 10);
    startingRow = Math.floor(randomStartLocation / 10);
    console.log(`STARTINGROW: ${startingRow}`)
    endingRow = Math.floor((randomStartLocation + shipLength) / 10);
    console.log(`ENDINGROW: ${endingRow}`)
  }

    for (let x = startingLetter; x < startingLetter + shipLength; x++) {
      if (cpuBoard[startingRow][x] !== 0) {
        cpuBattleshipPlaced = false;
        
      } else {
          console.log(` X VALUE: ${x}`)
          console.log('does contain 0');
          cpuBoard[startingRow][x] = shipLength;
          // cpuBoardTiles[x + (startingRow * 10)].style.backgroundColor = 'gray';
          cpuBattleshipPlaced = true;
      }
    }
  

  } else {

    while (startingRow > shipLength) {
      console.log('STARTING WHILE LOOP');
      randomStartLocation = Math.floor(Math.random() * 100);
      console.log(`RANDOM START: ${randomStartLocation}`)
  
      startingRow = Math.floor(randomStartLocation / 10);
      console.log(`STARTINGROW: ${startingRow}`)
      endingRow = Math.floor((randomStartLocation + shipLength) / 10);
      console.log(`ENDINGROW: ${endingRow}`)
      endingLetter = Math.floor(randomStartLocation + ((shipLength - 1) * 10)) % 10;
      startingLetter = (randomStartLocation % 10);

      } 
  
      for (let x = randomStartLocation; x < randomStartLocation + ((shipLength) * 10); x += 10) {
       if  (cpuBoard[startingRow][(x - 1)] && cpuBoard[startingRow][(x)] && cpuBoard[startingRow][(x + 1)] && cpuBoard[startingRow][(x + 2)] !== 0) {
          cpuBattleshipPlaced = false;
          
        } else {
            console.log(` X VALUE: ${x}`)
            console.log('does contain 0');
            cpuBoard[Math.floor(x / 10)][x % 10] = shipLength;
            // cpuBoardTiles[x].style.backgroundColor = 'gray';
            cpuBattleshipPlaced = true;
        }
      }
  } 
  console.log(cpuBoard);
}

function placeCpuCruiser (cpuBoard) {
  console.log(`START OF CARRIER`)
  const shipLength = ships[2].length;
  let randomRotation = Math.floor(Math.random() * 2);
  let randomStartLocation = Math.floor(Math.random() * 100);
  let startingRow = 15;
  let endingRow = 10;
  let startingLetter = 1;
  let endingLetter = 11;

  if (randomRotation === 1) {

  while (startingRow !== endingRow) {
    console.log('STARTING WHILE LOOP');
    randomStartLocation = Math.floor(Math.random() * 99);
    console.log(`RANDOM START: ${randomStartLocation}`)
    endingLetter = Math.floor(randomStartLocation + ((shipLength - 1) * 10)) % 10;
    startingLetter = (randomStartLocation % 10);
    startingRow = Math.floor(randomStartLocation / 10);
    console.log(`STARTINGROW: ${startingRow}`)
    endingRow = Math.floor((randomStartLocation + shipLength) / 10);
    console.log(`ENDINGROW: ${endingRow}`)
  }

    for (let x = startingLetter; x < startingLetter + shipLength; x++) {
      if (cpuBoard[startingRow][x] !== 0) {
        cpuCruiserPlaced = false;
        
      } else {
          console.log(` X VALUE: ${x}`)
          console.log('does contain 0');
          cpuBoard[startingRow][x] = shipLength;
          // cpuBoardTiles[x + (startingRow * 10)].style.backgroundColor = 'gray';
          cpuCruiserPlaced = true;
      }
    }
  

  } else {

    while (startingRow > shipLength) {
      console.log('STARTING WHILE LOOP');
      randomStartLocation = Math.floor(Math.random() * 100);
      console.log(`RANDOM START: ${randomStartLocation}`)
  
      startingRow = Math.floor(randomStartLocation / 10);
      console.log(`STARTINGROW: ${startingRow}`)
      endingRow = Math.floor((randomStartLocation + shipLength) / 10);
      console.log(`ENDINGROW: ${endingRow}`)
      endingLetter = Math.floor(randomStartLocation + ((shipLength - 1) * 10)) % 10;
      startingLetter = (randomStartLocation % 10);

      } 
  
      for (let x = randomStartLocation; x < randomStartLocation + ((shipLength) * 10); x += 10) {
       if  (cpuBoard[startingRow][(x - 1)] && cpuBoard[startingRow][(x)] && cpuBoard[startingRow][(x + 1)] && cpuBoard[startingRow][(x + 2)] !== 0) {
          cpuCruiserPlaced = false;
          
        } else {
            console.log(` X VALUE: ${x}`)
            console.log('does contain 0');
            cpuBoard[Math.floor(x / 10)][x % 10] = shipLength;
            // cpuBoardTiles[x].style.backgroundColor = 'gray';
            cpuCruiserPlaced = true;
        }
      }
  } 
  console.log(cpuBoard);
}

function placeCpuDestroyer (cpuBoard) {
  console.log(`START OF CARRIER`)
  const shipLength = ships[1].length;
  let randomRotation = Math.floor(Math.random() * 2);
  let randomStartLocation = Math.floor(Math.random() * 100);
  let startingRow = 15;
  let endingRow = 10;
  let startingLetter = 1;
  let endingLetter = 11;

  if (randomRotation === 1) {

  while (startingRow !== endingRow) {
    console.log('STARTING WHILE LOOP');
    randomStartLocation = Math.floor(Math.random() * 99);
    console.log(`RANDOM START: ${randomStartLocation}`)
    endingLetter = Math.floor(randomStartLocation + ((shipLength - 1) * 10)) % 10;
    startingLetter = (randomStartLocation % 10);
    startingRow = Math.floor(randomStartLocation / 10);
    console.log(`STARTINGROW: ${startingRow}`)
    endingRow = Math.floor((randomStartLocation + shipLength) / 10);
    console.log(`ENDINGROW: ${endingRow}`)
  }

    for (let x = startingLetter; x < startingLetter + shipLength; x++) {
      if (cpuBoard[startingRow][x] !== 0) {
        cpuDestroyerPlaced = false;
        
      } else {
          console.log(` X VALUE: ${x}`)
          console.log('does contain 0');
          cpuBoard[startingRow][x] = shipLength;
          // cpuBoardTiles[x + (startingRow * 10)].style.backgroundColor = 'gray';
          cpuDestroyerPlaced = true;
      }
    }
  

  } else {

    while (startingRow > shipLength) {
      console.log('STARTING WHILE LOOP');
      randomStartLocation = Math.floor(Math.random() * 100);
      console.log(`RANDOM START: ${randomStartLocation}`)
  
      startingRow = Math.floor(randomStartLocation / 10);
      console.log(`STARTINGROW: ${startingRow}`)
      endingRow = Math.floor((randomStartLocation + shipLength) / 10);
      console.log(`ENDINGROW: ${endingRow}`)
      endingLetter = Math.floor(randomStartLocation + ((shipLength - 1) * 10)) % 10;
      startingLetter = (randomStartLocation % 10);

      } 
  
      for (let x = randomStartLocation; x < randomStartLocation + ((shipLength) * 10); x += 10) {
       if  (cpuBoard[startingRow][(x)] && cpuBoard[startingRow][(x + 1)] !== 0) {
          cpuDestroyerPlaced = false;
          
        } else {
            console.log(` X VALUE: ${x}`)
            console.log('does contain 0');
            cpuBoard[Math.floor(x / 10)][x % 10] = shipLength;
            // cpuBoardTiles[x].style.backgroundColor = 'gray';
            cpuDestroyerPlaced = true;
        }
      }
  } 
  console.log(cpuBoard);
}

function placeCpuSubmarine (cpuBoard) {
  console.log(`START OF SUBMARINE`)
  const shipLength = ships[0].length;
  let randomStartLocation = Math.floor(Math.random() * 100);
  let startingRow = 15;
  let endingRow = 10;
  let startingLetter = 1;
  let endingLetter = 11;


  while (startingRow !== endingRow) {
    console.log('STARTING WHILE LOOP');
    randomStartLocation = Math.floor(Math.random() * 99);
    console.log(`RANDOM START: ${randomStartLocation}`)
    endingLetter = Math.floor(randomStartLocation + ((shipLength - 1) * 10)) % 10;
    startingLetter = (randomStartLocation % 10);
    startingRow = Math.floor(randomStartLocation / 10);
    console.log(`STARTINGROW: ${startingRow}`)
    endingRow = Math.floor((randomStartLocation + shipLength) / 10);
    console.log(`ENDINGROW: ${endingRow}`)
  }

    for (let x = startingLetter; x < startingLetter + shipLength; x++) {
      if (cpuBoard[startingRow][x] !== 0) {
        cpuSubmarinePlaced = false;
        placeCpuSubmarine(cpuBoard);
      } else {
          console.log(` X VALUE: ${x}`)
          console.log('does contain 0');
          cpuBoard[startingRow][x] = shipLength;
          // cpuBoardTiles[x + (startingRow * 10)].style.backgroundColor = 'gray';
          cpuSubmarinePlaced = true;
      }
    }
  console.log(cpuBoard);
}
