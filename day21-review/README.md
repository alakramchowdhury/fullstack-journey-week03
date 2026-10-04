# Day 21 · Week 3 review: theory stops here

**Goal:** prove Week 3 stuck, build a filterable list from scratch, and plan Project 1. From tomorrow you learn inside projects.

| Time | Block | What you do |
|---|---|---|
| 30 min | Checkpoint quiz | 10 questions below. Answer out loud first |
| 30 min | Build task | `practice/filter-task.html`: a filterable list from scratch |
| 45 min | Project 1 plan | Fill in `project1-plan/README.md`: features, wireframe, data shape |
| 15 min | Retro | What worked, what was hard, what to change |

## 1 · Checkpoint quiz

1. What is the difference between `map`, `filter` and `reduce`?
2. Why does `[10, 9, 100].sort()` give `[10, 100, 9]`, and how do you sort numbers correctly?
3. What is the difference between `slice` and `splice`?
4. How do you copy an object and change one key, without changing the original?
5. Why do you need `JSON.stringify` before saving to localStorage?
6. Why is `element.innerHTML = userInput` dangerous, and what should you use instead?
7. What is the difference between `event.target` and `event.currentTarget`?
8. What is event delegation, and why is it useful for a list?
9. What is a closure? Give an example from this week.
10. What does debouncing do, and where would you use it?

<details>
<summary>Show answers</summary>

1. `map` changes every item (same length); `filter` keeps some items (shorter array); `reduce` combines all items into one value.
2. Without a compare function, `sort` compares items as text. Use `numbers.sort((a, b) => a - b)` (on a copy: `[...numbers]`).
3. `slice(start, end)` returns a copy of part of the array and leaves it unchanged; `splice(start, count, …items)` removes and/or inserts items in the original.
4. `const copy = { ...original, key: newValue };` (a shallow copy; use `structuredClone` for nested data).
5. localStorage only stores strings. `JSON.stringify` turns arrays/objects into a string; `JSON.parse` turns it back.
6. The browser turns the text into real HTML, so a visitor could inject code that runs on your page (XSS). Use `textContent`.
7. `target` is the element that was actually clicked; `currentTarget` is the element whose listener is running.
8. One listener on a parent handles events from all its children, because events bubble up. It works for items added later and needs fewer listeners.
9. A function that remembers variables from where it was created, e.g. `createCounter()` returning functions that share a private `count`.
10. It waits until calls stop for a set time, then runs once. Use it for search boxes, resize handlers and autosave.

</details>

**Score:** 9–10: ready for Project 1. 6–8: re-read the chapters for the missed questions. Below 6: redo those days first.

## 2 · Build task (30 minutes, no copying)

Open `practice/filter-task.html` with Live Server and write `filter-task-starter.js`: render the 12 resources as cards, filter by search text and level, show "N of 12 resources" and an empty message. Compare with `filter-task-solution.js` afterwards.

## 3 · Plan Project 1: Expense Tracker

Read the example plan in `project1-plan/README.md`, then write your own version: the features you'll build, a wireframe, and the shape of one expense object. Next week you build it.

## 4 · Retro

```text
Week 3 retro
- What worked:
- What was hard:
- One thing I'll do differently in Week 4:
- Hours studied this week:
```

## Week 3 is done when

- [ ] Quiz score of 9 or more
- [ ] The filterable list works, built without copying
- [ ] Project 1 plan written
- [ ] Widgets page live, and 6 LeetCode problems solved this week
- [ ] All days marked done in your Logbook
