import { open } from 'node:fs/promises';

part1();

async function part1() {
  const file = await open('./input1.txt');
  let output = 0;

  for await (const line of file.readLines()) {
    const numbers = line.toLowerCase().replaceAll(/[a-z]/g, '');
    if (numbers.length === 1) {
      output += Number.parseInt(numbers + numbers);
    } else {
      output += Number.parseInt(
        numbers.charAt(0) + numbers.charAt(numbers.length - 1)
      );
    }
  }

  console.log(output);
}

// 54601
