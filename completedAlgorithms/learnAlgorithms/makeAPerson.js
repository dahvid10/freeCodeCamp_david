var Person = function(firstAndLast) {
  // Only change code below this line
  // Complete the method below and implement the others similarly
  //create variable to hold full name
  var fullName = firstAndLast;
  //create method to set fullName
  this.setFullName = function (name) { 
    fullName = name;
  }
  //create method to get fullName
  this.getFullName = function() {
    return fullName;
  };
  //create method to set firstName
  this.setFirstName = function (name) {
    fullName =  name + " " + fullName.split(" ")[1];
  }
  //create method to get firstName
  this.getFirstName = function (name) {
    return fullName.split(" ")[0];
  }
  //create method to set lastName
  this.setLastName = function (name) {
    fullName = fullName.split(" ")[0] + " " + name;
  }
  //create method to get lastName
  this.getLastName = function (name) {
    return fullName.split(" ")[1];
  }

  return firstAndLast;
};

var bob = new Person('Bob Ross');
bob.setFirstName("Haskell");
console.log(bob.getFullName());
