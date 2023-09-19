Array.prototype.myMap = function (cb) {
  const temp = [];
  for (let i = 0; i < this.length; i++) {
    temp.push(cb(this[i]));
  }
  return temp;
};

const arr = [1, 2, 3, 4, 5, 6, 7];
const newArr = arr.myMap((elm) => elm * elm);

console.log(newArr);
