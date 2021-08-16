// Write a push method that pushes an element to the top of the stack, a pop method that removes and returns the element on the top of the stack, a peek method that looks at the top element in the stack, an isEmpty method that checks if the stack is empty, and a clear method that removes all elements from the stack. Normally stacks don't have this, but we've added a print helper method that console logs the collection.

function Stack() {
    var collection = [];
    this.print = function() {
      console.log(collection);
    };
    // Only change code below this line
    this.push = function(element) {
      return collection.push(element);
    }
    
    this.pop = function(element) {
      return collection.pop();
    }
  
    this.peek = function(element) {
      return collection[collection.length - 1];
    }
  
    this.isEmpty = function() {
      return collection.length === 0;
    }
  
    this.clear = function() {
      return collection.length = 0;
    }
    // Only change code above this line
  }