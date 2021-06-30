//create new arr for flattened arr
let flatArr = [];

function steamrollArray(arr) {
  //copy arr
  var newArr = arr.slice();
  console.log("newArr");
  console.log(newArr);
  //loop through each element and check if it is an array
  for (let i=0; i <= newArr.length; i++) {
    if(Array.isArray(newArr[i])) {
      steamrollArray(newArr[i]);
    } else if(newArr[i] !== undefined) {
      flatArr.push(newArr[i]);
    }
  }
  return flatArr;
}

console.log(steamrollArray([1, {}, [3, [[4]]]]));