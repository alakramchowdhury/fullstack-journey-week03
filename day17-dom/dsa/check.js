/* =====================================================================
   check.js · a tiny test helper used by every DSA file this week
   ---------------------------------------------------------------------
   check(label, actual, expected)
     prints "PASS" or "FAIL" in the console, and on the page if there is
     a <ol id="results"> element. JSON.stringify lets it compare arrays too.
   Works in the browser (open index.html) and in Node.js (node file.js, from Week 5).
   ===================================================================== */
function check(label, actual, expected) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  const line = `${pass ? 'PASS' : 'FAIL'}  ${label}  →  got ${JSON.stringify(actual)}` +
    (pass ? '' : `, expected ${JSON.stringify(expected)}`);
  console.log(line);

  if (typeof document !== 'undefined') {
    const list = document.getElementById('results');
    if (list) {
      const item = document.createElement('li');
      item.textContent = line;
      item.className = pass ? 'pass' : 'fail';
      list.append(item);
    }
  }
}

if (typeof module !== 'undefined') module.exports = { check };
