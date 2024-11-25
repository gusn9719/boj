function solution(users, emoticons) {
    var answer = []
    let maxSubscribers = 0;
    let maxRevenue = 0;

   
    const discountRates = [10, 20, 30, 40];


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

        if (
            subscribers > maxSubscribers ||
            (subscribers === maxSubscribers && revenue > maxRevenue)
        ) {
            maxSubscribers = subscribers;
            maxRevenue = revenue;
        }
    };

    dfs(0, Array(emoticons.length).fill(0));
    answer.push(maxSubscribers)
    answer.push(maxRevenue)
    return answer;
}
