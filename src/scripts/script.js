//objects
let GameLogic = (() => {})();

let GameBoard = (() => {
  let _count = 0;
  //game ends when count =9
  let _gameBoard = new Array(9);

  let gameBoard = document.querySelector(".game-board-container");

  let checkGameEnd = () => {
    if (_count === 8) {
      alert("game over");
      return;
    }
    _count++;
  };
  let generateGameBoard = () => {
    for (let i = 0; i < _gameBoard.length; i++) {
      let tile = document.createElement("div");
      //assign approprite class to tile
      tile.textContent = _gameBoard[i] ? _gameBoard[i].class : "";
      let tileClass = _gameBoard[i] ? _gameBoard[i].class : "unmarked";

      tile.classList.add("tile", tileClass);
      /// only add event listener if tile is unmarked
      if (tileClass === "unmarked") {
        tile.addEventListener(
          "click",
          function claimTileStart() {
            claimTile(i);
          },
          { once: true }
        );
      }
      //give tile an id
      tile.dataset.tileId = i;
      gameBoard.appendChild(tile);
    }
  };
  let claimTile = (id) => {
    let tiles = document.querySelectorAll(".tile");

    if (_count % 2 === 0) {
      _gameBoard[id] = { class: "X" };
    } else {
      _gameBoard[id] = { class: "O" };
    }

    updateDom();
  };
  let updateDom = () => {
    removeDom();
    generateGameBoard();
    checkGameEnd();
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
