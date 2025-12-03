const { readFileSync } = require("fs");
// Note: remove the "\r" if you are not running windows. like   | this one.
const input = readFileSync('./input.txt', 'utf8').trim().split("\r\n");
// Bitch ass studpid windows. 
// I still love it. 
// but debian is better. 
// YALL SHOULD RUN DEBIAN INSTEAD OF SKETCHY DISTRO #456. or don't complain that your experiance was bad.

const start = Date.now();

let joltage = 0;

for (let line of input) {
    let bank = line.split('').map(Number);

    let MaxJoltage = -1;
    let MaxI = -1;
    let MaxJ = -1;

    for (let i = 0; i < bank.length; i++) {
        for (let j = i + 1; j < bank.length; j++) {
            let joltage = bank[i] * 10 + bank[j];
            if(joltage > MaxJoltage) {
                console.log(i, j);
                MaxJoltage = joltage;
                MaxI = i;
                MaxJ = j;
            }
        }
        // joltrage += MaxJoltage;
    }
    console.log("Line:", line);
    console.log(MaxI, MaxJ);
    joltage += MaxJoltage;
}
console.log(joltage);

const end = Date.now();
console.log(`Execution time: ${end - start} ms`);

