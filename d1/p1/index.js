const { readFileSync } = require("fs");
const input = readFileSync('./input.txt', 'utf8').trim().split("\r\n");

let pos = 50;
let count = 0;
input.forEach(line => {
    const [dir, val] = [line.slice(0,1), parseInt(line.slice(1))];
    if(dir === "R") {
        pos = (pos + val) % 100;
    } 
    else {
        pos = ((pos - val) % 100 + 100) % 100; 
    }
    // if val == 99 return to 0 then continue
    
    console.log(pos);
    if(pos === 0) count++;
});
console.log(`Final Position: ${pos}`);
console.log(`Count at position 0: ${count}`);