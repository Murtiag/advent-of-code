import { open } from "node:fs/promises";

async function solution() {
  const file = await open("./input.txt");

  var count = 0;

  for await (const line of file.readLines()) {
    const levels = line.split(" ").map((value) => parseInt(value));

    var isReportSafe = false;
    var isDecreasing = false;
    var isIncreasing = false;

    for (var i = 1; i < levels.length - 1; i++) {
      const differenceLeft = Math.abs(levels[i - 1] - levels[i]);

      const differenceRight = Math.abs(levels[i + 1] - levels[i]);

      if (
        differenceLeft > 0 &&
        differenceLeft < 4 &&
        differenceRight > 0 &&
        differenceRight < 4
      ) {
        if (!isIncreasing && !isDecreasing) {
          if (levels[0] < levels[1]) {
            isIncreasing = true;
          } else if (levels[0] > levels[1]) {
            isDecreasing = true;
          }
        } else {
          if (isIncreasing) {
            if (levels[i - 1] < levels[i] && levels[i] < levels[i + 1]) {
              isReportSafe = true;
            } else {
              isReportSafe = false;
              break;
            }
          } else {
            if (levels[i - 1] > levels[i] && levels[i] > levels[i + 1]) {
              isReportSafe = true;
            } else {
              isReportSafe = false;
              break;
            }
          }
        }
      } else {
        isReportSafe = false;
        break;
      }
    }

    if (isReportSafe) {
      count += 1;
    }
  }

  console.log(count);
}

solution();
