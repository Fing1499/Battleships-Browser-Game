
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

const startScreen = document.querySelector('.difficulty-screen');
const cpuBoardTiles = document.querySelectorAll('#cpu-board > .dot');
const playerBoardTiles = document.querySelectorAll('#player-board > .dot');
const easyButton = document.querySelector('.easy');
const hardButton = document.querySelector('.hard');
const playAgainButton = document.querySelector('.play-again');
const title = document.querySelector('.UI-title');
const dialogueBox = document.querySelector('#dialogue-box');
const cpuDialogueBox = document.querySelector('#cpu-dialogue-box')

easyButton.addEventListener('click', initEasy);
playAgainButton.addEventListener('click', restart);

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
  dialogueBox.innerText = "> PLACE YOUR CARRIER (5 TILES)";

  playerBoardTiles.forEach(playerdot => {
    playerdot.addEventListener('click', evt => {
      handleShipPlacement(evt, playerBoard);
    });
    playerdot.addEventListener('mouseenter', function (e) {
      e.target.classList.add('previewShipPlacement')
    });
    playerdot.addEventListener('mouseleave', function (e) {
      e.target.classList.remove('previewShipPlacement')
    });
  });
  document.addEventListener('keydown', keypress => {
    rotation *= -1;
    if (rotation === 1) {
      cpuDialogueBox.innerText = "> ROTATION: ⇨"
    } else {
      cpuDialogueBox.innerText = "> ROTATION: ⇩"
    }
  });
 
}

