# Day 16 · Objects and JSON

**Goal:** model real data as objects and arrays of objects, pull values out with destructuring, save data as JSON, and build the tabs from data.

## Files

| File | What it shows |
|---|---|
| `practice/objects-demo.js` | Nine parts (A–I): dot vs bracket, methods, destructuring, spread and rest, copies vs references, `Object.entries`, JSON, `?.` and `??`. Open `objects.html` |
| `practice/expenses-starter.js` | Five expense functions for you to write (open `expenses.html`) |
| `practice/expenses-solutions.js` | Totals by category with `reduce`, sort by amount, group by month, format as taka |
| `widgets/js/main.js` | NEW: the tabs' content is an array of objects, and `renderTabs()` builds the tabs from it |
| `widgets/index.html` | The tabs container is now empty: JavaScript fills it |
| `dsa/1672-richest-customer-wealth.js` | LeetCode 1672 solved three ways |

## Steps

1. Open `practice/objects.html` and read `objects-demo.js` part by part. Predict each PASS line before you read it.
2. Write the five functions in `practice/expenses-starter.js` (open `expenses.html`).
3. In the widgets, move the tab content into a `tracks` array and write `renderTabs()`. Compare with `widgets/js/main.js`.
4. Solve **Richest Customer Wealth**, then compare with `dsa/1672-richest-customer-wealth.js`.
5. Commit: `git commit -m "Day 16: objects, expense utilities and data-driven tabs"`
