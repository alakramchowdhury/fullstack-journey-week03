/* =====================================================================
   DAY 21 · filter-task-solution.js · One way to build the filterable list
   ---------------------------------------------------------------------
   The same pattern as the to-do widget:
     the controls hold the "state" → getVisible() works out what to show
     → render() draws it. Every event simply calls render() again.
   ===================================================================== */

const resources = [
  { id: 1, title: 'Array methods explained', level: 'beginner', minutes: 25 },
  { id: 2, title: 'Objects and JSON in practice', level: 'beginner', minutes: 30 },
  { id: 3, title: 'Destructuring and spread', level: 'intermediate', minutes: 20 },
  { id: 4, title: 'The DOM: select and create', level: 'beginner', minutes: 35 },
  { id: 5, title: 'Event delegation', level: 'intermediate', minutes: 15 },
  { id: 6, title: 'Closures without the confusion', level: 'intermediate', minutes: 30 },
  { id: 7, title: 'Timers and debouncing', level: 'intermediate', minutes: 20 },
  { id: 8, title: 'localStorage basics', level: 'beginner', minutes: 15 },
  { id: 9, title: 'ES modules: import and export', level: 'intermediate', minutes: 25 },
  { id: 10, title: 'Sorting arrays of objects', level: 'beginner', minutes: 20 },
  { id: 11, title: 'Building a to-do app', level: 'beginner', minutes: 60 },
  { id: 12, title: 'Accessible tabs and modals', level: 'intermediate', minutes: 40 },
];

const searchInput = document.getElementById('search');
const levelSelect = document.getElementById('level');
const summary = document.getElementById('summary');
const cards = document.getElementById('cards');
const empty = document.getElementById('empty');

/** The resources that match BOTH the search text and the chosen level. */
function getVisible() {
  const query = searchInput.value.trim().toLowerCase();
  const level = levelSelect.value;
  return resources.filter((resource) => {
    const matchesText = resource.title.toLowerCase().includes(query);   // '' matches everything
    const matchesLevel = level === 'all' || resource.level === level;
    return matchesText && matchesLevel;
  });
}

/** One card. textContent keeps the text safe. */
function createCard({ title, level, minutes }) {
  const card = document.createElement('li');
  card.className = 'card';

  const heading = document.createElement('h2');
  heading.textContent = title;
  const time = document.createElement('p');
  time.textContent = `${minutes} minutes`;
  const badge = document.createElement('span');
  badge.className = `badge ${level}`;
  badge.textContent = level;

  card.append(heading, time, badge);
  return card;
}

function render() {
  const visible = getVisible();
  cards.replaceChildren(...visible.map(createCard));
  summary.textContent = `${visible.length} of ${resources.length} resources`;
  empty.hidden = visible.length > 0;
}

searchInput.addEventListener('input', render);
levelSelect.addEventListener('change', render);
render();
