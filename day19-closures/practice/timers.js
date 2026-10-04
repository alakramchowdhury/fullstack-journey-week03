/* =====================================================================
   DAY 19 · timers.js · setInterval, clearInterval and a debounced search
   ===================================================================== */


// ---------------------------------------------------------------------
// 1. Focus timer
// ---------------------------------------------------------------------
const START_SECONDS = 60;
let secondsLeft = START_SECONDS;
let intervalId = null;                     // null = not running

const clock = document.getElementById('clock');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');

function formatTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;          // 65 → "01:05"
}

function renderClock() {
  clock.textContent = formatTime(secondsLeft);
  startButton.disabled = intervalId !== null || secondsLeft === 0;
  pauseButton.disabled = intervalId === null;
}

function stop() {
  clearInterval(intervalId);               // stop the repeating callback
  intervalId = null;
}

startButton.addEventListener('click', () => {
  intervalId = setInterval(() => {         // run this every 1000 ms
    secondsLeft--;
    if (secondsLeft === 0) stop();         // time's up: stop the interval
    renderClock();
    if (secondsLeft === 0) clock.textContent = 'Done!';
  }, 1000);
  renderClock();
});

pauseButton.addEventListener('click', () => {
  stop();
  renderClock();
});

document.getElementById('reset').addEventListener('click', () => {
  stop();
  secondsLeft = START_SECONDS;
  renderClock();
});

renderClock();


// ---------------------------------------------------------------------
// 2. Debounced search
// ---------------------------------------------------------------------
const topics = [
  'Arrays', 'Array methods', 'map', 'filter', 'reduce', 'Objects', 'JSON', 'Destructuring',
  'Spread and rest', 'The DOM', 'querySelector', 'Events', 'Event delegation', 'Closures',
  'setTimeout', 'setInterval', 'Debounce', 'localStorage', 'ES modules', 'Two Sum',
];

function debounce(fn, ms) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), ms);
  };
}

const searchInput = document.getElementById('search');
const useDebounce = document.getElementById('use-debounce');
const stats = document.getElementById('stats');
const results = document.getElementById('results');
let keyPresses = 0;
let filtersRun = 0;

function showStats() {
  stats.textContent = `Key presses: ${keyPresses} · Filters run: ${filtersRun}`;
}

// Imagine this function were slow, or asked a server for results: you'd want to run it rarely.
function runFilter(query) {
  filtersRun++;
  const matches = topics.filter((topic) => topic.toLowerCase().includes(query.toLowerCase()));
  results.replaceChildren(...matches.map((topic) => {
    const li = document.createElement('li');
    li.textContent = topic;
    return li;
  }));
  showStats();
}

const debouncedFilter = debounce(runFilter, 300);

searchInput.addEventListener('input', () => {
  keyPresses++;
  showStats();
  if (useDebounce.checked) debouncedFilter(searchInput.value);
  else runFilter(searchInput.value);
});

runFilter('');
filtersRun = 0;          // don't count the first, automatic run
showStats();
