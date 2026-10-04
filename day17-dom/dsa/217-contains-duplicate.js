/* =====================================================================
   LeetCode 217 · Contains Duplicate
   https://leetcode.com/problems/contains-duplicate/
   ---------------------------------------------------------------------
   Return true if any value appears at least twice.
     [1, 2, 3, 1]  → true
     [1, 2, 3, 4]  → false

   How to think about it:
     Way 1 compares every pair: simple, but slow for big arrays.
     Way 2 sorts first, so equal values end up next to each other.
     Way 3 remembers what it has seen in a Set: one pass, the fastest.
   ===================================================================== */

// Way 1 · compare every pair.   Time O(n²): 10 000 numbers ≈ 50 million comparisons
function containsDuplicatePairs(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) return true;
    }
  }
  return false;
}

// Way 2 · sort a copy, then check neighbours.   Time O(n log n)
function containsDuplicateSort(nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === sorted[i - 1]) return true;
  }
  return false;
}

// Way 3 · a Set of the values seen so far.   Time O(n) · extra space O(n)
function containsDuplicate(nums) {
  const seen = new Set();
  for (const n of nums) {
    if (seen.has(n)) return true;     // we met this value before
    seen.add(n);
  }
  return false;
}

// Way 3b · one line: a Set drops duplicates, so it's smaller if there were any
const containsDuplicateShort = (nums) => new Set(nums).size !== nums.length;

// ---- Tests ----
if (typeof check === 'undefined' && typeof require !== 'undefined') var { check } = require('./check.js');
const cases = [[[1, 2, 3, 1], true], [[1, 2, 3, 4], false], [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2], true], [[7], false]];
for (const [input, expected] of cases) {
  check(`Set: ${JSON.stringify(input)}`, containsDuplicate(input), expected);
  check(`pairs: ${JSON.stringify(input)}`, containsDuplicatePairs(input), expected);
  check(`sort: ${JSON.stringify(input)}`, containsDuplicateSort(input), expected);
  check(`one line: ${JSON.stringify(input)}`, containsDuplicateShort(input), expected);
}
