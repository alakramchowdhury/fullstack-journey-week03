# Day 20 · Build day: finish and ship the widgets

**Goal:** split the code into ES modules, finish the to-do list, and put the widgets page online. This is the Week 3 output.

## Files

| File | What it does |
|---|---|
| `widgets/index.html` | Loads `js/main.js` with `type="module"`; adds the to-do filters, empty state and "Clear done" |
| `widgets/js/main.js` | The entry point: imports the modules and starts each widget |
| `widgets/js/tracks-data.js` | The tabs' data (exports `tracks`) |
| `widgets/js/tabs.js` | `renderTabs()` and `setupTabs()` |
| `widgets/js/modal.js` | `setupModal()` |
| `widgets/js/todo.js` | The finished to-do list: filters, edit, clear done, empty state, saved with localStorage |
| `widgets/js/storage.js` | `load()` and `save()` for localStorage, with JSON and try / catch |
| `widgets/css/styles.css` | Section 9 is new: filters, the edit box, the empty state |
| `dsa/121-best-time-to-buy-and-sell-stock.js` | LeetCode 121 solved two ways |

## Step 1 · Modules (45 min)

1. Create one file per widget and move its code there. Add `export` to what other files need.
2. In `main.js`, `import` them and call each setup function.
3. Change the script tag to `<script type="module" src="js/main.js"></script>` and open the page with **Live Server** (modules don't work from a double-clicked file).

## Step 2 · Finish the to-do list (60 min)

- [ ] Filters: All / Active / Done, with `aria-pressed`
- [ ] Edit a task: ✎ button, Enter saves, Escape cancels
- [ ] "Clear done" and an empty-state message for each filter
- [ ] Save to localStorage on every change; load on start
- [ ] Reload the page: your tasks are still there

## Step 3 · Deploy (20 min)

1. Push to a new GitHub repository (e.g. `stackfield-widgets`) with `index.html` at the top level, or set the **Root Directory** in Vercel.
2. On Vercel: **Add New… → Project → Import → Deploy**.
3. Add the live link to your README and to your portfolio site from Week 1.

## Commit

```bash
git add .
git commit -m "Day 20: widgets as ES modules, finished to-do list, deployed"
git push
```
