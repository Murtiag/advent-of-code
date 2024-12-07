import { open } from "node:fs/promises";

async function solution() {
  const file = await open("./input.txt");
  let rawInstructions = "";
  for await (const line of file.readLines()) {
    rawInstructions = line;
  }

  const foundInstructions = rawInstructions.matchAll(
    "(mul\\([0-9]+[,][0-9]+\\))"
  );

  let totalCount = 0;

  for (const match of foundInstructions) {
    const numbers = match[0].replace("mul(", "").replace(")", "").split(",");

    totalCount += parseInt(numbers[0]) * parseInt(numbers[1]);
  }

  console.log(totalCount);
}

solution();
