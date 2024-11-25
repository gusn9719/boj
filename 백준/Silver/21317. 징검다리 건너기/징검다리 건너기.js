const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
const jumpCosts = input.slice(1, N).map((line) => line.split(' ').map(Number));
const K = Number(input[N]);

const dp = Array.from({ length: N + 1 }, () => [Infinity, Infinity]);
dp[1][0] = 0;

for (let i = 1; i < N; i++) {
  const [smallJump, bigJump] = jumpCosts[i - 1];

  if (i + 3 <= N) {
    dp[i + 3][1] = Math.min(dp[i + 3][1], dp[i][0] + K);
  }

  if (i + 1 <= N) {
    dp[i + 1][0] = Math.min(dp[i + 1][0], dp[i][0] + smallJump);
    dp[i + 1][1] = Math.min(dp[i + 1][1], dp[i][1] + smallJump);
  }

  if (i + 2 <= N) {
    dp[i + 2][0] = Math.min(dp[i + 2][0], dp[i][0] + bigJump);
    dp[i + 2][1] = Math.min(dp[i + 2][1], dp[i][1] + bigJump);
  }
}

const result = Math.min(dp[N][0], dp[N][1]);

console.log(result);
