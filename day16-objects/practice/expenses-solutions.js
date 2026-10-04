/* =====================================================================
   DAY 16 · expenses-solutions.js · Expense utilities (a preview of Project 1)
   ---------------------------------------------------------------------
   Five expenses as objects, and small PURE functions that answer
   questions about them. Project 1 (Week 4) will reuse these ideas.
   Open expenses-solutions.html: results on the page and in the Console.
   ===================================================================== */

function test(label, actual, expected) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${label}  →  ${JSON.stringify(actual)}${pass ? '' : `  (expected ${JSON.stringify(expected)})`}`);
}

// An array of objects: every object has the same "shape" (the same keys).
const expenses = [
  { id: 1, title: 'Rice and lentils', amount: 850, category: 'Food', date: '2026-09-28' },
  { id: 2, title: 'Bus pass', amount: 600, category: 'Transport', date: '2026-10-01' },
  { id: 3, title: 'Internet bill', amount: 1200, category: 'Bills', date: '2026-10-03' },
  { id: 4, title: 'Tea and snacks', amount: 240, category: 'Food', date: '2026-10-05' },
  { id: 5, title: 'Online course', amount: 1500, category: 'Learning', date: '2026-09-15' },
];

console.table(expenses);   // open the Console to see the data as a table


console.log('--- 1. totalAmount(list) ---');
const totalAmount = (list) => list.reduce((total, expense) => total + expense.amount, 0);
test('total of all five', totalAmount(expenses), 4390);


console.log('--- 2. totalsByCategory(list): reduce into an object ---');
function totalsByCategory(list) {
  return list.reduce((totals, { category, amount }) => {
    totals[category] = (totals[category] ?? 0) + amount;   // start at 0 the first time we see a category
    return totals;
  }, {});
}
test('totals by category', totalsByCategory(expenses), { Food: 1090, Transport: 600, Bills: 1200, Learning: 1500 });


console.log('--- 3. sortByAmount(list, direction) ---');
function sortByAmount(list, direction = 'desc') {
  const sorted = [...list].sort((a, b) => a.amount - b.amount);   // copy, then sort small → big
  return direction === 'desc' ? sorted.reverse() : sorted;
}
test('biggest first', sortByAmount(expenses).map((e) => e.amount), [1500, 1200, 850, 600, 240]);
test('smallest first', sortByAmount(expenses, 'asc')[0].title, 'Tea and snacks');
test('the original order is untouched', expenses[0].id, 1);


console.log('--- 4. groupByMonth(list): { "2026-09": [...], "2026-10": [...] } ---');
function groupByMonth(list) {
  const groups = {};
  for (const expense of list) {
    const month = expense.date.slice(0, 7);                // "2026-09-28" → "2026-09"
    if (!groups[month]) groups[month] = [];
    groups[month].push(expense);
  }
  return groups;
}
const byMonth = groupByMonth(expenses);
test('months found', Object.keys(byMonth), ['2026-09', '2026-10']);
test('September ids', byMonth['2026-09'].map((e) => e.id), [1, 5]);
test('October total', totalAmount(byMonth['2026-10']), 2040);


console.log('--- 5. formatTaka(amount) and a summary line ---');
const formatTaka = (amount) => `৳${amount.toLocaleString('en-IN')}`;
test('formatTaka(4390)', formatTaka(4390), '৳4,390');
test('formatTaka(125000)', formatTaka(125000), '৳1,25,000');

const [biggest] = sortByAmount(expenses);                  // destructure the first item
test('summary', `Biggest expense: ${biggest.title} (${formatTaka(biggest.amount)})`, 'Biggest expense: Online course (৳1,500)');


console.log('--- 6. JSON round trip: what Project 1 will save ---');
const text = JSON.stringify(expenses);
const loaded = JSON.parse(text);
test('same data after stringify + parse', loaded, expenses);
test('but a different array', loaded === expenses, false);
