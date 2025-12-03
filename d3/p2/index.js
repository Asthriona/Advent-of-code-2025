const { readFileSync } = require("fs");
const input = readFileSync("./input.txt", "utf8").trim().split("\r\n");

// if you wanna know why there is no console.log in this one, I removed them so this thing shows a low number. 
// this one runs in 9ms. 
// P1 was running in 827ms with console.logs. 
const start = Date.now();

let joltage = 0;
let k = 12;

for (let line of input) {
  let bank = line.split("").map(Number);
  let n = bank.length;
  let maxNumber = [];
  let start = 0;

  let MaxJoltage = -1;
  let MaxI = -1;
  let MaxJ = -1;
  for (let pick = 0; pick < k; pick++) {
    let end = n - (k - pick);
    let best = -1;
    let bestIndex = -1;
    for (let i = start; i <= end; i++) {
      if (bank[i] > best) {
        best = bank[i];
        bestIndex = i;
      }
    }
    maxNumber.push(best);
    start = bestIndex + 1;
  }
  let combined = Number(maxNumber.join(""));
  joltage += combined;
}
console.log(joltage);

const end = Date.now();
console.log(`Execution time: ${end - start} ms`);