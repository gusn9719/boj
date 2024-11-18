const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n');

let T = parseInt(input[0]);
let idx = 1;

for (let t = 0; t < T; t++) {
  let p = input[idx++].trim();
  let n = parseInt(input[idx++]);
  let arrStr = input[idx++].trim();

  let arr = [];
  if (arrStr !== '[]') {
    arr = arrStr.slice(1, -1).split(',').map(Number);
  }

  let isError = false;
  let isReversed = false;
  let frontIndex = 0;
  let backIndex = n - 1;

  // D의 개수가 배열 길이보다 많은지 확인
  let Dcount = p.split('').filter((c) => c === 'D').length;
  if (Dcount > n) {
    console.log('error');
    continue;
  }

  for (let i = 0; i < p.length; i++) {
    if (p[i] === 'R') {
      isReversed = !isReversed;
    } else if (p[i] === 'D') {
      if (frontIndex > backIndex) {
        console.log('error');
        isError = true;
        break;
      }
      if (!isReversed) {
        frontIndex++;
      } else {
        backIndex--;
      }
    }
  }

  if (isError) continue;

  let result = arr.slice(frontIndex, backIndex + 1);
  if (isReversed) {
    result.reverse();
  }
  console.log(`[${result.join(',')}]`);
}
