/* =====================================================================
   LeetCode 121 · Best Time to Buy and Sell Stock
   https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
   ---------------------------------------------------------------------
   prices[i] is the price on day i. Buy on one day, sell on a LATER day.
   Return the biggest profit, or 0 if you can't make any.
     [7, 1, 5, 3, 6, 4] → 5   (buy at 1, sell at 6)
     [7, 6, 4, 3, 1]    → 0   (prices only fall)

   How to think about it:
     The best day to sell is today, if you bought at the LOWEST price so far.
     Walk through the days once, remembering that lowest price.
   ===================================================================== */

// Way 1 · every buy day with every later sell day.   Time O(n²)
function maxProfitPairs(prices) {
  let best = 0;
  for (let buy = 0; buy < prices.length; buy++) {
    for (let sell = buy + 1; sell < prices.length; sell++) {
      best = Math.max(best, prices[sell] - prices[buy]);
    }
  }
  return best;
}

// Way 2 · one pass: track the cheapest price so far and the best profit so far.   Time O(n)
function maxProfit(prices) {
  let cheapest = Infinity;                   // any real price is lower than Infinity
  let best = 0;
  for (const price of prices) {
    if (price < cheapest) {
      cheapest = price;                      // a new lowest price: a better day to buy
    } else if (price - cheapest > best) {
      best = price - cheapest;               // selling today beats every earlier plan
    }
  }
  return best;
}

// ---- Tests ----
if (typeof check === 'undefined' && typeof require !== 'undefined') var { check } = require('./check.js');
const cases = [[[7, 1, 5, 3, 6, 4], 5], [[7, 6, 4, 3, 1], 0], [[2, 4, 1], 2], [[3, 2, 6, 5, 0, 3], 4], [[5], 0]];
for (const [prices, expected] of cases) {
  check(`one pass: ${JSON.stringify(prices)}`, maxProfit(prices), expected);
  check(`pairs: ${JSON.stringify(prices)}`, maxProfitPairs(prices), expected);
}
