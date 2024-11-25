const fs = require('fs');
const input = fs
  .readFileSync('dev/stdin')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const [H, N] = input;

const start = Math.min(H, N);
const end = Math.max(H, N);

const dp = Array.from({ length: end + 1 }, () => Array(end + 1).fill(0));

dp[start][start] = 1;

for (let y = start; y <= end; y++) {
  for (let x = start; x <= end; x++) {
    if (y < x) continue;
    if (y > start) dp[y][x] += dp[y - 1][x];
    if (x > start) dp[y][x] += dp[y][x - 1];
  }
}

console.log(dp[end][end]);
