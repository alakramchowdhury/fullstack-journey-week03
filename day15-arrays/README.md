# Day 15 · Arrays and array methods

**Goal:** store lists of values and transform them with `map`, `filter`, `reduce` and friends; then plan the three widgets and write their static HTML and CSS.

## Files

| File | What it shows |
|---|---|
| `practice/arrays-starter.js` | The 10 exercises for you to write. **Start here** (open `arrays.html`) |
| `practice/arrays-solutions.js` | Part 1: push, pop, shift, unshift, slice vs splice, includes, loops. Part 2: the 10 exercises solved (40 PASS) |
| `widgets/plan.md` | The plan: what each widget does, its states, and the data it will use |
| `widgets/index.html` + `css/styles.css` | The three widgets, static: HTML and CSS only, no JavaScript yet |
| `dsa/1480-running-sum.js` | LeetCode 1480 solved three ways |

## Steps

1. Read Part 1 of `practice/arrays-solutions.js`, predicting each result before you open `solutions.html`.
2. Open `practice/arrays.html` and write each function in `arrays-starter.js` until every test passes.
3. Read `widgets/plan.md`, then write the widgets' HTML and CSS yourself. Compare with `widgets/`.
4. Solve **Running Sum of 1d Array** on LeetCode, then compare with `dsa/1480-running-sum.js`.
5. Commit:

```bash
git add .
git commit -m "Day 15: array exercises and static widget markup"
git push
```

## The five methods to know by heart

| Method | Returns | Use it to… |
|---|---|---|
| `map(fn)` | a new array, same length | change every item |
| `filter(fn)` | a new, shorter array | keep some items |
| `reduce(fn, start)` | one value | combine all items (sum, max, an object…) |
| `find(fn)` | one item or `undefined` | get the first match |
| `sort((a, b) => a - b)` | the same array, sorted | order numbers (copy first with `[...array]`) |
