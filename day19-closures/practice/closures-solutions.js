/* =====================================================================
   DAY 19 · closures-solutions.js · Closures, timers and debouncing
   ---------------------------------------------------------------------
   A closure is a function that REMEMBERS the variables from the place
   where it was created, even after that outer function has finished.
   Open closures-solutions.html. The timer tests finish a moment later.
   ===================================================================== */

function test(label, actual, expected) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${label}  →  ${JSON.stringify(actual)}${pass ? '' : `  (expected ${JSON.stringify(expected)})`}`);
}


console.log('--- A. A function that makes functions ---');
function makeGreeter(greeting) {
  // The inner function uses `greeting`, which belongs to makeGreeter.
  return function (name) {
    return `${greeting}, ${name}!`;
  };
}
const hello = makeGreeter('Hello');                // makeGreeter has finished…
const salaam = makeGreeter('Assalamu alaikum');
test('hello remembers "Hello"', hello('Rahim'), 'Hello, Rahim!');      // …but greeting is still there
test('salaam remembers its own greeting', salaam('Nadia'), 'Assalamu alaikum, Nadia!');


console.log('--- 1. createCounter(start): private state ---');
function createCounter(start = 0) {
  let count = start;                               // only the four functions below can reach this
  return {
    increment() { count++; return count; },
    decrement() { count--; return count; },
    reset() { count = start; return count; },
    value() { return count; },
  };
}
const first = createCounter();
first.increment();
first.increment();
const second = createCounter(10);
second.decrement();
test('first counter', first.value(), 2);
test('second counter has its OWN count', second.value(), 9);
test('count is private: first.count', first.count, undefined);
test('reset() goes back to the start value', first.reset(), 0);


console.log('--- 2. once(fn): run a function only the first time ---');
function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;                                 // later calls return the first result
  };
}
let launches = 0;
const launch = once(() => {
  launches++;
  return 'launched';
});
launch();
launch();
test('the function ran once', launches, 1);
test('later calls return the first result', launch(), 'launched');


console.log('--- 3. makeMultiplier(factor) ---');
const makeMultiplier = (factor) => (n) => n * factor;   // an arrow that returns an arrow
const triple = makeMultiplier(3);
test('triple(5)', triple(5), 15);
test('used as a callback in map', [1, 2, 3].map(makeMultiplier(10)), [10, 20, 30]);


console.log('--- 4. createIdGenerator(prefix) ---');
function createIdGenerator(prefix) {
  let next = 1;
  return () => `${prefix}-${next++}`;              // next++ gives the value, THEN adds 1
}
const taskId = createIdGenerator('task');
taskId();
test('the second id', taskId(), 'task-2');
test('a separate generator starts again at 1', createIdGenerator('note')(), 'note-1');


console.log('--- 5. var vs let in a loop (a classic interview question) ---');
const withVar = [];
for (var i = 0; i < 3; i++) withVar.push(() => i);        // ONE i, shared by all three functions
const withLet = [];
for (let j = 0; j < 3; j++) withLet.push(() => j);        // a NEW j for every lap
test('var: all three see the final i', withVar.map((fn) => fn()), [3, 3, 3]);
test('let: each keeps its own j', withLet.map((fn) => fn()), [0, 1, 2]);


console.log('--- 6. debounce(fn, ms): wait until the calls stop ---');
function debounce(fn, ms) {
  let timerId;                                     // remembered between calls: a closure again
  return function (...args) {
    clearTimeout(timerId);                         // cancel the previous wait…
    timerId = setTimeout(() => fn(...args), ms);   // …and start a new one
  };
}
let searches = 0;
let lastQuery = '';
const search = debounce((query) => {
  searches++;
  lastQuery = query;
}, 100);
search('j');
search('ja');
search('jav');
search('java');                                    // four calls in a row, no pause
setTimeout(() => {
  test('debounce: 4 quick calls → 1 real call', searches, 1);
  test('debounce: with the LAST value', lastQuery, 'java');
}, 250);


console.log('--- 7. setTimeout and setInterval ---');
let ticks = 0;
const intervalId = setInterval(() => {
  ticks++;
  if (ticks === 3) {
    clearInterval(intervalId);                     // always stop an interval you started
    test('setInterval ran 3 times, then stopped', ticks, 3);
  }
}, 50);
console.log('This line prints BEFORE the timer tests: timers run later.');
