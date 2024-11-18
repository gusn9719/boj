const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n');

const scheduleRows = input.slice(1).map((row) => row.split(' ').map(Number));

const areaCalculator = (rows) => {
  // 날짜의 범위는 365일로 고정이므로 범위를 최대치로 설정합니다.
  const calendar = new Array(366).fill(0);

  // 일정이 있는 날마다 높이를 증가시킵니다.
  rows.forEach(([start, end]) => {
    for (let i = start; i <= end; i++) {
      calendar[i]++;
    }
  });

  let totalArea = 0;
  let currentHeight = 0;
  let width = 0;

  for (let i = 1; i <= 366; i++) {
    if (calendar[i] > 0) {
      // 연속된 일정의 시작이라면 넓이를 확장합니다.
      width++;
      currentHeight = Math.max(currentHeight, calendar[i]);
    } else if (width > 0) {
      // 연속된 일정이 끝나면 넓이를 계산하고 초기화합니다.
      totalArea += width * currentHeight;
      width = 0;
      currentHeight = 0;
    }
  }

  // 마지막 남아있는 일정에 대한 처리
  if (width > 0) {
    totalArea += width * currentHeight;
  }

  console.log(totalArea);
};

areaCalculator(scheduleRows);
