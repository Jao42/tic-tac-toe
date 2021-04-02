const body = document.querySelector('body');
const gameTable = document.querySelector('.game-table');

function createGameTable() {
  let quadrant;

  for(let i = 1; i <= 9; i++) {
    quadrant = document.createElement('div');
    gameTable.appendChild(quadrant);
  }
}
createGameTable()

function player(name, symbol) {

  return { name, symbol }

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
  else if (arrayBoard.every(Boolean)) {
    return 'A tie!';
  }
  else return 0;

}

const gameBoard = {
  quadrants: document.querySelectorAll('.game-table > div')

}
arrayBoard = Array(9).fill();
let arrayX = [];
let arrayY = [];

player = {one: 'x', two: 'o'};

let activeX = true;
let activeY = false;

let result = 0;
gameBoard.quadrants.forEach((e, i) => {

  e.addEventListener('click', () => {
    currentPlayer = activeX ? player.one: player.two;
    if (!e.firstElementChild) {
      a = document.createElement('span');
      a.textContent = currentPlayer;
      e.appendChild(a);
      arrayBoard[i] = currentPlayer;
      currentPlayer == player.one ? arrayX.push(i): arrayY.push(i);
      activeX = !activeX;
      activeY = !activeY;
      result = gameStatusListener(arrayX, arrayY, arrayBoard);
    }
    result ? setTimeout(() => {alert(result)}, 1): ''
  })
})
