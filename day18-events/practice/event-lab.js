/* =====================================================================
   DAY 18 · event-lab.js · What an event is, and how it travels
   ===================================================================== */


// ---------------------------------------------------------------------
// 1. Bubbling: a click on #inner is heard by #inner, then #middle, then #outer
// ---------------------------------------------------------------------
const bubbleLog = document.getElementById('bubble-log');
const stopAtMiddle = document.getElementById('stop-middle');

function logClick(event) {
  // event.target        = the element you actually clicked (never changes)
  // event.currentTarget = the element whose listener is running now (changes as it bubbles)
  bubbleLog.textContent += `listener on #${event.currentTarget.id.padEnd(6)} · target: #${event.target.id}\n`;

  if (event.currentTarget.id === 'middle' && stopAtMiddle.checked) {
    event.stopPropagation();                   // the click stops here: #outer never hears it
    bubbleLog.textContent += '(stopped in #middle)\n';
  }
}

['outer', 'middle', 'inner'].forEach((id) => {
  document.getElementById(id).addEventListener('click', logClick);
});

// Clear the log at the start of each new click (capture phase runs BEFORE the bubbling listeners)
document.getElementById('outer').addEventListener('click', () => {
  bubbleLog.textContent = '';
}, { capture: true });


// ---------------------------------------------------------------------
// 2. Keyboard: event.key is the character or key name; event.code is the physical key
// ---------------------------------------------------------------------
const keyLog = document.getElementById('key-log');
document.getElementById('key-box').addEventListener('keydown', (event) => {
  const line = `key: ${JSON.stringify(event.key).padEnd(12)} code: ${event.code.padEnd(12)} shift: ${event.shiftKey}`;
  keyLog.textContent = `${line}\n${keyLog.textContent}`.split('\n').slice(0, 6).join('\n');   // newest first, 6 lines
});


// ---------------------------------------------------------------------
// 3. preventDefault(): stop the browser's own action
// ---------------------------------------------------------------------
const defaultLog = document.getElementById('default-log');

document.getElementById('stay-link').addEventListener('click', (event) => {
  event.preventDefault();                      // no navigation
  defaultLog.textContent = `Link click stopped. It would have gone to ${event.currentTarget.href}`;
});

document.getElementById('demo-form').addEventListener('submit', (event) => {
  event.preventDefault();                      // no page reload
  const data = Object.fromEntries(new FormData(event.target));
  defaultLog.textContent = `Form submit stopped. The data: ${JSON.stringify(data)}`;
});
