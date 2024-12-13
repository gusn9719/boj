const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n');

const N = +input[0];
const space = input.slice(1).map((line) => line.split(' ').map(Number));

let sharkX,
  sharkY,
  sharkSize = 2,
  eatenCount = 0;

// 상어 시작 위치 찾기
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (space[i][j] === 9) {
      sharkX = i;
      sharkY = j;
      space[i][j] = 0; 
      break;
    }
  }
}

let time = 0;

while (true) {
  // BFS를 통해 먹을 수 있는 물고기 후보 찾기
  const fish = bfsFindFish(space, N, sharkX, sharkY, sharkSize);

  if (fish === null) {
    // 더 이상 먹을 물고기 없음
    break;
  }

  const { x, y, distance } = fish;

  // 물고기 먹기
  space[x][y] = 0; // 물고기 먹은 자리 비우기
  sharkX = x;
  sharkY = y;
  eatenCount += 1;
  time += distance;

  // 상어 크기 증가 조건
  if (eatenCount === sharkSize) {
    sharkSize++;
    eatenCount = 0;
  }
}

console.log(time);

// BFS를 수행해 먹을 수 있는 물고기를 찾는 함수
function bfsFindFish(space, N, startX, startY, sharkSize) {
  const visited = Array.from({ length: N }, () => Array(N).fill(false));
  const queue = [];
  queue.push({ x: startX, y: startY, distance: 0 });
  visited[startX][startY] = true;

  // 상하좌우 탐색 방향
  const directions = [
    { dx: -1, dy: 0 },
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: 1, dy: 0 },
  ];

  // BFS로 찾은 먹을 수 있는 물고기들 저장
  const candidates = [];

  while (queue.length > 0) {
    const { x, y, distance } = queue.shift();

    for (const { dx, dy } of directions) {
      const nx = x + dx;
      const ny = y + dy;

      // 범위 확인
      if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;

      if (!visited[nx][ny]) {
        // 상어 크기보다 큰 물고기가 있는 칸은 아예 못 지나감
        if (space[nx][ny] > sharkSize) continue;

        visited[nx][ny] = true;
        // 먹을 수 있는 물고기 발견 (상어 크기보다 작은 물고기)
        if (space[nx][ny] !== 0 && space[nx][ny] < sharkSize) {
          candidates.push({ x: nx, y: ny, distance: distance + 1 });
          // 여기서 바로 return하지 않는 이유:
          // BFS는 같은 거리에 있는 칸을 모두 탐색하므로
          // 더 짧은 거리에 있는 먹을 수 있는 물고기가 있을 수도 있으니
          // 현재 거리 수준에서는 계속 탐색을 이어간다.
        }

        // 먹지는 않지만 지나갈 수 있는 칸은 큐에 추가
        queue.push({ x: nx, y: ny, distance: distance + 1 });
      }
    }
  }

  if (candidates.length === 0) {
    // 먹을 물고기가 없음
    return null;
  }

  // 후보들 중 조건에 따라 물고기 선택
  // 1. distance가 가장 작은 물고기
  // 2. distance가 같다면 x(행)가 가장 작은
  // 3. 그 중 y(열)가 가장 작은
  candidates.sort((a, b) => {
    if (a.distance !== b.distance) return a.distance - b.distance;
    if (a.x !== b.x) return a.x - b.x;
    return a.y - b.y;
  });

  return candidates[0]; // 가장 조건에 맞는 물고기 반환
}
