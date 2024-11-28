const fs = require('fs');
const input = fs
  .readFileSync('dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

const N = input[0];
const array = [0, ...input.slice(1)];

const visited = Array(N + 1).fill(false);
const result = [];

const dfs = (start, current, path) => {
  if (visited[current]) {
    if (path.includes(current)) {
      result.push(...path.slice(path.indexOf(current)));
    }
    return;
  }

  visited[current] = true;
  path.push(current);
  dfs(start, array[current], path);
  path.pop();
};

for (let i = 1; i <= N; i++) {
  if (!visited[i]) dfs(i, i, []);
}

result.sort((a, b) => a - b);
console.log(result.length);
console.log(result.join('\n'));
