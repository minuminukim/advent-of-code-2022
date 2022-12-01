import fs from 'fs';

function parseInput(filePath) {
  return fs
    .readFileSync(filePath, { encoding: 'utf8' })
    .split('\n\n')
    .map(block => block.split('\n').map(Number));
}

function solveA(lines) {
  return lines.reduce(
    (bestSum, line) =>
      Math.max(
        bestSum,
        line.reduce((sum, current) => sum + current, 0)
      ),
    0
  );
}

console.log(solveA(parseInput('./input.txt'))); // 69912

function solveB(lines) {
  const [first, second, third] = lines
    .map(line => line.reduce((sum, current) => sum + current, 0))
    .sort((a, b) => b - a);
  return first + second + third;
}

console.log(solveB(parseInput('./input.txt'))); // 208180

// function a(lines) {
//   let bestSum = 0;
//   for (const line of lines) {
//     bestSum = Math.max(
//       bestSum,
//       line.reduce((sum, current) => sum + current),
//       0
//     );
//   }
//   return bestSum;
// }
