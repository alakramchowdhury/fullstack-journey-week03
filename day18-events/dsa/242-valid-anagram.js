/* =====================================================================
   LeetCode 242 · Valid Anagram
   https://leetcode.com/problems/valid-anagram/
   ---------------------------------------------------------------------
   Return true if t uses exactly the same letters as s (same counts).
     s = "anagram", t = "nagaram" → true
     s = "rat",     t = "car"     → false

   How to think about it:
     Different lengths → false straight away.
     Then either sort both and compare, or COUNT the letters.
   ===================================================================== */

// Way 1 · sort the letters of both words and compare.   Time O(n log n)
function isAnagramSort(s, t) {
  if (s.length !== t.length) return false;
  const sortLetters = (word) => word.split('').sort().join('');
  return sortLetters(s) === sortLetters(t);
}

// Way 2 · count with an object: +1 for each letter of s, -1 for each letter of t.   Time O(n)
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const counts = {};
  for (const letter of s) counts[letter] = (counts[letter] ?? 0) + 1;
  for (const letter of t) {
    if (!counts[letter]) return false;   // t has a letter s doesn't (or has too many of it)
    counts[letter]--;
  }
  return true;                           // same length + nothing left over = same letters
}

// Way 3 · a Map works the same way, and can hold any kind of key
function isAnagramMap(s, t) {
  if (s.length !== t.length) return false;
  const counts = new Map();
  for (const letter of s) counts.set(letter, (counts.get(letter) ?? 0) + 1);
  for (const letter of t) {
    if (!counts.get(letter)) return false;
    counts.set(letter, counts.get(letter) - 1);
  }
  return true;
}

// ---- Tests ----
if (typeof check === 'undefined' && typeof require !== 'undefined') var { check } = require('./check.js');
const cases = [['anagram', 'nagaram', true], ['rat', 'car', false], ['a', 'ab', false], ['listen', 'silent', true], ['aacc', 'ccac', false]];
for (const [s, t, expected] of cases) {
  check(`count: "${s}", "${t}"`, isAnagram(s, t), expected);
  check(`sort: "${s}", "${t}"`, isAnagramSort(s, t), expected);
  check(`Map: "${s}", "${t}"`, isAnagramMap(s, t), expected);
}
