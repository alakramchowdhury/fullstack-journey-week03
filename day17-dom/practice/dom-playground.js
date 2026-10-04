/* =====================================================================
   DAY 17 · dom-playground.js · Select, create and update elements
   ===================================================================== */


// ---------------------------------------------------------------------
// 1. Render a list from an array
// ---------------------------------------------------------------------
const topics = ['Arrays', 'Objects', 'The DOM', 'Events', 'Closures'];
const topicList = document.querySelector('#topic-list');

function renderTopics() {
  // Way 1 (used here): build real elements. Safe for ANY text.
  const items = topics.map((topic, index) => {
    const li = document.createElement('li');
    li.textContent = topic;
    if (index >= 5) li.classList.add('is-new');   // topics you added yourself
    return li;
  });
  topicList.replaceChildren(...items);             // swap the old <li>s for the new ones

  // Way 2 (fine for YOUR OWN fixed data, never for user input):
  // topicList.innerHTML = topics.map((topic) => `<li>${topic}</li>`).join('');
}
renderTopics();

document.querySelector('#topic-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.querySelector('#topic-input');
  const text = input.value.trim();
  if (text === '') return;
  topics.push(text);          // 1. change the data
  renderTopics();             // 2. redraw from the data
  input.value = '';
});


// ---------------------------------------------------------------------
// 2. Dark mode: one class on <body>
// ---------------------------------------------------------------------
const themeButton = document.querySelector('#theme-button');
themeButton.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');   // toggle() returns true if the class is now on
  themeButton.setAttribute('aria-pressed', String(isDark));
  themeButton.textContent = `Dark mode: ${isDark ? 'on' : 'off'}`;
});


// ---------------------------------------------------------------------
// 3. A counter with + and −
// ---------------------------------------------------------------------
let count = 0;                                        // the state lives in a variable…
const countOutput = document.querySelector('#count');
const minusButton = document.querySelector('#minus');

function renderCount() {                              // …and the page shows it
  countOutput.textContent = count;
  minusButton.disabled = count === 0;                 // no negative numbers
}
document.querySelector('#plus').addEventListener('click', () => { count++; renderCount(); });
minusButton.addEventListener('click', () => { count--; renderCount(); });
document.querySelector('#reset').addEventListener('click', () => { count = 0; renderCount(); });
renderCount();


// ---------------------------------------------------------------------
// 4. textContent vs innerHTML
// ---------------------------------------------------------------------
// Type <b>Rahim</b>: textContent shows the tags as text, innerHTML makes it bold.
// Now imagine a visitor typed <img src=x onerror="stealCookies()">: innerHTML would
// create that image and RUN their code. That attack is called XSS (cross-site scripting).
// Rule: text from a person → textContent. innerHTML only for HTML you wrote yourself.
const nameInput = document.querySelector('#name-input');
function showName() {
  document.querySelector('#safe-output').textContent = `Hello, ${nameInput.value}!`;
  document.querySelector('#html-output').innerHTML = `Hello, ${nameInput.value}!`;   // ⚠ demo only
}
nameInput.addEventListener('input', showName);
showName();


// ---------------------------------------------------------------------
// 5. data-* attributes: element.dataset
// ---------------------------------------------------------------------
// <button data-size="large"> → button.dataset.size === 'large'
const sizeText = document.querySelector('#size-text');
document.querySelector('#size-buttons').addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  sizeText.classList.remove('size-small', 'size-medium', 'size-large');
  sizeText.classList.add(`size-${button.dataset.size}`);
});
