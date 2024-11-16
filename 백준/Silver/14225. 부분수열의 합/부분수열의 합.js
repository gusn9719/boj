const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n');

const n = Number(input[0].trim());
const numbers = input[1].split(' ').map(Number).sort((a,b)=> a - b);

let target = 1;

for (let i = 0; i < n; i++) {
  if (numbers[i] > target) {
    break;
  }
  target += numbers[i];
}

console.log(target);
