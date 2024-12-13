const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n');
const N = +input[0];
const arr = input.slice(1).map((line) => line.split(' ').map(Number));

let visited = Array.from(Array(N), () => Array(N).fill(0));
let queue = [];
let answer = 0;

// 아기 상어 초기 위치 찾기
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (arr[i][j] === 9) {
      queue.push(i, j); // 아기 상어 위치를 큐에 [y, x] 순으로 삽입
    }
  }
}

const directions = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
];

let sharkSize = 2;
let eatenCount = 0;

let i = 0;
let time = 1;

while (i < queue.length) {
  const canEat = [];
  const length = queue.length;

  for (; i < length; ) {
    const oy = queue[i++];
    const ox = queue[i++];

    for (let d = 0; d < directions.length; d++) {
      const [dy, dx] = directions[d];
      const ny = oy + dy;
      const nx = ox + dx;

      // 범위 벗어나면 스킵
      if (ny < 0 || ny >= N || nx < 0 || nx >= N) continue;
      // 이미 방문했으면 스킵
      if (visited[ny][nx] === 1) continue;
      // 상어보다 큰 물고기 칸은 지나갈 수 없음
      if (arr[ny][nx] !== 9 && arr[ny][nx] > sharkSize) continue;

      // 상어가 먹을 수 있는 물고기 발견
      if (arr[ny][nx] !== 0 && arr[ny][nx] !== 9 && arr[ny][nx] < sharkSize) {
        canEat.push([ny, nx]);
        // 같은 레벨에서 발견했으므로 break
        break;
      }

      // 그냥 지나갈 수 있는 칸(빈 칸이거나 상어 크기와 같음)
      queue.push(ny, nx);
      visited[ny][nx] = 1;
    }
  }

  // BFS 한 레벨을 마친 뒤, 먹을 수 있는 물고기가 있으면
  if (canEat.length) {
    // 가장 위, 가장 왼쪽 기준으로 정렬
    canEat.sort((a, b) => {
      if (a[0] === b[0]) return a[1] - b[1];
      return a[0] - b[0];
    });

    const [fishY, fishX] = canEat[0];
    // BFS를 다시 시작하기 위해 i=0으로 초기화
    i = 0;
    answer = time; // 현재 레벨(거리)이 곧 상어가 물고기를 먹기까지 걸린 시간

    // 상어가 그 물고기 위치로 이동
    queue = [fishY, fishX];
    visited = Array.from(Array(N), () => Array(N).fill(0));
    arr[fishY][fishX] = 0; // 물고기 먹은 칸을 빈 칸으로 변경

    // 상어 상태 갱신
    eatenCount++;
    if (eatenCount === sharkSize) {
      sharkSize++;
      eatenCount = 0;
    }
  }

  // BFS 레벨(거리) 하나 끝났으니 time 증가
  time++;
}

console.log(answer);
