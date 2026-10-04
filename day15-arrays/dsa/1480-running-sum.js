/* =====================================================================
   LeetCode 1480 · Running Sum of 1d Array
   https://leetcode.com/problems/running-sum-of-1d-array/
   ---------------------------------------------------------------------
   Return an array where each item is the sum of all items up to it.
     [1, 2, 3, 4]    → [1, 3, 6, 10]      (1, 1+2, 1+2+3, 1+2+3+4)
     [3, 1, 2, 10, 1] → [3, 4, 6, 16, 17]

   How to think about it:
     Keep a running total while you loop. Each step: total += nums[i],
     then push the total. You never need to re-add the earlier numbers.
   ===================================================================== */

// Way 1 · a new array and a running total.   Time O(n) · extra space O(n)
function runningSum(nums) {
  const result = [];
  let total = 0;
  for (const n of nums) {
    total += n;
    result.push(total);
  }
  return result;
}

// Way 2 · change the array in place: each item adds the one before it.   Extra space O(1)
function runningSumInPlace(nums) {
  for (let i = 1; i < nums.length; i++) {
    nums[i] += nums[i - 1];            // nums[i - 1] already holds the sum up to i - 1
  }
  return nums;
}

// Way 3 · map with a total remembered outside the callback
function runningSumMap(nums) {
  let total = 0;
  return nums.map((n) => (total += n));   // an assignment is also an expression: it returns the new total
}

// ---- Tests ----
if (typeof check === 'undefined' && typeof require !== 'undefined') var { check } = require('./check.js');
check('[1, 2, 3, 4]', runningSum([1, 2, 3, 4]), [1, 3, 6, 10]);
check('[1, 1, 1, 1, 1]', runningSum([1, 1, 1, 1, 1]), [1, 2, 3, 4, 5]);
check('[3, 1, 2, 10, 1]', runningSum([3, 1, 2, 10, 1]), [3, 4, 6, 16, 17]);
check('way 2 (in place)', runningSumInPlace([3, 1, 2, 10, 1]), [3, 4, 6, 16, 17]);
check('way 3 (map)', runningSumMap([1, 2, 3, 4]), [1, 3, 6, 10]);
check('one number', runningSum([5]), [5]);
