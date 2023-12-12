import { open } from "node:fs/promises";

part1();

async function part1() {
  const file = await open("./input.txt");

  let output = 0;

  for await (const line of file.readLines()) {
    console.log("=========================");
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
