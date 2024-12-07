const fs = require('fs');
const fileData = fs.readFileSync('./input.txt', 'utf8').split('\n');
let canMultiply = true;

const ans = fileData.reduce((acc, curr) => {
    const found = curr.match(/mul\(\d{1,3},\d{1,3}\)|don't\(\)|do\(\)/g);
    let result = 0;
    
    for(let i=0; i<found.length; i++) {
        if(found[i] === "do()") {
            canMultiply = true;
            continue;
        }
        if(found[i] === "don't()") {
            canMultiply = false;
            continue;
        }
        
        if(canMultiply) {
            const [number, multi] = found[i].slice(4, -1).split(',');
            result += Number(number) * Number(multi);
        }
    }

    return acc += result;
}, 0);

console.log(ans);