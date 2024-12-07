import { open } from "node:fs/promises";

async function solution() {
  // create word matrix
  const file = await open("./input.txt");
  let wordMatrix = [];

  for await (const line of file.readLines()) {
    wordMatrix.push(line.split(""));
  }

  let occurences = 0;

  // Array bounds checks
  const checkXNeg = (posX) => posX - 3 >= 0;
  const checkXPos = (posX, posY) => posX + 3 <= wordMatrix[posY].length - 1;
  const checkXPosYNeg = (posX, posY) =>
    posX + 3 <= wordMatrix[posY - 3].length - 1;
  const checkXposYPos = (posX, posY) =>
    posX + 3 <= wordMatrix[posY + 3].length - 1;
  const checkYPos = (posY) => posY + 3 <= wordMatrix.length - 1;
  const checkYNeg = (posY) => posY - 3 >= 0;

  // Letter checks
  const checkLetter = (posY, posX, letter) => wordMatrix[posY][posX] === letter;
  const checkLetterM = (posY, posX) => checkLetter(posY, posX, "M");
  const checkLetterA = (posY, posX) => checkLetter(posY, posX, "A");
  const checkLetterS = (posY, posX) => checkLetter(posY, posX, "S");

  // Occurence checks
  function checkNorth(posX, posY) {
    if (checkYNeg(posY)) {
      if (
        checkLetterM(posY - 1, posX) &&
        checkLetterA(posY - 2, posX) &&
        checkLetterS(posY - 3, posX)
      ) {
        occurences += 1;
      }
    }
  }

  function checkNorthEast(posX, posY) {
    if (checkYNeg(posY) && checkXPosYNeg(posX, posY)) {
      if (
        checkLetterM(posY - 1, posX + 1) &&
        checkLetterA(posY - 2, posX + 2) &&
        checkLetterS(posY - 3, posX + 3)
      ) {
        occurences += 1;
      }
    }
  }

  function checkEast(posX, posY) {
    if (checkXPos(posX, posY)) {
      if (
        checkLetterM(posY, posX + 1) &&
        checkLetterA(posY, posX + 2) &&
        checkLetterS(posY, posX + 3)
      ) {
        occurences += 1;
      }
    }
  }

  function checkSouthEast(posX, posY) {
    if (checkYPos(posY) && checkXposYPos(posX, posY)) {
      if (
        checkLetterM(posY + 1, posX + 1) &&
        checkLetterA(posY + 2, posX + 2) &&
        checkLetterS(posY + 3, posX + 3)
      ) {
        occurences += 1;
      }
    }
  }

  function checkSouth(posX, posY) {
    if (checkYPos(posY)) {
      if (
        checkLetterM(posY + 1, posX) &&
        checkLetterA(posY + 2, posX) &&
        checkLetterS(posY + 3, posX)
      ) {
        occurences += 1;
      }
    }
  }

  function checkSouthWest(posX, posY) {
    if (checkYPos(posY) && checkXNeg(posX)) {
      if (
        checkLetterM(posY + 1, posX - 1) &&
        checkLetterA(posY + 2, posX - 2) &&
        checkLetterS(posY + 3, posX - 3)
      ) {
        occurences += 1;
      }
    }
  }

  function checkWest(posX, posY) {
    if (checkXNeg(posX)) {
      if (
        checkLetterM(posY, posX - 1) &&
        checkLetterA(posY, posX - 2) &&
        checkLetterS(posY, posX - 3)
      ) {
        occurences += 1;
      }
    }
  }

  function checkNorthWest(posX, posY) {
    if (checkYNeg(posY) && checkXNeg(posX)) {
      if (
        checkLetterM(posY - 1, posX - 1) &&
        checkLetterA(posY - 2, posX - 2) &&
        checkLetterS(posY - 3, posX - 3)
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
