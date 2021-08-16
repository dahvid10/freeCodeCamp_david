function PriorityQueue () {
    this.collection = [];
    this.printCollection = function() {
      console.log(this.collection);
    };
    // Only change code below this line
    this.enqueue = (element) => {
      // find priority slot for element
      // if collection, empty, add element
      if(this.collection.isEmpty()) {
        return this.collection.push(element);
      }
      // find index to insert element
      var insIndex = this.collection.findIndex( item => {
        return element[1] <= item[1];
      });
      // insert element
      this.collection.splice(insIndex, 0, element);
    }
  
    this.dequeue = () => {
      if (!this.isEmpty()) {
        return this.collection.shift()[0];
      } else {
        return "The queue is empty.";
      }
    }
  
    this.size = () => {
      return this.collection.length;
    }
  
    this.front = () => {
      return this.collection[0][0];
    }
  
    this.isEmpty = () => {
      this.size() > 0 ? false : true;
    }
    // Only change code above this line
  }