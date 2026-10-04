/* =====================================================================
   DAY 16 · js/main.js · The tabs' content comes from DATA
   ---------------------------------------------------------------------
   Yesterday the four tabs were written by hand in the HTML.
   Today the content lives in ONE array of objects (tracks), and
   renderTabs() builds the buttons and panels from it.
   Want a fifth tab? Add one object to the array. No HTML changes.

   The tabs don't switch yet: that's tomorrow (Day 17).
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
// 2. Build one tab button and one panel for each object
// ---------------------------------------------------------------------
/**
 * Creates the tab buttons and panels inside `root` from the `items` array.
 * The first item starts selected; the other panels start hidden.
 */
function renderTabs(root, items) {
  const list = root.querySelector('.tab-list');
  const panels = root.querySelector('.tab-panels');

  items.forEach((item, index) => {
    const isFirst = index === 0;

    // The button
    const tab = document.createElement('button');
    tab.className = 'tab';
    tab.type = 'button';
    tab.id = `tab-${item.id}`;
    tab.textContent = item.title;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', String(isFirst));
    tab.setAttribute('aria-controls', `panel-${item.id}`);
    if (!isFirst) tab.tabIndex = -1;       // only the selected tab is in the Tab order
    list.append(tab);

    // The panel
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

    // map() turns each topic string into an <li> element
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

const tracksRoot = document.getElementById('tracks');
renderTabs(tracksRoot, tracks);

console.log(`Rendered ${tracks.length} tabs:`, tracks.map((track) => track.title).join(', '));
