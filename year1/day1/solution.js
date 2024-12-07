import { open } from 'node:fs/promises';

part2();

async function part1() {
  const file = await open("./input.txt");
  let output = 0;

  for await (const line of file.readLines()) {
    const numbers = line.toLowerCase().replaceAll(/[a-z]/g, "");
    if (numbers.length === 1) {
      output += Number.parseInt(numbers + numbers);
    } else {
      output += Number.parseInt(
        numbers.charAt(0) + numbers.charAt(numbers.length - 1)
      );
    }
  }

  console.log("Part 1 Result:", output);
  // 54601
}

const possibleNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const possibleNumbersAsWords = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

function getNumber(text) {
  const parsedNumber = possibleNumbersAsWords.indexOf(text);
  return parsedNumber !== -1 ? "" + parsedNumber : text;
}

function lastIndexOfOptions(searchString) {
  let indices = [];
  possibleNumbers.concat(possibleNumbersAsWords).forEach((element) => {
    const index = searchString.lastIndexOf(element);
    if (index !== -1) indices.push(index);
  });
  return Math.max(...indices);
}

function matchNumbers(string) {
  return string.matchAll(
    /[0-9]|zero|one|two|three|four|five|six|seven|eight|nine/g
  );
}

async function part2() {
  const file = await open("./input.txt");
  let output = 0;

  for await (const line of file.readLines()) {
    const firstNumber = getNumber([...matchNumbers(line)][0][0]);

    const lastNumber = getNumber(
      [
        ...matchNumbers(line.substring(lastIndexOfOptions(line), line.length)),
      ][0][0]
    );

    output += Number.parseInt(firstNumber + lastNumber);
  }

  console.log("Part 2 Result:", output);
}