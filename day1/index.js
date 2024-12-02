const fs = require('fs');
const fileData = fs.readFileSync('./input.txt', 'utf8').split('\n');

const leftList = [];
const rightList = [];

fileData.map(line => {
    const [left, right] = line.split('   ');
    leftList.push(Number(left));
    rightList.push(Number(right));
});


leftList.sort((a, b) => a-b);
rightList.sort((a, b) => a-b);

// TASK 1
// const ans = leftList.reduce((acc, curr, i) =>  acc + (Math.abs(rightList[i] - curr)), 0);

// TASK 2
const len = rightList.length-1;
const countObj = {};

const ans = leftList.reduce((acc, curr, i) =>  {
    if(!countObj[curr]) {
        const count = binarySearch(rightList, 0, len, curr);
        countObj[curr] = count;
    }

    return acc + curr * countObj[curr];
    }, 0);
console.log(ans);

function binarySearch(arr, left, right, element) {
    const midIndex = Math.floor((left+right)/2);
    const midElement = arr[midIndex];
    let count = 0;

    if(left > right) return 0;
    if(midElement === element) {
        count++;
        let index = midIndex;

        while(arr[index - 1] === element) {
            count++;
            index--;
        }

        index = midIndex;

        while(arr[index + 1] === element) {
            count++;
            index++;
        }
        return count;
    }

    if(element < midElement) return binarySearch(arr, left, midIndex-1, element);
    else return binarySearch(arr, midIndex+1, right, element);
}

// function partition(arr, l, r) {
//     const pivot = arr[l];
//     let left = l;
//     let right = r;

//     while(true) {
//         while(arr[left] < pivot) ++left;
//         while(arr[right] > pivot) --right;

//         if(left >= right) return right;

//         [arr[left], arr[right]] = [arr[right], arr[left]];
//         ++left;
//         --right;
//     }
// }

// function quickSort(arr, l, r) {
//     if(r <= l) return;

//     const sortedItem = partition(arr, l, r);

//     quickSort(arr, l, sortedItem - 1);

//     quickSort(arr, sortedItem  + 1, r);
// }