const body = document.querySelector('body');
const gameTable = document.querySelector('.game-table');
const initialScreen = document.querySelector('.initial-screen');
const results = document.querySelector('.results');
const humanButton = document.querySelector('.human-button')
const machineButton = document.querySelector('.machine-button')
const modeButtons = [humanButton, machineButton];
let isMachineGame;

import gameStatusListener from './gameStatus.js'
import { createGameTable, createEndGameModal, displayResult, cleanScreen } from './domStuff'


function player(name, symbol, machine) {

  return { name, symbol, machine };

}

function playerChoice(obj) {
  if (obj.quadrante.firstElementChild) return 1;

  let currentPlayer = obj.activeX ? obj.player1 : obj.player2;

  let a = document.createElement('span');
  a.textContent = currentPlayer.symbol;
  obj.quadrante.appendChild(a);
  
  let arrayBoard = [...(obj.arrayBoard)]
  let arrayX = [...(obj.arrayX)]
  let arrayY = [...(obj.arrayY)]

  arrayBoard[obj.index] = currentPlayer.symbol;
  currentPlayer == obj.player1 ? arrayX.push(obj.index): arrayY.push(obj.index);

  return [arrayX, arrayY, arrayBoard]
}

function resetDefault(result, endGameModal) {
       
  displayResult(result, endGameModal, endGameTitle);
  obj.arrayBoard = Array(9).fill();
  obj.arrayX = [];
  obj.arrayY = [];
  obj.activeX = true;
  return 0;
}

function changeCurrentPlayer() {

  activeX = !activeX;
  activeY = !activeY;
}

function randint(rangeLen) {
  return Math.floor(Math.random() * rangeLen);

}


createGameTable(gameTable)
modeButtons.forEach((e) => {
  e.addEventListener('click', () => {
  initialScreen.classList.add('modal-close');
  if (e === machineButton) isMachineGame = true;
  
  })
})


const gameBoard = {
  quadrants: document.querySelectorAll('.game-table > div')

}

let result = 0;

createEndGameModal(body);
const endGameTitle = document.querySelector('.end-game-title');
const endGameModal = document.querySelector('.end-game-modal');
const endGameButton = document.querySelector('.end-game-buttons > div');

endGameButton.addEventListener('click', () => {
  
  endGameModal.style.cssText = 'opacity: 0; visibility: hidden;';
  cleanScreen(gameBoard.quadrants);

})

let obj = {
  quadrante: '',
  index: '',
  arrayX: [],
  arrayY: [],
  arrayBoard: Array(9).fill(),
  activeX: true,
  player1: player('player1', '⨯', false),
  player2: player('player2', '◯', false)
}

let play;
let indexRandom;
let quadrantRandom;

gameBoard.quadrants.forEach((e, i) => {
  e.addEventListener('click', () => {
    if (!e.textContent) {
      obj.quadrante = e
      obj.index = i
      play = playerChoice(obj);
      obj.arrayX = play[0];
      obj.arrayY = play[1];
      obj.arrayBoard = play[2];
      result = gameStatusListener(obj.arrayX, obj.arrayY, obj.arrayBoard);

      if (result) resetDefault(result, endGameModal)
      else
        obj.activeX = !(obj.activeX);
      if ((!result) && (isMachineGame)) {
        do {
          indexRandom = randint(9)
        } while (obj.arrayY.includes(indexRandom)
          || obj.arrayX.includes(indexRandom)); 

        quadrantRandom = gameBoard.quadrants[indexRandom];
        obj.quadrante = quadrantRandom
        obj.index = indexRandom

        play = playerChoice(obj);
        obj.arrayX = play[0];
        obj.arrayY = play[1];
        obj.arrayBoard = play[2];

        result = gameStatusListener(obj.arrayX, obj.arrayY, obj.arrayBoard);

        if (result) resetDefault(result, endGameModal);
        else 
          obj.activeX = !(obj.activeX);
      }
    }
  })
})