function handleShot(cpuBoard) {
  cpuBoardTiles.forEach(cpudot => {
    cpudot.addEventListener('click', shoot => {
      if (turn === false) {
        takeShot(shoot, cpuBoard, cpuBoardTiles);
      }
     });
    cpudot.addEventListener('mouseenter', function (e) {
      e.target.classList.add('previewShotPlacement')
    });
    cpudot.addEventListener('mouseleave', function (e) {
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

function takeShot(shoot, cpuBoard, cpuBoardTiles) {
  let shotLocation = Array.from(cpuBoardTiles).indexOf(shoot.target)
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
  handleCpuShotEasy(playerBoard);
  checkForWinner(cpuBoard, playerBoard);
}

function handleCpuShotEasy(playerBoard) {
  if (turn === true) {
    let cpuShotLocation = Math.floor(Math.random() * 100);
    if (previousCpuShots.includes(cpuShotLocation)) {
      handleCpuShotEasy(playerBoard);
    } else {
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
  }
}
checkForWinner(cpuBoard, playerBoard);
}

function handleShipPlacement(evt, playerBoard, playerdot) {
  if (carrierPlaced === false) {
    placeCarrier(evt, playerBoard, ships[4].length);
    dialogueBox.innerText = "> PLACE YOUR BATTLESHIP (4 TILES)";
  } else if (battleshipPlaced === false) {
      placeBattleship(evt, playerBoard, ships[3].length );
      dialogueBox.innerText = "> PLACE YOUR CRUISER (3 TILES)";
  } else if (cruiserPlaced === false) {
      placeCruiser(evt, playerBoard, ships[2].length);
      dialogueBox.innerText = "> PLACE YOUR DESTORYER (2 TILES)";
    } else if (destroyerPlaced === false) {        
      placeDestroyer(evt, playerBoard, ships[0].length);
      dialogueBox.innerText = "> PLACE YOUR SUBMARINE (1 TILE)";
  } else if (submarinePlaced === false) {
      placeSubmarine(evt, playerBoard, ships[1].length);
      cpuDialogueBox.innerText = "> TAKE YOUR SHOT!";
      placeCpuShips(cpuBoard); 
      dialogueBox.innerText = "> ENEMY SHIPS IN THE WATER!";  
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
          playerBoard[Math.floor(x / 10)][x % 10] = shipLength;
          carrierPlaced = true;
          cpuDialogueBox.innerText = "> CARRIER PLACED!"
        } else {
          carrierPlaced = false;
        }
      }
    } else {
      carrierPlaced = false;
      cpuDialogueBox.innerText = "> SHIP DOES NOT FIT! PICK A NEW LOCATION 1"
    }
  } else if (rotation === -1) {
    if (startingRow < 6) {
      for (let x = selection; x <= selection + ((shipLength - 1) * 10); x += 10) {
        if (playerBoard[Math.floor(x / 10)][x % 10] === 0) {
          playerBoardTiles[x].style.backgroundColor = 'gray';
          playerBoard[Math.floor(x / 10)][x % 10] = shipLength;
          carrierPlaced = true;
          cpuDialogueBox.innerText = "> CARRIER PLACED!"
        } else {
          carrierPlaced = false;
        }
      }
    } else {
    carrierPlaced = false;
    cpuDialogueBox.innerText = "> SHIP DOES NOT FIT! PICK A NEW LOCATION "
    }
  }
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
          playerBoard[Math.floor(x / 10)][x % 10] = shipLength;
          battleshipPlaced = true;
          cpuDialogueBox.innerText = "> BATTLESHIP PLACED!"
        } else {
          battleshipPlaced = false;
        }
      }
    } else {
      battleshipPlaced = false;
      cpuDialogueBox.innerText = "> SHIP DOES NOT FIT! PICK A NEW LOCATION"
    }
  } else if (rotation === -1) {
    if (startingRow < 7) {
      for (let x = selection; x <= selection + ((shipLength - 1) * 10); x += 10) {
        if (playerBoard[Math.floor(x / 10)][x % 10] === 0) {
          playerBoardTiles[x].style.backgroundColor = 'gray';
          playerBoard[Math.floor(x / 10)][x % 10] = shipLength;
          battleshipPlaced = true;
          cpuDialogueBox.innerText = "> BATTLESHIP PLACED!"
        } else {
          battleshipPlaced = false;

        }
      }
    } else {
      battleshipPlaced = false;
      cpuDialogueBox.innerText = "> SHIP DOES NOT FIT! PICK A NEW LOCATION"
    }
  }
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
          playerBoard[Math.floor(x / 10)][x % 10] = shipLength;
          cruiserPlaced = true;
          cpuDialogueBox.innerText = "> CRUISER PLACED!"
        } else {
          cruiserPlaced = false;
        }
      }
    } else {
      cruiserPlaced = false;
      cpuDialogueBox.innerText = "> SHIP DOES NOT FIT! PICK A NEW LOCATION"
    }
  } else if (rotation === -1) {
    if (startingRow < 8) {
      for (let x = selection; x <= selection + ((shipLength - 1) * 10); x += 10) {
        if (playerBoard[Math.floor(x / 10)][x % 10] === 0) {
          playerBoardTiles[x].style.backgroundColor = 'gray';
          playerBoard[Math.floor(x / 10)][x % 10] = shipLength;
          cruiserPlaced = true;
          cpuDialogueBox.innerText = "> CRUISER PLACED!"
        } else {
          cruiserPlaced = false;
        }
      }
    } else {
      cruiserPlaced = false;
      cpuDialogueBox.innerText = "> SHIP DOES NOT FIT! PICK A NEW LOCATION"
    }
  }
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
          playerBoard[Math.floor(x / 10)][x % 10] = shipLength;
          destroyerPlaced = true;
          cpuDialogueBox.innerText = "> DESTROYER PLACED!"

        } else {
          destroyerPlaced = false;
        }
      }
    } else {
      destroyerPlaced = false;
      cpuDialogueBox.innerText = "> SHIP DOES NOT FIT! PICK A NEW LOCATION"
    }
  } else if (rotation === -1) {
    if (startingRow < 9) {
      for (let x = selection; x <= selection + ((shipLength - 1) * 10); x += 10) {
        if (playerBoard[Math.floor(x / 10)][x % 10] === 0) {
          playerBoardTiles[x].style.backgroundColor = 'gray';
          playerBoard[Math.floor(x / 10)][x % 10] = shipLength;
          destroyerPlaced = true;
          cpuDialogueBox.innerText = "> DESTROYER PLACED!"

        } else {
          destroyerPlaced = false;
        }
      }
    } else {
      destroyerPlaced = false;
      cpuDialogueBox.innerText = "> SHIP DOES NOT FIT! PICK A NEW LOCATION"
    }
  }
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
          playerBoard[Math.floor(x / 10)][x % 10] = shipLength;
          submarinePlaced = true;
          cpuDialogueBox.innerText = "> SUBMARINE PLACED!"
        } else {
          submarinePlaced = false;
          cpuDialogueBox.innerText = "> SHIP DOES NOT FIT! PICK A NEW LOCATION"
        }
      }
    }
}

function placeCpuShips(cpuBoard) {
  if (cpuCarrierPlaced === false) {
    placeCpuCarrier(cpuBoard, ships[4].length) 
  } 
  if (cpuCarrierPlaced === true) {
    placeCpuBattleship(cpuBoard, ships[3].length) 
  } 
  if (cpuBattleshipPlaced === true) {
    placeCpuCruiser(cpuBoard, ships[2].length) 
  } 
  if (cpuCruiserPlaced === true) {
    placeCpuDestroyer(cpuBoard, ships[1].length) 
  } 
  if (cpuDestroyerPlaced === true) {
    placeCpuSubmarine(cpuBoard, ships[0].length) 
  }
}

