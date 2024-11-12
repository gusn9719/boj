const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString();

const splitByTagAndSpace = (s) => {
  return s.match(/(<[^<>]+>)|([^<>\s]+)|(\s+)/g);
};

const reverseWord = (word) => {
  return word.split('').reverse().join('');
};

const splitArray = splitByTagAndSpace(input);

const reversedWords = splitArray.map((word) => {
  if (word.startsWith('<') && word.endsWith('>')) {
    return word;
  } else {
    return reverseWord(word);
  }
});

console.log(reversedWords.join(''));
