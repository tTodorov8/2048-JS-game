document.addEventListener("DOMContentLoaded", () => {
  const gridWrapper = document.querySelector(".grid-wrapper");
  const scoreDisplay = document.querySelector(".score");
  const resultDisplay = document.querySelector("#result");
  const width = 4;
  let squaresArray = [];

  function createGridBoard() {
    for (let i = 0; i < width * width; i++) {
      let gridBox = document.createElement("div");
      gridBox.innerHTML = 0;
      gridWrapper.append(gridBox);
      squaresArray.push(gridBox);
    }
    generateRandomNumber();
    generateRandomNumber();
  }
  createGridBoard();

  // generate a number
  function generateRandomNumber() {
    let randomNumber = Math.floor(Math.random() * squaresArray.length);
    if (squaresArray[randomNumber].innerHTML == 0) {
      squaresArray[randomNumber].innerHTML = 2;
    } else {
      generateRandomNumber();
    }
  }
  // swipe right
  function moveRight() {
    for (let i = 0; i < width * width; i++) {
      if (i % 4 === 0) {
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

  // swipe left
  function moveLeft() {
    for (let i = 0; i < width * width; i++) {
      if (i % 4 === 0) {
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
  // swipe down
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
      console.log(newColumn);

      squaresArray[i].innerHTML = newColumn[0];
      squaresArray[i + width].innerHTML = newColumn[1];
      squaresArray[i + width * 2].innerHTML = newColumn[2];
      squaresArray[i + width * 3].innerHTML = newColumn[3];
    }
  }
  //swipe Up
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
      console.log(newColumn);

      squaresArray[i].innerHTML = newColumn[0];
      squaresArray[i + width].innerHTML = newColumn[1];
      squaresArray[i + width * 2].innerHTML = newColumn[2];
      squaresArray[i + width * 3].innerHTML = newColumn[3];
    }
  }

  // combining rows
  function combineRow() {
    for (let i = 0; i < width * width - 1; i++) {
      if (squaresArray[i].innerHTML === squaresArray[i + 1].innerHTML) {
        let combinedTotal =
          parseInt(squaresArray[i].innerHTML) +
          parseInt(squaresArray[i + 1].innerHTML);
        squaresArray[i].innerHTML = combinedTotal;
        squaresArray[i + 1].innerHTML = 0;
      }
    }
  }
  // combining columns
  function combineColumn() {
    for (let i = 0; i < width * width - width; i++) {
      if (squaresArray[i].innerHTML === squaresArray[i + width].innerHTML) {
        let combinedTotal =
          parseInt(squaresArray[i].innerHTML) +
          parseInt(squaresArray[i + width].innerHTML);
        squaresArray[i].innerHTML = combinedTotal;
        squaresArray[i + width].innerHTML = 0;
      }
    }
  }

  // assign keykodes

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
  }

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

  document.addEventListener("keyup", control);
});
