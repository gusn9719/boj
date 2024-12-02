const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n');

const T = Number(input[0]);
let index = 1;

const solve = function (N, M, K, houses) {
    let ans = 0;
    let currSum = 0;
    
    // 초기 M개의 집의 합 계산
    for (let i = 0; i < M; i++) {
        currSum += houses[i];
    }
    if (currSum < K) {
        ans++;
    }

    // 슬라이딩 윈도우를 사용해 나머지 부분 계산 (원형 고려하지 않은 부분)
    for (let i = 0; i < N - M; i++) {
        currSum -= houses[i];
        currSum += houses[i + M];
        if (currSum < K) {
            ans++;
        }
    }

    // 원형 슬라이딩 윈도우 처리 (마지막 부분)
    if (N !== M) {
        for (let i = N - M; i < N - 1; i++) {
            currSum -= houses[i];
            currSum += houses[i + M - N];
            if (currSum < K) {
                ans++;
            }
        }
    }

    return ans;
}

for (let i = 1; i < input.length; i += 2) {
    const [N, M, K] = input[i].split(' ').map(Number);
    const houses = input[i + 1].split(' ').map(Number);
    console.log(solve(N, M, K, houses));
}
