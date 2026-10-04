/* =====================================================================
   LeetCode 1672 · Richest Customer Wealth
   https://leetcode.com/problems/richest-customer-wealth/
   ---------------------------------------------------------------------
   accounts[i][j] is the money customer i has in bank j.
   A customer's wealth is the sum of their row. Return the largest wealth.
     [[1, 2, 3], [3, 2, 1]]        → 6   (both have 6)
     [[1, 5], [7, 3], [3, 5]]      → 10  (the second customer: 7 + 3)

   How to think about it:
     An array of arrays is a table. Sum each row, keep the best so far.
   ===================================================================== */

// Way 1 · two loops: rows, then the numbers in each row.   Time O(rows × columns)
function maximumWealth(accounts) {
  let richest = 0;
  for (const customer of accounts) {
    let wealth = 0;
    for (const money of customer) {
      wealth += money;
    }
    if (wealth > richest) richest = wealth;
  }
  return richest;
}

// Way 2 · map each row to its sum, then Math.max over the sums
function maximumWealthMap(accounts) {
  const wealths = accounts.map((customer) => customer.reduce((sum, money) => sum + money, 0));
  return Math.max(...wealths);
}

// Way 3 · one reduce that keeps the maximum
function maximumWealthReduce(accounts) {
  return accounts.reduce((richest, customer) => {
    const wealth = customer.reduce((sum, money) => sum + money, 0);
    return Math.max(richest, wealth);
  }, 0);
}

// ---- Tests ----
if (typeof check === 'undefined' && typeof require !== 'undefined') var { check } = require('./check.js');
const example1 = [[1, 2, 3], [3, 2, 1]];
const example2 = [[1, 5], [7, 3], [3, 5]];
const example3 = [[2, 8, 7], [7, 1, 3], [1, 9, 5]];
check('example 1', maximumWealth(example1), 6);
check('example 2', maximumWealth(example2), 10);
check('example 3', maximumWealth(example3), 17);
check('way 2 agrees', maximumWealthMap(example3), 17);
check('way 3 agrees', maximumWealthReduce(example2), 10);
