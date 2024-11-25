const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
const jumpCosts = input.slice(1, N).map((line) => line.split(' ').map(Number));
const K = Number(input[N]);

// dp[i][j]: 최소 에너지로 i번 돌에 도달했을 때, j는 매우 큰 점프를 사용했는지 여부 (0 또는 1)
const dp = Array.from({ length: N + 1 }, () => [Infinity, Infinity]);
dp[1][0] = 0; // 첫 번째 돌에서 시작, 매우 큰 점프 사용 안 함

for (let i = 1; i < N; i++) {
  const [smallJump, bigJump] = jumpCosts[i - 1];

  // 작은 점프 (i -> i + 1)
  if (i + 1 <= N) {
    // 매우 큰 점프를 사용하지 않은 경우
    dp[i + 1][0] = Math.min(dp[i + 1][0], dp[i][0] + smallJump);
    // 매우 큰 점프를 사용한 경우
    dp[i + 1][1] = Math.min(dp[i + 1][1], dp[i][1] + smallJump);
  }

  // 큰 점프 (i -> i + 2)
  if (i + 2 <= N) {
    // 매우 큰 점프를 사용하지 않은 경우
    dp[i + 2][0] = Math.min(dp[i + 2][0], dp[i][0] + bigJump);
    // 매우 큰 점프를 사용한 경우
    dp[i + 2][1] = Math.min(dp[i + 2][1], dp[i][1] + bigJump);
  }

  // 매우 큰 점프 (i -> i + 3), 한 번만 사용 가능
  if (i + 3 <= N) {
    // 매우 큰 점프를 아직 사용하지 않은 경우에만
    dp[i + 3][1] = Math.min(dp[i + 3][1], dp[i][0] + K);
  }
}

const result = Math.min(dp[N][0], dp[N][1]);
console.log(result);
