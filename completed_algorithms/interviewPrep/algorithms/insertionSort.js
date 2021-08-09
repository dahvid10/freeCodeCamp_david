// The next sorting method we'll look at is insertion sort. This method works by building up a sorted array at the beginning of the list. It begins the sorted array with the first element. Then it inspects the next element and swaps it backwards into the sorted array until it is in sorted position. It continues iterating through the list and swapping new items backwards into the sorted portion until it reaches the end. This algorithm has quadratic time complexity in the average and worst cases.

// Instructions: Write a function insertionSort which takes an array of integers as input and returns an array of these integers in sorted order from least to greatest.

function insertionSort(array) {
    // Only change code below this line
    //copy array
    var copArr = array.slice();

    //variable: iteration
    var iter = 1;
    
    //iterate through array and insert when necessary
    for (var i=1; i <= array.length - 1; i++) {
        // console.log('iteration')
        // console.log(iter)

        // execute insertion
        array = indIns(copArr, i);

        //update copy of array
        copArr = array.slice();

        //update iteration
        iter++;
    }
    
    return array;
    // Only change code above this line
}

//function: find index of insertion
function indIns(arr, start) {
    //variable: value to insert
    var insVal = arr[start];

    //variable: index of insertion
    var ind;
    
    //variable: monitor when index of insertion is found
    var indFound = false;

    //iterate through array to find index of insertion
    for (var i=start-1; (i >= 0) && (indFound == false); i--) {
        // console.log('arr[start]')
        // console.log(arr[start])
        // console.log('arr[i]')
        // console.log(arr[i])

        if(arr[start] < arr[i]) {
            while(arr[start] < arr[i]){
                i--;
            }
            ind = i+1;
            indFound = true;
        }else{
            ind = start;
        }
    }
    // console.log('ind')
    // console.log(ind)

    //remove value to insert
    arr.splice(start, 1);

    //capture left part of new array
    var left;
    if(ind == 0){
        left = arr.slice(0,1);
        console.log('here')
    }else {
        left = arr.slice(0,ind);
    }
    // console.log('left')
    // console.log(left)

    //capture right part of new array
    var right = arr.slice(ind)
    // console.log('right')
    // console.log(right)

    // compose new array
    var array = left.concat(insVal).concat(right);
    //display new array
    // console.log('new array')
    // console.log(array)

    return array;
}

// console.log(insertionSort([1,15,4,3]))
console.log(insertionSort([1,4,2,8,345,123,43,32,5643,63,123,43,2,55,1,234,92]))

// insertionSort should be a function.

// insertionSort should return a sorted array (least to greatest).

// insertionSort([1,4,2,8,345,123,43,32,5643,63,123,43,2,55,1,234,92]) should return an array that is unchanged except for order.

// insertionSort should not use the built-in .sort() method.

