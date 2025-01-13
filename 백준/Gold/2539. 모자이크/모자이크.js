const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n');

// 입력 파싱
const [height, width] = input[0].split(' ').map(Number); // 종이 크기
const maxBoards = Number(input[1]); // 최대 색종이 개수
const errorCount = Number(input[2]); // 오염된 구역의 수

const errors = []; // 오염된 구역 좌표
let minSize = 0; // 초기 최소 크기

// 오염된 구역 입력 처리
for (let i = 0; i < errorCount; i++) {
  const [y, x] = input[3 + i].split(' ').map(Number);
  minSize = Math.max(minSize, y); // 가장 큰 행 값 기준으로 최소 크기 설정
  errors.push(x);
}

// 열 좌표 정렬
errors.sort((a, b) => a - b);

// 최소 크기 찾기
while (true) {
  let memory = errors[0];
  let count = 1;
  let fail = false;

  for (let loc of errors) {
    // 현재 색종이로 덮을 수 없으면 다음 색종이로 이동
    if (loc >= memory + minSize) {
      memory = loc;
      count++;
    }
    // 색종이 개수를 초과하면 실패
    if (count > maxBoards) {
      fail = true;
      break;
    }
  }

  // 성공하면 최소 크기를 출력하고 종료
  if (!fail) {
    console.log(minSize);
    break;
  }

  // 최소 크기 증가
  minSize++;
}
