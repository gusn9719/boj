const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toLocaleString().trim().split('\n');

const K = Number(input[0]);
const [W, H] = input[1].split(' ').map(Number);
const map = input.slice(2).map((line) => line.trim().split(' ').map(Number));

// 이동 방향 정의
const monkeyMoves = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
]; 
const horseMoves = [
  [-2, -1],
  [-1, -2],
  [1, -2],
  [2, -1],
  [-2, 1],
  [-1, 2],
  [1, 2],
  [2, 1],
]; // 말처럼 이동

// 방문 배열 초기화
const visited = Array.from({ length: H }, () =>
  Array.from({ length: W }, () => Array(K + 1).fill(false)),
);

// BFS 초기화
const queue = [[0, 0, 0, 0]]; // [y, x, 말 이동 횟수, 현재까지의 이동 거리]
visited[0][0][0] = true;

while (queue.length > 0) {
  const [y, x, horseUsed, steps] = queue.shift();

  // 목표 지점에 도달하면 결과 출력
  if (y === H - 1 && x === W - 1) {
    console.log(steps);
    return;
  }

  // 원숭이 이동 (상하좌우)
  for (const [dy, dx] of monkeyMoves) {
    const ny = y + dy;
    const nx = x + dx;
    if (
      ny >= 0 &&
      ny < H &&
      nx >= 0 &&
      nx < W &&
      map[ny][nx] === 0 &&
      !visited[ny][nx][horseUsed]
    ) {
      visited[ny][nx][horseUsed] = true;
      queue.push([ny, nx, horseUsed, steps + 1]);
    }
  }

  // 말 이동 (L자)
  if (horseUsed < K) {
    for (const [dy, dx] of horseMoves) {
      const ny = y + dy;
      const nx = x + dx;
      if (
        ny >= 0 &&
        ny < H &&
        nx >= 0 &&
        nx < W &&
        map[ny][nx] === 0 &&
        !visited[ny][nx][horseUsed + 1]
      ) {
        visited[ny][nx][horseUsed + 1] = true;
        queue.push([ny, nx, horseUsed + 1, steps + 1]);
      }
    }
  }
}

// 목표에 도달하지 못한 경우
console.log(-1);
