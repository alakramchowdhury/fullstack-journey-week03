# Day 19 · Closures, timers and localStorage

**Goal:** write functions that remember, schedule work with timers, save data in the browser, and build the first version of the to-do list.

## Files

| File | What it shows |
|---|---|
| `practice/closures-starter.js` | createCounter, once, makeMultiplier, createIdGenerator, debounce: yours to write (open `closures.html`) |
| `practice/closures-solutions.js` | The answers, plus var vs let in loops and setInterval (17 PASS) |
| `practice/timers.html` + `.js` | A focus timer (setInterval / clearInterval) and a search box with and without debounce |
| `practice/theme.html` + `.js` | A theme choice saved in localStorage and read back on the next visit |
| `widgets/js/main.js` | NEW section 5: the to-do list, part 1. State in an array, one `render()`, add / toggle / delete |
| `dsa/1-two-sum.js` | LeetCode 1 solved three ways (pairs, Map, object) |

## Steps

1. Make every test in `practice/closures.html` pass.
2. Open `practice/timers.html`, untick "Use debounce" and type quickly; then tick it and compare the counters.
3. Open `practice/theme.html`, choose Dark, reload. Find the saved value in DevTools → **Application** → **Local Storage**.
4. Build the to-do list: a `todos` array, `render()`, and three handlers (submit, change, click) that change the array and call `render()`.
5. Solve **Two Sum**, then compare with `dsa/1-two-sum.js`. This one is asked in real interviews.
6. Commit: `git commit -m "Day 19: closures, timers, localStorage and the to-do list"`
