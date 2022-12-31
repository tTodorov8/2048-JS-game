document.addEventListener("DOMContentLoaded", () => {
  const gridWrapper = document.querySelector(".grid-wrapper");
  const scoreDisplay = document.querySelector("#score");
  const resultDisplay = document.querySelector("#result");
  const bestScoreDisplay = document.querySelector("#best-score");
  const newGameButton = document.querySelector("#new-game");

  let bestScore = JSON.parse(localStorage.getItem("bestScore"));
  const width = 4;
  let squaresArray = [];
  let score = 0;

  function createGridBoard() {
    for (let i = 0; i < width * width; i++) {
      let gridBox = document.createElement("div");
      gridBox.innerHTML = 0;
      gridWrapper.append(gridBox);
      squaresArray.push(gridBox);
    }
    generateRandomNumber();
    generateRandomNumber();
    checkForZeros();
  }
  createGridBoard();

  // generate a number
  function generateRandomNumber() {
    let randomNumber = Math.floor(Math.random() * squaresArray.length);
    if (squaresArray[randomNumber].innerHTML == 0) {
      squaresArray[randomNumber].innerHTML = 2;
      checkForLoose();
    } else {
      generateRandomNumber();
    }
  }
  // Swipe right
  function moveRight() {
    for (let i = 0; i < width * width; i++) {
      if (i % width === 0) {
        let totalOne = squaresArray[i].innerHTML;
        let totalTwo = squaresArray[i + 1].innerHTML;
        let totalThree = squaresArray[i + 2].innerHTML;
        let totalFour = squaresArray[i + 3].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];
        let filteredRow = row.filter((num) => num);
        let missing = width - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = zeros.concat(filteredRow);

        squaresArray[i].innerHTML = newRow[0];
        squaresArray[i + 1].innerHTML = newRow[1];
        squaresArray[i + 2].innerHTML = newRow[2];
        squaresArray[i + 3].innerHTML = newRow[3];
      }
    }
  }

  // Swipe left
  function moveLeft() {
    for (let i = 0; i < width * width; i++) {
      if (i % width === 0) {
        let totalOne = squaresArray[i].innerHTML;
        let totalTwo = squaresArray[i + 1].innerHTML;
        let totalThree = squaresArray[i + 2].innerHTML;
        let totalFour = squaresArray[i + 3].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];
        let filteredRow = row.filter((num) => num);
        let missing = width - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = filteredRow.concat(zeros);

        squaresArray[i].innerHTML = newRow[0];
        squaresArray[i + 1].innerHTML = newRow[1];
        squaresArray[i + 2].innerHTML = newRow[2];
        squaresArray[i + 3].innerHTML = newRow[3];
      }
    }
  }
  // Swipe down
  function moveDown() {
    for (let i = 0; i < width; i++) {
      let totalOne = squaresArray[i].innerHTML;
      let totalTwo = squaresArray[i + width].innerHTML;
      let totalThree = squaresArray[i + width * 2].innerHTML;
      let totalFour = squaresArray[i + width * 3].innerHTML;
      let column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];
      let filteredColumn = column.filter((num) => num);
      let missing = width - filteredColumn.length;
      let zeros = Array(missing).fill(0);
      let newColumn = zeros.concat(filteredColumn);

      squaresArray[i].innerHTML = newColumn[0];
      squaresArray[i + width].innerHTML = newColumn[1];
      squaresArray[i + width * 2].innerHTML = newColumn[2];
      squaresArray[i + width * 3].innerHTML = newColumn[3];
    }
  }
  //Swipe Up
  function moveUp() {
    for (let i = 0; i < width; i++) {
      let totalOne = squaresArray[i].innerHTML;
      let totalTwo = squaresArray[i + width].innerHTML;
      let totalThree = squaresArray[i + width * 2].innerHTML;
      let totalFour = squaresArray[i + width * 3].innerHTML;
      let column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];
      let filteredColumn = column.filter((num) => num);
      let missing = width - filteredColumn.length;
      let zeros = Array(missing).fill(0);
      let newColumn = filteredColumn.concat(zeros);

      squaresArray[i].innerHTML = newColumn[0];
      squaresArray[i + width].innerHTML = newColumn[1];
      squaresArray[i + width * 2].innerHTML = newColumn[2];
      squaresArray[i + width * 3].innerHTML = newColumn[3];
    }
  }

  // Combining rows
  function combineRow() {
    for (let i = 0; i < width * width - 1; i++) {
      if (squaresArray[i].innerHTML === squaresArray[i + 1].innerHTML) {
        let combinedTotal =
          parseInt(squaresArray[i].innerHTML) +
          parseInt(squaresArray[i + 1].innerHTML);
        squaresArray[i].innerHTML = combinedTotal;
        squaresArray[i + 1].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
        if (score > bestScore) {
          bestScore = score;
        }
      }
    }
    checkForWin();
  }
  // Combining columns
  function combineColumn() {
    for (let i = 0; i < width * width - width; i++) {
      if (squaresArray[i].innerHTML === squaresArray[i + width].innerHTML) {
        let combinedTotal =
          parseInt(squaresArray[i].innerHTML) +
          parseInt(squaresArray[i + width].innerHTML);
        squaresArray[i].innerHTML = combinedTotal;
        squaresArray[i + width].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
        if (score > bestScore) {
          bestScore = score;
        }
      }
    }
    checkForWin();
  }

  // Assign keycodes
  function control(e) {
    if (e.code == "KeyD") {
      keyRight();
    } else if (e.code == "KeyA") {
      keyLeft();
    } else if (e.code == "KeyS") {
      keyDown();
    } else if (e.code == "KeyW") {
      keyUp();
    }

    checkForZeros();
    addColours();
    bestScoreDisplay.innerHTML = bestScore;
    localStorage.setItem("bestScore", bestScore);
  }
  document.addEventListener("keyup", control);

  function keyRight() {
    moveRight();
    combineRow();
    moveRight();
    generateRandomNumber();
  }

  function keyLeft() {
    moveLeft();
    combineRow();
    moveLeft();
    generateRandomNumber();
  }

  function keyDown() {
    moveDown();
    combineColumn();
    moveDown();
    generateRandomNumber();
  }

  function keyUp() {
    moveUp();
    combineColumn();
    moveUp();
    generateRandomNumber();
  }
  //check for the number 2048 for winning the game
  function checkForWin() {
    if (scoreDisplay.innerHTML == 2048) {
      resultDisplay.innerHTML = "You win!";
      document.removeEventListener("keyup", control);
    }
  }

  //check if no zeros and loosing the game
  function checkForLoose() {
    let zeros = 0;
    for (let i = 0; i < squaresArray.length; i++) {
      if (squaresArray[i].innerHTML == 0) {
        zeros++;
      }
    }
    if (zeros === 0) {
      resultDisplay.innerHTML = "You lose!";
      document.removeEventListener("keyup", control);
    }
  }
  // check if there are zeros, to remove them and make an empty box
  function checkForZeros() {
    for (let i = 0; i < squaresArray.length; i++) {
      if (squaresArray[i].innerHTML == 0) {
        squaresArray[i].innerHTML = "";
      }
    }
  }
  //adding colours to the squares

  function addColours() {
    for (let i = 0; i < squaresArray.length; i++) {
      if (squaresArray[i].innerHTML == 0)
        squaresArray[i].style.backgroundColor = "rgba(205, 193, 180)";
      else if (squaresArray[i].innerHTML == 2)
        squaresArray[i].style.backgroundColor = "rgba(238, 228, 218)";
      else if (squaresArray[i].innerHTML == 4)
        squaresArray[i].style.backgroundColor = "rgba(238, 225, 201)";
      else if (squaresArray[i].innerHTML == 8)
        squaresArray[i].style.backgroundColor = "rgba(243, 178, 122)";
      else if (squaresArray[i].innerHTML == 16)
        squaresArray[i].style.backgroundColor = "rgba(246, 150, 100)";
      else if (squaresArray[i].innerHTML == 32)
        squaresArray[i].style.backgroundColor = "rgba(247, 124,  95)";
      else if (squaresArray[i].innerHTML == 64)
        squaresArray[i].style.backgroundColor = "rgba(247,  95,  59)";
      else if (squaresArray[i].innerHTML == 128)
        squaresArray[i].style.backgroundColor = "rgba(237, 208, 115)";
      else if (squaresArray[i].innerHTML == 256)
        squaresArray[i].style.backgroundColor = "rgba(237, 204,  98)";
      else if (squaresArray[i].innerHTML == 512)
        squaresArray[i].style.backgroundColor = "rgba(237, 201,  80)";
      else if (squaresArray[i].innerHTML == 1024)
        squaresArray[i].style.backgroundColor = "rgba(237, 197,  63)";
      else if (squaresArray[i].innerHTML == 2048)
        squaresArray[i].style.backgroundColor = "rgba(237, 194,  46)";
      if (squaresArray[i].innerHTML >= 8) {
        squaresArray[i].style.color = "rgba(249, 246, 242)";
      } else {
        squaresArray[i].style.color = "rgba(119, 110, 101)";
      }
    }
  }
  addColours();

  // function newGame() {
  //   gridWrapper.innerHTML = "";
  //   generateRandomNumber();
  //   createGridBoard();
  //   score = 0;

  //   addColours();
  // }
  // newGameButton.addEventListener("click", newGame);
});
