const { readFileSync } = require("fs");
let input = readFileSync("./input.txt", "utf8").trim().split("\r\n");

let ranges = [];
let ids = [];
let blank = -1;

for (let i = 0; i < input.length; i++) {
  if (input[i].trim() === "") {
    blank = i;
    break;
  }
}

for (let i = 0; i < blank; i++) {
  if (input[i].trim() !== "") {
    let parts = input[i].split("-");
    let start = parseInt(parts[0]);
    let end = parseInt(parts[1]);
    ranges.push([start, end]);
  }
}

for (let i = blank + 1; i < input.length; i++) {
  if (input[i].trim() !== "") {
    ids.push(parseInt(input[i]));
  }
}

let freshCount = 0;

for (let i = 0; i < ids.length; i++) {
  let id = ids[i];
  let isFresh = false;
  
  for (let j = 0; j < ranges.length; j++) {
    let start = ranges[j][0];
    let end = ranges[j][1];
    
    if (id >= start && id <= end) {
      isFresh = true;
      break;
    }
  }
  
  if (isFresh) {
    freshCount++;
  }
}

console.log(freshCount);
