function addTogether(arg1, arg2) {
  //check if arguments are numbers and return sum or function
  if(typeof(arg1) == "number" && typeof(arg2) == "number") {
    return arg1 + arg2;
  }else if(typeof(arg1) == "number") {
    return function(arg2) {
      console.log(arg2);
      if(typeof(arg2) == "number") {
        return arg1 + arg2;
      }else {return undefined}
    }
  }else {
    return undefined;
  }
}

console.log(addTogether("http://bit.ly/IqT6zt"));