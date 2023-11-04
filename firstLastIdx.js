var searchRange = function (nums, target) {
    if (nums.length == 0) {
        return [-1, -1];
    }
    if (nums.length == 1 && nums[0] == target) {
        return [0, 0];
    }
    let left = 0;
    let right = nums.length - 1;
    let mid = 0;
    while (left != right) {
        mid = left + Math.floor((right - left) / 2);
        if (nums[mid] == target) {
            console.log("found mid", mid, "in range [", left, ", ", right, "]")
            break;
        }
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    console.log("mid::", mid, [left, right]);
    if (left == right) {
        if (nums[left] == target) {
            return [left, right];
        } else {
            return [-1, -1];
        }
    }

    let start = mid;
    let end = mid;
    console.log("start::", start)
    console.log("end::", end)
    while (nums[start - 1] == target) {
        start--;
    }
    while (nums[end + 1] == target) {
        end++;
    }
    return [start, end];
};

// console.log(searchRange([5,7,7,8,8,10], 8))

// console.log(searchRange([5,7,7,8,9,10], 9))

// console.log(searchRange([], 0))

var targetIndices = function (nums, target) {
    nums.sort((a, b) => a - b);
    let res = [];
    for (let i = 0; i < nums.length; i++) {
        console.log(nums[i])
        if (nums[i] > target) {
            return res;
        } else if (nums[i] == target) {
            res.push(i);
        }
    }
    return res;
};

var moveZeroes = function (nums) {
    let zerosCount = 0;
    let len = nums.length;
    for (let i = 0; i < len - zerosCount; i++) {
        if (nums[i] == 0) {
            let zerosStrike = 0;
            while (nums[i + zerosStrike] == 0) {
                zerosStrike++;
            }
            console.log("found 0 at idx:", i, 'zerosStrike', zerosStrike)
            if (len - zerosStrike - i > 0) {
                zerosCount += zerosStrike;
            }
            // do shift 
            for (let j = i; j < len - zerosStrike; j++) {
                nums[j] = nums[j + zerosStrike];
                // if (nums[j] == 0) {
                //     zerosCount--;
                // }
                console.log("set ", nums[j + zerosStrike], "to idx: ", j)
            }
            console.log("shifted arr:", arr)
        }
    }

    console.log("zerosCount", zerosCount)
    for (let i = 0; i < zerosCount; i++) {
        // if (nums[len-1-i] == 0) {
        //     zerosCount--;
        // }
        nums[len - 1 - i] = 0;
    }
};


var minCostClimbingStairs2 = function (cost) {
    const len = cost.length;
    const wayPrice = (sum, i) => {
        if (i >= len) {
            return sum;
        }
        return Math.min(wayPrice(sum + cost[i], i + 1), wayPrice(sum + cost[i], i + 2));
    }

    return Math.min(wayPrice(0, 0), wayPrice(0, 1));
};

var minCostClimbingStairs3 = function (cost) {
    const len = cost.length;
    let totalPrice = 0;
    
    let i=0;
    while (i<len-1) {
        if (cost[i] < cost[i+1]) {
            totalPrice += cost[i];
            i++;
        } else {
            totalPrice += cost[i+1];
            i+=2;
        }
    }

    return totalPrice;
};

// You are given an integer array cost where cost[i] is the cost of ith step on a staircase. 
// Once you pay the cost, you can either climb one or two steps.

// You can either start from the step with index 0, or the step with index 1.

// Return the minimum cost to reach the top of the floor.



var minCostClimbingStairs4 = function(cost) {
    const n = cost.length;
    // add cache here for DP
    let dp = [];
    dp[0] = 0;
    dp[1] = 0; // 0 or cost[0];

    // bottom-up
    for (let i=2; i <= n; i++) {
        dp[i] =  Math.min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2]);
    }

    return dp[n];
};

var minCostClimbingStairs = function(cost) {
    const n = cost.length;
    // add cache here for DP
    let s1 = 0;
    let s2 = 0;
    let s3 = 0;
    // bottom-up
    for (let i=2; i <= n; i++) {
        s3 = Math.min(s1 + cost[i-2], s2 + cost[i-1]);
        s1 = s2;
        s2 = s3;
    }

    return s3;
};


var numIdenticalPairs = function(nums) {
    let count = 0;
    let n=nums.length;
    let freqs = {};
    for (let i=0; i< n; i++) {
        freqs[nums[i]] = (freqs[nums[i]] ?? 0) + 1;
    }
    for (let freq of Object.values(freqs)) {
        if (freq > 1) {
            count += freq*(freq-1)/2;
        }
    }
    return count;
};

