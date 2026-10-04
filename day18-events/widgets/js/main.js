/* =====================================================================
   DAY 18 · js/main.js · Events in depth
   ---------------------------------------------------------------------
   Changes since Day 17:
   · Section 3: the four tab listeners are replaced by ONE listener on the
     tab list (event delegation), and the arrow keys now move between tabs.
   · Section 4 is new: the modal dialog. It opens with a button, closes
     with ×, Cancel, Escape or a click on the dark backdrop, and gives
     keyboard focus back to the button that opened it.
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
