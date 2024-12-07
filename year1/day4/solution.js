import { open } from "node:fs/promises";

part2();

async function part1() {
  const file = await open("./input.txt");

  let output = 0;

  for await (const line of file.readLines()) {
    const [left, right] = line.split("|");
    const winningNrs = left
      .split(":")[1]
      .split(" ")
      .filter((nr) => nr != "");
    const myNrs = right.split(" ").filter((nr) => nr != "");
    const amountWon = winningNrs.filter((nr) => myNrs.includes(nr)).length;

    if (amountWon > 0) {
      let points = 1;
      for (let i = 1; i < amountWon; i++) {
        points *= 2;
      }
      output += points;
    }
  }

  console.log("Part 1 Result:", output);
}

async function part2() {
  const file = await open("./input.txt");
  let originalLines = [];

  let output = 0;

  for await (const line of file.readLines()) {
    const [left, right] = line.split("|");
    const winningNrs = left
      .split(":")[1]
      .split(" ")
      .filter((nr) => nr != "");
    const myNrs = right.split(" ").filter((nr) => nr != "");

    originalLines.push({
      nr: Number.parseInt(left.substring(4, 8).trim()),
      amountWon: winningNrs.filter((nr) => myNrs.includes(nr)).length,
    });
  }

  function iterateLines(lines) {
    output += lines.length;
    let new_array = [];

    lines.forEach((line) => {
      // win any number of additional cards
      for (let i = 0; i < line.amountWon; i++) {
        if (line.nr + i <= originalLines.length)
          new_array.push(originalLines[line.nr + i]);
      }
    });

    if (new_array.length != 0) iterateLines(new_array);
  }

  iterateLines(originalLines);
  console.log("Part 2 Result:", output); // 6050769
}
  