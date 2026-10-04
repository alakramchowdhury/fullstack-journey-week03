/* =====================================================================
   DAY 19 · js/main.js · Day 18 + the to-do list, part 1
   ---------------------------------------------------------------------
   Sections 1–4 are the same as Day 18 (tabs and modal).
   Section 5 is new: a to-do list whose truth lives in an array, drawn
   by ONE render() function. Section 6 fills in the footer year.
   Tomorrow (Day 20) each widget moves into its own module file.
   ===================================================================== */


// ---------------------------------------------------------------------
// 1. The data: an array of objects, one object per tab
// ---------------------------------------------------------------------
const tracks = [
  {
    id: 'frontend',
    title: 'Frontend',
    months: 'Months 1–2',
    summary: 'Build interfaces people enjoy using, from the first HTML tag to React components.',
    topics: ['Semantic HTML and CSS', 'JavaScript and the DOM', 'TypeScript', 'React and Next.js'],
  },
  {
    id: 'backend',
    title: 'Backend',
    months: 'Month 3',
    summary: 'Write the server side: APIs that check their input, talk to a database and handle errors.',
    topics: ['Node.js and Express', 'REST API design', 'Validation with Zod', 'Error handling'],
  },
  {
    id: 'database',
    title: 'Databases',
    months: 'Months 3–4',
    summary: 'Store data safely and query it fast with PostgreSQL and Prisma.',
    topics: ['Tables and relations', 'SQL joins', 'Indexes', 'Transactions'],
  },
  {
    id: 'deploy',
    title: 'Deploy',
    months: 'Months 4–5',
    summary: 'Ship real software with containers, pipelines and monitoring.',
    topics: ['Git workflows', 'Docker', 'CI/CD pipelines', 'Monitoring'],
  },
];


// ---------------------------------------------------------------------
// 2. Build the tabs from the data (from Day 16)
// ---------------------------------------------------------------------
function renderTabs(root, items) {
  const list = root.querySelector('.tab-list');
  const panels = root.querySelector('.tab-panels');

  items.forEach((item, index) => {
    const isFirst = index === 0;

    const tab = document.createElement('button');
    tab.className = 'tab';
    tab.type = 'button';
    tab.id = `tab-${item.id}`;
    tab.textContent = item.title;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', String(isFirst));
    tab.setAttribute('aria-controls', `panel-${item.id}`);
    if (!isFirst) tab.tabIndex = -1;
    list.append(tab);

    const panel = document.createElement('div');
    panel.className = 'tab-panel';
    panel.id = `panel-${item.id}`;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
    panel.tabIndex = 0;
    panel.hidden = !isFirst;

    const meta = document.createElement('p');
    meta.className = 'panel-meta';
    meta.textContent = item.months;
    const heading = document.createElement('h3');
    heading.textContent = item.title;
    const summary = document.createElement('p');
    summary.textContent = item.summary;
    const topicList = document.createElement('ul');
    topicList.className = 'topic-list';
    topicList.append(...item.topics.map((topic) => {
      const li = document.createElement('li');
      li.textContent = topic;
      return li;
    }));

    panel.append(meta, heading, summary, topicList);
    panels.append(panel);
  });
}


