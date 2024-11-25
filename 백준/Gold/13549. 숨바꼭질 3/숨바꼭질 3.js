const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split(" ").map(Number);

const [N, K] = input;
const MAX = 100001;
const dist = Array(MAX).fill(Infinity); // 방문 및 최소 시간 기록
const deque = [];

deque.push(N);
dist[N] = 0;

while (deque.length) {
  const current = deque.shift();

  if (current === K) {
    console.log(dist[current]);
    break;
  }

  // 순간이동 (시간 비용 0)
  if (current * 2 < MAX && dist[current * 2] > dist[current]) {
    dist[current * 2] = dist[current];
    deque.unshift(current * 2); // 우선순위 높음 (0초)
  }

  // 걷기 -1 (시간 비용 1)
  if (current - 1 >= 0 && dist[current - 1] > dist[current] + 1) {
    dist[current - 1] = dist[current] + 1;
    deque.push(current - 1); // 낮은 우선순위
  }

  // 걷기 +1 (시간 비용 1)
  if (current + 1 < MAX && dist[current + 1] > dist[current] + 1) {
    dist[current + 1] = dist[current] + 1;
    deque.push(current + 1); // 낮은 우선순위
  }
}
