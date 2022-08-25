//objects

let GameBoard = (() => {
  let _count = 0;
  //game ends when count =9
  let _gameBoard = new Array(9);

  let gameBoard = document.querySelector(".game-board-container");
  let generateGameBoard = () => {
    for (let i = 0; i < _gameBoard.length; i++) {
      let tile = document.createElement("div");
      tile.classList.add("tile", "unmarked");
      tile.textContent = _gameBoard[i];

      tile.addEventListener("click", () => {
        claimTile(i);
      });
      tile.dataset.tileId = i;
      gameBoard.appendChild(tile);
    }
  };
  let claimTile = (id) => {
    let tiles = document.querySelectorAll(".tiles");

    if (_count % 2 === 0) {
      _gameBoard[id] = "X";
      _count++;
    } else {
      _gameBoard[id] = "O";
      _count++;
    }
    //unbind event listener (implement)

    updateDom();
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

  let updateGameBoard = () => {
    // get list of tiles
    let tiles = document.querySelectorAll(".tiles");

    //when clicked assign x or o if count is odd or even to back end array

    // add class of x or o and remove unmarked class

    //refresh gameboard
  };

  return {
    generateGameBoard,
  };
})();

let Player = () => {
  //
  let _id;
  let _type;
};

//
GameBoard.generateGameBoard();
