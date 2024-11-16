const fs = require('fs');
const input = Number(fs.readFileSync('dev/stdin').toString().trim());

const minSquareSum = (number) => {
  const dp = Array(number + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= number; i++) {
    for (let j = 1; j * j <= i; j++) {
      dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
    }
  }

  return dp[number];
};

console.log(minSquareSum(input));
