const body = document.querySelector('body');
const gameTable = document.querySelector('.game-table');
const initialScreen = document.querySelector('.initial-screen');
const results = document.querySelector('.results');
const humanButton = document.querySelector('.human-button')
const machineButton = document.querySelector('.machine-button')
const modeButtons = [humanButton, machineButton];
let isMachine;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function createGameTable() {
  let quadrant;

  for(let i = 1; i <= 9; i++) {
    quadrant = document.createElement('div');
    gameTable.appendChild(quadrant);
  }
  gameTable.style.backgroundColor = '#000';
}
createGameTable()


function player(name, symbol, machine) {

  return { name, symbol, machine }

}

function isWinner(playerArray) {
  winnerPositions = [
      [0, 1, 2], [0, 3, 6], 
      [0, 4, 8], [1, 4, 7], 
      [2, 4, 6], [2, 5, 8], 
      [3, 4, 5], [6, 7, 8]
  ];

  return winnerPositions.some((winnerPosition) => winnerPosition.every((i) => playerArray.includes(i))); 

}

function gameStatusListener(arrayX, arrayY, arrayBoard) {

  if (isWinner(arrayX)){
    return 'Player 1 wins!';
  }
  else if (isWinner(arrayY)){
    return 'Player 2 wins!';
  }

  else if (arrayBoard.every(Boolean)) {return 'A tie!';}

  else return 0;

}
function displayResult(result) {

  textLabel = document.createElement('span')
  textLabel.innerHTML += result+'<br>';
  results.appendChild(textLabel);

  return 0
}

function cleanScreen(quadrants) {

  quadrants.forEach((quadrant) => {
    quadrant.innerHTML = '';

  })
}


function playerChoice(e, i, arrayX, arrayY, arrayBoard, activeX, player1, player2) {

  if (e.firstElementChild) return 1;

  let currentPlayer = activeX ? player1 : player2;

  let a = document.createElement('span');
  a.textContent = currentPlayer.symbol;
  e.appendChild(a);

  arrayBoard[i] = currentPlayer.symbol;
  currentPlayer == player1 ? arrayX.push(i): arrayY.push(i);

  result = gameStatusListener(arrayX, arrayY, arrayBoard);

  return result;
}

function resetDefault(result) {
       
  displayResult(result);
  arrayBoard = Array(9).fill();
  arrayX = [];
  arrayY = [];
  cleanScreen(gameBoard.quadrants);
  activeX = true; activeY = false;
  return 0;
}

function changeCurrentPlayer() {

  activeX = !activeX;
  activeY = !activeY;
}

function randint(rangeLen) {
  return Math.floor(Math.random() * rangeLen);

}


modeButtons.forEach((e) => {
  e.addEventListener('click', () => {
  initialScreen.classList.add('modal-close');
  if (e === machineButton) isMachine = true;
  
  })
})


const gameBoard = {
  quadrants: document.querySelectorAll('.game-table > div')

}

let arrayBoard = Array(9).fill();

let arrayX = [];
let arrayY = [];

let activeX = true;
let activeY = false;

const player1 = player('player1', '⨯', false)
const player2 = player('player2', '◯', false)

let result = 0;

gameBoard.quadrants.forEach((e, i) => {
  e.addEventListener('click', () => {
    if (!e.textContent) {

      result = playerChoice(e, i, arrayX, arrayY, arrayBoard, activeX, player1, player2);

      if (result) resetDefault(result);
      else changeCurrentPlayer();

      if ((!result) && (isMachine)) {
        do {indexRandom = randint(9)} while (arrayY.includes(indexRandom) || arrayX.includes(indexRandom)); 

        quadrantRandom = gameBoard.quadrants[indexRandom];
        sleep(300);
        result = playerChoice(quadrantRandom, indexRandom, arrayX, arrayY, arrayBoard, activeX, player1, player2);

        if (result) resetDefault(result);
        else changeCurrentPlayer();
      }
  }

  })
})
