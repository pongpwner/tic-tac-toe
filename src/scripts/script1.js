//objects

let GameBoard = (() => {
  let _gameBoard = new Array(9);
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
  let setGameBoard = (id, input) => {
    _gameBoard[id] = input;
  };
  let getGameBoard = () => {
    return _gameBoard;
  };
  let resetGameBoard = () => {
    _gameBoard = new Array(9);
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

  return {
    generateGameBoard,
    _gameBoard,
    updateDom,
    removeDom,
    getGameBoard,
    resetGameBoard,
    setGameBoard,
  };
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
  let _gameOver = false;

  //sets tile to x or o upon click
  let claimTile = (id) => {
    //set gameboard
    GameBoard.setGameBoard(id, { class: _currentPlayer });
    //GameBoard._gameBoard[id] = { class: _currentPlayer };
    console.log("Current tile:" + GameBoard.getGameBoard()[id].class);
    console.log("current player" + _currentPlayer);
    setCurrentPlayer();

    //console.log(_turnCount);
    _turnCount++;

    GameBoard.updateDom();
    //game over checks
    if (!_gameOver) {
      checkHorizontal();
      checkVertical();
      checkDiagonal();
    }
    if (_turnCount === 9 && _gameOver === false) {
      gameEnd("tie");
    }
  };

  //get current player based on even odd turns
  let setCurrentPlayer = () => {
    if (_turnCount % 2 === 1) {
      _currentPlayer = "X";
    } else {
      _currentPlayer = "O";
    }
  };
  //starts game loop
  let start = () => {
    console.log(GameBoard.getGameBoard());
    let playerX = Player("X");
    let playerO = Player("O");
    GameBoard.generateGameBoard();
  };
  //game over checks

  let checkHorizontal = () => {
    //console.log(GameBoard.getGameBoard());
    //top row
    let tempArr = [];
    for (let i = 0; i < 3; i++) {
      console.log(GameBoard.getGameBoard()[i]);
      tempArr.push(
        GameBoard.getGameBoard()[i] ? GameBoard._gameBoard[i].class : "l"
      );
    }
    let flatString = tempArr.join("");
    if (flatString === "XXX") {
      gameEnd("X");
    }
    if (flatString === "OOO") {
      gameEnd("O");
    }
    tempArr = [];
    /// middle row
    for (let i = 3; i < 6; i++) {
      tempArr.push(
        GameBoard.getGameBoard()[i] ? GameBoard._gameBoard[i].class : "l"
      );
    }
    flatString = tempArr.join("");
    if (flatString === "XXX") {
      gameEnd("X");
    }
    if (flatString === "OOO") {
      gameEnd("O");
    }
    tempArr = [];
    //botttom row
    for (let i = 6; i < 9; i++) {
      tempArr.push(
        GameBoard.getGameBoard()[i] ? GameBoard._gameBoard[i].class : "l"
      );
    }
    flatString = tempArr.join("");
    if (flatString === "XXX") {
      gameEnd("X");
    }
    if (flatString === "OOO") {
      gameEnd("O");
    }
    tempArr = [];
    flatString = "";
  };

  let checkVertical = () => {
    //first column
    let tempArr = [];
    for (let i = 0; i < GameBoard._gameBoard.length; i += 3) {
      tempArr.push(
        GameBoard.getGameBoard()[i] ? GameBoard._gameBoard[i].class : "l"
      );
    }
    let flatString = tempArr.join("");
    if (flatString === "XXX") {
      gameEnd("X");
    }
    if (flatString === "OOO") {
      gameEnd("O");
    }
    tempArr = [];

    //second column
    tempArr = [];
    for (let i = 1; i < GameBoard._gameBoard.length; i += 3) {
      tempArr.push(
        GameBoard.getGameBoard()[i] ? GameBoard._gameBoard[i].class : "l"
      );
    }
    flatString = tempArr.join("");
    if (flatString === "XXX") {
      gameEnd("X");
    }
    if (flatString === "OOO") {
      gameEnd("O");
    }
    tempArr = [];

    //third column
    tempArr = [];
    for (let i = 2; i < GameBoard._gameBoard.length; i += 3) {
      tempArr.push(
        GameBoard.getGameBoard()[i] ? GameBoard._gameBoard[i].class : "l"
      );
    }
    flatString = tempArr.join("");
    if (flatString === "XXX") {
      gameEnd("X");
    }
    if (flatString === "OOO") {
      gameEnd("O");
    }
    tempArr = [];
    flatString = "";
  };

  let checkDiagonal = () => {
    // \direction
    let tempArr = [];
    for (let i = 0; i < GameBoard._gameBoard.length; i += 4) {
      tempArr.push(
        GameBoard.getGameBoard()[i] ? GameBoard._gameBoard[i].class : "l"
      );
    }
    let flatString = tempArr.join("");
    //onsole.log("diagonal" + flatString);
    if (flatString === "XXX") {
      gameEnd("X");
    }
    if (flatString === "OOO") {
      gameEnd("O");
    }
    tempArr = [];
    // /direction
    tempArr = [];
    for (let i = 2; i < 7; i += 2) {
      tempArr.push(
        GameBoard.getGameBoard()[i] ? GameBoard._gameBoard[i].class : "l"
      );
    }
    flatString = tempArr.join("");
    if (flatString === "XXX") {
      gameEnd("X");
    }
    if (flatString === "OOO") {
      gameEnd("O");
    }
    tempArr = [];
    flatString = "";
  };

  let gameEnd = (result) => {
    let body = document.querySelector("body");
    let resetGame = () => {
      _turnCount = 0;
      _currentPlayer = "X";
      GameBoard.resetGameBoard();
      console.log(GameBoard.getGameBoard());
      body.removeChild(gameEndContainer);
      GameBoard.updateDom();
      window.location.reload();
    };
    // container
    let gameEndContainer = document.createElement("div");
    gameEndContainer.classList.add("game-end-menu");
    //winner
    let winner = document.createElement("div");
    winner.classList.add("winner");
    if (result === "tie") {
      winner.textContent = `It's a ${result}!`;
      _gameOver = true;
    } else {
      winner.textContent = `${result} is the winner!`;
      _gameOver = true;
    }
    gameEndContainer.appendChild(winner);
    //reset button
    let resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.textContent = "reset button";
    resetButton.addEventListener("click", resetGame);
    gameEndContainer.appendChild(resetButton);
    //
    body.appendChild(gameEndContainer);
  };

  return { start, claimTile };
})();

//
GameLogic.start();
