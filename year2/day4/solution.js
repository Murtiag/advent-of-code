import { open } from "node:fs/promises";

async function solution() {
  // create word matrix
  const file = await open("./input.txt");
  let wordMatrix = [];

  for await (const line of file.readLines()) {
    wordMatrix.push(line.split(""));
  }

  // find XMAS occurences
  let occurences = 0;

  function checkNorth(posX, posY) {
    if (posY - 3 >= 0) {
      if (
        wordMatrix[posY - 1][posX] === "M" &&
        wordMatrix[posY - 2][posX] === "A" &&
        wordMatrix[posY - 3][posX] === "S"
      ) {
        occurences += 1;
      }
    }
  }

  function checkNorthEast(posX, posY) {
    if (posY - 3 >= 0 && posX + 3 <= wordMatrix[posY - 3].length - 1) {
      if (
        wordMatrix[posY - 1][posX + 1] === "M" &&
        wordMatrix[posY - 2][posX + 2] === "A" &&
        wordMatrix[posY - 3][posX + 3] === "S"
      ) {
        occurences += 1;
      }
    }
  }

  function checkEast(posX, posY) {
    if (posX + 3 <= wordMatrix[posY].length - 1) {
      if (
        wordMatrix[posY][posX + 1] === "M" &&
        wordMatrix[posY][posX + 2] === "A" &&
        wordMatrix[posY][posX + 3] === "S"
      ) {
        occurences += 1;
      }
    }
  }

  function checkSouthEast(posX, posY) {
    if (
      posY + 3 <= wordMatrix.length - 1 &&
      posX + 3 <= wordMatrix[posY + 3].length - 1
    ) {
      if (
        wordMatrix[posY + 1][posX + 1] === "M" &&
        wordMatrix[posY + 2][posX + 2] === "A" &&
        wordMatrix[posY + 3][posX + 3] === "S"
      ) {
        occurences += 1;
      }
    }
  }

  function checkSouth(posX, posY) {
    if (posY + 3 <= wordMatrix.length - 1) {
      if (
        wordMatrix[posY + 1][posX] === "M" &&
        wordMatrix[posY + 2][posX] === "A" &&
        wordMatrix[posY + 3][posX] === "S"
      ) {
        occurences += 1;
      }
    }
  }

  function checkSouthWest(posX, posY) {
    if (posY + 3 <= wordMatrix.length - 1 && posX - 3 >= 0) {
      if (
        wordMatrix[posY + 1][posX - 1] === "M" &&
        wordMatrix[posY + 2][posX - 2] === "A" &&
        wordMatrix[posY + 3][posX - 3] === "S"
      ) {
        occurences += 1;
      }
    }
  }

  function checkWest(posX, posY) {
    if (posX - 3 >= 0) {
      if (
        wordMatrix[posY][posX - 1] === "M" &&
        wordMatrix[posY][posX - 2] === "A" &&
        wordMatrix[posY][posX - 3] === "S"
      ) {
        occurences += 1;
      }
    }
  }

  function checkNorthWest(posX, posY) {
    if (posY - 3 >= 0 && posX - 3 >= 0) {
      if (
        wordMatrix[posY - 1][posX - 1] === "M" &&
        wordMatrix[posY - 2][posX - 2] === "A" &&
        wordMatrix[posY - 3][posX - 3] === "S"
      ) {
        occurences += 1;
      }
    }
  }

  for (let y = 0; y < wordMatrix.length; y++) {
    for (let x = 0; x < wordMatrix[y].length; x++) {
      if (wordMatrix[y][x] === "X") {
        checkNorth(x, y);
        checkNorthEast(x, y);
        checkEast(x, y);
        checkSouthEast(x, y);
        checkSouth(x, y);
        checkSouthWest(x, y);
        checkWest(x, y);
        checkNorthWest(x, y);
      }
    }
  }

  console.log(occurences);
  // Correct: 2336
}

solution();
