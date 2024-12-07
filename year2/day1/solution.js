import { open } from "node:fs/promises";

async function solution() {
  const file = await open("./input.txt");
  const rightList = [];
  const leftList = [];

  var totalDistance = 0;

  for await (const line of file.readLines()) {
    const splittedLine = line.split("   ");

    leftList.push(splittedLine[0]);
    rightList.push(splittedLine[1]);
  }

  rightList.sort((a, b) => a - b);
  leftList.sort((a, b) => a - b);

  for (var i = 0; i < rightList.length; i++) {
    totalDistance += Math.abs(leftList[i] - rightList[i]);

    console.log(Math.abs(leftList[i] - rightList[i]));
  }

  console.log(totalDistance);
}

solution();
