const { readFileSync } = require("fs");
const input = readFileSync("input.txt", "utf-8").split(/\r?\n/);
while (input.length > 0 && input[input.length - 1].trim() === "") {
  input.pop();
}

let maxWidth = 0;
for (let i = 0; i < input.length; i++) {
  if (input[i].length > maxWidth) {
    maxWidth = input[i].length;
  }
}

/*
for (let i = 0; i < input.length; i++) {
  while (input[i].length < maxWidth) {
    input[i] += " ";
  }
}
*/

let problems = [];
let currentProblem = [];

for (let col = 0; col < maxWidth; col++) {
  let isEmptyCol = true;
  for (let row = 0; row < input.length; row++) {
    let ch = col < input[row].length ? input[row][col] : " ";
    if (ch !== " ") {
      isEmptyCol = false;
      break;
    }
  }

  if (isEmptyCol) {
    if (currentProblem.length > 0) {
      problems.push(currentProblem);
      currentProblem = [];
    }
  } else {
    let colData = "";
    for (let row = 0; row < input.length; row++) {
      colData += col < input[row].length ? input[row][col] : " ";
    }
    currentProblem.push(colData);
  }
}

if (currentProblem.length > 0) {
  problems.push(currentProblem);
}
console.log("Number of problems found:", problems.length);

let total = 0;
for (let i = 0; i < problems.length; i++) {
  let prob = problems[i];
  let num = [];
  let op = "";

  for (let j = 0; j < prob.length; j++) {
    
    /*
    let col = prob[j];
    // let numStr = '';
    let currentNum = "";

    for (let k = 0; k < input.length; k++) {
      let char = col[k];

      if (char >= "0" && char <= "9") {
        currentNum += char;
      } else {
        if (currentNum !== "") {
          num.push(parseInt(currentNum));
          currentNum = "";
        }
        if (char === "+" || char === "*") {
          op = char;
        }
      }
    }

    if (currentNum !== "") {
      num.push(parseInt(currentNum));
    }
    */

    if (j === 0) {
      let blockRows = [];
      for (let r = 0; r < input.length; r++) {
        blockRows[r] = "";
      }
      for (let cj = 0; cj < prob.length; cj++) {
        let col = prob[cj];
        for (let r = 0; r < input.length; r++) {
          blockRows[r] += col[r];
        }
      }

      let lastRow = blockRows[input.length - 1];
      for (let x = 0; x < lastRow.length; x++) {
        if (lastRow[x] === '+' || lastRow[x] === '*') {
          op = lastRow[x];
          break;
        }
      }

      for (let r = 0; r < input.length - 1; r++) {
        let s = blockRows[r].trim();
        if (s !== "") {
          let m = s.match(/\d+/);
          if (m) {
            num.push(parseInt(m[0]));
          }
        }
      }
      break;
    }
  }
  console.log(`Problem ${i}: extracted numbers: [${num}], operation: '${op}'`);

  // It's too late for this shit.
  let answer = num[0];
  for (let j = 1; j < num.length; j++) {
    if (op === "+") {
      answer += num[j];
    } else if (op === "*") {
      answer *= num[j];
    }
  }

  console.log(`  = ${answer}`);
  total += answer;
}

console.log(total);