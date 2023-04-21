function isWinner(playerArray) {
  const winnerPositions = [
      [0, 1, 2], [0, 3, 6],
      [0, 4, 8], [1, 4, 7],
      [2, 4, 6], [2, 5, 8],
      [3, 4, 5], [6, 7, 8]
  ];

  return winnerPositions.some((winnerPosition) => winnerPosition.every((i) => playerArray.includes(i)));

}

function gameStatusListener(arrayX, arrayY, arrayBoard) {

  if (isWinner(arrayX)){
    return 'X ganhou!';
  }
  else if (isWinner(arrayY)){
    return 'O ganhou!';
  }

  else if (arrayBoard.every(Boolean)) {return 'A tie!';}

  else return 0;

}

export default gameStatusListener;
