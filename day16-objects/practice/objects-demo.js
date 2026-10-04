/* =====================================================================
   DAY 16 · objects-demo.js · Objects, destructuring, spread and JSON
   ---------------------------------------------------------------------
   A file to READ and RUN, part by part (A–I). Predict each result before
   you look at the page. Open objects.html with Live Server.
   ===================================================================== */

function test(label, actual, expected) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${label}  →  ${JSON.stringify(actual)}${pass ? '' : `  (expected ${JSON.stringify(expected)})`}`);
}


console.log('--- A. Object literals: dot vs bracket ---');
const student = { name: 'Rahim', city: 'Dhaka', week: 3, 'favourite topic': 'CSS Grid' };
test('dot notation', student.name, 'Rahim');
test('bracket notation with a string', student['city'], 'Dhaka');
const key = 'week';
test('bracket notation with a VARIABLE', student[key], 3);            // student.key would look for a key called "key"
test('brackets for keys with spaces', student['favourite topic'], 'CSS Grid');
test('a missing key → undefined', student.phone, undefined);


console.log('--- B. Changing, adding and deleting keys ---');
student.week = 4;                            // change
student.email = 'rahim@example.com';         // add
delete student['favourite topic'];           // remove
test('keys after the changes', Object.keys(student), ['name', 'city', 'week', 'email']);
test('"email" in student', 'email' in student, true);


console.log('--- C. Methods and this ---');
const counter = {
  count: 0,
  increment() {                              // a method: a function stored in an object
    this.count++;                            // this = the object before the dot (counter)
    return this.count;
  },
};
counter.increment();
test('counter.increment() twice', counter.increment(), 2);


console.log('--- D. Shorthand properties ---');
const title = 'Laptop stand';
const price = 1800;
const product = { title, price };            // same as { title: title, price: price }
test('shorthand', product, { title: 'Laptop stand', price: 1800 });


console.log('--- E. Destructuring: unpack values into variables ---');
const expense = { item: 'Bus pass', amount: 600, category: 'Transport' };
const { item, amount } = expense;                          // pick keys by name
const { category: group } = expense;                       // rename: category → group
const { note = 'no note' } = expense;                      // default when the key is missing
test('item and amount', [item, amount], ['Bus pass', 600]);
test('renamed', group, 'Transport');
test('default value', note, 'no note');

const [firstDay, secondDay, ...otherDays] = ['Sat', 'Sun', 'Mon', 'Tue'];   // arrays: by position
test('array destructuring', [firstDay, secondDay], ['Sat', 'Sun']);
test('...rest collects the remainder', otherDays, ['Mon', 'Tue']);

let a = 1;
let b = 2;
[a, b] = [b, a];                             // swap two variables in one line
test('swap', [a, b], [2, 1]);

function describe({ name, city = 'somewhere' }) {          // destructure a parameter
  return `${name} from ${city}`;
}
test('destructured parameter', describe({ name: 'Nadia' }), 'Nadia from somewhere');


console.log('--- F. Spread (...) copies; rest (...) collects ---');
const defaults = { theme: 'light', language: 'en' };
const settings = { ...defaults, theme: 'dark' };           // copy, then override one key
test('spread + override', settings, { theme: 'dark', language: 'en' });
test('the original is unchanged', defaults.theme, 'light');
test('join arrays', [...[1, 2], ...[3, 4]], [1, 2, 3, 4]);

function total(...numbers) {                 // rest parameter: any number of arguments
  return numbers.reduce((sum, n) => sum + n, 0);
}
test('total(1, 2, 3)', total(1, 2, 3), 6);


console.log('--- G. Copies vs references ---');
const original = { name: 'Plan A', tags: ['js'] };
const sameObject = original;                 // NOT a copy: two names for ONE object
sameObject.name = 'Plan B';
test('changing sameObject changed original', original.name, 'Plan B');
test('two separate objects are never ===', { n: 1 } === { n: 1 }, false);

const shallow = { ...original };             // a new object, but tags is still shared
shallow.tags.push('css');
test('spread is SHALLOW: the inner array is shared', original.tags, ['js', 'css']);

const deep = structuredClone(original);      // a full, deep copy
deep.tags.push('html');
test('structuredClone copies everything', original.tags, ['js', 'css']);


console.log('--- H. Object.keys, values, entries ---');
const prices = { tea: 20, coffee: 60, juice: 45 };
test('keys', Object.keys(prices), ['tea', 'coffee', 'juice']);
test('values', Object.values(prices), [20, 60, 45]);
test('entries', Object.entries(prices), [['tea', 20], ['coffee', 60], ['juice', 45]]);

const expensive = [];
for (const [drink, cost] of Object.entries(prices)) {      // destructure each [key, value] pair
  if (cost > 30) expensive.push(drink);
}
test('loop over entries', expensive, ['coffee', 'juice']);

const doubled = Object.fromEntries(Object.entries(prices).map(([drink, cost]) => [drink, cost * 2]));
test('entries → map → fromEntries', doubled, { tea: 40, coffee: 120, juice: 90 });


console.log('--- I. JSON, optional chaining and ?? ---');
const saved = JSON.stringify({ name: 'Rahim', done: false, tags: ['js'] });
test('JSON.stringify → a string', saved, '{"name":"Rahim","done":false,"tags":["js"]}');
test('JSON.parse → an object again', JSON.parse(saved).tags[0], 'js');
test('undefined values are left out of JSON', JSON.stringify({ a: undefined, b: 1 }), '{"b":1}');

const user = { profile: { address: null }, settings: { volume: 0 } };
test('?. stops at null instead of crashing', user.profile?.address?.city, undefined);
test('?. on a missing key', user.billing?.plan, undefined);
test('?? keeps 0 (only null/undefined are replaced)', user.settings.volume ?? 50, 0);
test('|| replaces 0 (any falsy value)', user.settings.volume || 50, 50);
