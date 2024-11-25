const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
let map = input.slice(1).map((line) => line.trim().split(' ').map(Number));

const directions = [
  [-1, 0], // 위
  [1, 0], // 아래
  [0, -1], // 왼쪽
  [0, 1], // 오른쪽
];

// 빙산이 녹는 함수
function meltIce(map) {
  const newMap = map.map((row) => [...row]); // 복제 배열 생성

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (map[y][x] > 0) {
        let meltCount = 0;

        // 주변 0의 개수 계산
        for (const [dy, dx] of directions) {
          const ny = y + dy;
          const nx = x + dx;
          if (ny >= 0 && ny < N && nx >= 0 && nx < M && map[ny][nx] === 0) {
            meltCount++;
          }
        }

        // 녹은 결과 적용
        newMap[y][x] = Math.max(0, map[y][x] - meltCount);
      }
    }
  }

  return newMap;
}

function countIce(map) {
  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  let iceCount = 0;

  const dfs = (y, x) => {
    visited[y][x] = true;

    for (const [dy, dx] of directions) {
      const ny = y + dy;
      const nx = x + dx;

      if (
        ny >= 0 &&
        ny < N &&
        nx >= 0 &&
        nx < M &&
        !visited[ny][nx] &&
        map[ny][nx] > 0
      ) {
        dfs(ny, nx);
      }
    }
  };

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (map[y][x] > 0 && !visited[y][x]) {
        iceCount++;
        dfs(y, x); // 새로운 섬 탐색 시작
      }
    }
  }

  return iceCount;
}

// 전체 시뮬레이션
function solve() {
  let year = 0;

  while (true) {
    const iceCount = countIce(map);

    if (iceCount >= 2) {
      return year; // 섬이 2개 이상으로 분리되면 종료
    }

    if (iceCount === 0) {
      return 0; // 빙산이 다 녹았다면 0 출력
    }

    map = meltIce(map); // 빙산 녹이기
    year++;
  }
}

console.log(solve());
