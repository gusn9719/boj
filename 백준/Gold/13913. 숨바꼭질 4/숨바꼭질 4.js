const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split(' ').map(Number);

const [N, K] = input;
const MAX = 100001;

// 초기화
const dist = Array(MAX).fill(Infinity); // 각 위치까지의 최소 시간
const prev = Array(MAX).fill(-1); // 경로를 추적하기 위한 배열
const queue = [];

dist[N] = 0; // 시작점의 시간은 0
queue.push(N);

while (queue.length) {
  const current = queue.shift();

  // 목표 위치에 도달하면 종료
  if (current === K) break;

  // 다음 이동 가능한 위치들
  const moves = [current * 2, current - 1, current + 1];

  for (const next of moves) {
    // 범위 내에 있고, 아직 방문하지 않은 경우
    if (next >= 0 && next < MAX && dist[next] === Infinity) {
      dist[next] = dist[current] + 1; // 시간 업데이트
      prev[next] = current; // 경로 저장
      queue.push(next);
    }
  }
}

// 결과 출력
console.log(dist[K]); // 최소 시간 출력

// 경로 추적
const path = [];
for (let at = K; at !== -1; at = prev[at]) {
  path.push(at);
}
path.reverse(); // 역추적 결과를 뒤집음
console.log(path.join(' '));
