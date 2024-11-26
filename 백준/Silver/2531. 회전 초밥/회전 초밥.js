const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n');

const [N, varietyOfSushi, K, coupon] = input[0].split(' ').map(Number);
const sushiRotaions = input.slice(1).map(Number);

const sushiCount = Array.from({ length: varietyOfSushi + 1 }).fill(0);

let uniqueCount = 0;
let maxUniqueCount = 0;

for (let i = 0; i < K; i++) {
  if (sushiCount[sushiRotaions[i]] === 0) {
    uniqueCount++;
  }
  sushiCount[sushiRotaions[i]]++;
}

for (let i = 0; i < N; i++) {
  let additionallyCouponCount = uniqueCount;

  // 현재 쿠폰으로 받을 스시가 윈도우에 없으면 증가
  if (sushiCount[coupon] === 0) {
    additionallyCouponCount++;
  }

  maxUniqueCount = Math.max(maxUniqueCount, additionallyCouponCount);

  const removeIndex = sushiRotaions[i];
  const addIndex = sushiRotaions[(i + K) % N];

  sushiCount[removeIndex]--;
  if (sushiCount[removeIndex] === 0) {
    uniqueCount--;
  }

  if (sushiCount[addIndex] === 0) {
    uniqueCount++;
  }
  sushiCount[addIndex]++;
}

console.log(maxUniqueCount);
