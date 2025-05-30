function solution(new_id) {
  var answer = '';

  const step1 = new_id.toLowerCase();
  const step2 = step1.replace(/[^a-z0-9-_.]/g, '');
  const step3 = step2.replace(/\.{2,}/g, '.');
  const step4 = step3.replace(/^\.|\.$/g, '');
  const step5 = step4.length === 0 ? 'a' : step4;
  const step6 =
    step5.length >= 16 ? step5.slice(0, 15).replace(/\.$/, '') : step5;
  const step7 =
    step6.length < 3
      ? step6 + step6[step6.length - 1].repeat(3 - step6.length)
      : step6;

  answer = step7;
  return answer;
}
