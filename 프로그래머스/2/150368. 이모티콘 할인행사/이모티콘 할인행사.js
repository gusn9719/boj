function solution(users, emoticons) {
    let maxSubscribers = 0;
    let maxRevenue = 0;

    // 할인율 옵션
    const discountRates = [10, 20, 30, 40];

    // 모든 할인율 조합을 완전 탐색
    const dfs = (index, discounts) => {
        if (index === emoticons.length) {
            calculateResult(discounts);
            return;
        }

        for (let rate of discountRates) {
            discounts[index] = rate;
            dfs(index + 1, discounts);
        }
    };

    const calculateResult = (discounts) => {
        let subscribers = 0;
        let revenue = 0;

        for (let [minRate, maxSpend] of users) {
            let totalSpend = 0;

            for (let i = 0; i < emoticons.length; i++) {
                if (discounts[i] >= minRate) {
                    totalSpend += emoticons[i] * (1 - discounts[i] / 100);
                }
            }

            if (totalSpend >= maxSpend) {
                subscribers++;
            } else {
                revenue += totalSpend;
            }
        }

        // 결과 업데이트
        if (
            subscribers > maxSubscribers ||
            (subscribers === maxSubscribers && revenue > maxRevenue)
        ) {
            maxSubscribers = subscribers;
            maxRevenue = revenue;
        }
    };

    dfs(0, Array(emoticons.length).fill(0));
    return [maxSubscribers, maxRevenue];
}

// 예제 입력
const users = [
    [40, 10000],
    [25, 10000],
];
const emoticons = [7000, 9000];

console.log(solution(users, emoticons)); // [1, 5400]
