const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n');

const T = Number(input[0]);
let index = 1;

for (let t = 0; t < T; t++) {
    const [N, M, K] = input[index].split(' ').map(Number);
    const houses = input[index + 1].split(' ').map(Number);
    index += 2;

    // 특별한 경우 처리: M이 N과 같을 경우
    if (M === N) {
        const totalSum = houses.reduce((acc, val) => acc + val, 0);
        if (totalSum < K) {
            console.log(1);
        } else {
            console.log(0);
        }
        continue;
    }

    // 슬라이딩 윈도우 계산
    let count = 0;
    let currentSum = 0;

    // 처음 M개의 집에 대한 합을 계산
    for (let i = 0; i < M; i++) {
        currentSum += houses[i];
    }

    // 첫 번째 윈도우의 합이 K보다 작으면 카운트 증가
    if (currentSum < K) {
        count++;
    }

    // 슬라이딩 윈도우로 이동하며 나머지 부분 계산
    for (let i = 1; i < N; i++) {
        currentSum -= houses[(i - 1)];           // 이전 집 값을 빼고
        currentSum += houses[(i + M - 1) % N];   // 새로 추가된 집 값을 더합니다

        if (currentSum < K) {
            count++;
        }
    }

    console.log(count);
}
