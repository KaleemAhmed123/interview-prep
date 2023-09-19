Array.prototype.myFilter = function (cb) {
  const temp = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i]) === true) {
      temp.push(this[i]);
    }
  }
  return temp;
};

const arr = [1, 2, 3, 4, 5, 6, 7];
const newArr = arr.myFilter((elm) => {
  return elm % 2 === 0;
});
console.log(newArr);
console.log(
  newArr.myFilter((elm) => {
    return elm !== 4;
  })
);
