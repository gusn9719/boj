const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [M, N] = input[0].split(' ').map(Number);
const map = input.slice(1).map((line) => line.trim().split('').map(Number));

const visited = Array.from({ length: M }, () => Array(N).fill(false));
const queue = [];


for (let x = 0; x < N; x++) {
  if (map[0][x] === 0) {
    queue.push([0, x]);
    visited[0][x] = true;
  }
}

const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

let reachedInner = false;

while (queue.length > 0) {
  const [y, x] = queue.shift();

  if (y === M - 1) {
    reachedInner = true;
    break;
  }

  for (const [dy, dx] of directions) {
    const ny = y + dy;
    const nx = x + dx;

    if (
      ny >= 0 &&
      ny < M &&
      nx >= 0 &&
      nx < N &&
      map[ny][nx] === 0 &&
      !visited[ny][nx]
    ) {
      queue.push([ny, nx]);
      visited[ny][nx] = true;
    }
  }
}

console.log(reachedInner ? 'YES' : 'NO');
