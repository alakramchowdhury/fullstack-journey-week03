/* =====================================================================
   DAY 20 · js/tabs.js · Tabs, built from data (Days 16–18 code, now a module)
   ---------------------------------------------------------------------
   export: renderTabs(root, items) and setupTabs(root).
   selectTab() is NOT exported: it's a private helper of this module.
   ===================================================================== */

/** Creates the tab buttons and panels inside `root` from the `items` array. */
export function renderTabs(root, items) {
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

function selectTab(root, selectedTab) {
  root.querySelectorAll('[role="tab"]').forEach((tab) => {
    const isSelected = tab === selectedTab;
    tab.setAttribute('aria-selected', String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !isSelected;
  });
}

/** Click (one delegated listener) and ← → Home End keys. */
export function setupTabs(root) {
  const list = root.querySelector('.tab-list');

  list.addEventListener('click', (event) => {
    const tab = event.target.closest('[role="tab"]');
    if (tab) selectTab(root, tab);
  });

  list.addEventListener('keydown', (event) => {
    const tabs = [...list.querySelectorAll('[role="tab"]')];
    const current = tabs.indexOf(document.activeElement);
    if (current === -1) return;

    const moves = {                           // a lookup object instead of if / else if
      ArrowRight: (current + 1) % tabs.length,
      ArrowLeft: (current - 1 + tabs.length) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    };
    const next = moves[event.key];
    if (next === undefined) return;           // not one of our keys

    event.preventDefault();
    tabs[next].focus();
    selectTab(root, tabs[next]);
  });
}
