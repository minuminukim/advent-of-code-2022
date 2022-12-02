import fs from 'fs';

function parseInput(filePath) {
  return fs
    .readFileSync(filePath, { encoding: 'utf-8' })
    .trim()
    .split('\n')
    .map(pair => pair.split(' '));
}

const lines = parseInput('./input.txt');
// console.log({ lines });
const points = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3,
};

const [left, right] = lines.reduce(
  (sums, [l, r]) => {
    sums[0] += points[l];
    sums[1] += points[r];
    return sums;
  },
  [0, 0]
);

// console.log({ left, right });

const [winPointsLeft, winPointsRight] = lines.reduce(
  (sums, [l, r]) => {
    let [left, right] = sums;
    switch (l) {
      case 'A':
        if (r === 'X') {
          left += 3;
          right += 3;
        } else if (r === 'Y') {
          left += 0;
          right += 6;
        } else if (r === 'Z') {
          left += 6;
          right += 0;
        }
        break;
      case 'B':
        if (r === 'X') {
          left += 6;
          right += 0;
        } else if (r === 'Y') {
          left += 3;
          right += 3;
        } else {
          left += 0;
          right += 6;
        }
        break;
      case 'C':
        if (r === 'X') {
          left += 0;
          right += 6;
        } else if (r === 'Y') {
          left += 6;
          right += 0;
        } else {
          left += 3;
          right += 3;
        }
        break;
      default:
        break;
    }
    return [left, right];
  },
  [0, 0]
);

// console.log({ winPointsLeft, winPointsRight });

const leftTotal = left + winPointsLeft;
const rightTotal = right + winPointsRight;
// console.log({ rightTotal }); // 13682

// problem2
let sum = 0;
for (const [l, r] of lines) {
  switch (r) {
    // lose
    case 'X':
      switch (l) {
        case 'A':
          sum += 0 + 3;
          break;
        case 'B':
          sum += 0 + 1;
          break;
        case 'C':
          sum += 0 + 2;
          break;
      }
      break;
    case 'Y':
      switch (l) {
        case 'A':
          sum += 3 + 1;
          break;
        case 'B':
          sum += 3 + 2;
          break;
        case 'C':
          sum += 3 + 3;
          break;
      }
      break;
    case 'Z':
      switch (l) {
        case 'A':
          sum += 6 + 2;
          break;
        case 'B':
          sum += 6 + 3;
          break;
        case 'C':
          sum += 6 + 1;
          break;
      }
      break;
  }
}
console.log({ sum }); // 12881
