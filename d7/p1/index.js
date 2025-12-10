const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").split("\r\n");

// Start timer
const start = Date.now();

let startRow = -1;
let startCol = -1;

let H = input.length;
let W = input[0].length;

for (let i = 0; i < H; i++) {
  let col = input[i].indexOf("S");
  if (col !== -1) {
    startRow = i;
    startCol = col;
    break;
  }
}

let splits = 0;
let row = startRow + 1;
let active = new Set();

if (row < H) {
  active.add(startCol);
}

while (row < H && active.size > 0) {
  while (true) {
    let toSplit = [];
    
    for (let col of active) {
      if (input[row][col] === "^") {
        toSplit.push(col);
      }
    }
    
    if (toSplit.length === 0) {
      break;
    }
    
    for (let i = 0; i < toSplit.length; i++) {
      let col = toSplit[i];
      active.delete(col);
      splits = splits + 1;
      
      if (col - 1 >= 0) {
        active.add(col - 1);
      }
      if (col + 1 < W) {
        active.add(col + 1);
      }
    }
  }
  
  row = row + 1;
}

console.log(splits);

const ent = Date.now();
console.log(`Execution time: ${ent - start} ms`);
// Execution time: 6 ms