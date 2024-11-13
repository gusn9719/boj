const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim();

let stack = [];
let result = 0;

for (let i = 0; i < input.length; i++) {
  if (input[i] === '(') {
    stack.push(input[i]);
  } else {
    stack.pop();

    if (input[i - 1] === '(') {
      result += stack.length;
    } else {
      result++;
    }
  }
}

console.log(result)