// ---------------------------------------------------------------------
// 3. Selecting tabs: one delegated listener + arrow keys · UPDATED (Day 18)
// ---------------------------------------------------------------------
function selectTab(root, selectedTab) {
  root.querySelectorAll('[role="tab"]').forEach((tab) => {
    const isSelected = tab === selectedTab;
    tab.setAttribute('aria-selected', String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !isSelected;
  });
}

function setupTabs(root) {
  const list = root.querySelector('.tab-list');

  // Event delegation: ONE listener on the parent handles clicks on every tab,
  // including tabs added later. event.target is the element that was clicked;
  // closest() walks up from it to the nearest element that matches the selector.
  list.addEventListener('click', (event) => {
    const tab = event.target.closest('[role="tab"]');
    if (!tab) return;                       // the click was on the list, not on a tab
    selectTab(root, tab);
  });

  // Keyboard: ← → move to the previous / next tab, Home / End to the first / last.
  list.addEventListener('keydown', (event) => {
    const tabs = [...list.querySelectorAll('[role="tab"]')];   // a real array
    const current = tabs.indexOf(document.activeElement);
    if (current === -1) return;

    let next;
    if (event.key === 'ArrowRight') next = (current + 1) % tabs.length;             // wrap to the start
    else if (event.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length; // wrap to the end
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;                            // any other key: do nothing

    event.preventDefault();                 // stop Home/End from scrolling the page
    tabs[next].focus();
    selectTab(root, tabs[next]);
  });
}

const tracksRoot = document.getElementById('tracks');
renderTabs(tracksRoot, tracks);
setupTabs(tracksRoot);


// ---------------------------------------------------------------------
// 4. The modal dialog · NEW (Day 18)
// ---------------------------------------------------------------------
const openButton = document.getElementById('open-call');
const dialog = document.getElementById('call-dialog');
const callForm = document.getElementById('call-form');
const callStatus = document.getElementById('call-status');

// Open: showModal() puts the dialog on top, dims the page behind it (::backdrop),
// makes the rest of the page unclickable and moves focus inside (to the autofocus input).
openButton.addEventListener('click', () => {
  callStatus.textContent = '';
  dialog.showModal();
});

// Close with the × and Cancel buttons
document.getElementById('close-call').addEventListener('click', () => dialog.close());
document.getElementById('cancel-call').addEventListener('click', () => dialog.close());

// Close by clicking the dark backdrop. A click on the backdrop reaches the <dialog>
// element itself; a click on anything inside the form has a different target.
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

// Escape closes a modal <dialog> by itself. Whichever way it closes, the 'close'
// event fires: put keyboard focus back on the button that opened it.
dialog.addEventListener('close', () => {
  openButton.focus();
});

// Submit: the browser has already checked `required` before this event fires.
callForm.addEventListener('submit', (event) => {
  event.preventDefault();                   // no page reload
  const data = new FormData(callForm);      // reads every named field of the form
  const name = data.get('name').trim();
  const day = data.get('day');
  dialog.close();
  callStatus.textContent = `Thanks, ${name}! A mentor will call you on ${day} evening.`;
  callForm.reset();
});


// ---------------------------------------------------------------------
// 5. To-do list, part 1: state + one render() function · NEW (Day 19)
// ---------------------------------------------------------------------
// The golden rule of this widget:
//   1. The truth lives in the `todos` ARRAY (the "state"), not in the page.
//   2. Event handlers only change the array…
//   3. …then call render(), which rebuilds the list from the array.
// The page is always a picture of the state, so the two can never disagree.

let todos = [
  { id: 't1', text: 'Read the arrays chapter', done: true },
  { id: 't2', text: 'Solve Two Sum on LeetCode', done: false },
  { id: 't3', text: 'Build the to-do widget', done: false },
];

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const todoCount = document.getElementById('todo-count');

/** A short, unique-enough id: the time in base 36 plus 4 random characters. */
function createId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

/** Builds the <li> for one task. textContent keeps user text safe (never innerHTML). */
function createTodoItem(todo) {
  const item = document.createElement('li');
  item.className = 'todo-item';
  item.classList.toggle('is-done', todo.done);
  item.dataset.id = todo.id;                 // data-id="…": which task this row shows

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'todo-toggle';
  checkbox.id = `todo-${todo.id}`;
  checkbox.checked = todo.done;

  const label = document.createElement('label');
  label.className = 'todo-text';
  label.htmlFor = checkbox.id;               // clicking the text ticks the box
  label.textContent = todo.text;

  const remove = document.createElement('button');
  remove.type = 'button';
  remove.className = 'icon-button todo-delete';
  remove.textContent = '×';
  remove.setAttribute('aria-label', `Delete: ${todo.text}`);

  item.append(checkbox, label, remove);
  return item;
}

/** Rebuilds the whole list from the todos array. */
function render() {
  todoList.replaceChildren(...todos.map(createTodoItem));   // replace old rows with new ones
  const left = todos.filter((todo) => !todo.done).length;
  todoCount.textContent = `${left} ${left === 1 ? 'task' : 'tasks'} left`;
}

// ADD: read the input, add an object to the array, render.
todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = todoInput.value.trim();
  if (text === '') return;                    // ignore empty tasks
  todos.push({ id: createId(), text, done: false });
  todoInput.value = '';
  todoInput.focus();
  render();
});

// TOGGLE: one delegated 'change' listener for every checkbox, even new ones.
todoList.addEventListener('change', (event) => {
  if (!event.target.matches('.todo-toggle')) return;
  const id = event.target.closest('.todo-item').dataset.id;
  const todo = todos.find((t) => t.id === id);
  todo.done = event.target.checked;
  render();
  // render() replaced the checkbox with a new one: give keyboard focus back to it
  document.getElementById(`todo-${id}`).focus();
});

// DELETE: one delegated 'click' listener for every × button.
todoList.addEventListener('click', (event) => {
  const button = event.target.closest('.todo-delete');
  if (!button) return;
  const id = button.closest('.todo-item').dataset.id;
  todos = todos.filter((t) => t.id !== id);   // a new array without that task
  render();
  todoInput.focus();                           // the deleted row can't keep focus
});

render();


// ---------------------------------------------------------------------
// 6. The year in the footer
// ---------------------------------------------------------------------
document.getElementById('year').textContent = new Date().getFullYear();
