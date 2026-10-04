/* =====================================================================
   LeetCode 1 · Two Sum
   https://leetcode.com/problems/two-sum/
   ---------------------------------------------------------------------
   Return the INDEXES of the two numbers that add up to target.
   Exactly one answer exists, and you may not use the same item twice.
     nums = [2, 7, 11, 15], target = 9 → [0, 1]   (2 + 7)
     nums = [3, 2, 4],      target = 6 → [1, 2]   (2 + 4)

   How to think about it:
     For each number, the partner you need is target - number.
     Way 1 searches for the partner every time (slow).
     Way 2 REMEMBERS every number you've passed in a Map
     (number → index), so finding a partner is instant.
   ===================================================================== */

// Way 1 · try every pair.   Time O(n²)
function twoSumPairs(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return [i, j];
    }
  }
  return [];
}

// Way 2 · one pass with a Map of "numbers seen so far".   Time O(n) · extra space O(n)
function twoSum(nums, target) {
  const seen = new Map();                    // value → its index
  for (let i = 0; i < nums.length; i++) {
    const partner = target - nums[i];
    if (seen.has(partner)) {
      return [seen.get(partner), i];         // the partner came earlier
    }
    seen.set(nums[i], i);
  }
  return [];
}

// Way 3 · the same idea with a plain object instead of a Map
function twoSumObject(nums, target) {
  const seen = {};
  for (let i = 0; i < nums.length; i++) {
    const partner = target - nums[i];
    if (partner in seen) return [seen[partner], i];
    seen[nums[i]] = i;
  }
  return [];
}

// ---- Tests ----
if (typeof check === 'undefined' && typeof require !== 'undefined') var { check } = require('./check.js');
const cases = [[[2, 7, 11, 15], 9, [0, 1]], [[3, 2, 4], 6, [1, 2]], [[3, 3], 6, [0, 1]], [[-1, -2, -3, -4, -5], -8, [2, 4]]];
for (const [nums, target, expected] of cases) {
  check(`Map: ${JSON.stringify(nums)}, ${target}`, twoSum(nums, target), expected);
  check(`pairs: ${JSON.stringify(nums)}, ${target}`, twoSumPairs(nums, target), expected);
  check(`object: ${JSON.stringify(nums)}, ${target}`, twoSumObject(nums, target), expected);
}
