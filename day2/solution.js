import { open } from "node:fs/promises";

part2();

async function part1() {
  const file = await open("./input.txt");
  let output = 0;

  for await (const line of file.readLines()) {
    const gameRecord = line.split(":");
    const gameId = gameRecord[0].substring(5, gameRecord[0].length);
    const sets = gameRecord[1].split(";");

    let possible = true;

    sets.forEach((set) => {
      let blueCubes = 0;
      let greenCubes = 0;
      let redCubes = 0;

      const cubes = set.split(",");
      cubes.forEach((cube) => {
        const [amount, name] = cube.trim().split(" ");
        switch (name.length) {
          case 3:
            redCubes += Number.parseInt(amount);
            break;
          case 4:
            blueCubes += Number.parseInt(amount);
            break;
          case 5:
            greenCubes += Number.parseInt(amount);
            break;
        }
      });

      if (blueCubes > 14 || greenCubes > 13 || redCubes > 12) possible = false;
    });

    if (possible) output += Number.parseInt(gameId);
  }

  console.log("Part 1 Result:", output);
  // 54601
}

async function part2() {
  const file = await open("./input.txt");
  let output = 0;

  for await (const line of file.readLines()) {
    const gameRecord = line.split(":");
    const gameId = gameRecord[0].substring(5, gameRecord[0].length);
    const sets = gameRecord[1].split(";");

    let blueCubes = [];
    let greenCubes = [];
    let redCubes = [];

    sets.forEach((set) => {
      const cubes = set.split(",");
      cubes.forEach((cube) => {
        const [amount, name] = cube.trim().split(" ");
        switch (name.length) {
          case 3:
            redCubes.push(Number.parseInt(amount));
            break;
          case 4:
            blueCubes.push(Number.parseInt(amount));
            break;
          case 5:
            greenCubes.push(Number.parseInt(amount));
            break;
        }
      });
    });

    const maxBlueCubes = Math.max(...blueCubes);
    const maxGreenCubes = Math.max(...greenCubes);
    const maxRedCubes = Math.max(...redCubes);

    output += maxBlueCubes * maxGreenCubes * maxRedCubes;
  }

  console.log("Part 1 Result:", output);
  // 54601
}
  