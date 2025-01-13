const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 입력 처리
const [rows, cols] = input[0].split(' ').map(Number);
const maxBoards = Number(input[1]);
const markerCount = Number(input[2]);
const markers = input
  .slice(3, 3 + markerCount)
  .map((line) => line.split(' ').map(Number))
  .sort((a, b) => a[1] - b[1]); // 열 기준 정렬

let maxY = 0;
markers.forEach(([y]) => {
  maxY = Math.max(maxY, y); // 가장 큰 행 값 계산
});

let start = maxY;
let end = rows;
let result = Infinity;

// 이분 탐색
while (start <= end) {
  const mid = Math.floor((start + end) / 2);
  let count = 1;
  let currentX = markers[0][1];

  for (let i = 1; i < markers.length; i++) {
    if (currentX + mid <= markers[i][1]) {
      count++;
      currentX = markers[i][1];
    }
  }

  if (count <= maxBoards) {
    result = mid;
    end = mid - 1; // 더 작은 크기 탐색
  } else {
    start = mid + 1; // 더 큰 크기 탐색
  }
}

console.log(result);
