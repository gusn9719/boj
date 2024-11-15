const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n');

const [M, N] = input[0].split(' ').map(Number);
const grid = input.slice(1).map((line) => line.trim().split(''));

let totalPictures = 0;

const checkPictureSpots = (rowLimit, colLimit, gridArray) => {
  for (let row = 0; row < rowLimit - 1; row++) {
    let col = 0;
    while (col < colLimit - 1) {
      if (gridArray[row][col] === 'X' && gridArray[row][col + 1] === 'X') {
        if (
          gridArray[row + 1][col] === '.' &&
          gridArray[row + 1][col + 1] === '.'
        ) {
          totalPictures++;
          col += 2;
          continue;
        }
      } else if (
        gridArray[row][col] === '.' &&
        gridArray[row][col + 1] === '.'
      ) {
        if (
          gridArray[row + 1][col] === 'X' &&
          gridArray[row + 1][col + 1] === 'X'
        ) {
          totalPictures++;
          col += 2;
          continue;
        }
      }
      col++;
    }
  }
};

checkPictureSpots(M, N, grid);

const transposedGrid = Array.from({ length: N }, (_, colIndex) =>
  Array.from({ length: M }, (_, rowIndex) => grid[rowIndex][colIndex]),
);

checkPictureSpots(N, M, transposedGrid);

console.log(totalPictures);
