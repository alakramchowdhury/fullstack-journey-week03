/* =====================================================================
   DAY 19 · theme.js · Save a preference and read it back on the next visit
   ---------------------------------------------------------------------
   localStorage.setItem(key, value)  save (value is stored as a STRING)
   localStorage.getItem(key)         read (null if nothing was saved)
   localStorage.removeItem(key)      delete
   The data stays after a reload or restart, for this website only.
   ===================================================================== */

const KEY = 'theme';
const buttons = document.querySelectorAll('#theme-buttons button');
const savedText = document.getElementById('saved');

// If the visitor never chose, follow their operating system's setting.
function systemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;       // <html data-theme="dark">
  buttons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.theme === theme));
  });
  const stored = localStorage.getItem(KEY);
  savedText.textContent = stored === null
    ? 'Nothing saved yet: following your system setting.'
    : `Saved in localStorage: ${KEY} = "${stored}"`;
}

document.getElementById('theme-buttons').addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  localStorage.setItem(KEY, button.dataset.theme);      // 1. save
  applyTheme(button.dataset.theme);                      // 2. show
});

document.getElementById('forget').addEventListener('click', () => {
  localStorage.removeItem(KEY);
  applyTheme(systemTheme());
});

// On page load: the saved choice, or the system setting
applyTheme(localStorage.getItem(KEY) ?? systemTheme());
