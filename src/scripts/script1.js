//objects
let GameLogic = (() => {})();

let GameBoard = (() => {
  let _gameBoard = new Array(9);
})();

let Player = (mark) => {
  //
  let mark = mark;
  return {
    mark,
  };
};

//
GameBoard.generateGameBoard();
