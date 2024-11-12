const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n');

const [s, t] = input;

const gcd = (num1, num2) => {
  let gcd = 1;
  for (let i = 2; i <= Math.min(num1, num2); i++) {
    if (num1 % i === 0 && num2 % i === 0) {
      gcd = i;
    }
  }

  return gcd;
};

const lcm = (num1, num2) => {
  return (num1 * num2) / gcd(num1, num2);
};

const repeatNumber = lcm(s.length, t.length);

const extendS = s.repeat(repeatNumber / s.length);
const extendT = t.repeat(repeatNumber / t.length);

if (extendS === extendT) {
  console.log(1);
} else {
  console.log(0);
}
