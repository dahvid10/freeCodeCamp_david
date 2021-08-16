// Write an enqueue method that pushes an element to the tail of the queue, a dequeue method that removes and returns the front element, a front method that lets us see the front element, a size method that shows the length, and an isEmpty method to check if the queue is empty.

function Queue() {
    var collection = [];
    this.print = function() {
      console.log(collection);
    };
    // Only change code below this line
    this.enqueue = (element) => {
      return collection.push(element);
    }
  
    this.dequeue = () => {
      return collection.shift();
    }
  
    this.front = () => {
      return collection[0];
    }
  
    this.size = () => {
      return collection.length;
    }
  
    this.isEmpty = () => {
      return collection.length === 0;
    }
    // Only change code above this line
  }