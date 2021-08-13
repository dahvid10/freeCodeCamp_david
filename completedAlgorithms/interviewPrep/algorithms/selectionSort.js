// Here we will implement selection sort. Selection sort works by selecting the minimum value in a list and swapping it with the first value in the list. It then starts at the second position, selects the smallest value in the remaining list, and swaps it with the second element. It continues iterating through the list and swapping elements until it reaches the end of the list. Now the list is sorted. Selection sort has quadratic time complexity in all cases.

// Instructions: Write a function selectionSort which takes an array of integers as input and returns an array of these integers in sorted order from least to greatest.

function selectionSort(array) {
    // Only change code below this line

    //copy array
    var copArr = array.slice();

    for(var i=0; i <= array.length - 1; i++){
        //update copy of array
        copArr = array.slice();
        //find index of smallest value in array (from start index)
        var minInd = smallestValue(copArr, i);
        //swap smallest value with start index
        array[i] = copArr[minInd];
        array[minInd] = copArr[i];
    }

    return array;
    // Only change code above this line
}

//function: find smallest value in list (from start index)
function smallestValue(copArr, startInd){
    //variable: minimum value
    var minVal = 999999;

    //variable: index of min value
    var minInd;

    for(var i=startInd; i <= copArr.length - 1; i++) {
        if(copArr[i] < minVal){
            minVal = copArr[i];
            //capture index of smallest value
            minInd = i;
        }
    }
    return minInd;
}

console.log(selectionSort([1,4,2,8,345,123,43,32,5643,63,123,43,2,55,1,234,92]))

// selectionSort should be a function.

// selectionSort should return a sorted array (least to greatest).

// selectionSort([1,4,2,8,345,123,43,32,5643,63,123,43,2,55,1,234,92]) should return an array that is unchanged except for order.

// selectionSort should not use the built-in .sort() method.