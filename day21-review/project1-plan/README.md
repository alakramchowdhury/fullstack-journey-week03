# Project 1 · Expense Tracker · plan

An example plan. Copy this file and make it yours: change the features, draw your own wireframe, and decide your own data shape. You'll build it in Week 4.

## 1 · What it does (features)

**Must have (version 1)**

- [ ] Add an expense: title, amount, category, date
- [ ] See all expenses in a list, newest first
- [ ] Delete an expense
- [ ] See the total, and the total per category
- [ ] Filter by category and by month
- [ ] Everything is saved in localStorage

**Later (version 2)**

- [ ] Edit an expense
- [ ] A simple bar chart per category
- [ ] Export to CSV
- [ ] Load exchange rates from an API (Week 4: fetch)

## 2 · Wireframe

```text
┌──────────────────────────────────────────────────────────┐
│ Expense Tracker                     Total this month ৳4,390│
├───────────────────────┬──────────────────────────────────┤
│ Add an expense        │ Filters: [All categories ▾] [Oct ▾]│
│ Title   [          ]  │ ┌──────────────────────────────┐ │
│ Amount  [     ]       │ │ 05 Oct  Tea and snacks  Food  ৳240 × │
│ Category[Food ▾]      │ │ 03 Oct  Internet bill   Bills ৳1,200 ×│
│ Date    [2026-10-05]  │ │ 01 Oct  Bus pass    Transport ৳600 × │
│ [Add expense]         │ └──────────────────────────────┘ │
│                       │ By category: Food ৳1,090 · Bills … │
└───────────────────────┴──────────────────────────────────┘
```

## 3 · Data shape

```js
// One expense
{
  id: 'm2x9k1ab',            // createId(): unique
  title: 'Bus pass',
  amount: 600,               // a NUMBER, in taka (convert the input with Number())
  category: 'Transport',     // one of CATEGORIES
  date: '2026-10-01',        // the <input type="date"> format: easy to sort and slice
}

// The state of the whole app
const state = {
  expenses: [],              // loaded from localStorage
  filters: { category: 'all', month: '2026-10' },
};

const CATEGORIES = ['Food', 'Transport', 'Bills', 'Learning', 'Other'];
```

## 4 · Functions I already know how to write (from Week 3)

| Function | Week 3 source |
|---|---|
| `totalAmount(list)` | Day 16 expenses practice |
| `totalsByCategory(list)` | Day 16 (reduce into an object) |
| `groupByMonth(list)` | Day 16 |
| `formatTaka(amount)` | Day 16 |
| `load(key, fallback)` / `save(key, value)` | Day 20 `storage.js` |
| `render()` pattern: state → DOM | Day 19–20 to-do list |

## 5 · Done when

- [ ] All "must have" features work
- [ ] Works on a phone (360px) and a laptop
- [ ] Deployed on Vercel, with a README, a screenshot and the live link
