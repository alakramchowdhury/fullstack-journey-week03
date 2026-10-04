/* =====================================================================
   DAY 20 · js/modal.js · The "book a call" dialog (Day 18 code, now a module)
   ---------------------------------------------------------------------
   export: setupModal({ openButton, dialog, status })
   The function takes ONE object and destructures it, so the call reads
   like a sentence and the order of the arguments doesn't matter.
   ===================================================================== */

export function setupModal({ openButton, dialog, status }) {
  const form = dialog.querySelector('form');

  openButton.addEventListener('click', () => {
    status.textContent = '';
    dialog.showModal();
  });

  // The × and Cancel buttons close it.
  dialog.querySelectorAll('#close-call, #cancel-call').forEach((button) => {
    button.addEventListener('click', () => dialog.close());
  });

  // A click on the dark backdrop has the <dialog> itself as its target.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  // However it closes (buttons, backdrop, Escape, submit), focus goes back to the opener.
  dialog.addEventListener('close', () => openButton.focus());

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const { name, day } = Object.fromEntries(new FormData(form));   // { name: '…', day: '…' }
    dialog.close();
    status.textContent = `Thanks, ${name.trim()}! A mentor will call you on ${day} evening.`;
    form.reset();
  });
}
