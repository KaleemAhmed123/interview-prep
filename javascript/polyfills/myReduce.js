// Check if the reduce method is not defined on the Array prototype
Array.prototype.myReduce = function (callback, initialValue) {
  if (this.length === 0 || this === null)
    throw new TypeError("Reduce called on [] or null array");
  if (typeof callback !== "function")
    throw new TypeError(callback + " is not a function");

  let accumulator = initialValue;
  for (let i = accumulator ? 0 : 1; i < this.length; i++) {
    accumulator = callback(accumulator ? accumulator : this[0], this[i]);
  }

  return accumulator;
};

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [];
const arr3 = [1, 2, 3, 4, 5];

console.log(arr1.myReduce((acc, curr) => acc + curr, 0));
console.log(
  "without initial value",
  arr3.myReduce((acc, curr) => acc + curr)
);
// console.log(
//   "on empty array",
//   arr2.myReduce((acc, curr) => acc + curr, 0)
// );