var searchInsert = function(nums, target) {
    let n = nums.length;
    let l = 0;
    let r = n-1;
    let m = 0;
    while (l < r -1) {
        m = l + Math.floor((r-l)/2);
        console.log("m", m, "l", l, "r", r)
        if (nums[m] == target) {
            return m;
        }
        if (nums[m] > target) {
            r = m;
        }
        if (nums[m] < target) {
            l = m;
        }
    }

    if (target <= nums[l]) {
        return l;
    } else if (target == nums[r] || (target > nums[l] && target < nums[r])) {
        return r;
    } else if (target > nums[r]) {
        return r + 1;
    }
    console.log("m", m, "l", l, "r", r)
    return m;
};

var backspaceCompare = function(s, t) {
    let i = s.length-1;
    let j = t.length-1;
    let compS = '#';
    let compT = '#';

    while (i >= 0 || j >= 0) {
        if (i >= 0) {
        compS = s.charAt(i);
        if (compS == '#') {
            let toRemove = 0;
            while (i >= 0 && compS == '#') {
                let nextS = s.charAt(i);
                if (nextS == '#') {
                    toRemove++;
                    i--;
                } else {
                    i = i-toRemove;
                    toRemove = 0;
                    compS = i < 0 ? '' : s.charAt(i);
                    // break;
                }
            }
            if (i < 0) {
                compS = '';
            }
        }
        }

        if (j >= 0) {
        compT = t.charAt(j);
        if (compT == '#') {
            let toRemove = 0;
            while (j >= 0 && compT == '#') {
                let nextT = t.charAt(j);
                if (nextT == '#') {
                    toRemove++;
                    j--;
                } else {
                    j = j-toRemove;
                    toRemove = 0;
                    compT = j < 0 ? '' : t.charAt(j);
                    // break;
                }
            }
            if (j < 0) {
                compT = '';
            }
        }
        }
        if (compT == '#') {

        }
        if ( compS != compT) {
            console.log('compS', compS, 'compT', compT)
            return false;
        }
        i--;
        j--;      
    }
    return true;
};

var isHappy = function(n) {
    // let sq = {'0':0, '1':1, '2':4, '3':9,
    // '4':16, '5':25, '6':36, '7':49, '8':64, '9':81
    // };
    let sq = {0:0, 1:1, 2:4, 3:9,
    4:16, 5:25, 6:36, 7:49, 8:64, 9:81
    };

    let maxLoops = 6;

    let sum = n;
    while (sum != 1 && maxLoops-- >= 0) {
        let ss = 0;
        // let sumStr = sum.toString();
        // for (let i=0; i < sumStr.length; i++) {
        //     ss += sq[sumStr.charAt(i)];
        // }
        let mod = 10;
        let acc = 0;
        while (sum > acc) {
            let nth = (sum % mod) - acc;
            if (mod > 10) {
                nth = nth * 10 / mod;
            }
            console.log("sum", sum, "nth", nth)
            ss += sq[nth];
            acc = sum % mod;
            mod = mod * 10;
        }
        console.log(ss)
        sum = ss;
    }
    return sum == 1;
};

var wordPattern = function(pattern, s) {
    let pKeys = pattern.split('');
    let pVals = s.split(' ');
    if (pKeys.length !== pVals.length) {
        return false;
    }
    let patternMap = {};
    let valsMap = {};

    for (let i=0; i < pKeys.length; i++) {
        let pKey = pKeys[i];
        let pVal = pVals[i];

        let pPrevVal = patternMap[pKey];
        let pPrevKey = valsMap[pVal];

        if (pPrevVal || pPrevKey) {
            console.log("pKey", pKey, "pVal", pVal, "pPrevKey", pPrevKey, "pPrevVal", pPrevVal)
            if (pPrevVal != pVal || pPrevKey != pKey) {
                console.log("DIFF","pKey", pKey, "pVal", pVal, "pPrevKey", pPrevKey, "pPrevVal", pPrevVal)
                return false;
            }
        } else {
            patternMap[pKey] = pVal;
            valsMap[pVal] = pKey;
        }
    }
    return true;
};


var NumArray = function(nums) {
    this.nums = nums;
};

/** 
 * @param {number} left 
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function(left, right) {
   let sum = 0;
   for (let i=left; i<=right; i++) {
    sum += this.nums[i];
   }
   return sum;
};

let nn = new NumArray([1,2,3]);

console.log(nn.sumRange(1,2));
// 