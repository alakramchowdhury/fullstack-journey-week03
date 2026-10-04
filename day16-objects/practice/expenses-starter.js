/* =====================================================================
   DAY 16 · expenses-starter.js · YOUR version: write the five functions
   ---------------------------------------------------------------------
   Open expenses.html with Live Server. Every test starts as FAIL.
   Compare with expenses-solutions.js only after you've tried.
   ===================================================================== */

function test(label, actual, expected) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${label}  →  ${JSON.stringify(actual)}${pass ? '' : `  (expected ${JSON.stringify(expected)})`}`);
}

const expenses = [
  { id: 1, title: 'Rice and lentils', amount: 850, category: 'Food', date: '2026-09-28' },
  { id: 2, title: 'Bus pass', amount: 600, category: 'Transport', date: '2026-10-01' },
  { id: 3, title: 'Internet bill', amount: 1200, category: 'Bills', date: '2026-10-03' },
  { id: 4, title: 'Tea and snacks', amount: 240, category: 'Food', date: '2026-10-05' },
  { id: 5, title: 'Online course', amount: 1500, category: 'Learning', date: '2026-09-15' },
];

console.table(expenses);

console.log('--- 1. totalAmount(list) ---');
function totalAmount(list) {
  // TODO: add up every expense.amount. Hint: reduce with a start value of 0
}
test('total of all five', totalAmount(expenses), 4390);

console.log('--- 2. totalsByCategory(list) ---');
function totalsByCategory(list) {
  // TODO: return an object like { Food: 1090, Transport: 600, ... }
  // Hint: start with {} and add each amount to totals[expense.category]
}
test('totals by category', totalsByCategory(expenses), { Food: 1090, Transport: 600, Bills: 1200, Learning: 1500 });

console.log('--- 3. sortByAmount(list, direction = "desc") ---');
function sortByAmount(list, direction = 'desc') {
  // TODO: return a sorted COPY; 'desc' = biggest first, 'asc' = smallest first
}
test('biggest first', (sortByAmount(expenses) ?? []).map((e) => e.amount), [1500, 1200, 850, 600, 240]);
test('the original order is untouched', expenses[0].id, 1);

console.log('--- 4. groupByMonth(list) ---');
function groupByMonth(list) {
  // TODO: return { '2026-09': [expense, ...], '2026-10': [...] }. Hint: expense.date.slice(0, 7)
}
test('months found', Object.keys(groupByMonth(expenses) ?? {}), ['2026-09', '2026-10']);

console.log('--- 5. formatTaka(amount) ---');
function formatTaka(amount) {
  // TODO: 4390 → "৳4,390". Hint: amount.toLocaleString('en-IN')
}
test('formatTaka(4390)', formatTaka(4390), '৳4,390');
test('formatTaka(125000)', formatTaka(125000), '৳1,25,000');
