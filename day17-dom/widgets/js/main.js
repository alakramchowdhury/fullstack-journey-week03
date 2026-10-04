/* =====================================================================
   DAY 17 · js/main.js · Working tabs
   ---------------------------------------------------------------------
   Day 16 + section 3: clicking a tab selects it.
   "Selecting" = one tab gets aria-selected="true" and its panel is shown;
   every other tab gets "false" and its panel gets the hidden attribute.
   The CSS already styles [aria-selected="true"], so JS only switches states.
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
// 2. Build one tab button and one panel for each object (from Day 16)
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
// 3. Select a tab · NEW (Day 17)
// ---------------------------------------------------------------------
/**
 * Marks `selectedTab` as selected, shows its panel and hides all the others.
 */
function selectTab(root, selectedTab) {
  const tabs = root.querySelectorAll('[role="tab"]');

  tabs.forEach((tab) => {
    const isSelected = tab === selectedTab;
    tab.setAttribute('aria-selected', String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;

    // aria-controls holds the id of this tab's panel
    const panel = document.getElementById(tab.getAttribute('aria-controls'));
    panel.hidden = !isSelected;
  });
}

const tracksRoot = document.getElementById('tracks');
renderTabs(tracksRoot, tracks);

// One listener per tab button. (Tomorrow you'll replace these with ONE listener: event delegation.)
tracksRoot.querySelectorAll('[role="tab"]').forEach((tab) => {
  tab.addEventListener('click', () => selectTab(tracksRoot, tab));
});
