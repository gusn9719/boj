const fs = require('fs');
const stdin = fs.readFileSync('/dev/stdin').toString().trim();

const input = stdin.split('\n').map(line => line.trim().split(' ').map(Number));
const [[N, M], ...map] = input;

const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

let year = 0;

const isInBounds = (y, x) => y >= 0 && y < N && x >= 0 && x < M;

while (true) {
  let count = 0;
  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  const melt = Array.from({ length: N }, () => Array(M).fill(0));

  // DFS를 사용하여 빙산 덩어리 수 계산 및 각 셀의 녹는 양 계산
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (map[y][x] > 0 && !visited[y][x]) {
        count++;
        const stack = [[y, x]];
        visited[y][x] = true;

        while (stack.length) {
          const [cy, cx] = stack.pop();

          for (const [dy, dx] of directions) {
            const ny = cy + dy;
            const nx = cx + dx;

            if (isInBounds(ny, nx)) {
              if (map[ny][nx] === 0) {
                melt[cy][cx]++;
              } else if (map[ny][nx] > 0 && !visited[ny][nx]) {
                visited[ny][nx] = true;
                stack.push([ny, nx]);
              }
            }
          }
        }
      }
    }
  }

  if (count === 0) {
    console.log(0);
    break;
  }

  if (count >= 2) {
    console.log(year);
    break;
  }

  // 녹는 양을 적용하여 빙산 높이 감소
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (map[y][x] > 0) {
        map[y][x] = Math.max(0, map[y][x] - melt[y][x]);
      }
    }
  }

  year++;
}
