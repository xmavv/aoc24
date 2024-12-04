
const fs = require('fs');
const fileData = fs.readFileSync('./input.txt', 'utf8').split('\n');

const ans = fileData.reduce((acc, curr, i) => {
    const arr = curr.split(' ').map(Number);
    let isCorrectArr = checkAscOrDesc(arr);

    if(!isCorrectArr) {
        isCorrectArr = isMultiBadLevel(arr);
    }   

    return isCorrectArr ? acc+1 : acc;
}, 0);
console.log(ans);

//task1
function checkAscOrDesc(arr) {
    let isIncreasing = false;

    if(arr[0] === arr[1]) return false;
    if(Math.abs(arr[1] - arr[0]) > 3) return false;
    if(arr[0] < arr[1]) isIncreasing = true;

    for(let i=1; i<arr.length-1; i++) {
        if(Math.abs(arr[i+1] - arr[i]) > 3) return false;

        if(isIncreasing) {
            if(arr[i+1] <= arr[i]) return false;
        } else {
            if(arr[i+1] >= arr[i]) return false;
        }
    }

    return true;
}

//task2
function isMultiBadLevel(arr) {
    for(let i=0; i<arr.length; i++) {
        const newArr = [...arr.slice(0, i), ...arr.slice(i+1)];

        if(checkAscOrDesc(newArr)) return true;
    }
    
    return false;
}