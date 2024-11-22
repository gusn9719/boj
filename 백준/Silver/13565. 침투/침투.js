const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [M, N] = input[0].split(' ').map(Number);
const map = input.slice(1).map((line) => line.trim().split('').map(Number));

const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const visited = Array.from({ length: M }, () => Array(N).fill(false));

let result = false;

const dfs = (x, y) => {
  if (result) return;

  if (y === M - 1) {
    result = true;
    return;
  }

  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;

    if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

    if (map[ny][nx] === 0 && !visited[ny][nx]) {
      visited[ny][nx] = true;
      dfs(nx, ny);
    }
  }
};

for (let x = 0; x < N; x++) {
  if (map[0][x] === 0 && !visited[0][x]) {
    visited[0][x] = true;
    dfs(x, 0);
    if (result) break;
  }
}

console.log(result ? 'YES' : 'NO');
