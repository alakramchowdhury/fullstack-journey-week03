/* =====================================================================
   DAY 19 · closures-starter.js · YOUR version: write each function
   ---------------------------------------------------------------------
   Open closures.html with Live Server. Every test starts as FAIL.
   Compare with closures-solutions.js only after you've tried.
   ===================================================================== */

function test(label, actual, expected) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${label}  →  ${JSON.stringify(actual)}${pass ? '' : `  (expected ${JSON.stringify(expected)})`}`);
}

console.log('--- 1. createCounter(start) ---');
function createCounter(start = 0) {
  // TODO: keep `let count = start` inside, and return an object with
  // increment(), decrement(), reset() and value() that use it.
  return { increment() {}, decrement() {}, reset() {}, value() {} };
}
const first = createCounter();
first.increment();
first.increment();
const second = createCounter(10);
second.decrement();
test('first counter', first.value(), 2);
test('second counter has its OWN count', second.value(), 9);
test('reset() goes back to the start value', first.reset(), 0);

console.log('--- 2. once(fn) ---');
function once(fn) {
  // TODO: return a function that calls fn only the first time,
  // and returns that first result on every later call.
  return fn;
}
let launches = 0;
const launch = once(() => {
  launches++;
  return 'launched';
});
launch();
launch();
test('the function ran once', launches, 1);

console.log('--- 3. makeMultiplier(factor) ---');
function makeMultiplier(factor) {
  // TODO: return a function that multiplies its argument by factor
}
test('makeMultiplier(3)(5)', makeMultiplier(3)?.(5), 15);

console.log('--- 4. createIdGenerator(prefix) ---');
function createIdGenerator(prefix) {
  // TODO: return a function that gives 'task-1', then 'task-2', …
  return () => '';
}
const taskId = createIdGenerator('task');
taskId();
test('the second id', taskId(), 'task-2');

console.log('--- 5. debounce(fn, ms) ---');
function debounce(fn, ms) {
  // TODO: return a function that waits `ms` milliseconds after the LAST call, then calls fn.
  // Hint: remember a timer id; clearTimeout it on every call; start a new setTimeout.
  return fn;
}
let searches = 0;
const search = debounce(() => searches++, 100);
search();
search();
search();
setTimeout(() => test('debounce: 3 quick calls → 1 real call', searches, 1), 250);
