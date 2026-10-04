/* =====================================================================
   DAY 21 · filter-task-starter.js · YOUR 30-minute task (no copying!)
   ---------------------------------------------------------------------
   The data and the page are ready. Write the JavaScript:
     1. render(): one <li class="card"> per resource (title, minutes, level badge)
     2. filter by the search text (case-insensitive) AND by the level
     3. "N of 12 resources" in #summary; show #empty when nothing matches
   Suggested shape: state → getVisible() → render(). Use textContent, not innerHTML.
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

// TODO 1: function getVisible() → the resources that match the search text and the level

// TODO 2: function createCard(resource) → an <li class="card"> element

// TODO 3: function render() → fill #cards, update #summary, show or hide #empty

// TODO 4: call render() on 'input' in the search box and on 'change' in the select

// TODO 5: call render() once when the page loads
