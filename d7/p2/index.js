const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").replace(/\r/g, "").trim().split("\n");

// Start timer
const start = Date.now();

let H = input.length;

if (H === 0) {
  console.error("Empty input");
  process.exit(1);
}

let W = input[0].length;

let startRow = -1;
let startCol = -1;

for (let i = 0; i < H; i++) {
  let col = input[i].indexOf("S");
  if (col !== -1) {
    startRow = i;
    startCol = col;
    break;
  }
}

if (startRow === -1) {
  console.error("No S (beam start) found in input.");
  process.exit(1);
}

// function keyOf(set) {
//   let arr = [];
//   for (let item of set) {
//     arr.push(item);
//   }
//   arr.sort(function(a, b) {
//     return a - b;
//   });
//   return arr.join(",");
// }

// function setFromKey(k) {
//   if (k === "") {
//     return new Set();
//   }
//   let parts = k.split(",");
//   let result = new Set();
//   for (let i = 0; i < parts.length; i++) {
//     result.add(parseInt(parts[i]));
//   }
//   return result;
// }

const memo = new Map();

function countFrom(r, c) {
  const key = r + "," + c;
  if (memo.has(key)) return memo.get(key);

  let rr = r;
  let cc = c;
  while (rr < H && cc >= 0 && cc < W && input[rr][cc] !== "^") {
    rr++;
  }

  if (rr >= H || cc < 0 || cc >= W) {
    memo.set(key, 1);
    return 1;
  }

  const leftCount = countFrom(rr + 1, cc - 1);
  const rightCount = countFrom(rr + 1, cc + 1);
  const total = leftCount + rightCount;
  memo.set(key, total);
  return total;
}

const result = countFrom(startRow + 1, startCol);
console.log("Total timelines:", result);

const ent = Date.now();
console.log(`Execution time: ${ent - start} ms`);
// Execution time: 8 ms