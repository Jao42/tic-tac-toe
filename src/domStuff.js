function createGameTable(gameTableDiv) {
  let quadrant;

  for(let i = 1; i <= 9; i++) {
    quadrant = document.createElement('div');
    gameTableDiv.appendChild(quadrant);
  }
  gameTableDiv.style.backgroundColor = '#000';
}

function createEndGameModal(body) {
  let modalDiv = document.createElement('div');
  modalDiv.classList.add('modal');
  modalDiv.classList.add('end-game-modal');

  let contentModalDiv = document.createElement('div');
  contentModalDiv.classList.add('modal-content');

  let titleModalDiv = document.createElement('div');
  titleModalDiv.classList.add('modal-title');
  titleModalDiv.classList.add('end-game-title');

  let buttonsModalDiv = document.createElement('div');
  buttonsModalDiv.classList.add('modal-buttons');
  buttonsModalDiv.classList.add('end-game-buttons');


  let buttonModal = document.createElement('div');
  buttonModal.classList.add('modal-button');
  buttonModal.textContent = 'Continue';

  contentModalDiv.appendChild(titleModalDiv);
  buttonsModalDiv.appendChild(buttonModal);
  contentModalDiv.appendChild(titleModalDiv);
  contentModalDiv.appendChild(buttonsModalDiv);
  modalDiv.appendChild(contentModalDiv);

  modalDiv.style.opacity = 0;
  body.appendChild(modalDiv);
  window.getComputedStyle(modalDiv).opacity;

}

function displayResult(result, endGameModal, endGameTitle) {

  endGameModal.style.opacity = 1;
  endGameModal.style.visibility = 'visible';
  endGameTitle.innerHTML = `<h1>${result}</h1>`;
  return 0;
}

function cleanScreen(quadrants) {

  quadrants.forEach((quadrant) => {
    quadrant.innerHTML = '';

  })
}

export { createGameTable, createEndGameModal, displayResult, cleanScreen };
