/* =====================================================================
   DAY 15 · arrays-starter.js · YOUR version: write each function body
   ---------------------------------------------------------------------
   Open arrays.html with Live Server. Results appear on the page and in
   the Console (F12). Every exercise starts as FAIL: make them all PASS.
   Compare with arrays-solutions.js only after you've tried.
   Part 1 of the solutions file shows push, pop, slice, splice… Read it first.
   ===================================================================== */

function test(label, actual, expected) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${label}  →  ${JSON.stringify(actual)}${pass ? '' : `  (expected ${JSON.stringify(expected)})`}`);
}

const scores = [72, 45, 91, 60, 88, 45];

console.log('--- 1. double(numbers) ---');
function double(numbers) {
  // TODO: return a NEW array with every number doubled. Hint: map
}
test('double([1, 2, 3])', double([1, 2, 3]), [2, 4, 6]);

console.log('--- 2. keepEvens(numbers) ---');
function keepEvens(numbers) {
  // TODO: return only the even numbers. Hint: filter and %
}
test('keepEvens([1…6])', keepEvens([1, 2, 3, 4, 5, 6]), [2, 4, 6]);

console.log('--- 3. sum(numbers) ---');
function sum(numbers) {
  // TODO: add them all up. Hint: reduce with a start value of 0 (or a for...of loop)
}
test('sum([10, 20, 30])', sum([10, 20, 30]), 60);
test('sum([]) → 0', sum([]), 0);

console.log('--- 4. max(numbers) ---');
function max(numbers) {
  // TODO: return the biggest number. Try Math.max with ... first, then write it with a loop
}
test('max(scores)', max(scores), 91);

console.log('--- 5. sortNumbers(numbers) ---');
function sortNumbers(numbers) {
  // TODO: return a sorted COPY, smallest first. Hint: [...numbers].sort((a, b) => a - b)
}
test('sortNumbers([10, 9, 100, 1])', sortNumbers([10, 9, 100, 1]), [1, 9, 10, 100]);
const original = [3, 1, 2];
sortNumbers(original);
test('the original is unchanged', original, [3, 1, 2]);

console.log('--- 6. unique(items) ---');
function unique(items) {
  // TODO: remove duplicates, keep the first of each. Hint: new Set(items)
}
test('unique([1, 2, 2, 3, 1])', unique([1, 2, 2, 3, 1]), [1, 2, 3]);

console.log('--- 7. findFirstAbove(numbers, limit) ---');
function findFirstAbove(numbers, limit) {
  // TODO: the first number greater than limit, or undefined. Hint: find
}
test('first score above 80', findFirstAbove(scores, 80), 91);
test('none above 100 → undefined', findFirstAbove(scores, 100), undefined);

console.log('--- 8. anyFailed(numbers) and allPassed(numbers) ---');
function anyFailed(numbers) {
  // TODO: true if ANY score is under 50. Hint: some
}
function allPassed(numbers) {
  // TODO: true if EVERY score is 50 or more. Hint: every
}
test('anyFailed(scores)', anyFailed(scores), true);
test('allPassed(scores)', allPassed(scores), false);

console.log('--- 9. countAbove(numbers, limit) ---');
function countAbove(numbers, limit) {
  // TODO: how many numbers are greater than limit? Hint: filter, then .length
}
test('scores above 60', countAbove(scores, 60), 3);

console.log('--- 10. topThree(numbers) ---');
function topThree(numbers) {
  // TODO: the three biggest, biggest first, without changing the original
}
test('topThree(scores)', topThree(scores), [91, 88, 72]);
test('scores still in the original order', scores, [72, 45, 91, 60, 88, 45]);
