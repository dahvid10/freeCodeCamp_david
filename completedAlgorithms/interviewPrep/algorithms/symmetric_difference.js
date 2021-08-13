// Create a function that takes two or more arrays and returns an array of their symmetric difference. The returned array must contain only unique values (no duplicates).

function sym(args) {
    //create new array to hold unique values
    var uniqVals = arguments[0];
    //starting at first arr, compare to next array
    for(var i=0; i <= arguments.length - 2; i++){
        //find difference between current array and next array
        uniqVals = diff(uniqVals, arguments[i+1]);
    }
    return uniqVals.sort((a,b) => a - b);
  }
//function to find difference between two arrays
function diff(arr1, arr2) {
    var different = [];
    //check if each value in arr1 is not found in arr2 AND is not found in different[]
    arr1.forEach(element => {
        //if each value in arr1 is not found in arr2, add value to different[]
        !arr2.includes(element)  && !different.includes(element)
        ? different.push(element) 
        : null;
    });
    //check if each value in arr2 is not found in arr1 AND is not found in different[] 
    arr2.forEach(element => {
        //if each value in arr2 is not found in arr1, add value to different[]
        !arr1.includes(element) && !different.includes(element)
        ? different.push(element) 
        : null;
    });
    return different;
}

console.log(sym([1, 2, 3, 3], [5, 2, 1, 4]));

/*

sym([1, 2, 3], [5, 2, 1, 4]) should return [3, 4, 5].

sym([1, 2, 3], [5, 2, 1, 4]) should contain only three elements.

sym([1, 2, 3, 3], [5, 2, 1, 4]) should return [3, 4, 5].

sym([1, 2, 3, 3], [5, 2, 1, 4]) should contain only three elements.

sym([1, 2, 3], [5, 2, 1, 4, 5]) should return [3, 4, 5].

sym([1, 2, 3], [5, 2, 1, 4, 5]) should contain only three elements.

sym([1, 2, 5], [2, 3, 5], [3, 4, 5]) should return [1, 4, 5]

sym([1, 2, 5], [2, 3, 5], [3, 4, 5]) should contain only three elements.

sym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]) should return [1, 4, 5].

sym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]) should contain only three elements.

sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3]) should return [2, 3, 4, 6, 7].

sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3]) should contain only five elements.

sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1]) should return [1, 2, 4, 5, 6, 7, 8, 9].

sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1]) should contain only eight elements.

*/