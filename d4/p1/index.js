const { readFileSync } = require("fs");
const input = readFileSync("./input.txt", "utf8").trim().split("\r\n");

// Start timer 
const start = Date.now();

let liftable = 0;
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

// Y positions
for (let y = 0; y < input.length; y++) {
    // X positions
    for (let x = 0; x < input[y].length; x++) {
        if(input[y][x] !== "@") continue;
        let adj = 0;
        for (let [dy, dx] of dir) {
            let ny = y + dy;
            let nx = x + dx;

            // are we about to fall of the map?
            if(ny < 0 || nx < 0 || ny >= input.length || nx >= input[ny].length) continue;
            if(input[ny][nx] === "@") adj++;
        }
        let canlift = adj < 4;
        console.log(`Roll ar (${y},${x}) has ${adj} neighbrs there is ${canlift? "OK!" : "Cannot be lifted."}`);
        if(canlift) liftable++;
    }
}
console.log(`Total liftable rolls: ${liftable}`);

const ent = Date.now();
console.log(`Execution time: ${ent - start} ms`);
// Execution time: 1176 ms with the console.logs.