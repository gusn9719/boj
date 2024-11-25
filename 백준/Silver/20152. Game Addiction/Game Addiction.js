const fs = require('fs');
const input = fs
  .readFileSync('dev/stdin')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const [H, N] = input;

function catalan(n) {
  let result = BigInt(1);
  for (let i = 0; i < n; i++) {
    result = (result * BigInt(2 * n - i)) / BigInt(i + 1);
  }
  return result / BigInt(n + 1);
}

const D = Math.abs(N - H);
const numberOfPaths = catalan(D);
console.log(numberOfPaths.toString());
