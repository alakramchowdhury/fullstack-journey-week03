# Day 17 · The DOM: select, create, update

**Goal:** find elements, create new ones, change text, classes and attributes, and make the tabs work.

## Files

| File | What it shows |
|---|---|
| `practice/dom-playground.html` + `.js` | Five exercises: render a list from an array, dark mode with `classList.toggle`, a + / − counter, textContent vs innerHTML, and `data-*` attributes |
| `widgets/js/main.js` | NEW section 3: `selectTab()` shows one panel and hides the rest, with `aria-selected` |
| `dsa/217-contains-duplicate.js` | LeetCode 217 solved three ways (pairs, sort, Set) |

## Steps

1. Open `practice/dom-playground.html` and try each section. In section 4, type `<b>Rahim</b>` and compare the two outputs.
2. Rebuild the counter from memory in a new file.
3. Make the tabs clickable: write `selectTab(root, tab)`, then add a click listener to each tab.
4. Test with the keyboard: Tab to the tab list, press Enter on a tab.
5. Solve **Contains Duplicate**, then compare with `dsa/217-contains-duplicate.js`.
6. Commit: `git commit -m "Day 17: DOM playground and working tabs"`
