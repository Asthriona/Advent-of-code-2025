const { readFileSync } = require("fs");
let input = readFileSync("./input.txt", "utf8").trim().split("\r\n");

// Start timer
const start = Date.now();

// Thanks @Heazher for that one. would not have thought of setting as a "let" and then mutate the shit.
input = input.map((line) => line.split(""));

// let liftable = 0; // eslint is unhappy if this stays...
// More maps! Just like last year :D
const dir = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

let totalRemoved = 0;
while (true) {
  let toRemove = [];
  // Y positions
  for (let y = 0; y < input.length; y++) {
    // X positions
    for (let x = 0; x < input[y].length; x++) {
        // DO NOT TEST AGAINST EMPTY SPACE YOU DUMB ASS! it was returning 19 in P1... forgot to filter like the dumdum I am.
      if (input[y][x] !== "@") continue;
      let adj = 0;
      for (let [dy, dx] of dir) {
        let ny = y + dy;
        let nx = x + dx;

        // are we about to fall of the map?
        if (ny < 0 || nx < 0 || ny >= input.length || nx >= input[ny].length)
          continue;
        if (input[ny][nx] === "@") adj++;
      }
      if(adj < 4 ) {
        toRemove.push([y, x]);
      }
    }
  }
  if(toRemove.length === 0) break;
//   replace the removed shit by x like in the exemple, because FUCK ORIGINALITY!!! MWAHAHAH
  for (let [y, x] of toRemove) {
    input[y][x] = "x";
  }
  totalRemoved += toRemove.length;
}
// Who needs that anymore anyway right?
// console.log(
//   `Roll ar (${y},${x}) has ${adj} neighbrs there is ${
//     canlift ? "OK!" : "Cannot be lifted."
//   }`
// );
// if (canlift) liftable++;

// console.log(`Total liftable rolls: ${liftable}`);

// I tabbed that.
console.log(`Total removed rolls: ${totalRemoved}`);

const ent = Date.now();
console.log(`Execution time: ${ent - start} ms`);
// Execution time: 63 ms