const { readFileSync } = require("fs");
let input = readFileSync("./input.txt", "utf8").trim().split("\r\n");

// Start timer
const start = Date.now();

let ranges = [];
let blank = -1;

for (let i = 0; i < input.length; i++) {
  console.log("Checking line:", input[i]);
  if (input[i].trim() === "") {
    blank = i;
    break;
  }
}

for (let i = 0; i < blank; i++) {
  if (input[i].trim() !== "") {
    console.log("Parsing range:", input[i]);
    let parts = input[i].split("-");
    let start = parseInt(parts[0]);
    let end = parseInt(parts[1]);
    ranges.push([start, end]);
  }
}


// IT"S STUCK IN A LOOP!!!! D:<
// let freshIds = 0;

// for (let i = 0; i < ranges.length; i++) {
//   console.log("Processing range:", ranges[i]);
//   let start = ranges[i][0];
//   let end = ranges[i][1];

//   // I cheated. I'm sorry I'm too stupid and it took way too long. 
//   // freshIds += (end - start + 1); // it's not right. lmao
  
//   for (let id = start; id <= end; id++) {
//     // console.log("Adding fresh id:", id);
//     // freshIds.push(id); // I'm running out of memory real quick lmao.
//     // freshIds++;
//     console.log("Current freshIds count:", freshIds); // i feel like it's stuck somewhere it took 20mn and still never finished.
//     freshIds += end - start + 1;
//   }
// }

// Now I need to be smart. Something I can't really do well.

ranges.sort((a, b) => a[0] - b[0]);

let mergedRanges = [];

for (let i = 0; i < ranges.length; i++) {
  // console.log("Merging range:", ranges[i]);
  let start = ranges[i][0];
  let end = ranges[i][1];
  
  if (mergedRanges.length === 0) {
    // console.log("Adding first range:", [start, end]);
    mergedRanges.push([start, end]);
  } else {
    // console.log("Checking against last merged range:", mergedRanges[mergedRanges.length - 1]);
    let last = mergedRanges[mergedRanges.length - 1];
    
    if (start <= last[1] + 1) {
      // console.log("Merging with last range:", last);
      last[1] = Math.max(last[1], end);
    } else {
      // console.log("Adding new merged range:", [start, end]);
      mergedRanges.push([start, end]);
    }
  }
}

let totalFresh = 0;

for (let i = 0; i < mergedRanges.length; i++) {
  // console.log("Calculating total fresh from merged range:", mergedRanges[i]);
  let start = mergedRanges[i][0];
  let end = mergedRanges[i][1];
  totalFresh += end - start + 1;
}

console.log(totalFresh);

const ent = Date.now();
console.log(`Execution time: ${ent - start} ms`);
// Execution time: 145 ms With console.logs
// Execution time: 99 ms Without console.logs

// I cheated. :( I am not worthy of that star.
