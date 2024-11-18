const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n');

const N = parseInt(input[0]);
const targetDeck = input[1].split(' ').map(Number);

// 가능한 K 값들을 저장하는 배열
const possibleKValues = [];
for (let K = 1; Math.pow(2, K) < N; K++) {
  possibleKValues.push(K);
}

// (2, K)-섞기 함수
const shuffle = (deck, K) => {
  const totalSteps = K + 1;
  let previousMovedIndex = [];

  for (let step = 1; step <= totalSteps; step++) {
    const cardsToMoveCount = Math.pow(2, K - step + 1);

    let indicesToMove;
    if (step === 1) {
      // 첫 번째 단계: 더미의 맨 아래에서 카드 선택
      indicesToMove = [];
      for (let i = deck.length - cardsToMoveCount; i < deck.length; i++) {
        indicesToMove.push(i);
      }
    } else {
      // 다음 단계: 이전에 이동한 카드들 중 아래쪽 카드 선택
      indicesToMove = previousMovedIndex.slice(-cardsToMoveCount);
    }

    // 선택한 카드들을 맨 위로 이동
    const cardsToMove = indicesToMove.map((index) => deck[index]);
    deck = [
      ...cardsToMove,
      ...deck.filter((_, index) => !indicesToMove.includes(index)),
    ];

    // 이동한 카드들의 새로운 인덱스 저장
    previousMovedIndex = [];
    for (let i = 0; i < cardsToMove.length; i++) {
      previousMovedIndex.push(i);
    }
  }

  return deck;
};

// 초기 카드 더미 생성
const initialDeck = [];
for (let i = 1; i <= N; i++) {
  initialDeck.push(i);
}

let found = false;

// 가능한 K1과 K2 조합에 대해 시도
for (const K1 of possibleKValues) {
  let tempDeck = [...initialDeck];
  tempDeck = shuffle(tempDeck, K1);

  for (const K2 of possibleKValues) {
    let finalDeck = [...tempDeck];
    finalDeck = shuffle(finalDeck, K2);

    // 결과가 목표 카드 더미와 일치하는지 확인
    if (finalDeck.join(' ') === targetDeck.join(' ')) {
      console.log(`${K1} ${K2}`);
      found = true;
      break;
    }
  }

  if (found) break;
}
