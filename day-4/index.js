import fs from 'fs';

function parseInput(filePath = './input.txt') {
  return fs
    .readFileSync(filePath, { encoding: 'utf-8' })
    .split('\n')
    .filter(Boolean);
}

function linesToIntervalTuples(lines) {
  return lines
    .map(line => line.split(','))
    .map(([a, b]) => [a.split('-').map(Number), b.split('-').map(Number)]);
}

function findOverlappingIntervals(tuples) {
  return tuples.filter(([a, b]) => {
    const [fromA, toA] = a;
    const [fromB, toB] = b;
    const isLeftOverlapping = fromA <= fromB && toA >= toB;
    const isRightOverlapping = fromB <= fromA && toB >= toA;
    return isLeftOverlapping || isRightOverlapping;
  });
}

function solveA(input) {
  const lines = parseInput(input);
  const tuples = linesToIntervalTuples(lines);
  const overlappingIntervals = findOverlappingIntervals(tuples);
  return overlappingIntervals.length;
}

console.log(solveA('./input.txt')); // 475

function solveB(input) {
  const lines = parseInput(input);
  const tuples = linesToIntervalTuples(lines);
  const overlappingIntervals = tuples
    .map(tuple => tuple.sort(([minA], [minB]) => minA - minB))
    .filter(([[, maxA], [minB]]) => maxA >= minB);
  return overlappingIntervals.length;
}

console.log(solveB('./input.txt')); // 825;
