const { readFileSync } = require("fs");
const input = readFileSync('./input.txt', 'utf8').trim().split("\r\n");

let pos = 50;
let count = 0;

input.forEach(line => {
    const [dir, val] = [line.slice(0,1), parseInt(line.slice(1))];
    let stepCount = 0;

    // i'm double counting the shit...
    
    if(dir === "R") {
        for(let i = 1; i <= val; i++) {
            if((pos + i) % 100 === 0) stepCount++;
        }
        // i be stupid.
        pos = (pos + val) % 100;
    } 
    else {
        for(let i = 1; i <= val; i++) {
            if(((pos - i) % 100 + 100) % 100 === 0) stepCount++;
        }
        pos = ((pos - val) % 100 + 100) % 100;
    }
    
    count += stepCount;
    console.log(`${line} -> pos ${pos}, hit 0 ${stepCount} times`);
});

console.log(`\nFinal Position: ${pos}`);
console.log(`Count at position 0: ${count}`);