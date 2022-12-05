import fs from 'fs';

function parseInput(filePath) {
  return fs
    .readFileSync(filePath, { encoding: 'utf-8' })
    .split('\n')
    .filter(Boolean);
}

function rucksackToCompartment(rucksack) {
  const midpoint = rucksack.length / 2;
  return [rucksack.slice(0, midpoint), rucksack.slice(midpoint)];
}

function findCommonCharacter(tuple) {
  const [left, right] = tuple;
  const rightCharacters = new Set(right);
  for (const character of left) {
    if (rightCharacters.has(character)) {
      return character;
    }
  }
}

function getPriority(item) {
  const charCode = item.charCodeAt(0) || 0;
  const isLowercase = charCode >= 97;
  return isLowercase ? charCode - 96 : charCode - 38;
}

function solveA(input) {
  return parseInput(input)
    .map(rucksackToCompartment)
    .map(findCommonCharacter)
    .reduce((total, character) => total + getPriority(character), 0);
}

console.log(solveA('./input.txt')); // 7795

function rucksacksToGroups(lines) {
  const groups = [];
  for (let i = 0; i < lines.length; i += 3) {
    const group = lines.slice(i, i + 3);
    groups.push(group);
  }
  return groups;
}

function findCommonCharacterInTrio(trio) {
  const [a, b, c] = trio;
  const charactersA = new Set(a);
  const charactersB = new Set(b);
  for (const character of c) {
    if (charactersA.has(character) && charactersB.has(character)) {
      return character;
    }
  }
}

function solveB(input) {
  return rucksacksToGroups(parseInput(input))
    .map(findCommonCharacterInTrio)
    .reduce((total, character) => total + getPriority(character), 0);
}

console.log(solveB('./input.txt')); // 2703
