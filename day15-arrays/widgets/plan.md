# The three widgets · plan

Sketch first, code second. This is the plan the HTML and CSS follow today, and the JavaScript follows from Day 16.

## Layout

```text
Phone (one column)                  Laptop (64rem and wider)
┌───────────────────────────┐       ┌─────────────────────────────────────────────┐
│ [S] Stackfield   Week 3   │       │ [S] Stackfield                     Week 3   │
│ Three widgets, built…     │       │ Three widgets, built from scratch           │
├───────────────────────────┤       ├─────────────────────────────────────────────┤
│ 1 Tabs                    │       │ 1 Tabs                                      │
│ Frontend Backend Data…  → │       │ Frontend  Backend  Databases  Deploy        │
│ ───────                   │       │ ────────                                    │
│ panel: text + topics      │       │ panel: text + topic chips                   │
├───────────────────────────┤       ├──────────────────┬──────────────────────────┤
│ 2 Modal                   │       │ 2 Modal          │ 3 To-do list             │
│ [Book a free call]        │       │ [Book a call]    │ [ new task      ][Add]   │
├───────────────────────────┤       │                  │ ☑ Read arrays chapter  × │
│ 3 To-do list              │       │                  │ ☐ Solve Two Sum        × │
│ [ new task    ][Add]      │       │                  │ 2 tasks left             │
│ ☑ task one            ×   │       └──────────────────┴──────────────────────────┘
│ ☐ task two            ×   │
└───────────────────────────┘
```

## Each widget: behaviour, states, data

| Widget | Behaviour | States the CSS must show | Data (from Day 16/19) |
|---|---|---|---|
| Tabs | Click a tab (or ← →) to show its panel | selected tab: `aria-selected="true"`; other panels: `hidden` | an array of track objects: `{ id, title, months, summary, topics }` |
| Modal | Button opens a dialog; ×, Cancel, Escape or the backdrop close it | open / closed (`<dialog>` handles this), a confirmation message | the form's fields: `name`, `day` |
| To-do | Add, tick, delete; later filter and edit | done items: `.is-done` (line-through); empty list message | an array of task objects: `{ id, text, done }` |

## Accessibility checklist

- Tabs use real `<button>`s with `role="tab"`, inside `role="tablist"`, each controlling a `role="tabpanel"`.
- The modal is a `<dialog>` opened with `showModal()`: it traps focus and closes with Escape. Focus returns to the opener.
- Every input has a label (the to-do input's label is visually hidden but read by screen readers).
- Delete buttons say what they delete: `aria-label="Delete: Solve Two Sum"`.
