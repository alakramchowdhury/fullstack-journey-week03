# Day 18 · Events in depth

**Goal:** understand the event object, bubbling and delegation, and build an accessible modal dialog.

## Files

| File | What it shows |
|---|---|
| `practice/char-counter.html` + `.js` | A live character counter on the `input` event |
| `practice/delegation.html` + `.js` | One listener handles clicks on a whole list, including items added later |
| `practice/event-lab.html` + `.js` | See bubbling, `target` vs `currentTarget`, `stopPropagation`, key names and `preventDefault` |
| `widgets/js/main.js` | UPDATED section 3: one delegated listener for the tabs, plus ← → Home End keys. NEW section 4: the modal |
| `dsa/242-valid-anagram.js` | LeetCode 242 solved three ways (sort, object count, Map) |

## Steps

1. Open `practice/event-lab.html`. Click the inner box, then tick the checkbox and click again. Explain the log.
2. Build the character counter and the delegated list yourself, then compare.
3. Build the modal: `showModal()`, close with ×, Cancel, **Escape** and a backdrop click, then return focus to the button.
4. Test the modal with the keyboard only. Focus must go into the dialog when it opens and back to "Book a free call" when it closes.
5. Solve **Valid Anagram**, then compare with `dsa/242-valid-anagram.js`.
6. Commit: `git commit -m "Day 18: events practice, delegated tabs and an accessible modal"`
