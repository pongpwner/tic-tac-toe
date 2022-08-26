//objects

let GameBoard = (() => {
  const _gameBoard = new Array(9);
  let gameBoard = document.querySelector(".game-board-container");

  let generateGameBoard = () => {
    for (let i = 0; i < _gameBoard.length; i++) {
      let tile = document.createElement("div");
      //assign approprite class to tile
      tile.textContent = _gameBoard[i] ? _gameBoard[i].class : "";
      let tileClass = _gameBoard[i] ? _gameBoard[i].class : "unmarked";

      tile.classList.add("tile", tileClass);
      /// only add event listener if tile is unmarked
      if (tileClass === "unmarked") {
        tile.addEventListener("click", () => GameLogic.claimTile(i), {
          once: true,
        });
      }
      //give tile an id
      tile.dataset.tileId = i;
      gameBoard.appendChild(tile);
    }
  };

  let updateDom = () => {
    removeDom();
    generateGameBoard();
  };

  let removeDom = () => {
    while (gameBoard.firstChild) {
      gameBoard.removeChild(gameBoard.firstChild);
    }
  };

  return { generateGameBoard, _gameBoard, updateDom };
})();

let Player = (marker) => {
  //

  let mark = marker;

  return {
    mark,
  };
};

let GameLogic = (() => {
  let _turnCount = 0;
  let _currentPlayer = "X";

  //sets tile to x or o upon click
  let claimTile = (id) => {
    GameBoard._gameBoard[id] = { class: _currentPlayer };
    setCurrentPlayer();
    console.log(_currentPlayer);
    _turnCount++;
    GameBoard.updateDom();
  };

  //get current player based on even odd turns
  let setCurrentPlayer = () => {
    console.log(_turnCount % 2);
    if (_turnCount % 2 === 1) {
      _currentPlayer = "X";
    } else {
      _currentPlayer = "O";
    }
  };
  //starts game loop
  let start = () => {
    let playerX = Player("X");
    let playerO = Player("O");
    GameBoard.generateGameBoard();
  };
  return { start, claimTile };
})();

//
GameLogic.start();
