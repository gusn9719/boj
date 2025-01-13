const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n');

// 입력 데이터 파싱
const testCases = input.map((line) => {
  const data = line.split(' ').map(Number);
  const teams = [];
  for (let i = 0; i < 6; i++) {
    teams.push(data.slice(i * 3, i * 3 + 3)); // 각 팀의 [승, 무, 패]
  }
  return teams;
});

// 가능한 경기 결과를 체크하는 백트래킹 함수
function isPossible(teams, matches, matchIdx) {
  if (matchIdx === matches.length) {
    return teams.every((team) => team.every((score) => score === 0));
  }

  const [teamA, teamB] = matches[matchIdx];

  // 팀 A가 승리하고 팀 B가 패배하는 경우
  if (teams[teamA][0] > 0 && teams[teamB][2] > 0) {
    teams[teamA][0]--;
    teams[teamB][2]--;
    if (isPossible(teams, matches, matchIdx + 1)) return true;
    teams[teamA][0]++;
    teams[teamB][2]++;
  }

  // 팀 A와 팀 B가 비기는 경우
  if (teams[teamA][1] > 0 && teams[teamB][1] > 0) {
    teams[teamA][1]--;
    teams[teamB][1]--;
    if (isPossible(teams, matches, matchIdx + 1)) return true;
    teams[teamA][1]++;
    teams[teamB][1]++;
  }

  // 팀 A가 패배하고 팀 B가 승리하는 경우
  if (teams[teamA][2] > 0 && teams[teamB][0] > 0) {
    teams[teamA][2]--;
    teams[teamB][0]--;
    if (isPossible(teams, matches, matchIdx + 1)) return true;
    teams[teamA][2]++;
    teams[teamB][0]++;
  }

  return false;
}

// 모든 팀 간의 경기 조합 생성
const matches = [];
for (let i = 0; i < 6; i++) {
  for (let j = i + 1; j < 6; j++) {
    matches.push([i, j]);
  }
}

// 결과 계산
const results = testCases.map((teams) => {
  return isPossible(teams, matches, 0) ? 1 : 0;
});

console.log(results.join(' '));