function placeCpuCarrier (cpuBoard) {
  const shipLength = ships[4].length;
  let randomRotation = Math.floor(Math.random() * 2);
  let randomStartLocation = Math.floor(Math.random() * 100);
  let startingRow = 15;
  let endingRow = 10;
  let startingLetter = 1;
  let endingLetter = 11;
  if (randomRotation === 1) {
    while (startingRow !== endingRow) {
      randomStartLocation = Math.floor(Math.random() * 99);
      endingLetter = Math.floor(randomStartLocation + ((shipLength - 1) * 10)) % 10;
      startingLetter = (randomStartLocation % 10);
      startingRow = Math.floor(randomStartLocation / 10);
      endingRow = Math.floor((randomStartLocation + shipLength) / 10);
    }
    for (let x = startingLetter; x < startingLetter + shipLength; x++) {
      if (cpuBoard[startingRow][x] !== 0) {
        cpuCarrierPlaced = false;
        return;
      } else {
        cpuBoard[startingRow][x] = shipLength;
        cpuCarrierPlaced = true;
      }
    }
  } else {
    while (startingRow > shipLength) {
      randomStartLocation = Math.floor(Math.random() * 100);
      startingRow = Math.floor(randomStartLocation / 10);
      endingRow = Math.floor((randomStartLocation + shipLength) / 10);
      endingLetter = Math.floor(randomStartLocation + ((shipLength - 1) * 10)) % 10;
      startingLetter = (randomStartLocation % 10);
    } 
    for (let x = randomStartLocation; x < randomStartLocation + ((shipLength) * 10); x += 10) {
      if  (cpuBoard[startingRow][(x - 1)] && cpuBoard[startingRow][(x)] && cpuBoard[startingRow][(x + 1)] && cpuBoard[startingRow][(x + 2)] !== 0) {
        cpuCarrierPlaced = false;
        return;
      } else {
          cpuBoard[Math.floor(x / 10)][x % 10] = shipLength;
          cpuCarrierPlaced = true;
        }
    }
  } 
}

function placeCpuBattleship (cpuBoard) {
  const shipLength = ships[3].length;
  let randomRotation = Math.floor(Math.random() * 2);
  let randomStartLocation = Math.floor(Math.random() * 100);
  let startingRow = 15;
  let endingRow = 10;
  let startingLetter = 1;
  let endingLetter = 11;
  if (randomRotation === 1) {
    while (startingRow !== endingRow) {
      randomStartLocation = Math.floor(Math.random() * 99);
      endingLetter = Math.floor(randomStartLocation + ((shipLength - 1) * 10)) % 10;
      startingLetter = (randomStartLocation % 10);
      startingRow = Math.floor(randomStartLocation / 10);
      endingRow = Math.floor((randomStartLocation + shipLength) / 10);
    }
    for (let x = startingLetter; x < startingLetter + shipLength; x++) {
      if (cpuBoard[startingRow][x] !== 0) {
        cpuBattleshipPlaced = false;
      } else {
        cpuBoard[startingRow][x] = shipLength;
        cpuBattleshipPlaced = true;
      }
    }
  } else {
    while (startingRow > shipLength) {
      randomStartLocation = Math.floor(Math.random() * 100);  
      startingRow = Math.floor(randomStartLocation / 10);
      endingRow = Math.floor((randomStartLocation + shipLength) / 10);
      endingLetter = Math.floor(randomStartLocation + ((shipLength - 1) * 10)) % 10;
      startingLetter = (randomStartLocation % 10);
    } 
    for (let x = randomStartLocation; x < randomStartLocation + ((shipLength) * 10); x += 10) {
      if  (cpuBoard[startingRow][(x - 1)] && cpuBoard[startingRow][(x)] && cpuBoard[startingRow][(x + 1)] && cpuBoard[startingRow][(x + 2)] !== 0) {
        cpuBattleshipPlaced = false;  
      } else {
          cpuBoard[Math.floor(x / 10)][x % 10] = shipLength;
          cpuBattleshipPlaced = true;
        }
    }
  } 
}

