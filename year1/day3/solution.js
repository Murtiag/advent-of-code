import { open } from "node:fs/promises";

part1();

async function part1() {
  const file = await open("./input.txt");
  let output = 0;
  let lines = [];

  for await (const line of file.readLines()) {
    lines.push(line);
  }

  lines.forEach((line, lineNr) => {
    const isFirstLine = lineNr === 0;
    const isLastLine = lineNr === lines.length - 1;

    let currentNumber = "";
    let currentNumberHasAdjacent = false;
    const chars = Array.from(line);

    chars.forEach((char, charIndex) => {
      // iterate chars of line
      if (char.search(/[0-9]/) !== -1) {
        // is number, add it
        currentNumber += char;

        if (charIndex != 0) {
          if (!isFirstLine) {
            // check top left
            if (Array.from(lines[lineNr - 1])[charIndex - 1] !== ".") {
              currentNumberHasAdjacent = true;
            }
          }
          // check left
          if (
            chars[charIndex - 1] !== "." &&
            chars[charIndex - 1].search(/[0-9]/) === -1
          ) {
            currentNumberHasAdjacent = true;
          }
          if (!isLastLine) {
            //check bottom left
            if (Array.from(lines[lineNr + 1])[charIndex - 1] !== ".") {
              currentNumberHasAdjacent = true;
            }
          }
        }
        if (!isFirstLine) {
          // check top
          if (Array.from(lines[lineNr - 1])[charIndex] !== ".") {
            currentNumberHasAdjacent = true;
          }
        }
        if (!isLastLine) {
          // check bottom
          if (Array.from(lines[lineNr + 1])[charIndex] !== ".") {
            currentNumberHasAdjacent = true;
          }
        }
        if (charIndex != chars.length - 1) {
          if (!isFirstLine) {
            // check top right
            if (Array.from(lines[lineNr - 1])[charIndex + 1] !== ".") {
              currentNumberHasAdjacent = true;
            }
          }
          // check right
          if (
            chars[charIndex + 1] !== "." &&
            chars[charIndex + 1].search(/[0-9]/) === -1
          ) {
            currentNumberHasAdjacent = true;
          }
          if (!isLastLine) {
            // check bottom right
            if (Array.from(lines[lineNr + 1])[charIndex + 1] !== ".") {
              currentNumberHasAdjacent = true;
            }
          }
        }
      } else if (currentNumber) {
        if (currentNumberHasAdjacent) {
          output += Number.parseInt(currentNumber);
        }

        currentNumber = "";
        currentNumberHasAdjacent = false;
      }
    });

    if (currentNumber && currentNumberHasAdjacent)
      output += Number.parseInt(currentNumber);
  });

  console.log("Part 1 Result:", output);
}
