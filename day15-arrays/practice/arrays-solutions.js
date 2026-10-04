/* =====================================================================
   DAY 15 · arrays-solutions.js · Arrays and array methods, with answers
   ---------------------------------------------------------------------
   Part 1 (A–E) shows the basic tools. Part 2 has the 10 exercises.
   Open solutions.html with Live Server: results appear on the page
   and in the Console (F12).
   ===================================================================== */

// test() compares with JSON.stringify, so it works for arrays too:
// [1, 2] === [1, 2] is false (two different arrays), but their JSON text is equal.
function test(label, actual, expected) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${label}  →  ${JSON.stringify(actual)}${pass ? '' : `  (expected ${JSON.stringify(expected)})`}`);
}


// =====================================================================
// PART 1 · The basics
// =====================================================================

console.log('--- A. Creating arrays, indexes and length ---');
const days = ['Sat', 'Sun', 'Mon'];
test('days[0] is the first item', days[0], 'Sat');
test('length', days.length, 3);
test('the last item: days[length - 1]', days[days.length - 1], 'Mon');
test('the last item: days.at(-1)', days.at(-1), 'Mon');
test('past the end → undefined', days[5], undefined);


console.log('--- B. Adding and removing: these CHANGE the array ---');
const queue = ['a', 'b'];
queue.push('c');               // add to the END        → ['a', 'b', 'c']
queue.unshift('z');            // add to the START      → ['z', 'a', 'b', 'c']
const last = queue.pop();      // remove from the END   → returns 'c'
const first = queue.shift();   // remove from the START → returns 'z'
test('after push, unshift, pop, shift', queue, ['a', 'b']);
test('pop() returns what it removed', last, 'c');
test('shift() returns what it removed', first, 'z');


console.log('--- C. slice (copy a part) vs splice (cut out or insert) ---');
const letters = ['a', 'b', 'c', 'd', 'e'];
test('slice(1, 3): from index 1 up to (not including) 3', letters.slice(1, 3), ['b', 'c']);
test('slice(-2): the last two', letters.slice(-2), ['d', 'e']);
test('slice() left the original alone', letters, ['a', 'b', 'c', 'd', 'e']);

const removed = letters.splice(1, 2);          // at index 1, remove 2 items
test('splice() returns the removed items', removed, ['b', 'c']);
test('splice() CHANGED the original', letters, ['a', 'd', 'e']);
letters.splice(1, 0, 'X');                      // at index 1, remove 0, insert 'X'
test('splice() can also insert', letters, ['a', 'X', 'd', 'e']);


console.log('--- D. Searching ---');
const tags = ['html', 'css', 'js'];
test('includes("css")', tags.includes('css'), true);
test('indexOf("js")', tags.indexOf('js'), 2);
test('indexOf("php") → -1 when missing', tags.indexOf('php'), -1);


console.log('--- E. Looping: for...of and forEach ---');
let loopTotal = 0;
for (const n of [1, 2, 3]) {
  loopTotal += n;
}
test('for...of adds 1 + 2 + 3', loopTotal, 6);

const seen = [];
['x', 'y'].forEach((item, index) => {
  seen.push(`${index}:${item}`);                // forEach gives you the item AND its index
});
test('forEach(item, index)', seen, ['0:x', '1:y']);


// =====================================================================
// PART 2 · The 10 exercises
// =====================================================================
const scores = [72, 45, 91, 60, 88, 45];

console.log('--- 1. double(numbers): map ---');
// map() calls your function on every item and collects the results in a NEW array.
const double = (numbers) => numbers.map((n) => n * 2);
test('double([1, 2, 3])', double([1, 2, 3]), [2, 4, 6]);


console.log('--- 2. keepEvens(numbers): filter ---');
// filter() keeps the items for which your function returns true.
const keepEvens = (numbers) => numbers.filter((n) => n % 2 === 0);
test('keepEvens([1…6])', keepEvens([1, 2, 3, 4, 5, 6]), [2, 4, 6]);


console.log('--- 3. sum(numbers): reduce ---');
// reduce() carries a running value (the "accumulator") through the array.
// Here: total starts at 0, then 0 + 10 → 10, 10 + 20 → 30, 30 + 30 → 60.
const sum = (numbers) => numbers.reduce((total, n) => total + n, 0);
test('sum([10, 20, 30])', sum([10, 20, 30]), 60);
test('sum([]) → 0 thanks to the start value', sum([]), 0);


console.log('--- 4. max(numbers): three ways ---');
const maxSpread = (numbers) => Math.max(...numbers);        // ... spreads the array into arguments
const maxReduce = (numbers) => numbers.reduce((best, n) => (n > best ? n : best));
function maxLoop(numbers) {
  let best = numbers[0];
  for (const n of numbers) {
    if (n > best) best = n;
  }
  return best;
}
test('Math.max(...scores)', maxSpread(scores), 91);
test('reduce', maxReduce(scores), 91);
test('a loop', maxLoop(scores), 91);


console.log('--- 5. sortNumbers(numbers): sort with a compare function ---');
test('sort() with no function compares as TEXT', [10, 9, 100].sort(), [10, 100, 9]);
// (a, b) => a - b : negative → a first, positive → b first, 0 → keep the order.
const sortNumbers = (numbers) => [...numbers].sort((a, b) => a - b);   // copy first!
test('sortNumbers([10, 9, 100, 1])', sortNumbers([10, 9, 100, 1]), [1, 9, 10, 100]);
const original = [3, 1, 2];
sortNumbers(original);
test('the original is unchanged (we sorted a copy)', original, [3, 1, 2]);


console.log('--- 6. unique(items): remove duplicates, two ways ---');
const uniqueSet = (items) => [...new Set(items)];            // a Set keeps one of each value
const uniqueFilter = (items) => items.filter((item, index) => items.indexOf(item) === index);
test('with a Set', uniqueSet([1, 2, 2, 3, 1]), [1, 2, 3]);
test('with filter + indexOf', uniqueFilter(['a', 'b', 'a']), ['a', 'b']);


console.log('--- 7. findFirstAbove(numbers, limit): find ---');
// find() returns the FIRST matching item (or undefined). findIndex() returns its index.
const findFirstAbove = (numbers, limit) => numbers.find((n) => n > limit);
test('first score above 80', findFirstAbove(scores, 80), 91);
test('none above 100 → undefined', findFirstAbove(scores, 100), undefined);
test('findIndex of the first 45', scores.findIndex((s) => s === 45), 1);


console.log('--- 8. some and every ---');
test('some: did anyone score under 50?', scores.some((s) => s < 50), true);
test('every: did everyone pass (50+)?', scores.every((s) => s >= 50), false);


console.log('--- 9. countAbove(numbers, limit): filter + length ---');
const countAbove = (numbers, limit) => numbers.filter((n) => n > limit).length;
test('scores above 60', countAbove(scores, 60), 3);


console.log('--- 10. topThree(numbers): copy, sort high → low, slice ---');
const topThree = (numbers) => [...numbers].sort((a, b) => b - a).slice(0, 3);
test('topThree(scores)', topThree(scores), [91, 88, 72]);
test('scores still in the original order', scores, [72, 45, 91, 60, 88, 45]);


console.log('--- Bonus: chaining filter → map → reduce ---');
// The doubled even numbers, added up: [2, 4, 6] → [4, 8, 12] → 24
const chained = [1, 2, 3, 4, 5, 6]
  .filter((n) => n % 2 === 0)
  .map((n) => n * 2)
  .reduce((total, n) => total + n, 0);
test('filter → map → reduce', chained, 24);
