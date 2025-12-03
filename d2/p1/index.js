const { readFileSync } = require("fs");
const input = readFileSync('./input.txt', 'utf8').trim().split("\r\n");

let totalSum = 0n;

const ranges = input[0].split(",")
.map(rangeStr => {
    const parts  = rangeStr.split('-');
    const start = BigInt(parts[0]);
    const end = BigInt(parts[1]);
    return {start, end};
})

let maxEndId = 0n;
for (const range of ranges) {
    if(range.end > maxEndId) {
        maxEndId = range.end;
    }
}

for (let Len = 1; Len <= 5; Len++) {
    const pawa = 10n ** BigInt(Len);
    const mult = pawa +1n;
    let Xmin = 10n ** BigInt(Len - 1);
    let Xmax = pawa - 1n;
    
    for (let X = Xmin; X <= Xmax; X++) {
        const invalidId = X * mult;
        if(invalidId > maxEndId) {
            break;
        }
        for (const range of ranges) {
            if(invalidId >= range.start && invalidId <= range.end) {
                totalSum += invalidId;
                break;
            }
        }
    }
}
    console.log(totalSum);


