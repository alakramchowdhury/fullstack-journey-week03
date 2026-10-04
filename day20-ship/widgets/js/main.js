/* =====================================================================
   DAY 20 · js/main.js · The entry point: it imports the modules and starts them
   ---------------------------------------------------------------------
   Yesterday everything lived in one 250-line file. Today each widget has
   its own module (file), and this file just connects them:

     main.js ──imports──▶ tracks-data.js   the tabs' data
                          tabs.js          renderTabs(), setupTabs()
                          modal.js         setupModal()
                          todo.js          setupTodo()  ──imports──▶ storage.js

   Loaded with <script type="module" src="js/main.js">. Modules need a web
   server (Live Server or Vercel): opened as a file, the browser blocks the imports.
   ===================================================================== */

import { tracks } from './tracks-data.js';
import { renderTabs, setupTabs } from './tabs.js';
import { setupModal } from './modal.js';
import { setupTodo } from './todo.js';

// 1. Tabs
const tracksRoot = document.getElementById('tracks');
renderTabs(tracksRoot, tracks);
setupTabs(tracksRoot);

// 2. Modal
setupModal({
  openButton: document.getElementById('open-call'),
  dialog: document.getElementById('call-dialog'),
  status: document.getElementById('call-status'),
});

// 3. To-do list
setupTodo(document.getElementById('todo-title').closest('.widget'));

// 4. The year in the footer
document.getElementById('year').textContent = new Date().getFullYear();
