const fs = require('fs');

const input = fs.readFileSync('dev/stdin').toString().trim().split('\n');
const lines = input.map((line) => line.split(' ').map(Number));

const countIslands = (map) => {
  const directions = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
  ];
  let count = 0;

  const H = map.length;
  const W = map[0].length;

  const visited = Array.from(Array(H), () => Array(W).fill(false));

  const dfs = (x, y) => {
    visited[y][x] = true;

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (
        nx >= 0 &&
        nx < W &&
        ny >= 0 &&
        ny < H &&
        map[ny][nx] === 1 &&
        !visited[ny][nx]
      ) {
        dfs(nx, ny);
      }
    }
  };

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (map[y][x] === 1 && !visited[y][x]) {
        count++;
        dfs(x, y); // 새로운 섬 발견 시 dfs 호출
      }
    }
  }

  return count;
};

let index = 0;

while (index < lines.length) {
  const [W, H] = lines[index];

  if (H === 0 && W === 0) break;

  const map = [];
  for (let i = 1; i <= H; i++) {
    map.push(lines[index + i]);
  }

  console.log(countIslands(map));

  index += H + 1;
}
