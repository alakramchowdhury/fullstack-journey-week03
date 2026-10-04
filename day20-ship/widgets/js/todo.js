/* =====================================================================
   DAY 20 · js/todo.js · The finished to-do list
   ---------------------------------------------------------------------
   New since Day 19: filters (All / Active / Done), editing a task,
   "Clear done", an empty-state message, and saving to localStorage.

   Same golden rule as yesterday, now with one `state` object:
     event handler → change the state → update(): save + render()
   ===================================================================== */

import { load, save } from './storage.js';

const STORAGE_KEY = 'stackfield.todos.v1';   // "v1": change it if the data shape ever changes

const SAMPLE_TODOS = [
  { id: 't1', text: 'Read the arrays chapter', done: true },
  { id: 't2', text: 'Solve Two Sum on LeetCode', done: false },
  { id: 't3', text: 'Deploy the widgets page', done: false },
];

const FILTERS = {                             // one test function per filter
  all: () => true,
  active: (todo) => !todo.done,
  done: (todo) => todo.done,
};

const EMPTY_MESSAGES = {
  all: 'Nothing here yet. Add your first task above.',
  active: 'No active tasks. Nice work!',
  done: 'No finished tasks yet.',
};

function createId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

export function setupTodo(root) {
  const form = root.querySelector('#todo-form');
  const input = root.querySelector('#todo-input');
  const list = root.querySelector('#todo-list');
  const empty = root.querySelector('#todo-empty');
  const count = root.querySelector('#todo-count');
  const clearDone = root.querySelector('#clear-done');
  const filterGroup = root.querySelector('.todo-filters');

  // ---------------------------------------------------------------- state
  const state = {
    todos: load(STORAGE_KEY, SAMPLE_TODOS),   // saved tasks, or the samples on the first visit
    filter: 'all',
    editingId: null,                           // the id of the task being edited, if any
  };

  /** Save the tasks, then redraw. Every change goes through here. */
  function update() {
    save(STORAGE_KEY, state.todos);
    render();
  }

  // ---------------------------------------------------------------- render
  function createItem(todo) {
    const item = document.createElement('li');
    item.className = 'todo-item';
    item.classList.toggle('is-done', todo.done);
    item.dataset.id = todo.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-toggle';
    checkbox.id = `todo-${todo.id}`;
    checkbox.checked = todo.done;
    checkbox.setAttribute('aria-label', `Done: ${todo.text}`);
    item.append(checkbox);

    if (todo.id === state.editingId) {
      // Editing: a text box instead of the label
      const editor = document.createElement('input');
      editor.className = 'todo-edit';
      editor.value = todo.text;
      editor.maxLength = 80;
      editor.setAttribute('aria-label', 'Edit task');
      item.append(editor);
    } else {
      const label = document.createElement('label');
      label.className = 'todo-text';
      label.htmlFor = checkbox.id;
      label.textContent = todo.text;

      const edit = document.createElement('button');
      edit.type = 'button';
      edit.className = 'icon-button todo-edit-button';
      edit.textContent = '✎';
      edit.setAttribute('aria-label', `Edit: ${todo.text}`);

      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'icon-button todo-delete';
      remove.textContent = '×';
      remove.setAttribute('aria-label', `Delete: ${todo.text}`);

      item.append(label, edit, remove);
    }
    return item;
  }

  function render() {
    const visible = state.todos.filter(FILTERS[state.filter]);
    list.replaceChildren(...visible.map(createItem));

    // Empty state: a friendly message instead of a blank box
    empty.hidden = visible.length > 0;
    empty.textContent = EMPTY_MESSAGES[state.filter];

    const left = state.todos.filter(FILTERS.active).length;
    count.textContent = `${left} ${left === 1 ? 'task' : 'tasks'} left`;
    clearDone.disabled = !state.todos.some(FILTERS.done);

    filterGroup.querySelectorAll('.filter').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.filter === state.filter));
    });

    // If a task is being edited, put the cursor in its text box
    const editor = list.querySelector('.todo-edit');
    if (editor) {
      editor.focus();
      editor.select();
    }
  }

  // ---------------------------------------------------------------- actions
  function addTodo(text) {
    state.todos = [...state.todos, { id: createId(), text, done: false }];
    update();
  }

  function toggleTodo(id, done) {
    state.todos = state.todos.map((todo) => (todo.id === id ? { ...todo, done } : todo));
    update();
  }

  function deleteTodo(id) {
    state.todos = state.todos.filter((todo) => todo.id !== id);
    update();
  }

  function saveEdit(id, text) {
    state.editingId = null;
    const clean = text.trim();
    if (clean !== '') {                        // an empty edit keeps the old text
      state.todos = state.todos.map((todo) => (todo.id === id ? { ...todo, text: clean } : todo));
    }
    update();
  }

  function cancelEdit() {
    state.editingId = null;
    render();
  }

  // ---------------------------------------------------------------- events
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (text === '') return;
    if (state.filter === 'done') state.filter = 'all';   // so the new task is visible
    addTodo(text);
    input.value = '';
    input.focus();
  });

  // Checkboxes (delegated 'change')
  list.addEventListener('change', (event) => {
    if (!event.target.matches('.todo-toggle')) return;
    const id = event.target.closest('.todo-item').dataset.id;
    toggleTodo(id, event.target.checked);
    // The list was rebuilt: focus the new checkbox, or the input if the filter hid it
    (list.querySelector(`#todo-${id}`) ?? input).focus();
  });

  // Edit and delete buttons (delegated 'click')
  list.addEventListener('click', (event) => {
    const item = event.target.closest('.todo-item');
    if (!item) return;
    if (event.target.closest('.todo-delete')) {
      deleteTodo(item.dataset.id);
      input.focus();
    } else if (event.target.closest('.todo-edit-button')) {
      state.editingId = item.dataset.id;
      render();
    }
  });

  // While editing: Enter saves, Escape cancels
  list.addEventListener('keydown', (event) => {
    if (!event.target.matches('.todo-edit')) return;
    const id = event.target.closest('.todo-item').dataset.id;
    if (event.key === 'Enter') saveEdit(id, event.target.value);
    if (event.key === 'Escape') cancelEdit();
  });

  // Clicking somewhere else also saves. 'focusout' bubbles ('blur' doesn't), so delegation works.
  list.addEventListener('focusout', (event) => {
    if (!event.target.matches('.todo-edit') || state.editingId === null) return;
    saveEdit(event.target.closest('.todo-item').dataset.id, event.target.value);
  });

  // Filters (delegated 'click' on the button group)
  filterGroup.addEventListener('click', (event) => {
    const button = event.target.closest('.filter');
    if (!button) return;
    state.filter = button.dataset.filter;
    render();
  });

  clearDone.addEventListener('click', () => {
    state.todos = state.todos.filter(FILTERS.active);
    update();
  });

  render();
}