function placeCpuCruiser (cpuBoard) {
  const shipLength = ships[2].length;
  let randomRotation = Math.floor(Math.random() * 2);
  let randomStartLocation = Math.floor(Math.random() * 100);
  let startingRow = 15;
  let endingRow = 10;
  let startingLetter = 1;
  let endingLetter = 11;
  if (randomRotation === 1) {
    while (startingRow !== endingRow) {
      randomStartLocation = Math.floor(Math.random() * 99);
      endingLetter = Math.floor(randomStartLocation + ((shipLength - 1) * 10)) % 10;
      startingLetter = (randomStartLocation % 10);
      startingRow = Math.floor(randomStartLocation / 10);
      endingRow = Math.floor((randomStartLocation + shipLength) / 10);
    }
    for (let x = startingLetter; x < startingLetter + shipLength; x++) {
      if (cpuBoard[startingRow][x] !== 0) {
        cpuCruiserPlaced = false;
      } else {
        cpuBoard[startingRow][x] = shipLength;
        cpuCruiserPlaced = true;
      }
    }
  } else {
    while (startingRow > shipLength) {
      randomStartLocation = Math.floor(Math.random() * 100);  
      startingRow = Math.floor(randomStartLocation / 10);
      endingRow = Math.floor((randomStartLocation + shipLength) / 10);
      endingLetter = Math.floor(randomStartLocation + ((shipLength - 1) * 10)) % 10;
      startingLetter = (randomStartLocation % 10);
    } 
    for (let x = randomStartLocation; x < randomStartLocation + ((shipLength) * 10); x += 10) {
      if  (cpuBoard[startingRow][(x - 1)] && cpuBoard[startingRow][(x)] && cpuBoard[startingRow][(x + 1)] && cpuBoard[startingRow][(x + 2)] !== 0) {
        cpuCruiserPlaced = false;
          
      } else {
        cpuBoard[Math.floor(x / 10)][x % 10] = shipLength;
        cpuCruiserPlaced = true;
      }
    }
  } 
}

function placeCpuDestroyer (cpuBoard) {
  const shipLength = ships[1].length;
  let randomRotation = Math.floor(Math.random() * 2);
  let randomStartLocation = Math.floor(Math.random() * 100);
  let startingRow = 15;
  let endingRow = 10;
  let startingLetter = 1;
  let endingLetter = 11;
  if (randomRotation === 1) {
    while (startingRow !== endingRow) {
      randomStartLocation = Math.floor(Math.random() * 99);
      endingLetter = Math.floor(randomStartLocation + ((shipLength - 1) * 10)) % 10;
      startingLetter = (randomStartLocation % 10);
      startingRow = Math.floor(randomStartLocation / 10);
      endingRow = Math.floor((randomStartLocation + shipLength) / 10);
    }
    for (let x = startingLetter; x < startingLetter + shipLength; x++) {
      if (cpuBoard[startingRow][x] !== 0) {
        cpuDestroyerPlaced = false;
      } else {
        cpuBoard[startingRow][x] = shipLength;
        cpuDestroyerPlaced = true;
      }
    }
  } else {
    while (startingRow > shipLength) {
      randomStartLocation = Math.floor(Math.random() * 100);  
      startingRow = Math.floor(randomStartLocation / 10);
      endingRow = Math.floor((randomStartLocation + shipLength) / 10);
      endingLetter = Math.floor(randomStartLocation + ((shipLength - 1) * 10)) % 10;
      startingLetter = (randomStartLocation % 10);
    } 
    for (let x = randomStartLocation; x < randomStartLocation + ((shipLength) * 10); x += 10) {
      if  (cpuBoard[startingRow][(x)] && cpuBoard[startingRow][(x + 1)] !== 0) {
        cpuDestroyerPlaced = false; 
      } else {
          cpuBoard[Math.floor(x / 10)][x % 10] = shipLength;
          cpuDestroyerPlaced = true;
      }
    }
  } 
}

function placeCpuSubmarine (cpuBoard) {
  const shipLength = ships[0].length;
  let randomStartLocation = Math.floor(Math.random() * 100);
  let startingRow = 15;
  let endingRow = 10;
  let startingLetter = 1;
  let endingLetter = 11;
  while (startingRow !== endingRow) {
    randomStartLocation = Math.floor(Math.random() * 99);
    endingLetter = Math.floor(randomStartLocation + ((shipLength - 1) * 10)) % 10;
    startingLetter = (randomStartLocation % 10);
    startingRow = Math.floor(randomStartLocation / 10);
    endingRow = Math.floor((randomStartLocation + shipLength) / 10);
  }
  for (let x = startingLetter; x < startingLetter + shipLength; x++) {
    if (cpuBoard[startingRow][x] !== 0) {
      cpuSubmarinePlaced = false;
      placeCpuSubmarine(cpuBoard);
    } else {
      cpuBoard[startingRow][x] = shipLength;
      cpuSubmarinePlaced = true;
    }
  }
}
