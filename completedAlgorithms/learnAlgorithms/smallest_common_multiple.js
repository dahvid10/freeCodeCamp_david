function fillArr (min, max) {
  var filledArr = [];
  for (let i=min; i <= max; i++) {
    filledArr.push(i);
  }
  return filledArr;
}

function divAll (product, arr) {
  return arr.every(element => product % element == 0);
}

function smallestCommons(params) {
  //create sorted array of params
  sortArr = params.sort((a,b) => a-b);
  //create array of numbers between the params
  var betweenArr = fillArr(sortArr[0], sortArr[1]);
  //loop through numbers starting from product of params
  var product = params[0] * params[1];  
  var min = sortArr[0], max = sortArr[1];
  for (let i=product; i != 0; i++) {
    //check if number is divisible by all numbers between params
    if(divAll(i, betweenArr)) {
      return i;
    }
  }
}

console.log(smallestCommons([23,18]));
smallestCommons([23,18]);