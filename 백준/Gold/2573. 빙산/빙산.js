const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const map = input.slice(1).map((line) => line.trim().split(' ').map(Number));

const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

let icePositions = [];
for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    if (map[y][x] > 0) {
      icePositions.push([y, x]);
    }
  }
}

const meltIce = () => {
  const newIcePositions = [];
  const meltAmounts = Array(icePositions.length).fill(0);

  for (let i = 0; i < icePositions.length; i++) {
    const [y, x] = icePositions[i];
    let meltCount = 0;

    for (const [dy, dx] of directions) {
      const ny = y + dy;
      const nx = x + dx;
      if (ny >= 0 && ny < N && nx >= 0 && nx < M && map[ny][nx] === 0) {
        meltCount++;
      }
    }
    meltAmounts[i] = meltCount;
  }

  for (let i = 0; i < icePositions.length; i++) {
    const [y, x] = icePositions[i];
    map[y][x] = Math.max(0, map[y][x] - meltAmounts[i]);

    if (map[y][x] > 0) {
      newIcePositions.push([y, x]);
    }
  }

  icePositions = newIcePositions;
};

const countIceland = () => {
  const visited = new Set();
  let iceCount = 0;

  const dfs = (y, x) => {
    const key = y * M + x;
    visited.add(key);

    for (const [dy, dx] of directions) {
      const ny = y + dy;
      const nx = x + dx;
      const nKey = ny * M + nx;

      if (
        ny >= 0 &&
        ny < N &&
        nx >= 0 &&
        nx < M &&
        !visited.has(nKey) &&
        map[ny][nx] > 0
      ) {
        dfs(ny, nx);
      }
    }
  };

  for (const [y, x] of icePositions) {
    const key = y * M + x;
    if (!visited.has(key)) {
      iceCount++;
      dfs(y, x);
    }
  }

  return iceCount;
};

let year = 0;

while (true) {
  const iceCount = countIceland();

  if (iceCount >= 2) {
    break;
  }

  if (icePositions.length === 0) {
    year = 0;
    break;
  }

  meltIce();
  year++;
}

console.log(year);
