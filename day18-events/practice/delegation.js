/* =====================================================================
   DAY 18 · delegation.js · One listener on the parent, not one per item
   ---------------------------------------------------------------------
   A click on a button INSIDE the <ul> "bubbles up" to the <ul>, so one
   listener there hears every click. event.target says what was clicked;
   closest() finds the element we care about.
   ===================================================================== */

const list = document.getElementById('lessons');
const log = document.getElementById('log');

list.addEventListener('click', (event) => {
  const item = event.target.closest('li');
  if (!item) return;                                      // clicked the gap between items

  if (event.target.closest('.delete')) {
    log.textContent = `Deleted "${item.querySelector('.lesson').textContent}" · target: .delete button`;
    item.remove();
    return;
  }
  if (event.target.closest('.lesson')) {
    const isDone = item.classList.toggle('done');
    log.textContent = `${isDone ? 'Done' : 'Not done'}: "${event.target.textContent}" · target: .lesson button`;
  }
});

// New items need NO new listener: the <ul> listener already covers them.
document.getElementById('lesson-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.getElementById('lesson-input');
  const text = input.value.trim();
  if (text === '') return;

  const item = document.createElement('li');
  const lesson = document.createElement('button');
  lesson.className = 'lesson';
  lesson.type = 'button';
  lesson.textContent = text;
  const remove = document.createElement('button');
  remove.className = 'delete';
  remove.type = 'button';
  remove.setAttribute('aria-label', 'Delete');
  remove.textContent = '×';
  item.append(lesson, remove);
  list.append(item);

  input.value = '';
  log.textContent = `Added "${text}". Click it: it works, with no new listener.`;
});
