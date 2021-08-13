// Compare and update the inventory stored in a 2D array against a second 2D array of a fresh delivery. Update the current existing inventory item quantities (in arr1). If an item cannot be found, add the new item and quantity into the inventory array. The returned inventory array should be in alphabetical order by item.

function updateInventory(arr1, arr2) {
    //copy arr1
    var copArr1 = arr1.slice();
    //display current inventory and new inventory
    // console.log('currInv');
    // console.log(copArr1);
    // console.log('newInv');
    // console.log(arr2);

    //arr1 = current inventory, arr2 = new inventory
    arr2.forEach(item => {
        var ind = returnIndex(copArr1, item);
        // if index is in current inventory update the quantity
        if(!(ind==null)) {
            arr1[ind][0] = arr1[ind][0] + item[0];
        } else {
            //else add item to current inventory
            arr1.push(item);
        }
    });

    //sort inventory alphabetically
    arr1.sort((a,b) => a[1].localeCompare(b[1]));

    return arr1;
}

function returnIndex(copArr1, item) {
    //create variable to store index of item in current inventory
    var ind = null;
    // check if item is in current inventory
    for(var i=0; i <= copArr1.length - 1; i++){
        copArr1[i].includes(item[1])
        //if so, update index of item in current inventory
        ? ind = i
        //else, leave index as null
        : null;
    }
    return ind;
}

// Example inventory lists
var curInv = [
    [5, "Microphone"],
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"]
    // [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];

console.log(updateInventory([], [[2, "Hair Pin"], [3, "Half-Eaten Apple"], [67, "Bowling Ball"], [7, "Toothpaste"]]));

// The function updateInventory should return an array.

// updateInventory([[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]], [[2, "Hair Pin"], [3, "Half-Eaten Apple"], [67, "Bowling Ball"], [7, "Toothpaste"]]) should return an array with a length of 6.

// updateInventory([[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]], [[2, "Hair Pin"], [3, "Half-Eaten Apple"], [67, "Bowling Ball"], [7, "Toothpaste"]]) should return [[88, "Bowling Ball"], [2, "Dirty Sock"], [3, "Hair Pin"], [3, "Half-Eaten Apple"], [5, "Microphone"], [7, "Toothpaste"]].

// updateInventory([[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]], []) should return [[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]].

// updateInventory([], [[2, "Hair Pin"], [3, "Half-Eaten Apple"], [67, "Bowling Ball"], [7, "Toothpaste"]]) should return [[67, "Bowling Ball"], [2, "Hair Pin"], [3, "Half-Eaten Apple"], [7, "Toothpaste"]].

// updateInventory([[0, "Bowling Ball"], [0, "Dirty Sock"], [0, "Hair Pin"], [0, "Microphone"]], [[1, "Hair Pin"], [1, "Half-Eaten Apple"], [1, "Bowling Ball"], [1, "Toothpaste"]]) should return [[1, "Bowling Ball"], [0, "Dirty Sock"], [1, "Hair Pin"], [1, "Half-Eaten Apple"], [0, "Microphone"], [1, "Toothpaste"]].