/** product: calculate the product of an array of numbers. */

function product(nums, i = 0) {
  if (i === nums.length) return 1;

  return nums[i] * product(nums, i + 1);
}

/** longest: return the length of the longest word in an array of words. */

function longest(words, idx = 0, longestSoFar = 0) {
  if (idx === words.length) return longestSoFar;
  longestSoFar = Math.max(words[idx].length, longestSoFar);
  return longest(words, idx + 1, longestSoFar);
}

/** everyOther: return a string with every other letter. */

function everyOther(str, idx = 0, newStr = '') {
  if (idx = str.length) return newStr
  newStr += str[idx]
  return everyOther(str, idx + 2, newStr)
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str, num = 1, revStr = "") {
  let leftIdx = idx;
  let rightIdx = str.length - idx - 1;
  if (leftIdx >= rightIdx) return true;
  if (str[leftIdx] !== str[rightIdx]) return false;
  return isPalindrome(str, idx + 1);
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, idx = 0) {
  if (idx === arr.length) return -1
  if (arr[idx] == val) return idx
  return findIndex(arr, val, idx + 1)
}

/** revString: return a copy of a string, but in reverse. */

function revString(str, num = 1, revStr = "") {
  if (revStr.length == str.length) return revStr
  for (let i = str.length - num; i >= 0; i--) {
    revStr += str[i]
    return revString(str, num + 1, revStr)
  }
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  let stringArr = [];
  for (let key in obj) {
    if (typeof obj[key] === "string") stringArr.push(obj[key]);
    if (typeof obj[key] === "object") stringArr.push(...gatherStrings(obj[key]));
  }
  return stringArr;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val) {

}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
