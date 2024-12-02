const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n');
const FAILED_MESSAGE = 'IMPOSSIBLE';

const [ROW, COLUMN] = input[0].split(' ').map(Number);
const graph = input.slice(1).map((row) => row.trim().split(''));

const fireTime = Array.from({ length: ROW }, () =>
  Array(COLUMN).fill(Infinity),
);
const jihunTime = Array.from({ length: ROW }, () => Array(COLUMN).fill(-1));

let fireQueue = [];
let jihunQueue = [];

for (let i = 0; i < ROW; i++) {
  for (let j = 0; j < COLUMN; j++) {
    if (graph[i][j] === 'F') {
      fireQueue.push([i, j]);
      fireTime[i][j] = 0;
    } else if (graph[i][j] === 'J') {
      jihunQueue.push([i, j]);
      jihunTime[i][j] = 0;
    }
  }
}

const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const spreadFire = () => {
  const queue = fireQueue.slice();

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx >= 0 && nx < ROW && ny >= 0 && ny < COLUMN) {
        if (graph[nx][ny] !== '#' && fireTime[nx][ny] === Infinity) {
          fireTime[nx][ny] = fireTime[x][y] + 1;
          queue.push([nx, ny]);
        }
      }
    }
  }
};

const moveJihun = () => {
  const queue = jihunQueue.slice();
  while (queue.length > 0) {
    const [x, y] = queue.shift();

    if (x === 0 || x === ROW - 1 || y === 0 || y === COLUMN - 1) {
      console.log(jihunTime[x][y] + 1);
      return;
    }

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx >= 0 && nx < ROW && ny >= 0 && ny < COLUMN) {
        if (graph[nx][ny] !== '#' && jihunTime[nx][ny] === -1) {
          if (jihunTime[x][y] + 1 < fireTime[nx][ny]) {
            jihunTime[nx][ny] = jihunTime[x][y] + 1;
            queue.push([nx, ny]);
          }
        }
      }
    }
  }
  // 모든 경우를 탐색했지만 탈출하지 못한 경우
  console.log(FAILED_MESSAGE);
};

spreadFire();
moveJihun();
